import React, { useState } from 'react';
import { predictStudentGrade } from '../../services/mlService';
import { PredictionInput, PredictionResult } from '../../types';
import {
  Calculator,
  Sparkles,
  Users,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight
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

export const StaffGradePrediction: React.FC = () => {
  const [inputs, setInputs] = useState<PredictionInput>({
    attendance: 72.0,
    internal_1: 65.0,
    internal_2: 68.0,
    assignment_score: 75.0,
    previous_marks: 70.0,
    previous_gpa: 7.2
  });

  const [result, setResult] = useState<PredictionResult>(() => predictStudentGrade(inputs));

  const handlePredict = () => {
    setResult(predictStudentGrade(inputs));
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
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" /> Academic Affairs Forecasting Tool
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Institutional Grade Prediction Simulator
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Test student parameter thresholds to evaluate examination board grading distributions and pass probability boundaries.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-800">
          Faculty / HOD Diagnostic Console
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
          <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" /> Continuous Parameter Adjuster
          </h2>

          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Attendance %</span>
              <span className="font-mono font-bold text-blue-700">{inputs.attendance}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={inputs.attendance}
              onChange={(e) => setInputs({ ...inputs, attendance: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Internal 1 (100)</span>
              <span className="font-mono font-bold text-blue-700">{inputs.internal_1}</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              value={inputs.internal_1}
              onChange={(e) => setInputs({ ...inputs, internal_1: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Internal 2 (100)</span>
              <span className="font-mono font-bold text-blue-700">{inputs.internal_2}</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              value={inputs.internal_2}
              onChange={(e) => setInputs({ ...inputs, internal_2: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Assignments (100)</span>
              <span className="font-mono font-bold text-blue-700">{inputs.assignment_score}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              value={inputs.assignment_score}
              onChange={(e) => setInputs({ ...inputs, assignment_score: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Prior CGPA (10.0)</span>
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

          <button
            onClick={handlePredict}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors mt-2"
          >
            Compute Inference
          </button>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="bg-gradient-to-br from-navy-900 to-blue-900 text-white rounded-xl p-6 shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-blue-200 block uppercase">
                Forecasted Classification
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-5xl font-black text-white">
                  Grade {result.predicted_grade}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30">
                  {Math.round(result.confidence * 100)}% Confidence
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-2">
                Expected Exam Score: <strong className="text-white">{result.expected_score_range}</strong>
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-blue-200 block">Risk Evaluation</span>
              <span className={`text-2xl font-black ${result.risk === 'HIGH' ? 'text-red-400' : 'text-emerald-300'}`}>
                {result.risk}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Class Probability Distribution
            </h3>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={probChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="grade" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(v: any) => [`${v}%`, 'Probability']} />
                  <Bar dataKey="probability" radius={[4, 4, 0, 0]}>
                    {probChartData.map((e, idx) => (
                      <Cell key={idx} fill={e.grade === result.predicted_grade ? '#2563eb' : '#cbd5e1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
