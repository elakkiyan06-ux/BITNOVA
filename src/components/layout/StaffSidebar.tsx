import React from 'react';
import {
  LayoutDashboard,
  User,
  Search,
  BarChart3,
  Calculator,
  AlertTriangle,
  Lightbulb,
  FileText,
  Settings,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { UserAccount } from '../../types';

interface StaffSidebarProps {
  currentView: string;
  user: UserAccount;
  onNavigate: (viewId: string) => void;
  onLogoutClick: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const FACULTY_NAV_ITEMS = [
  { id: 'staff-overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'student-search', label: 'Student Results', icon: Search },
  { id: 'subject-analytics', label: 'Performance Analytics', icon: BarChart3 },
  { id: 'staff-prediction', label: 'Grade Prediction', icon: Calculator, highlight: true },
  { id: 'at-risk', label: 'At-Risk Students', icon: AlertTriangle, badge: '86', alert: true },
  { id: 'staff-recommendations', label: 'Recommendations', icon: Lightbulb },
  { id: 'reports', label: 'Reports', icon: FileText }
];

export const StaffSidebar: React.FC<StaffSidebarProps> = ({
  currentView,
  user,
  onNavigate,
  onLogoutClick,
  isMobileOpen,
  onCloseMobile
}) => {
  return (
    <>
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-[#0B1B33]/60 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0B1B33] text-slate-100 flex flex-col border-r border-slate-800/80 transition-transform duration-200 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center text-white shadow-md shadow-blue-950 shrink-0 border border-blue-400/30">
            <div className="relative">
              <GraduationCap className="w-6 h-6" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#0B1B33]" />
            </div>
          </div>
          <div>
            <h1 className="font-black text-base tracking-tight text-white leading-none">
              BITNOVA
            </h1>
            <p className="text-[10px] text-blue-400 font-bold tracking-widest uppercase mt-1">
              ACADEMIC INTELLIGENCE
            </p>
          </div>
        </div>

        {/* Faculty Profile Mini-Card */}
        <div
          onClick={() => {
            onNavigate('profile');
            onCloseMobile();
          }}
          className="px-4 py-3 bg-[#081324] border-b border-slate-800/80 flex items-center gap-3 cursor-pointer hover:bg-[#0d1f3b] transition-colors"
          title="Click to view full faculty profile"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-700 border border-blue-400/40 flex items-center justify-center shrink-0">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white font-bold text-xs">
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{user.name}</p>
            <p className="text-[10px] text-slate-400 truncate">
              {user.facultyId || 'FAC-IT-409'} • {user.designation || 'Faculty'}
            </p>
          </div>
        </div>

        {/* Navigation Items strictly matching Section 8 */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {FACULTY_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-md shadow-blue-900/30'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive
                        ? 'text-white'
                        : item.alert
                        ? 'text-red-400'
                        : item.highlight
                        ? 'text-blue-400'
                        : 'text-slate-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.alert
                        ? 'bg-[#FEF2F2]/20 text-red-300 border border-red-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Section: Dedicated Settings & Sign Out */}
        <div className="p-3 border-t border-slate-800 bg-[#081324] space-y-1">
          <button
            onClick={() => {
              onNavigate('settings');
              onCloseMobile();
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              currentView === 'settings'
                ? 'bg-[#2563EB] text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>

          <button
            onClick={onLogoutClick}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#DC2626] hover:bg-[#FEF2F2]/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-[#DC2626]" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
