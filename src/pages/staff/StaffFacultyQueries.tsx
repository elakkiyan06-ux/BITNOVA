import React, { useState } from 'react';
import { initialFacultyQueries } from '../../data/mockDatabase';
import { FacultyQuery } from '../../types';
import {
  MessageSquare,
  Send,
  CheckCircle2,
  Share2,
  Clock,
  User,
  AlertCircle,
  Filter,
  Check
} from 'lucide-react';

interface StaffFacultyQueriesProps {
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

export const StaffFacultyQueries: React.FC<StaffFacultyQueriesProps> = ({ onShowToast }) => {
  const [queries, setQueries] = useState<FacultyQuery[]>(initialFacultyQueries);
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const handleSendReply = (queryId: string) => {
    const text = replyTextMap[queryId];
    if (!text || !text.trim()) return;

    setQueries(queries.map(q => {
      if (q.id === queryId) {
        return {
          ...q,
          status: 'Answered',
          reply: {
            faculty_name: 'Dr. K. Anand',
            department: 'Information Technology',
            message: text,
            time: 'Just now'
          }
        };
      }
      return q;
    }));

    setReplyTextMap({ ...replyTextMap, [queryId]: '' });
    setActiveReplyId(null);
    if (onShowToast) onShowToast('Reply dispatched to student portal.', 'success');
  };

  const handleMarkResolved = (queryId: string) => {
    setQueries(queries.map(q => q.id === queryId ? { ...q, status: 'Answered' } : q));
    if (onShowToast) onShowToast('Query marked as resolved.', 'info');
  };

  const handleForward = (queryId: string) => {
    if (onShowToast) onShowToast('Query forwarded to Subject Coordinator Prof. Vikram Seth.', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" /> Academic Helpdesk & Student Inquiries
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Faculty Query Center
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Incoming subject clarifications, continuous assessment review requests, and exam inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
          <span>1 Query Awaiting Response</span>
        </div>
      </div>

      {/* Query Cards Stream */}
      <div className="space-y-4">
        {queries.map((q) => {
          const isPending = q.status === 'Pending';
          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl border transition-all ${
                isPending
                  ? 'bg-white border-blue-300 shadow-sm ring-1 ring-blue-100'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {q.student_id}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{q.student_name}</span>
                  <span className="text-xs text-slate-400">&bull;</span>
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {q.subject}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-mono">{q.time}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isPending
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {q.status}
                  </span>
                </div>
              </div>

              {/* Student Question Text */}
              <div className="my-3 text-xs text-slate-800 bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                <p className="font-semibold text-slate-600 text-[11px] mb-1">Student Doubt:</p>
                <p className="text-sm text-slate-900 font-medium leading-relaxed">{q.question}</p>
              </div>

              {/* Existing Reply if any */}
              {q.reply && (
                <div className="mt-3 p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-emerald-900 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Replied by {q.reply.faculty_name} ({q.reply.department})
                    </span>
                    <span className="text-[10px] text-emerald-700 font-mono">{q.reply.time}</span>
                  </div>
                  <p className="text-slate-800 mt-1 leading-relaxed">{q.reply.message}</p>
                </div>
              )}

              {/* Interactive Actions for Staff */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveReplyId(activeReplyId === q.id ? null : q.id)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3 h-3" /> {q.reply ? 'Send Follow-up Note' : 'Compose Faculty Reply'}
                  </button>
                  <button
                    onClick={() => handleMarkResolved(q.id)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Mark Resolved
                  </button>
                  <button
                    onClick={() => handleForward(q.id)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Forward
                  </button>
                </div>
              </div>

              {/* Reply Box expand */}
              {activeReplyId === q.id && (
                <div className="mt-4 p-3 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2 animate-in fade-in duration-150">
                  <label className="block text-xs font-bold text-blue-950">
                    Faculty Reply Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Type official explanation or reference notes..."
                    value={replyTextMap[q.id] || ''}
                    onChange={(e) => setReplyTextMap({ ...replyTextMap, [q.id]: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveReplyId(null)}
                      className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSendReply(q.id)}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold transition-colors"
                    >
                      Dispatch Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
