# Cardekho

# Features
User Authentication:

Sign-up: Users can create an account by providing their email and password.
Sign-in: Registered users can sign in using their credentials.
Email Notifications:

Welcome Email: Upon successful sign-up, users receive a welcome email containing their randomly generated password for future logins.
Dashboard:

User State Management: User state is managed using the Redux library.
Car Count: The dashboard displays the total number of registered cars in the system.
Car Categories:

CRUD Operations: Users can perform Create, Read, Update, and Delete operations on car categories.
Category Dropdown: When adding or editing a car, users can select a category from a dropdown menu.
Cars:

CRUD Operations: Users can perform Create, Read, Update, and Delete operations on cars.
Car Fields: The car details include color, model, make, registration number, and more.

# Technologies Used
1) Frontend:

React.js
Redux (for state management)
HTML5
CSS3
2) Backend: 

Node.js
Express.js
MongoDB (as the database)
Email Sending:

Nodemailer (for sending welcome emails)

you can install mongodb for this project and then you are good to go, 

you can run it on https://localhost:3000, 

server is running on https://localhost:3001, 

This is a dummy website but you can add more features to make it good, 
you can clone this project

# Project Structure


├── backend              # Backend API server
│   ├── controllers      # Request handlers
│   ├── models           # Data models
│   ├── routes           # API routes
│   ├── config           # Configuration files
│   └── server.js        # Server entry point
│
└── frontend             # React.js frontend
    ├── src              # Source code
    │   ├── components   # Reusable components
    │   ├── containers   # Container components
    │   ├── redux        # Redux store, actions, and reducers
    │   ├── services     # API service for backend communication
    │   ├── utils        # Utility functions
    │   ├── App.js       # Main application component
    │   ├── index.js     # Entry point
    │   └── index.css    # Global styles
    │
    ├── public           # Static files
    ├── package.json     # Frontend dependencies
    └── README.md        # Frontend documentation

# Getting Started
To run the Car Inventory Management System on your local machine, follow these steps:

Prerequisites
Node.js (v12 or higher)
MongoDB (installed and running)
# Installation
# Clone the repository:


git clone https://github.com/your-username/car-inventory-management.git
cd car-inventory-management
# Set up the backend:


cd backend
npm install
# Configure the backend:

Rename the .env.example file to .env.
Update the environment variables in the .env file with your configuration.
# Set up the frontend:


cd frontend
npm install
# Configure the frontend:

Open the src/services/api.js file and update the baseURL variable with the backend API URL.
Start the development servers:
# By Muhammad Haris
