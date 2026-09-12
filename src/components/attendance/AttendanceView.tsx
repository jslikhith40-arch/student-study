import React, { useState } from 'react';
import { 
  CalendarCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Calculator, 
  Info,
  TrendingUp,
  Percent
} from 'lucide-react';

interface AttendanceSubjectItem {
  id: string;
  name: string;
  code: string;
  totalClasses: number;
  attendedClasses: number;
  facultyName: string;
}

const INITIAL_ATTENDANCE_DATA: AttendanceSubjectItem[] = [
  { id: '1', name: 'Database Management Systems (DBMS)', code: 'CS501PC', totalClasses: 36, attendedClasses: 32, facultyName: 'Dr. Ramesh Sharma' },
  { id: '2', name: 'Operating Systems & Concurrency', code: 'CS502PC', totalClasses: 34, attendedClasses: 29, facultyName: 'Prof. Ananya Roy' },
  { id: '3', name: 'Computer Networks & Protocols', code: 'CS503PC', totalClasses: 32, attendedClasses: 28, facultyName: 'Dr. V. K. Murthy' },
  { id: '4', name: 'Software Engineering & Agile', code: 'CS504PC', totalClasses: 30, attendedClasses: 27, facultyName: 'Prof. Meera Patel' },
  { id: '5', name: 'Artificial Intelligence & Heuristics', code: 'CS505PE', totalClasses: 28, attendedClasses: 23, facultyName: 'Dr. Arvind Swamy' },
  { id: '6', name: 'DBMS Hands-on Lab', code: 'CS506PC', totalClasses: 14, attendedClasses: 13, facultyName: 'Dr. Ramesh Sharma' }
];

export const AttendanceView: React.FC = () => {
  const [subjects] = useState<AttendanceSubjectItem[]>(INITIAL_ATTENDANCE_DATA);
  const [targetPercentage, setTargetPercentage] = useState<number>(75);

  // Overall totals
  const totalClassesSum = subjects.reduce((acc, s) => acc + s.totalClasses, 0);
  const attendedClassesSum = subjects.reduce((acc, s) => acc + s.attendedClasses, 0);
  const overallPercentage = totalClassesSum > 0 ? (attendedClassesSum / totalClassesSum) * 100 : 0;

  // Attendance Calculator logic:
  // How many classes can I miss while staying >= Target%?
  // (attended / (total + x)) >= (target / 100)  =>  (total + x) <= attended / (target/100)  =>  x <= (attended / (target/100)) - total
  const maxCanMiss = Math.max(0, Math.floor((attendedClassesSum / (targetPercentage / 100)) - totalClassesSum));

  // How many classes do I need to attend sequentially to reach Target% if currently below?
  // (attended + y) / (total + y) >= (target / 100) => y >= (target*total - 100*attended) / (100 - target)
  const neededToAttend = overallPercentage < targetPercentage
    ? Math.max(0, Math.ceil((targetPercentage * totalClassesSum - 100 * attendedClassesSum) / (100 - targetPercentage)))
    : 0;

  return (
    <div id="attendance-view-root" className="space-y-8 pb-12">
      {/* Top Banner & Overall Percentage Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Overall Percentage circular / badge card */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Academic Attendance Summary
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Overall Status: {overallPercentage >= targetPercentage ? 'Eligible for Exams' : 'Attendance Shortage'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Official university requirement is maintaining a minimum of <strong>{targetPercentage}%</strong> attendance to obtain hall tickets without condonation fees.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold justify-center sm:justify-start">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                {attendedClassesSum} Attended
              </span>
              <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                <XCircle className="w-4 h-4" />
                {totalClassesSum - attendedClassesSum} Absent
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                Total: {totalClassesSum} Classes
              </span>
            </div>
          </div>

          {/* Large Ring Percentage visual */}
          <div className="relative flex items-center justify-center flex-shrink-0">
            <div className="w-36 h-36 rounded-full flex items-center justify-center bg-gradient-to-tr from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/50 border-8 border-indigo-600 dark:border-indigo-500 shadow-inner">
              <div className="text-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {overallPercentage.toFixed(1)}%
                </span>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Overall</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Attendance Target Calculator */}
        <div className="p-6 sm:p-7 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/60 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                <Calculator className="w-4 h-4" />
                <span>Attendance Calculator</span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                Goal: {targetPercentage}%
              </span>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Set Target Percentage:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="65"
                  max="90"
                  value={targetPercentage}
                  onChange={(e) => setTargetPercentage(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 w-8">{targetPercentage}%</span>
              </div>
            </div>

            <div className="mt-5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-800">
              {overallPercentage >= targetPercentage ? (
                <div className="space-y-1">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Bunk / Miss Allowance
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    You can safely miss up to <strong className="text-indigo-600 dark:text-indigo-400 text-sm">{maxCanMiss}</strong> more classes and still remain above your {targetPercentage}% goal.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Recovery Required
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    You must attend the next <strong className="text-amber-600 text-sm">{neededToAttend}</strong> consecutive classes to reach your {targetPercentage}% target.
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            <span>Attendance records are read-only for students & official.</span>
          </p>
        </div>
      </div>

      {/* Subject-wise Attendance Breakdown Cards */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Subject-Wise Attendance Breakdown
          </h3>
          <span className="text-xs text-slate-500">{subjects.length} Registered Courses</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((sub) => {
            const pct = (sub.attendedClasses / sub.totalClasses) * 100;
            const isSafe = pct >= targetPercentage;

            return (
              <div
                key={sub.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                      {sub.code}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isSafe ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400'
                    }`}>
                      {pct.toFixed(1)}%
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1 line-clamp-2">
                    {sub.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{sub.facultyName}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span>Classes: {sub.attendedClasses} / {sub.totalClasses}</span>
                    <span className={isSafe ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold'}>
                      {isSafe ? 'Satisfactory' : 'Needs Attention'}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isSafe ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
