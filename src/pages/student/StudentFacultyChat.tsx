import React, { useState } from 'react';
import { initialFacultyQueries, studentCourses } from '../../data/mockDatabase';
import { FacultyQuery } from '../../types';
import {
  MessageSquare,
  Send,
  Paperclip,
  CheckCircle2,
  Clock,
  User,
  HelpCircle,
  Sparkles,
  Bot
} from 'lucide-react';

interface StudentFacultyChatProps {
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

export const StudentFacultyChat: React.FC<StudentFacultyChatProps> = ({ onShowToast }) => {
  const [queries, setQueries] = useState<FacultyQuery[]>(initialFacultyQueries);
  const [selectedSubject, setSelectedSubject] = useState(studentCourses[4].name);
  const [questionText, setQuestionText] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsSubmitting(true);

    const newQuery: FacultyQuery = {
      id: `query-${Date.now()}`,
      student_id: '23IT034',
      student_name: 'Rahul Kumar',
      subject: selectedSubject,
      question: questionText,
      time: 'Just now',
      status: 'Pending'
    };

    setTimeout(() => {
      setQueries([newQuery, ...queries]);
      setQuestionText('');
      setAttachedFileName(null);
      setIsSubmitting(false);

      if (onShowToast) {
        onShowToast(`Question submitted to ${selectedSubject} faculty. Response pending.`, 'success');
      }

      setTimeout(() => {
        setQueries(prev =>
          prev.map(q =>
            q.id === newQuery.id
              ? {
                  ...q,
                  status: 'Answered',
                  reply: {
                    faculty_name: 'Dr. K. Anand',
                    department: 'Information Technology',
                    message: `Hello Rahul, thank you for your query. Regarding "${newQuery.question.slice(0, 40)}...", please review Slide 14 of Unit 3 notes. We will also address this at the start of tomorrow's session.`,
                    time: 'Just now'
                  }
                }
              : q
          )
        );
        if (onShowToast) {
          onShowToast('You received a new faculty reply from Dr. K. Anand!', 'info');
        }
      }, 4000);
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" /> Academic Mentoring & Faculty Q&A
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Ask Faculty & Academic Clarifications
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Directly communicate with your course professors regarding continuous assessments, theory concepts, or lab doubts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">Faculty Online: 6 Course Instructors Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" /> New Question to Faculty
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Subject & Course</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  {studentCourses.map(c => (
                    <option key={c.code} value={c.name}>
                      {c.code} — {c.name} ({c.faculty})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Question / Doubt</label>
                <textarea
                  rows={4}
                  placeholder="e.g. Could you explain subnetting and CIDR calculation before tomorrow's test?"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-3 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Optional Reference Attachment</label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 transition-colors">
                    <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                    <span>Attach Code / Note snippet</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setAttachedFileName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                  {attachedFileName && (
                    <span className="text-[11px] font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded truncate max-w-[150px]">
                      {attachedFileName}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !questionText.trim()}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>Submitting Query...</>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Submit Question to Faculty
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-4 p-3 bg-blue-50/70 border border-blue-100 rounded-lg text-[11px] text-blue-800 flex items-start gap-2">
            <Bot className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              Faculty are notified instantly via their Institutional Query Center. Responses are logged into your academic record.
            </p>
          </div>
        </div>

        {/* Conversation Stream */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900 text-base">Conversation Thread & Responses</h2>
              <span className="text-xs text-slate-600 font-semibold">{queries.length} Queries</span>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {queries.map((q) => (
                <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                      {q.subject}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">{q.time}</span>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-800">
                    <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-600" /> You ({q.student_name})
                    </p>
                    <p className="leading-relaxed">{q.question}</p>
                  </div>

                  {q.reply ? (
                    <div className="bg-emerald-50/70 border border-emerald-200 p-3.5 rounded-lg text-xs text-emerald-950 ml-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-emerald-900 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {q.reply.faculty_name} ({q.reply.department})
                        </span>
                        <span className="text-[10px] text-emerald-700 font-mono">{q.reply.time}</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed mt-1.5">{q.reply.message}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200 ml-4">
                      <Clock className="w-3.5 h-3.5 animate-spin text-blue-600" />
                      <span>Pending faculty review &mdash; usually answered within 2 hours</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
