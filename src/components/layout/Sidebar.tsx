import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  CalendarCheck, 
  Calendar, 
  FileText, 
  GraduationCap, 
  Award, 
  Bot, 
  BrainCircuit, 
  TrendingUp, 
  Briefcase, 
  Bookmark, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab }) => {
  const { userProfile, role, logout } = useAuth();

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses & Curriculum', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'ai', label: 'StudyMate AI Assistant', icon: Bot, badge: 'AI' },
    { id: 'quizzes', label: 'Quizzes & Practice', icon: BrainCircuit },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'exams', label: 'Exams Schedule', icon: GraduationCap },
    { id: 'results', label: 'Results & SGPA', icon: Award },
    { id: 'progress', label: 'Learning Progress', icon: TrendingUp },
    { id: 'career', label: 'Career & Coding', icon: Briefcase },
    { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark },
    { id: 'notifications', label: 'Notifications', icon: Bell, unread: true },
    { id: 'profile', label: 'Student Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      id="desktop-sidebar-nav"
      className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 select-none z-30 transition-colors"
    >
      {/* Brand Logo Header */}
      <div className="h-16 px-6 flex items-center border-b border-slate-100 dark:border-slate-800/80">
        <Logo size="sm" showText={true} />
      </div>

      {/* Role Banner / Badge if faculty or admin */}
      {role !== 'student' && (
        <div className="mx-4 mt-3 p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5 uppercase tracking-wider">
            {role === 'admin' ? <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> : <UserCheck className="w-3.5 h-3.5 text-blue-500" />}
            {role} Portal
          </span>
          <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
        {/* Role-Specific Portal Switchers */}
        {role === 'admin' && (
          <div className="mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Admin Controls
            </p>
            <button
              onClick={() => onSelectTab('admin-dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'admin-dashboard'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admin Center</span>
            </button>
          </div>
        )}

        {role === 'faculty' && (
          <div className="mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Faculty Controls
            </p>
            <button
              onClick={() => onSelectTab('faculty-dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'faculty-dashboard'
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Faculty Portal</span>
            </button>
          </div>
        )}

        <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
          Academic Menu
        </p>

        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-item-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-600 text-white uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
              {item.unread && (
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* User profile footer */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800">
        <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
              {userProfile?.fullName ? userProfile.fullName[0].toUpperCase() : 'S'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                {userProfile?.fullName || 'Student'}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {userProfile?.rollNumber || '21CS1042'}
              </p>
            </div>
          </div>
          <button
            id="sidebar-logout-btn"
            onClick={logout}
            title="Sign Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
