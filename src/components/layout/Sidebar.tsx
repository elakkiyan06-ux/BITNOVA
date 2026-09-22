import React from 'react';
import {
  LayoutDashboard,
  Database,
  BarChart3,
  Calculator,
  ClipboardList,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'preprocessing', label: 'Data Preprocessing', icon: Database },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'prediction', label: 'Grade Prediction', icon: Calculator },
  { id: 'recommendations', label: 'Recommendations', icon: ClipboardList }
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isMobileOpen,
  onCloseMobile
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-60 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header Branding */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-academic-navy flex items-center justify-center text-white shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-slate-900">
              BITNOVA
            </h1>
            <p className="text-[11px] text-blue-600 font-semibold uppercase tracking-wider">
              ACADEMIC INTELLIGENCE
            </p>
          </div>
        </div>

        {/* 5 Simple Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-blue-50 text-academic-navy border-l-4 border-academic-navy'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-academic-navy' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Institutional Subtitle */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50">
          <p className="text-[11px] font-semibold text-slate-600">
            Big Data Analytics &amp; ML
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Academic Assessment Platform
          </p>
        </div>
      </aside>
    </>
  );
};
