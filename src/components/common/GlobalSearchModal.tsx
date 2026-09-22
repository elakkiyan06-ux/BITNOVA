import React, { useState } from 'react';
import {
  Search,
  X,
  BookOpen,
  User,
  Building2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { studentCourses, atRiskStudentsList, departmentMetrics } from '../../data/mockDatabase';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (code: string) => void;
  onSelectStudent: (roll: string) => void;
  onNavigate: (viewId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCourse,
  onSelectStudent,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedCourses = studentCourses.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.code.toLowerCase().includes(query.toLowerCase())
  );

  const matchedStudents = atRiskStudentsList.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.roll.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search student, roll number, course code (e.g. CS301, 23IT034)..."
            className="w-full text-sm text-slate-900 placeholder-slate-400 outline-hidden bg-transparent"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Courses */}
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-2">
              Courses & Subjects
            </span>
            <div className="space-y-1">
              {matchedCourses.slice(0, 3).map(c => (
                <div
                  key={c.code}
                  onClick={() => {
                    onSelectCourse(c.code);
                    onClose();
                  }}
                  className="p-2.5 rounded-lg hover:bg-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="font-mono font-bold text-slate-800">{c.code}</span>
                    <span className="text-slate-900 font-medium">{c.name}</span>
                  </div>
                  <span className="text-slate-400">View Details &rarr;</span>
                </div>
              ))}
            </div>
          </div>

          {/* Students */}
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-2">
              Students & Roll Registry
            </span>
            <div className="space-y-1">
              {matchedStudents.slice(0, 3).map(s => (
                <div
                  key={s.roll}
                  onClick={() => {
                    onSelectStudent(s.roll);
                    onClose();
                  }}
                  className="p-2.5 rounded-lg hover:bg-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    <span className="font-mono font-bold text-blue-700">{s.roll}</span>
                    <span className="text-slate-900 font-medium">{s.name}</span>
                    <span className="text-slate-400 font-semibold">({s.dept})</span>
                  </div>
                  <span className="text-rose-600 font-bold">{s.risk} Risk</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Page Jumps */}
          <div className="pt-2 border-t border-slate-100">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-2">
              Quick Shortcuts
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { onNavigate('prediction'); onClose(); }}
                className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold"
              >
                AI Grade Prediction
              </button>
              <button
                onClick={() => { onNavigate('attendance'); onClose(); }}
                className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold"
              >
                Attendance Analytics
              </button>
              <button
                onClick={() => { onNavigate('at-risk'); onClose(); }}
                className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold"
              >
                At-Risk Registry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
