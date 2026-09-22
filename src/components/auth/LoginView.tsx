import React, { useState } from 'react';
import {
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  Building2,
  BookOpen,
  TrendingUp,
  Award,
  Sparkles,
  Camera,
  Trash2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UserAccount, Role } from '../../types';

interface LoginViewProps {
  onLogin: (user: UserAccount) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  // Mode: 'signin' | 'register'
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  
  // Registration Role Selection: ONLY in registration
  const [selectedRegRole, setSelectedRegRole] = useState<Role>('student');

  // Sign In fields
  const [identifier, setIdentifier] = useState('rahul.kumar@bitnova.edu');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Student Registration fields
  const [studentFullName, setStudentFullName] = useState('');
  const [studentRollNo, setStudentRollNo] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentDept, setStudentDept] = useState('Information Technology');
  const [studentBatch, setStudentBatch] = useState('2023–2027');
  const [studentSemester, setStudentSemester] = useState('Semester 6');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentConfirmPassword, setStudentConfirmPassword] = useState('');
  const [studentAvatarUrl, setStudentAvatarUrl] = useState<string | null>(null);

  // Faculty Registration fields
  const [facultyFullName, setFacultyFullName] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [facultyEmail, setFacultyEmail] = useState('');
  const [facultyDept, setFacultyDept] = useState('Information Technology');
  const [facultyDesignation, setFacultyDesignation] = useState('Associate Professor & Exam Coordinator');
  const [facultyPassword, setFacultyPassword] = useState('');
  const [facultyConfirmPassword, setFacultyConfirmPassword] = useState('');
  const [facultyAvatarUrl, setFacultyAvatarUrl] = useState<string | null>(null);

  // Photo upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, isStudent: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('File size exceeds 3MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (isStudent) {
          setStudentAvatarUrl(result);
        } else {
          setFacultyAvatarUrl(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Sign In submit
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const lowerId = identifier.trim().toLowerCase();

    // Determine role by email/identifier heuristics or fallback
    if (
      lowerId.includes('faculty') ||
      lowerId.includes('prof') ||
      lowerId.includes('sarah') ||
      lowerId.includes('staff') ||
      lowerId.includes('coordinator') ||
      lowerId.includes('fac-')
    ) {
      // Sign in as Faculty
      const facultyUser: UserAccount = {
        id: 'FAC-IT-409',
        name: 'Dr. Sarah Jenkins',
        email: identifier || 'sarah.jenkins@bitnova.edu',
        role: 'faculty',
        department: 'Information Technology',
        facultyId: 'FAC-IT-409',
        designation: 'Associate Professor & Exam Coordinator',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
        phone: '+91 (044) 2741-7890'
      };
      onLogin(facultyUser);
    } else {
      // Default to Student (Rahul Kumar or custom entered)
      const isRahul = lowerId.includes('rahul') || lowerId.includes('23it034');
      const studentUser: UserAccount = {
        id: isRahul ? '23IT034' : 'STU-' + Math.floor(1000 + Math.random() * 9000),
        name: isRahul ? 'Rahul Kumar' : identifier.split('@')[0] || 'Rahul Kumar',
        email: identifier || 'rahul.kumar@bitnova.edu',
        role: 'student',
        department: 'Information Technology',
        rollNumber: isRahul ? '23IT034' : '23IT099',
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
      onLogin(studentUser);
    }
  };

  // Demo Student Fast Login
  const handleQuickStudentLogin = () => {
    const studentUser: UserAccount = {
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
    onLogin(studentUser);
  };

  // Demo Faculty Fast Login
  const handleQuickFacultyLogin = () => {
    const facultyUser: UserAccount = {
      id: 'FAC-IT-409',
      name: 'Dr. Sarah Jenkins',
      email: 'sarah.jenkins@bitnova.edu',
      role: 'faculty',
      department: 'Information Technology',
      facultyId: 'FAC-IT-409',
      designation: 'Associate Professor & Exam Coordinator',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
      phone: '+91 (044) 2741-7890'
    };
    onLogin(facultyUser);
  };

  // Student Registration Submit
  const handleStudentRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentFullName || !studentEmail || !studentRollNo) {
      setLoginError('Please complete all required fields.');
      return;
    }
    if (studentPassword && studentConfirmPassword && studentPassword !== studentConfirmPassword) {
      setLoginError('Passwords do not match. Please verify.');
      return;
    }

    const newStudent: UserAccount = {
      id: studentRollNo.trim().toUpperCase(),
      name: studentFullName.trim(),
      email: studentEmail.trim(),
      role: 'student',
      department: studentDept,
      rollNumber: studentRollNo.trim().toUpperCase(),
      batch: studentBatch,
      semester: studentSemester,
      cgpa: 8.25,
      overall_attendance: 82.0,
      internal_average: 80.5,
      predicted_grade: 'A',
      risk_level: 'LOW',
      risk_score: 22,
      mentor_name: 'Dr. Sarah Jenkins',
      avatarUrl: studentAvatarUrl || undefined,
      phone: '+91 98400 00000'
    };

    onLogin(newStudent);
  };

  // Faculty Registration Submit
  const handleFacultyRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facultyFullName || !facultyEmail || !facultyId) {
      setLoginError('Please complete all required fields.');
      return;
    }
    if (facultyPassword && facultyConfirmPassword && facultyPassword !== facultyConfirmPassword) {
      setLoginError('Passwords do not match. Please verify.');
      return;
    }

    const newFaculty: UserAccount = {
      id: facultyId.trim().toUpperCase(),
      name: facultyFullName.trim(),
      email: facultyEmail.trim(),
      role: 'faculty',
      department: facultyDept,
      facultyId: facultyId.trim().toUpperCase(),
      designation: facultyDesignation,
      avatarUrl: facultyAvatarUrl || undefined,
      phone: '+91 98400 11111'
    };

    onLogin(newFaculty);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F4F7FB] text-[#172033] font-sans antialiased">
      {/* ========================================================= */}
      {/* LEFT SIDE: INSTITUTIONAL BRANDING & VISUAL TREATMENT      */}
      {/* ========================================================= */}
      <div className="w-full lg:w-1/2 bg-[#0B1B33] text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 relative overflow-hidden border-r border-[#1E293B]">
        {/* Subtle geometric background grid and glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#1E3A8A_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#1D4ED8]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Branding Section */}
        <div className="relative z-10">
          <div className="flex items-center gap-3.5 mb-3">
            {/* BITNOVA Institutional Logo: Minimal graduation cap + data analytics node */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center shadow-lg shadow-blue-900/40 border border-blue-400/30">
              <div className="relative">
                <GraduationCap className="w-7 h-7 text-white" />
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#0B1B33]" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                BITNOVA
              </h1>
              <p className="text-[11px] font-bold tracking-widest text-blue-300 uppercase">
                ACADEMIC INTELLIGENCE
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 font-medium max-w-md mt-4 leading-relaxed">
            Examination Analytics &amp; Academic Performance Platform
          </p>
        </div>

        {/* Center Graphic: Academic Data Visualization Illustration */}
        <div className="relative z-10 my-10 max-w-md w-full">
          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold text-slate-200">Institutional Performance Telemetry</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30">
                AY 2026–27
              </span>
            </div>

            {/* Metric snapshot preview bars */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                  <span>Continuous Assessment Pass Probability</span>
                  <span className="font-bold text-white">92.4%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-[92.4%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                  <span>Examination Risk Mitigation Rate</span>
                  <span className="font-bold text-emerald-400">+14.2%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[84%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                  <span>ML Grade Prediction Precision</span>
                  <span className="font-bold text-white">96.8%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full w-[96.8%]" />
                </div>
              </div>
            </div>

            {/* Academic highlights row */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
              <div className="p-2 rounded-lg bg-white/[0.03]">
                <p className="text-[10px] text-slate-400">Batches</p>
                <p className="text-xs font-bold text-white">2023–27</p>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03]">
                <p className="text-[10px] text-slate-400">Departments</p>
                <p className="text-xs font-bold text-white">8 Active</p>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03]">
                <p className="text-[10px] text-slate-400">Framework</p>
                <p className="text-xs font-bold text-emerald-400">Outcome OBE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Institutional Authentication Portal</span>
          </div>
          <span>v2.8.4 • ISO 27001</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT SIDE: AUTHENTICATION / REGISTRATION CARD            */}
      {/* ========================================================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Top Banner Alert (Critical Warning / Error if any) */}
          {loginError && (
            <div className="mb-5 p-3.5 bg-[#FEF2F2] border border-[#DC2626]/30 rounded-xl flex items-start gap-2.5 text-[#DC2626] text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#DC2626]" />
              <span className="font-semibold">{loginError}</span>
            </div>
          )}

          {mode === 'signin' ? (
            /* =================================================== */
            /* 1. SIGN IN VIEW                                     */
            /* =================================================== */
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-[#172033] tracking-tight">
                  Welcome to BITNOVA
                </h2>
                <p className="text-xs text-[#64748B] mt-1 font-medium">
                  Sign in to continue to your academic workspace.
                </p>
              </div>

              <form onSubmit={handleSignInSubmit} className="space-y-4">
                {/* Institution Email / Username */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Institution Email / Roll No / Faculty ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#172033] bg-white focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                      placeholder="e.g. rahul.kumar@bitnova.edu or 23IT034"
                      required
                    />
                  </div>
                </div>

                {/* Password with show/hide toggle */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Please contact the Institutional IT Helpdesk at helpdesk@bitnova.edu to reset your credential.')}
                      className="text-[11px] font-bold text-[#2563EB] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#172033] bg-white focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <span>Remember me on this institutional device</span>
                  </label>
                </div>

                {/* Primary Sign In Button (BLUE) */}
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-[11px] uppercase">
                    <span className="bg-white px-2 text-slate-400 font-bold tracking-wider">
                      Demo Quick Access
                    </span>
                  </div>
                </div>

                {/* One-Click Demo Access buttons for judge convenience */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleQuickStudentLogin}
                    className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      <span>Sign in as Student (Rahul Kumar • 23IT034)</span>
                    </div>
                    <span className="text-[10px] text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded font-bold">
                      Student
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickFacultyLogin}
                    className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-navy-800" />
                      <span>Sign in as Faculty (Dr. Sarah Jenkins • Coord)</span>
                    </div>
                    <span className="text-[10px] text-slate-700 bg-slate-200 px-1.5 py-0.5 rounded font-bold">
                      Faculty
                    </span>
                  </button>
                </div>

                {/* Registration entry link */}
                <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
                  <span>New to BITNOVA? </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setLoginError(null);
                    }}
                    className="font-bold text-[#2563EB] hover:underline cursor-pointer"
                  >
                    Create an account
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* =================================================== */
            /* 2. REGISTRATION VIEW                                */
            /* =================================================== */
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-black text-[#172033] tracking-tight">
                  Create your BITNOVA account
                </h2>
                <p className="text-xs text-[#64748B] mt-1 font-medium">
                  Establish your academic identity to access the institutional workspace.
                </p>
              </div>

              {/* Role Selection: ONLY during registration! */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRegRole('student');
                      setLoginError(null);
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      selectedRegRole === 'student'
                        ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] font-bold shadow-sm ring-1 ring-[#2563EB]'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 font-semibold'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-xs">Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRegRole('faculty');
                      setLoginError(null);
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      selectedRegRole === 'faculty'
                        ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] font-bold shadow-sm ring-1 ring-[#2563EB]'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 font-semibold'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-xs">Faculty</span>
                  </button>
                </div>
              </div>

              {selectedRegRole === 'student' ? (
                /* ---------------- Student Registration Form ---------------- */
                <form onSubmit={handleStudentRegistrationSubmit} className="space-y-3">
                  <div className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1 flex items-center justify-between">
                    <span>Student Registration</span>
                    <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Student Workspace</span>
                  </div>

                  {/* Profile Picture Upload */}
                  <div className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0">
                      {studentAvatarUrl ? (
                        <img src={studentAvatarUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-bold text-slate-700">Profile Picture (Optional)</p>
                      <div className="flex items-center gap-2 mt-1">
                        <label className="text-[10px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 px-2.5 py-1 rounded cursor-pointer transition-colors flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, true)}
                            className="hidden"
                          />
                        </label>
                        {studentAvatarUrl && (
                          <button
                            type="button"
                            onClick={() => setStudentAvatarUrl(null)}
                            className="text-[10px] font-bold text-[#DC2626] hover:bg-red-50 px-2 py-1 rounded transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={studentFullName}
                        onChange={(e) => setStudentFullName(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#2563EB]"
                        placeholder="e.g. Rahul Kumar"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Roll Number *</label>
                      <input
                        type="text"
                        value={studentRollNo}
                        onChange={(e) => setStudentRollNo(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#2563EB]"
                        placeholder="e.g. 23IT034"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Institution Email *</label>
                    <input
                      type="email"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full p-2 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#2563EB]"
                      placeholder="student@bitnova.edu"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Department</label>
                      <select
                        value={studentDept}
                        onChange={(e) => setStudentDept(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg text-[11px] font-semibold text-slate-900 focus:outline-none focus:border-[#2563EB]"
                      >
                        <option value="Information Technology">IT</option>
                        <option value="Computer Science & Engineering">CSE</option>
                        <option value="Electronics & Communication">ECE</option>
                        <option value="Electrical & Electronics">EEE</option>
                        <option value="Mechanical Engineering">MECH</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Batch</label>
                      <input
                        type="text"
                        value={studentBatch}
                        onChange={(e) => setStudentBatch(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg text-[11px] font-semibold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Semester</label>
                      <select
                        value={studentSemester}
                        onChange={(e) => setStudentSemester(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg text-[11px] font-semibold text-slate-900"
                      >
                        <option value="Semester 1">Sem 1</option>
                        <option value="Semester 2">Sem 2</option>
                        <option value="Semester 3">Sem 3</option>
                        <option value="Semester 4">Sem 4</option>
                        <option value="Semester 5">Sem 5</option>
                        <option value="Semester 6">Sem 6</option>
                        <option value="Semester 7">Sem 7</option>
                        <option value="Semester 8">Sem 8</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Password *</label>
                      <input
                        type="password"
                        value={studentPassword}
                        onChange={(e) => setStudentPassword(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-slate-900"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Confirm Password *</label>
                      <input
                        type="password"
                        value={studentConfirmPassword}
                        onChange={(e) => setStudentConfirmPassword(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-slate-900"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 mt-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Create Student Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* ---------------- Faculty Registration Form ---------------- */
                <form onSubmit={handleFacultyRegistrationSubmit} className="space-y-3">
                  <div className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1 flex items-center justify-between">
                    <span>Faculty Registration</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Faculty Workspace</span>
                  </div>

                  {/* Profile Picture Upload */}
                  <div className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0">
                      {facultyAvatarUrl ? (
                        <img src={facultyAvatarUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ShieldCheck className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-bold text-slate-700">Profile Picture (Optional)</p>
                      <div className="flex items-center gap-2 mt-1">
                        <label className="text-[10px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 px-2.5 py-1 rounded cursor-pointer transition-colors flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, false)}
                            className="hidden"
                          />
                        </label>
                        {facultyAvatarUrl && (
                          <button
                            type="button"
                            onClick={() => setFacultyAvatarUrl(null)}
                            className="text-[10px] font-bold text-[#DC2626] hover:bg-red-50 px-2 py-1 rounded transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={facultyFullName}
                        onChange={(e) => setFacultyFullName(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#2563EB]"
                        placeholder="e.g. Dr. Sarah Jenkins"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Faculty ID *</label>
                      <input
                        type="text"
                        value={facultyId}
                        onChange={(e) => setFacultyId(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#2563EB]"
                        placeholder="e.g. FAC-IT-409"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Institution Email *</label>
                    <input
                      type="email"
                      value={facultyEmail}
                      onChange={(e) => setFacultyEmail(e.target.value)}
                      className="w-full p-2 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#2563EB]"
                      placeholder="faculty@bitnova.edu"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Department</label>
                      <select
                        value={facultyDept}
                        onChange={(e) => setFacultyDept(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-slate-900"
                      >
                        <option value="Information Technology">Information Technology</option>
                        <option value="Computer Science & Engineering">Computer Science &amp; Eng</option>
                        <option value="Electronics & Communication">Electronics &amp; Comm</option>
                        <option value="Electrical & Electronics">Electrical &amp; Electronics</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Designation</label>
                      <input
                        type="text"
                        value={facultyDesignation}
                        onChange={(e) => setFacultyDesignation(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-slate-900"
                        placeholder="e.g. Associate Professor"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Password *</label>
                      <input
                        type="password"
                        value={facultyPassword}
                        onChange={(e) => setFacultyPassword(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-slate-900"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Confirm Password *</label>
                      <input
                        type="password"
                        value={facultyConfirmPassword}
                        onChange={(e) => setFacultyConfirmPassword(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-slate-900"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 mt-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Create Faculty Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Back to Sign In */}
              <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-600 mt-4">
                <span>Already have an account? </span>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setLoginError(null);
                  }}
                  className="font-bold text-[#2563EB] hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
