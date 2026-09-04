import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_CANDIDATES_FOR_INDUSTRY } from '../../data/mockData';
import { 
  Users, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Filter
} from 'lucide-react';

export const CandidateRankingView: React.FC = () => {
  const { setPage, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [minFitScore, setMinFitScore] = useState<number>(80);

  const filteredCandidates = SAMPLE_CANDIDATES_FOR_INDUSTRY.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          c.roleTarget.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesScore = c.skillFitPercentage >= minFitScore;
    return matchesSearch && matchesScore;
  });

  const handleShortlist = (name: string) => {
    addToast({
      title: 'Candidate Fast-Tracked!',
      message: `${name} has been moved to Priority Shortlist. Official invitation sent for technical screen.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
            <span>AI-Ranked Candidate Shortlist</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 font-bold">
              Standardized Competency
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Candidates ranked by verified assessment benchmarks and project portfolio authenticity
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by skill, role, or student..."
              className="glass-input pl-9 pr-4 py-2 text-xs w-52 sm:w-64"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-amber-600" />
            <span>Min Fit: <strong>{minFitScore}%</strong></span>
            <input
              type="range"
              min={70}
              max={95}
              value={minFitScore}
              onChange={(e) => setMinFitScore(Number(e.target.value))}
              className="w-16 h-1.5 bg-slate-200 rounded accent-blue-900"
            />
          </div>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCandidates.map((cand) => (
          <div 
            key={cand.id}
            className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-300"
                  />
                  <div>
                    <h4 className="font-bold text-base text-blue-950">{cand.name}</h4>
                    <span className="text-xs text-slate-500 font-medium">{cand.college}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {cand.skillFitPercentage}% Compatibility
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1 font-semibold">Score: {cand.assessmentScore}/100</span>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <div className="text-slate-500 text-[11px] mb-1">Target Role Fit: <strong className="text-blue-950">{cand.roleTarget}</strong></div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {cand.skills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white text-blue-900 border border-slate-200 text-[11px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {cand.verifiedBadges.map((badge, bIdx) => (
                  <span key={bIdx} className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                    <ShieldCheck className="w-3 h-3 text-blue-700" />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setPage('portfolio')}
                className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Full Portfolio</span>
                <ExternalLink className="w-3 h-3" />
              </button>

              <button
                onClick={() => handleShortlist(cand.name)}
                className="flex-1 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1"
              >
                <span>Shortlist Candidate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
