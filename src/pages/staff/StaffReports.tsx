import React, { useState } from 'react';
import { exportTableToCSV } from '../../services/reportService';
import {
  departmentMetrics,
  batchMetrics,
  subjectAnalyticsData,
  atRiskStudentsList
} from '../../data/mockDatabase';
import {
  FileText,
  Download,
  Printer,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  Building2,
  AlertTriangle
} from 'lucide-react';

interface StaffReportsProps {
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

export const StaffReports: React.FC<StaffReportsProps> = ({ onShowToast }) => {
  const [selectedReportType, setSelectedReportType] = useState('at_risk');

  const reportCards = [
    {
      id: 'at_risk',
      title: 'At-Risk Students & Early Intervention Report',
      desc: 'Complete roster of 86 students identified with attendance deficits or continuous score risk',
      count: '86 records',
      filename: 'bitnova_at_risk_students_2026.csv',
      getData: () => atRiskStudentsList
    },
    {
      id: 'department',
      title: 'Department Academic Benchmark Report',
      desc: 'Cross-department comparison of pass rates, continuous averages, and at-risk totals',
      count: '5 departments',
      filename: 'bitnova_department_benchmarks_2026.csv',
      getData: () => departmentMetrics
    },
    {
      id: 'subject',
      title: 'Subject Rigor & Difficulty Index Report',
      desc: 'All 48 curriculum subjects with pass rates, contact hour attendance, and failure volumes',
      count: '10 active subjects',
      filename: 'bitnova_subject_analytics_2026.csv',
      getData: () => subjectAnalyticsData
    },
    {
      id: 'batch',
      title: 'Multi-Batch Longitudinal Progression Report',
      desc: 'Comparative analysis of cohorts 2023 through 2026 demonstrating longitudinal pass rate gains',
      count: '4 batches',
      filename: 'bitnova_batch_longitudinal_report.csv',
      getData: () => batchMetrics
    }
  ];

  const handleExportCSV = (report: typeof reportCards[0]) => {
    const data = report.getData();
    exportTableToCSV(data, report.filename);
    if (onShowToast) onShowToast(`Exported "${report.filename}" successfully.`, 'success');
  };

  const handlePrintReport = (title: string) => {
    window.print();
    if (onShowToast) onShowToast(`Sending "${title}" to system print spooler.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" /> Official Examination Bureau Dossiers
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Institutional Reports & Analytics Center
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Generate and export university-compliant documentation, CSV audit logs, and printable executive summaries.
          </p>
        </div>

        <button
          onClick={() => handlePrintReport('Academic Affairs Summary')}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Printer className="w-4 h-4" /> Print Current Screen
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reportCards.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                  {report.count}
                </span>
                <span className="text-[10px] text-slate-600 font-semibold uppercase">CSV & Printable</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mt-2">{report.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{report.desc}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono text-slate-600 truncate max-w-[180px]">
                {report.filename}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handlePrintReport(report.title)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button
                  onClick={() => handleExportCSV(report)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Export CSV
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
