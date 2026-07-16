# 🖤 VantaBlack Portfolio

Mi página personal oscura con panel de administración para publicar noticias, imágenes y videos.

## ✨ Características

- 🌙 Diseño oscuro minimalista con fondo VantaBlack
- 🔐 Panel de administración protegido por contraseña
- 📝 Publica textos, imágenes y videos
- 📊 Feed público donde todos pueden ver tus publicaciones
- 📱 Diseño responsivo (funciona en móvil, tablet y desktop)
- ⚡ Rápido y optimizado

## 🚀 Instalación Local

### Requisitos
- Node.js 14+ instalado
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/benantaceval/vantablack-portfolio.git
cd vantablack-portfolio
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita `.env` y cambia la contraseña:
```
PORT=3000
ADMIN_PASSWORD=tu_contraseña_super_segura
```

4. **Iniciar el servidor**
```bash
npm start
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

## 🌐 Desplegar en Vercel (GRATIS)

Esta es la forma más fácil de poner tu página online:

### Opción 1: Vercel (Recomendado)

1. Ve a [vercel.com](https://vercel.com)
2. Haz login con GitHub
3. Haz clic en "New Project"
4. Selecciona tu repositorio `vantablack-portfolio`
5. En "Environment Variables", agrega:
   - `ADMIN_PASSWORD` = tu contraseña
6. Haz clic en "Deploy"
7. ¡Listo! Tu página estará online en `tunombre.vercel.app`

### Opción 2: Railway

1. Ve a [railway.app](https://railway.app)
2. Haz login con GitHub
3. Nuevo proyecto → Import from GitHub
4. Selecciona `vantablack-portfolio`
5. Agrega variable: `ADMIN_PASSWORD`
6. Deploy
7. Tu URL estará en "Deployments"

### Opción 3: Heroku (Requiere tarjeta)

1. Ve a [heroku.com](https://heroku.com)
2. Crea una nueva app
3. Conecta tu GitHub
4. Configura variables de entorno
5. Deploy

## 🔧 Uso

### Para Visitantes
1. Abre la página
2. Ve el fondo VantaBlack
3. Desplázate para ver todas las publicaciones
4. Cada post muestra: título, fecha, contenido (texto/imagen/video)

### Para Ti (Admin)
1. Haz clic en el botón 🔐 **Admin** (arriba a la derecha)
2. Ingresa tu contraseña
3. Accede al panel de administración
4. Opciones disponibles:
   - **Publicar Texto**: Escribe mensajes
   - **Publicar Imagen**: Sube fotos
   - **Publicar Video**: URL de YouTube/Vimeo o sube un archivo
   - **Mis Publicaciones**: Ve y elimina tus posts
   - **Cerrar Sesión**: Salir del panel

## 📁 Estructura del Proyecto

```
vantablack-portfolio/
├── index.html          # Página principal
├── styles.css          # Estilos
├── app.js             # Lógica del frontend
├── server.js          # Servidor Node.js
├── package.json       # Dependencias
├── .env.example       # Variables de ejemplo
├── .gitignore         # Archivos ignorados por git
├── README.md          # Este archivo
└── posts.json         # Base de datos (se crea automáticamente)
```

## 🔐 Seguridad

**⚠️ IMPORTANTE**: 
- Cambia la contraseña predeterminada (`admin123`) en tu `.env`
- Usa una contraseña fuerte y única
- No compartas tu contraseña
- En producción, considera usar autenticación más robusta

## 📊 Almacenamiento de Datos

Los posts se almacenan en:
- **Localmente**: `posts.json` (archivo simple)
- **En la nube**: Se sincroniza automáticamente al desplegar

Para mayor escalabilidad futura, puedes agregar:
- MongoDB Atlas (base de datos)
- Firebase (almacenamiento de archivos)
- AWS S3 (para imágenes/videos)

## 🎨 Personalización

### Cambiar contraseña
Edita tu archivo `.env`:
```
ADMIN_PASSWORD=tu_nueva_contraseña
```

### Cambiar colores
En `styles.css`, modifica las variables:
```css
:root {
    --accent-color: #00ff00;  /* Verde (por defecto)
    --primary-color: #1a1a1a; /* Negro oscuro
    --text-color: #ffffff;    /* Blanco
}
```

### Cambiar título
En `index.html`, busca:
```html
<h1 class="title">VantaBlack</h1>
```

## 🐛 Solución de Problemas

### "No se ve el fondo VantaBlack"
- Asegúrate de que Vanta.js se cargó correctamente
- Verifica la consola del navegador (F12) por errores

### "No puedo publicar"
- Verifica que ingresaste la contraseña correcta
- Asegúrate de que el servidor está corriendo (`npm start`)
- Comprueba que todos los campos requeridos están llenos

### "Los posts no se guardan"
- Verifica permisos de carpeta
- En servidor, asegúrate de que `posts.json` es escribible
- Revisa los logs del servidor

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs del servidor
2. Abre la consola del navegador (F12)
3. Crea un issue en GitHub

## 📜 Licencia

MIT - Libre para usar y modificar

---

**Creado con ❤️ por benantaceval**
