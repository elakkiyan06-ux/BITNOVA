import React from 'react';
import { bigDataPipelineStats, mlModelMetrics } from '../../data/mockDatabase';
import {
  Database,
  Cpu,
  ArrowDown,
  CheckCircle2,
  Info,
  Sparkles,
  BarChart3,
  Layers,
  Activity,
  Sliders,
  AlertCircle
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

export const StaffDataIntelligence: React.FC = () => {
  const pipelineStages = [
    { step: '01', title: 'Raw Ingestion', desc: '125,000 raw institutional exam records & LMS logs ingested via Apache Spark', count: '125,000' },
    { step: '02', title: 'Data Cleaning', desc: 'Handled 2,840 missing values (median imputation) & eliminated 540 duplicate entries', count: '122,160 Clean' },
    { step: '03', title: 'Transformation', desc: 'Normalized continuous assessment scales (0–100) and computed longitudinal CGPA deltas', count: 'Standardized' },
    { step: '04', title: 'Feature Selection', desc: 'Distilled 18 raw signals into 10 high-correlation features via Random Forest Gini gain', count: '10 Features' },
    { step: '05', title: 'Machine Learning', desc: 'Multi-class Random Forest Classifier (150 trees) predicts end-semester grade distributions', count: '89.2% Acc.' },
    { step: '06', title: 'Prescriptive Actions', desc: 'Synthesizes individualized early warning alerts, mentoring assignments, and remedial quotas', count: 'Real-time' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Database className="w-4 h-4" /> High-Performance Big Data & Machine Learning Engine
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Data Intelligence & Prediction Architecture
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Distributed PySpark extraction, feature engineering pipelines, and supervised classification model benchmarks.
          </p>
        </div>

        {/* Mandatory Hackathon Transparency Badge */}
        <div className="bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-700 shrink-0" />
          <div>
            <span className="font-bold text-blue-950 block">{mlModelMetrics.demo_label}</span>
            <span className="text-[10px] text-blue-800">Evaluated on simulated multi-term university cohort</span>
          </div>
        </div>
      </div>

      {/* 4 Big Data Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Records Processed
          </span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">
            {bigDataPipelineStats.raw_records_processed.toLocaleString()}
          </span>
          <p className="text-[11px] text-slate-600 mt-0.5">Batch examination transactions</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Clean Records
          </span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">
            {bigDataPipelineStats.clean_records.toLocaleString()}
          </span>
          <p className="text-[11px] text-slate-600 mt-0.5">
            {bigDataPipelineStats.missing_values_handled.toLocaleString()} nulls imputed
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Cohort Scope
          </span>
          <span className="text-2xl font-black text-blue-600 mt-1 block">
            {bigDataPipelineStats.total_students.toLocaleString()} Students
          </span>
          <p className="text-[11px] text-slate-600 mt-0.5">Across 5 departments & 48 subjects</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Cluster Latency
          </span>
          <span className="text-2xl font-black text-indigo-600 mt-1 block">
            4.2s
          </span>
          <p className="text-[11px] text-slate-600 mt-0.5">Distributed Apache Spark execution</p>
        </div>
      </div>

      {/* Visual Enterprise Data Pipeline */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Distributed Big Data Pipeline Architecture</h2>
            <p className="text-xs text-slate-600">End-to-end data transformation from raw LMS database to academic intervention</p>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Pipeline Synchronized
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {pipelineStages.map((st, idx) => (
            <div
              key={st.step}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 relative flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  STAGE {st.step}
                </span>
                <h3 className="text-xs font-bold text-slate-900 mt-2">{st.title}</h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">{st.desc}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200/80">
                <span className="text-[11px] font-mono font-bold text-slate-800">{st.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Machine Learning Model Performance Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">Prediction Model Performance Metrics</h2>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Algorithm: <strong>{mlModelMetrics.algorithm}</strong> &bull; Task: {mlModelMetrics.task}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-mono font-bold text-slate-600 block">Dataset Split</span>
            <span className="text-xs text-slate-800 font-semibold">{mlModelMetrics.dataset_split}</span>
          </div>
        </div>

        {/* 4 Core ML Evaluation Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
            <span className="text-xs font-bold text-blue-800 uppercase block">Model Accuracy</span>
            <span className="text-3xl font-black text-blue-950 mt-1 block">{mlModelMetrics.accuracy}%</span>
            <span className="text-[10px] text-blue-700 font-medium">Demo Model Benchmark</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-xs font-bold text-emerald-800 uppercase block">Precision Score</span>
            <span className="text-3xl font-black text-emerald-950 mt-1 block">{mlModelMetrics.precision}%</span>
            <span className="text-[10px] text-emerald-700 font-medium">Weighted Average</span>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-center">
            <span className="text-xs font-bold text-indigo-800 uppercase block">Recall Rate</span>
            <span className="text-3xl font-black text-indigo-950 mt-1 block">{mlModelMetrics.recall}%</span>
            <span className="text-[10px] text-indigo-700 font-medium">Failure Sensitivity</span>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-center">
            <span className="text-xs font-bold text-purple-800 uppercase block">F1 Score</span>
            <span className="text-3xl font-black text-purple-950 mt-1 block">{mlModelMetrics.f1_score}%</span>
            <span className="text-[10px] text-purple-700 font-medium">Harmonic Mean</span>
          </div>
        </div>

        {/* Model Insights: Feature Importance & Confusion Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Feature Importance Chart */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Feature Importance (Gini Impurity Reduction)
            </h3>
            <p className="text-[11px] text-slate-600 mb-4">
              Relative predictive contribution of academic factors towards final grade classification
            </p>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mlModelMetrics.feature_importance}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 45]} unit="%" tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="feature" tick={{ fontSize: 9 }} width={120} />
                  <Tooltip
                    formatter={(val: any) => [`${val}%`, 'Relative Weight']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Bar dataKey="weight" fill="#2563eb" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Multiclass Confusion Matrix */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Test Set Confusion Matrix (24,432 Samples)
                </h3>
                <span className="text-[10px] font-mono text-slate-600">Rows: Actual | Cols: Predicted</span>
              </div>

              <div className="overflow-x-auto mt-3">
                <table className="w-full text-center text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-200 text-slate-700 font-bold">
                      <th className="p-2 border border-slate-300 text-left font-mono">Actual \ Pred</th>
                      {mlModelMetrics.confusion_matrix.labels.map(l => (
                        <th key={l} className="p-2 border border-slate-300 font-mono">Pred {l}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mlModelMetrics.confusion_matrix.labels.map((rowLabel, rIdx) => (
                      <tr key={rowLabel} className="hover:bg-slate-100">
                        <td className="p-2 border border-slate-300 font-bold font-mono bg-slate-100 text-left">
                          Actual {rowLabel}
                        </td>
                        {mlModelMetrics.confusion_matrix.matrix[rIdx].map((val, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-2 border border-slate-300 font-mono font-semibold ${
                              rIdx === cIdx ? 'bg-blue-100 font-black text-blue-900' : 'text-slate-600'
                            }`}
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 mt-3 pt-2 border-t border-slate-200">
              High diagonal concentration demonstrates balanced classification sensitivity with minimal off-diagonal false positives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
