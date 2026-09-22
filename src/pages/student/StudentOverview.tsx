import React from 'react';
import {
  currentStudent,
  studentCourses,
  todaySessions,
  upcomingSessions
} from '../../data/mockDatabase';
import {
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  BookOpen,
  UserCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { UserAccount } from '../../types';

interface StudentOverviewProps {
  user: UserAccount;
  onNavigate: (viewId: string) => void;
  onOpenCourseModal: (courseCode: string) => void;
}

export const StudentOverview: React.FC<StudentOverviewProps> = ({
  user,
  onNavigate,
  onOpenCourseModal
}) => {
  return (
    <div className="space-y-6">
      {/* Student Welcome & Profile Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-blue-50/60 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md shrink-0 ring-4 ring-blue-50"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-navy-900 text-white font-extrabold text-xl flex items-center justify-center shadow-md shrink-0 ring-4 ring-blue-50">
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Student
                </span>
                <span className="text-xs text-slate-500">Academic Year 2026–27</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
                Good morning, {user.name.split(' ')[0]}.
              </h1>
              <p className="text-sm text-slate-600 mt-0.5">
                Here is your institutional examination intelligence and continuous performance analytics.
              </p>
            </div>
          </div>

          {/* Quick Profile Metadata Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
            <div>
              <p className="text-slate-500 font-medium">Roll Number</p>
              <p className="font-mono font-bold text-slate-900">{user.rollNumber || '23IT034'}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Department</p>
              <p className="font-bold text-slate-900 truncate">{user.department}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Semester</p>
              <p className="font-bold text-slate-900">{user.semester || 'Semester VI'}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Batch</p>
              <p className="font-bold text-slate-900">{user.batch || '2023–2027'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* KPI 1: Overall Attendance */}
        <div
          onClick={() => onNavigate('attendance')}
          className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Attendance</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{user.overall_attendance || 86.4}%</span>
            <span className="text-xs font-bold text-emerald-600 inline-flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +4.2%
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">vs previous semester (82.2%)</p>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${user.overall_attendance || 86.4}%` }} />
          </div>
        </div>

        {/* KPI 2: Current CGPA */}
        <div
          onClick={() => onNavigate('performance')}
          className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Current CGPA</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{user.cgpa || 8.1}</span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              Scale 10.0
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">Consistent upward trajectory</p>
          <div className="mt-3 flex items-center gap-1">
            <span className="text-[11px] font-semibold text-slate-700">Top 15%</span>
            <span className="text-[11px] text-slate-500">in IT department</span>
          </div>
        </div>

        {/* KPI 3: Internal Average */}
        <div
          onClick={() => onNavigate('performance')}
          className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Internal Average</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{user.internal_average || 78.5}%</span>
            <span className="text-xs font-bold text-blue-600">+3.1%</span>
          </div>
          <p className="text-xs text-slate-600 mt-1">vs cohort average (75.4%)</p>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${user.internal_average || 78.5}%` }} />
          </div>
        </div>

        {/* KPI 4: Predicted Grade */}
        <div
          onClick={() => onNavigate('prediction')}
          className="bg-navy-900 text-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-blue-200 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Predicted Grade</span>
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{user.predicted_grade || 'A'}</span>
            <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-1.5 py-0.5 rounded">
              87% Conf.
            </span>
          </div>
          <p className="text-xs text-blue-200 mt-1">Estimated Score: 78–84</p>
          <div className="mt-3 flex items-center text-[11px] font-semibold text-blue-300 group-hover:text-white transition-colors">
            <span>Run Prediction & What-If</span>
            <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* KPI 5: Academic Risk Level */}
        <div
          onClick={() => onNavigate('risk')}
          className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Risk Level</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600">{user.risk_level || 'LOW'}</span>
            <span className="text-xs font-bold text-slate-700">{user.risk_score || 24} / 100</span>
          </div>
          <p className="text-xs text-slate-600 mt-1">1 flagged subject (COA: 68%)</p>
          <div className="mt-3 flex items-center text-[11px] font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
            <span>View Risk Diagnostics</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </div>
        </div>
      </div>

      {/* Red Critical Warning Banner (NO ORANGE) */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-red-900">
              Attendance Alert: CS303 Computer Organization & Architecture
            </h2>
            <p className="text-xs text-red-800">
              Current attendance is <strong>68.0%</strong> (below mandatory 75% threshold). Attend the next 8 consecutive sessions to remain eligible for university exams.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('attendance')}
          className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          View Attendance Plan
        </button>
      </div>

      {/* Main Grid: Today's Sessions + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-base">Today's Academic Sessions</h2>
              <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                4 Scheduled
              </span>
            </div>
            <button
              onClick={() => onNavigate('today-sessions')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              Full Timetable <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {todaySessions.map((session) => {
              const statusStyles = {
                Completed: 'bg-slate-100 text-slate-600 border-slate-200',
                Ongoing: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold',
                Upcoming: 'bg-blue-50 text-blue-700 border-blue-200'
              }[session.status];

              return (
                <div
                  key={session.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-colors gap-3"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-24 text-xs font-mono font-semibold text-slate-700 bg-slate-100 py-1.5 px-2 rounded-lg text-center shrink-0">
                      {session.time}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700">{session.course_code}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <h3 className="text-sm font-bold text-slate-900">{session.subject}</h3>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {session.faculty} • <span className="font-semibold text-slate-700">{session.venue}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${statusStyles}`}>
                      {session.status === 'Ongoing' && (
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-ping" />
                      )}
                      {session.status}
                    </span>
                    <button
                      onClick={() => onOpenCourseModal(session.course_code)}
                      className="text-xs text-slate-600 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                      title="Course details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-slate-900 text-base">Upcoming Sessions</h2>
              </div>
              <span className="text-xs text-slate-500">Next 48h</span>
            </div>

            <div className="space-y-3">
              {upcomingSessions.slice(0, 4).map((up) => (
                <div key={up.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 text-xs">
                  <div className="flex items-center justify-between text-slate-600 font-medium mb-1">
                    <span className="font-semibold text-blue-700">{up.date}</span>
                    <span>{up.time}</span>
                  </div>
                  <p className="font-bold text-slate-900">{up.subject}</p>
                  <p className="text-slate-600 text-[11px] mt-0.5">{up.faculty} • {up.venue}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('today-sessions')}
            className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            View Full Timetable <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Courses Snapshot Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-slate-900 text-base">Current Semester Courses (Semester VI)</h2>
            <p className="text-xs text-slate-600">6 Enrolled Courses • Examination & Continuous Assessment Status</p>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            View All Courses <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studentCourses.map((c) => {
            const isWarning = c.attendance < 75;
            return (
              <div
                key={c.code}
                className={`p-4 rounded-xl border transition-all ${
                  isWarning
                    ? 'border-red-300 bg-red-50/30 hover:border-red-400'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {c.code}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-1 line-clamp-1">{c.name}</h3>
                    <p className="text-xs text-slate-600">{c.faculty}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-semibold text-slate-500 block">Pred. Grade</span>
                    <span className="text-lg font-black text-blue-700">{c.predicted_grade}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <p className="text-[11px] text-slate-500">Attendance</p>
                    <p className={`font-bold ${isWarning ? 'text-red-600 font-extrabold' : 'text-slate-800'}`}>
                      {c.attendance}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500">Internal</p>
                    <p className="font-bold text-slate-800">{c.internal_avg} / 100</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500">Assignments</p>
                    <p className="font-bold text-slate-800">{c.completed_assignments}/{c.total_assignments}</p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenCourseModal(c.code)}
                  className="mt-3 w-full py-1.5 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" /> View Course Details
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
