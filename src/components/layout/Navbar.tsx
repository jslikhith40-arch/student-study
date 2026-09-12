import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Search, Bell, Moon, Sun, Menu, X, Sparkles } from 'lucide-react';
import { Logo } from '../common/Logo';

interface NavbarProps {
  onOpenMobileMenu: () => void;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu, onSelectTab }) => {
  const { userProfile, role, switchRoleDebug } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSelectTab('courses');
    }
  };

  return (
    <header 
      id="main-app-header"
      className="h-16 px-4 sm:px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-20 transition-colors"
    >
      {/* Mobile brand & menu button */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Logo size="sm" showText={true} />
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mr-4">
        <form onSubmit={handleSearch} className="w-full relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="global-academic-search"
            type="text"
            placeholder="Search subjects, topics, DBMS, notes, formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800/70 border border-transparent focus:border-indigo-500/40 focus:bg-white dark:focus:bg-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Role Switcher for previewing Student / Faculty / Admin flows */}
        <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => switchRoleDebug?.('student')}
            className={`px-2 py-1 rounded-lg font-medium transition-all ${
              role === 'student' ? 'bg-white dark:bg-slate-700 shadow-xs text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => switchRoleDebug?.('faculty')}
            className={`px-2 py-1 rounded-lg font-medium transition-all ${
              role === 'faculty' ? 'bg-white dark:bg-slate-700 shadow-xs text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'
            }`}
          >
            Faculty
          </button>
          <button
            onClick={() => switchRoleDebug?.('admin')}
            className={`px-2 py-1 rounded-lg font-medium transition-all ${
              role === 'admin' ? 'bg-white dark:bg-slate-700 shadow-xs text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500'
            }`}
          >
            Admin
          </button>
        </div>

        {/* AI Quick Button */}
        <button
          onClick={() => onSelectTab('ai')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors border border-indigo-200 dark:border-indigo-800/80 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Ask StudyMate</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          id="theme-toggle-btn"
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notification Bell */}
        <button
          id="notifications-btn"
          onClick={() => onSelectTab('notifications')}
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* Profile Avatar */}
        <button
          onClick={() => onSelectTab('profile')}
          className="flex items-center gap-2 p-1 pl-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-bold flex items-center justify-center text-xs shadow-sm">
            {userProfile?.fullName ? userProfile.fullName[0].toUpperCase() : 'S'}
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-700 dark:text-slate-200">
            {userProfile?.fullName?.split(' ')[0] || 'Student'}
          </span>
        </button>
      </div>
    </header>
  );
};
