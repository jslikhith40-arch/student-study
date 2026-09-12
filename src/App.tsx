import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { SplashScreen } from './components/common/SplashScreen';
import { AuthView } from './components/auth/AuthView';
import { VerifyEmailView } from './components/auth/VerifyEmailView';
import { ProfileSetupView } from './components/auth/ProfileSetupView';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { CoursesView } from './components/courses/CoursesView';
import { AttendanceView } from './components/attendance/AttendanceView';
import { AIAssistantView } from './components/ai/AIAssistantView';
import { QuizView } from './components/quizzes/QuizView';
import { TimetableView } from './components/timetable/TimetableView';
import { AssignmentsView } from './components/assignments/AssignmentsView';
import { ExamsAndResultsView } from './components/exams/ExamsAndResultsView';
import { CareerAndCodingView } from './components/career/CareerAndCodingView';
import { BookmarksView } from './components/bookmarks/BookmarksView';
import { NotificationsView } from './components/notifications/NotificationsView';
import { ProfileAndSettingsView } from './components/profile/ProfileAndSettingsView';
import { FacultyDashboard } from './components/faculty/FacultyDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { TopicExplainerModal } from './components/courses/TopicExplainerModal';
import { Topic, Subject, Bookmark, AppNotification } from './types';
import { INITIAL_NOTIFICATIONS } from './lib/academicData';

export default function App() {
  const { currentUser, userProfile, loading, isEmailVerified } = useAuth();
  
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cross-component Modal Contexts
  const [activeExplainerTopic, setActiveExplainerTopic] = useState<{ topic: Topic; subject: Subject } | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    {
      id: 'bm_1',
      studentId: userProfile?.uid || 'user',
      type: 'topic',
      title: 'Normalization (1NF, 2NF, 3NF, BCNF)',
      subtitle: 'DBMS • Unit 3',
      contentSnippet: 'Decomposition rules and functional dependencies preservation criteria for semester finals.',
      createdAt: 'Sept 10'
    }
  ]);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // 1. Splash Screen Phase
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // 2. Authentication Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 3. Unauthenticated User Flow -> Auth Screen
  if (!currentUser) {
    return <AuthView onSuccess={() => {}} />;
  }

  // 4. Email Verification Check (Reject unverified non-google accounts until confirmed)
  if (!isEmailVerified) {
    return <VerifyEmailView />;
  }

  // 5. First Time Profile Setup Check
  if (!userProfile?.courseName || !userProfile?.branchName) {
    return <ProfileSetupView onCompleted={() => {}} />;
  }

  // Helper functions for bookmarks & notifications
  const handleAddBookmark = (item: any) => {
    const newBm: Bookmark = {
      id: `bm_${Date.now()}`,
      studentId: currentUser.uid,
      type: item.type || 'topic',
      title: item.title,
      subtitle: item.subtitle,
      contentSnippet: item.contentSnippet,
      createdAt: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })
    };
    setBookmarks(prev => [newBm, ...prev]);
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Desktop Persistent Sidebar */}
      <Sidebar 
        currentTab={currentTab} 
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setMobileMenuOpen(false);
        }} 
      />

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-72 h-full bg-white dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar 
              currentTab={currentTab} 
              onSelectTab={(tab) => {
                setCurrentTab(tab);
                setMobileMenuOpen(false);
              }} 
            />
          </div>
        </div>
      )}

      {/* Main App Canvas */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top App Header */}
        <Navbar 
          onOpenMobileMenu={() => setMobileMenuOpen(true)} 
          onSelectTab={(tab) => setCurrentTab(tab)} 
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <StudentDashboard onNavigate={(tab) => setCurrentTab(tab)} />
          )}

          {currentTab === 'courses' && (
            <CoursesView
              onOpenTopicAI={(topic, subject) => setActiveExplainerTopic({ topic, subject })}
              onOpenQuiz={() => setCurrentTab('quizzes')}
              onBookmark={handleAddBookmark}
            />
          )}

          {currentTab === 'attendance' && (
            <AttendanceView />
          )}

          {currentTab === 'timetable' && (
            <TimetableView />
          )}

          {currentTab === 'ai' && (
            <AIAssistantView initialTopicContext={activeExplainerTopic} />
          )}

          {currentTab === 'quizzes' && (
            <QuizView onBackToCourses={() => setCurrentTab('courses')} />
          )}

          {currentTab === 'assignments' && (
            <AssignmentsView />
          )}

          {(currentTab === 'exams' || currentTab === 'results') && (
            <ExamsAndResultsView />
          )}

          {currentTab === 'progress' && (
            <StudentDashboard onNavigate={(tab) => setCurrentTab(tab)} />
          )}

          {currentTab === 'career' && (
            <CareerAndCodingView />
          )}

          {currentTab === 'bookmarks' && (
            <BookmarksView
              bookmarks={bookmarks}
              onRemoveBookmark={handleRemoveBookmark}
            />
          )}

          {currentTab === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              onMarkAllAsRead={handleMarkAllNotificationsRead}
            />
          )}

          {(currentTab === 'profile' || currentTab === 'settings') && (
            <ProfileAndSettingsView />
          )}

          {currentTab === 'faculty-dashboard' && (
            <FacultyDashboard />
          )}

          {currentTab === 'admin-dashboard' && (
            <AdminDashboard />
          )}
        </main>

        {/* Mobile Navigation Bar */}
        <BottomNav 
          currentTab={currentTab} 
          onSelectTab={(tab) => setCurrentTab(tab)} 
        />
      </div>

      {/* AI Multi-lingual Topic Explainer Modal */}
      {activeExplainerTopic && (
        <TopicExplainerModal
          topic={activeExplainerTopic.topic}
          subject={activeExplainerTopic.subject}
          onClose={() => setActiveExplainerTopic(null)}
          onBookmark={handleAddBookmark}
        />
      )}
    </div>
  );
}
