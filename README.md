# MERN Notes App

A simple MERN stack application for Software Testing & Quality demonstration.

## Features
- User Authentication: Register, Login, Logout
- Notes Management: Add, View, Delete Notes
- Clean React UI with form validation and navigation
- REST API with Express, MongoDB, JWT, bcrypt
- TDD (Jest), BDD (Cucumber.js), Selenium UI tests, API tests
- CI/CD pipeline (GitHub Actions)
- Performance & Security Testing (JMeter, OWASP fixes)
- Bug tracking, defect density, MTTF, SonarQube analysis

## How to Run
1. Start MongoDB locally or use Docker
2. `cd backend && npm install && npm start`
3. `cd frontend && npm install && npm start`

## Testing
- `cd backend && npx jest --runInBand` (unit/API tests)
- `npx cucumber-js backend/features/*.feature` (BDD)
- `node selenium/login.test.js` and `node selenium/addnote.test.js` (UI)
- JMeter: Open `jmeter/notes_api_load_test.jmx` in JMeter

## CI/CD
- See `.github/workflows/ci.yml` for pipeline steps

## Quality & Security
- See `docs/quality_metrics.md` for bugs, defect density, MTTF
- See `docs/sonarqube_report.md` for code smells and fixes

---
For viva: Demonstrate login, register, add note, and show test/quality artifacts.