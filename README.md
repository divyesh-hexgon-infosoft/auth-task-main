# Auth Task Main

This is a backend application for user authentication and management, built using Node.js, Express, and GraphQL. It provides functionalities for user registration, email verification, password reset, and user login.

## Features

- **User Registration**: Users can register with their name, email, password, and role (admin or customer).
- **Email Verification**: After registration, users receive a verification email to confirm their email address.
- **Login**: Users can log in with their email and password.
- **Password Reset**: Users can request a password reset link via email.
- **Role-Based Access**: Only users with the admin role can log in as administrators.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for Node.js.
- **GraphQL**: Query language for APIs.
- **MySQL**: Database for storing user information.
- **Nodemailer**: For sending emails.
- **JWT (JSON Web Tokens)**: For authentication and authorization.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd auth-task-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   JWT_SECRET=your_jwt_secret
   PORT=4000
   ```

4. Initialize the database:
   Run the SQL commands in `backend/migrations/init.sql` to create the necessary tables.

## Running the Application

To start the server, run:
```

The server will be running on `http://localhost:4000/graphql`.

## API Endpoints

### Mutations

- **register**: 
  - Input: `name`, `email`, `password`, `role`
  - Description: Registers a new user and sends a verification email.

- **verifyEmail**: 
  - Input: `token`
  - Description: Verifies the user's email using the provided token.

- **forgotPassword**: 
  - Input: `email`
  - Description: Sends a password reset link to the user's email.

- **resetPassword**: 
  - Input: `token`, `newPassword`
  - Description: Resets the user's password using the provided token.

### Queries

- **login**: 
  - Input: `email`, `password`
  - Description: Authenticates the user and returns a JWT token.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.