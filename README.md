# 🚀 Full-Stack Deployment Project

A comprehensive full-stack application demonstrating modern DevOps practices with Docker containerization, CI/CD pipelines, monitoring, and logging solutions.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [Production Deployment](#production-deployment)
- [Monitoring & Observability](#monitoring--observability)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project is a **3-tier full-stack application** built as a DevOps traineeship assignment. It demonstrates best practices in containerization, orchestration, monitoring, and continuous deployment.

### Key Components:
- **Frontend**: React.js application with modern UI
- **Backend**: Node.js/Express.js REST API with MongoDB
- **Database**: MongoDB with persistent storage
- **Reverse Proxy**: Nginx for load balancing and routing
- **Monitoring**: Prometheus metrics and Grafana dashboards
- **Logging**: Loki and Promtail for centralized logging
- **CI/CD**: Bitbucket Pipelines for automated deployment

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   MongoDB       │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (Database)    │
│   Port: 3001    │    │   Port: 5001    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Nginx         │
                    │   (Reverse      │
                    │   Proxy)        │
                    │   Port: 8080    │
                    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React.js** 18.2.0 - Modern UI framework
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Prometheus Client** - Metrics collection
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

### DevOps & Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and load balancer
- **Prometheus** - Metrics monitoring
- **Grafana** - Visualization and dashboards
- **Loki** - Log aggregation
- **Promtail** - Log collection
- **Bitbucket Pipelines** - CI/CD automation

## ✨ Features

### Core Application
- ✅ User management (CRUD operations)
- ✅ Role-based user system
- ✅ Real-time statistics dashboard
- ✅ Responsive web interface
- ✅ RESTful API endpoints

### DevOps Features
- ✅ Containerized deployment
- ✅ Health checks for all services
- ✅ Automated CI/CD pipeline
- ✅ Monitoring and alerting
- ✅ Centralized logging
- ✅ Database backup scripts
- ✅ Environment configuration management

### Security Features
- ✅ Helmet.js security headers
- ✅ Rate limiting protection
- ✅ CORS configuration
- ✅ Input validation
- ✅ Secure MongoDB connection

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Docker** (v20.10+)
- **Docker Compose** (v2.0+)
- **Node.js** (v16+) - for local development
- **npm** or **yarn** - for local development
- **Git** - for version control

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Full-stack-Deployment
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5001
   - MongoDB: localhost:27017
   - Nginx: http://localhost:8080

### Option 2: With Monitoring Stack

1. **Start the main application**
   ```bash
   docker-compose up -d
   ```

2. **Start Prometheus monitoring**
   ```bash
   docker-compose -f docker-compose.prometheus.yml up -d
   ```

3. **Start Grafana and Loki logging**
   ```bash
   docker-compose -f docker-compose.grafana-loki.yml up -d
   ```

4. **Access monitoring tools**
   - Prometheus: http://localhost:9090
   - Grafana: http://localhost:3001 (admin/admin)
   - Loki: http://localhost:3100

## 💻 Development Setup

### Backend Development

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Frontend Development

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm start
   ```

## 🚀 Production Deployment

### Environment Variables

Create `.env` files in both `backend/` and `frontend/` directories:

**Backend (.env)**
```env
NODE_ENV=production
MONGODB_URI=mongodb://admin:password123@mongodb:27017/risav?authSource=admin
PORT=5000
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://your-domain.com
```

### Docker Deployment

1. **Build and start production containers**
   ```bash
   docker-compose -f docker-compose.yml up -d --build
   ```

2. **Verify all services are running**
   ```bash
   docker-compose ps
   ```

3. **Check service logs**
   ```bash
   docker-compose logs -f [service-name]
   ```

### CI/CD Pipeline

The project includes a Bitbucket Pipelines configuration that:
- Builds Docker images on push to main branch
- Pushes images to Docker Hub
- Supports automated deployment

**Required Environment Variables:**
- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub password
- `IMAGE_NAME` - Docker image name

## 📊 Monitoring & Observability

### Prometheus Metrics

The backend exposes Prometheus metrics at `/metrics`:
- HTTP request duration
- Request count by method and status
- Active users gauge
- System metrics (CPU, memory, etc.)

### Grafana Dashboards

Access Grafana at http://localhost:3001:
- **Username**: admin
- **Password**: admin

Pre-configured dashboards:
- Application metrics
- System performance
- User activity

### Logging with Loki

Centralized logging with Loki and Promtail:
- Container logs aggregation
- Structured log parsing
- Log querying and filtering

### Health Checks

All services include health check endpoints:
- Backend: `/health`
- Frontend: `/health`
- Nginx: `/health`
- MongoDB: Database ping

## 🔌 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Endpoints

#### Users
- `GET /users` - Get all users
- `POST /users` - Create a new user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

#### Statistics
- `GET /stats` - Get application statistics

#### Health
- `GET /health` - Health check endpoint
- `GET /metrics` - Prometheus metrics

### Example API Usage

```bash
# Get all users
curl http://localhost:5001/api/users

# Create a new user
curl -X POST http://localhost:5001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","role":"developer"}'

# Get application stats
curl http://localhost:5001/api/stats
```

## 🛠️ Maintenance

### Database Backup

Use the provided backup script:
```bash
./scripts/backup-mongodb.sh
```

### Log Rotation

Logs are automatically rotated by Docker. To view logs:
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs [service-name]

# Follow logs
docker-compose logs -f [service-name]
```

### Scaling Services

Scale specific services:
```bash
# Scale backend to 3 instances
docker-compose up -d --scale backend=3

# Scale frontend to 2 instances
docker-compose up -d --scale frontend=2
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all Docker containers build successfully
- Test the complete stack locally before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- DevOps Traineeship Program
- Docker and containerization community
- Prometheus and Grafana for monitoring solutions
- MongoDB for the database solution

---

**Happy Coding! 🎉**

For support or questions, please open an issue in the repository. 