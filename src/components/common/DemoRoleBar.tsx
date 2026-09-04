import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  ArrowRight
} from 'lucide-react';

export const DemoRoleBar: React.FC = () => {
  const { role, setRole, page, setPage } = useApp();

  const roles: { id: UserRole; label: string; icon: React.ReactNode; desc: string; color: string }[] = [
    {
      id: 'student',
      label: 'Student / Aspirant',
      icon: <GraduationCap className="w-3.5 h-3.5" />,
      desc: 'Assessments, Radar Gap Chart, Jobs, Portfolio',
      color: 'bg-blue-700 text-white shadow-sm border-blue-800'
    },
    {
      id: 'academician',
      label: 'Academician / Faculty',
      icon: <Briefcase className="w-3.5 h-3.5" />,
      desc: 'FDPs, Research Grants, Curriculum Heatmaps',
      color: 'bg-emerald-700 text-white shadow-sm border-emerald-800'
    },
    {
      id: 'industry',
      label: 'Industry Recruiter',
      icon: <Building2 className="w-3.5 h-3.5" />,
      desc: 'Post Openings, ATS Pipeline, Skill-Fit Ranker',
      color: 'bg-amber-600 text-white shadow-sm border-amber-700'
    },
    {
      id: 'institution',
      label: 'Institution Admin',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      desc: 'University Analytics, Verification Vault',
      color: 'bg-indigo-800 text-white shadow-sm border-indigo-900'
    }
  ];

  return (
    <div className="bg-slate-100/90 border-b border-slate-300/80 text-xs py-1.5 px-4 sticky top-0 z-50 backdrop-blur-sm shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-slate-700">
          <div className="flex items-center gap-1.5 bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300 font-semibold text-[11px]">
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>SIH 2026 Live Demo Mode</span>
          </div>
          <span className="hidden sm:inline text-slate-600 text-[11px]">Preview stakeholder portal:</span>
        </div>

        <div className="flex items-center flex-wrap gap-1.5">
          {roles.map((r) => {
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => {
                  setRole(r.id);
                  if (page === 'landing' || page === 'login') {
                    setPage('dashboard');
                  }
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all border ${
                  isActive 
                    ? `${r.color} ring-2 ring-blue-600/30 font-bold scale-102` 
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-2xs'
                }`}
                title={r.desc}
              >
                {r.icon}
                <span>{r.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {page !== 'dashboard' ? (
            <button
              onClick={() => setPage('dashboard')}
              className="flex items-center gap-1 text-slate-700 hover:text-blue-700 bg-white hover:bg-slate-50 px-2 py-0.5 rounded border border-slate-300 transition-colors text-[11px] font-medium shadow-2xs"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <button
              onClick={() => setPage('assessment')}
              className="flex items-center gap-1 text-blue-800 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-0.5 rounded transition-colors text-[11px] font-bold shadow-2xs"
            >
              <Zap className="w-3 h-3 text-amber-600" />
              <span>Launch Assessment Engine</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
