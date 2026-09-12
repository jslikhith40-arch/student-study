import React, { useState, useEffect } from 'react';
import { 
  db, 
  collection, 
  getDocs 
} from '../../lib/firebase';
import { Course, Branch, Subject, Topic } from '../../types';
import { 
  INITIAL_COURSES, 
  INITIAL_BRANCHES, 
  INITIAL_SUBJECTS, 
  INITIAL_TOPICS 
} from '../../lib/academicData';
import { 
  BookOpen, 
  ChevronRight, 
  Layers, 
  FileText, 
  Sparkles, 
  BrainCircuit, 
  Bookmark, 
  ArrowLeft,
  CheckCircle2,
  Clock,
  Search
} from 'lucide-react';

interface CoursesViewProps {
  onOpenTopicAI: (topic: Topic, subject: Subject) => void;
  onOpenQuiz: (subject: Subject) => void;
  onBookmark: (item: any) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ 
  onOpenTopicAI, 
  onOpenQuiz, 
  onBookmark 
}) => {
  // Navigation Breadcrumb state:
  // 1. Course selection -> 2. Branch selection -> 3. Year & Semester -> 4. Subjects -> 5. Subject Detail & Topics
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [topics, setTopics] = useState<Topic[]>(INITIAL_TOPICS);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(INITIAL_COURSES[0]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(INITIAL_BRANCHES[0]);
  const [selectedYear, setSelectedYear] = useState<string>('3rd Year');
  const [selectedSemester, setSelectedSemester] = useState<string>('Semester 1');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  // Fetch live from Firestore if populated
  useEffect(() => {
    async function loadCurriculumFromDb() {
      try {
        const cSnap = await getDocs(collection(db, 'courses'));
        if (!cSnap.empty) {
          setCourses(cSnap.docs.map(d => ({ id: d.id, ...d.data() } as Course)));
        }
        const sSnap = await getDocs(collection(db, 'subjects'));
        if (!sSnap.empty) {
          setSubjects(sSnap.docs.map(d => ({ id: d.id, ...d.data() } as Subject)));
        }
        const tSnap = await getDocs(collection(db, 'topics'));
        if (!tSnap.empty) {
          setTopics(tSnap.docs.map(d => ({ id: d.id, ...d.data() } as Topic)));
        }
      } catch (e) {
        console.warn('Using seeded academic hierarchy fallback', e);
      }
    }
    loadCurriculumFromDb();
  }, []);

  const filteredSubjects = subjects.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div id="courses-view-root" className="space-y-6 pb-12">
      {/* Breadcrumb Navigation Header */}
      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => { setSelectedSubject(null); setSelectedTopic(null); }}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold"
        >
          {selectedCourse?.name || 'Courses'}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>{selectedBranch?.code || 'CSE'}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>{selectedYear}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-bold">{selectedSemester}</span>

        {selectedSubject && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{selectedSubject.code}</span>
          </>
        )}
      </div>

      {/* TOPIC DETAIL VIEW (When a topic is selected) */}
      {selectedTopic && selectedSubject ? (
        <div className="space-y-6 animate-fadeIn">
          <button
            onClick={() => setSelectedTopic(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {selectedSubject.name}</span>
          </button>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Unit 3 • Topic {selectedTopic.order}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {selectedTopic.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
                  {selectedTopic.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:self-start flex-shrink-0">
                <button
                  onClick={() => onOpenTopicAI(selectedTopic, selectedSubject)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm shadow-indigo-600/20 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Explain with AI</span>
                </button>

                <button
                  onClick={() => onOpenQuiz(selectedSubject)}
                  className="px-4 py-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 hover:bg-violet-100 font-semibold text-xs sm:text-sm flex items-center gap-2 border border-violet-200 dark:border-violet-800 cursor-pointer"
                >
                  <BrainCircuit className="w-4 h-4" />
                  <span>Take Quiz</span>
                </button>

                <button
                  onClick={() => onBookmark({ title: selectedTopic.title, type: 'topic', subtitle: selectedSubject.name })}
                  className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  title="Bookmark Topic"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Key Curriculum Points */}
            {selectedTopic.keyPoints && (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                  Core Key Principles for University Exams
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {selectedTopic.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Embedded PDF Notes & Document Section */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 border border-red-200 dark:border-red-900/60">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedTopic.pdfTitle || 'Unit Lecture Notes.pdf'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {selectedTopic.pdfPageCount || 24} Pages • Verified Faculty PPT & Handouts
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="#download"
                  onClick={(e) => { e.preventDefault(); alert('Downloading academic PDF notes package...'); }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 transition-colors"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : selectedSubject ? (
        /* SUBJECT DETAIL VIEW: Shows topics list, syllabus, and faculty details */
        <div className="space-y-6">
          <button
            onClick={() => setSelectedSubject(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Subjects</span>
          </button>

          {/* Subject Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  {selectedSubject.code} • {selectedSubject.credits} Credits
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  {selectedSubject.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  Faculty: <span className="font-semibold text-white">{selectedSubject.facultyName}</span> ({selectedSubject.facultyEmail})
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenQuiz(selectedSubject)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <BrainCircuit className="w-4 h-4" />
                  <span>Subject Quiz</span>
                </button>
              </div>
            </div>
          </div>

          {/* Topics List in this Subject */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Curriculum Units & Topics
            </h3>

            <div className="space-y-3">
              {topics.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTopic(t)}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      t.completed 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {t.order}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {t.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {t.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {t.durationMinutes} mins
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {t.pdfPageCount || 20} Pages PDF
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenTopicAI(t, selectedSubject);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Explain</span>
                    </button>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ALL SUBJECTS OVERVIEW IN CURRENT SEMESTER */
        <div className="space-y-6">
          {/* Header & Course Filter Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Academic Subjects & Modules
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {selectedCourse?.name} • {selectedBranch?.name} • {selectedYear} ({selectedSemester})
              </p>
            </div>

            {/* Search Filter */}
            <div className="w-full sm:w-64 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search subject or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          </div>

          {/* Subject Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSubjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setSelectedSubject(sub)}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {sub.code}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {sub.credits} Credits
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {sub.name}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    Faculty: {sub.facultyName}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500">Curriculum Progress</span>
                    <span className="font-bold text-slate-900 dark:text-white">{sub.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${sub.progressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    <span>{sub.totalTopics} Topics</span>
                    <span className="flex items-center gap-1">
                      View Units <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
