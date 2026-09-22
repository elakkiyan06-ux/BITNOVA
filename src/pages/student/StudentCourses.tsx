import React, { useState } from 'react';
import { studentCourses } from '../../data/mockDatabase';
import {
  BookOpen,
  Award,
  CheckCircle2,
  AlertTriangle,
  FileText,
  User,
  ExternalLink,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';

interface StudentCoursesProps {
  onOpenCourseModal: (courseCode: string) => void;
}

export const StudentCourses: React.FC<StudentCoursesProps> = ({ onOpenCourseModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filteredCourses = studentCourses.filter(course => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.faculty.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'WARNING') return matchesSearch && course.attendance < 75;
    if (filterType === 'GRADE_A') return matchesSearch && course.predicted_grade === 'A';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" /> Academic Curriculum
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            My Courses & Continuous Assessments
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Semester VI • Information Technology • 21 Total Credits
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search course or faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 w-56"
            />
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium text-slate-600">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterType === 'ALL' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'
              }`}
            >
              All (6)
            </button>
            <button
              onClick={() => setFilterType('GRADE_A')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterType === 'GRADE_A' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'
              }`}
            >
              Grade A
            </button>
            <button
              onClick={() => setFilterType('WARNING')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterType === 'WARNING' ? 'bg-white text-red-700 shadow-xs font-bold' : 'hover:text-slate-900'
              }`}
            >
              Needs Attention
            </button>
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const isWarning = course.attendance < 75;
          const gradeColor = {
            A: 'text-emerald-700 bg-emerald-50 border-emerald-200',
            B: 'text-blue-700 bg-blue-50 border-blue-200',
            C: 'text-slate-700 bg-slate-100 border-slate-300',
            D: 'text-red-700 bg-red-50 border-red-200',
            F: 'text-red-800 bg-red-100 border-red-300'
          }[course.predicted_grade] || 'text-slate-700 bg-slate-50 border-slate-200';

          return (
            <div
              key={course.code}
              className={`bg-white rounded-xl border p-5 shadow-xs transition-all hover:shadow-md flex flex-col justify-between ${
                isWarning ? 'border-red-300 ring-1 ring-red-200/50' : 'border-slate-200 hover:border-blue-400'
              }`}
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                      {course.code}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                      {course.credits} Credits
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Pred.</span>
                    <span className={`text-xs font-black px-2 py-0.5 rounded-full border ${gradeColor}`}>
                      Grade {course.predicted_grade}
                    </span>
                  </div>
                </div>

                {/* Course Title & Faculty */}
                <div className="mt-3">
                  <h3 className="font-bold text-slate-900 text-base leading-snug hover:text-blue-600 cursor-pointer transition-colors"
                      onClick={() => onOpenCourseModal(course.code)}>
                    {course.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {course.faculty}
                  </p>
                </div>

                {/* KPI Metrics */}
                <div className="mt-5 grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block">Attendance</span>
                    <span className={`text-sm font-black ${isWarning ? 'text-red-600' : 'text-slate-900'}`}>
                      {course.attendance}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block">Internal</span>
                    <span className="text-sm font-black text-slate-900">
                      {course.internal_avg}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block">Assignments</span>
                    <span className="text-sm font-black text-slate-900">
                      {course.completed_assignments}/{course.total_assignments}
                    </span>
                  </div>
                </div>

                {/* Continuous Assessment Progress */}
                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span className="text-[11px] font-medium">Internal Marks 1 & 2</span>
                    <span className="font-mono font-semibold text-slate-700">{course.internal_1}/100 &bull; {course.internal_2}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${course.internal_avg >= 75 ? 'bg-blue-600' : 'bg-red-500'}`}
                      style={{ width: `${course.internal_avg}%` }}
                    />
                  </div>
                </div>

                {isWarning && (
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-red-800 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>Attendance below 75% examination requirement</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenCourseModal(course.code)}
                className="mt-5 w-full py-2 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                View Course Details
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 ml-auto" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
