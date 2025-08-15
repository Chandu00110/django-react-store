# 🛒 MyShop E-Commerce Frontend

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Frontend%20Bundler-ff69b4?logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, responsive e-commerce frontend built with **React** and **Vite**, featuring product browsing, cart management, order tracking, authentication, and Razorpay payment integration.

---

## 🚀 Features

✅ Product Listing with image carousels  
✅ Product Categories & Filters  
✅ Product Detail View with gallery  
✅ Cart: Add, Remove, View  
✅ Order History Tracking  
✅ JWT-based Authentication  
✅ Razorpay Payment Integration  
✅ Responsive Design with Bootstrap

---

## 📁 Project Structure

```bash

frontend/
├── public/                # Static assets
├── src/
│   ├── api/               # API utilities (Axios setup)
│   ├── assets/            # Images and icons
│   ├── components/        # Reusable UI components
│   ├── pages/             # App pages (Home, Cart, Orders, etc.)
│   ├── styles/            # CSS styles
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── index.html             # HTML template
├── package.json           # Project metadata & scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation

````

---

## 🛠️ Getting Started

### 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 🚚 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/myshop-frontend.git
cd myshop-frontend

# Install dependencies
npm install
# or
yarn install
````

### 🚀 Run the App

```bash
npm run dev
# or
yarn dev
```

> 🧭 Visit: [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Configuration

### 🔗 API Base URL

By default, the frontend connects to the backend at:

```
http://127.0.0.1:8000/
```

To change it, update the `baseURL` in:
[`src/api/axios.js`](src/api/axios.js)

### 💳 Razorpay Integration

Razorpay checkout script is loaded via CDN in:
[`index.html`](index.html)

---

## 📦 NPM Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## 🧩 Tech Stack

* ⚛️ **React** (v19)
* ⚡ **Vite**
* 🎨 **Bootstrap** + **React-Bootstrap**
* 🌐 **Axios**
* 🔀 **React Router**
* 💳 **Razorpay** Payment Gateway
* 🧹 **ESLint**

---

## 🛠️ Customization Guide

* **Add Pages:** Create new files in [`src/pages/`](src/pages/)
* **Add Components:** Use [`src/components/`](src/components/)
* **Style Updates:** Edit styles in [`src/styles/`](src/styles/)
* **API Requests:** Centralized in [`src/api/axios.js`](src/api/axios.js)

---

## 🤝 Contributing

We welcome contributions! 🎉
Feel free to fork the project, open pull requests, or file issues for bugs/features.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙌 Credits

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Bootstrap](https://getbootstrap.com/)
* [Razorpay](https://razorpay.com/)

---

### ✅ Key Improvements:
- **Badges** for quick visual reference.
- **Bullet points & tables** to improve scannability.
- **Clear sections** with consistent heading levels.
- **Code blocks** where necessary for better clarity.
- **Inline links** and file paths to guide contributors.

---

## 📬 Contact

For questions or feedback, please open an issue [chandhupepakayala@gmail.com](mailto:chandhupepakayala@gmail.com)