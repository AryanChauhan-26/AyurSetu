import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db/database.js';
import { generateToken, authenticateJWT, optionalJWT } from '../middleware/auth.js';
const router = Router();
// ==========================================
// 1. Health & System Status Check
// ==========================================
router.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'AyurSetu API Server',
        version: '1.2.0',
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        endpoints: [
            '/api/health',
            '/api/auth/register',
            '/api/auth/login',
            '/api/auth/me',
            '/api/profile',
            '/api/jobs',
            '/api/applications',
            '/api/learning-programs',
            '/api/faculty-opportunities',
            '/api/roadmap',
            '/api/assessment/questions',
            '/api/assessment/submit',
            '/api/analytics'
        ]
    });
});
// ==========================================
// 2. Authentication Routes
// ==========================================
router.post('/auth/register', (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password, and name are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }
        const existing = db.findUserByEmail(email);
        if (existing) {
            return res.status(409).json({ error: 'A user with this email address already exists' });
        }
        const validRoles = ['student', 'academician', 'industry', 'institution'];
        const assignedRole = validRoles.includes(role) ? role : 'student';
        const newUser = db.createUser({
            email,
            password,
            name,
            role: assignedRole
        });
        const token = generateToken({
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role,
            name: newUser.name
        });
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                createdAt: newUser.createdAt
            }
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Failed to register user', details: error.message });
    }
});
router.post('/auth/login', (req, res) => {
    try {
        const { email, password, role } = req.body;
        // Direct password check if provided
        if (email && password) {
            const user = db.findUserByEmail(email);
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            const isMatch = bcrypt.compareSync(password, user.passwordHash);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            const token = generateToken({
                userId: user.id,
                email: user.email,
                role: user.role,
                name: user.name
            });
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    createdAt: user.createdAt
                }
            });
        }
        // Role-based quick login simulation fallback (used in hackathon quick-switch UI)
        const validRoles = ['student', 'academician', 'industry', 'institution'];
        const assignedRole = validRoles.includes(role) ? role : 'student';
        const existing = db.getUsers().find(u => u.role === assignedRole);
        const user = existing || {
            id: `usr-${assignedRole}-demo`,
            email: email || `${assignedRole}@ayursetu.gov.in`,
            name: assignedRole === 'student' ? db.getProfile().name : `${assignedRole.toUpperCase()} Officer`,
            role: assignedRole,
            createdAt: new Date().toISOString()
        };
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        });
        res.json({
            token,
            user
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Failed to authenticate user', details: error.message });
    }
});
router.get('/auth/me', authenticateJWT, (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const user = db.findUserById(req.user.userId);
        if (!user) {
            return res.json({
                user: req.user,
                profile: db.getProfile()
            });
        }
        const { passwordHash, ...safeUser } = user;
        res.json({
            user: safeUser,
            profile: db.getProfile()
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
});
router.get('/users', (_req, res) => {
    try {
        res.json(db.getUsers());
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
// ==========================================
// 3. Student Profile Endpoints
// ==========================================
router.get('/profile', (_req, res) => {
    try {
        const profile = db.getProfile();
        res.json(profile);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch student profile' });
    }
});
router.put('/profile', (req, res) => {
    try {
        const updated = db.updateProfile(req.body);
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update student profile' });
    }
});
// ==========================================
// 4. Jobs & Opportunities Endpoints
// ==========================================
router.get('/jobs', (_req, res) => {
    try {
        const jobs = db.getJobs();
        res.json(jobs);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});
router.get('/jobs/:id', (req, res) => {
    try {
        const job = db.getJobById(req.params.id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.json(job);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch job' });
    }
});
router.post('/jobs', optionalJWT, (req, res) => {
    try {
        const { title, company, companyLogo, location, type, workplace, stipendOrSalary, deadline, description, responsibilities, requiredSkills, preferredSkills, eligibility, featured } = req.body;
        if (!title || !company) {
            return res.status(400).json({ error: 'Title and company are required' });
        }
        const newJob = db.createJob({
            title,
            company,
            companyLogo: companyLogo ||
                'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=80',
            location: location || 'Remote, India',
            type: type || 'Full-Time',
            workplace: workplace || 'Hybrid',
            stipendOrSalary: stipendOrSalary || '₹10 - 15 LPA',
            deadline: deadline || 'In 30 days',
            description: description || '',
            responsibilities: responsibilities || [],
            requiredSkills: requiredSkills || [],
            preferredSkills: preferredSkills || [],
            eligibility: eligibility || 'Final year B.Tech / Ayush / M.Tech',
            featured: !!featured
        });
        res.status(201).json(newJob);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to post new job' });
    }
});
router.delete('/jobs/:id', (req, res) => {
    try {
        const success = db.deleteJob(req.params.id);
        if (!success) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.json({ message: 'Job deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete job' });
    }
});
// ==========================================
// 5. Job Applications Pipeline
// ==========================================
router.get('/applications', (req, res) => {
    try {
        const studentId = req.query.studentId;
        const apps = db.getApplications(studentId);
        res.json(apps);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});
router.post('/applications', optionalJWT, (req, res) => {
    try {
        const { jobId, studentId } = req.body;
        if (!jobId) {
            return res.status(400).json({ error: 'jobId is required' });
        }
        const targetStudentId = studentId || (req.user?.userId ? req.user.userId : db.getProfile().id);
        const result = db.createApplication(jobId, targetStudentId);
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }
        res.status(201).json(result.application);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to submit application' });
    }
});
router.patch('/applications/:id/status', (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }
        const updated = db.updateApplicationStatus(req.params.id, status);
        if (!updated) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update application status' });
    }
});
// ==========================================
// 6. Learning Programs
// ==========================================
router.get('/learning-programs', (_req, res) => {
    try {
        res.json(db.getLearningPrograms());
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch learning programs' });
    }
});
router.post('/learning-programs/:id/enroll', (_req, res) => {
    try {
        const result = db.enrollInProgram(_req.params.id);
        if (!result.success) {
            return res.status(404).json({ error: result.error });
        }
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to enroll in program' });
    }
});
// ==========================================
// 7. Faculty Opportunities
// ==========================================
router.get('/faculty-opportunities', (_req, res) => {
    try {
        res.json(db.getFacultyOpportunities());
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch faculty opportunities' });
    }
});
// ==========================================
// 8. Skill Roadmap
// ==========================================
router.get('/roadmap', (_req, res) => {
    try {
        res.json(db.getRoadmapItems());
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch roadmap items' });
    }
});
router.post('/roadmap', (req, res) => {
    try {
        const { title, type, provider, duration, targetSkill, gapClosedPoints, difficulty, status, linkUrl } = req.body;
        if (!title || !targetSkill) {
            return res.status(400).json({ error: 'Title and targetSkill are required' });
        }
        const item = db.addRoadmapItem({
            title,
            type: type || 'course',
            provider: provider || 'AyurSetu Skill Hub',
            duration: duration || '4 weeks',
            targetSkill,
            gapClosedPoints: gapClosedPoints || 15,
            difficulty: difficulty || 'Intermediate',
            status: status || 'recommended',
            linkUrl
        });
        res.status(201).json(item);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add roadmap item' });
    }
});
// ==========================================
// 9. Assessment Engine
// ==========================================
router.get('/assessment/questions', (_req, res) => {
    try {
        res.json(db.getAssessmentQuestions());
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch assessment questions' });
    }
});
router.post('/assessment/submit', (req, res) => {
    try {
        const { categoryScores } = req.body;
        if (!categoryScores || typeof categoryScores !== 'object') {
            return res.status(400).json({ error: 'categoryScores object is required' });
        }
        const result = db.submitAssessment(categoryScores);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to process assessment submission' });
    }
});
// ==========================================
// 10. Institutional Analytics & Insights
// ==========================================
router.get('/analytics', (_req, res) => {
    try {
        res.json(db.getAnalytics());
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
});
export default router;
