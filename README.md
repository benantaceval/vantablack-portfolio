# 🖤 VantaBlack Portfolio

Mi página personal oscura con panel de administración para publicar noticias, imágenes y videos.

## ✨ Características

- 🌙 Diseño oscuro minimalista con fondo VantaBlack
- 🔐 Panel de administración protegido por contraseña
- 📝 Publica textos, imágenes y videos
- 📊 Feed público donde todos pueden ver tus publicaciones
- 📱 Diseño responsivo (funciona en móvil, tablet y desktop)
- ⚡ Rápido, seguro y sin servidor

## 🌐 Ver Online

Tu página está online en: **[https://vantablack-portfolio.vercel.app](https://vantablack-portfolio.vercel.app)**

## 🔐 Panel de Administración

Para acceder al panel admin:
1. Haz clic en el botón **🔐 Admin** (arriba a la derecha)
2. Contraseña: `admin123`
3. ¡Ya puedes publicar!

**⚠️ IMPORTANTE**: Cambia la contraseña por seguridad

## 🎨 Cómo Usar

### Para Visitantes
1. Abre la página
2. Ve el fondo VantaBlack animado
3. Desplázate para ver todas las publicaciones
4. Cada post muestra: título, fecha, contenido (texto/imagen/video)

### Para Ti (Admin)
1. Haz clic en **🔐 Admin**
2. Ingresa tu contraseña
3. Accede al panel de administración
4. Opciones disponibles:
   - **Publicar Texto**: Escribe mensajes y noticias
   - **Publicar Imagen**: Sube fotos tuyas
   - **Publicar Video**: Videos de YouTube/Vimeo o archivos propios
   - **Mis Publicaciones**: Ve y elimina tus posts
   - **Cerrar Sesión**: Salir del panel

## 🛠️ Personalización

### Cambiar la contraseña

Edita `app.js` y busca esta línea:
```javascript
const correctPassword = 'admin123';
```

Cámbiala por tu contraseña:
```javascript
const correctPassword = 'tu_contraseña_segura';
```

Luego haz push a GitHub y Vercel se actualizará automáticamente.

### Cambiar colores

En `styles.css`, modifica las variables al inicio:
```css
:root {
    --accent-color: #00ff00;  /* Verde (por defecto) */
    --primary-color: #1a1a1a; /* Negro oscuro */
    --text-color: #ffffff;    /* Blanco */
}
```

### Cambiar título

En `index.html`, busca:
```html
<h1 class="title">VantaBlack</h1>
```

## 📁 Estructura

```
vantablack-portfolio/
├── index.html       # Página principal
├── styles.css       # Estilos
├── app.js          # Lógica (sin servidor)
├── vercel.json     # Config de Vercel
├── package.json    # Info del proyecto
└── README.md       # Este archivo
```

## 💾 Almacenamiento de Datos

Los posts se guardan en tu navegador (localStorage), lo que significa:
- ✅ Sin base de datos complicada
- ✅ Sin servidor
- ✅ Todo funciona offline
- ⚠️ Los datos se pierden si limpias el cache del navegador

## 🔒 Seguridad

- La contraseña está en el código (es básica)
- Funciona bien para proteger contra curiosos
- Para mayor seguridad, contacta al desarrollador

## 📞 Soporte

Si tienes problemas:
1. Limpia el cache del navegador (Ctrl+Shift+Del)
2. Recarga la página (Ctrl+F5)
3. Abre la consola (F12) y busca errores

## 📜 Licencia

MIT - Libre para usar y modificar

---

**Creado por benantaceval** 🖤
