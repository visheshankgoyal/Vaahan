# Vaahan - Traffic Violation Reporting System

A comprehensive Spring Boot application for reporting and managing traffic violations with role-based access control, file upload capabilities, and RESTful API endpoints.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **Traffic Violation Reporting**: Submit reports with images and detailed information
- **Role-Based Access Control**: Three user roles (USER, REVIEWER, ADMIN)
- **File Upload**: Support for image uploads with validation
- **Email Integration**: OTP verification system
- **API Documentation**: Swagger/OpenAPI documentation
- **Comprehensive Error Handling**: Global exception handling with detailed error responses
- **Security**: CORS configuration, password encryption, and secure endpoints

## 🛠️ Technology Stack

- **Backend**: Spring Boot 3.5.4 with Java 21
- **Database**: MySQL 8.0
- **Security**: Spring Security with JWT
- **Documentation**: Swagger/OpenAPI 3.0
- **Build Tool**: Maven
- **Libraries**: Lombok, JPA/Hibernate, Validation API

## 📋 Prerequisites

- Java 21 or higher
- Maven 3.6+
- MySQL 8.0+
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Vaahan
```

### 2. Database Setup
Create a MySQL database:
```sql
CREATE DATABASE vaahan;
CREATE DATABASE vaahan_dev; -- for development
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
# Database Configuration
DB_USERNAME=root
DB_PASSWORD=your_password
DATABASE_URL=jdbc:mysql://localhost:3303/vaahan

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRATION_MS=86400000

# Email Configuration
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# File Upload
FILE_UPLOAD_PATH=./uploads/

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:4200
CORS_ALLOWED_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=*
```

### 4. Build and Run
```bash
# Build the project
mvn clean install

# Run in development mode
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Run in production mode
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

### 5. Access the Application
- **Application**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html
- **Health Check**: http://localhost:8080/actuator/health

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/otp/generate` - Generate OTP
- `POST /api/otp/verify` - Verify OTP

### User Endpoints
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/reports` - Get user's reports

### Violation Report Endpoints
- `POST /api/reports` - Submit violation report
- `POST /api/reports/with-image` - Submit report with image
- `GET /api/reports/user/{userId}` - Get user's reports
- `GET /api/reports/{reportId}` - Get specific report

### Reviewer Endpoints
- `GET /api/reviewer/pending` - Get pending reports
- `PUT /api/reviewer/status/{reportId}` - Update report status

### Admin Endpoints
- `GET /api/admin/users` - Get all users
- `GET /api/admin/reports` - Get all reports

### File Upload Endpoints
- `POST /api/files/upload` - Upload file
- `GET /api/files/{fileName}` - Download file

## 🔐 Security

### User Roles
1. **USER**: Can submit reports and view their own reports
2. **REVIEWER**: Can review and approve/reject reports
3. **ADMIN**: Full system access

### Security Features
- JWT-based authentication
- Role-based authorization
- Password encryption with BCrypt
- CORS configuration
- Input validation
- File upload security

## 📁 Project Structure

```
src/main/java/com/vaahan/
├── config/                 # Configuration classes
├── controller/            # REST controllers
├── dto/                   # Data Transfer Objects
├── entities/              # JPA entities
├── exception/             # Custom exceptions and handlers
├── repository/            # Data access layer
├── security/              # Security configuration
├── service/               # Business logic
│   └── impl/             # Service implementations
└── util/                  # Utility classes
```

## 🔧 Configuration

### Development Profile
```properties
spring.profiles.active=dev
```

### Production Profile
```properties
spring.profiles.active=prod
```

## 📊 Database Schema

### Key Entities
- **User**: User accounts and authentication
- **ViolationReport**: Traffic violation reports
- **Violation**: Predefined violation types
- **ViolationCategory**: Violation categories
- **Otp**: Email verification

## 🚨 Error Handling

The application includes comprehensive error handling:
- Global exception handler
- Custom exceptions
- Validation error responses
- File upload error handling
- Security exception handling

## 📝 Logging

The application uses SLF4J with Logback for logging:
- Request/response logging
- Security event logging
- File operation logging
- Error logging

## 🧪 Testing

```bash
# Run tests
mvn test

# Run with coverage
mvn jacoco:report
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build Docker image
docker build -t vaahan .

# Run container
docker run -p 8080:8080 vaahan
```

### Production Considerations
1. Use environment variables for sensitive data
2. Configure proper CORS settings
3. Set up SSL/TLS
4. Configure database connection pooling
5. Set up monitoring and logging
6. Configure backup strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@vaahan.com
- Documentation: http://localhost:8080/swagger-ui.html
- Issues: Create an issue in the repository

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Basic CRUD operations
- JWT authentication
- File upload support
- API documentation
- Comprehensive error handling 