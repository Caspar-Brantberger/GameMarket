

GameMarket is a hobby project for a simple game marketplace inspired by platforms such as Blocket.

The goal is to build a small full-stack application where users can browse, filter, create, update, and delete listings for video games.

This project is mainly built as a learning project to practice modern full-stack development with Next.js, Node.js, TypeScript, PostgreSQL, and Prisma.

Features
Browse game listings
View listing details
Filter listings
Register and log in
Update and delete user profiles
Create, update, and delete listings
Ownership checks for listings
Protected API routes
Form validation and error messages
Tech Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
Backend
Node.js
Express
TypeScript
Zod
bcrypt
JSON Web Tokens
Helmet
express-rate-limit
Database
PostgreSQL
Prisma ORM
Authentication and Security

GameMarket includes basic security suitable for a hobby MVP:

Password hashing with bcrypt
Authentication using JWT stored in an HTTP-only cookie
Protected backend routes
Authorization checks for profiles and listings
Request validation using Zod
Rate limiting on login and registration
Security headers using Helmet
Restricted CORS configuration
Project Structure
GameMarket/
  frontend/   # Next.js frontend application
  backend/    # Node.js and Express backend API
Project Status

The project currently represents an MVP.

Core functionality such as authentication, profile management, listing management, database integration, validation, and authorization has been implemented.

Possible future improvements include:

Image uploads
Search improvements
Pagination
Favorites
Messaging between users
Email verification
Password reset
Deployment