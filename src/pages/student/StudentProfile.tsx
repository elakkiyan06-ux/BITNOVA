import React, { useState, useRef } from 'react';
import { UserAccount } from '../../types';
import { studentCourses } from '../../data/mockDatabase';
import {
  User,
  GraduationCap,
  Mail,
  Calendar,
  Building2,
  CheckCircle2,
  Camera,
  Upload,
  Trash2,
  Edit3,
  Save,
  Download,
  Phone,
  ShieldCheck,
  X
} from 'lucide-react';

interface StudentProfileProps {
  user: UserAccount;
  onUpdateUser: (updated: Partial<UserAccount>) => void;
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({
  user,
  onUpdateUser,
  onShowToast
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Editable Form State
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [department, setDepartment] = useState(user.department);
  const [batch, setBatch] = useState(user.batch || '2023–2027');
  const [semester, setSemester] = useState(user.semester || 'Semester VI');
  const [phone, setPhone] = useState(user.phone || '+91 98765 43210');
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(user.avatarUrl);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      if (onShowToast) onShowToast('Please upload a valid image file (JPEG, PNG).', 'info');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setAvatarPreview(base64);
      onUpdateUser({ avatarUrl: base64 });
      if (onShowToast) onShowToast('Profile picture updated across BITNOVA.', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(undefined);
    onUpdateUser({ avatarUrl: undefined });
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onShowToast) onShowToast('Profile picture removed. Reverted to default avatar.', 'info');
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name,
      email,
      department,
      batch,
      semester,
      phone,
      avatarUrl: avatarPreview
    });
    setIsEditing(false);
    if (onShowToast) onShowToast('Profile details updated successfully.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Profile Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar with Camera Overlay */}
            <div className="relative group shrink-0">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md ring-2 ring-blue-100"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-navy-900 text-white font-black text-2xl flex items-center justify-center border-4 border-white shadow-md ring-2 ring-blue-100">
                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}

              {/* Upload trigger button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center transition-all cursor-pointer ring-2 ring-white"
                title="Upload Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active Undergraduate Student
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  UID: BIT-{user.rollNumber || '23IT034'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {user.name}
              </h1>
              <p className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" /> {user.department}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Batch {user.batch || '2023–2027'}
                </span>
              </p>
            </div>
          </div>

          {/* Photo Actions & Edit Trigger */}
          <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" /> Upload Photo
            </button>
            {avatarPreview && (
              <button
                onClick={handleRemovePhoto}
                className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                title="Remove Photo"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs ${
                isEditing
                  ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isEditing ? (
                <>
                  <X className="w-3.5 h-3.5" /> Cancel Edit
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Form Modal/Card if isEditing is true */}
      {isEditing && (
        <div className="bg-white rounded-xl border border-blue-200 p-6 shadow-sm space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-blue-600" /> Edit Personal & Academic Details
            </h2>
            <span className="text-xs text-blue-600 font-semibold">Editing Profile</span>
          </div>

          <form onSubmit={handleSaveChanges} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 outline-hidden font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Institution Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 outline-hidden font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 outline-hidden font-medium bg-white"
                >
                  <option value="Information Technology">Information Technology</option>
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Electrical & Electronics">Electrical & Electronics</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 outline-hidden font-medium bg-white"
                >
                  <option value="Semester V">Semester V</option>
                  <option value="Semester VI">Semester VI</option>
                  <option value="Semester VII">Semester VII</option>
                  <option value="Semester VIII">Semester VIII</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Academic Batch</label>
                <input
                  type="text"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 outline-hidden font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Institutional Metadata Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4">
            Curricular Standing
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Current Semester</span>
              <span className="font-bold text-slate-900">{user.semester || 'Semester VI'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Cumulative GPA</span>
              <span className="font-black text-blue-700">{user.cgpa || 8.1} / 10.0</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Total Credits Registered</span>
              <span className="font-bold text-slate-900">21 Credits</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Standing Status</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Good Academic Standing
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4">
            Examination Eligibility
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Overall Attendance</span>
              <span className="font-bold text-slate-900">{user.overall_attendance || 86.4}%</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Internal Marks Average</span>
              <span className="font-bold text-slate-900">{user.internal_average || 78.5}%</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Exam Hall Ticket</span>
              <span className="font-bold text-emerald-600">Provisional Clearance Issued</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Detention Flag</span>
              <span className="font-bold text-emerald-600">Clear (0 Detentions)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4">
            Faculty Mentorship
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Assigned Faculty Mentor</span>
              <span className="font-bold text-slate-900">{user.mentor_name || 'Dr. K. S. Ramanathan'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Mentor Designation</span>
              <span className="font-bold text-slate-900">Professor & Head of Academic Council</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Mentor Department</span>
              <span className="font-bold text-slate-900">Information Technology</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Contact Number</span>
              <span className="font-bold text-blue-700">{user.phone || '+91 98765 43210'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-3">Enrolled Course Registration Schedule</h2>
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Course Code</th>
                <th className="p-3">Course Title</th>
                <th className="p-3">Instructor</th>
                <th className="p-3 text-center">Credits</th>
                <th className="p-3 text-center">Continuous Avg</th>
                <th className="p-3 text-center">Predicted Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {studentCourses.map(course => (
                <tr key={course.code} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-700">{course.code}</td>
                  <td className="p-3 font-medium text-slate-900">{course.name}</td>
                  <td className="p-3 text-slate-600">{course.faculty}</td>
                  <td className="p-3 text-center font-bold text-slate-700">{course.credits}</td>
                  <td className="p-3 text-center font-bold text-slate-900">{course.internal_avg}%</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded font-black text-xs bg-blue-50 text-blue-700 border border-blue-200">
                      {course.predicted_grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
