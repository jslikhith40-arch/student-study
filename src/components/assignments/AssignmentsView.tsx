import React, { useState } from 'react';
import { INITIAL_ASSIGNMENTS } from '../../lib/academicData';
import { Assignment } from '../../types';
import { FileText, Clock, Upload, CheckCircle2, AlertCircle, FileCheck } from 'lucide-react';

export const AssignmentsView: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'submitted'>('all');
  const [selectedFile, setSelectedFile] = useState<Record<string, string>>({});

  const handleSimulateSubmit = (asgId: string) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === asgId) {
        return {
          ...a,
          status: 'submitted',
          submittedAt: new Date().toISOString().split('T')[0],
          submissionUrl: 'assignment_solution.pdf'
        };
      }
      return a;
    }));
    alert('Assignment submission uploaded and timestamped to Firestore!');
  };

  const filtered = assignments.filter(a => {
    if (activeFilter === 'pending') return a.status === 'pending';
    if (activeFilter === 'submitted') return a.status === 'submitted';
    return true;
  });

  return (
    <div id="assignments-view-root" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Assignments & Lab Submissions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Keep track of problem sets, project milestones, and faculty grading
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeFilter === 'all' ? 'bg-white dark:bg-slate-700 shadow-xs text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
            }`}
          >
            All ({assignments.length})
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeFilter === 'pending' ? 'bg-white dark:bg-slate-700 shadow-xs text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
            }`}
          >
            Pending ({assignments.filter(a => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveFilter('submitted')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeFilter === 'submitted' ? 'bg-white dark:bg-slate-700 shadow-xs text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
            }`}
          >
            Submitted ({assignments.filter(a => a.status === 'submitted').length})
          </button>
        </div>
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isSubmitted = item.status === 'submitted';

          return (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 uppercase">
                    {item.subjectName}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    isSubmitted 
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                  }`}>
                    {isSubmitted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    <span>{isSubmitted ? 'Submitted' : 'Pending Submission'}</span>
                  </span>
                  <span className="text-xs text-slate-400">Max Marks: {item.maxMarks}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Due Date: <strong className="text-slate-800 dark:text-slate-200">{item.dueDate}</strong></span>
                </p>
              </div>

              {/* Upload action */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 flex-shrink-0">
                {!isSubmitted ? (
                  <div className="space-y-2 w-full sm:w-auto">
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-indigo-300 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-50 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>{selectedFile[item.id] || 'Select PDF File'}</span>
                      <input
                        type="file"
                        accept=".pdf,.docx,.zip"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSelectedFile(prev => ({ ...prev, [item.id]: file.name }));
                          }
                        }}
                      />
                    </label>

                    <button
                      onClick={() => handleSimulateSubmit(item.id)}
                      className="w-full px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm shadow-indigo-600/20 cursor-pointer"
                    >
                      Turn In Assignment
                    </button>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <FileCheck className="w-5 h-5" />
                    <div>
                      <p>Turned In on {item.submittedAt}</p>
                      <p className="text-[10px] text-emerald-600 font-normal">Awaiting faculty evaluation</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
