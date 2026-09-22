import React from 'react';
import {
  staffOverviewStats,
  departmentMetrics,
  atRiskStudentsList
} from '../../data/mockDatabase';
import {
  Users,
  Award,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Building2,
  Sparkles,
  Info,
  Calendar,
  ExternalLink
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface StaffOverviewProps {
  onNavigate: (viewId: string) => void;
  onSelectStudent?: (roll: string) => void;
}

export const StaffOverview: React.FC<StaffOverviewProps> = ({
  onNavigate,
  onSelectStudent
}) => {
  const deptComparison = departmentMetrics.map(d => ({
    dept: d.code,
    name: d.department,
    passRate: d.pass_rate,
    avgMarks: d.avg_marks
  }));

  const aiInsights = [
    {
      id: 'ins-1',
      title: 'Computer Organization has the lowest pass percentage (68.0%)',
      metric: 'Pass Rate: 68.0% | At-Risk Students: 42',
      action: 'Schedule 8 remedial lecture hours before second internal examination.',
      priority: 'High'
    },
    {
      id: 'ins-2',
      title: 'High Attendance Correlates Strongly With Academic Excellence',
      metric: 'Attendance >85% correlates with +14.2 marks higher internal average',
      action: 'Maintain strict biometric threshold tracking at 75% cutoff.',
      priority: 'Medium'
    },
    {
      id: 'ins-3',
      title: 'Batch 2026 Demonstrates Longitudinal Improvement',
      metric: 'Batch pass rate reached 89.8% (+8.3% vs Batch 2023)',
      action: 'Archive best practices in curriculum revision for subsequent batches.',
      priority: 'Low'
    },
    {
      id: 'ins-4',
      title: '42 Students Require Academic Intervention in Computer Organization',
      metric: 'Department of Information Technology, Semester VI',
      action: 'Issue faculty mentoring notices and peer-assisted study sessions.',
      priority: 'High'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Institutional Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" /> Institutional Examination Board Analytics
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Academic Performance Overview
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Information Technology Department &bull; Academic Year 2026–27 &bull; Semester VI
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('at-risk')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> 86 At-Risk Students
          </button>
          <button
            onClick={() => onNavigate('data-intelligence')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-navy-900 hover:bg-slate-900 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-300" /> Big Data & ML Pipeline
          </button>
        </div>
      </div>

      {/* 6 Institutional KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <div
          onClick={() => onNavigate('student-search')}
          className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-blue-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Students</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-black text-slate-900">
            {staffOverviewStats.total_students.toLocaleString()}
          </span>
          <p className="text-[11px] text-slate-600 mt-1">Enrolled across 5 depts</p>
        </div>

        <div
          onClick={() => onNavigate('dept-analytics')}
          className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-blue-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Overall Pass %</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-emerald-600">
            {staffOverviewStats.overall_pass_percentage}%
          </span>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">+2.4% vs 2025</p>
        </div>

        <div
          onClick={() => onNavigate('subject-analytics')}
          className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-blue-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Average Internal</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-black text-slate-900">
            {staffOverviewStats.average_internal_marks}%
          </span>
          <p className="text-[11px] text-slate-600 mt-1">Scale 100 continuous</p>
        </div>

        <div
          onClick={() => onNavigate('dept-analytics')}
          className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-blue-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Avg Attendance</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-slate-900">
            {staffOverviewStats.average_attendance}%
          </span>
          <p className="text-[11px] text-slate-600 mt-1">Biometric contact hours</p>
        </div>

        <div
          onClick={() => onNavigate('at-risk')}
          className="bg-red-50/70 border border-red-200 rounded-xl p-4 shadow-xs hover:border-red-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-red-800 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">At-Risk</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <span className="text-2xl font-black text-red-700">
            {staffOverviewStats.students_at_risk}
          </span>
          <p className="text-[11px] text-red-800 font-semibold mt-1">Requires intervention</p>
        </div>

        <div
          onClick={() => onNavigate('subject-analytics')}
          className="bg-red-50/50 border border-red-200 rounded-xl p-4 shadow-xs hover:border-red-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-red-800 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Flagged Subjects</span>
            <BookOpen className="w-4 h-4 text-red-600" />
          </div>
          <span className="text-2xl font-black text-red-700">
            {staffOverviewStats.subjects_requiring_attention}
          </span>
          <p className="text-[11px] text-red-800 font-semibold mt-1">Pass rate &lt; 75%</p>
        </div>
      </div>

      {/* Main Row: Department Comparison Bar Chart + AI Automatic Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Department Performance Benchmark</h2>
              <p className="text-xs text-slate-600">Comparative pass rate & average marks across 5 schools</p>
            </div>
            <button
              onClick={() => onNavigate('dept-analytics')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              Full Analytics <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptComparison} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="dept" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    `${val}%`,
                    name === 'passRate' ? 'Pass Percentage' : 'Average Marks'
                  ]}
                  contentStyle={{ backgroundColor: '#0B1B33', borderColor: '#1e3a8a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="passRate" fill="#2563eb" name="Pass Percentage" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avgMarks" fill="#93c5fd" name="Average Marks" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>CSE and IT leading institutional performance at 89.6% and 88.4%</span>
            <span className="font-semibold text-slate-700">EEE / ECE targeted for academic enhancement</span>
          </div>
        </div>

        {/* AI Automatic Insights */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-slate-900 text-base">Automatic AI Insights</h2>
              </div>
              <span className="text-[11px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded">
                Real-time ML Engine
              </span>
            </div>

            <div className="space-y-3">
              {aiInsights.map((ins) => (
                <div key={ins.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-slate-900 text-xs">{ins.title}</h3>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      ins.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {ins.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-mono mt-1">{ins.metric}</p>
                  <p className="text-[11px] text-blue-900 font-medium mt-1 bg-white p-1.5 rounded border border-slate-200/80">
                    &rarr; {ins.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('staff-recommendations')}
            className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors text-center cursor-pointer"
          >
            Review Institutional Action Items
          </button>
        </div>
      </div>

      {/* Quick Priority Intervention Table (Top 5 At-Risk) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-slate-900 text-base">Students Requiring Immediate Academic Intervention</h2>
            <p className="text-xs text-slate-600">Highest predicted failure probability based on continuous assessment logs</p>
          </div>
          <button
            onClick={() => onNavigate('at-risk')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            View All 86 Students <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Roll Number</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Department</th>
                <th className="p-3 text-center">Attendance</th>
                <th className="p-3 text-center">Internal Avg</th>
                <th className="p-3 text-center">Pred. Grade</th>
                <th className="p-3">Risk Level</th>
                <th className="p-3 text-right">Action Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {atRiskStudentsList.slice(0, 5).map((student) => (
                <tr key={student.roll} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-blue-700 cursor-pointer"
                      onClick={() => onSelectStudent && onSelectStudent(student.roll)}>
                    {student.roll}
                  </td>
                  <td className="p-3 font-medium text-slate-900">{student.name}</td>
                  <td className="p-3 font-semibold text-slate-600">{student.dept}</td>
                  <td className="p-3 text-center font-bold text-red-600">{student.attendance}%</td>
                  <td className="p-3 text-center font-bold text-slate-800">{student.internal_avg}</td>
                  <td className="p-3 text-center">
                    <span className="font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                      {student.predicted_grade}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-100 text-red-800">
                      {student.risk}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onSelectStudent && onSelectStudent(student.roll)}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold rounded text-[11px] cursor-pointer"
                    >
                      Inspect Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
