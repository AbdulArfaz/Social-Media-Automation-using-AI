# 🚀 Social Media Automation & AI SaaS Platform

An enterprise-grade, feature-rich social media management and AI content generation platform built using the MERN stack, featuring secure HTTP-only cookie authentication, automated cross-platform scheduling, and integrated AI services for text and image creation.

---

### 🌐 Live Link

* *Live Application:* [https://social-media-automation-using-ai-bice.vercel.app](https://social-media-automation-using-ai-bice.vercel.app)

---

### 📊 Core Features & Capabilities

* 🎯 Unified Social Management: Connect multiple social media accounts and manage publishing seamlessly through a centralized dashboard.
* 🔒 Secure Authentication System: User registration, password hashing with bcrypt, login, and protected routes using HTTP-only cookies, cookie-parser, and dual JWT (Access & Refresh Tokens).
* 🤖 AI-Powered Content Generation: Generate platform-optimized captions and marketing copy using the Google Gemini API, alongside striking visual assets via Replicate.
* 📅 Cross-Platform Scheduler: Schedule and auto-publish content across multiple social channels efficiently using the Zernio API.
* ⚡ Modern UI/UX: Responsive admin dashboard built with React and Tailwind CSS, featuring robust API communication via Axios and smooth user workflows.

---

### 🛠️ Tech Stack & Deployment

* *Frontend:* React.js, Tailwind CSS, Axios (Deployed on Vercel)
* *Backend & API:* Node.js, Express.js, JWT, Bcrypt, Zernio API, Google Gemini API, Replicate API (Deployed on Render)
* *Database & Storage:* MongoDB & Mongoose (NoSQL Database)

---

### 📁 Folder Structure

```text
Social-Media-Automation-using-AI/
├── client/                 # Frontend (React + Vite)
├── server/                 # Backend (Node.js + Express)
└── README.md