import React, { useState } from 'react';
import { atRiskStudentsList } from '../../data/mockDatabase';
import {
  AlertTriangle,
  Filter,
  Search,
  Calendar,
  CheckCircle2,
  UserCheck,
  Download,
  X,
  Send
} from 'lucide-react';

interface StaffAtRiskStudentsProps {
  onSelectStudent?: (roll: string) => void;
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

export const StaffAtRiskStudents: React.FC<StaffAtRiskStudentsProps> = ({
  onSelectStudent,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');

  // Mentoring Modal state
  const [mentoringModalStudent, setMentoringModalStudent] = useState<any>(null);
  const [mentoringDate, setMentoringDate] = useState('2026-09-25');
  const [mentoringNotes, setMentoringNotes] = useState('Review attendance deficit and internal test performance.');

  const filtered = atRiskStudentsList.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDept === 'ALL' || s.dept === selectedDept;
    const matchRisk = selectedRisk === 'ALL' || s.risk === selectedRisk;
    return matchSearch && matchDept && matchRisk;
  });

  const handleConfirmSchedule = () => {
    if (!mentoringModalStudent) return;
    if (onShowToast) {
      onShowToast(
        `Mentoring session scheduled for ${mentoringModalStudent.name} (${mentoringModalStudent.roll}) on ${mentoringDate}.`,
        'success'
      );
    }
    setMentoringModalStudent(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" /> Academic Early Warning System
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Students Requiring Intervention
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Cohort monitoring based on multi-factor failure probability (Attendance &lt; 75%, Internal &lt; 65%, or Predicted Grade D/F).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-200">
            86 At-Risk in Database
          </span>
          <button
            onClick={() => onShowToast && onShowToast('Exporting At-Risk Registry to CSV...', 'info')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export Registry
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student or roll..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-xs w-56 focus:ring-2 focus:ring-blue-500 outline-hidden"
            />
          </div>

          <div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 font-medium"
            >
              <option value="ALL">All Departments</option>
              <option value="IT">Information Technology</option>
              <option value="CSE">Computer Science</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">Mechanical</option>
            </select>
          </div>

          <div>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 font-medium"
            >
              <option value="ALL">All Risk Categories</option>
              <option value="HIGH">High Risk</option>
              <option value="MODERATE">Moderate Risk</option>
            </select>
          </div>
        </div>

        <span className="text-slate-600 text-xs font-semibold">
          Showing {filtered.length} priority candidates
        </span>
      </div>

      {/* At Risk Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Roll Number</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Dept</th>
                <th className="p-3.5 text-center">Batch / Sem</th>
                <th className="p-3.5 text-center">Attendance %</th>
                <th className="p-3.5 text-center">Internal Avg</th>
                <th className="p-3.5 text-center">Predicted Grade</th>
                <th className="p-3.5 text-center">Risk Level</th>
                <th className="p-3.5">Recommended Action</th>
                <th className="p-3.5 text-right">Intervention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => {
                const isHigh = s.risk === 'HIGH';
                return (
                  <tr
                    key={s.roll}
                    className={`transition-colors ${
                      s.roll === '23IT034' ? 'bg-blue-50/50 hover:bg-blue-50/80' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td
                      className="p-3.5 font-mono font-bold text-blue-700 cursor-pointer hover:underline"
                      onClick={() => onSelectStudent && onSelectStudent(s.roll)}
                    >
                      {s.roll}
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">{s.name}</td>
                    <td className="p-3.5 font-semibold text-slate-600">{s.dept}</td>
                    <td className="p-3.5 text-center text-slate-600">{s.batch} &bull; {s.sem}</td>
                    <td className="p-3.5 text-center">
                      <span className={`font-black ${s.attendance < 75 ? 'text-[#DC2626]' : 'text-slate-800'}`}>
                        {s.attendance}%
                      </span>
                    </td>
                    <td className="p-3.5 text-center font-mono font-bold text-slate-800">
                      {s.internal_avg}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded font-black text-xs ${
                        s.predicted_grade === 'F' || s.predicted_grade === 'D'
                          ? 'bg-[#FEF2F2] text-[#DC2626] border border-red-200'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        Grade {s.predicted_grade}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isHigh ? 'bg-[#FEF2F2] text-[#DC2626] border border-red-200' : 'bg-red-50 text-red-700'
                      }`}>
                        {s.risk}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">
                      {s.action}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setMentoringModalStudent(s)}
                        className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs transition-colors shadow-2xs"
                      >
                        Schedule Mentoring
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Mentoring Modal */}
      {mentoringModalStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">
                  Mandatory Intervention Protocol
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Schedule Mentoring Session: {mentoringModalStudent.name}
                </h3>
                <p className="text-xs text-slate-600 font-mono">
                  {mentoringModalStudent.roll} &bull; Dept: {mentoringModalStudent.dept}
                </p>
              </div>
              <button
                onClick={() => setMentoringModalStudent(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Session Date</label>
                <input
                  type="date"
                  value={mentoringDate}
                  onChange={(e) => setMentoringDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Faculty Advisor</label>
                <input
                  type="text"
                  readOnly
                  value="Dr. K. S. Ramanathan (Class Advisor / Academic Council)"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Action Notes / Directive</label>
                <textarea
                  rows={3}
                  value={mentoringNotes}
                  onChange={(e) => setMentoringNotes(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setMentoringModalStudent(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSchedule}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Confirm & Notify Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
