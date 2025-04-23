# Testing for the allposters.com website is going on as login, search, addtocart are tested with some invalid login cases, search cases, and logout cases
# 🧪 Playwright Test Automation – Login Test

This project uses [Playwright](https://playwright.dev/) for end-to-end testing. The focus is on automating the **login functionality**, located under the `TestCaseProject/TestCase/login` directory.

## 📦 Installation

Make sure [Node.js](https://nodejs.org/) is installed on your system.

### 1. Install project dependencies

```bash
npm install

2. Install Playwright and required browsers
bash
Copy
Edit
npx playwright install

🚀 Running Tests
🔹 Headless Mode (runs in background)
This runs the test without opening the browser:
npx playwright test login.spec.js

🔹 Headed Mode (opens browser window)
This runs the test with the browser UI visible, great for debugging:
npx playwright test --headed login.spec.js
