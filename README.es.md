# 🌌 Blog Star Wars - React + Custom Hooks

Este es un proyecto realizado como parte del bootcamp de **4Geeks Academy**. Es una aplicación tipo blog donde se listan y detallan distintos elementos del universo de **Star Wars** (personajes, planetas, vehículos, etc.).

La app consume datos desde una API y permite al usuario:

- Visualizar ítems organizados por categoría en la página principal.
- Hacer clic sobre un ítem para ver su detalle completo.
- Buscar elementos a través de una barra de búsqueda inteligente.
- Navegar fluidamente gracias a React Router.
- Disfrutar de una experiencia visual temática con imágenes SVG, fondo animado de estrellas y diseño responsive.

El estado global se maneja con **useReducer** y **Context API**, encapsulado en hooks personalizados como `useGlobalReducer`. Los datos se cargan de forma asincrónica con hooks como `useLoadData` y `useAllCategoryItems`.

---


## 🧑‍🏫 Desarrollado por

**Adrián MRC**  
Proyecto del curso Full Stack Developer en 4Geeks Academy.

---

## 🛠️ Tecnologías utilizadas

- [React](https://reactjs.org/) (última versión)
- [Vite](https://vitejs.dev/) (empaquetador y servidor de desarrollo)
- [React Router](https://reactrouter.com/) (para navegación entre páginas)
- [Custom Hooks](https://reactjs.org/docs/hooks-custom.html) (`useLoadData`, `useGlobalReducer`, etc.)
- [Vercel](https://vercel.com/) (despliegue gratuito)

---

## 🚀 Cómo ejecutar el proyecto localmente

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/4GeeksAcademy/Blog-StarWars-AdrianMRC.git
   cd Blog-StarWars-AdrianMRC
   ```

2. **Asegúrate de tener Node.js v20 o superior.**

3. **Instala las dependencias:**

   ```bash
   npm install
   ```

4. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

   Accede en `http://localhost:3000`.

---

## 🗂️ Estructura del Proyecto

```
src/
├── App.jsx                    # Componente raíz
├── assets/img/                # Recursos gráficos
├── components/                # Componentes reutilizables
├── hooks/                     # Hooks personalizados
├── pages/                     # Páginas principales
├── routes.jsx                 # Rutas de la app
├── store.js                   # Estado global con useReducer
├── main.jsx                   # Punto de entrada
└── index.css                  # Estilos globales
```

---

## 🌐 Despliegue en Vercel

1. Instala Vercel CLI y haz login:

   ```bash
   npm i -g vercel
   vercel login
   ```

2. Despliega:

   ```bash
   vercel --prod
   ```

---

## 🧠 Recursos útiles

- [React Docs](https://reactjs.org/)
- [Vite Docs](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)
- [Vercel Docs](https://vercel.com/docs)

---

## 📝 Licencia

Proyecto bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.
