# Medini Edutech Backend

This is the backend for the Medini Edutech Internship Portal. It provides APIs for internship registration and management.

## Features

- User authentication (JWT)
- Role-based access control (Admin/User)
- Internship registration
- Admin dashboard
- Email notifications
- Data validation and sanitization
- Secure password hashing
- API security best practices

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- NPM or Yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `src/config` directory and add the following:
   ```
   NODE_ENV=development
   PORT=5000
   
   # MongoDB
   MONGO_URI=mongodb://localhost:27017/medini_edutech
   
   # JWT
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   
   # SMTP Configuration (for email)
   SMTP_HOST=smtp.ethereal.email
   SMTP_PORT=587
   SMTP_EMAIL=your_email@example.com
   SMTP_PASSWORD=your_password
   FROM_EMAIL=noreply@mediniedutech.com
   FROM_NAME=Medini Edutech
   ```

## Running the App

- Development: `npm run dev`
- Production: `npm start`

## Seeding the Database

To create an admin user:
```bash
node src/utils/seeder.js -i
```

Default admin credentials:
- Email: admin@medini.com
- Password: password123

## API Documentation

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password
- `POST /api/auth/forgotpassword` - Forgot password
- `PUT /api/auth/resetpassword/:resettoken` - Reset password
- `GET /api/auth/logout` - Logout user

### Internships

- `POST /api/internships/register` - Register for internship
- `GET /api/internships` - Get all internship registrations (Admin)
- `PUT /api/internships/:id/status` - Update internship status (Admin)

## Security

- Data sanitization
- XSS protection
- HTTP headers security
- Rate limiting
- CORS enabled
- Secure HTTP headers
- JWT authentication

## License

This project is licensed under the MIT License.
