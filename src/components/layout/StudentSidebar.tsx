import React from 'react';
import {
  LayoutDashboard,
  User,
  CheckCircle2,
  BookOpen,
  BarChart3,
  Calculator,
  AlertTriangle,
  Lightbulb,
  Clock,
  Calendar,
  Settings,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { UserAccount } from '../../types';

interface StudentSidebarProps {
  currentView: string;
  user: UserAccount;
  onNavigate: (viewId: string) => void;
  onLogoutClick: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const STUDENT_NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'attendance', label: 'Attendance', icon: CheckCircle2, badge: '78.4%' },
  { id: 'courses', label: 'My Courses', icon: BookOpen, badge: '6' },
  { id: 'performance', label: 'Academic Performance', icon: BarChart3 },
  { id: 'prediction', label: 'Grade Prediction', icon: Calculator, highlight: true },
  { id: 'risk', label: 'My Academic Risk', icon: AlertTriangle },
  { id: 'recommendations', label: 'Recommendations', icon: Lightbulb, badge: '5' },
  { id: 'today-sessions', label: "Today's Sessions", icon: Clock },
  { id: 'upcoming-sessions', label: 'Upcoming Sessions', icon: Calendar }
];

export const StudentSidebar: React.FC<StudentSidebarProps> = ({
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
        {/* Brand Header with Official Logo */}
        <div className="p-3.5 border-b border-slate-800 flex items-center gap-2.5">
          <img
            src="./logo.png"
            alt="BITNOVA Logo"
            className="h-9 w-auto object-contain rounded-lg shrink-0"
          />
          <div className="overflow-hidden">
            <h1 className="font-black text-sm tracking-tight text-white leading-none truncate">
              BITNOVA
            </h1>
            <p className="text-[9px] text-blue-400 font-bold tracking-wider uppercase mt-1 truncate">
              ACADEMIC INTELLIGENCE
            </p>
          </div>
        </div>

        {/* Student Profile Mini-Card */}
        <div
          onClick={() => {
            onNavigate('profile');
            onCloseMobile();
          }}
          className="px-4 py-3 bg-[#081324] border-b border-slate-800/80 flex items-center gap-3 cursor-pointer hover:bg-[#0d1f3b] transition-colors"
          title="Click to view full student profile"
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
            <p className="text-[10px] text-slate-400 font-mono truncate">
              {user.rollNumber || '23IT034'} • {user.semester || 'Sem VI'}
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {STUDENT_NAV_ITEMS.map((item) => {
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
                      isActive ? 'text-white' : item.highlight ? 'text-blue-400' : 'text-slate-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'
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
