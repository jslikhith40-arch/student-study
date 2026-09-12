import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  CalendarCheck, 
  Bot, 
  User 
} from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'ai', label: 'AI Tutor', icon: Bot, isSpecial: true },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav 
      id="mobile-bottom-nav"
      className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 z-40"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        
        if (item.isSpecial) {
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className="relative -top-3 flex flex-col items-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 group-active:scale-95 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-semibold mt-1 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center w-14 py-1 cursor-pointer transition-colors ${
              isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1 truncate">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
