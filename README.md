🚀 FormCraft AI
Turn natural-language prompts into customizable, shareable forms with AI.
FormCraft AI is a full-stack SaaS application that uses Google Gemini to help users create forms, customize their appearance, publish public links, collect responses, and review submission analytics. It also includes authentication, subscription management, and automated quality checks.
<p align="center">
  <a href="https://formcraft-ai-mocha.vercel.app"><strong>Live Demo</strong></a>
  ·
  <a href="https://github.com/Vishwak-Tech/ai-formbuilder"><strong>Source Code</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/TypeScript%2FJavaScript-Project%20Code-3178C6?logo=typescript" alt="Project code" />
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-4285F4" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/Auth-Clerk-6C47FF" alt="Clerk" />
  <img src="https://img.shields.io/badge/Database-Neon%20PostgreSQL-00E599" alt="Neon PostgreSQL" />
  <img src="https://img.shields.io/badge/ORM-Drizzle-C5F74F" alt="Drizzle ORM" />
  <img src="https://img.shields.io/badge/Payments-Razorpay-0C2451" alt="Razorpay" />
  <img src="https://img.shields.io/badge/Tests-Vitest-6E9F18?logo=vitest" alt="Vitest" />
  <img src="https://img.shields.io/badge/E2E-Playwright-2EAD33?logo=playwright" alt="Playwright" />
  <img src="https://github.com/Vishwak-Tech/ai-formbuilder/actions/workflows/ci.yml/badge.svg" alt="CI status" />
</p>

📑 Table of Contents
- Overview
- Screenshots
- Features
- How It Works
- Technology Stack
- Testing and Code Quality
- Getting Started
- Environment Variables
- Database Setup
- Available Commands
- Project Structure
- Payment Flow
- Security Considerations
- Roadmap
- Contributing
- Author
📖 Overview
Creating forms manually can be repetitive. FormCraft AI lets users describe what they need in natural language and uses Google Gemini to generate a structured form that they can review and customize.
The application brings the form creation workflow together in one place:
- Generate form fields from a natural-language prompt.
- Edit fields and customize the form's appearance.
- Publish forms through shareable public URLs.
- Collect submissions and review responses.
- Export responses to Excel and view analytics.
- Manage Free and Pro access through subscription functionality.
The project also includes unit and component tests, browser-based end-to-end tests, linting, production build verification, and a GitHub Actions CI workflow.
Live application: https://formcraft-ai-mocha.vercel.app
GitHub repository: https://github.com/Vishwak-Tech/ai-formbuilder
📸 Screenshots
Landing Page
<img width="1920" alt="FormCraft AI landing page" src="https://github.com/user-attachments/assets/0903d06e-a7d5-4496-a9cf-3d7cf43f6e17" />

Dashboard
<img width="1920" alt="FormCraft AI dashboard" src="https://github.com/user-attachments/assets/b613a73e-12cc-41a8-b0ef-e2b6ba7a4e93" />

AI Form Generator
<img width="1920" alt="AI form generator" src="https://github.com/user-attachments/assets/f916bba1-3e47-40ab-abcc-60276156c090" />

Public Form
<img width="1920" alt="Public form" src="https://github.com/user-attachments/assets/d6775a9c-2834-43db-87b9-bb2fff0838a7" />

Responses Dashboard
<img width="1920" alt="Responses dashboard" src="https://github.com/user-attachments/assets/dffcb320-d000-42f8-963e-9b1ffc5ef6dc" />

Analytics
<img width="1920" alt="Form analytics dashboard" src="https://github.com/user-attachments/assets/efb66721-f90d-4b33-93b9-ef90817122cd" />

Upgrade Page
<img width="1920" alt="Subscription upgrade page" src="https://github.com/user-attachments/assets/fc2706e3-d7cb-48d8-9a0d-ec36dda31cb9" />

✨ Features
🤖 AI-Powered Form Generation
- Generate form definitions from natural-language prompts using Google Gemini.
- Convert generated structured content into editable form fields.
- Handle loading states and generation failures.
📝 Dynamic Form Builder
- Preview forms while editing.
- Render fields dynamically from the form definition.
- Edit field labels and remove fields.
- Customize themes, backgrounds, and form branding.
🌍 Publishing and Sharing
- Publish forms with shareable public URLs.
- Provide responsive public form pages.
- Validate responses before submission.
📥 Responses and Analytics
- Collect and manage form submissions.
- Review submissions from the dashboard.
- Export responses to Excel.
- View form response analytics.
🔐 Authentication
- Sign up and sign in with Clerk.
- Protect dashboard routes.
- Manage authenticated user sessions.
💳 Subscription Management
- Integrate Razorpay for payments.
- Verify payment signatures using HMAC.
- Support monthly Pro subscriptions.
- Track subscription status and expiry.
- Gate features based on Free and Pro access.
🎨 User Experience
- Neo-brutalism-inspired visual design.
- Responsive dashboard layouts.
- Mobile-friendly public forms.
- Interactive form creation and customization.
🔄 How It Works
1. Describe: The user enters a prompt explaining the form they need.
2. Generate: Google Gemini produces a structured form definition.
3. Validate: The generated content is parsed and validated.
4. Customize: The user edits fields and adjusts the form's appearance.
5. Publish: The form is made available through a public URL.
6. Collect: Respondents submit their answers.
7. Review: The owner reviews submissions, exports responses, and checks analytics.
Natural-language prompt
          ↓
     Google Gemini
          ↓
Parse and validate generated content
          ↓
       Save form
          ↓
   Edit and customize
          ↓
    Publish public URL
          ↓
  Collect form responses
          ↓
 Review submissions and analytics
🛠 Technology Stack
Area	Technology
Framework	Next.js 16
UI library	React 19
Styling	Tailwind CSS 4
Authentication	Clerk
AI integration	Google Gemini
Database	Neon PostgreSQL
ORM	Drizzle ORM
Payments	Razorpay
Unit and component tests	Vitest, React Testing Library
End-to-end tests	Playwright
Linting	ESLint
CI	GitHub Actions
Deployment	Vercel


🧪 Testing and Code Quality
FormCraft AI includes automated tests and CI checks to help detect regressions during development.
Reported Test and Build Results
Check	Tool	Reported result
Unit and component tests	Vitest	38 tests passed
Component testing	React Testing Library	Included in the Vitest suite
Browser end-to-end tests	Playwright	8 tests passed
Linting	ESLint	Passed
Production build	Next.js	Passed
Continuous integration	GitHub Actions	Successful workflow run


These are the results documented for the project; rerun the commands and inspect the latest workflow before relying on them as current status.
What Is Tested?
- Form creation dialog and user interactions.
- AI form generation loading and failure states.
- Form generation logic with mocked dependencies.
- API route behavior and payment verification.
- Subscription logic with mocked database queries.
- Homepage rendering and major sections.
- Access behavior for unauthenticated and authenticated dashboard users.
- Create Form dialog interactions in the browser.
Run Unit and Component Tests
npx vitest run
Run Vitest in watch mode during development:
npx vitest
Run End-to-End Tests
Install the required Playwright browser if needed:
npx playwright install chromium
Run the Chromium test suite with one worker:
npx playwright test --project=chromium --workers=1
E2E prerequisite: Authenticated scenarios require a valid local Playwright authentication state. Keep authentication-state files and credentials out of version control.

Run Linting and Build Checks
npx eslint .
npm run build
Continuous Integration
The GitHub Actions workflow is configured to run on pushes to main and pull requests targeting main. The documented workflow runs:
1. Checkout the repository.
2. Set up Node.js.
3. Install dependencies using npm ci.
4. Run ESLint.
5. Run the Vitest suite.
6. Build the production application.
Workflow: GitHub Actions
Workflow configuration: .github/workflows/ci.yml
Current testing scope: The documented CI workflow does not run a separate live-database integration suite or the Playwright E2E suite. Database behavior in unit tests is mocked. Passing these checks does not establish that every production integration or payment scenario has been verified.
🚀 Getting Started
Follow these steps to run FormCraft AI locally.
Prerequisites
- Node.js version compatible with the project.
- npm.
- A Neon PostgreSQL database.
- A Clerk application.
- Google Gemini API access.
- A Razorpay account if you want to use payment functionality.
1. Clone the Repository
git clone https://github.com/Vishwak-Tech/ai-formbuilder.git
cd ai-formbuilder
2. Install Dependencies
npm ci
3. Configure Environment Variables
Create a .env.local file in the project root and add the variables expected by the application. See Environment Variables.
4. Set Up the Database
After reviewing the schema changes and confirming that the connection points to your development database, run:
npm run db:push
5. Start the Development Server
npm run dev
Open http://localhost:3000 in your browser.
Try the Application
1. Create an account or sign in.
2. Open the dashboard.
3. Select Create AI Form.
4. Describe the form you want to generate.
5. Review and customize the generated fields.
6. Publish the form and share its public URL.
7. Review submissions in the dashboard.
Example prompt:
Create a customer feedback form for a restaurant with a rating,
comments, and contact information.
🔐 Environment Variables
The following variable names are documented by the current project. Confirm each name against the code before configuring a deployment.
NEXT_PUBLIC_DATABASE_URL_CONFIG=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_GEMINI_API_KEY=

NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

NEXT_PUBLIC_APP_URL=http://localhost:3000
Important Configuration Notes
- Never commit .env.local, API secrets, database credentials, or real payment credentials.
- Variables prefixed with NEXT_PUBLIC_ can be exposed to browser code when referenced by client-side modules.
- Database: If NEXT_PUBLIC_DATABASE_URL_CONFIG contains a database connection string or credentials, rename it to a server-only variable and ensure it is only accessed by server-side code.
- Gemini: If NEXT_PUBLIC_GEMINI_API_KEY is used in browser code, the key may be exposed. Prefer making authenticated, validated requests through server-side code and keeping the key in a server-only environment variable.
- Clerk: Keep CLERK_SECRET_KEY on the server. The publishable key is intended for client-side configuration.
- Razorpay: Keep RAZORPAY_KEY_SECRET on the server. The key ID may be public, but payment verification must be performed on the server.
- Set the production application URL to the actual deployed origin.
The variable names above preserve the supplied project's configuration. Review the implementation before changing names, since the code must be updated to match.
🗄 Database Setup
The project uses Neon PostgreSQL with Drizzle ORM.
To push the configured schema to your database:
npm run db:push
Use this command only after confirming the target database and reviewing the schema changes. Prefer a development database while setting up the project locally.
💻 Available Commands
Command	Purpose
npm run dev	Start the development server
npm run build	Create a production build
npx eslint .	Run ESLint
npx vitest	Run tests in watch mode
npx vitest run	Run tests once
npx playwright install chromium	Install the Chromium browser for Playwright
npx playwright test --project=chromium --workers=1	Run the Chromium E2E suite
npm run db:push	Push the Drizzle schema to the configured database


These commands reflect the supplied README. Check package.json and the current Playwright configuration if a command behaves differently in your checkout.
📁 Project Structure
app/
├── api/
│   ├── create-order/
│   └── verify-payment/
├── dashboard/
│   ├── _components/
│   ├── analytics/
│   ├── responses/
│   └── upgrade/
├── aiform/
├── edit-form/
├── sign-in/
├── sign-up/
└── _components/

components/
└── ui/

configs/
├── index.js
└── schema.js

lib/
├── razorpay.js
└── subscription.js

e2e/
├── homepage.spec.js
├── dashboard.spec.js
└── create-form.spec.js

.github/
└── workflows/
    └── ci.yml

vitest.config.js
playwright.config.js
This is a high-level view of the structure documented for the project. Individual files may vary as the repository evolves.
💳 Payment Flow
The documented Razorpay flow is:
User selects a Pro plan
          ↓
Create Razorpay order
          ↓
User completes payment
          ↓
Verify payment signature on the server
          ↓
Create or update subscription
          ↓
Enable Pro features
Security requirement: Never treat a client-side payment success message as proof of payment. Verify the payment signature server-side and validate the order, amount, payment status, and association with the intended user before granting subscription access.
🛡️ Security Considerations
The project integrates authentication, AI APIs, database access, public forms, and payments. Before using it with real users, review the following areas:
- Secrets: Keep database credentials, Clerk secret keys, Gemini keys, and Razorpay secrets server-side.
- Authentication and authorization: Enforce ownership checks on form management, responses, analytics, and subscription operations. Hiding a UI element is not an authorization control.
- Public form submissions: Validate submitted data on the server, enforce field and payload limits, and consider rate limiting and spam protection.
- AI input and output: Treat prompts and generated content as untrusted. Validate the generated schema before saving or rendering it.
- Payments: Verify signatures server-side and validate order identity, amount, status, and user association before updating subscriptions.
- Database changes: Use the intended environment and review schema changes before applying them.
- Testing: Add integration tests for critical database and payment paths, and include E2E tests in CI when the required authentication setup is available.
These are recommended review areas, not claims that every item is already implemented or that a vulnerability has been confirmed.
🗺 Roadmap
Planned improvements for future versions:
Version 1.1
- Improve analytics and response insights.
- Add more AI form templates.
- Improve dashboard usability.
- Expand automated test coverage.
Version 2.0
- Authentication-required public forms.
- Team workspaces and collaboration.
- Email notifications.
- AI-powered response insights.
- PDF export.
- Custom domains.
- Webhooks and API access.
🤝 Contributing
Contributions, bug reports, and suggestions are welcome.
1. Fork the repository.
2. Create a feature branch:
   git checkout -b feature/my-feature
3. Make your changes and run the relevant checks:
   npx eslint .
   npx vitest run
   npm run build
4. Commit your changes:
   git commit -m "feat: describe your change"
5. Push your branch:
   git push origin feature/my-feature
6. Open a pull request with a clear description of the change.
👨‍💻 Author
Vishwak Koleti
- GitHub: Vishwak-Tech
- LinkedIn: Vishwak Koleti
⭐ Support
If you find FormCraft AI useful:
- Star the repository.
- Fork the project.
- Report bugs or suggest improvements.
<p align="center">
  Built with Next.js, React, Tailwind CSS, Google Gemini, Clerk, Drizzle ORM, Neon PostgreSQL, Razorpay, Vitest, Playwright, and GitHub Actions.
</p>
