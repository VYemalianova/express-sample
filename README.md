# express-sample

This is a simple Express.js application built with TypeScript.  
It serves as a coding example for setting up a clean, modern Node.js backend with TypeScript, Nodemon, ESLint, and Prettier.

## Tech Stack

- [Express](https://expressjs.com/) – minimal web framework for Node.js
- [TypeScript](https://www.typescriptlang.org/) – typed JavaScript
- [Nodemon](https://nodemon.io/) – restarts the server on file changes
- [ESLint](https://eslint.org/) – linting and code quality
- [Prettier](https://prettier.io/) – consistent code formatting

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

This uses nodemon + ts-node to auto-restart the server on changes.

### Build

```bash
npm run build
```

### Linting

```bash
npm run lint        # Check lint errors
npm run lint:fix    # Auto-fix lint issues
npm run format      # Format code with Prettier
```
