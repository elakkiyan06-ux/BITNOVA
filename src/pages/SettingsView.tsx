import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  Eye,
  Sliders,
  Lock,
  Key,
  Smartphone,
  CheckCircle2,
  Save,
  Moon,
  Sun,
  Laptop,
  Mail,
  UserCheck
} from 'lucide-react';

interface SettingsViewProps {
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
  role: 'student' | 'faculty';
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onShowToast, role }) => {
  const [activeTab, setActiveTab] = useState<'ACCOUNT' | 'APPEARANCE' | 'NOTIFICATIONS' | 'PRIVACY' | 'SECURITY'>('ACCOUNT');

  // Account settings
  const [digestFrequency, setDigestFrequency] = useState('Daily Digest');
  const [sessionTimeout, setSessionTimeout] = useState('30 minutes');
  const [rememberLogin, setRememberLogin] = useState(true);

  // Appearance settings
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [highContrastCharts, setHighContrastCharts] = useState(false);

  // Notification toggles
  const [notifyAttendanceAlerts, setNotifyAttendanceAlerts] = useState(true);
  const [notifyGradePredictions, setNotifyGradePredictions] = useState(true);
  const [notifyRiskAlerts, setNotifyRiskAlerts] = useState(true);
  const [notifyRecommendations, setNotifyRecommendations] = useState(true);
  const [notifyEmailDigest, setNotifyEmailDigest] = useState(true);

  // Privacy toggles
  const [profileVisibility, setProfileVisibility] = useState('department');
  const [shareAnonymousAnalytics, setShareAnonymousAnalytics] = useState(true);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleSavePreferences = () => {
    if (onShowToast) {
      onShowToast('Institutional preferences saved successfully.', 'success');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    if (newPassword !== confirmPassword) {
      if (onShowToast) onShowToast('New passwords do not match.', 'info');
      return;
    }
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    if (onShowToast) {
      onShowToast('Account password updated successfully.', 'success');
    }
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" /> System Preferences & Security Console
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Application Settings
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Configure your institutional account preferences, notification rules, visual layout, and security sessions.
          </p>
        </div>

        <button
          onClick={handleSavePreferences}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Preferences
        </button>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex bg-slate-200/80 p-1 rounded-xl gap-1 text-xs font-semibold text-slate-600 overflow-x-auto">
        <button
          onClick={() => setActiveTab('ACCOUNT')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'ACCOUNT' ? 'bg-white text-blue-700 shadow-xs font-bold' : 'hover:text-slate-900'
          }`}
        >
          <Mail className="w-3.5 h-3.5" /> Account
        </button>
        <button
          onClick={() => setActiveTab('APPEARANCE')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'APPEARANCE' ? 'bg-white text-blue-700 shadow-xs font-bold' : 'hover:text-slate-900'
          }`}
        >
          <Sun className="w-3.5 h-3.5" /> Appearance
        </button>
        <button
          onClick={() => setActiveTab('NOTIFICATIONS')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'NOTIFICATIONS' ? 'bg-white text-blue-700 shadow-xs font-bold' : 'hover:text-slate-900'
          }`}
        >
          <Bell className="w-3.5 h-3.5" /> Notifications
        </button>
        <button
          onClick={() => setActiveTab('PRIVACY')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'PRIVACY' ? 'bg-white text-blue-700 shadow-xs font-bold' : 'hover:text-slate-900'
          }`}
        >
          <Eye className="w-3.5 h-3.5" /> Privacy
        </button>
        <button
          onClick={() => setActiveTab('SECURITY')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'SECURITY' ? 'bg-white text-blue-700 shadow-xs font-bold' : 'hover:text-slate-900'
          }`}
        >
          <Shield className="w-3.5 h-3.5" /> Security
        </button>
      </div>

      {/* Tab 1: Account Preferences */}
      {activeTab === 'ACCOUNT' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Session & Email Preferences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Academic Digest Frequency</label>
                <select
                  value={digestFrequency}
                  onChange={(e) => setDigestFrequency(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 bg-slate-50 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                >
                  <option value="Instant Notification">Instant Push Notification</option>
                  <option value="Daily Digest">Daily Summary Digest (06:00 PM)</option>
                  <option value="Weekly Summary">Weekly Summary (Mondays)</option>
                </select>
                <p className="text-[11px] text-slate-600 mt-1">Controls batching of continuous internal test score alerts.</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Inactivity Auto-Lock Timeout</label>
                <select
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 bg-slate-50 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                >
                  <option value="15 minutes">15 minutes</option>
                  <option value="30 minutes">30 minutes (Recommended)</option>
                  <option value="1 hour">1 hour</option>
                  <option value="Never">Never during active day</option>
                </select>
                <p className="text-[11px] text-slate-600 mt-1">Required for FERPA / Institutional data governance compliance.</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Persistent Institutional Session</p>
                <p className="text-[11px] text-slate-600">Keep session active on trusted university devices.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberLogin}
                  onChange={(e) => setRememberLogin(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Appearance */}
      {activeTab === 'APPEARANCE' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Theme & Color Mode</h2>
            <p className="text-xs text-slate-600 mb-4">Choose visual color treatment for institutional portals.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={() => setTheme('light')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  theme === 'light'
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Sun className="w-5 h-5 text-blue-600" />
                  {theme === 'light' && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
                <h3 className="font-bold text-sm text-slate-900">Light Institutional</h3>
                <p className="text-xs text-slate-600 mt-1">High-contrast white cards, deep navy sidebar, and cool gray canvas.</p>
              </div>

              <div
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Moon className="w-5 h-5 text-slate-700" />
                  {theme === 'dark' && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
                <h3 className="font-bold text-sm text-slate-900">Dark Navy Mode</h3>
                <p className="text-xs text-slate-600 mt-1">Midnight blue backgrounds tailored for low-light examination reading.</p>
              </div>

              <div
                onClick={() => setTheme('system')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  theme === 'system'
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Laptop className="w-5 h-5 text-slate-700" />
                  {theme === 'system' && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
                <h3 className="font-bold text-sm text-slate-900">System Sync</h3>
                <p className="text-xs text-slate-600 mt-1">Automatically match your operating system theme settings.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 mb-1">Layout Density</h2>
            <div className="flex gap-4 mt-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="density"
                  value="comfortable"
                  checked={density === 'comfortable'}
                  onChange={() => setDensity('comfortable')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="font-semibold text-slate-800">Comfortable (Generous spacing & larger metrics)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="density"
                  value="compact"
                  checked={density === 'compact'}
                  onChange={() => setDensity('compact')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="font-semibold text-slate-800">Compact (Data-dense table view)</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === 'NOTIFICATIONS' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            Automated Academic Early Warning Notifications
          </h2>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Attendance Deficit Alerts (&lt; 75%)</p>
                <p className="text-slate-600">Immediate critical alerts whenever contact hours fall below examination threshold.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyAttendanceAlerts}
                  onChange={(e) => setNotifyAttendanceAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">AI Grade Prediction Updates</p>
                <p className="text-slate-600">Notify when continuous test marks trigger a change in forecasted end-semester grade.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyGradePredictions}
                  onChange={(e) => setNotifyGradePredictions(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">High Attrition & Vulnerability Alerts</p>
                <p className="text-slate-600">Alerts when individual subject performance enters the high-risk zone.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyRiskAlerts}
                  onChange={(e) => setNotifyRiskAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Personalized Remedial Action Advisories</p>
                <p className="text-slate-600">Weekly machine recommendations for tutorial sessions, question practice, and mentoring.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyRecommendations}
                  onChange={(e) => setNotifyRecommendations(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Privacy */}
      {activeTab === 'PRIVACY' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            Privacy & Academic Profile Visibility
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-800 mb-2">Profile & Rank Visibility</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="department"
                    checked={profileVisibility === 'department'}
                    onChange={() => setProfileVisibility('department')}
                    className="text-blue-600"
                  />
                  <span>Visible to Department Faculty & Assigned Class Advisor (Standard)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="institutional"
                    checked={profileVisibility === 'institutional'}
                    onChange={() => setProfileVisibility('institutional')}
                    className="text-blue-600"
                  />
                  <span>Campus-wide Academic Affairs & Placement Cell Access</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shareAnonymousAnalytics}
                  onChange={(e) => setShareAnonymousAnalytics(e.target.checked)}
                  className="mt-0.5 text-blue-600 rounded"
                />
                <div>
                  <span className="font-bold text-slate-800">Contribute to Anonymized Institutional Analytics</span>
                  <p className="text-slate-600 mt-0.5">
                    Allows de-identified continuous marks to train department grade prediction models.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Security */}
      {activeTab === 'SECURITY' && (
        <div className="space-y-6">
          {/* Password Change Form */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">Change Account Password</h2>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs max-w-lg">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Institutional Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password..."
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters with numbers & symbols..."
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password..."
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 outline-hidden"
                  required
                />
              </div>

              {passwordSuccess && (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Password updated successfully.
                </div>
              )}

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Active Login Sessions</h2>
                <p className="text-xs text-slate-600">Devices currently authenticated into this BITNOVA account</p>
              </div>

              <button
                onClick={() => onShowToast && onShowToast('Terminated all remote sessions.', 'info')}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Sign Out From Other Devices
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Laptop className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900">Windows 11 &bull; Google Chrome (Desktop)</p>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Current Session
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">IP: 192.168.1.104 &bull; Department Network TT-Lab</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 font-bold">Active Now</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="font-bold text-slate-800">Mobile Device &bull; Safari iOS</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">Last active: Yesterday at 08:45 PM</p>
                  </div>
                </div>
                <span className="text-slate-600 text-[11px]">Logged in</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
