import React from 'react';
import { useApp } from '../../context/AppContext';
import { StakeholderTriad } from './StakeholderTriad';
import { QuickGapDemo } from './QuickGapDemo';
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Award, 
  Users, 
  Layers, 
  Zap 
} from 'lucide-react';
import { UserRole } from '../../types';

export const HeroSection: React.FC = () => {
  const { setRole, setPage } = useApp();

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setPage('dashboard');
  };

  return (
    <div className="space-y-16 py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Hero Header */}
      <div className="text-center space-y-6 max-w-4xl mx-auto pt-4 sm:pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs sm:text-sm font-semibold text-blue-900 shadow-2xs">
          <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Smart India Hackathon 2026 • Ministry of Education & AICTE Initiative</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-blue-950 leading-[1.18]">
          AyurSetu: One National Portal. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-800 to-amber-700">
            Three Stakeholders. Zero Skill Gaps.
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
          The centralized Government framework connecting <strong>students, industries, and academicians</strong> across India. 
          Bridge the academic curriculum with real-world enterprise requirements through standardized skill assessment, verified credentials, and internship pipelines.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => {
              setRole('student');
              setPage('assessment');
            }}
            className="px-7 py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-md flex items-center gap-2.5 transition-all hover:scale-102"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Launch Skill Assessment Engine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setPage('jobs')}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm flex items-center gap-2 transition-all shadow-xs"
          >
            <Briefcase className="w-4 h-4 text-amber-600" />
            <span>Browse National Internship Board</span>
          </button>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-200/90 text-left">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-2xl font-extrabold text-blue-950">84.6%</div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">National Placement Readiness</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-2xl font-extrabold text-blue-800">5,000+</div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">Assessed Student Profiles</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-2xl font-extrabold text-amber-700">350+</div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">Partner Tech Enterprises</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-2xl font-extrabold text-emerald-700">-68.4%</div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">Skill Gap Reduction Index</div>
          </div>
        </div>
      </div>

      {/* 4 Role-Based Entry Points */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-950">
            Dedicated Stakeholder Dashboards
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Official government modules tailored for each key stakeholder
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Student */}
          <div 
            onClick={() => handleRoleSelect('student')}
            className="bg-white p-6 cursor-pointer group flex flex-col justify-between border border-slate-200 rounded-xl shadow-xs hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Pillar 1
              </span>
              <h3 className="text-lg font-bold text-blue-950 mt-2 group-hover:text-blue-700 transition-colors">
                Students
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Complete assessments, benchmark skills against industry baselines, follow learning roadmaps, and apply to top internships.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-800">
              <span>Access Student Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Faculty */}
          <div 
            onClick={() => handleRoleSelect('academician')}
            className="bg-white p-6 cursor-pointer group flex flex-col justify-between border border-slate-200 rounded-xl shadow-xs hover:border-emerald-500 hover:shadow-md transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Pillar 2
              </span>
              <h3 className="text-lg font-bold text-blue-950 mt-2 group-hover:text-emerald-700 transition-colors">
                Faculty / Academicians
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Discover industrial sabbaticals, AICTE-funded FDPs, research grants, and align university syllabus to tech trends.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>Access Faculty Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Industry */}
          <div 
            onClick={() => handleRoleSelect('industry')}
            className="bg-white p-6 cursor-pointer group flex flex-col justify-between border border-slate-200 rounded-xl shadow-xs hover:border-amber-500 hover:shadow-md transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Pillar 3
              </span>
              <h3 className="text-lg font-bold text-blue-950 mt-2 group-hover:text-amber-700 transition-colors">
                Industry & Recruiters
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Post internships with skill weightages, shortlist candidates with AI compatibility scoring, and sponsor joint R&D.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>Access Industry Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Institution Admin */}
          <div 
            onClick={() => handleRoleSelect('institution')}
            className="bg-white p-6 cursor-pointer group flex flex-col justify-between border border-slate-200 rounded-xl shadow-xs hover:border-purple-500 hover:shadow-md transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Pillar 4
              </span>
              <h3 className="text-lg font-bold text-blue-950 mt-2 group-hover:text-purple-700 transition-colors">
                Institution Admins
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Monitor university-wide department skill gap heatmaps, issue verified NOC credentials, and export NAAC/NBA compliance reports.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-800">
              <span>Access Admin Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 3-Stakeholder Visual Motif */}
      <StakeholderTriad />

      {/* Hero Centerpiece: Quick Interactive Gap Simulator */}
      <QuickGapDemo />

      {/* Problem vs Solution Comparison Matrix */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">National Impact Framework</span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-blue-950 mt-1">
            Bridging the Academic–Industry Divide
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Legacy Challenges */}
          <div className="p-6 rounded-xl bg-rose-50/70 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>Traditional Siloed System (The Problem)</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>Students guess what skills to learn without standardized industry benchmarks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>Recruiters spend months filtering thousands of resumes with unverified claims.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>Colleges teach static syllabi without visibility into fast-changing enterprise frameworks.</span>
              </li>
            </ul>
          </div>

          {/* Unified Solution */}
          <div className="p-6 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>AyurSetu Unified Platform (The Solution)</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span>AI benchmarked assessments auto-generate 6-axis radar gap profiles & bridge pathways.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span>Recruiters access pre-ranked candidate pools scored on real verified technical aptitude.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span>Faculty leverage real-time industry demand heatmaps to modernize curriculum with NEP 2020.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
