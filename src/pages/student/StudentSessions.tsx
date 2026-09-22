import React, { useState } from 'react';
import { todaySessions, upcomingSessions } from '../../data/mockDatabase';
import {
  Clock,
  Calendar,
  MapPin,
  User,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface StudentSessionsProps {
  onOpenCourseModal: (courseCode: string) => void;
}

export const StudentSessions: React.FC<StudentSessionsProps> = ({ onOpenCourseModal }) => {
  const [showFullTimetable, setShowFullTimetable] = useState(false);

  // Weekly Timetable Matrix
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['09:00 – 10:00', '10:15 – 11:15', '11:30 – 12:30', '14:00 – 16:00'];

  const weeklySchedule: Record<string, string[]> = {
    Monday: ['CS301 (DSA)', 'CS302 (DBMS)', 'CS303 (COA)', 'CS301 (DSA Lab)'],
    Tuesday: ['CS301 (DSA)', 'CS302 (DBMS)', 'CS305 (CN)', 'CS304 (OS Lab)'],
    Wednesday: ['CS303 (COA)', 'CS306 (WebTech)', 'CS301 (Tutorial)', 'Library / Remedial'],
    Thursday: ['CS304 (OS)', 'CS305 (CN)', 'CS306 (WebTech)', 'CS302 (DBMS Lab)'],
    Friday: ['CS303 (COA)', 'CS304 (OS)', 'CS305 (CN)', 'Project Review']
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" /> Academic Timetable & Contact Hours
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Class Schedule & Academic Sessions
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Semester VI &bull; Room LC-204 / Department Labs &bull; Academic Year 2026–27
          </p>
        </div>

        <button
          onClick={() => setShowFullTimetable(!showFullTimetable)}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          {showFullTimetable ? 'Hide Weekly Timetable' : 'View Full Weekly Timetable'}
        </button>
      </div>

      {/* Full Weekly Timetable Matrix */}
      {showFullTimetable && (
        <div className="bg-white rounded-xl border border-blue-300 p-5 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900 text-base">Semester VI Master Timetable Schedule</h2>
            <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded">
              Active Term
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-3 border border-slate-200 text-left font-bold">Day / Period</th>
                  {timeSlots.map((slot, idx) => (
                    <th key={idx} className="p-3 border border-slate-200 font-bold">
                      {slot}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 border border-slate-200 text-left font-bold text-slate-900 bg-slate-50/50">
                      {day}
                    </td>
                    {weeklySchedule[day].map((course, idx) => (
                      <td
                        key={idx}
                        className={`p-3 border border-slate-200 font-semibold ${
                          course.includes('COA') ? 'bg-red-50 text-red-900 border-red-200' : 'text-slate-800'
                        }`}
                      >
                        {course}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Today's Classes */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-900 text-base">Today's Academic Sessions</h2>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
            Tuesday, 22 Sep 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todaySessions.map((session) => {
            const statusConfig = {
              Completed: { badge: 'bg-slate-100 text-slate-600 border-slate-200', border: 'border-slate-200' },
              Ongoing: { badge: 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold', border: 'border-emerald-300 ring-1 ring-emerald-200' },
              Upcoming: { badge: 'bg-blue-50 text-blue-700 border-blue-200', border: 'border-slate-200' }
            }[session.status];

            return (
              <div
                key={session.id}
                className={`p-4 rounded-xl border ${statusConfig.border} bg-white shadow-xs flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                      {session.time}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border ${statusConfig.badge}`}>
                      {session.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mt-3">{session.subject}</h3>
                  <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" /> {session.faculty}
                  </p>
                  <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> Venue: <span className="font-semibold text-slate-700">{session.venue}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-700">{session.course_code}</span>
                  <button
                    onClick={() => onOpenCourseModal(session.course_code)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    Course Details <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Sessions (Next 5) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h2 className="font-bold text-slate-900 text-base">Upcoming Academic Sessions (Next 5)</h2>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Course Code</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Faculty</th>
                <th className="p-3">Venue</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {upcomingSessions.map((session) => (
                <tr key={session.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 font-semibold text-blue-700 whitespace-nowrap">{session.date}</td>
                  <td className="p-3 font-mono text-slate-600 whitespace-nowrap">{session.time}</td>
                  <td className="p-3 font-mono font-bold text-slate-700">{session.course_code}</td>
                  <td className="p-3 font-medium text-slate-900">{session.subject}</td>
                  <td className="p-3 text-slate-600">{session.faculty}</td>
                  <td className="p-3 font-medium text-slate-700">{session.venue}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onOpenCourseModal(session.course_code)}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-[11px] cursor-pointer"
                    >
                      View
                    </button>
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
