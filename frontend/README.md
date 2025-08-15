# 🛒 MyShop E-Commerce Frontend

A modern, responsive e-commerce frontend built with **React** and **Vite**. This project features product browsing, cart management, order history, authentication, and seamless payment integration.

---

## 🚀 Features

- **Product Listing:** Browse products with image carousels and details.
- **Categories:** Filter products by categories.
- **Product Details:** View detailed information and images for each product.
- **Cart:** Add, remove, and view items in your cart.
- **Orders:** Track your order history.
- **Authentication:** Secure login with JWT tokens.
- **Payment Integration:** Pay securely via Razorpay.
- **Responsive Design:** Built with Bootstrap for mobile and desktop.

---

## 🏗️ Project Structure

```
frontend/
│
├── public/                # Static assets
│   └── vite.svg
├── src/
│   ├── api/               # API utilities (Axios setup)
│   ├── assets/            # Images and icons
│   ├── components/        # Reusable UI components
│   ├── pages/             # Application pages (Home, Cart, Orders, etc.)
│   ├── styles/            # CSS styles
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── index.html             # HTML template
├── package.json           # Project metadata & scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/myshop-frontend.git
   cd myshop-frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Configuration

- **API Base URL:**  
  The frontend expects a Django backend running at `http://127.0.0.1:8000/`.  
  Update [`src/api/axios.js`](src/api/axios.js) if your backend URL differs.

- **Payment Integration:**  
  Razorpay checkout is loaded via CDN in [`index.html`](index.html).

---

## 📦 Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

---

## 🧩 Technologies Used

- **React** (v19)
- **Vite**
- **Bootstrap** & **React-Bootstrap**
- **Axios**
- **React Router**
- **Razorpay** (payment gateway)
- **ESLint** (code quality)

---

## 📝 Customization

- **Add new pages:** Place in [`src/pages/`](src/pages/)
- **Add new components:** Place in [`src/components/`](src/components/)
- **Update styles:** Edit files in [`src/styles/`](src/styles/)
- **API calls:** Use [`src/api/axios.js`](src/api/axios.js) for authenticated requests

---

## 🙋‍♂️ Contributing

Pull requests and suggestions are welcome!  
Please open issues for bugs or feature requests.

---

## 📄 License

This project is licensed under the MIT License.

---

## 💡 Credits

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/)