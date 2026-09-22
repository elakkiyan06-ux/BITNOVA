import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { UserAccount, NotificationItem } from '../../types';

interface NavbarProps {
  user: UserAccount;
  title: string;
  onToggleMobileMenu: () => void;
  onNavigate: (view: string) => void;
  onLogoutClick: () => void;
  notifications: NotificationItem[];
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  title,
  onToggleMobileMenu,
  onNavigate,
  onLogoutClick,
  notifications,
  onOpenSearch
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[#172033] tracking-tight">
              {title}
            </h2>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                user.role === 'student'
                  ? 'bg-[#EFF6FF] text-[#2563EB] border-[#2563EB]/20'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              {user.role === 'student' ? 'Student Portal' : 'Faculty Portal'}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Academic Year, Semester Selector, Search, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* Academic Year Selector: AY: 2026–27 */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F4F7FB] border border-[#E2E8F0] rounded-lg text-xs font-semibold text-slate-700">
          <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>AY: 2026–27</span>
          <span className="text-slate-300">|</span>
          <span className="text-[#172033] font-bold">
            {user.role === 'student' ? (user.semester || 'Sem VI') : 'Even Sem'}
          </span>
        </div>

        {/* Global Search trigger */}
        {onOpenSearch && (
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#F4F7FB] hover:bg-slate-100 text-slate-500 border border-[#E2E8F0] text-xs w-28 sm:w-48 justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">Search records...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white text-[10px] text-slate-400 border border-slate-200 font-mono">
              /
            </kbd>
          </button>
        )}

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-[#172033] transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#DC2626] text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 overflow-hidden text-xs">
              <div className="p-3 border-b border-slate-100 bg-[#F4F7FB] flex items-center justify-between">
                <span className="font-bold text-[#172033]">Academic Notifications</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                  {unreadCount} unread
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-[#F4F7FB] transition-colors">
                    <p className="font-bold text-[#172033] mb-0.5">{n.title}</p>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{n.message}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block font-medium">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & User Information */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 sm:px-2 py-1 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors"
          >
            {/* Circular Profile Avatar Image */}
            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#0B1B33] text-white font-bold text-xs flex items-center justify-center">
                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-[#172033] leading-tight">
                {user.name}
              </p>
              <p className="text-[10px] text-[#64748B] font-medium leading-none mt-0.5">
                {user.role === 'student'
                  ? `${user.rollNumber || '23IT034'} • ${user.department || 'IT'}`
                  : `${user.facultyId || 'Faculty'} • ${user.designation || user.department || 'IT'}`}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Profile Dropdown: strictly My Profile, Settings, Sign Out. NO role switching! */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 py-1.5 text-xs">
              <div className="px-3.5 py-2 border-b border-slate-100 lg:hidden">
                <p className="font-bold text-[#172033]">{user.name}</p>
                <p className="text-[11px] text-[#64748B]">
                  {user.role === 'student' ? user.rollNumber : user.facultyId}
                </p>
              </div>

              <button
                onClick={() => {
                  onNavigate('profile');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3.5 py-2.5 hover:bg-[#F4F7FB] flex items-center gap-2.5 text-slate-700 font-semibold cursor-pointer transition-colors"
              >
                <User className="w-4 h-4 text-[#2563EB]" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('settings');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3.5 py-2.5 hover:bg-[#F4F7FB] flex items-center gap-2.5 text-slate-700 font-semibold cursor-pointer transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-500" />
                <span>Settings</span>
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onLogoutClick();
                }}
                className="w-full text-left px-3.5 py-2.5 hover:bg-[#FEF2F2] text-[#DC2626] font-semibold flex items-center gap-2.5 cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4 text-[#DC2626]" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
