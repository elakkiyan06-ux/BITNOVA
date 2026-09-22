import React from 'react';
import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  Users,
  Award
} from 'lucide-react';

interface StaffRecommendationsProps {
  onNavigate: (viewId: string) => void;
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

export const StaffRecommendations: React.FC<StaffRecommendationsProps> = ({
  onNavigate,
  onShowToast
}) => {
  const recommendations = [
    {
      id: 'rec-1',
      dept: 'Information Technology',
      subject: 'CS303 Computer Organization & Architecture',
      title: 'Mandatory Remedial Workshop on Instruction Pipelining',
      details: 'Pass rate in CS303 is currently 68.0% with 42 students in the danger zone. Organizing 4 remedial problem-solving sessions on Saturdays will boost pass rate by an estimated ~12%.',
      impact: 'High Impact (+12% Pass Rate)',
      action: 'Schedule Faculty Sessions'
    },
    {
      id: 'rec-2',
      dept: 'All Departments',
      subject: 'Biometric Attendance Compliance',
      title: 'Automated SMS & Portal Notification for Students at 72–75%',
      details: 'Send automated advisories before midterm examinations to prevent students from sliding into the condonation penalty bracket.',
      impact: 'Preventative (+6% Retention)',
      action: 'Activate Notification Rule'
    },
    {
      id: 'rec-3',
      dept: 'Electrical & Electronics',
      subject: 'EE302 Control Systems Engineering',
      title: 'Peer-Assisted Lab Tutoring for Frequency Response Analysis',
      details: 'Assign top 10% senior students as peer tutors during Wednesday afternoon lab slots to assist students with internal marks below 60%.',
      impact: 'Moderate Impact',
      action: 'Assign Peer Tutors'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Lightbulb className="w-4 h-4 text-blue-600" /> Executive Action Directive
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Institutional Interventions & Academic Policy Actions
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            System-level recommendations synthesized from cohort attrition patterns and predictive risk clustering.
          </p>
        </div>

        <button
          onClick={() => onNavigate('at-risk')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
        >
          View At-Risk Roster
        </button>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {rec.dept}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {rec.subject}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {rec.impact}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{rec.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">{rec.details}</p>
            </div>

            <button
              onClick={() => onShowToast && onShowToast(`Action confirmed: "${rec.action}" initiated.`, 'success')}
              className="px-4 py-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-800 border border-slate-200 hover:border-blue-300 text-xs font-bold rounded-xl transition-colors whitespace-nowrap self-end sm:self-center"
            >
              {rec.action} &rarr;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
