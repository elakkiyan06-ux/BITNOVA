import React, { useState } from 'react';
import {
  currentStudent,
  studentCourses,
  studentRecommendations,
  atRiskStudentsList
} from '../../data/mockDatabase';
import {
  Search,
  User,
  GraduationCap,
  Award,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calendar,
  Sparkles,
  Mail,
  Building2,
  ShieldCheck,
  Send
} from 'lucide-react';

interface StaffStudentSearchProps {
  initialRoll?: string;
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

export const StaffStudentSearch: React.FC<StaffStudentSearchProps> = ({
  initialRoll = '23IT034',
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState(initialRoll);
  const [activeStudent, setActiveStudent] = useState<any>(currentStudent);
  const [interventionNote, setInterventionNote] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    if (query === '23IT034' || query.includes('RAHUL')) {
      setActiveStudent(currentStudent);
      if (onShowToast) onShowToast('Loaded academic record for Rahul Kumar (23IT034)', 'info');
    } else {
      // Find from at-risk list or fallback
      const found = atRiskStudentsList.find(s => s.roll.toUpperCase() === query || s.name.toUpperCase().includes(query));
      if (found) {
        setActiveStudent({
          student_id: found.roll,
          student_name: found.name,
          email: `${found.name.toLowerCase().replace(' ', '.')}@university.edu`,
          department: found.dept === 'IT' ? 'Information Technology' : found.dept,
          batch: '2023–2027',
          semester: found.sem,
          academic_year: '2026–27',
          cgpa: 7.2,
          overall_attendance: found.attendance,
          internal_average: found.internal_avg,
          predicted_grade: found.predicted_grade,
          risk_level: found.risk,
          risk_score: found.risk === 'HIGH' ? 78 : 46,
          mentor_name: 'Dr. K. S. Ramanathan'
        });
        if (onShowToast) onShowToast(`Loaded record for ${found.name} (${found.roll})`, 'info');
      } else {
        if (onShowToast) onShowToast(`Student ID "${query}" not found. Showing default record 23IT034.`, 'info');
        setActiveStudent(currentStudent);
      }
    }
  };

  const handleLogIntervention = () => {
    if (!interventionNote.trim()) return;
    setIsLogged(true);
    if (onShowToast) onShowToast(`Intervention logged for ${activeStudent.student_name}: "${interventionNote.slice(0, 30)}..."`, 'success');
    setTimeout(() => {
      setInterventionNote('');
      setIsLogged(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header with Search Box */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
              <Search className="w-4 h-4" /> Comprehensive Institutional Dossier
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Individual Student Academic Search
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Lookup student performance history, continuous assessments, risk ratings, and intervention logs by Roll Number.
            </p>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Roll No (e.g. 23IT034)..."
                className="pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 w-56 sm:w-64 uppercase outline-hidden"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Search
            </button>
          </form>
        </div>

        {/* Quick Sample Roll Number Pills */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-600">Demo Records:</span>
          {['23IT034 (Rahul Kumar)', '23IT078 (Sneha Sundaram)', '23CS115 (Pooja Iyer)', '23EC021 (Divya Krishnan)'].map((badge) => {
            const roll = badge.split(' ')[0];
            return (
              <button
                key={roll}
                onClick={() => {
                  setSearchQuery(roll);
                  const found = atRiskStudentsList.find(s => s.roll === roll);
                  if (roll === '23IT034') setActiveStudent(currentStudent);
                  else if (found) {
                    setActiveStudent({
                      student_id: found.roll,
                      student_name: found.name,
                      email: `${found.name.toLowerCase().replace(' ', '.')}@university.edu`,
                      department: found.dept === 'IT' ? 'Information Technology' : found.dept,
                      batch: '2023–2027',
                      semester: found.sem,
                      academic_year: '2026–27',
                      cgpa: 6.8,
                      overall_attendance: found.attendance,
                      internal_average: found.internal_avg,
                      predicted_grade: found.predicted_grade,
                      risk_level: found.risk,
                      risk_score: 75,
                      mentor_name: 'Dr. K. S. Ramanathan'
                    });
                  }
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-mono border transition-colors ${
                  activeStudent.student_id === roll
                    ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {badge}
              </button>
            );
          })}
        </div>
      </div>

      {/* Student Dossier Overview Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-navy-900 to-blue-800 text-white font-black text-xl flex items-center justify-center shadow-md">
              {activeStudent.student_name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {activeStudent.student_id}
                </span>
                <span className="text-xs text-slate-600">{activeStudent.department}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">{activeStudent.student_name}</h2>
              <p className="text-xs text-slate-600 mt-0.5">
                {activeStudent.semester} &bull; Batch {activeStudent.batch} &bull; Mentor: {activeStudent.mentor_name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-600 block">AI Risk Level</span>
              <span className={`text-base font-black px-2.5 py-0.5 rounded-full ${
                activeStudent.risk_level === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {activeStudent.risk_level}
              </span>
            </div>
            <div className="text-right border-l border-slate-200 pl-4">
              <span className="text-[10px] uppercase font-bold text-slate-600 block">Predicted Grade</span>
              <span className="text-2xl font-black text-blue-700">
                {activeStudent.predicted_grade}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Core Metrics Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-600 block">Cumulative GPA</span>
            <span className="text-xl font-black text-slate-900 mt-1 block">{activeStudent.cgpa} / 10.0</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Good Academic Standing</span>
          </div>

          <div className={`p-3.5 rounded-xl border ${activeStudent.overall_attendance < 75 ? 'bg-[#FEF2F2] border-[#DC2626]/30' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-slate-600 block">Overall Attendance</span>
            <span className={`text-xl font-black mt-1 block ${activeStudent.overall_attendance < 75 ? 'text-[#DC2626]' : 'text-slate-900'}`}>
              {activeStudent.overall_attendance}%
            </span>
            <span className={`text-[11px] font-semibold ${activeStudent.overall_attendance < 75 ? 'text-[#DC2626]' : 'text-emerald-600'}`}>
              {activeStudent.overall_attendance < 75 ? 'Below 75% Cutoff (Alert)' : 'Exam Eligible'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-600 block">Internal Average</span>
            <span className="text-xl font-black text-slate-900 mt-1 block">{activeStudent.internal_average}%</span>
            <span className="text-[11px] text-blue-600 font-semibold">Continuous Marks</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-600 block">Risk Score Index</span>
            <span className="text-xl font-black text-slate-900 mt-1 block">{activeStudent.risk_score} / 100</span>
            <span className="text-[11px] text-slate-600">Model Vulnerability</span>
          </div>
        </div>
      </div>

      {/* Enrolled Courses & Continuous Marks Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Enrolled Coursework Assessment Breakdown</h3>
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Course Code</th>
                <th className="p-3">Course Title</th>
                <th className="p-3 text-center">Attendance %</th>
                <th className="p-3 text-center">Internal 1</th>
                <th className="p-3 text-center">Internal 2</th>
                <th className="p-3 text-center">Continuous Avg</th>
                <th className="p-3 text-center">Assignments</th>
                <th className="p-3 text-right">Predicted Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {studentCourses.map(course => (
                <tr key={course.code} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-800">{course.code}</td>
                  <td className="p-3 font-medium text-slate-900">{course.name}</td>
                  <td className="p-3 text-center">
                    <span className={`font-bold ${course.attendance < 75 ? 'text-[#DC2626]' : 'text-slate-800'}`}>
                      {course.attendance}%
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono">{course.internal_1}</td>
                  <td className="p-3 text-center font-mono">{course.internal_2}</td>
                  <td className="p-3 text-center font-bold font-mono">{course.internal_avg}%</td>
                  <td className="p-3 text-center">{course.completed_assignments}/{course.total_assignments}</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded font-black text-xs bg-blue-50 text-blue-700 border border-blue-200">
                      Grade {course.predicted_grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Staff Mentoring & Intervention Log Composer */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-2">Log Faculty Mentoring Action & Diagnostic Note</h3>
        <p className="text-xs text-slate-600 mb-3">
          Notes entered here are recorded into the student's institutional record and shared with the Department Examination Committee.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={interventionNote}
            onChange={(e) => setInterventionNote(e.target.value)}
            placeholder="e.g. Advised student to attend 8 remedial sessions in Computer Organization; scheduled check-in for next Tuesday."
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
          />
          <button
            onClick={handleLogIntervention}
            disabled={!interventionNote.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" /> Log Action
          </button>
        </div>
        {isLogged && (
          <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Intervention logged to Academic Council database.
          </p>
        )}
      </div>
    </div>
  );
};
