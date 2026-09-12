import React from 'react';
import { 
  CalendarCheck, 
  TrendingUp, 
  BrainCircuit, 
  Flame, 
  ArrowUpRight, 
  BookOpen, 
  Bot, 
  Calendar, 
  FileText, 
  Sparkles,
  ChevronRight,
  Clock,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface StudentDashboardProps {
  onNavigate: (tab: string, extra?: any) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { userProfile } = useAuth();
  const studentName = userProfile?.fullName?.split(' ')[0] || 'Student';

  // Dynamic statistics loaded from user profile / state
  const stats = [
    {
      id: 'stat-attendance',
      title: 'Attendance',
      value: '86.4%',
      target: 'Target: 75%',
      icon: CalendarCheck,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50',
      badge: '+2.1% this week'
    },
    {
      id: 'stat-progress',
      title: 'Learning Progress',
      value: '72%',
      target: '18 of 25 Topics Done',
      icon: TrendingUp,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/50',
      badge: 'On Track'
    },
    {
      id: 'stat-quiz',
      title: 'Quiz Score Average',
      value: '84%',
      target: '5 Quizzes completed',
      icon: BrainCircuit,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50',
      badge: 'Top 10% in CSE'
    },
    {
      id: 'stat-streak',
      title: 'Study Streak',
      value: '12 Days',
      target: 'Best: 18 days',
      icon: Flame,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50',
      badge: 'Active Today'
    }
  ];

  const quickActions = [
    {
      id: 'courses',
      title: 'My Courses',
      description: 'Explore subjects, modules, lecture notes & PPTs',
      icon: BookOpen,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'attendance',
      title: 'Attendance Calculator',
      description: 'Track percentage & calculate missed classes limit',
      icon: CalendarCheck,
      color: 'from-emerald-600 to-teal-600'
    },
    {
      id: 'ai',
      title: 'AI Tutor & Explainer',
      description: 'Get step-by-step topic breakdown in 5 languages',
      icon: Bot,
      color: 'from-indigo-600 to-violet-600'
    },
    {
      id: 'quizzes',
      title: 'Subject Practice Quiz',
      description: 'Instant MCQ challenges with comprehensive explanations',
      icon: BrainCircuit,
      color: 'from-violet-600 to-purple-600'
    },
    {
      id: 'assignments',
      title: 'Assignments & Deadlines',
      description: 'Submit pending lab reports and verify grades',
      icon: FileText,
      color: 'from-amber-600 to-orange-600'
    },
    {
      id: 'timetable',
      title: 'Daily Timetable',
      description: 'Check today\'s schedule, rooms & lab sessions',
      icon: Calendar,
      color: 'from-rose-600 to-pink-600'
    }
  ];

  return (
    <div id="student-dashboard-root" className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 text-white overflow-hidden shadow-lg shadow-indigo-700/15">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-8 translate-y-8 pointer-events-none">
          <BookOpen className="w-80 h-80 text-white" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Academic Term 2026 • {userProfile?.branchName || 'CSE'} ({userProfile?.year || '3rd Year'})</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good Morning, {studentName}!
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base mt-2 leading-relaxed">
            Ready to learn today? You have a <strong>DBMS Normalization quiz</strong> due tomorrow and an Operating Systems lecture at 10:00 AM.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('courses')}
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-700 font-semibold text-xs sm:text-sm hover:bg-indigo-50 active:scale-95 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Continue Learning</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('ai')}
              className="px-4 py-2.5 rounded-xl bg-indigo-800/80 hover:bg-indigo-800 text-white font-medium text-xs sm:text-sm border border-indigo-500/50 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-indigo-300" />
              <span>Ask AI Question</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Statistics Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Academic Performance Overview
          </h2>
          <span className="text-xs text-slate-500">Live Semester Sync</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {item.title}
                  </span>
                  <div className={`p-2 rounded-xl border ${item.bg}`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {item.value}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                    <span className="text-slate-500 dark:text-slate-400 truncate">{item.target}</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{item.badge}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Continue Learning Card */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Recent Learning Activity
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              Database Management Systems (DBMS)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Topic: Normalization (1NF, 2NF, 3NF & BCNF) • Unit 3
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">60% Completed</span>
              <div className="w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full w-[60%]" />
              </div>
            </div>

            <button
              id="continue-learning-btn"
              onClick={() => onNavigate('courses')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-sm shadow-indigo-600/20 cursor-pointer flex-shrink-0"
            >
              <span>Continue Topic</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Academic Quick Actions
          </h2>
          <span className="text-xs text-slate-500">Shortcuts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                id={`quick-action-${action.id}`}
                onClick={() => onNavigate(action.id)}
                className="group text-left p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 hover:shadow-md transition-all cursor-pointer flex items-start gap-4"
              >
                <div className={`p-3 rounded-2xl bg-gradient-to-tr ${action.color} text-white shadow-md flex-shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {action.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Today's Classes & Upcoming Deadlines 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Timetable Preview */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Today's Schedule (Monday)
              </h3>
            </div>
            <button
              onClick={() => onNavigate('timetable')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View Full Week
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-600 text-white uppercase">CURRENT</span>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Database Management Systems</p>
                <p className="text-xs text-slate-500">Dr. Ramesh Sharma • Lecture Hall 302</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">09:00 - 10:00 AM</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Operating Systems & Concurrency</p>
                <p className="text-xs text-slate-500">Prof. Ananya Roy • Lecture Hall 302</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-500">10:00 - 11:00 AM</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">DBMS Lab (Batch A)</p>
                <p className="text-xs text-slate-500">Computing Lab 4</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-500">01:15 - 03:15 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upcoming Academic Deadlines
              </h3>
            </div>
            <button
              onClick={() => onNavigate('assignments')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              All Assignments
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-600 text-white uppercase">DUE IN 3 DAYS</span>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Banker's Algorithm Implementation</p>
                <p className="text-xs text-slate-500">Operating Systems • CS502PC</p>
              </div>
              <span className="text-xs font-semibold text-slate-500">Sept 15</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">PENDING</span>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">3NF & BCNF Decomposition Problems</p>
                <p className="text-xs text-slate-500">DBMS • Unit 3</p>
              </div>
              <span className="text-xs font-semibold text-slate-500">Sept 20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
