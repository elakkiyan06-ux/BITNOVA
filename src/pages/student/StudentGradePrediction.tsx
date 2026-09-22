import React, { useState } from 'react';
import { predictStudentGrade, simulateWhatIfScenario } from '../../services/mlService';
import { PredictionInput, PredictionResult } from '../../types';
import {
  Calculator,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sliders,
  ArrowRight,
  RefreshCw,
  Award,
  Zap,
  Check
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export const StudentGradePrediction: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PREDICTION' | 'WHAT_IF'>('PREDICTION');

  // Standard Prediction Form State
  const [inputs, setInputs] = useState<PredictionInput>({
    attendance: 86.4,
    internal_1: 78.0,
    internal_2: 82.0,
    assignment_score: 90.0,
    previous_marks: 76.0,
    previous_gpa: 7.8
  });

  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState<PredictionResult>(() => predictStudentGrade(inputs));

  // What-If Simulator State
  const [simAttendance, setSimAttendance] = useState(68);
  const [simInternal, setSimInternal] = useState(61);
  const [simAssignment, setSimAssignment] = useState(70);
  const [simPrevGPA, setSimPrevGPA] = useState(7.5);

  const whatIfResult = simulateWhatIfScenario(
    {
      attendance: 68,
      internal_1: 60,
      internal_2: 62,
      assignment_score: 70,
      previous_marks: 64,
      previous_gpa: 7.5
    },
    {
      attendance: simAttendance,
      internal_1: simInternal,
      internal_2: simInternal,
      assignment_score: simAssignment,
      previous_marks: 64,
      previous_gpa: simPrevGPA
    }
  );

  const handlePredict = () => {
    setIsPredicting(true);
    setTimeout(() => {
      const res = predictStudentGrade(inputs);
      setResult(res);
      setIsPredicting(false);
    }, 400);
  };

  const probChartData = [
    { grade: 'A', probability: result.probabilities.A },
    { grade: 'B', probability: result.probabilities.B },
    { grade: 'C', probability: result.probabilities.C },
    { grade: 'D', probability: result.probabilities.D },
    { grade: 'F', probability: result.probabilities.F }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-blue-600" /> Supervised Machine Learning Inference
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            AI Grade Prediction & Explainability Engine
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Estimate your end-semester outcome using your current academic performance.
          </p>
        </div>

        {/* Tab Toggle between Predictor and What-If */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('PREDICTION')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'PREDICTION'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" /> AI Prediction
          </button>
          <button
            onClick={() => setActiveTab('WHAT_IF')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'WHAT_IF'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> What-If Simulator
          </button>
        </div>
      </div>

      {activeTab === 'PREDICTION' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Factors Panel */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-600" /> Continuous Academic Factors
                </h2>
                <button
                  onClick={() =>
                    setInputs({
                      attendance: 86.4,
                      internal_1: 78.0,
                      internal_2: 82.0,
                      assignment_score: 90.0,
                      previous_marks: 76.0,
                      previous_gpa: 7.8
                    })
                  }
                  className="text-[11px] text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Overall Attendance %</span>
                    <span className="font-mono font-bold text-blue-700">{inputs.attendance}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="0.5"
                    value={inputs.attendance}
                    onChange={(e) => setInputs({ ...inputs, attendance: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Internal Assessment 1 (Scale 100)</span>
                    <span className="font-mono font-bold text-blue-700">{inputs.internal_1}</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    step="1"
                    value={inputs.internal_1}
                    onChange={(e) => setInputs({ ...inputs, internal_1: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Internal Assessment 2 (Scale 100)</span>
                    <span className="font-mono font-bold text-blue-700">{inputs.internal_2}</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    step="1"
                    value={inputs.internal_2}
                    onChange={(e) => setInputs({ ...inputs, internal_2: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Assignment & Coursework Rate %</span>
                    <span className="font-mono font-bold text-blue-700">{inputs.assignment_score}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    step="1"
                    value={inputs.assignment_score}
                    onChange={(e) => setInputs({ ...inputs, assignment_score: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Previous Semester Average (Sem V)</span>
                    <span className="font-mono font-bold text-blue-700">{inputs.previous_marks}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    step="1"
                    value={inputs.previous_marks}
                    onChange={(e) => setInputs({ ...inputs, previous_marks: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Cumulative GPA (Scale 10.0)</span>
                    <span className="font-mono font-bold text-blue-700">{inputs.previous_gpa}</span>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="10.0"
                    step="0.1"
                    value={inputs.previous_gpa}
                    onChange={(e) => setInputs({ ...inputs, previous_gpa: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handlePredict}
              disabled={isPredicting}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPredicting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Computing Model Probabilities...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-blue-200" /> Predict My Grade
                </>
              )}
            </button>
          </div>

          {/* Output Results Panel */}
          <div className="lg:col-span-7 space-y-6">
            {/* Predicted Outcome Card */}
            <div className="bg-navy-900 text-white rounded-xl p-6 shadow-md relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider block">
                    Predicted End-Semester Outcome
                  </span>
                  <div className="flex items-baseline gap-4 mt-2">
                    <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                      Grade {result.predicted_grade}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      {Math.round(result.confidence * 100)}% Confidence
                    </span>
                  </div>
                  <p className="text-xs text-blue-200 mt-2">
                    Projected Examination Score Range: <strong className="text-white text-sm">{result.expected_score_range} / 100</strong>
                  </p>
                </div>

                <div className="text-left sm:text-right bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
                  <span className="text-[11px] text-blue-200 block font-medium">Academic Risk Assessment</span>
                  <span className="text-xl font-black text-emerald-300">{result.risk}</span>
                  <span className="text-[10px] text-blue-300 block mt-0.5">Low probability of failure</span>
                </div>
              </div>

              {/* Multiclass Probability Vector */}
              <div className="mt-6 pt-5 border-t border-slate-700/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-200">
                    Grade Probability Vector Distribution
                  </span>
                  <span className="text-[11px] text-blue-300">Softmax Classifier Output</span>
                </div>

                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={probChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="grade" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                      <YAxis domain={[0, 100]} tick={{ fill: '#cbd5e1', fontSize: 10 }} unit="%" />
                      <Tooltip
                        formatter={(val: any) => [`${val}%`, 'Likelihood']}
                        contentStyle={{ backgroundColor: '#0B1B33', borderColor: '#1e3a8a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                      />
                      <Bar dataKey="probability" radius={[4, 4, 0, 0]}>
                        {probChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.grade === result.predicted_grade ? '#3b82f6' : '#334155'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-5 gap-2 text-center text-xs mt-2">
                  {probChartData.map(p => (
                    <div key={p.grade} className="bg-navy-950/60 py-1 px-1.5 rounded border border-blue-900/50">
                      <span className="text-[10px] text-blue-300 block">Grade {p.grade}</span>
                      <span className={`font-bold ${p.grade === result.predicted_grade ? 'text-blue-300' : 'text-slate-300'}`}>
                        {p.probability}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Explainable AI: Positive and Risk Factors */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Explainable AI: Why this prediction?
                  </h3>
                  <p className="text-xs text-slate-600">
                    Decision tree attribution and identified vulnerability factors
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200">
                  <p className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Positive Driving Factors
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {result.positive_factors.map((factor, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">&check;</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-red-50/50 border border-red-200">
                  <p className="text-xs font-bold text-red-800 flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    Risk Factors Requiring Intervention
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {result.risk_factors.map((risk, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-red-600 font-bold">&bull;</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Academic What-If Simulator View (NO ORANGE) */
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                  Scenario Sensitivity Analysis
                </span>
                <h2 className="text-xl font-bold text-slate-900">Academic What-If Simulator</h2>
                <p className="text-xs text-slate-600 mt-1">
                  Adjust hypothetical performance levers to immediately observe the impact on predicted end-semester grade.
                </p>
              </div>
              <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
                <Sliders className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Simulated Attendance</span>
                  <span className="font-mono text-blue-700 font-bold">{simAttendance}%</span>
                </div>
                <input
                  type="range"
                  min="55"
                  max="98"
                  value={simAttendance}
                  onChange={(e) => setSimAttendance(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Current COA: 68% &bull; Simulated: {simAttendance}%
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Target Internal Average</span>
                  <span className="font-mono text-blue-700 font-bold">{simInternal} / 100</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={simInternal}
                  onChange={(e) => setSimInternal(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Current COA: 61 &bull; Simulated: {simInternal}
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Assignment Completion %</span>
                  <span className="font-mono text-blue-700 font-bold">{simAssignment}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={simAssignment}
                  onChange={(e) => setSimAssignment(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Task Completion Rate
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Target Semester GPA</span>
                  <span className="font-mono text-blue-700 font-bold">{simPrevGPA}</span>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="9.5"
                  step="0.1"
                  value={simPrevGPA}
                  onChange={(e) => setSimPrevGPA(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Cumulative Baseline
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Current Baseline State</span>
                <p className="text-3xl font-black text-slate-700 mt-2">
                  Grade {whatIfResult.current.predicted_grade}
                </p>
                <div className="mt-3 text-xs text-slate-600 space-y-1">
                  <p>Attendance: 68%</p>
                  <p>Internal Average: 61</p>
                  <p>Risk: <strong className="text-red-600">HIGH (in COA)</strong></p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 text-center relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-[11px] font-bold text-blue-700 uppercase">Simulated Outcome</span>
                <p className="text-3xl font-black text-blue-900 mt-2">
                  Grade {whatIfResult.simulated.predicted_grade}
                </p>
                <div className="mt-3 text-xs text-blue-900 space-y-1">
                  <p>Attendance: {simAttendance}%</p>
                  <p>Internal Average: {simInternal}</p>
                  <p>Risk: <strong className="text-emerald-700">{whatIfResult.simulated.risk}</strong></p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase block">Impact Delta</span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-black text-emerald-800">
                      {whatIfResult.grade_delta}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold">grade level enhancement</span>
                  </div>
                  <p className="text-xs text-emerald-900 mt-2 leading-relaxed">
                    By boosting attendance from 68% to <strong>{simAttendance}%</strong> and internal scores to <strong>{simInternal}</strong>, your predicted grade elevates from <strong>C</strong> to <strong>{whatIfResult.simulated.predicted_grade}</strong>.
                  </p>
                </div>
                <div className="text-xs font-semibold text-emerald-800 mt-2 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> High feasibility via 8 remedial sessions
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
