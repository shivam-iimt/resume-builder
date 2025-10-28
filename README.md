Resume + Portfolio Builder (Full Stack)

Project Summary:

This is a full-stack Resume and Portfolio Builder web application. Users can create, edit, preview, and export their resumes, as well as share a public portfolio page. The app supports authentication, persistent storage, PDF export, and multiple responsive templates. It is designed for production with secure defaults, Dockerized deployment, and CI/CD workflow.

Key Features:

- Authentication: Signup, login, logout with JWT + refresh tokens using HTTP-only Secure cookies
- Editor: Add/update personal info, experiences, projects, and skills
- Live Preview: Instant preview panel updating as user types
- PDF Export: Client-side (html2canvas + jsPDF) and optional server-side (Puppeteer) export
- Templates: Multiple responsive Tailwind templates for print-ready resumes
- Autosave: Saves locally and synchronizes with backend when logged in
- Public Portfolio: Shareable URL /public/:slug with SEO-friendly meta tags
- Backend: Node.js + Express + MongoDB (Mongoose) with Zod validation
- Security: Helmet, rate limiting, CORS allowlist, input sanitization, XSS protection
- Dockerized: Frontend, backend, and MongoDB services ready for local dev and production
- CI/CD: GitHub Actions workflow for linting, testing, building, and Docker image generation

Tech Stack & Rationale:

- Frontend: React (TypeScript) + Vite + Tailwind CSS
- Backend: Node.js (TypeScript) + Express + MongoDB (Mongoose)
- Authentication: JWT + refresh tokens in HTTP-only Secure cookies
- Validation: Zod for request/schema validation
- PDF Export: html2canvas + jsPDF (client), optional Puppeteer (server-side)
- Logging: Morgan + Winston for structured logs
- Security & Hardening: Helmet, express-rate-limit, cors, xss-clean, argon2 password hashing

Local Setup:

1. Copy environment files:
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env

2. Start services with Docker Compose:
   docker-compose up --build

3. Access the app:
   Frontend: http://localhost:3000
   Backend API: http://localhost:8000

Docker Standalone Build:

# Backend
docker build -t resume-backend ./backend
docker run -p 8000:8000 resume-backend

# Frontend
docker build -t resume-frontend ./frontend
docker run -p 3000:80 resume-frontend

GitHub Actions CI/CD:

- Workflow file: .github/workflows/ci-cd.yml
- Runs on push/pull_request to main branch
- Steps:
  1. Checkout repo
  2. Install Node.js
  3. Install backend dependencies and run Jest + Supertest
  4. Install frontend dependencies and run Vitest / React Testing Library
  5. Build Docker images for frontend and backend

Security Checklist:

- [x] Passwords hashed with argon2
- [x] JWT short-lived access tokens + refresh tokens stored in HTTP-only Secure cookies
- [x] Input validation with Zod on backend
- [x] Helmet, express-rate-limit, cors, xss-clean
- [x] Mongoose strict schemas with parameterized queries
- [x] Account lockout and login throttling implemented in backend
- [ ] HTTPS via Nginx / Let’s Encrypt for production
- [ ] Optional CAPTCHA on signup for high-risk deployments

How to Verify (Smoke Tests):

1. Visit /signup → create a new account
2. Visit /login → log in
3. Access / → editor with preview panel should load
4. Add experiences/projects → save → refresh → confirm data persists
5. Click PDF Export → verify downloaded PDF
6. Visit /public/:slug → verify public resume page works
7. Optional: call /api/resume/export/:id → verify server-side PDF download

Notes & Design Decisions:

- Frontend and backend are fully synchronized; editor and resume API work seamlessly
- Core functionality implemented; additional polish like multiple templates and server-side PDF is optional but supported
- Security-first design: JWT, cookie management, input validation, XSS protection, rate limiting
- Dockerized for reproducible local and production environments
- CI/CD ensures automated linting, testing, and image building before deployment

Future Improvements:

- Add more fully designed Tailwind templates
- Integrate server-side PDF export with Puppeteer for perfect print layout
- Add unit & integration tests for frontend components (Vitest + React Testing Library)
- Add optional CAPTCHA on signup for high-risk environments
- Configure HTTPS with Nginx / Let’s Encrypt in production
