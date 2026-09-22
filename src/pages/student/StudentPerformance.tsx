import React from 'react';
import {
  studentAnalyticsCharts,
  studentStrengthWeakness,
  currentStudent
} from '../../data/mockDatabase';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Radar as RadarIcon,
  ScatterChart as ScatterIcon,
  Info,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface StudentPerformanceProps {
  onNavigate: (viewId: string) => void;
}

export const StudentPerformance: React.FC<StudentPerformanceProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" /> Academic Dossier & Longitudinal Analytics
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Comprehensive Student Performance Analytics
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Historical CGPA trajectory, continuous assessment scores, correlation analysis, and competency radar
          </p>
        </div>

        <button
          onClick={() => onNavigate('prediction')}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-blue-300" />
          Test Future Outcomes in AI Predictor
        </button>
      </div>

      {/* Primary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Semester CGPA Trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Longitudinal CGPA Progression</h2>
              <p className="text-xs text-slate-600">Semester I through Semester VI (Forecasted)</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
              Current: 8.1 / 10.0
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={studentAnalyticsCharts.semesterCGPA} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="semester" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[6.5, 9.5]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  formatter={(val: any) => [`${val} CGPA`, 'Grade Point Average']}
                  contentStyle={{ backgroundColor: '#0B1B33', borderColor: '#1e3a8a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="cgpa"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: '#1d4ed8', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Steady +0.9 overall growth across 3 academic years</span>
            <span className="font-semibold text-blue-600">First Class with Distinction Pace</span>
          </div>
        </div>

        {/* Subject Marks Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Current Semester Continuous Assessment (100)</h2>
              <p className="text-xs text-slate-600">Subject marks evaluated across internals & assignments</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-200">
              Cohort Avg: 75.4
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentAnalyticsCharts.subjectMarks} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <Tooltip
                  formatter={(val: any) => [`${val} / 100`, 'Evaluated Score']}
                  contentStyle={{ backgroundColor: '#0B1B33', borderColor: '#1e3a8a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <ReferenceLine y={75} stroke="#2563eb" strokeDasharray="3 3" />
                <Bar dataKey="marks" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Highest: WebTech (90) &bull; Lowest: COA (61)</span>
            <span className="text-red-600 font-bold">COA Requires Review</span>
          </div>
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scatter: Attendance vs Marks */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Attendance vs. Continuous Marks Correlation</h2>
              <p className="text-xs text-slate-600">Empirical Pearson correlation r = +0.94</p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
              r = 0.94 (Strong)
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  type="number"
                  dataKey="attendance"
                  name="Attendance"
                  unit="%"
                  domain={[60, 100]}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <YAxis
                  type="number"
                  dataKey="marks"
                  name="Marks"
                  unit="%"
                  domain={[50, 100]}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg">
                          <p className="font-bold text-blue-400">{data.name}</p>
                          <p>Attendance: {data.attendance}%</p>
                          <p>Continuous Marks: {data.marks}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Subjects" data={studentAnalyticsCharts.attendanceVsMarks} fill="#2563eb" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-600 mt-2 border-t border-slate-100 pt-2">
            Data proves student contact hours directly drive mastery and internal scores.
          </p>
        </div>

        {/* Academic Strengths Radar Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Academic Competency Radar</h2>
              <p className="text-xs text-slate-600">Multi-dimensional evaluation across skills</p>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              High Practical Mastery
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={studentAnalyticsCharts.radarStrengths}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#475569', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                <Radar
                  name="Skill Score"
                  dataKey="score"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.4}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B1B33', borderColor: '#1e3a8a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-600 mt-2 border-t border-slate-100 pt-2">
            High programming (92) and problem solving (88); theoretical memory retention needs reinforcement.
          </p>
        </div>
      </div>

      {/* Strength & Weakness Analysis Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Subjects */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4 text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
            <h2 className="font-bold text-slate-900 text-base">Your Strong Subjects</h2>
          </div>

          <div className="space-y-3">
            {studentStrengthWeakness.strong.map((subj, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{subj.subject}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                    <span>Average: <strong className="text-slate-800">{subj.avg}</strong></span>
                    <span>&bull;</span>
                    <span>Attendance: <strong className="text-slate-800">{subj.attendance}</strong></span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Grade {subj.grade}
                  </span>
                  <span className="block text-[11px] font-semibold text-emerald-700 mt-1">
                    {subj.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subjects Requiring Attention (Red highlight) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="font-bold text-slate-900 text-base">Subjects Requiring Attention</h2>
          </div>

          <div className="space-y-3">
            {studentStrengthWeakness.needsAttention.map((subj, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-red-200 bg-red-50/40 flex flex-col justify-between gap-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{subj.subject}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                      <span>Performance: <strong className="text-red-700">{subj.avg}</strong></span>
                      <span>&bull;</span>
                      <span>Attendance: <strong className="text-red-700">{subj.attendance}</strong></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-red-100 text-red-800 border border-red-200">
                      Grade {subj.grade}
                    </span>
                    <span className="block text-[11px] font-bold text-red-700 mt-1">
                      {subj.status}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-red-800 bg-white/60 p-2 rounded-lg border border-red-100">
                  <strong>Reason:</strong> {subj.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
