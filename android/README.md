# AyurSetu Native Android Application 🌿📱

Native **Java Android Application** for AyurSetu, built for **Smart India Hackathon (SIH 2026)** — Problem Statement **26044** (Ministry of Ayush & AIIA).

---

## 🏗 Project Architecture

- **Language**: Java 17
- **UI Framework**: Material Design 3 (Material Components 1.11.0) with XML Layouts
- **Architecture**: Model-View-Adapter (MVA) with Retrofit REST Service
- **Networking**: Retrofit 2.9 + OkHttp 4 + Gson Converter
- **Image Handling**: Bumptech Glide 4.16

---

## 📂 Directory Structure

```
android/
├── build.gradle               # Root Gradle project configuration
├── settings.gradle            # Module includes (:app)
├── gradle.properties          # JVM memory and AndroidX flags
└── app/
    ├── build.gradle           # Dependencies, compileSdk 34, Retrofit, Material 3
    └── src/
        └── main/
            ├── AndroidManifest.xml # Permissions (INTERNET, Cleartext) & Activities
            ├── res/
            │   ├── drawable/       # Card and Header gradient shapes
            │   ├── layout/         # XML layouts (activity_main, jobs, assessment, etc.)
            │   ├── menu/           # Bottom navigation items
            │   └── values/         # colors.xml, strings.xml, themes.xml
            └── java/gov/ayursetu/app/
                ├── models/         # User, StudentProfile, JobOpportunity, AssessmentQuestion...
                ├── network/        # ApiClient (Retrofit), AyurSetuApiService
                ├── adapters/       # JobAdapter, SkillAdapter, ProgramAdapter
                └── ui/             # MainActivity, JobsActivity, AssessmentActivity, ProfileActivity, LearningActivity
```

---

## 🚀 How to Run in Android Studio

1. **Open Project**:
   - Launch **Android Studio**.
   - Select **Open** and select the `/android` directory of this repository.

2. **Backend Connection**:
   - Ensure the Node.js backend is running on your host machine:
     ```bash
     npm run dev
     # Backend runs on http://localhost:5001
     ```
   - When running inside the **Android Emulator**, the app automatically communicates with the host machine via `http://10.0.2.2:5001/api/`.
   - When running on a **Physical Android Device via USB / Wi-Fi**:
     Update the IP in `ApiClient.java`:
     ```java
     ApiClient.setCustomBaseUrl("http://<YOUR_LOCAL_IP>:5001/api/");
     ```

3. **Build APK**:
   ```bash
   ./gradlew assembleDebug
   ```
   The debug APK will be generated at `app/build/outputs/apk/debug/app-debug.apk`.

---

## ✨ Features Included

1. **Live Readiness Index Gauge**: Real-time visualization of industry readiness benchmarks vs student score.
2. **Opportunities Pipeline**: Search and filter jobs/internships from Dabur, Himalaya, Baidyanath, AIIA; one-tap application.
3. **Assessment Quiz**: Real-time diagnostic quiz calculating scores for AYUSH-GCP, HPLC, and clinical standards.
4. **Student Portfolio**: View verified certifications, skill progress bars, and accredited credentials.
5. **Skill Hub & Learning Marketplace**: Enroll in specialized industry upskilling masterclasses with instant syllabus breakdown.
