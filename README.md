# Bullana Bet 🎲

A modern, full-stack cryptocurrency betting platform built with React, Node.js, and MongoDB. Bullana Bet provides a secure and user-friendly gambling experience with crypto wallet integration and comprehensive user management.

## 🚀 Features

- **Crypto Wallet Integration** - Seamless wallet connection for secure transactions
- **User Registration & Authentication** - Complete registration flow with email verification
- **Email Verification System** - 4-digit code verification with secure email delivery
- **Professional UI/UX** - Modern, responsive design with accessibility features
- **User Dashboard** - Comprehensive user statistics and activity tracking
- **Multiple Games** - Support for various betting games (Dice, Roulette, Mines, etc.)
- **Real-time Updates** - Live game results and user activity
- **Admin Panel** - Complete administrative interface for platform management

## 🏗️ Architecture

### Frontend (`/frontend`)
- **React 18** with TypeScript
- **Responsive Design** with mobile-first approach
- **Component-based Architecture** for reusability
- **State Management** with React Context
- **Routing** with React Router v6

### Backend (`/backend`)
- **Node.js** with Express.js framework
- **MongoDB** for data persistence
- **JWT Authentication** for secure sessions
- **Email Service** integration for notifications
- **RESTful API** design with proper error handling

### Admin Panel (`/admin`)
- **Angular** framework for administrative interface
- **Real-time Analytics** and user management
- **Game Configuration** and platform settings
- **Financial Reporting** and transaction monitoring

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheDEV111/Bull.git
   cd Bull
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install --legacy-peer-deps
   
   # Install frontend dependencies
   cd frontend && npm install --legacy-peer-deps
   
   # Install backend dependencies
   cd ../backend && npm install
   
   # Install admin dependencies
   cd ../admin && npm install
   ```

3. **Environment Configuration**
   - Copy `.env.example` to `.env` in each directory
   - Configure database connections and API keys
   - Set up email service credentials

4. **Start the development servers**
   ```bash
   # Backend (Port: 13578)
   cd backend && npm start
   
   # Frontend (Port: 3000)
   cd frontend && npm run dev
   
   # Admin Panel (Port: 4200)
   cd admin && npm start
   ```

## 🛠️ Available Scripts

### Root Directory
```bash
npm install --legacy-peer-deps    # Install all dependencies
npm run dev                       # Start all development servers
npm run build                     # Build all projects for production
```

### Frontend (`/frontend`)
```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run preview    # Preview production build
npm test           # Run test suite
```

### Backend (`/backend`)
```bash
npm start          # Start development server with nodemon
npm run prod       # Start production server
npm test           # Run API tests
```

### Admin (`/admin`)
```bash
npm start          # Start Angular development server
npm run build      # Build for production
npm test           # Run unit tests
npm run e2e        # Run end-to-end tests
```

## 🌐 API Endpoints

### Authentication
- `POST /basic/signup` - User registration
- `POST /basic/verify-registration` - Email verification
- `POST /basic/login` - User login
- `POST /basic/resend-verification` - Resend verification code

### User Management
- `GET /basic/dashboard` - User dashboard data
- `GET /basic/wallet-info` - Wallet information
- `GET /basic/user-activity` - User activity logs
- `GET /basic/check-user-exists` - Check user existence

### Games
- `POST /dice/play` - Dice game endpoint
- `POST /roulette/play` - Roulette game endpoint
- `POST /mines/play` - Mines game endpoint

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=13578
MONGODB_URI=mongodb://localhost:27017/bullana
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE_API_KEY=your_email_api_key
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:13578
REACT_APP_SOCKET_URL=http://localhost:13578
```

## 🚀 Deployment

### Production Build
```bash
# Build all components
npm run build

# Deploy frontend
cd frontend && npm run build

# Deploy backend
cd backend && npm run prod

# Deploy admin
cd admin && npm run build
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Frontend tests
cd frontend && npm test

# Backend API tests
cd backend && npm test

# Admin unit tests
cd admin && npm test
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the [documentation](FEATURES_ADDED.md) for detailed features

## 🔗 Links

- [Live Demo](https://bullana-bet.com)
- [API Documentation](docs/api.md)
- [Features Documentation](FEATURES_ADDED.md)
- [Changelog](CHANGELOG.md)

---

**Bullana Bet** - Built with ❤️ for the crypto gaming community