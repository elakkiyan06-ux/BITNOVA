import React from 'react';
import { CourseDetail } from '../../types';
import {
  X,
  BookOpen,
  User,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  FileText
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface CourseDetailsModalProps {
  course: CourseDetail | null;
  onClose: () => void;
  onRunPrediction?: () => void;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  course,
  onClose,
  onRunPrediction
}) => {
  if (!course) return null;

  const isWarning = course.attendance < 75;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-navy-900 text-white p-6 flex items-start justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-md font-mono text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {course.code}
              </span>
              <span className="text-xs text-blue-200">
                {course.semester} &bull; {course.credits} Credits
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {course.name}
            </h2>
            <p className="text-xs text-blue-200 flex items-center gap-1.5 mt-1">
              <User className="w-3.5 h-3.5 text-blue-300" />
              Lead Faculty: <span className="font-semibold text-white">{course.faculty}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[calc(85vh-120px)] overflow-y-auto">
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Attendance */}
            <div className={`p-3.5 rounded-xl border ${isWarning ? 'bg-red-50/70 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[11px] font-semibold text-slate-600 block">Attendance</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className={`text-2xl font-black ${isWarning ? 'text-red-700' : 'text-slate-900'}`}>
                  {course.attendance}%
                </span>
                <span className="text-[11px] text-slate-500">({course.classes_attended}/{course.total_classes})</span>
              </div>
              {isWarning ? (
                <span className="text-[10px] font-bold text-red-700 flex items-center gap-0.5 mt-1">
                  <AlertTriangle className="w-3 h-3" /> Below 75%
                </span>
              ) : (
                <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5 mt-1">
                  <CheckCircle2 className="w-3 h-3" /> Eligible
                </span>
              )}
            </div>

            {/* Internal Average */}
            <div className="p-3.5 rounded-xl border bg-slate-50 border-slate-200">
              <span className="text-[11px] font-semibold text-slate-600 block">Internal Average</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-slate-900">{course.internal_avg}</span>
                <span className="text-[11px] text-slate-500">/ 100</span>
              </div>
              <span className="text-[10px] font-semibold text-blue-700 mt-1 block">
                Continuous Score: {course.current_performance}%
              </span>
            </div>

            {/* Assignments */}
            <div className="p-3.5 rounded-xl border bg-slate-50 border-slate-200">
              <span className="text-[11px] font-semibold text-slate-600 block">Assignment Rate</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-slate-900">{course.assignment_completion}%</span>
                <span className="text-[11px] text-slate-500">({course.completed_assignments}/{course.total_assignments})</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-600 mt-1 block">
                1 Pending Task
              </span>
            </div>

            {/* Predicted Grade */}
            <div className="p-3.5 rounded-xl border bg-navy-900 text-white border-blue-900">
              <span className="text-[11px] font-semibold text-blue-200 block">Predicted Grade</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-black text-white">{course.predicted_grade}</span>
                <span className="text-[11px] text-emerald-300 font-semibold bg-emerald-950/60 px-1 rounded">
                  87% Conf.
                </span>
              </div>
              <span className="text-[10px] text-blue-200 mt-1 block">
                End-Semester Forecast
              </span>
            </div>
          </div>

          {/* Continuous Internal Assessment Breakdown */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Continuous Internal Assessment Breakdown
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <p className="text-[11px] text-slate-500 font-medium">Internal 1</p>
                <p className="text-base font-black text-slate-900 mt-0.5">{course.internal_1}/100</p>
                <span className="text-[10px] text-slate-500">Weight: 20%</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <p className="text-[11px] text-slate-500 font-medium">Internal 2</p>
                <p className="text-base font-black text-slate-900 mt-0.5">{course.internal_2}/100</p>
                <span className="text-[10px] text-slate-500">Weight: 20%</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <p className="text-[11px] text-slate-500 font-medium">Assignments</p>
                <p className="text-base font-black text-slate-900 mt-0.5">18.5/20</p>
                <span className="text-[10px] text-slate-500">Weight: 10%</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <p className="text-[11px] text-slate-500 font-medium">Surprise Quiz</p>
                <p className="text-base font-black text-slate-900 mt-0.5">9/10</p>
                <span className="text-[10px] text-slate-500">Weight: 5%</span>
              </div>
              <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-200 sm:col-span-1 col-span-2">
                <p className="text-[11px] text-blue-700 font-bold">Continuous Total</p>
                <p className="text-base font-black text-blue-900 mt-0.5">{course.internal_avg}%</p>
                <span className="text-[10px] text-blue-600 font-semibold">Scale 100</span>
              </div>
            </div>
          </div>

          {/* Performance Trend Chart */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Assessment Trajectory & Model Exam Forecast
              </h3>
              <span className="text-xs text-slate-500">Timeline Score</span>
            </div>
            <div className="h-44 w-full bg-slate-50 p-3 rounded-xl border border-slate-200">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={course.performance_trend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0B1B33', borderColor: '#1e3a8a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={{ fill: '#1d4ed8', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Assignment Tracker Table */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Coursework & Assignment Log
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Assignment Title</th>
                    <th className="p-3">Due Date</th>
                    <th className="p-3">Submission Status</th>
                    <th className="p-3 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {course.assignments.map((asgn) => (
                    <tr key={asgn.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3 font-medium text-slate-900 flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        {asgn.name}
                      </td>
                      <td className="p-3 text-slate-500 font-mono">{asgn.due_date}</td>
                      <td className="p-3">
                        {asgn.status === 'Completed' ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Submitted
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-semibold text-[11px] inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Pending Review
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-slate-800">
                        {asgn.marks || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Syllabus Code: REG2023-UG-IT-{course.code}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            {onRunPrediction && (
              <button
                onClick={() => {
                  onClose();
                  onRunPrediction();
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-200" /> Run AI Grade Prediction
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
