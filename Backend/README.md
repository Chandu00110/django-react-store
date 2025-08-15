Here’s an improved and professional version of your `README.md` file, designed for clarity, ease of use, and presentation. This version adds better markdown structure, clearer instructions, and a more polished tone suitable for public repositories or collaborative projects.

---

# 🛒 Django React Store

A full-stack e-commerce web application built with **Django** (backend) and **React** (frontend). The platform supports product management, JWT-based user authentication, secure Razorpay payments, and media uploads for product images.

---

## 🚀 Features

* 🛍️ Product catalog with images
* 🧾 Categories, orders, and cart management
* 🔐 JWT-based authentication
* ⚙️ RESTful API using Django REST Framework
* 💳 Razorpay payment integration
* 🖼️ Media file uploads (product images)
* 🛠️ Admin dashboard for backend control

---

## 📁 Project Structure

```bash
├── Backend/                  # Django backend
│   ├── manage.py
│   ├── db.sqlite3
│   ├── requirements.txt
│   ├── Backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   └── store/
│       ├── models.py
│       ├── views.py
│       ├── urls.py
│       ├── api/
│       └── migrations/
├── media/
│   └── products/             # Uploaded product images
└── store/                    # React frontend (not shown)
```

---

## ⚙️ Getting Started

### 🐍 Backend (Django)

1. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

2. **Run migrations**

   ```bash
   python manage.py migrate
   ```

3. **Create superuser**

   ```bash
   python manage.py createsuperuser
   ```

4. **Start the development server**

   ```bash
   python manage.py runserver
   ```

5. **Visit the Admin Panel**

   * [http://localhost:8000/admin/](http://localhost:8000/admin/)

---

### ⚛️ Frontend (React)

> 💡 Ensure your React frontend is located in a separate folder (`store/` assumed here)

1. **Navigate to frontend directory**

   ```bash
   cd store/
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Visit the frontend**

   * [http://localhost:5173/](http://localhost:5173/)

---

## 🔌 API Endpoints

Main API routes are defined in [`store/api/api_urls.py`](Backend/store/api/api_urls.py)

| Endpoint               | Description               |
| ---------------------- | ------------------------- |
| `/api/products/`       | List or retrieve products |
| `/api/categories/`     | Manage product categories |
| `/api/orders/`         | Manage user orders        |
| `/api/create-payment/` | Initiate Razorpay payment |
| `/api/store-payment/`  | Confirm and store payment |

---

## 🛠 Configuration Notes

* **Media Files:** Uploaded product images are saved in [`media/products/`](media/products/)
* **Static Files:** Served from `/static/`
* **Razorpay Keys:** Set in `Backend/settings.py`:

  ```python
  RAZORPAY_KEY_ID = 'your_key_here'
  RAZORPAY_KEY_SECRET = 'your_secret_here'
  ```
* **CORS:** Configured to allow requests from React dev server (`http://localhost:5173`)

---

## 🧰 Technologies Used

| Backend               | Frontend    | Other Tools      |
| --------------------- | ----------- | ---------------- |
| Django 5.2.5          | React       | Razorpay API     |
| Django REST Framework | Vite        | Pillow (Images)  |
| Simple JWT            | Axios/Fetch | SQLite (default) |

---

## 🔒 Production Considerations

Before deploying to production:

* Set `DEBUG = False` in `settings.py`
* Configure `ALLOWED_HOSTS`
* Use a secure `SECRET_KEY`
* Consider using PostgreSQL or MySQL
* Set up HTTPS and secure CORS policies

---

## 📄 License

This project is licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for more details.

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📬 Contact

For questions or feedback, please open an issue [chandhupepakayala@gmail.com](mailto:chandhupepakayala@gmail.com)