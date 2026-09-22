import React from 'react';
import { currentStudent } from '../../data/mockDatabase';
import {
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  TrendingDown,
  Info,
  ArrowRight,
  UserCheck,
  BookOpen
} from 'lucide-react';

interface StudentRiskProps {
  onNavigate: (viewId: string) => void;
}

export const StudentRisk: React.FC<StudentRiskProps> = ({ onNavigate }) => {
  const riskFactors = [
    {
      factor: 'Lecture Attendance',
      level: 'Low Risk',
      score: '18 / 100',
      status: 'SAFE',
      description: 'Overall attendance is 86.4%, safely surpassing the university 75% limit across 5 out of 6 courses.',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      factor: 'Internal Marks Assessment',
      level: 'Low Risk',
      score: '22 / 100',
      status: 'SAFE',
      description: 'Continuous internal assessment average is 78.5%, placing student in the upper quartile of the department.',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      factor: 'Individual Subject Performance',
      level: 'Moderate Risk',
      score: '45 / 100',
      status: 'ATTENTION',
      description: 'Computer Organization & Architecture (CS303) is at 68% attendance and 61% internal average, creating isolated risk.',
      color: 'text-red-700 bg-red-50 border-red-200'
    },
    {
      factor: 'Previous Academic Baseline',
      level: 'Low Risk',
      score: '12 / 100',
      status: 'SAFE',
      description: 'Cumulative GPA of 8.1 with zero historical course backlogs or detention records.',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" /> Academic Standing & Vulnerability Diagnostic
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            My Academic Risk Analysis
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Holistic institutional risk assessment synthesized from attendance, continuous assessments, and historical trends.
          </p>
        </div>

        <button
          onClick={() => onNavigate('recommendations')}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          View Remedial Plan <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Primary Risk Score Gauge Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-1 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Composite Risk Score</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-5xl font-black text-slate-900">{currentStudent.risk_score}</span>
              <span className="text-sm text-slate-500 font-semibold">/ 100</span>
            </div>
            <span className="mt-3 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
              CURRENT LEVEL: {currentStudent.risk_level}
            </span>
            <p className="text-[11px] text-slate-500 mt-2">
              Values &lt; 35 are classified as Low Institutional Risk
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h2 className="text-base font-bold text-slate-900">Institutional Risk Spectrum Status</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your overall standing is <strong>Low Risk</strong>. The predictive model flags only 1 localized anomaly in CS303 Computer Organization & Architecture. Addressing this single subject eliminates 85% of your total academic vulnerability.
            </p>

            {/* Risk bar gauge without orange */}
            <div className="pt-2">
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-emerald-700 font-bold">Low Risk (0–35)</span>
                <span className="text-blue-700 font-bold">Moderate (36–65)</span>
                <span className="text-red-700 font-bold">High Risk (66–100)</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 flex overflow-hidden">
                <div className="bg-emerald-500 h-3 w-[35%]" />
                <div className="bg-blue-400 h-3 w-[30%]" />
                <div className="bg-red-600 h-3 w-[35%]" />
              </div>
              <div className="relative mt-1">
                <div
                  className="absolute -top-4 w-3 h-3 bg-slate-900 rotate-45 transform -translate-x-1.5"
                  style={{ left: `${currentStudent.risk_score}%` }}
                />
                <span
                  className="text-[11px] font-mono font-bold text-slate-900 absolute top-1 transform -translate-x-1/2"
                  style={{ left: `${currentStudent.risk_score}%` }}
                >
                  ▲ Your Score: 24
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contributing Risk Factors Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-4">
          Contributing Factor Vulnerability Analysis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskFactors.map((rf, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-sm">{rf.factor}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${rf.color}`}>
                    {rf.level}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{rf.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-500">Component Weighting</span>
                <span className="font-mono font-bold text-slate-800">{rf.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proactive Risk Mitigation Roadmap */}
      <div className="p-5 bg-navy-900 text-white rounded-xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-base">Recommended Mitigation: Targeted Intervention Plan</h3>
          <p className="text-xs text-blue-200 mt-1">
            Attending next 8 CS303 classes and submitting Assignment 3 for OS will reduce your risk score to <strong>12 / 100</strong>.
          </p>
        </div>
        <button
          onClick={() => onNavigate('recommendations')}
          className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold rounded-lg transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          Open Recommendations
        </button>
      </div>
    </div>
  );
};
