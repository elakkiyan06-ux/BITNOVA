import React, { useState, useRef } from 'react';
import { UserAccount } from '../../types';
import {
  User,
  Building2,
  Mail,
  Phone,
  Briefcase,
  Camera,
  Upload,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  Award,
  BookOpen,
  X
} from 'lucide-react';

interface FacultyProfileProps {
  user: UserAccount;
  onUpdateUser: (updated: Partial<UserAccount>) => void;
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

export const FacultyProfileView: React.FC<FacultyProfileProps> = ({
  user,
  onUpdateUser,
  onShowToast
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [department, setDepartment] = useState(user.department);
  const [designation, setDesignation] = useState(user.designation || 'Associate Professor & Examination Coordinator');
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
    if (onShowToast) onShowToast('Profile photo removed. Reverted to initial badge.', 'info');
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name,
      email,
      department,
      designation,
      phone,
      avatarUrl: avatarPreview
    });
    setIsEditing(false);
    if (onShowToast) onShowToast('Faculty profile updated successfully.', 'success');
  };

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Faculty Profile Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  Faculty & Examination Committee
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ID: {user.facultyId || 'FAC-IT-102'}
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
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" /> {user.designation || 'Associate Professor'}
                </span>
              </p>
            </div>
          </div>

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
                  <X className="w-3.5 h-3.5" /> Cancel
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

      {/* Edit Mode Form */}
      {isEditing && (
        <div className="bg-white rounded-xl border border-blue-200 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-blue-600" /> Edit Faculty Credentials & Details
          </h2>

          <form onSubmit={handleSaveChanges} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Institution Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 font-medium bg-white"
                >
                  <option value="Information Technology">Information Technology</option>
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Electrical & Electronics">Electrical & Electronics</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Designation & Role</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 font-medium"
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
            Faculty Governance
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Committee Role</span>
              <span className="font-bold text-slate-900">Examination Coordinator</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Academic Council</span>
              <span className="font-bold text-emerald-600">Voting Member</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Cabin / Office</span>
              <span className="font-bold text-slate-900">Tech Tower Room TT-408</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Contact</span>
              <span className="font-bold text-blue-700">{user.phone || '+91 98765 43210'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4">
            Cohort Allocation
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Department</span>
              <span className="font-bold text-slate-900">Information Technology</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Total Enrolled Cohort</span>
              <span className="font-bold text-slate-900">1,250 Students</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">At-Risk Interventions</span>
              <span className="font-bold text-red-600">86 Students</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Current Semester</span>
              <span className="font-bold text-slate-900">Semester VI</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4">
            Specialization & Teaching
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Primary Domain</span>
              <span className="font-bold text-slate-900">Computer Systems & Big Data</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Active Course Code</span>
              <span className="font-bold text-blue-700">CS303 (COA)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Research Group</span>
              <span className="font-bold text-slate-800">Advanced Analytics Lab</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
