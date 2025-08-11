# VAAHAN - Traffic Violation Reporting System

A comprehensive web application for reporting and managing traffic violations. Built with Spring Boot backend and React frontend.

## 🚀 Features

### For Citizens (Users)
- Register and verify account via OTP
- Report traffic violations with photo evidence
- Track report status and history
- Earn VCoins for valid reports
- View personal dashboard

### For Traffic Reviewers
- Review submitted violation reports
- Validate evidence and approve/reject reports
- Manage report status
- Access reviewer dashboard

### For Administrators
- Manage user accounts and roles
- View all reports and statistics
- Configure system settings
- Manage VCoin distribution

## 🛠️ Technology Stack

### Backend
- **Spring Boot 3.2.5** - Main framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database operations
- **MySQL** - Database
- **JWT** - Token-based authentication
- **Spring Mail** - Email notifications
- **Maven** - Dependency management

### Frontend
- **React 19.1.1** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Bootstrap 4.6** - UI components
- **React Toastify** - Notifications

## 📋 Prerequisites

- Java 21 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd VAAHAN-Project
```

### 2. Database Setup
1. Create a MySQL database named `vaahan`
2. Update database credentials in `vaahan-backend/src/main/resources/application.properties`

### 3. Backend Setup
```bash
cd vaahan-backend

# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup
```bash
cd vaahan-frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will start on `http://localhost:3000`

## 🔧 Configuration

### Backend Configuration
Update `vaahan-backend/src/main/resources/application.properties`:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/vaahan
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT
jwt.secret=your_jwt_secret_key
jwt.expirationMs=86400000

# Email (for OTP)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password

# CORS
cors.allowed-origins=http://localhost:3000
```

### Frontend Configuration
Update `vaahan-frontend/src/api/axiosConfig.js` if needed:

```javascript
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
```

## 📁 Project Structure

```
VAAHAN-Project/
├── vaahan-backend/                 # Spring Boot Backend
│   ├── src/main/java/com/vaahan/
│   │   ├── config/                 # Configuration classes
│   │   ├── controller/             # REST controllers
│   │   ├── dto/                    # Data Transfer Objects
│   │   ├── entities/               # JPA entities
│   │   ├── repository/             # Data repositories
│   │   ├── security/               # Security configuration
│   │   ├── service/                # Business logic
│   │   └── util/                   # Utility classes
│   └── src/main/resources/
│       └── application.properties  # Configuration
├── vaahan-frontend/                # React Frontend
│   ├── src/
│   │   ├── api/                    # API configuration
│   │   ├── auth/                   # Authentication context
│   │   ├── components/             # Reusable components
│   │   ├── pages/                  # Page components
│   │   └── utils/                  # Utility functions
│   └── package.json
└── README.md
```

## 🔐 Authentication Flow

1. **Registration**: User registers with email/phone → OTP sent → Account verified
2. **Login**: Username/email + password → JWT token generated
3. **Authorization**: Role-based access control (USER, REVIEWER, ADMIN)

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/resend-otp` - Resend OTP

### OTP Management
- `POST /api/otp/generate` - Generate OTP
- `POST /api/otp/verify` - Verify OTP
- `POST /api/otp/fetch-otp` - Fetch OTP (testing)

### User Management
- `GET /api/admin/users` - Get all users (Admin)
- `POST /api/admin/create-user` - Create user (Admin)

## 🧪 Testing

### Backend Testing
```bash
cd vaahan-backend
mvn test
```

### Frontend Testing
```bash
cd vaahan-frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file:
```bash
mvn clean package
```

2. Run the JAR:
```bash
java -jar target/Vaahan-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
1. Build for production:
```bash
npm run build
```

2. Serve the build folder using a web server like nginx or Apache.

## 🔒 Security Features

- JWT-based authentication
- Role-based authorization
- Password encryption (BCrypt)
- CORS configuration
- Input validation
- SQL injection prevention

## 📧 Email Configuration

For OTP functionality, configure your email settings:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Update the email configuration in `application.properties`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## 🔄 Version History

- **v1.0.0** - Initial release with basic functionality
- Authentication and authorization
- User registration with OTP
- Traffic violation reporting
- Role-based dashboards

---

**Note**: This is a development version. For production deployment, ensure proper security configurations and environment variables are set. 
