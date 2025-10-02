# Bug Tracking & Metrics

## Jira Bug Reports

### Bug 1: Notes not saving for some users
- **Severity:** High
- **Root Cause Analysis (RCA):** User ID was not correctly attached to note due to missing authentication middleware in some requests.
- **Status:** Fixed

### Bug 2: Login fails with valid credentials
- **Severity:** Medium
- **Root Cause Analysis (RCA):** Password hashing mismatch due to inconsistent bcrypt salt rounds in registration vs login.
- **Status:** Fixed

---

## Defect Density (Notes Module)
- **Defects found:** 2
- **Lines of code (Notes module):** 80
- **Defect Density:**

$$
\text{Defect Density} = \frac{\text{Number of Defects}}{\text{KLOC}} = \frac{2}{0.08} = 25 \text{ defects/KLOC}
$$

---

## MTTF (Mean Time To Failure)
- **Definition:** Average time between failures in a system.
- **Example:** If the Notes module failed twice in 40 hours of testing, then:

$$
\text{MTTF} = \frac{\text{Total Testing Time}}{\text{Number of Failures}} = \frac{40}{2} = 20 \text{ hours}
$$
