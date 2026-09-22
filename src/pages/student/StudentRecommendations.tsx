import React, { useState } from 'react';
import { studentRecommendations } from '../../data/mockDatabase';
import { RecommendationItem } from '../../types';
import {
  Lightbulb,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Award,
  BookOpen,
  Calendar,
  UserCheck,
  FileText,
  AlertCircle
} from 'lucide-react';

interface StudentRecommendationsProps {
  onNavigate: (viewId: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const StudentRecommendations: React.FC<StudentRecommendationsProps> = ({
  onNavigate,
  onShowToast
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const categories = ['ALL', 'Attendance', 'Academic', 'Assignment', 'Subject', 'Mentoring'];

  const filteredRecs = studentRecommendations.filter(rec => {
    if (selectedCategory === 'ALL') return true;
    return rec.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleToggleAction = (rec: RecommendationItem) => {
    if (completedIds.includes(rec.id)) {
      setCompletedIds(completedIds.filter(id => id !== rec.id));
      onShowToast(`Reopened task: "${rec.title}"`, 'info');
    } else {
      setCompletedIds([...completedIds, rec.id]);
      onShowToast(`Task marked as scheduled/completed: "${rec.title}"`, 'success');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'attendance': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'academic': return <Award className="w-4 h-4 text-blue-600" />;
      case 'assignment': return <FileText className="w-4 h-4 text-indigo-600" />;
      case 'subject': return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'mentoring': return <UserCheck className="w-4 h-4 text-purple-600" />;
      default: return <Lightbulb className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Lightbulb className="w-4 h-4 text-blue-600" /> Prescriptive Academic Guidance
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Personalized Academic Recommendations
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Machine-generated action points tailored specifically to your continuous examination logs and attendance.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
          <span>Completed:</span>
          <span className="font-bold text-emerald-600">{completedIds.length}</span>
          <span>of {studentRecommendations.length}</span>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-navy-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'ALL' ? 'All Recommendations (5)' : cat}
          </button>
        ))}
      </div>

      {/* Recommendation Items List */}
      <div className="space-y-3">
        {filteredRecs.map((rec, index) => {
          const isDone = completedIds.includes(rec.id);
          const priorityBadge = {
            High: 'bg-red-50 text-red-700 border-red-200',
            Medium: 'bg-blue-50 text-blue-700 border-blue-200',
            Low: 'bg-slate-100 text-slate-700 border-slate-200'
          }[rec.priority];

          return (
            <div
              key={rec.id}
              className={`p-5 rounded-xl border transition-all ${
                isDone
                  ? 'bg-slate-50/70 border-slate-200 opacity-70'
                  : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    {getCategoryIcon(rec.category)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {rec.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${priorityBadge}`}>
                        {rec.priority} Priority
                      </span>
                    </div>

                    <h3 className={`text-base font-bold mt-1.5 ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {index + 1}. {rec.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleToggleAction(rec)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                      isDone
                        ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    }`}
                  >
                    {isDone ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Done
                      </>
                    ) : (
                      <>
                        {rec.action_label} <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
