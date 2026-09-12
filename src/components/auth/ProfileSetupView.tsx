import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';
import { GraduationCap, BookOpen, Building, CheckCircle } from 'lucide-react';

const COURSE_OPTIONS = [
  'B.Tech',
  'B.Com',
  'B.Sc',
  'BBA',
  'MBA',
  'MCA',
  'Diploma',
  'Polytechnic',
  'Other'
];

const BTECH_BRANCHES = [
  'CSE',
  'AI & ML',
  'IT',
  'ECE',
  'EEE',
  'Mechanical',
  'Civil',
  'Other'
];

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const SEMESTERS = ['Semester 1', 'Semester 2'];

interface ProfileSetupProps {
  onCompleted: () => void;
}

export const ProfileSetupView: React.FC<ProfileSetupProps> = ({ onCompleted }) => {
  const { userProfile, updateProfileData } = useAuth();

  const [fullName, setFullName] = useState(userProfile?.fullName || '');
  const [collegeName, setCollegeName] = useState(userProfile?.collegeName || 'National Institute of Technology');
  const [courseName, setCourseName] = useState(userProfile?.courseName || 'B.Tech');
  const [branchName, setBranchName] = useState(userProfile?.branchName || 'CSE');
  const [year, setYear] = useState(userProfile?.year || '3rd Year');
  const [semester, setSemester] = useState(userProfile?.semester || 'Semester 1');
  const [rollNumber, setRollNumber] = useState(userProfile?.rollNumber || '21CS1042');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfileData({
        fullName,
        collegeName,
        courseName,
        courseId: courseName.toLowerCase().replace(/[^a-z0-9]/g, ''),
        branchName,
        branchId: `${courseName.toLowerCase()}_${branchName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        year,
        semester,
        rollNumber,
        accountStatus: 'active'
      });
      onCompleted();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col items-center text-center mb-8">
          <Logo size="md" showTagline={false} />
          <h2 className="text-2xl font-bold mt-4 tracking-tight">Complete Your Student Profile</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Personalize your academic workspace, curriculum subjects, and attendance tracking
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
              Full Student Name
            </label>
            <input
              id="setup-fullname"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
              College / University Name
            </label>
            <div className="relative">
              <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="setup-college"
                type="text"
                required
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
                Course Degree
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  id="setup-course"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/50"
                >
                  {COURSE_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
                Branch / Specialization
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                {courseName === 'B.Tech' ? (
                  <select
                    id="setup-branch-select"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/50"
                  >
                    {BTECH_BRANCHES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id="setup-branch-input"
                    type="text"
                    required
                    placeholder="General / Finance / Accounting"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/50"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
                Academic Year
              </label>
              <select
                id="setup-year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/50"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
                Semester
              </label>
              <select
                id="setup-semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/50"
              >
                {SEMESTERS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
                Roll Number
              </label>
              <input
                id="setup-rollno"
                type="text"
                required
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="21CS1042"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              id="setup-submit-btn"
              type="submit"
              disabled={saving}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Save & Enter StudyMate AI</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
