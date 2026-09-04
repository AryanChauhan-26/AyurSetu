import React from 'react';
import { INSTITUTIONAL_METRICS } from '../../data/mockData';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Download 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnalyticsPage: React.FC = () => {
  const { addToast } = useApp();
  const metrics = INSTITUTIONAL_METRICS;

  const handleExportData = () => {
    addToast({
      title: 'Full Analytics Dataset Exported',
      message: 'Generated comprehensive JSON/CSV analytics package for AICTE reporting.',
      type: 'success'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in relative z-10">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>National Institutional & Industry Skill Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
              Macro Skill Trends & Placement Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Cross-stakeholder real-time telemetry: tracking student skill acquisition velocity, emerging employer demand, and hiring outcomes across engineering disciplines.
            </p>
          </div>

          <button
            onClick={handleExportData}
            className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all self-start md:self-center"
          >
            <Download className="w-4 h-4" />
            <span>Export Analytics Dataset</span>
          </button>
        </div>

        {/* 4 Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Total Enrolled Cohort</span>
            <div className="text-2xl font-extrabold text-blue-950 mt-0.5">{metrics.totalStudents.toLocaleString()}</div>
            <span className="text-[10px] text-emerald-700 font-bold">+12% vs last year</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Readiness Rate</span>
            <div className="text-2xl font-extrabold text-emerald-700 mt-0.5">{metrics.placementReadinessRate}%</div>
            <span className="text-[10px] text-blue-800 font-medium">National average 75%</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Active Industry Partners</span>
            <div className="text-2xl font-extrabold text-amber-800 mt-0.5">{metrics.activeIndustryPartners} Tech Cos</div>
            <span className="text-[10px] text-amber-800 font-medium">Cisco, Google, NVIDIA</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Skill Gap Reduction</span>
            <div className="text-2xl font-extrabold text-blue-900 mt-0.5">{metrics.avgSkillGapClosedPct}%</div>
            <span className="text-[10px] text-blue-800 font-medium">Post-Bridge Programs</span>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Placement Growth Trend (Area Chart) */}
        <div className="lg:col-span-7 bg-white p-6 border border-slate-200 rounded-xl shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-blue-950">Monthly Placements vs Institutional Target</h3>
              <p className="text-xs text-slate-500">2025–2026 Academic Placement Trajectory</p>
            </div>
            <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
              +11.5% Ahead of Target
            </span>
          </div>

          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.monthlyPlacementTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPlacedGov" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorTargetGov" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 500 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '0.5rem', color: '#0f172a', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
                <Area type="monotone" dataKey="placed" stroke="#1d4ed8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPlacedGov)" name="Placed Candidates" />
                <Area type="monotone" dataKey="target" stroke="#ea580c" strokeWidth={1.5} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorTargetGov)" name="National Target" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hiring Domain Breakdown (Pie Chart) */}
        <div className="lg:col-span-5 bg-white p-6 border border-slate-200 rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-blue-950">Hiring Demand Breakdown by Domain</h3>
            <p className="text-xs text-slate-500">Distribution of 892 verified internships and offers</p>
          </div>

          <div className="w-full h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.hiringDomainBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="percentage"
                  nameKey="domain"
                >
                  {metrics.hiringDomainBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '0.5rem', color: '#0f172a', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(val: any) => [`${val}% of Total Hires`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
            {metrics.hiringDomainBreakdown.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-700 truncate font-medium">{item.domain}: <strong>{item.percentage}%</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
