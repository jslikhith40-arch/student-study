import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCheck, BookOpen, CalendarCheck, FileText, Plus, Check, Users, ShieldAlert } from 'lucide-react';

export const FacultyDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'attendance' | 'assignments' | 'topics'>('attendance');

  // Interactive student roster for recording attendance
  const [students, setStudents] = useState([
    { id: '1', roll: '21CS1001', name: 'Aarav Verma', present: true },
    { id: '2', roll: '21CS1002', name: 'Aditi Rao', present: true },
    { id: '3', roll: '21CS1003', name: 'Chaitanya Reddy', present: false },
    { id: '4', roll: '21CS1004', name: 'Deepika Sen', present: true },
    { id: '5', roll: '21CS1042', name: userProfile?.fullName || 'Likhi Sai Kumar', present: true },
  ]);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleStudent = (id: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, present: !s.present } : s));
  };

  const handleSaveAttendance = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div id="faculty-dashboard-root" className="space-y-6 pb-12">
      {/* Faculty Portal Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider mb-1">
            <UserCheck className="w-4 h-4" />
            <span>Faculty Academic Management Portal</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold">
            Welcome, Professor {userProfile?.fullName || 'Sharma'}
          </h2>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Assigned Subject: Database Management Systems (CS501PC) • Section A & B
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
          Active Class: B.Tech CSE (3rd Year)
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-md text-xs font-semibold">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            activeTab === 'attendance' ? 'bg-white dark:bg-slate-700 shadow-xs text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
          }`}
        >
          Record Attendance
        </button>
        <button
          onClick={() => setActiveTab('assignments')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            activeTab === 'assignments' ? 'bg-white dark:bg-slate-700 shadow-xs text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
          }`}
        >
          Create Assignment
        </button>
        <button
          onClick={() => setActiveTab('topics')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            activeTab === 'topics' ? 'bg-white dark:bg-slate-700 shadow-xs text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
          }`}
        >
          Upload Notes
        </button>
      </div>

      {/* Attendance Recording Sheet */}
      {activeTab === 'attendance' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Daily Lecture Attendance (Today's Date: {new Date().toLocaleDateString()})
              </h3>
              <p className="text-xs text-slate-500">Subject: CS501PC - Database Management Systems (Lecture #37)</p>
            </div>

            <button
              onClick={handleSaveAttendance}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm shadow-indigo-600/20 cursor-pointer self-start sm:self-auto"
            >
              <Check className="w-4 h-4" />
              <span>Submit Official Attendance</span>
            </button>
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
              ✓ Attendance logged and synced to student records!
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="text-[11px] font-bold uppercase text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Roll Number</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3 text-right">Attendance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {students.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-3 font-mono font-semibold text-slate-700 dark:text-slate-300">{s.roll}</td>
                    <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">{s.name}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => toggleStudent(s.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          s.present 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800' 
                            : 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-300 dark:border-red-800'
                        }`}
                      >
                        {s.present ? 'Present' : 'Absent'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assignment Creation Flow */}
      {activeTab === 'assignments' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 max-w-xl">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Publish New Assignment
          </h3>
          <div className="space-y-3 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
              <input 
                type="text" 
                placeholder="e.g. Unit 4 Concurrency Control Practice Problems"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Due Date</label>
              <input 
                type="date" 
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Instructions / Description</label>
              <textarea 
                rows={4}
                placeholder="Specify questions and submission guidelines..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800" 
              />
            </div>
            <button
              onClick={() => alert('Assignment announced and notifications sent to class!')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs cursor-pointer shadow-sm"
            >
              Broadcast Assignment
            </button>
          </div>
        </div>
      )}

      {/* Notes / Topics Upload */}
      {activeTab === 'topics' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 max-w-xl">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Upload Lecture Notes / Handouts
          </h3>
          <div className="space-y-3 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Topic Name</label>
              <input 
                type="text" 
                placeholder="e.g. B+ Tree Indexing Query Optimization"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">PDF File</label>
              <input 
                type="file" 
                accept=".pdf"
                className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700" 
              />
            </div>
            <button
              onClick={() => alert('Handout uploaded and linked to syllabus topic!')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs cursor-pointer shadow-sm"
            >
              Upload Handout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
