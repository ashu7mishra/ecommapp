EcommApp
--------------
EcommApp is a scalable and modular full-stack e-commerce application developed as a capstone project for Scaler Neovarsity’s Master’s Program in Computer Science. It simulates a real-world e-commerce workflow, encompassing user authentication, product browsing, cart management, order placement, payment integration (Razorpay), and inventory tracking.

Features
----------------
User Authentication: Secure registration and login functionalities.
Product Browsing: Comprehensive product listings with detailed views.
Cart Management: Add, update, and remove products from the shopping cart.
Order Placement: Seamless order processing and management.
Payment Integration: Integrated Razorpay for secure transactions.
Inventory Tracking: Real-time inventory management to prevent overselling.

Tech Stack
--------------
Frontend: React.js
Backend: Django REST Framework

Database: PostgreSQL/SQLite

Payment Gateway: Razorpay

Prerequisites
-----------------
Python 3.x
Node.js and npm
PostgreSQL

Backend Setup
------------------
Clone the repository:
    git clone https://github.com/ashu7mishra/ecommapp.git
    cd ecommapp/backend
Create and activate a virtual environment:
    python -m venv env
    source env/bin/activate  # On Windows: env\Scripts\activate
Install dependencies:
    pip install -r requirements.txt
Configure the database:
    Update the settings.py file with your PostgreSQL credentials.
Apply migrations:
    python manage.py migrate
Create a superuser:
    python manage.py createsuperuser
Run the development server:
    python manage.py runserver

Frontend Setup
-----------------------
Navigate to the frontend directory:
    cd ../frontend
Install dependencies:
    npm install
Start the development server:
    npm start

Usage
-----------
Access the frontend at http://localhost:3000/.
Access the backend API at http://localhost:8000/api/.

Documentation
-----------------
Project Report: Detailed documentation is available in the repository under Scaler_Neovarsity_Academy_Project_Report_Ashutosh_Mishra.pdf.

Class Diagram: Refer to classDiagram.drawio for the system architecture.