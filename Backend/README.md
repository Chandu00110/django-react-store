# Django React Store

A full-stack e-commerce web application built with Django (backend) and React (frontend). This project supports product management, user authentication (JWT), payments via Razorpay, and media uploads.

## Features

- Product catalog with images
- Categories and orders
- User authentication (JWT)
- REST API (Django REST Framework)
- Razorpay payment integration
- Media file uploads
- Admin dashboard

## Project Structure

```
Backend/
    manage.py
    db.sqlite3
    requirements.txt
    Backend/
        settings.py
        urls.py
        ...
    store/
        models.py
        views.py
        urls.py
        api/
        migrations/
        ...
    media/
        products/
            *.jpeg
store/
    (React frontend - not shown here)
```

## Getting Started

### Backend (Django)

1. **Install dependencies:**
    ```sh
    pip install -r requirements.txt
    ```

2. **Apply migrations:**
    ```sh
    python manage.py migrate
    ```

3. **Create a superuser:**
    ```sh
    python manage.py createsuperuser
    ```

4. **Run the development server:**
    ```sh
    python manage.py runserver
    ```

5. **Access the admin panel:**
    - Visit `http://localhost:8000/admin/`

### Frontend (React)

*(Assuming you have a React app in a separate folder)*

1. **Install dependencies:**
    ```sh
    npm install
    ```

2. **Start the React development server:**
    ```sh
    npm start
    ```

3. **Access the frontend:**
    - Visit `http://localhost:5173/`

## API Endpoints

- Main API routes are defined in [`store/api/api_urls.py`](store/api/api_urls.py)
- Example endpoints:
    - `/api/products/`
    - `/api/categories/`
    - `/api/orders/`
    - `/api/create-payment/`
    - `/api/store-payment/`

## Configuration

- **Media files:** Uploaded product images are stored in [`media/products/`](media/products/)
- **Static files:** Served from `/static/`
- **Razorpay keys:** Set in [`Backend/settings.py`](Backend/settings.py) as `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
- **CORS:** Configured for React dev server (`http://localhost:5173`)

## Technologies Used

- Django 5.2.5
- Django REST Framework
- Simple JWT
- Pillow (image handling)
- Razorpay (payments)
- React (frontend)
- SQLite (default database)

## License

This project is licensed under the MIT License.

---

**Note:** For production, update `DEBUG`, `ALLOWED_HOSTS`, and secret keys in [`Backend/settings.py`](Backend/settings.py)