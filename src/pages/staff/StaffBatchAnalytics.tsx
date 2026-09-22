import React from 'react';
import { batchMetrics } from '../../data/mockDatabase';
import {
  Calendar,
  TrendingUp,
  Award,
  Users,
  CheckCircle2
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const StaffBatchAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" /> Multi-Year Longitudinal Progression
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Batch Analytics & Cohort Trends
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Compare graduating and current cohorts: Batch 2023 through Batch 2026
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>+8.3% Net Pass Rate Improvement across 4 Batches</span>
        </div>
      </div>

      {/* Primary Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pass Rate & Attendance Multi-Line */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Pass Rate & Attendance Trends</h2>
              <p className="text-xs text-slate-600">Year-over-year cohort comparison</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={batchMetrics} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="batch" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[75, 95]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <Tooltip
                  formatter={(val: any) => [`${val}%`]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="pass_rate" name="Pass Rate %" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="attendance" name="Attendance %" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Continuous & End-Semester Marks Trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Average Marks & Internal Performance</h2>
              <p className="text-xs text-slate-600">Formative continuous test trajectory</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={batchMetrics} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="batch" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[65, 80]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <Tooltip
                  formatter={(val: any) => [`${val}%`]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="avg_marks" name="Average Marks" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="internal_performance" name="Internal Performance" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cohort Comparison Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h2 className="font-bold text-slate-900 text-base mb-3">Batch Comparison Data Table</h2>
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Batch Year</th>
                <th className="p-3 text-center">Batch Strength</th>
                <th className="p-3 text-center">Average Marks</th>
                <th className="p-3 text-center">Pass Percentage</th>
                <th className="p-3 text-center">Average Attendance</th>
                <th className="p-3 text-center">Internal Performance</th>
                <th className="p-3 text-right">Trend Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {batchMetrics.map(bm => (
                <tr key={bm.batch} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-blue-700">Batch {bm.batch}</td>
                  <td className="p-3 text-center font-mono text-slate-800">{bm.students.toLocaleString()}</td>
                  <td className="p-3 text-center font-bold text-slate-900">{bm.avg_marks}%</td>
                  <td className="p-3 text-center font-black text-emerald-600">{bm.pass_rate}%</td>
                  <td className="p-3 text-center font-semibold text-slate-800">{bm.attendance}%</td>
                  <td className="p-3 text-center font-bold text-slate-800">{bm.internal_performance}%</td>
                  <td className="p-3 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                      <TrendingUp className="w-3 h-3" /> Positive Gain
                    </span>
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
