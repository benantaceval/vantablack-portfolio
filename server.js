const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Archivo de almacenamiento de datos (JSON)
const POSTS_FILE = path.join(__dirname, 'posts.json');

// Función para leer posts
function readPosts() {
    try {
        if (fs.existsSync(POSTS_FILE)) {
            const data = fs.readFileSync(POSTS_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error leyendo posts:', error);
    }
    return [];
}

// Función para guardar posts
function writePosts(posts) {
    try {
        fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
    } catch (error) {
        console.error('Error guardando posts:', error);
    }
}

// Rutas API

// GET - Obtener todos los posts (público)
app.get('/api/posts', (req, res) => {
    try {
        const posts = readPosts();
        // Ordenar por fecha descendente
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener posts' });
    }
});

// POST - Crear nuevo post (requiere autenticación)
app.post('/api/posts', (req, res) => {
    try {
        const { password, title, description, content, type, date } = req.body;

        // Verificar contraseña
        const correctPassword = process.env.ADMIN_PASSWORD || 'admin123';
        if (password !== correctPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Validar datos
        if (!content || !type) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        const posts = readPosts();
        const newPost = {
            id: Date.now(),
            title: title || `Post ${new Date().toLocaleDateString()}`,
            description: description || '',
            content: content,
            type: type,
            date: date || new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString()
        };

        posts.push(newPost);
        writePosts(posts);

        res.status(201).json({
            success: true,
            message: 'Post creado exitosamente',
            post: newPost
        });

    } catch (error) {
        console.error('Error creando post:', error);
        res.status(500).json({ error: 'Error al crear post' });
    }
});

// DELETE - Eliminar post (requiere autenticación)
app.delete('/api/posts/:id', (req, res) => {
    try {
        const { password } = req.body;
        const postId = parseInt(req.params.id);

        // Verificar contraseña
        const correctPassword = process.env.ADMIN_PASSWORD || 'admin123';
        if (password !== correctPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        let posts = readPosts();
        const initialLength = posts.length;
        posts = posts.filter(p => p.id !== postId);

        if (posts.length === initialLength) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        writePosts(posts);

        res.json({
            success: true,
            message: 'Post eliminado exitosamente'
        });

    } catch (error) {
        console.error('Error eliminando post:', error);
        res.status(500).json({ error: 'Error al eliminar post' });
    }
});

// Ruta principal - Servir HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Manejo de rutas no encontradas - Servir HTML para SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor VantaBlack ejecutándose en puerto ${PORT}`);
    console.log(`📝 Panel admin disponible con contraseña: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
});

// Manejo de errores
server.on('error', (error) => {
    console.error('Error en servidor:', error);
});
