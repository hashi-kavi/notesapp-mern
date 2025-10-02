# Viva Summary: MERN Notes App

## Demonstration Checklist
- Register, Login, Logout (show UI and API)
- Add, View, Delete Notes (show UI and API)
- Form validation (empty fields, invalid input)
- Navigation (Navbar: Home, Login, Register, Notes)
- Backend REST API endpoints: `/auth/register`, `/auth/login`, `/notes` (CRUD)
- Password hashing (bcrypt), JWT authentication
- MongoDB models for User and Note
- TDD: Jest unit tests (Red → Green → Refactor cycle)
- BDD: Gherkin feature files, Cucumber.js step definitions
- Selenium UI tests (login, add note)
- API tests (Jest Supertest)
- CI/CD: GitHub Actions workflow
- JMeter load test script
- OWASP Top 10 fixes: Input Validation, Broken Authentication
- Bug tracking (Jira), defect density, MTTF
- SonarQube analysis (code smells, fixes)

## Where to Find Everything
- Source code: `backend/`, `frontend/`
- Tests: `backend/tests/`, `selenium/`, `backend/features/`
- CI/CD: `.github/workflows/ci.yml`
- JMeter: `jmeter/notes_api_load_test.jmx`
- Quality docs: `docs/quality_metrics.md`, `docs/sonarqube_report.md`

## How to Run
- Backend: `cd backend && npm install && npm start`
- Frontend: `cd frontend && npm install && npm start`
- Run tests as described in README

---
Be ready to show:
- Working login/register/add note
- Test results (unit, BDD, Selenium, API)
- CI/CD pipeline
- Security and quality reports
- Bug tracking and metrics
