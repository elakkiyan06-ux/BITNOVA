import React, { useState } from 'react';
import { initialFacultyQueries, studentCourses } from '../../data/mockDatabase';
import { FacultyQuery } from '../../types';
import {
  MessageSquare,
  X,
  Send,
  Paperclip,
  CheckCircle2,
  Clock,
  User,
  Sparkles,
  Bot
} from 'lucide-react';

interface AskFacultyFloatingWidgetProps {
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

export const AskFacultyFloatingWidget: React.FC<AskFacultyFloatingWidgetProps> = ({ onShowToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [queries, setQueries] = useState<FacultyQuery[]>(initialFacultyQueries);
  const [subject, setSubject] = useState(studentCourses[0].name);
  const [question, setQuestion] = useState('');
  const [attachedName, setAttachedName] = useState<string | null>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newQ: FacultyQuery = {
      id: `query-floating-${Date.now()}`,
      student_id: '23IT034',
      student_name: 'Rahul Kumar',
      subject: subject,
      question: question,
      time: 'Just now',
      status: 'Pending'
    };

    setQueries([newQ, ...queries]);
    setQuestion('');
    setAttachedName(null);

    if (onShowToast) {
      onShowToast('Query submitted to faculty in-charge.', 'success');
    }

    // Simulate instant acknowledgement from faculty after 3s
    setTimeout(() => {
      setQueries(prev =>
        prev.map(q =>
          q.id === newQ.id
            ? {
                ...q,
                status: 'Answered',
                reply: {
                  faculty_name: 'Dr. Priya Sharma',
                  department: 'Information Technology',
                  message: 'Received your question! Review slide 8 from today\'s lecture. We can discuss more after class.',
                  time: 'Just now'
                }
              }
            : q
        )
      );
      if (onShowToast) onShowToast('New reply received from Dr. Priya Sharma!', 'info');
    }, 3500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl flex items-center justify-center transition-all transform hover:scale-105 group relative cursor-pointer"
          title="Ask Faculty"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Chat Header */}
          <div className="bg-navy-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none text-white">Ask Faculty</h3>
                <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Faculty Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {queries.map((q) => (
              <div key={q.id} className="space-y-2 text-xs">
                {/* Student bubble */}
                <div className="bg-blue-600 text-white p-3 rounded-xl rounded-tr-xs shadow-2xs ml-6">
                  <div className="flex justify-between text-[10px] text-blue-200 mb-1">
                    <span className="font-semibold">{q.subject}</span>
                    <span>{q.time}</span>
                  </div>
                  <p className="leading-snug">{q.question}</p>
                </div>

                {/* Faculty reply */}
                {q.reply ? (
                  <div className="bg-white border border-slate-200 p-3 rounded-xl rounded-tl-xs shadow-2xs mr-6">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span className="font-bold text-slate-800">{q.reply.faculty_name}</span>
                      <span>{q.reply.time}</span>
                    </div>
                    <p className="text-slate-800 leading-snug">{q.reply.message}</p>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 ml-8 italic">
                    <Clock className="w-3 h-3 text-blue-600 animate-spin" />
                    <span>Faculty reviewing question...</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 space-y-2">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-[11px] rounded-lg border border-slate-200 p-1.5 bg-slate-50 text-slate-800 font-medium"
            >
              {studentCourses.map(c => (
                <option key={c.code} value={c.name}>
                  {c.code} — {c.name}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask faculty a doubt..."
                className="flex-1 text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
              />
              <button
                type="submit"
                disabled={!question.trim()}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shrink-0 cursor-pointer shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
