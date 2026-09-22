import React, { useState } from 'react';
import { UserAccount, NotificationItem } from './types';
import { studentCourses, studentNotifications } from './data/mockDatabase';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { StudentSidebar } from './components/layout/StudentSidebar';
import { StaffSidebar } from './components/layout/StaffSidebar';

// Auth Component
import { LoginView } from './components/auth/LoginView';

// Common Modals & Widgets
import { CourseDetailsModal } from './components/common/CourseDetailsModal';
import { AskFacultyFloatingWidget } from './components/common/AskFacultyFloatingWidget';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Dedicated Settings & Profiles
import { SettingsView } from './pages/SettingsView';
import { StudentProfile } from './pages/student/StudentProfile';
import { FacultyProfileView } from './pages/faculty/FacultyProfileView';

// Student Portal Pages
import { StudentOverview } from './pages/student/StudentOverview';
import { StudentAttendance } from './pages/student/StudentAttendance';
import { StudentCourses } from './pages/student/StudentCourses';
import { StudentPerformance } from './pages/student/StudentPerformance';
import { StudentGradePrediction } from './pages/student/StudentGradePrediction';
import { StudentRisk } from './pages/student/StudentRisk';
import { StudentRecommendations } from './pages/student/StudentRecommendations';
import { StudentSessions } from './pages/student/StudentSessions';

// Faculty / Staff Portal Pages
import { StaffOverview } from './pages/staff/StaffOverview';
import { StaffDepartmentAnalytics } from './pages/staff/StaffDepartmentAnalytics';
import { StaffBatchAnalytics } from './pages/staff/StaffBatchAnalytics';
import { StaffSubjectAnalytics } from './pages/staff/StaffSubjectAnalytics';
import { StaffStudentSearch } from './pages/staff/StaffStudentSearch';
import { StaffAtRiskStudents } from './pages/staff/StaffAtRiskStudents';
import { StaffGradePrediction } from './pages/staff/StaffGradePrediction';
import { StaffRecommendations } from './pages/staff/StaffRecommendations';
import { StaffReports } from './pages/staff/StaffReports';
import { LogOut } from 'lucide-react';

export const App: React.FC = () => {
  // Initial default student demo account
  const defaultStudent: UserAccount = {
    id: '23IT034',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@bitnova.edu',
    role: 'student',
    department: 'Information Technology',
    rollNumber: '23IT034',
    batch: '2023–2027',
    semester: 'Semester 6',
    cgpa: 8.42,
    overall_attendance: 78.4,
    internal_average: 84.6,
    predicted_grade: 'A',
    risk_level: 'MODERATE',
    risk_score: 38,
    mentor_name: 'Dr. Sarah Jenkins',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
    phone: '+91 98401 23456'
  };

  // Authentication & Session State
  const [currentUser, setCurrentUser] = useState<UserAccount>(defaultStudent);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('overview');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  // Modals & Floating State
  const [selectedCourseCode, setSelectedCourseCode] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchTargetRoll, setSearchTargetRoll] = useState<string>('23IT034');

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Handle Login & Registration completion
  const handleLogin = (user: UserAccount) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setCurrentView(user.role === 'student' ? 'overview' : 'staff-overview');
    showToast(`Authenticated into BITNOVA as ${user.name} (${user.role === 'student' ? 'Student Workspace' : 'Faculty Workspace'})`, 'success');
  };

  // Sign out confirmation trigger
  const handleLogoutClick = () => {
    setShowSignOutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowSignOutConfirm(false);
    setIsLoggedIn(false);
    showToast('Signed out of institutional session.', 'info');
  };

  // Handle Profile detail updates (propagates photo and details instantly)
  const handleUpdateUser = (updatedData: Partial<UserAccount>) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...updatedData
    }));
  };

  // Find course object for modal
  const activeCourse = selectedCourseCode
    ? studentCourses.find((c) => c.code === selectedCourseCode) || null
    : null;

  // View Titles map for Top Header
  const viewTitles: Record<string, string> = {
    // Student
    overview: 'Student Academic Overview',
    profile: 'My Student Profile',
    settings: 'Application Settings',
    attendance: 'Attendance Analytics & Regulations',
    courses: 'My Courses & Continuous Marks',
    performance: 'Academic Performance & Competency Radar',
    prediction: 'AI Grade Prediction & Explainability',
    risk: 'My Academic Risk Assessment',
    recommendations: 'Personalized Recommendations',
    'today-sessions': "Today's Academic Sessions",
    'upcoming-sessions': 'Upcoming Academic Sessions',
    // Faculty / Staff
    'staff-overview': 'Academic Affairs Overview',
    'dept-analytics': 'Department Analytics & Benchmarks',
    'batch-analytics': 'Batch Progression Analytics',
    'subject-analytics': 'Performance Analytics & Course Rigor',
    'student-search': 'Individual Student Dossier',
    'at-risk': 'At-Risk Students Requiring Intervention',
    'staff-prediction': 'Grade Prediction Forecaster',
    'staff-recommendations': 'Institutional Policy Directives',
    reports: 'Official Institutional Reports'
  };

  // If user is logged out, render institutional Login / Registration view
  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-[#172033] flex font-sans antialiased">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div
            className={`px-4 py-3 rounded-xl shadow-xl border text-xs font-semibold flex items-center gap-2.5 max-w-md ${
              toast.type === 'success'
                ? 'bg-[#0B1B33] text-white border-emerald-500'
                : 'bg-[#0B1B33] text-white border-blue-500'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                toast.type === 'success' ? 'bg-emerald-400 animate-pulse' : 'bg-blue-400'
              }`}
            />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Role-Based Sidebar Navigation (STRICT role segregation, NO role switcher!) */}
      {currentUser.role === 'student' ? (
        <StudentSidebar
          currentView={currentView}
          user={currentUser}
          onNavigate={(viewId) => {
            setCurrentView(viewId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogoutClick={handleLogoutClick}
          isMobileOpen={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
        />
      ) : (
        <StaffSidebar
          currentView={currentView}
          user={currentUser}
          onNavigate={(viewId) => {
            setCurrentView(viewId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogoutClick={handleLogoutClick}
          isMobileOpen={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* Main Workspace Container */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Top Navbar */}
        <Navbar
          user={currentUser}
          title={viewTitles[currentView] || 'Academic Intelligence'}
          onToggleMobileMenu={() => setIsMobileNavOpen(!isMobileNavOpen)}
          onNavigate={(viewId) => {
            setCurrentView(viewId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogoutClick={handleLogoutClick}
          notifications={studentNotifications}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto pb-20">
          {/* ========================================================= */}
          {/* STUDENT WORKSPACE VIEWS                                  */}
          {/* ========================================================= */}
          {currentUser.role === 'student' && (
            <>
              {currentView === 'overview' && (
                <StudentOverview
                  user={currentUser}
                  onNavigate={(v) => setCurrentView(v)}
                  onOpenCourseModal={(code) => setSelectedCourseCode(code)}
                />
              )}
              {currentView === 'profile' && (
                <StudentProfile
                  user={currentUser}
                  onUpdateUser={handleUpdateUser}
                  onShowToast={showToast}
                />
              )}
              {currentView === 'settings' && (
                <SettingsView
                  role="student"
                  onShowToast={showToast}
                />
              )}
              {currentView === 'attendance' && <StudentAttendance />}
              {currentView === 'courses' && (
                <StudentCourses
                  onOpenCourseModal={(code) => setSelectedCourseCode(code)}
                />
              )}
              {currentView === 'performance' && (
                <StudentPerformance onNavigate={(v) => setCurrentView(v)} />
              )}
              {currentView === 'prediction' && <StudentGradePrediction />}
              {currentView === 'risk' && (
                <StudentRisk onNavigate={(v) => setCurrentView(v)} />
              )}
              {currentView === 'recommendations' && (
                <StudentRecommendations
                  onNavigate={(v) => setCurrentView(v)}
                  onShowToast={showToast}
                />
              )}
              {currentView === 'today-sessions' && (
                <StudentSessions
                  onOpenCourseModal={(code) => setSelectedCourseCode(code)}
                />
              )}
              {currentView === 'upcoming-sessions' && (
                <StudentSessions
                  onOpenCourseModal={(code) => setSelectedCourseCode(code)}
                />
              )}
            </>
          )}

          {/* ========================================================= */}
          {/* FACULTY WORKSPACE VIEWS                                  */}
          {/* ========================================================= */}
          {currentUser.role === 'faculty' && (
            <>
              {currentView === 'staff-overview' && (
                <StaffOverview
                  onNavigate={(v) => setCurrentView(v)}
                  onSelectStudent={(roll) => {
                    setSearchTargetRoll(roll);
                    setCurrentView('student-search');
                  }}
                />
              )}
              {currentView === 'profile' && (
                <FacultyProfileView
                  user={currentUser}
                  onUpdateUser={handleUpdateUser}
                  onShowToast={showToast}
                />
              )}
              {currentView === 'settings' && (
                <SettingsView
                  role="faculty"
                  onShowToast={showToast}
                />
              )}
              {currentView === 'dept-analytics' && <StaffDepartmentAnalytics />}
              {currentView === 'batch-analytics' && <StaffBatchAnalytics />}
              {currentView === 'subject-analytics' && (
                <StaffSubjectAnalytics
                  onScheduleRemedial={(subject) => {
                    showToast(`Remedial sessions configured for ${subject}`, 'success');
                    setCurrentView('staff-recommendations');
                  }}
                />
              )}
              {currentView === 'student-search' && (
                <StaffStudentSearch
                  initialRoll={searchTargetRoll}
                  onShowToast={showToast}
                />
              )}
              {currentView === 'at-risk' && (
                <StaffAtRiskStudents
                  onSelectStudent={(roll) => {
                    setSearchTargetRoll(roll);
                    setCurrentView('student-search');
                  }}
                  onShowToast={showToast}
                />
              )}
              {currentView === 'staff-prediction' && <StaffGradePrediction />}
              {currentView === 'staff-recommendations' && (
                <StaffRecommendations
                  onNavigate={(v) => setCurrentView(v)}
                  onShowToast={showToast}
                />
              )}
              {currentView === 'reports' && <StaffReports onShowToast={showToast} />}
            </>
          )}
        </main>
      </div>

      {/* Floating Ask Faculty Launcher (Student Portal only) */}
      {currentUser.role === 'student' && (
        <AskFacultyFloatingWidget onShowToast={showToast} />
      )}

      {/* Course Details Modal */}
      {selectedCourseCode && (
        <CourseDetailsModal
          course={activeCourse}
          onClose={() => setSelectedCourseCode(null)}
          onRunPrediction={() => {
            setSelectedCourseCode(null);
            setCurrentView('prediction');
          }}
        />
      )}

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCourse={(code) => {
          setSelectedCourseCode(code);
        }}
        onSelectStudent={(roll) => {
          setSearchTargetRoll(roll);
          if (currentUser.role === 'faculty') {
            setCurrentView('student-search');
          }
        }}
        onNavigate={(viewId) => {
          setCurrentView(viewId);
        }}
      />

      {/* Institutional Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 z-50 bg-[#0B1B33]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-xl bg-[#FEF2F2] border border-red-200 text-[#DC2626] flex items-center justify-center mb-4">
              <LogOut className="w-6 h-6 text-[#DC2626]" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Sign Out of BITNOVA</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Are you sure you want to terminate your active institutional session for{' '}
              <strong className="text-slate-900">{currentUser.name}</strong> (
              {currentUser.role === 'student' ? currentUser.rollNumber : currentUser.facultyId})? You will return to the authentication portal.
            </p>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowSignOutConfirm(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Confirm Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
