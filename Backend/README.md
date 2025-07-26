# Home Decor Backend API

A comprehensive backend API for the Home Decor Interior Management System built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Complete user profiles with preferences and settings
- **Project Management**: Full CRUD operations for interior design projects
- **Appointment System**: Scheduling and management of consultations
- **Design Portfolio**: Gallery system with likes, reviews, and ratings
- **Contact System**: Contact forms with email notifications
- **File Upload**: Support for images and documents
- **Security**: Rate limiting, CORS, input validation, and sanitization

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠 Installation

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the backend directory with the following variables:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/home-decor
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   
   # Server
   PORT=5000
   NODE_ENV=development
   
   # Email (for contact forms and notifications)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB**:
   - Local MongoDB: Make sure MongoDB is running on your system
   - MongoDB Atlas: Use the connection string in MONGODB_URI

5. **Run the server**:
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // or "admin"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

### User Management

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "+1234567890",
  "preferences": {
    "style": "modern",
    "budget": "15k-30k"
  }
}
```

#### Get All Users (Admin Only)
```http
GET /api/users?page=1&limit=10&role=user
Authorization: Bearer <admin-token>
```

### Project Management

#### Create Project
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Living Room Redesign",
  "description": "Modern living room with minimalist design",
  "category": "living-room",
  "style": "modern",
  "budget": {
    "min": 5000,
    "max": 15000
  },
  "timeline": {
    "startDate": "2025-02-01",
    "endDate": "2025-04-01"
  }
}
```

#### Get Projects
```http
GET /api/projects?page=1&limit=10&status=in-progress
Authorization: Bearer <token>
```

#### Get Project by ID
```http
GET /api/projects/:id
Authorization: Bearer <token>
```

#### Update Project
```http
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed",
  "progress": 100
}
```

### Appointment Management

#### Create Appointment
```http
POST /api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "designer": "designer-user-id",
  "title": "Initial Consultation",
  "type": "consultation",
  "scheduledDate": "2025-01-20T14:00:00Z",
  "duration": 60,
  "location": {
    "type": "online",
    "meetingLink": "https://zoom.us/j/123456789"
  }
}
```

#### Get Appointments
```http
GET /api/appointments?page=1&status=scheduled
Authorization: Bearer <token>
```

#### Check Designer Availability
```http
GET /api/appointments/designer/:designerId/availability?date=2025-01-20
Authorization: Bearer <token>
```

### Design Portfolio

#### Get All Designs
```http
GET /api/designs?page=1&category=living-room&style=modern
```

#### Get Design by ID
```http
GET /api/designs/:id
```

#### Create Design (Admin/Designer Only)
```http
POST /api/designs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Modern Living Room",
  "description": "A beautiful modern living room design",
  "category": "living-room",
  "style": "modern",
  "images": [
    {
      "url": "https://example.com/image1.jpg",
      "caption": "Main view",
      "isMain": true
    }
  ],
  "tags": ["modern", "minimalist", "cozy"]
}
```

#### Like/Unlike Design
```http
POST /api/designs/:id/like
Authorization: Bearer <token>
```

#### Add Review
```http
POST /api/designs/:id/review
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Amazing design! Love the color scheme."
}
```

### Contact System

#### Send Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Kitchen Renovation Inquiry",
  "message": "I'm interested in renovating my kitchen...",
  "projectType": "Residential - Kitchen",
  "budget": "$15,000 - $30,000",
  "preferredContact": "email"
}
```

#### Newsletter Subscription
```http
POST /api/contact/newsletter
Content-Type: application/json

{
  "email": "jane@example.com",
  "name": "Jane Doe"
}
```

## 🔒 Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### User Roles
- **user**: Regular customers who can create projects and book appointments
- **admin**: Full access to all resources and user management

## 📊 Database Schema

### User Model
- Personal information (name, email, phone, address)
- Authentication (password, role, status)
- Preferences (style, budget, notifications)
- Timestamps and activity tracking

### Project Model
- Project details (title, description, category, style)
- Budget and timeline information
- Status tracking and progress
- Client and designer relationships
- Images and documents
- Feedback and ratings

### Appointment Model
- Scheduling information (date, time, duration)
- Participants (client, designer)
- Meeting details (type, location, notes)
- Status tracking and reminders

### Design Model
- Design information (title, description, category, style)
- Media (images, colors, materials)
- Engagement (likes, views, reviews)
- Designer attribution
- Public/private visibility

## 🛡 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: express-validator for data validation
- **CORS Protection**: Configurable cross-origin requests
- **Helmet**: Security headers
- **Role-based Access**: Different permissions for users and admins

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/home-decor
JWT_SECRET=your-production-jwt-secret-very-long-and-secure
FRONTEND_URL=https://your-frontend-domain.com
EMAIL_HOST=your-production-email-host
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-email-password
```

### Production Considerations
1. Use a strong JWT secret (at least 32 characters)
2. Set up MongoDB Atlas for cloud database
3. Configure production email service (SendGrid, AWS SES, etc.)
4. Set up proper logging and monitoring
5. Use HTTPS in production
6. Configure proper CORS origins

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "pagination": { ... } // for paginated results
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ] // validation errors if applicable
}
```

## 🔧 Development

### Available Scripts
- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon
- `npm test`: Run tests (to be implemented)

### Project Structure
```
backend/
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── uploads/         # File upload directory
├── .env            # Environment variables
├── server.js       # Main server file
└── package.json    # Dependencies and scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: support@homedecor.com
- Documentation: Check the API endpoints above
- Issues: Create an issue in the repository

---

**Note**: This backend is designed to work with the Home Decor React frontend. Make sure both are running for full functionality.