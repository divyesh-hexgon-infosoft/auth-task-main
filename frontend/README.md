# React + Vite

This project is a frontend application built with React and Vite, providing a user interface for user authentication and management. It integrates with a GraphQL backend for functionalities such as user registration, admin login, and email verification.

## Features

- **User Registration**: Users can register with their name, email, password, and role (admin or customer).
- **Admin Login**: Admins can log in to access the admin dashboard.
- **Email Verification**: Users can verify their email addresses through a verification link.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **Apollo Client**: For managing GraphQL data.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Router**: For routing within the application.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   VITE_GRAPHQL_URL=http://localhost:4000/graphql
   ```

## Running the Application

To start the development server, run:
```bash
npm run dev
```

The application will be running on `http://localhost:3000`.

## API Endpoints

### Mutations

- **register**: 
  - Input: `name`, `email`, `password`, `role`
  - Description: Registers a new user.

- **login**: 
  - Input: `email`, `password`
  - Description: Authenticates the admin user.

- **verifyEmail**: 
  - Input: `token`
  - Description: Verifies the user's email using the provided token.

## Directory Structure

- **src/**: Contains the main application code.
  - **components/**: Contains React components for registration, admin login, and email verification.
  - **context/**: Contains context for authentication state management.
  - **graphql/**: Contains GraphQL queries and mutations.
  - **assets/**: Contains static assets like images and SVGs.
  - **App.jsx**: Main application component.
  - **main.jsx**: Entry point for the React application.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
