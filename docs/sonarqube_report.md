# SonarQube Analysis (Backend)

## Example Code Smells Found
- **Duplicate error messages:** Use generic error messages for authentication failures.
- **Hardcoded JWT secret:** Should use environment variable for secret key.
- **Missing input validation:** Now fixed for username and password.
- **No rate limiting:** Consider adding rate limiting to auth endpoints.

## Example Fixes
- Use `process.env.JWT_SECRET` for JWT secret.
- Add input validation for all user inputs (already implemented).
- Use generic error messages for login failures to avoid information leakage.
- Add rate limiting middleware (e.g., express-rate-limit) for production.

---

## SonarQube Command Example
To run SonarQube analysis:
```
npx sonar-scanner -Dsonar.projectKey=notesapp-backend -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=<your_token>
```
