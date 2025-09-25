# Backend Developer Intern – Assignment

## Project Overview
This project is a **Scalable REST API with Authentication & Role-Based Access**, with a basic React frontend to demonstrate API usage.

**Core features implemented:**
- User registration & login with **hashed passwords** and **JWT authentication**  
- **Role-based access** (user vs admin)  
- CRUD operations for a secondary entity: **Tasks**  
- **API versioning**, **error handling**, and **validation**  
- Basic frontend with React to interact with the APIs  
- **Input sanitization** to prevent malformed requests  
- **Security measures:** JWT handling, password hashing, protected routes  

---

## Tech Stack
- **Backend:** Node.js, Express, MongoDB (Atlas)  
- **Frontend:** React.js  
- **Authentication:** JWT + Cookies  
- **Password hashing:** bcryptjs  

---

## Project Structure
```text
backend/
├── config/       # DB connection & JWT token config
├── controllers/  # Auth and Task controllers
├── middleware/   # JWT verification & role-based access
├── models/       # MongoDB schemas
├── routes/       # API routes
└── index.js      # Main server file

frontend/
└── src/
    ├── pages/           # Signup, Signin, Home
    ├── context/         # API context
    ├── App.jsx          # Routes setup
    └── ProtectedRoute.jsx

---
## Setup Instructions
1.Clone the repo

git clone <your-repo-url>
cd <repo-folder>


2.Backend

cd backend
npm install
cp .env.example .env
# Add your MongoDB Atlas URI and JWT secret to .env
npm start


3.Frontend

cd frontend
npm install
npm start


Open http://localhost:5173 in the browser to access the UI.

API Documentation

Postman collection included in the repo: Postman_Collection.json

Auth Routes
Endpoint	Method	Description
/api/auth/signup	POST	Register a new user
/api/auth/signin	POST	Login and receive JWT
Task Routes
Endpoint	Method	Description	Roles
/api/tasks	GET	Get all tasks	user/admin
/api/tasks	POST	Create a new task	admin
/api/tasks/:id	PUT	Update a task	admin
/api/tasks/:id	DELETE	Delete a task	admin
Security & Input Sanitization

Passwords are hashed with bcrypt

JWT tokens stored in httpOnly cookies

Input fields are trimmed and normalized

Protected routes ensure role-based access

Scalability & Optional Enhancements

Project structure allows easy addition of new modules

Optional improvements:

Redis caching for task queries

Winston logging for backend requests

Docker deployment for environment consistency

Notes

API versioning is implemented via route prefix: /api/v1/...

Error and success responses are standardized

Frontend handles authentication and route protection

Short Scalability Note

The backend project is structured to support microservices, modular controllers, and scalable database queries.
Future enhancements like Redis caching, load balancing, and containerized deployment (Docker) can be easily integrated to handle higher traffic and reduce latency
