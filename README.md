# 🌌 Star Wars Blog - React + Custom Hooks

This project was created as part of the **4Geeks Academy** bootcamp. It is a blog-style application that lists and displays details of various elements from the **Star Wars** universe (characters, planets, vehicles, etc.).

The app fetches data from an API and allows users to:

- View items by category on the homepage.
- Click on an item to see detailed information.
- Use a smart search bar to filter through elements.
- Navigate smoothly thanks to React Router.
- Enjoy a themed experience with SVG images, animated star backgrounds, and responsive design.

Global state is managed using **useReducer** and the **Context API**, wrapped inside custom hooks like `useGlobalReducer`. Data is fetched asynchronously with hooks like `useLoadData` and `useAllCategoryItems`.

---


## 🧑‍🏫 Developed by

**Adrián MRC**  
Project created during the Full Stack Developer Bootcamp at 4Geeks Academy.

---

## 🛠️ Technologies Used

- [React](https://reactjs.org/) (latest version)
- [Vite](https://vitejs.dev/) (fast bundler and dev server)
- [React Router](https://reactrouter.com/) (for routing and navigation)
- Custom Hooks (`useLoadData`, `useGlobalReducer`, etc.)
- [Vercel](https://vercel.com/) (for deployment)

---

## 🚀 How to Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/4GeeksAcademy/Blog-StarWars-AdrianMRC.git
   cd Blog-StarWars-AdrianMRC
   ```

2. **Ensure you have Node.js v20 or higher installed.**

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Access the app at `http://localhost:3000`.

---

## 🗂️ Project Structure

```
src/
├── App.jsx                    # Root app component
├── assets/img/                # Image assets
├── components/                # UI components
├── hooks/                     # Custom hooks
├── pages/                     # Main views
├── routes.jsx                 # React Router configuration
├── store.js                   # Global state with useReducer
├── main.jsx                   # Entry point
└── index.css                  # Global styles
```

---

## 🌐 Deployment with Vercel

1. Install the CLI and log in:

   ```bash
   npm i -g vercel
   vercel login
   ```

2. Deploy the app:

   ```bash
   vercel --prod
   ```

---

## 🧠 Useful Resources

- [React Docs](https://reactjs.org/)
- [Vite Docs](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)
- [Vercel Docs](https://vercel.com/docs)

---

## 📝 License

This project is licensed under the **MIT License**. Feel free to use, modify, and share it.
