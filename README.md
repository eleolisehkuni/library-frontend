# Library Management System Frontend
A React frontend for managing books, built with Vite and Tailwind CSS, integrated with a Spring Boot backend and PostgreSQL.

## Setup
1. Ensure the backend is running at `http://localhost:8080`.
2. Install dependencies: `npm install`.
3. Start the app: `npm run dev`.
4. Open `http://localhost:5173` in a browser.

## Features
- View a list of books.
- Search books by title.
- Add, edit, and delete books.

## Technologies
- React, Vite, Tailwind CSS, Axios, React Router
- Backend: Spring Boot, PostgreSQL
- Tools: Git, Postman

## API Endpoints
- GET `/api/books`: List all books
- POST `/api/books`: Create a book
- GET `/api/books/{id}`: Get a book
- PUT `/api/books/{id}`: Update a book
- DELETE `/api/books/{id}`: Delete a book
- GET `/api/books/search?title={title}`: Search books by title
●	Commit:
git add README.md
git commit -m "Add README for frontend"
git push origin main