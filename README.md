# T-Prints Frontend

Frontend desarrollado en **React + Vite** para el proyecto **T-Prints**, una aplicación web orientada a la venta y personalización de camisetas.

El frontend consume un backend desarrollado en **Spring Boot**, maneja autenticación con JWT, productos desde base de datos, carrito en `localStorage`, creación de pedidos y visualización del historial de pedidos del usuario.

---

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Router DOM
- Tailwind CSS
- Fetch API
- LocalStorage
- Material Symbols Icons
- Vercel para despliegue

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

```bash
node -v
```

y:

```bash
npm -v
```

También necesitas tener disponible el backend.

En desarrollo local normalmente está en:

```txt
http://localhost:8080
```

Si el frontend está desplegado en Vercel y el backend sigue local, el backend debe exponerse con ngrok.

---

## Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Entrar a la carpeta del frontend:

```bash
cd tprints-react
```

Instalar dependencias:

```bash
npm install
```

---

## Variables de entorno

Crear un archivo `.env` en la raíz del frontend, al mismo nivel de `package.json`.

Para desarrollo local:

```env
VITE_API_URL=http://localhost:8080
```

Para frontend desplegado en Vercel consumiendo backend local por ngrok:

```env
VITE_API_URL=https://URL_DE_NGROK
```

Ejemplo:

```env
VITE_API_URL=https://kilobyte-dreamlike-dish.ngrok-free.dev
```

Para frontend desplegado consumiendo backend desplegado:

```env
VITE_API_URL=https://URL_PUBLICA_DEL_BACKEND
```

Importante: Vite solo expone variables que empiezan por `VITE_`.

---

## Ejecutar en desarrollo

```bash
npm run dev
```

El frontend queda disponible normalmente en:

```txt
http://localhost:5173
```

---

## Build de producción

```bash
npm run build
```

El build se genera en:

```txt
dist/
```

Para previsualizar:

```bash
npm run preview
```

---

## Despliegue en Vercel

Para desplegar el frontend en Vercel:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Si Vercel muestra error como:

```txt
No Output Directory named "public" found
```

se debe configurar:

```txt
Output Directory: dist
```

También se puede crear un archivo `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

## Variables en Vercel

En Vercel:

```txt
Project > Settings > Environment Variables
```

Crear:

```txt
Key: VITE_API_URL
Value: https://URL_DEL_BACKEND
```

Ejemplo con ngrok:

```txt
VITE_API_URL=https://kilobyte-dreamlike-dish.ngrok-free.dev
```

Marcar los entornos:

```txt
Production
Preview
Development
```

Después de cambiar variables, hacer redeploy:

```txt
Deployments > Redeploy
```

Se recomienda hacer redeploy sin cache.

---

## Backend local + frontend en Vercel

Si el backend está en tu PC y el frontend en Vercel, no puedes usar:

```txt
http://localhost:8080
```

porque para Vercel y para los usuarios externos, `localhost` no es tu computador.

Debes usar ngrok:

```bash
ngrok http 8080
```

Ngrok entrega una URL pública:

```txt
https://kilobyte-dreamlike-dish.ngrok-free.dev
```

Esa URL se configura en Vercel como:

```env
VITE_API_URL=https://kilobyte-dreamlike-dish.ngrok-free.dev
```

Cada vez que ngrok cambie la URL, debes actualizar `VITE_API_URL` en Vercel y hacer redeploy.

---

## Servicios de API

Los servicios están en:

```txt
src/services
```

Estructura recomendada:

```txt
src/services
├── api.js
├── authService.js
├── productService.js
├── designService.js
└── orderService.js
```

---

## `api.js`

Este archivo centraliza las peticiones HTTP.

Responsabilidades:

```txt
- Leer VITE_API_URL
- Guardar token JWT
- Guardar usuario autenticado
- Adjuntar Authorization Bearer cuando sea necesario
- Manejar errores del backend
- Agregar header para ngrok
```

Debe usar:

```js
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
```

Y en los headers:

```js
const requestHeaders = {
  "ngrok-skip-browser-warning": "true",
  ...headers,
};
```

Este header ayuda a evitar el warning intermedio de ngrok en peticiones `fetch`.

---

## LocalStorage usado

### Token JWT

```txt
tprints-token
```

### Usuario autenticado

```txt
tprints-user
```

Ejemplo:

```json
{
  "idUsuario": 1,
  "nombres": "As",
  "apellidos": "Principal",
  "correo": "as@tprints.com",
  "nombreUsuario": "as",
  "roles": ["CLIENTE"]
}
```

### Carrito

```txt
tprints-cart
```

El carrito se guarda localmente y solo se envía al backend cuando se crea el pedido.

---

## Autenticación

El login permite iniciar sesión con:

```txt
correo
```

o:

```txt
nombre de usuario
```

El frontend envía:

```json
{
  "identificador": "as",
  "password": "as"
}
```

o:

```json
{
  "identificador": "as@tprints.com",
  "password": "as"
}
```

Endpoint usado:

```txt
POST /api/auth/login
```

---

## Registro

El registro permite crear usuarios con rol:

```txt
CLIENTE
DISENADOR
```

El frontend envía:

```json
{
  "nombres": "Juan Daniel",
  "apellidos": "Vanegas",
  "correo": "juan@test.com",
  "nombreUsuario": "juanvanegas",
  "password": "123456",
  "telefono": "+57 300 123 4567",
  "fotoPerfilUrl": "",
  "rol": "CLIENTE"
}
```

Endpoint usado:

```txt
POST /api/auth/registro
```

---

## Diseño visual de Login y Registro

Las pantallas `LoginPage` y `CreateAccountPage` usan un diseño visual similar:

```txt
- Fondo general claro/oscuro
- Card centrada
- Borde y sombra suave
- Header interno con flecha atrás
- Título T-Prints centrado
- Título de página centrado
- Inputs con borde, fondo y focus ring
- Botón primario
- Link inferior para cambiar entre login y registro
```

En `CreateAccountPage`, el header se centra usando un contenedor relativo y una flecha absoluta a la izquierda:

```jsx
<div className="relative p-4 flex items-center justify-center">
  <button
    onClick={() => navigate(-1)}
    className="absolute left-4 text-primary flex size-10 shrink-0 items-center justify-center hover:bg-primary/10 rounded-full transition-colors cursor-pointer"
    aria-label="Volver"
  >
    <span className="material-symbols-outlined">arrow_back</span>
  </button>

  <div className="text-center">
    <h1 className="text-primary text-xl font-bold leading-tight tracking-tight">
      T-Prints
    </h1>

    <h2 className="mt-2 text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight">
      Crear cuenta
    </h2>
  </div>
</div>
```

---

## Productos

La vista de productos consume:

```txt
GET /api/productos
```

El backend devuelve productos con variantes.

Ejemplo:

```json
[
  {
    "idProducto": 1,
    "nombre": "Camisa básica personalizada",
    "descripcion": "Camisa básica ideal para estampado frontal.",
    "precioBase": 45000,
    "activo": true,
    "variantes": [
      {
        "idVariante": 1,
        "color": "Blanco",
        "talla": "M",
        "stock": 25,
        "sku": "CAM-BAS-BLA-M",
        "imagenUrl": "https://example.com/productos/camisa-basica-blanca.png",
        "precioAdicional": 0,
        "activo": true
      }
    ]
  }
]
```

Cada variante se muestra como una opción comprable.

---

## Carrito

El carrito se maneja en frontend con:

```txt
localStorage -> tprints-cart
```

Cada item guarda:

```json
{
  "id": 1,
  "idProducto": 1,
  "idVariante": 1,
  "name": "Camisa básica personalizada",
  "description": "Camisa básica ideal para estampado frontal. Color: Blanco - Talla: M",
  "color": "Blanco",
  "size": "M",
  "quantity": 1,
  "price": 45000,
  "image": "https://example.com/productos/camisa-basica-blanca.png",
  "stock": 25,
  "sku": "CAM-BAS-BLA-M"
}
```

El backend necesita `idVariante` para crear el pedido.

---

## Pedidos

La vista de carrito permite crear pedidos reales en el backend.

Endpoint:

```txt
POST /api/pedidos
```

Requiere token JWT.

Body enviado:

```json
{
  "idDireccionEnvio": 1,
  "metodoPago": "PSE",
  "items": [
    {
      "idVariante": 1,
      "cantidad": 2,
      "imagenPersonalizadaUrl": null,
      "notasPersonalizacion": null
    }
  ]
}
```

El backend crea:

```txt
- pedido
- pedido_items
- pago simulado
- envío inicial
- descuento de stock
```

---

## Perfil

La página de perfil muestra:

```txt
Izquierda:
- Foto
- Nombre
- Nombre de usuario
- Correo
- Roles
- Botón editar perfil
- Botón cerrar sesión

Derecha:
- Historial de pedidos del usuario
```

Los datos básicos del usuario se leen desde:

```txt
localStorage -> tprints-user
```

Los pedidos se consultan desde:

```txt
GET /api/pedidos/mis-pedidos
```

Este endpoint requiere JWT.

---

## Diseños

Endpoints usados:

```txt
GET  /api/disenos/aprobados
GET  /api/disenos/mis-disenos
POST /api/disenos
```

Crear diseño:

```json
{
  "titulo": "Diseño Dragón Rojo",
  "descripcion": "Diseño personalizado para camiseta negra.",
  "imagenUrl": "https://example.com/disenos/dragon-rojo.png"
}
```

Los diseños nuevos quedan en:

```txt
PENDIENTE
```

---

## Rutas principales

```txt
/login       -> Inicio de sesión
/registro    -> Crear cuenta
/productos   -> Catálogo de productos
/disenos     -> Diseños o estampas
/pedidos     -> Carrito de compras
/perfil      -> Perfil e historial de pedidos
```

---

## Flujo recomendado de prueba

```txt
1. Levantar backend Spring Boot.
2. Si el frontend está desplegado, levantar ngrok.
3. Configurar VITE_API_URL.
4. Ejecutar npm run dev o desplegar en Vercel.
5. Iniciar sesión con usuario as / contraseña as.
6. Entrar a productos.
7. Agregar producto al carrito.
8. Ir a pedidos.
9. Ingresar idDireccionEnvio.
10. Finalizar compra.
11. Ir a perfil.
12. Validar que aparezca el pedido.
```

---

## CORS

Si el frontend está en Vercel, el backend debe permitir:

```txt
https://*.vercel.app
```

Y también debe permitir el header:

```txt
ngrok-skip-browser-warning
```

---

## Errores comunes

### Failed to fetch

Posibles causas:

```txt
- Backend apagado
- Ngrok apagado
- VITE_API_URL mal configurada
- La URL de ngrok cambió
- CORS bloqueado
```

---

### El frontend intenta llamar a localhost desde Vercel

Si en consola aparece:

```txt
http://localhost:8080/api/...
```

significa que Vercel no tomó la variable `VITE_API_URL`.

Solución:

```txt
1. Configurar VITE_API_URL en Vercel.
2. Marcar Production, Preview y Development.
3. Hacer redeploy sin cache.
```

---

### Error de CORS

Si aparece:

```txt
No Access-Control-Allow-Origin header
```

revisar en backend:

```txt
- CorsConfig.java
- SecurityConfig.java
- Permitir OPTIONS
- Permitir https://*.vercel.app
```

---

### Error de ngrok

Si ngrok muestra advertencia, agregar en `api.js`:

```js
"ngrok-skip-browser-warning": "true"
```

---

### No aparecen productos

Probar directamente:

```txt
https://URL_BACKEND/api/productos
```

Si responde `[]`, la base de datos no tiene productos activos.

---

### No se puede crear pedido

Posibles causas:

```txt
- El usuario no tiene token
- El carrito está vacío
- El idDireccionEnvio no existe
- La dirección no pertenece al usuario
- No hay stock suficiente
- El idVariante no existe
```

---

## Comandos útiles

Instalar dependencias:

```bash
npm install
```

Ejecutar local:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

Limpiar sesión y carrito:

```js
localStorage.removeItem("tprints-token");
localStorage.removeItem("tprints-user");
localStorage.removeItem("tprints-cart");
```

Limpiar todo:

```js
localStorage.clear();
```

---

## Pendientes recomendados

```txt
- Pantalla de direcciones
- Endpoint /api/usuarios/me
- Edición real de perfil
- Subida real de imágenes
- Panel admin frontend
- Crear productos desde frontend
- Aprobar/rechazar diseños desde frontend
- Validación visual de stock
- Protección de rutas privadas
- Mejorar notificaciones usando toasts en vez de alert()
- Backend desplegado estable en Render
```
