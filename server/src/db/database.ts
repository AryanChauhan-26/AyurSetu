import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import {
  StudentProfile,
  JobOpportunity,
  JobApplication,
  SkillRoadmapItem,
  LearningProgram,
  FacultyOpportunity,
  CurriculumSkillInsight,
  InstitutionalMetrics,
  AssessmentQuestion,
  User
} from '../types.js';
import {
  INITIAL_STUDENT_PROFILE,
  JOB_OPPORTUNITIES,
  INITIAL_APPLICATIONS,
  INITIAL_ROADMAP_ITEMS,
  LEARNING_PROGRAMS,
  FACULTY_OPPORTUNITIES,
  CURRICULUM_SKILL_INSIGHTS,
  INSTITUTIONAL_METRICS,
  ASSESSMENT_QUESTIONS,
  SAMPLE_CANDIDATES_FOR_INDUSTRY
} from './initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.resolve(DATA_DIR, 'store.json');

// Default seeded users (passwords are 'password123')
const DEFAULT_USERS: User[] = [
  {
    id: 'usr-student-001',
    email: 'sakshi.sharma@tech.edu.in',
    passwordHash: bcrypt.hashSync('password123', 8),
    name: 'Sakshi Sharma',
    role: 'student',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-student-002',
    email: 'student@ayursetu.gov.in',
    passwordHash: bcrypt.hashSync('password123', 8),
    name: 'AyurSetu Scholar',
    role: 'student',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-industry-001',
    email: 'recruiter@dabur.com',
    passwordHash: bcrypt.hashSync('password123', 8),
    name: 'Dr. Vikram Malhotra (Dabur Research)',
    role: 'industry',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-industry-002',
    email: 'industry@ayursetu.gov.in',
    passwordHash: bcrypt.hashSync('password123', 8),
    name: 'Industry Partner',
    role: 'industry',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-academician-001',
    email: 'dean@aiia.gov.in',
    passwordHash: bcrypt.hashSync('password123', 8),
    name: 'Prof. Rajeshwari Joshi (AIIA)',
    role: 'academician',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-institution-001',
    email: 'admin@ayursetu.gov.in',
    passwordHash: bcrypt.hashSync('password123', 8),
    name: 'Ministry of Ayush Administrator',
    role: 'institution',
    createdAt: new Date().toISOString()
  }
];

export interface DatabaseSchema {
  users: User[];
  studentProfile: StudentProfile;
  jobs: JobOpportunity[];
  applications: JobApplication[];
  roadmapItems: SkillRoadmapItem[];
  learningPrograms: LearningProgram[];
  facultyOpportunities: FacultyOpportunity[];
  curriculumInsights: CurriculumSkillInsight[];
  institutionalMetrics: InstitutionalMetrics;
  assessmentQuestions: AssessmentQuestion[];
  industryCandidates: typeof SAMPLE_CANDIDATES_FOR_INDUSTRY;
}

class Database {
  private data: DatabaseSchema;
  private saveTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(content);
        // Ensure users array exists in existing store
        if (!parsed.users || !Array.isArray(parsed.users) || parsed.users.length === 0) {
          parsed.users = DEFAULT_USERS;
        }
        return parsed;
      }
    } catch (err) {
      console.warn('Could not read existing database file, falling back to initial data:', err);
    }

    const initial: DatabaseSchema = {
      users: DEFAULT_USERS,
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

  private persist(dataToSave: DatabaseSchema = this.data) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write to database file:', err);
    }
  }

  public save() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      this.persist();
      this.saveTimeout = null;
    }, 150);
  }

  // --- User Authentication methods ---
  public findUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  }

  public findUserById(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  public createUser(userData: { email: string; password: string; name: string; role: User['role'] }): User {
    const newUser: User = {
      id: `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      email: userData.email.toLowerCase().trim(),
      passwordHash: bcrypt.hashSync(userData.password, 8),
      name: userData.name,
      role: userData.role,
      createdAt: new Date().toISOString()
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  public getUsers(): Omit<User, 'passwordHash'>[] {
    return this.data.users.map(({ passwordHash, ...user }) => user);
  }

  // --- Profile methods ---
  public getProfile(): StudentProfile {
    return this.data.studentProfile;
  }

  public updateProfile(update: Partial<StudentProfile>): StudentProfile {
    this.data.studentProfile = { ...this.data.studentProfile, ...update };
    this.save();
    return this.data.studentProfile;
  }

  // --- Jobs methods ---
  public getJobs(): JobOpportunity[] {
    return this.data.jobs;
  }

  public getJobById(id: string): JobOpportunity | undefined {
    return this.data.jobs.find(j => j.id === id);
  }

  public createJob(jobData: Omit<JobOpportunity, 'id' | 'postedDate' | 'applicantsCount'>): JobOpportunity {
    const newJob: JobOpportunity = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedDate: 'Just now',
      applicantsCount: 0
    };
    this.data.jobs = [newJob, ...this.data.jobs];
    this.save();
    return newJob;
  }

  public deleteJob(id: string): boolean {
    const prevLength = this.data.jobs.length;
    this.data.jobs = this.data.jobs.filter(j => j.id !== id);
    if (this.data.jobs.length !== prevLength) {
      this.save();
      return true;
    }
    return false;
  }

  // --- Applications methods ---
  public getApplications(studentId?: string): JobApplication[] {
    if (studentId) {
      return this.data.applications.filter(a => a.studentId === studentId);
    }
    return this.data.applications;
  }

  public createApplication(jobId: string, studentId: string): { success: boolean; application?: JobApplication; error?: string } {
    const job = this.getJobById(jobId);
    if (!job) {
      return { success: false, error: 'Job not found' };
    }

    const alreadyApplied = this.data.applications.some(
      a => a.jobId === jobId && a.studentId === studentId
    );
    if (alreadyApplied) {
      return { success: false, error: 'Already applied for this position' };
    }

    const matchScore = Math.floor(82 + Math.random() * 15);
    const newApp: JobApplication = {
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
    job.applicantsCount += 1;
    this.save();

    return { success: true, application: newApp };
  }

  public updateApplicationStatus(appId: string, status: JobApplication['status']): JobApplication | null {
    const app = this.data.applications.find(a => a.id === appId);
    if (!app) return null;

    app.status = status;
    this.save();
    return app;
  }

  // --- Learning Programs methods ---
  public getLearningPrograms(): LearningProgram[] {
    return this.data.learningPrograms;
  }

  public enrollInProgram(programId: string): { success: boolean; program?: LearningProgram; roadmapItem?: SkillRoadmapItem; error?: string } {
    const prog = this.data.learningPrograms.find(p => p.id === programId);
    if (!prog) {
      return { success: false, error: 'Learning program not found' };
    }

    prog.enrolledCount += 1;

    const newRoadmap: SkillRoadmapItem = {
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
  public getFacultyOpportunities(): FacultyOpportunity[] {
    return this.data.facultyOpportunities;
  }

  // --- Roadmap methods ---
  public getRoadmapItems(): SkillRoadmapItem[] {
    return this.data.roadmapItems;
  }

  public addRoadmapItem(item: Omit<SkillRoadmapItem, 'id'>): SkillRoadmapItem {
    const newItem: SkillRoadmapItem = {
      ...item,
      id: `road-${Date.now()}`
    };
    this.data.roadmapItems = [newItem, ...this.data.roadmapItems];
    this.save();
    return newItem;
  }

  // --- Assessment methods ---
  public getAssessmentQuestions(): AssessmentQuestion[] {
    return this.data.assessmentQuestions;
  }

  public submitAssessment(categoryScores: Record<string, number>): { profile: StudentProfile; average: number } {
    const updatedRadar = [
      { category: 'Full-Stack Dev', student: categoryScores['Full-Stack Development'] || 85, benchmark: 85, fullMark: 100 },
      { category: 'DSA & Algorithms', student: categoryScores['Data Structures & Algorithms'] || 80, benchmark: 80, fullMark: 100 },
      { category: 'System Architecture', student: categoryScores['System Design'] || 70, benchmark: 85, fullMark: 100 },
      { category: 'Cloud & DevOps', student: categoryScores['Cloud & DevOps'] || 65, benchmark: 80, fullMark: 100 },
      { category: 'AI & Data Eng.', student: categoryScores['AI & Data Engineering'] || 75, benchmark: 72, fullMark: 100 },
      { category: 'Soft Skills & Collab', student: categoryScores['Professional Communication'] || 90, benchmark: 75, fullMark: 100 }
    ];

    const avg = Math.round(
      updatedRadar.reduce((sum, item) => sum + item.student, 0) / updatedRadar.length
    );

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
  public getAnalytics() {
    return {
      institutionalMetrics: this.data.institutionalMetrics,
      curriculumInsights: this.data.curriculumInsights,
      industryCandidates: this.data.industryCandidates
    };
  }
}

export const db = new Database();
