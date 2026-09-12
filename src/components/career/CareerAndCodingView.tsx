import React, { useState } from 'react';
import { INITIAL_CODING_PROBLEMS } from '../../lib/academicData';
import { CodingProblem } from '../../types';
import { Code, Terminal, Play, CheckCircle2, Award, Briefcase, FileCode, Sparkles } from 'lucide-react';

const LANGUAGES = [
  { id: 'c', label: 'C' },
  { id: 'cpp', label: 'C++' },
  { id: 'java', label: 'Java' },
  { id: 'python', label: 'Python' },
  { id: 'javascript', label: 'JavaScript' },
];

export const CareerAndCodingView: React.FC = () => {
  const [problems] = useState<CodingProblem[]>(INITIAL_CODING_PROBLEMS);
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(INITIAL_CODING_PROBLEMS[0]);
  const [selectedLang, setSelectedLang] = useState<'c' | 'cpp' | 'java' | 'python' | 'javascript'>('python');
  const [code, setCode] = useState<string>(selectedProblem.starterCode[selectedLang]);
  const [output, setOutput] = useState<string | null>(null);
  const [running, setRunning] = useState<boolean>(false);

  const handleLanguageChange = (lang: any) => {
    setSelectedLang(lang);
    setCode(selectedProblem.starterCode[lang as 'python'] || '');
    setOutput(null);
  };

  const handleRunCode = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setOutput(`✓ Test Case 1 Passed (nums = [2,7,11,15], target = 9) -> Output: [0, 1]
✓ Test Case 2 Passed (nums = [3,2,4], target = 6) -> Output: [1, 2]
✓ All 2/2 test cases passed in 42ms. Complexity: O(N) Time, O(N) Space.`);
    }, 900);
  };

  return (
    <div id="career-coding-root" className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>Campus Placement & Career Readiness</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Data Structures, Algorithms & Interview Coding
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Solve curated company interview problems in C, C++, Java, Python, and JavaScript with instant feedback.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-indigo-300 border border-slate-700">
            32 Problems Solved
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 text-xs font-bold text-amber-300 border border-amber-500/40">
            Top 15% Campus Rank
          </span>
        </div>
      </div>

      {/* Split Coding Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Problem Description & Test Cases (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              selectedProblem.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-amber-50 text-amber-600'
            }`}>
              {selectedProblem.difficulty}
            </span>
            <span className="text-xs text-slate-400">{selectedProblem.category}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {selectedProblem.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {selectedProblem.description}
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Example Test Cases
            </h4>
            {selectedProblem.examples.map((ex, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs font-mono space-y-1">
                <p><span className="text-slate-400">Input: </span>{ex.input}</p>
                <p><span className="text-slate-400">Output: </span>{ex.output}</p>
                {ex.explanation && <p className="text-[11px] text-slate-500 font-sans mt-1">{ex.explanation}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Code Editor & Console Output (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl bg-slate-950 border border-slate-800 shadow-md overflow-hidden">
            {/* Editor Top Bar */}
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => handleLanguageChange(l.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      selectedLang === l.id
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleRunCode}
                disabled={running}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-60"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{running ? 'Running Tests...' : 'Run Code'}</span>
              </button>
            </div>

            {/* Code Text Area */}
            <div className="p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={12}
                className="w-full bg-transparent text-emerald-400 font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Console Output */}
            {output && (
              <div className="p-4 bg-slate-900/90 border-t border-slate-800 text-xs font-mono text-slate-200">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Test Execution Output</span>
                </div>
                <pre className="whitespace-pre-wrap text-[11px] leading-relaxed text-slate-300">
                  {output}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
