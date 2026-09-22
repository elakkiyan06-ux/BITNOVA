import React from 'react';
import { departmentMetrics } from '../../data/mockDatabase';
import {
  Building2,
  Users,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const StaffDepartmentAnalytics: React.FC = () => {
  const chartData = departmentMetrics.map(d => ({
    name: d.code,
    fullName: d.department,
    passRate: d.pass_rate,
    avgMarks: d.avg_marks,
    attendance: d.attendance,
    atRisk: d.at_risk_students
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" /> Cross-Departmental Benchmarking
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Department Performance Analytics
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Comparative academic results across Engineering & Technology Departments &bull; Academic Year 2026–27
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
          <span className="font-bold text-slate-800">5 Departments Evaluated</span>
          <span className="text-slate-400">&bull;</span>
          <span className="font-semibold text-slate-600">4,940 Total Cohort</span>
        </div>
      </div>

      {/* Comparative Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pass Rate & Average Marks Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Pass Percentage & Continuous Marks</h2>
              <p className="text-xs text-slate-600">Comparative outcomes across departments</p>
            </div>
            <span className="text-xs font-bold text-blue-600">Scale: 100%</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <Tooltip
                  formatter={(val: any) => [`${val}%`]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="passRate" fill="#2563eb" name="Pass Rate %" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avgMarks" fill="#38bdf8" name="Average Marks %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance vs At-Risk Count Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-slate-900 text-sm">At-Risk Count by Department</h2>
              <p className="text-xs text-slate-600">Students classified as high or moderate failure risk</p>
            </div>
            <span className="text-xs font-bold text-rose-600">Total: 408 At-Risk</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[0, 120]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  formatter={(val: any) => [`${val} Students`, 'At-Risk Volume']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="atRisk" fill="#e11d48" name="At-Risk Students" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Comprehensive Department Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h2 className="font-bold text-slate-900 text-base mb-3">Institutional Department Matrix</h2>
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Department Code</th>
                <th className="p-3">Department Name</th>
                <th className="p-3 text-center">Enrolled Students</th>
                <th className="p-3 text-center">Pass %</th>
                <th className="p-3 text-center">Average Marks</th>
                <th className="p-3 text-center">Avg Attendance</th>
                <th className="p-3 text-center">At-Risk Count</th>
                <th className="p-3 text-right">Academic Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departmentMetrics.map(dept => (
                <tr key={dept.code} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-blue-700">{dept.code}</td>
                  <td className="p-3 font-semibold text-slate-900">{dept.department}</td>
                  <td className="p-3 text-center font-mono">{dept.students.toLocaleString()}</td>
                  <td className="p-3 text-center font-bold text-emerald-600">{dept.pass_rate}%</td>
                  <td className="p-3 text-center font-mono font-bold text-slate-800">{dept.avg_marks}</td>
                  <td className="p-3 text-center font-bold text-slate-800">{dept.attendance}%</td>
                  <td className="p-3 text-center font-bold text-rose-600">{dept.at_risk_students}</td>
                  <td className="p-3 text-right">
                    <span className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
                      View Roll Sheet
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
