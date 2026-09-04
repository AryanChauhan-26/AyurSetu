import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react';

export const QuickGapDemo: React.FC = () => {
  const { setPage, setRole } = useApp();
  const [selectedTrack, setSelectedTrack] = useState<'cloud' | 'ai' | 'fullstack'>('cloud');
  const [studentSelfScore, setStudentSelfScore] = useState<number>(65);

  const tracks = {
    cloud: {
      name: 'Cloud & Distributed Systems',
      industryBenchmark: 85,
      keySkills: ['Kubernetes', 'Go / gRPC', 'Kafka', 'System Design'],
      topCompany: 'Cisco, AWS, Google',
      estimatedTimeToClose: '4 Weeks',
      recommendedCourse: 'Enterprise Distributed Systems Mastery (AICTE & Google Cloud)'
    },
    ai: {
      name: 'Generative AI & LLM Systems',
      industryBenchmark: 82,
      keySkills: ['RAG Pipelines', 'Vector DBs', 'FastAPI', 'PyTorch'],
      topCompany: 'NVIDIA, Microsoft, OpenAI Partners',
      estimatedTimeToClose: '3 Weeks',
      recommendedCourse: 'Generative AI & Agentic Workflows (NVIDIA DLI & MoE)'
    },
    fullstack: {
      name: 'Full-Stack Software Engineering',
      industryBenchmark: 88,
      keySkills: ['React 19', 'Next.js', 'PostgreSQL', 'Microservices'],
      topCompany: 'Razorpay, Infosys, Atlassian',
      estimatedTimeToClose: '2 Weeks',
      recommendedCourse: 'Modern Enterprise Full-Stack Bootcamp (National Skill Council)'
    }
  };

  const current = tracks[selectedTrack];
  const gap = current.industryBenchmark - studentSelfScore;
  const isReady = gap <= 0;

  return (
    <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Simulator</span>
          </div>
          <h3 className="text-xl font-bold text-blue-950">
            Instant Skill-Gap & Roadmap Calculator
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Pick a high-demand career pathway and test your current readiness against live hiring thresholds.
          </p>
        </div>

        {/* Track selector buttons */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(tracks) as (keyof typeof tracks)[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedTrack(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedTrack === key
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {tracks[key].name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Interactive Slider */}
        <div className="lg:col-span-6 space-y-5 p-5 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-700 font-semibold">Your Estimated Proficiency</span>
              <span className="font-extrabold text-blue-900 text-base">{studentSelfScore}/100</span>
            </div>
            <input
              type="range"
              min={30}
              max={100}
              value={studentSelfScore}
              onChange={(e) => setStudentSelfScore(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Novice (30)</span>
              <span>Competent (65)</span>
              <span>Industry Benchmark (100)</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200">
            <div className="text-xs font-bold text-slate-800">Required Core Competencies:</div>
            <div className="flex flex-wrap gap-1.5">
              {current.keySkills.map((s, i) => (
                <span key={i} className="text-[11px] px-2.5 py-1 rounded bg-white text-blue-900 border border-slate-200 font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-200">
            <span>Hiring Partners: <strong className="text-slate-900">{current.topCompany}</strong></span>
            <span>Est. Bridge Time: <strong className="text-amber-700">{current.estimatedTimeToClose}</strong></span>
          </div>
        </div>

        {/* Right: Instant Calculation Outcome */}
        <div className="lg:col-span-6 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600">Target Industry Baseline:</span>
            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
              {current.industryBenchmark} pts Required
            </span>
          </div>

          {isReady ? (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-900">Industry Ready (+{Math.abs(gap)} pts above threshold)</h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  You meet or exceed criteria for top-tier national internships. Apply now for direct fast-track shortlisting.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900">Skill Gap Identified (-{gap} pts)</h4>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Top hiring partners require deeper hands-on experience in {current.keySkills.slice(0, 2).join(' and ')}.
                </p>
              </div>
            </div>
          )}

          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
            <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Recommended Gap-Closing Program:</div>
            <div className="font-bold text-blue-950">{current.recommendedCourse}</div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => {
                setRole('student');
                setPage('assessment');
              }}
              className="flex-1 px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>Take Full 6-Axis Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
