# express-sample

A sample REST API built with Express.js and TypeScript. 
The project demonstrates common backend concepts such as routing, request validation, error handling, JSON-based data storage, JWT authentication, password hashing, and role-based access control.
The API provides user authentication, zodiac sign information, and horoscope management with public and protected endpoints.

## Features

- **User Authentication & Authorization**
  - User registration and login
  - Password hashing with bcrypt
  - JWT authentication
  - Role-based access control (admin / user)
  
- **Horoscope Management**
  - Public and protected endpoints
  - Full CRUD operations (Create, Read, Update, Delete)
  - Multiple horoscope types and zodiac signs
  
- **Data Validation & Error Handling**
  - Comprehensive request validation with express-validator
  - Centralized error handling
  
- **Data Storage & Utilities**
  - JSON-based mock data storage (suitable for development and testing)
  - UUIDs for user and horoscope IDs
  - Date handling with Day.js
  
- **Developer Experience**
  - Full TypeScript support with strict type checking
  - Automated code formatting with Prettier
  - ESLint for code quality and consistency
  - Nodemon for automatic server restart during development
  - CORS support for cross-origin requests

## Tech Stack

- [Express](https://expressjs.com/) – minimal web framework for Node.js
- [TypeScript](https://www.typescriptlang.org/) – typed JavaScript for type-safe development
- [Nodemon](https://nodemon.io/) – automatically restarts server on file changes
- [ESLint](https://eslint.org/) – linting and code quality assurance
- [Prettier](https://prettier.io/) – consistent code formatting
- [uuid](https://github.com/uuidjs/uuid) – generates unique identifiers
- [Day.js](https://day.js.org/) – lightweight date manipulation
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) – secure password hashing
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) – JWT creation and verification
- [express-validator](https://express-validator.github.io/) – request input validation
- [CORS](https://github.com/expressjs/cors) – enables cross-origin requests
- [dotenv](https://github.com/motdotla/dotenv) – environment variable management

## Project Structure

```
express-sample/
├── src/
│   ├── controllers/          # Request handlers for routes
│   │   ├── auth.controller.ts
│   │   ├── horoscope.controller.ts
│   │   └── signs.controller.ts
│   ├── routes/               # API route definitions
│   │   ├── auth.routes.ts
│   │   ├── horoscope.routes.ts
│   │   └── signs.routes.ts
│   ├── services/             # Business logic layer
│   │   ├── auth.service.ts
│   │   ├── horoscope.service.ts
│   │   └── signs.service.ts
│   ├── middlewares/          # Express middleware
│   │   ├── auth-jwt.ts       # JWT authentication
│   │   ├── auth-horoscope-access.ts
│   │   ├── error-handler.ts  # Global error handling
│   │   ├── require-role.ts   # Role-based access control
│   │   └── validation-errors-handler.ts
│   ├── models/               # TypeScript interfaces and types
│   │   ├── horoscope.model.ts
│   │   ├── sign.model.ts
│   │   ├── user.model.ts
│   │   ├── response.ts
│   │   └── http-error.ts
│   ├── helpers/              # Utility functions
│   │   ├── file.helper.ts    # JSON file operations
│   │   └── validators.helper.ts
│   ├── data/                 # JSON mock data files
│   │   ├── horoscopes.json
│   │   ├── signs.json
│   │   └── users.json
│   ├── utils/                # Misc utility functions
│   │   └── auth.ts
│   └── index.ts              # Application entry point
├── dist/                      # Compiled JavaScript (generated)
├── eslint.config.mjs          # ESLint configuration
├── tsconfig.json              # TypeScript configuration
├── nodemon.json               # Nodemon configuration
├── package.json               # Project dependencies
└── README.md                  # This file
```

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

`JWT_SECRET` is used to sign and verify JWT tokens.

### Development Server

```bash
npm run dev
```

The server runs on: `http://localhost:3000`.

### Build

```bash
npm run build
```

### Production Start

```bash
npm start
```

### Linting & Formatting

```bash
npm run lint        # Check for linting errors
npm run lint:fix    # Automatically fix linting issues
npm run format      # Format code with Prettier
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register a new user | No |
| POST | `/auth/signin` | Login and get JWT token | No |
| DELETE | `/auth/:id` | Delete user account | Yes |

**Request Body Examples:**

**Sign Up / Sign In:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

### Signs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/signs` | Get all zodiac signs | No |
| GET | `/signs/:signType` | Get a specific sign details | No |

### Horoscopes

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| GET | `/horoscope` | Get horoscopes (filtered by query params) | Yes* | user / admin |
| POST | `/horoscope` | Create new horoscope | Yes | admin |
| PUT | `/horoscope` | Update existing horoscope | Yes | admin |
| DELETE | `/horoscope/:id` | Delete horoscope | Yes | admin |

## Authentication & Authorization

Include the token in the `Authorization` header with the `Bearer` scheme:
```
Authorization: Bearer <your_jwt_token_here>
```

The application supports two roles: 
- **Admin** – Full access to create, update, and delete horoscopes
- **User** – Can only read/fetch horoscopes.

Requests without a valid JWT return `401 Unauthorized`.
Authenticated users without the required role return `403 Forbidden`.

## Mock Data Storage

This application uses **JSON files** as a simple mock database for development and testing purposes:

- `src/data/users.json` – User accounts and credentials
- `src/data/horoscopes.json` – Horoscope records
- `src/data/signs.json` – Zodiac sign definitions

The `file.helper.ts` module provides utility functions to read and write these JSON files.

User passwords are stored as bcrypt hashes, and UUIDs are generated when users and horoscopes are created.

JSON storage is used to keep this sample project simple and does not require database setup.

This is not suitable for production. For production deployments, integrate a proper database (PostgreSQL, MongoDB, etc.).
