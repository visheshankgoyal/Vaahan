# VAAHAN - Traffic Violation Reporting System

A community-powered web application for reporting and reviewing traffic violations. Built with React.js frontend and Spring Boot backend.

## 🚀 Features

### For Users
- **User Registration & Authentication**: Secure registration with email/SMS OTP verification
- **Violation Reporting**: Submit traffic violations with photos and detailed descriptions
- **Report Tracking**: View and track the status of submitted reports
- **Dashboard**: Overview of report statistics and recent activity

### For Reviewers
- **Report Review**: Review and validate submitted violation reports
- **Review Dashboard**: Track review statistics and pending reports
- **Review Guidelines**: Clear guidelines for report evaluation

### For Administrators
- **User Management**: Manage all users and their roles
- **Report Management**: Oversee all violation reports
- **System Statistics**: Comprehensive platform analytics
- **Admin Dashboard**: Complete system overview and management

## 🛠️ Technology Stack

### Frontend
- **React.js 19.1.1**: Modern React with hooks
- **Bootstrap 4.6**: Responsive UI framework
- **React Router DOM 7.7.1**: Client-side routing
- **Axios**: HTTP client for API calls
- **React Toastify**: User notifications
- **Font Awesome**: Icons

### Backend (Spring Boot)
- **Java Spring Boot**: RESTful API
- **JPA/Hibernate**: Database ORM
- **MySQL/PostgreSQL**: Database
- **JWT**: Authentication

## 📁 Project Structure

```
src/
├── api/
│   └── axiosConfig.js          # API configuration
├── auth/
│   ├── AuthContext.js          # Authentication context
│   └── PrivateRoute.js         # Route protection
├── components/
│   ├── Navbar.js              # Navigation component
│   └── ProtectedRoute.js      # Route protection
├── pages/
│   ├── Home.js                # Landing page
│   ├── Login.js               # User login
│   ├── Register.js            # User registration
│   ├── OtpVerify.js          # OTP verification
│   ├── UserDashboard.js       # User dashboard
│   ├── AdminDashboard.js      # Admin dashboard
│   ├── ReviewerDashboard.js   # Reviewer dashboard
│   ├── ReportViolation.js     # Violation reporting
│   ├── ViewMyReports.js       # User's reports
│   ├── ReviewReports.js       # Report review
│   ├── AdminUserManagement.js # User management
│   └── AdminAllReports.js     # All reports view
└── utils/
    └── roles.js               # Role definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Spring Boot backend running on port 8080

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vaahan-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### API Configuration
Update the API base URL in `src/api/axiosConfig.js`:
```javascript
const BASE_URL = "http://localhost:8080/api";
```

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:8080/api
```

## 📱 User Roles

### User (Default)
- Register and login
- Report traffic violations
- View personal reports
- Track report status

### Reviewer
- Review submitted reports
- Approve/reject violations
- Provide feedback
- Access review dashboard

### Admin
- Manage all users
- Oversee all reports
- System administration
- Access admin dashboard

## 🎨 UI/UX Features

- **Responsive Design**: Works on all device sizes
- **Bootstrap 4.6**: Modern, clean interface
- **Loading States**: User-friendly loading indicators
- **Toast Notifications**: Real-time feedback
- **Form Validation**: Client-side validation
- **Image Preview**: Photo upload with preview
- **Status Badges**: Clear status indicators
- **Filtering**: Advanced report filtering

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Role-based access control
- **Form Validation**: Input sanitization
- **Error Handling**: Comprehensive error management

## 📊 Key Improvements Made

1. **Bootstrap Integration**: Properly configured Bootstrap 4.6
2. **Authentication Flow**: Fixed AuthContext implementation
3. **Route Protection**: Improved role-based routing
4. **Dashboard Pages**: Created comprehensive dashboards
5. **Form Improvements**: Enhanced forms with validation
6. **UI/UX**: Modern, attractive interface
7. **Error Handling**: Better error messages and loading states
8. **Responsive Design**: Mobile-friendly layout
9. **Icon Integration**: Font Awesome icons throughout
10. **Code Organization**: Clean, maintainable code structure

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Build the project
2. Upload the `build` folder
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@vaahan.com or create an issue in the repository.

---

**VAAHAN** - Making roads safer, one report at a time! 🚗🚦
