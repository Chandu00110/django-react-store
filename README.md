# Django React Store

A full-stack e-commerce web application built with Django (backend) and React (frontend). This project demonstrates modern web development practices, including RESTful APIs, JWT authentication, payment integration, and responsive UI.

## 🚀 Features

- 🛒 **Product Catalog**: Browse by category, search, and view product details
- 🛍️ **Shopping Cart**: Add, update, and remove items easily
- 📦 **Order Management**: Place orders, view history, and track status
- 🔐 **User Authentication**: Secure login, registration, and JWT-based session handling
- 💳 **Payment Integration**: Razorpay payments (easily extendable)
- 🧑‍💻 **Admin Dashboard**: Manage products, categories, and orders via Django admin
- 📱 **Responsive UI**: Mobile-friendly design with Bootstrap

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Backend    | Django, Django REST Framework     |
| Frontend   | React (with Vite), Bootstrap      |
| Auth       | JWT (djangorestframework-simplejwt) |
| Database   | SQLite (switchable to PostgreSQL) |
| Payments   | Razorpay API                      |

---

## ⚙️ Getting Started

### 📌 Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **npm** or **yarn**

---

### 🔧 Backend Setup (Django)

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/django-react-store.git
cd django-react-store

# 2. Create and activate virtual environment
python -m venv venv
source venv/scripts/activate   # On Windows: venv\Scripts\activate

# 3. Install Python dependencies
cd backend
pip install -r requirements.txt

# 4. Run migrations
python manage.py migrate

# 5. Create a superuser for admin access
python manage.py createsuperuser

# 6. Start the Django server
python manage.py runserver
```
---

### 💻 Frontend Setup (React + Vite)

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install Node dependencies
npm install

# 3. Start the Vite dev server
npm run dev
```

### 🔐 Configuration

- Update environment variables in `.env` files for both backend and frontend as needed (e.g., API URLs, payment keys).
- For Razorpay integration, add your API keys in the backend settings.
- DEBUG=True
- SECRET_KEY=your-secret-key
- ALLOWED_HOSTS=localhost,127.0.0.1
- RAZORPAY_API_KEY=your_razorpay_key
- RAZORPAY_API_SECRET=your_razorpay_secret

---

### 🧪 Useful Commands

| Action                  | Command                        |
| ----------------------- | ------------------------------ |
| Run backend dev server  | `python manage.py runserver`   |
| Run frontend dev server | `npm run dev` (in `frontend/`) |
| Install Python packages | `pip install <package>`        |
| Install JS packages     | `npm install <package>`        |
| Django Admin Panel      | `http://localhost:8000/admin`  |

## 📁 Folder Structure

```
django-react-store/
├── backend/         # Django project and apps
├── frontend/        # React app
├── media/           # Uploaded product images
├── requirements.txt
├── README.md
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## ✅ What to Do Next

1. **Create or overwrite** the `README.md` in the root of your project folder.
2. **Paste** the above content into it.
3. **Customize** the following:
   - Replace `yourusername` in the Git clone URL
   - Add real API keys or environment variables in `.env` (not shared publicly)
   - Add screenshots if possible

Let me know if you’d like to generate badges (like GitHub stars, license, or last commit) or need a matching `LICENSE` file.

---

## 📝 License

This project is licensed under the MIT License.

## 📬 Contact

For questions or feedback, please open an issue [chandrashekharpepakayala@gmail.com](mailto:chandrashekharpepakayala@gmail.com)