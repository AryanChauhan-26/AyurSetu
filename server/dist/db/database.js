import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_STUDENT_PROFILE, JOB_OPPORTUNITIES, INITIAL_APPLICATIONS, INITIAL_ROADMAP_ITEMS, LEARNING_PROGRAMS, FACULTY_OPPORTUNITIES, CURRICULUM_SKILL_INSIGHTS, INSTITUTIONAL_METRICS, ASSESSMENT_QUESTIONS, SAMPLE_CANDIDATES_FOR_INDUSTRY } from './initialData.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.resolve(DATA_DIR, 'store.json');
class Database {
    data;
    saveTimeout = null;
    constructor() {
        this.data = this.loadData();
    }
    loadData() {
        try {
            if (fs.existsSync(DB_FILE)) {
                const content = fs.readFileSync(DB_FILE, 'utf-8');
                return JSON.parse(content);
            }
        }
        catch (err) {
            console.warn('Could not read existing database file, falling back to initial data:', err);
        }
        const initial = {
            studentProfile: INITIAL_STUDENT_PROFILE,
            jobs: JOB_OPPORTUNITIES,
            applications: INITIAL_APPLICATIONS,
            roadmapItems: INITIAL_ROADMAP_ITEMS,
            learningPrograms: LEARNING_PROGRAMS,
            facultyOpportunities: FACULTY_OPPORTUNITIES,
            curriculumInsights: CURRICULUM_SKILL_INSIGHTS,
            institutionalMetrics: INSTITUTIONAL_METRICS,
            assessmentQuestions: ASSESSMENT_QUESTIONS,
            industryCandidates: SAMPLE_CANDIDATES_FOR_INDUSTRY
        };
        this.persist(initial);
        return initial;
    }
    persist(dataToSave = this.data) {
        try {
            if (!fs.existsSync(DATA_DIR)) {
                fs.mkdirSync(DATA_DIR, { recursive: true });
            }
            fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
        }
        catch (err) {
            console.error('Failed to write to database file:', err);
        }
    }
    save() {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
        this.saveTimeout = setTimeout(() => {
            this.persist();
            this.saveTimeout = null;
        }, 200);
    }
    // --- Profile methods ---
    getProfile() {
        return this.data.studentProfile;
    }
    updateProfile(update) {
        this.data.studentProfile = { ...this.data.studentProfile, ...update };
        this.save();
        return this.data.studentProfile;
    }
    // --- Jobs methods ---
    getJobs() {
        return this.data.jobs;
    }
    getJobById(id) {
        return this.data.jobs.find(j => j.id === id);
    }
    createJob(jobData) {
        const newJob = {
            ...jobData,
            id: `job-${Date.now()}`,
            postedDate: 'Just now',
            applicantsCount: 0
        };
        this.data.jobs = [newJob, ...this.data.jobs];
        this.save();
        return newJob;
    }
    // --- Applications methods ---
    getApplications(studentId) {
        if (studentId) {
            return this.data.applications.filter(a => a.studentId === studentId);
        }
        return this.data.applications;
    }
    createApplication(jobId, studentId) {
        const job = this.getJobById(jobId);
        if (!job) {
            return { success: false, error: 'Job not found' };
        }
        const alreadyApplied = this.data.applications.some(a => a.jobId === jobId && a.studentId === studentId);
        if (alreadyApplied) {
            return { success: false, error: 'Already applied for this position' };
        }
        const matchScore = Math.floor(82 + Math.random() * 15);
        const newApp = {
            id: `app-${Date.now()}`,
            jobId: job.id,
            jobTitle: job.title,
            company: job.company,
            companyLogo: job.companyLogo,
            studentId: this.data.studentProfile.id,
            studentName: this.data.studentProfile.name,
            appliedDate: 'Just now',
            status: 'Applied',
            fitScore: matchScore,
            nextStep: 'Application submitted to company HR screening pipeline.'
        };
        this.data.applications = [newApp, ...this.data.applications];
        // Increment applicant count on job
        job.applicantsCount += 1;
        this.save();
        return { success: true, application: newApp };
    }
    updateApplicationStatus(appId, status) {
        const app = this.data.applications.find(a => a.id === appId);
        if (!app)
            return null;
        app.status = status;
        this.save();
        return app;
    }
    // --- Learning Programs methods ---
    getLearningPrograms() {
        return this.data.learningPrograms;
    }
    enrollInProgram(programId) {
        const prog = this.data.learningPrograms.find(p => p.id === programId);
        if (!prog) {
            return { success: false, error: 'Learning program not found' };
        }
        prog.enrolledCount += 1;
        const newRoadmap = {
            id: `road-enrolled-${Date.now()}`,
            title: prog.title,
            type: 'course',
            provider: prog.offeredBy,
            duration: prog.duration,
            targetSkill: prog.skillsTaught[0] || 'Technical Mastery',
            gapClosedPoints: 20,
            difficulty: prog.level,
            status: 'in_progress'
        };
        this.data.roadmapItems = [newRoadmap, ...this.data.roadmapItems];
        this.save();
        return { success: true, program: prog, roadmapItem: newRoadmap };
    }
    // --- Faculty Opportunities methods ---
    getFacultyOpportunities() {
        return this.data.facultyOpportunities;
    }
    // --- Roadmap methods ---
    getRoadmapItems() {
        return this.data.roadmapItems;
    }
    addRoadmapItem(item) {
        const newItem = {
            ...item,
            id: `road-${Date.now()}`
        };
        this.data.roadmapItems = [newItem, ...this.data.roadmapItems];
        this.save();
        return newItem;
    }
    // --- Assessment methods ---
    getAssessmentQuestions() {
        return this.data.assessmentQuestions;
    }
    submitAssessment(categoryScores) {
        const updatedRadar = [
            { category: 'Full-Stack Dev', student: categoryScores['Full-Stack Development'] || 85, benchmark: 85, fullMark: 100 },
            { category: 'DSA & Algorithms', student: categoryScores['Data Structures & Algorithms'] || 80, benchmark: 80, fullMark: 100 },
            { category: 'System Architecture', student: categoryScores['System Design'] || 70, benchmark: 85, fullMark: 100 },
            { category: 'Cloud & DevOps', student: categoryScores['Cloud & DevOps'] || 65, benchmark: 80, fullMark: 100 },
            { category: 'AI & Data Eng.', student: categoryScores['AI & Data Engineering'] || 75, benchmark: 72, fullMark: 100 },
            { category: 'Soft Skills & Collab', student: categoryScores['Professional Communication'] || 90, benchmark: 75, fullMark: 100 }
        ];
        const avg = Math.round(updatedRadar.reduce((sum, item) => sum + item.student, 0) / updatedRadar.length);
        this.data.studentProfile = {
            ...this.data.studentProfile,
            radarScores: updatedRadar,
            overallReadiness: avg,
            completedAssessmentsCount: this.data.studentProfile.completedAssessmentsCount + 1,
            verifiedBadges: Array.from(new Set([...this.data.studentProfile.verifiedBadges, 'Benchmarked 2026', 'Assessment Verified']))
        };
        this.save();
        return { profile: this.data.studentProfile, average: avg };
    }
    // --- Analytics & Insights ---
    getAnalytics() {
        return {
            institutionalMetrics: this.data.institutionalMetrics,
            curriculumInsights: this.data.curriculumInsights,
            industryCandidates: this.data.industryCandidates
        };
    }
}
export const db = new Database();
