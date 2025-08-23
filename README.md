# TaskNote

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Build Status](https://github.com/ricardo-campos-org/react-typescript-todolist/actions/workflows/main.yml/badge.svg)

### TaskNote API
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ricardo-campos-org_react-typescript-todolist_server&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ricardo-campos-org_react-typescript-todolist_server)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ricardo-campos-org_react-typescript-todolist_server&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ricardo-campos-org_react-typescript-todolist_server)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=br.com.tasknoteapp%3Aserver&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=br.com.tasknoteapp%3Aserver)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=br.com.tasknoteapp%3Aserver&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=br.com.tasknoteapp%3Aserver)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=br.com.tasknoteapp%3Aserver&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=br.com.tasknoteapp%3Aserver)

### TaskNote WebApp
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ricardo-campos-org_react-typescript-todolist_client&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ricardo-campos-org_react-typescript-todolist_client)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ricardo-campos-org_react-typescript-todolist_client&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ricardo-campos-org_react-typescript-todolist_client)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ricardo-campos-org_react-typescript-todolist_client&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=ricardo-campos-org_react-typescript-todolist_client)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ricardo-campos-org_react-typescript-todolist_client&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=ricardo-campos-org_react-typescript-todolist_client)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ricardo-campos-org_react-typescript-todolist_client&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=ricardo-campos-org_react-typescript-todolist_client)

## 📋 Table of Contents

- [📝 About the Project](#-about-the-project)
- [✨ Features](#-features)
- [🚀 Tech Stack](#-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🚀 Getting Started](#-getting-started)
- [🛠️ Development](#️-development)
- [🧪 Testing](#-testing)
- [📦 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [👨‍💻 Developer](#-developer)
- [📞 Contact](#-contact)
- [📄 License](#-license)

## 📝 About the Project

TaskNote is a full-stack productivity application designed for managing tasks and notes with simplicity and effectiveness in mind. Originally created to address personal productivity needs, it has evolved into a comprehensive, open-source solution featuring a modern tech stack and enterprise-grade architecture.

The project was born from a month-long technical challenge and has since grown to include robust authentication, internationalization support, responsive design, and comprehensive testing coverage.

## ✨ Features

### Current Features
- **Task Management**: Create, edit, delete, and organize TODO items with due dates and priority levels
- **Note Taking**: Rich text notes with Markdown support for better formatting
- **Smart Search**: Full-text search across tasks and notes with real-time filtering
- **User Authentication**: Secure JWT-based authentication with automatic token refresh
- **Internationalization**: Multi-language support (English, Portuguese, Spanish, Russian)
- **Responsive Design**: Mobile-first approach with Bootstrap 5 and dark/light theme support
- **Data Visualization**: Task completion charts and productivity analytics
- **File Attachments**: URL attachments for tasks and notes

### Upcoming Features
- **Tagging System**: `#tag` support for better organization
- **Advanced Filters**: Enhanced search with date ranges, priority levels, and status filters
- **Collaboration**: Share tasks and notes with other users
- **Mobile App**: Native mobile applications for iOS and Android
- **Notifications**: Email and push notifications for due dates and reminders

## 🚀 Tech Stack

### Frontend (React TypeScript)
- **Framework**: React 19 with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized production builds
- **Testing**: Vitest with React Testing Library and comprehensive coverage reporting
- **Styling**: Bootstrap 5 with custom SCSS and theme support
- **State Management**: React Context API for authentication and sidebar state
- **Routing**: React Router 7 with dynamic route configuration
- **Internationalization**: i18next with automatic language detection
- **API Client**: Centralized API service with automatic authentication headers

### Backend (Java Spring Boot)
- **Framework**: Spring Boot 3.5+ with Java 17
- **Security**: Spring Security with JWT authentication and refresh tokens
- **Database**: PostgreSQL with JPA/Hibernate ORM
- **Migration**: Flyway for database schema versioning
- **Documentation**: OpenAPI/Swagger UI for API documentation
- **Testing**: JUnit with separate unit and integration test suites
- **Code Quality**: Checkstyle, JaCoCo coverage (75% minimum), Maven Enforcer
- **Build Options**: Traditional JAR or GraalVM native image compilation

### Database & Infrastructure
- **Database**: PostgreSQL with optimized indexes and constraints
- **Containerization**: Docker and Docker Compose for development environment
- **Web Server**: Caddy for reverse proxy and SSL termination
- **CI/CD**: GitHub Actions with automated testing and quality gates
- **Code Analysis**: SonarCloud integration for security and maintainability

## 🏗️ Architecture

### Monorepo Structure
```
react-typescript-todolist/
├── client/          # React TypeScript frontend
├── server/          # Java Spring Boot REST API
├── angular/         # Alternative Angular frontend
├── tools/           # Development and deployment scripts
├── docker-compose.yml
└── CLAUDE.md        # AI assistant instructions
```

### Frontend Architecture
- **Component Structure**: Modular components with TypeScript interfaces
- **Authentication Flow**: JWT tokens with 2-minute refresh intervals
- **Theme System**: CSS custom properties for dark/light mode switching
- **Responsive Layout**: Mobile-first design with sidebar navigation
- **Error Handling**: Centralized error boundary and user feedback

### Backend Architecture
- **RESTful API**: Clean REST endpoints with proper HTTP status codes
- **Security Layer**: JWT validation, CORS configuration, and input validation
- **Service Layer**: Business logic separation with transaction management
- **Repository Pattern**: Data access abstraction with custom queries
- **Email Service**: Template-based email notifications for user actions

## 🚀 Getting Started

### Prerequisites
- **Docker & Docker Compose** (recommended for easy setup)
- **Node.js 18+** and **npm** (for frontend development)
- **Java 17+** and **Maven 3.6+** (for backend development)
- **PostgreSQL 13+** (if running without Docker)

### Quick Start with Docker
1. **Clone the repository**
   ```bash
   git clone https://github.com/ricardo-campos-org/react-typescript-todolist.git
   cd react-typescript-todolist
   ```

2. **Start the database**
   ```bash
   bash tools/run-docker-db.sh
   ```

3. **Start the backend server**
   ```bash
   bash tools/run-docker-server.sh
   ```

4. **Start the frontend application**
   ```bash
   bash tools/run-docker-client.sh
   ```

5. **Access the application**
   - Frontend: http://localhost:5000
   - API Documentation: http://localhost:8080/swagger-ui.html

## 🛠️ Development

### Frontend Development
```bash
cd client
npm install           # Install dependencies
npm start            # Start development server (port 5000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

### Backend Development
```bash
cd server
./mvnw spring-boot:run                    # Start development server
./mvnw clean compile                      # Compile sources
./mvnw spring-boot:build-image           # Build Docker image
./mvnw clean verify -Pnative             # Build GraalVM native image
```

### Quality Checks
Run quality checks before submitting changes:
```bash
bash tools/check-frontend.sh    # Frontend linting, testing, coverage
bash tools/check-backend.sh     # Backend compilation, tests, checkstyle
```

## 🧪 Testing

### Frontend Testing
- **Framework**: Vitest with React Testing Library
- **Coverage**: Comprehensive test coverage with reports in `client/coverage/`
- **Commands**:
  ```bash
  npm test                    # Run tests in watch mode
  npm run test:coverage      # Generate coverage report
  ```

### Backend Testing
- **Unit Tests**: Fast, isolated tests with mocked dependencies
- **Integration Tests**: Full application context with test database
- **Coverage**: JaCoCo reporting with 75% minimum requirement
- **Commands**:
  ```bash
  ./mvnw test                           # Unit tests only
  ./mvnw clean verify -Ptests          # All tests with coverage
  ```

## 📦 Deployment

### Production Deployment
The application supports multiple deployment strategies:

1. **Docker Containers** (recommended)
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

2. **Traditional JAR Deployment**
   ```bash
   cd server && ./mvnw clean package
   java -jar target/tasknote-api.jar
   ```

3. **GraalVM Native Image** (for optimal performance)
   ```bash
   cd server && ./mvnw clean verify -Pnative
   ./target/tasknote-api
   ```

### Environment Configuration
- Database connection via environment variables
- JWT secret configuration for production
- Email service configuration for notifications
- CORS settings for frontend domain

## 🤝 Contributing

We welcome contributions from the community! This project follows the **Fork & Merge** workflow.

### How to Contribute

1. **Fork the Project** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-typescript-todolist.git
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make your changes** and ensure they follow the project standards
5. **Run quality checks**
   ```bash
   bash tools/check-frontend.sh
   bash tools/check-backend.sh
   ```
6. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request** with a detailed description

### Development Guidelines
- Follow existing code conventions and patterns
- Write tests for new functionality
- Update documentation when necessary
- Ensure all quality checks pass
- Keep commits focused and descriptive

For detailed setup instructions and development workflows, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 👨‍💻 Developer

**Ricardo Campos** - Full-Stack Developer & Project Maintainer

- **GitHub**: [@ricardo-campos-org](https://github.com/ricardo-campos-org)
- **Twitter/X**: [@RMCamposs](https://x.com/RMCamposs)
- **LinkedIn**: [Ricardo Campos](https://www.linkedin.com/in/ricardo-campos-org/)

### About the Developer
Ricardo is a passionate full-stack developer with expertise in modern web technologies, cloud architecture, and agile development practices. This project showcases his skills in:

- **Frontend Development**: React, TypeScript, modern CSS, responsive design
- **Backend Development**: Java, Spring Boot, RESTful APIs, microservices
- **DevOps & Infrastructure**: Docker, CI/CD, cloud deployment, monitoring
- **Software Quality**: Testing strategies, code coverage, static analysis
- **Open Source**: Community engagement, documentation, maintainership

The TaskNote project represents a commitment to clean code, comprehensive testing, and user-centered design principles.

## 📞 Contact

For questions, suggestions, or collaboration opportunities:

- **Email**: Contact via GitHub issues or discussions
- **Twitter/X**: [@RMCamposs](https://x.com/RMCamposs) for quick questions
- **GitHub Issues**: [Create an issue](https://github.com/ricardo-campos-org/react-typescript-todolist/issues) for bugs or feature requests
- **GitHub Discussions**: [Join discussions](https://github.com/ricardo-campos-org/react-typescript-todolist/discussions) for general questions

## 📄 License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ **Freedom to use**: Use the software for any purpose
- ✅ **Freedom to study**: Access and modify the source code
- ✅ **Freedom to share**: Distribute copies of the software
- ✅ **Freedom to improve**: Distribute modified versions

**Copyleft**: Any derivative work must also be open source under GPL v3.0

---

⭐ **Star this repository if you find it helpful!** ⭐
