# AyurSetu 🌿

**Bridging the gap between Ayush education and industry.**

Prototype built for **Smart India Hackathon (SIH) 2026** — Problem Statement **26044**, proposed by the **Ministry of Ayush** and **All India Institute of Ayurveda (AIIA)**.

---

## 📌 Problem Statement

Ayush graduates (Ayurveda, Yoga, Unani, Siddha, Homeopathy) often complete their traditional curricula without exposure to the modern skills the industry actually demands — ISO standards, clinical trial protocols, Pharmacovigilance, Good Manufacturing Practices (GMP), AYUSH-GCP, and lab techniques like HPLC. This creates a widening **skill gap** between what colleges teach and what employers (pharma, wellness, and research companies) need.

## 💡 Our Solution

**AyurSetu** (also referred to as **AyushBridge**) is a comprehensive multi-platform ecosystem that connects **Ayush students, colleges, and industry partners** on one bridge — helping students identify and close their skill gaps before they enter the job market.

The platform is built on real research: stakeholder interviews with Ayush graduates, faculty, and recruiters, plus a skill-gap analysis of job descriptions from companies like **Dabur** and **Himalaya**.

---

## 🏛 Ecosystem Architecture

```
AyurSetu/
├── src/                    # 🌐 Web Client (React 18, Vite, Tailwind CSS, Recharts)
├── server/                 # 🚀 Backend API (Node.js, Express, TypeScript, JWT, Persistent DB)
└── android/                # 📱 Native Mobile App (Java 17, Material 3, Retrofit2, AndroidX)
```

---

## 🚀 Quickstart Guide

### 1. Run the Full-Stack Web App & Node.js Backend

```bash
# Install dependencies
npm install
npm --prefix server install

# Run backend API server and frontend client concurrently
npm run dev
```

- **Frontend Client**: `http://localhost:5173`
- **Backend API Server**: `http://localhost:5001`
- **API Health Check**: `http://localhost:5001/api/health`

### 2. Run the Native Java Android Application

1. Open **Android Studio**.
2. Select **Open an Existing Project** and choose the `android/` directory in this repo.
3. Start an Android Virtual Device (AVD Emulator) or connect a physical Android device.
4. Run or build the app:
   ```bash
   cd android
   ./gradlew assembleDebug
   ```
   The app connects to the Node.js backend automatically via `http://10.0.2.2:5001/api/` (Android emulator loopback) or your custom local network IP.

---

## 🔑 Backend API Endpoints (Node.js / Express)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service status, uptime, and endpoint directory |
| `POST` | `/api/auth/register` | User registration (Student, Industry, Academician, Institution) |
| `POST` | `/api/auth/login` | Secure bcrypt authentication & JWT token generation |
| `GET` | `/api/auth/me` | Authenticated user session & role verification |
| `GET` | `/api/profile` | Student benchmark index, skills, radar scores |
| `PUT` | `/api/profile` | Update student profile & credentials |
| `GET` | `/api/jobs` | Retrieve all industry jobs and internship postings |
| `POST` | `/api/jobs` | Create new job opportunity (Recruiter/Admin) |
| `GET` | `/api/applications` | Student applications pipeline and status tracking |
| `POST` | `/api/applications` | Apply for job / internship with fit score matching |
| `GET` | `/api/learning-programs` | Upskilling masterclasses, certifications & syllabi |
| `POST` | `/api/learning-programs/:id/enroll` | Enroll in learning program and add to roadmap |
| `GET` | `/api/assessment/questions` | Diagnostic skill benchmark questions |
| `POST` | `/api/assessment/submit` | Submit answers and recalculate readiness radar |
| `GET` | `/api/analytics` | Institutional and curriculum gap analytics |
