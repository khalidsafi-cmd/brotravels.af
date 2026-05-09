# BroTravels.AF - DevOps Pipeline Demo

A static website for Afghanistan travel tours with a complete DevOps pipeline implementation.

## Project Overview

This project demonstrates a complete DevOps workflow including:
- Static website development (HTML/CSS/JavaScript)
- Version control with Git and GitHub
- Containerization with Docker
- CI/CD pipeline with GitHub Actions
- Infrastructure as Code with Terraform

## Application Features

- Responsive travel website for Afghanistan tours
- Three-tier "Bro Level" tour packages (Easy, Classic, Giga Chad)
- Interactive filtering and smooth scrolling
- Bootstrap-based responsive design
- SEO optimized with meta tags and structured data

## DevOps Components

### 1. Version Control
- Git repository with meaningful commits
- Feature branch workflow
- Connected to GitHub remote

### 2. Containerization
- Dockerfile using nginx:alpine
- Multi-stage build for optimized image
- Docker Compose for local development

### 3. CI/CD Pipeline
- GitHub Actions workflow
- Automated testing (HTML validation, CSS linting)
- Docker image build and test
- Deployment triggers on push to main branch

### 4. Infrastructure as Code
- Terraform configuration for AWS S3 static hosting
- Configured for LocalStack simulation
- Automated infrastructure provisioning

## Local Development

### Prerequisites
- Docker Desktop
- Git
- Node.js (for local development server)
- Terraform (for infrastructure)
- LocalStack (for AWS simulation)

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/khalidsafi-cmd/brotravels.af.git
cd brotravels.af
```

2. Run with Docker:
```bash
docker build -t brotravels-af .
docker run -p 8080:80 brotravels-af
```

3. Open http://localhost:8080 in your browser

### Development Server
```bash
# Install dependencies (if needed)
npm install -g live-server

# Start development server
live-server
```

## CI/CD Pipeline

The GitHub Actions workflow performs:
1. Code checkout
2. HTML validation with tidy
3. CSS syntax checking
4. Docker image build
5. Container testing
6. Image push (on main branch)

## Infrastructure Deployment

### Using LocalStack
1. Start LocalStack:
```bash
localstack start
```

2. Deploy infrastructure:
```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### Using AWS (Production)
1. Configure AWS credentials
2. Update provider configuration in `terraform/main.tf`
3. Run terraform commands as above

## Project Structure
```
brotravels.af/
├── index.html          # Main website
├── styles.css          # Custom styles
├── app.js             # JavaScript functionality
├── Dockerfile         # Container configuration
├── docker-compose.yml # Local development setup
├── .dockerignore      # Docker build exclusions
├── .github/
│   └── workflows/
│       └── ci-cd.yml  # GitHub Actions pipeline
├── terraform/
│   └── main.tf        # Infrastructure as Code
└── assets/
    └── images/        # Website images
```

## Git Workflow

1. Create feature branch:
```bash
git checkout -b feature/new-feature
```

2. Make changes and commit:
```bash
git add .
git commit -m "Add meaningful commit message"
```

3. Push and create PR:
```bash
git push origin feature/new-feature
```

4. Merge to main after review

## Testing

- HTML validation: `tidy -q -e index.html`
- CSS linting: Basic syntax check included in CI
- Container testing: Automated in CI pipeline
- Manual testing: Open in browser and test functionality

## Deployment

The application can be deployed to:
- Docker containers
- AWS S3 + CloudFront
- Any static hosting service
- Kubernetes clusters

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational purposes demonstrating DevOps practices.