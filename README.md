# EcommApp 🛒

A scalable and modular e-commerce backend system built with Django REST Framework and React.js. This project simulates a real-world e-commerce workflow with features like user authentication, product browsing, cart management, order placement, payment integration (Razorpay), and inventory tracking.

---

## 🔍 Overview

EcommApp is developed as a capstone project for Scaler Neovarsity’s Master’s Program in Computer Science. It demonstrates full-stack development, cloud deployment, and integration of third-party services like payment gateways and notification systems.

---

## ✨ Features

### 🔐 User Management
- User registration and login (token-based authentication)
- Admin and customer roles

### 📦 Product & Category
- CRUD for products and categories (admin only)
- View and filter products by category (customer)

### 🛒 Cart & Orders
- Add to cart, update quantity, remove items
- Place order from cart
- View order history

### 💳 Payments
- Razorpay integration
- Secure payment flow and status updates

### 🗃️ Inventory
- Stock management
- Stock deduction on order placement

### 🔔 Notifications
- Email notifications on order confirmation
- Configurable notification service

### 📈 Admin Panel
- Manage users, products, orders, and inventory
- Dashboard interface (optional frontend)

---

## 🧰 Tech Stack

| Layer       | Technology                  |
|-------------|------------------------------|
| Frontend    | React.js                     |
| Backend     | Django, Django REST Framework|
| Database    | PostgreSQL                   |
| Caching     | Redis                        |
| Payments    | Razorpay                     |
| Deployment  | Docker, AWS EC2/RDS/S3       |
| Docs & Auth | Swagger, JWT                 |

---

## ⚙️ Installation

### Prerequisites
- Python 3.9+
- Node.js 16+
- PostgreSQL
- Redis
- Docker (optional but recommended)

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/ashu7mishra/ecommapp.git
cd ecommapp/backend

# Create virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run the server
python manage.py runserver
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your_django_secret
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgres://user:password@localhost:5432/ecommapp
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

---

## 📦 API Documentation

Swagger UI is available at:

```
http://localhost:8000/swagger/
```

---

## 🧪 Testing

Run backend tests:

```bash
python manage.py test
```

---

## 🚀 Deployment

Docker and AWS-based deployment supported.

```bash
docker-compose up --build
```

- EC2 for hosting Django + React
- RDS for PostgreSQL
- S3 for static/media files

---

## 📝 License

MIT License. See [LICENSE](LICENSE) for more information.

---

## 🙌 Acknowledgements

Developed as part of the Master’s Capstone Project at Scaler Neovarsity, under the mentorship of Naman Bhalla.
