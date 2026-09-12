import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldAlert, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Building,
  GraduationCap
} from 'lucide-react';

interface MockUserEntry {
  uid: string;
  name: string;
  email: string;
  college: string;
  course: string;
  branch: string;
  year: string;
  semester: string;
  role: string;
  verified: boolean;
  status: 'active' | 'pending';
  created: string;
  lastLogin: string;
}

const INITIAL_USERS: MockUserEntry[] = [
  {
    uid: 'u_1',
    name: 'Likhi Sai Kumar',
    email: 'jslikhith40@gmail.com',
    college: 'National Institute of Technology',
    course: 'B.Tech',
    branch: 'CSE',
    year: '3rd Year',
    semester: 'Semester 1',
    role: 'student',
    verified: true,
    status: 'active',
    created: '2026-08-15',
    lastLogin: 'Today'
  },
  {
    uid: 'u_2',
    name: 'Dr. Ramesh Sharma',
    email: 'ramesh.sharma@college.edu',
    college: 'National Institute of Technology',
    course: 'B.Tech',
    branch: 'CSE',
    year: 'Faculty',
    semester: 'All',
    role: 'faculty',
    verified: true,
    status: 'active',
    created: '2026-07-01',
    lastLogin: 'Today'
  },
  {
    uid: 'u_3',
    name: 'Pooja Hegde',
    email: 'pooja.h@gmail.com',
    college: 'National Institute of Technology',
    course: 'B.Tech',
    branch: 'AI & ML',
    year: '2nd Year',
    semester: 'Semester 2',
    role: 'student',
    verified: true,
    status: 'active',
    created: '2026-09-02',
    lastLogin: 'Yesterday'
  },
  {
    uid: 'u_4',
    name: 'Rahul Dravid',
    email: 'rahul.d@gmail.com',
    college: 'National Institute of Technology',
    course: 'MBA',
    branch: 'Finance',
    year: '1st Year',
    semester: 'Semester 1',
    role: 'student',
    verified: false,
    status: 'pending',
    created: '2026-09-10',
    lastLogin: '3 days ago'
  }
];

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<MockUserEntry[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUserModal, setSelectedUserModal] = useState<MockUserEntry | null>(null);

  const filtered = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div id="admin-dashboard-root" className="space-y-8 pb-12">
      {/* Admin Stats Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>Campus Admin Control Center</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Institutional User & Academic Management
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Live authorization console for student enrollments, faculty subjects, and curriculum hierarchy.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-center">
              <span className="text-lg font-bold text-white">4</span>
              <p className="text-[10px] text-slate-400 uppercase">Users</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-center">
              <span className="text-lg font-bold text-emerald-400">100%</span>
              <p className="text-[10px] text-slate-400 uppercase">Audit Health</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Management Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Registered Campus Users
            </h3>
            <p className="text-xs text-slate-500">Security Note: Passwords and auth tokens are strictly hidden</p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-3">Student / User</th>
                <th className="py-3 px-3">College & Course</th>
                <th className="py-3 px-3">Branch & Term</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Verification</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(u => (
                <tr key={u.uid} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                    <div className="text-[11px] text-slate-400">{u.email}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    <div>{u.course}</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[150px]">{u.college}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    <div>{u.branch}</div>
                    <div className="text-[11px] text-slate-400">{u.year}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      u.role === 'admin' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400' :
                      u.role === 'faculty' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400' :
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      u.verified ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'
                    }`}>
                      {u.verified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{u.verified ? 'Verified' : 'Pending'}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedUserModal(u)}
                      className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      View Record
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Record Modal */}
      {selectedUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Student Record: {selectedUserModal.name}
            </h3>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-2 text-xs">
              <p><strong>UID: </strong><span className="font-mono text-slate-500">{selectedUserModal.uid}</span></p>
              <p><strong>Email: </strong>{selectedUserModal.email}</p>
              <p><strong>College: </strong>{selectedUserModal.college}</p>
              <p><strong>Academic Program: </strong>{selectedUserModal.course} ({selectedUserModal.branch})</p>
              <p><strong>Current Standing: </strong>{selectedUserModal.year} • {selectedUserModal.semester}</p>
              <p><strong>Account Status: </strong><span className="text-emerald-500 font-bold uppercase">{selectedUserModal.status}</span></p>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 rounded-xl text-xs">
              Security Policy: Passwords, tokens, and raw credentials are never transmitted or displayed.
            </div>

            <button
              onClick={() => setSelectedUserModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
