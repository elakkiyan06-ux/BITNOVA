import React from 'react';
import { Menu } from 'lucide-react';

interface TopbarProps {
  title: string;
  selectedDept: string;
  onDeptChange: (dept: string) => void;
  onOpenMobileNav: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  title,
  selectedDept,
  onDeptChange,
  onOpenMobileNav
}) => {
  return (
    <header className="h-14 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & Current Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="lg:hidden p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
          {title}
        </h2>
      </div>

      {/* Right: Academic Year & Department */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded">
          <span className="text-slate-500 font-medium">Academic Year:</span>
          <span className="font-semibold text-slate-800">2026–27</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 font-medium hidden sm:inline">Department:</span>
          <select
            value={selectedDept}
            onChange={(e) => onDeptChange(e.target.value)}
            className="portal-input py-1 text-xs font-medium"
          >
            <option value="All Departments">All Departments</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Computer Science & Engineering">Computer Science &amp; Eng</option>
            <option value="Electronics & Communication">Electronics &amp; Comm</option>
            <option value="Electrical & Electronics">Electrical &amp; Electronics</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>
        </div>
      </div>
    </header>
  );
};
