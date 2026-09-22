import React, { useState } from 'react';
import { subjectAnalyticsData } from '../../data/mockDatabase';
import {
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  Users
} from 'lucide-react';

interface StaffSubjectAnalyticsProps {
  onScheduleRemedial?: (subjectName: string) => void;
}

export const StaffSubjectAnalytics: React.FC<StaffSubjectAnalyticsProps> = ({
  onScheduleRemedial
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [sortBy, setSortBy] = useState<'pass_rate' | 'at_risk' | 'avg_marks'>('pass_rate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filtered = subjectAnalyticsData
    .filter(subj => {
      const matchSearch =
        subj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subj.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDept = selectedDept === 'ALL' || subj.department === selectedDept;
      const matchDiff = selectedDifficulty === 'ALL' || subj.difficulty === selectedDifficulty;
      return matchSearch && matchDept && matchDiff;
    })
    .sort((a, b) => {
      let valA = a.pass_rate;
      let valB = b.pass_rate;
      if (sortBy === 'at_risk') {
        valA = a.at_risk_students;
        valB = b.at_risk_students;
      } else if (sortBy === 'avg_marks') {
        valA = a.avg_marks;
        valB = b.avg_marks;
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" /> Curriculum & Subject Analytics
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Institutional Subject Performance & Rigor Index
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Identify bottleneck subjects, pass probability variations, and student attrition points across all departments.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#FEF2F2] text-[#DC2626] border border-red-200 px-3 py-1.5 rounded-lg text-xs font-semibold">
          <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
          <span>Computer Organization & Architecture Flagged (68.0% Pass Rate)</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2 text-slate-400" />
            <input
              type="text"
              placeholder="Search code or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-xs w-60 focus:ring-2 focus:ring-blue-500 outline-hidden"
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
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 font-medium"
            >
              <option value="ALL">All Difficulties</option>
              <option value="HIGH">High Difficulty</option>
              <option value="MEDIUM">Medium Difficulty</option>
              <option value="LOW">Low Difficulty</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-600">Sort By:</span>
          <button
            onClick={() => {
              if (sortBy === 'pass_rate') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              else { setSortBy('pass_rate'); setSortOrder('asc'); }
            }}
            className={`px-2.5 py-1 rounded-md border flex items-center gap-1 ${
              sortBy === 'pass_rate' ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold' : 'border-slate-200 text-slate-600'
            }`}
          >
            Pass Rate <ArrowUpDown className="w-3 h-3" />
          </button>
          <button
            onClick={() => {
              if (sortBy === 'at_risk') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              else { setSortBy('at_risk'); setSortOrder('desc'); }
            }}
            className={`px-2.5 py-1 rounded-md border flex items-center gap-1 ${
              sortBy === 'at_risk' ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold' : 'border-slate-200 text-slate-600'
            }`}
          >
            At-Risk Volume <ArrowUpDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Subject Analytics Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Course Code</th>
                <th className="p-3.5">Subject Title</th>
                <th className="p-3.5">Dept</th>
                <th className="p-3.5 text-center">Enrolled</th>
                <th className="p-3.5 text-center">Average Marks</th>
                <th className="p-3.5 text-center">Pass %</th>
                <th className="p-3.5 text-center">Attendance</th>
                <th className="p-3.5 text-center">Rigor / Difficulty</th>
                <th className="p-3.5 text-center">At-Risk Count</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((subj) => {
                const isCritical = subj.code === 'CS303';
                const difficultyStyles = {
                  HIGH: 'bg-rose-50 text-rose-700 border-rose-200 font-black',
                  MEDIUM: 'bg-slate-100 text-slate-700 border-slate-200 font-semibold',
                  LOW: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold'
                }[subj.difficulty];

                return (
                  <tr
                    key={subj.code}
                    className={`transition-colors ${
                      isCritical
                        ? 'bg-[#FEF2F2]/60 hover:bg-[#FEF2F2] font-medium'
                        : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="p-3.5 font-mono font-bold text-slate-800 flex items-center gap-1.5">
                      {isCritical && <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />}
                      <span>{subj.code}</span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      {subj.name}
                      {isCritical && (
                        <span className="block text-[10px] text-[#DC2626] font-normal mt-0.5">
                          Critical Subject: Lowest pass percentage across IT department
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-600">{subj.department}</td>
                    <td className="p-3.5 text-center font-mono text-slate-800">{subj.students}</td>
                    <td className="p-3.5 text-center font-mono font-bold text-slate-800">{subj.avg_marks}</td>
                    <td className="p-3.5 text-center">
                      <span className={`font-black text-xs ${subj.pass_rate < 75 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {subj.pass_rate}%
                      </span>
                    </td>
                    <td className="p-3.5 text-center font-semibold text-slate-800">{subj.attendance}%</td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] ${difficultyStyles}`}>
                        {subj.difficulty}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <span className={`font-black px-2 py-0.5 rounded text-xs ${
                        subj.at_risk_students > 30 ? 'bg-rose-100 text-rose-800 font-bold' : 'text-slate-700'
                      }`}>
                        {subj.at_risk_students}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => onScheduleRemedial && onScheduleRemedial(subj.name)}
                        className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded text-[11px] transition-colors"
                      >
                        Remedial Plan
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
