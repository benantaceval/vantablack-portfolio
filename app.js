// ============================================
// CONFIGURACIÓN Y VARIABLES GLOBALES
// ============================================

const API_BASE = ''; // API en mismo dominio
let isAuthenticated = false;
let userPassword = null;

// Inicializar fecha actual en el input
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const postDateInput = document.getElementById('postDate');
    if (postDateInput) {
        postDateInput.value = today;
    }
    
    // Inicializar Vanta
    initVanta();
    
    // Cargar posts públicos
    loadPublicPosts();
    
    // Event Listeners
    setupEventListeners();
});

// ============================================
// VANTA BACKGROUND
// ============================================

function initVanta() {
    VANTA.NET({
        el: '#vanta-background',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x00ff00,
        backgroundColor: 0x0a0a0a,
        points: 12.00,
        maxDistance: 20.00,
        spacing: 15.00
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Modal Admin
    document.getElementById('adminBtn').addEventListener('click', openAdminModal);
    document.getElementById('closeModal').addEventListener('click', closeAdminModal);
    document.getElementById('loginBtn').addEventListener('click', handleLogin);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Tipo de contenido
    document.getElementById('contentType').addEventListener('change', handleContentTypeChange);
    
    // Archivo Imagen
    document.getElementById('imageFile').addEventListener('change', handleImageSelect);
    document.getElementById('clearImageBtn')?.addEventListener('click', clearImagePreview);
    
    // Archivo Video
    document.getElementById('videoFile').addEventListener('change', handleVideoSelect);
    document.getElementById('clearVideoBtn')?.addEventListener('click', clearVideoPreview);
    
    // Publicar
    document.getElementById('publishBtn').addEventListener('click', handlePublish);
    
    // Cerrar modal al hacer clic fuera
    document.getElementById('adminModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeAdminModal();
        }
    });
    
    // Enter en password
    document.getElementById('passwordInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
}

// ============================================
// MODAL ADMIN
// ============================================

function openAdminModal() {
    document.getElementById('adminModal').classList.remove('hidden');
    document.getElementById('passwordInput').focus();
}

function closeAdminModal() {
    if (isAuthenticated) {
        if (confirm('¿Estás seguro de que quieres cerrar? Se cerrará tu sesión.')) {
            handleLogout();
        }
    } else {
        document.getElementById('adminModal').classList.add('hidden');
        clearLoginForm();
    }
}

function clearLoginForm() {
    document.getElementById('passwordInput').value = '';
    document.getElementById('loginError').textContent = '';
}

// ============================================
// AUTENTICACIÓN
// ============================================

function handleLogin() {
    const password = document.getElementById('passwordInput').value;
    const errorEl = document.getElementById('loginError');
    
    if (!password) {
        errorEl.textContent = 'Por favor ingresa una contraseña';
        return;
    }
    
    // Contraseña: "admin123" (CAMBIAR EN PRODUCCIÓN)
    const correctPassword = 'admin123';
    
    if (password === correctPassword) {
        isAuthenticated = true;
        userPassword = password;
        errorEl.textContent = '';
        
        // Ocultar login, mostrar admin
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('adminSection').classList.remove('hidden');
        
        // Cargar posts del admin
        loadAdminPosts();
    } else {
        errorEl.textContent = '❌ Contraseña incorrecta';
        document.getElementById('passwordInput').value = '';
        document.getElementById('passwordInput').focus();
    }
}

function handleLogout() {
    isAuthenticated = false;
    userPassword = null;
    
    // Mostrar login, ocultar admin
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('adminSection').classList.add('hidden');
    
    // Limpiar formulario
    clearLoginForm();
    clearPublishForm();
    document.getElementById('adminPostsList').innerHTML = '';
    
    // Enfocar en password
    document.getElementById('passwordInput').focus();
}

// ============================================
// MANEJO DE CONTENIDO
// ============================================

function handleContentTypeChange() {
    const type = document.getElementById('contentType').value;
    
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Mostrar la seleccionada
    if (type === 'text') {
        document.getElementById('textSection').classList.remove('hidden');
    } else if (type === 'image') {
        document.getElementById('imageSection').classList.remove('hidden');
    } else if (type === 'video') {
        document.getElementById('videoSection').classList.remove('hidden');
    }
}

function handleImageSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('imagePreview');
        const img = document.getElementById('previewImg');
        img.src = e.target.result;
        preview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

function clearImagePreview() {
    document.getElementById('imageFile').value = '';
    document.getElementById('imagePreview').classList.add('hidden');
}

function handleVideoSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('videoPreview');
        const video = document.getElementById('previewVideo');
        video.src = e.target.result;
        preview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

function clearVideoPreview() {
    document.getElementById('videoFile').value = '';
    document.getElementById('videoUrl').value = '';
    document.getElementById('videoPreview').classList.add('hidden');
}

// ============================================
// PUBLICAR POST
// ============================================

async function handlePublish() {
    const contentType = document.getElementById('contentType').value;
    const title = document.getElementById('postTitle').value;
    const description = document.getElementById('postDescription').value;
    const date = document.getElementById('postDate').value;
    const messageEl = document.getElementById('publishMessage');
    
    try {
        messageEl.textContent = '⏳ Publicando...';
        messageEl.className = 'message';
        
        const postData = {
            type: contentType,
            title: title || `Post ${new Date().toLocaleDateString()}`,
            description: description,
            date: date,
            timestamp: new Date().toISOString()
        };
        
        // Agregar contenido según tipo
        if (contentType === 'text') {
            postData.content = document.getElementById('messageText').value;
            if (!postData.content) {
                throw new Error('Por favor escribe un mensaje');
            }
        } else if (contentType === 'image') {
            const imageFile = document.getElementById('imageFile').files[0];
            if (!imageFile) {
                throw new Error('Por favor selecciona una imagen');
            }
            postData.content = await fileToBase64(imageFile);
        } else if (contentType === 'video') {
            const videoUrl = document.getElementById('videoUrl').value;
            const videoFile = document.getElementById('videoFile').files[0];
            
            if (videoUrl) {
                postData.content = videoUrl;
            } else if (videoFile) {
                postData.content = await fileToBase64(videoFile);
            } else {
                throw new Error('Por favor proporciona un video (URL o archivo)');
            }
        }
        
        // Guardar en localStorage (funciona sin servidor)
        savePosts(postData);
        
        messageEl.textContent = '✅ ¡Publicado exitosamente!';
        messageEl.className = 'message success';
        
        // Limpiar formulario
        clearPublishForm();
        
        // Recargar posts
        loadAdminPosts();
        loadPublicPosts();
        
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => {
            messageEl.textContent = '';
        }, 3000);
        
    } catch (error) {
        messageEl.textContent = `❌ Error: ${error.message}`;
        messageEl.className = 'message error';
    }
}

// ============================================
// STORAGE (localStorage)
// ============================================

function savePosts(post) {
    let posts = getAllPosts();
    post.id = Date.now(); // ID único
    posts.push(post);
    localStorage.setItem('vantablack_posts', JSON.stringify(posts));
}

function getAllPosts() {
    const stored = localStorage.getItem('vantablack_posts');
    return stored ? JSON.parse(stored) : [];
}

function deletePost(postId) {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
        let posts = getAllPosts();
        posts = posts.filter(p => p.id !== postId);
        localStorage.setItem('vantablack_posts', JSON.stringify(posts));
        loadAdminPosts();
        loadPublicPosts();
    }
}

// ============================================
// CARGAR POSTS
// ============================================

function loadPublicPosts() {
    const posts = getAllPosts();
    const postsList = document.getElementById('postsList');
    
    if (posts.length === 0) {
        postsList.innerHTML = '<p class="empty-message">📭 No hay publicaciones aún...</p>';
        return;
    }
    
    // Ordenar por fecha más reciente primero
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    postsList.innerHTML = posts.map(post => createPostHTML(post)).join('');
}

function loadAdminPosts() {
    const posts = getAllPosts();
    const adminList = document.getElementById('adminPostsList');
    
    if (posts.length === 0) {
        adminList.innerHTML = '<p class="loading">No hay publicaciones</p>';
        return;
    }
    
    // Ordenar por fecha más reciente primero
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    adminList.innerHTML = posts.map(post => `
        <div class="admin-post-item">
            <div class="admin-post-info">
                <div class="admin-post-title">
                    ${post.type === 'text' ? '📝' : post.type === 'image' ? '🖼️' : '🎬'} 
                    ${post.title}
                </div>
                <div class="admin-post-date">${new Date(post.date).toLocaleDateString('es-ES')}</div>
            </div>
            <button class="btn-delete" onclick="deletePost(${post.id})">Eliminar</button>
        </div>
    `).join('');
}

function createPostHTML(post) {
    const dateObj = new Date(post.date);
    const formattedDate = dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    let contentHTML = '';
    
    if (post.type === 'text') {
        contentHTML = `<p class="post-text">${escapeHtml(post.content)}</p>`;
    } else if (post.type === 'image') {
        contentHTML = `<img src="${post.content}" alt="${post.title}" class="post-image">`;
    } else if (post.type === 'video') {
        if (post.content.includes('youtube.com') || post.content.includes('youtu.be') || 
            post.content.includes('vimeo.com') || post.content.includes('iframe')) {
            // Es una URL
            contentHTML = `
                <iframe class="post-video" src="${post.content}" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
            `;
        } else {
            // Es un archivo base64
            contentHTML = `<video class="post-video" controls><source src="${post.content}" type="video/mp4"></video>`;
        }
    }
    
    return `
        <div class="post">
            <div class="post-header">
                <div>
                    <div class="post-title">${escapeHtml(post.title)}</div>
                    <div class="post-date">${formattedDate}</div>
                </div>
                <span class="post-type">${post.type === 'text' ? 'Texto' : post.type === 'image' ? 'Imagen' : 'Video'}</span>
            </div>
            <div class="post-content">
                ${contentHTML}
                ${post.description ? `<p class="post-description">"${escapeHtml(post.description)}"</p>` : ''}
            </div>
        </div>
    `;
}

// ============================================
// UTILIDADES
// ============================================

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function clearPublishForm() {
    document.getElementById('messageText').value = '';
    document.getElementById('postTitle').value = '';
    document.getElementById('postDescription').value = '';
    document.getElementById('imageFile').value = '';
    document.getElementById('videoUrl').value = '';
    document.getElementById('videoFile').value = '';
    document.getElementById('imagePreview').classList.add('hidden');
    document.getElementById('videoPreview').classList.add('hidden');
    document.getElementById('publishMessage').textContent = '';
    document.getElementById('publishMessage').className = 'message';
    document.getElementById('contentType').value = 'text';
    handleContentTypeChange();
}
