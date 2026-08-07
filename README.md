# 🚀 FormCraft

> AI-powered Form Builder that transforms natural language into beautiful, production-ready forms in seconds.

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF)
![Gemini AI](https://img.shields.io/badge/AI-Gemini-4285F4)
![Neon](https://img.shields.io/badge/Database-Neon-00E599)
![Drizzle ORM](https://img.shields.io/badge/ORM-Drizzle-C5F74F)
![Razorpay](https://img.shields.io/badge/Payments-Razorpay-0C2451)

</p>

---

## 📖 Overview

FormCraft is an AI-powered SaaS application that enables users to generate forms using natural language. Instead of manually creating every field, users simply describe the form they need, and Gemini AI generates a complete, editable form in seconds.

The platform supports authentication, form customization, public sharing, response collection, subscription management, and usage-based access control through Free and Pro plans.

---

## 🌐 Live Demo

**Application:** https://formcraft-ai-mocha.vercel.app

---

## 📸 Screenshots

- Landing Page
- <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/0903d06e-a7d5-4496-a9cf-3d7cf43f6e17" />

- Dashboard
- <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/b613a73e-12cc-41a8-b0ef-e2b6ba7a4e93" />

- AI Form Generator
- <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/f916bba1-3e47-40ab-abcc-60276156c090" />

- Public Form
- <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/d6775a9c-2834-43db-87b9-bb2fff0838a7" />

- Responses Dashboard
- <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/dffcb320-d000-42f8-963e-9b1ffc5ef6dc" />

- Analytics
- <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/efb66721-f90d-4b33-93b9-ef90817122cd" />

- Upgrade Page
- <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/fc2706e3-d7cb-48d8-9a0d-ec36dda31cb9" />

---

# ✨ Features

## 🤖 AI Form Generation

- Generate complete forms from plain English prompts
- Powered by Google Gemini AI
- Automatically creates structured form fields
- Fully editable after generation

---

## 📝 Dynamic Form Builder

- Live form preview
- Dynamic field rendering
- Edit field labels
- Delete fields
- Theme customization
- Background customization
- Branding controls

---

## 🌍 Public Form Sharing

- Publish forms instantly
- Share using public URLs
- Responsive form pages
- Dynamic response validation

---

## 📥 Response Management

- Collect responses securely
- View submissions
- Export responses to Excel
- Organized response dashboard

---

## 🔐 Authentication

- Clerk Authentication
- Secure Sign Up
- Secure Sign In
- Protected Dashboard
- User session management

---

## 💳 Subscription System

- Razorpay Integration
- Secure payment verification
- HMAC signature validation
- Monthly Pro subscription
- Subscription status tracking
- Automatic expiry management

---

## 👑 Free vs Pro

### Free Plan

- Up to 5 AI-generated forms
- Unlimited responses
- Basic features

### Pro Plan

- Unlimited AI forms
- Premium themes
- Remove FormCraft branding
- Future premium features

---

## 🎨 Modern UI

- Neo-Brutalism Design
- Responsive Layout
- Clean Dashboard
- Professional Landing Page
- Mobile Friendly

---

# 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 |
| Frontend | React |
| Styling | Tailwind CSS |
| Authentication | Clerk |
| AI | Google Gemini AI |
| Database | Neon PostgreSQL |
| ORM | Drizzle ORM |
| Payments | Razorpay |
| Icons | Lucide React, React Icons |
| Deployment | Vercel |

---

# 📦 Installation

## Prerequisites

- Node.js 20+
- npm
- Neon PostgreSQL database
- Clerk account
- Gemini API Key
- Razorpay account

---

## Clone Repository

```bash
git clone https://github.com/Vishwak-Tech/ai-formbuilder.git

cd ai-formbuilder
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_GEMINI_API_KEY=

NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Run Database Migrations

```bash
npm run db:push
```

---

## Start Development Server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🚀 Quick Start

1. Create a free account.
2. Sign in.
3. Open the dashboard.
4. Click **Create AI Form**.
5. Describe your form.

Example prompt:

```text
Create a customer feedback form for a restaurant with rating, comments, and contact information.
```

Gemini AI generates the form automatically.

Customize it if needed, publish it, and start collecting responses.

---

# ⚙️ Configuration

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL connection string |
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Clerk public key |
| CLERK_SECRET_KEY | Clerk secret |
| NEXT_PUBLIC_GEMINI_API_KEY | Gemini API key |
| NEXT_PUBLIC_RAZORPAY_KEY_ID | Razorpay public key |
| RAZORPAY_KEY_SECRET | Razorpay secret |
| NEXT_PUBLIC_APP_URL | Base application URL |

---

# 📁 Project Structure

```
app/
├── api/
├── dashboard/
├── aiform/
├── sign-in/
├── sign-up/
├── _components/

components/
├── ui/

configs/
├── db.js
├── schema.js

utils/
├── payment.js

public/

drizzle/
```

---

# 💳 Payment Flow

```
User

↓

Upgrade

↓

Create Razorpay Order

↓

Payment

↓

Verify Signature

↓

Store Subscription

↓

Unlock Pro Features
```

---

# 🤖 AI Workflow

```
User Prompt

↓

Gemini AI

↓

Structured JSON

↓

Database

↓

Editable Form

↓

Publish

↓

Collect Responses
```

---

# 🧪 Testing

Run the development server:

```bash
npm run dev
```

Before deployment, verify:

- Authentication
- AI form generation
- Form editing
- Public sharing
- Response submission
- Razorpay payment flow (Test Mode)
- Free plan limits
- Pro plan activation

> If you add automated tests later (Jest, Vitest, Playwright, etc.), update this section with the appropriate commands.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/my-feature
```

3. Commit your changes

```bash
git commit -m "feat: add my feature"
```

4. Push your branch

```bash
git push origin feature/my-feature
```

5. Open a Pull Request

---

# 🗺 Roadmap

## Version 1.1

- Improved Analytics
- Better Dashboard
- More AI Templates
- UI Improvements

## Version 2.0

- Authentication Required Forms
- Team Workspaces
- Email Notifications
- AI Response Insights
- PDF Export
- Custom Domains
- Webhooks
- API Support

---

# 👨‍💻 Author

**Vishwak**

GitHub: https://github.com/Vishwak-Tech

LinkedIn: https://www.linkedin.com/in/vishwak-koleti-tech

---

# ⭐ Support

If you found this project helpful:

- ⭐ Star this repository
- 🍴 Fork the project
- 🐞 Report issues
- 💡 Suggest improvements

---

<p align="center">
Built with ❤️ using Next.js, Gemini AI, Clerk, Drizzle ORM, Neon PostgreSQL, and Razorpay.
</p>
