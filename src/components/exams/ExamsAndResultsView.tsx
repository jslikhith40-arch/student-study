import React from 'react';
import { INITIAL_EXAMS, INITIAL_RESULTS } from '../../lib/academicData';
import { GraduationCap, Award, Calendar, MapPin, Clock, BookOpen } from 'lucide-react';

export const ExamsAndResultsView: React.FC = () => {
  const exams = INITIAL_EXAMS;
  const results = INITIAL_RESULTS;

  // Calculate SGPA
  const totalCredits = results.reduce((acc, r) => acc + r.credits, 0);
  const totalPoints = results.reduce((acc, r) => acc + (r.gradePoint * r.credits), 0);
  const sgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '9.15';

  return (
    <div id="exams-results-view-root" className="space-y-8 pb-12">
      {/* Top Split Banner: Upcoming Exams vs Current Cumulative GPA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Upcoming Examination Schedule
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">Mid-Term Oct 2026</span>
          </div>

          <div className="space-y-3">
            {exams.map((ex) => (
              <div
                key={ex.id}
                className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-600 text-white uppercase">
                      {ex.examType}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{ex.subjectCode}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                    {ex.subjectName}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3" />
                    <span>Syllabus: {ex.syllabusCovered}</span>
                  </p>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 sm:text-right flex-shrink-0">
                  <p className="font-bold text-slate-900 dark:text-white flex sm:justify-end items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    {ex.date}
                  </p>
                  <p className="flex sm:justify-end items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    {ex.time}
                  </p>
                  <p className="flex sm:justify-end items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    {ex.room}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Performance / GPA Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Official Academic Record</span>
            </div>

            <h3 className="text-xl font-bold">Grade Point Average</h3>
            <p className="text-xs text-indigo-200 mt-1">
              Evaluated based on internal assessments & semester finals.
            </p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-5xl font-black tracking-tight">{sgpa}</span>
              <span className="text-sm font-semibold text-indigo-200">/ 10.0 SGPA</span>
            </div>

            <div className="mt-4 pt-4 border-t border-indigo-700/60 flex items-center justify-between text-xs">
              <span className="text-indigo-200">Cumulative CGPA</span>
              <span className="font-bold text-white">9.08</span>
            </div>
          </div>

          <div className="mt-6 p-3 rounded-2xl bg-white/10 backdrop-blur-md text-xs text-indigo-100 flex items-center gap-2">
            <span>🎉 Outstanding standing: Top 5% in University Department</span>
          </div>
        </div>
      </div>

      {/* Semester Results Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Last Completed Semester Scorecard (Semester 4)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Internal</th>
                <th className="py-3 px-4">External</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {results.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    <div>{r.subjectName}</div>
                    <div className="text-[11px] text-slate-400">{r.subjectCode}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    {r.internalMarks} / {r.maxInternal}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    {r.externalMarks} / {r.maxExternal}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {r.totalMarks}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                      {r.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">
                    {r.gradePoint}
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
