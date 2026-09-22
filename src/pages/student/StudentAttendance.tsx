import React, { useState } from 'react';
import { currentStudent, studentCourses } from '../../data/mockDatabase';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Calculator,
  TrendingUp,
  Award,
  ChevronDown
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

export const StudentAttendance: React.FC = () => {
  const [targetSubject, setTargetSubject] = useState('CS303');
  const [additionalClasses, setAdditionalClasses] = useState(8);

  // Selected subject calculation
  const selectedCourse = studentCourses.find(c => c.code === targetSubject) || studentCourses[2];
  const simulatedAttended = selectedCourse.classes_attended + additionalClasses;
  const simulatedTotal = selectedCourse.total_classes + additionalClasses;
  const simulatedPercentage = Math.min(100, Number(((simulatedAttended / simulatedTotal) * 100).toFixed(1)));

  // SVG circular progress calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentStudent.overall_attendance / 100) * circumference;

  const chartData = studentCourses.map(c => ({
    code: c.code,
    name: c.name.split(' ')[0] + ' ' + (c.name.split(' ')[1] || ''),
    attendance: c.attendance,
    isWarning: c.attendance < 75
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-4 h-4" /> Academic Regulation Compliance
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Attendance Analytics & Threshold Monitoring
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Institutional minimum mandatory attendance requirement is <strong className="text-slate-900">75.0%</strong> per course.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="font-semibold text-slate-700">University Examination Eligible</span>
        </div>
      </div>

      {/* Main Stats: Circular Overall Gauge + Warning Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Circular Progress */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4">
            Cumulative Attendance
          </span>

          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-slate-100"
                strokeWidth="14"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Threshold mark at 75% in RED */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-red-300"
                strokeWidth="14"
                strokeDasharray={`${circumference * 0.01} ${circumference}`}
                strokeDashoffset={circumference - 0.75 * circumference}
                stroke="currentColor"
                fill="transparent"
              />
              {/* Value circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-emerald-500 transition-all duration-1000 ease-out"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-900 tracking-tight">
                {currentStudent.overall_attendance}%
              </span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="w-3 h-3" /> Safe Standing
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 w-full flex justify-around text-center text-xs">
            <div>
              <p className="text-slate-600">Classes Held</p>
              <p className="font-bold text-slate-900 text-sm">300</p>
            </div>
            <div>
              <p className="text-slate-600">Attended</p>
              <p className="font-bold text-emerald-600 text-sm">259</p>
            </div>
            <div>
              <p className="text-slate-600">Absent</p>
              <p className="font-bold text-slate-700 text-sm">41</p>
            </div>
          </div>
        </div>

        {/* Highlighted Insight & Regulations (Red alert) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-red-50 text-red-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900">
                Critical Attendance Alert & Academic Advisory
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 mb-4">
              <p className="text-sm font-bold text-red-900">
                Computer Organization & Architecture attendance is below the recommended 75.0% threshold.
              </p>
              <p className="text-xs text-red-800 mt-1 leading-relaxed">
                You have attended <strong>34 of 50 classes (68.0%)</strong> in CS303. Under university examination code Section 4.2, students with attendance between 65% and 74.9% must submit a medical dispensation or attend designated remedial lecture hours prior to admit card dispatch.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Standard Eligibility (&ge; 75%)
                </p>
                <p className="text-slate-600 mt-1">
                  Unconditional entry to end-semester theoretical & laboratory examinations.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-blue-600" /> Condonation Zone (65% - 74.9%)
                </p>
                <p className="text-slate-600 mt-1">
                  Requires Departmental Academic Council review and documented remedial hours.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Last biometric sync: Today, 09:30 AM</span>
            <span className="font-semibold text-blue-600">Faculty In-Charge: Prof. Vikram Seth</span>
          </div>
        </div>
      </div>

      {/* Subject-wise Attendance Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Subject-wise Attendance Distribution</h2>
            <p className="text-xs text-slate-600">Real-time contact hours attended per enrolled course</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span> &ge; 75% Safe
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <span className="w-3 h-3 rounded bg-red-600 inline-block"></span> &lt; 75% At-Risk
            </span>
          </div>
        </div>

        {/* Visual Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="code" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} unit="%" />
              <Tooltip
                formatter={(value: any) => [`${value}%`, 'Attendance']}
                labelFormatter={(label) => `Course Code: ${label}`}
                contentStyle={{ backgroundColor: '#0B1B33', borderColor: '#1e3a8a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
              />
              <ReferenceLine y={75} stroke="#dc2626" strokeDasharray="4 4" label={{ value: '75% Threshold', fill: '#dc2626', fontSize: 11, position: 'insideTopRight' }} />
              <Bar
                dataKey="attendance"
                radius={[6, 6, 0, 0]}
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Table */}
        <div className="mt-6 overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Course Code</th>
                <th className="p-3">Subject Name</th>
                <th className="p-3">Faculty</th>
                <th className="p-3 text-center">Classes Attended</th>
                <th className="p-3 text-center">Percentage</th>
                <th className="p-3">Eligibility Status</th>
                <th className="p-3 text-right">Action Needed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {studentCourses.map((course) => {
                const isWarning = course.attendance < 75;
                return (
                  <tr
                    key={course.code}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      isWarning ? 'bg-red-50/40' : ''
                    }`}
                  >
                    <td className="p-3 font-mono font-bold text-slate-700">{course.code}</td>
                    <td className="p-3 font-medium text-slate-900">{course.name}</td>
                    <td className="p-3 text-slate-600">{course.faculty}</td>
                    <td className="p-3 text-center font-mono">
                      <span className="font-bold text-slate-800">{course.classes_attended}</span>
                      <span className="text-slate-400"> / {course.total_classes}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`font-black text-sm ${
                          isWarning ? 'text-red-600' : 'text-emerald-600'
                        }`}
                      >
                        {course.attendance}%
                      </span>
                    </td>
                    <td className="p-3">
                      {isWarning ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-semibold text-[11px]">
                          <AlertTriangle className="w-3 h-3" /> Warning (&lt; 75%)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3 h-3" /> Regular
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      {isWarning ? (
                        <span className="text-red-700 font-bold">Attend next 8 classes</span>
                      ) : (
                        <span className="text-slate-600">On Track</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Recovery Simulator Card — RESOLVED SELECT BOX & ORANGE REMOVAL */}
      <div className="bg-[#0B1B33] text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/30">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Attendance Recovery Simulator</h2>
            <p className="text-xs text-blue-200">
              Calculate projected attendance by testing how many future classes you attend
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* RESOLVED: Clean, High-Contrast Select Box */}
          <div>
            <label htmlFor="recovery-course-select" className="text-xs font-bold text-blue-200 block mb-1.5">
              Select Course
            </label>
            <div className="relative">
              <select
                id="recovery-course-select"
                value={targetSubject}
                onChange={(e) => setTargetSubject(e.target.value)}
                className="w-full appearance-none bg-white text-slate-900 border border-slate-300 rounded-xl px-3.5 py-2.5 pr-10 text-xs font-bold shadow-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer outline-hidden"
              >
                {studentCourses.map(c => (
                  <option key={c.code} value={c.code} className="bg-white text-slate-900 font-semibold py-1">
                    {c.code} — {c.name} ({c.attendance}%)
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-600 absolute right-3.5 top-3 pointer-events-none" />
            </div>
            <span className="text-[10px] text-blue-300 block mt-1">
              Currently inspecting: <strong className="text-white">{selectedCourse.code}</strong>
            </span>
          </div>

          {/* Slider with Blue Accent (NO ORANGE) */}
          <div>
            <div className="flex justify-between text-xs text-blue-200 mb-1.5 font-medium">
              <span>Consecutive Classes to Attend</span>
              <span className="font-bold text-white bg-blue-600 px-2 py-0.5 rounded">
                +{additionalClasses} classes
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={additionalClasses}
              onChange={(e) => setAdditionalClasses(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-blue-300 mt-1 font-mono">
              <span>0 classes</span>
              <span>10 classes</span>
              <span>20 classes</span>
            </div>
          </div>

          {/* Simulation Output with Red Warning (NO ORANGE) */}
          <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-200 font-medium">Projected Attendance</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-black text-white">{simulatedPercentage}%</span>
                <span className="text-xs text-blue-300">
                  ({simulatedAttended}/{simulatedTotal})
                </span>
              </div>
            </div>
            <div className="text-right">
              {simulatedPercentage >= 75 ? (
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold text-xs inline-block">
                  Eligible (&ge; 75%)
                </span>
              ) : (
                <span className="px-3 py-1.5 rounded-full bg-red-500/20 border border-red-400 text-red-200 font-bold text-xs inline-block">
                  Still Needs {Math.max(1, Math.ceil((0.75 * simulatedTotal - simulatedAttended) / 0.25))} More
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
