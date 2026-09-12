import React, { useState, useEffect } from 'react';
import { Quiz, QuizQuestion } from '../../types';
import { INITIAL_QUIZZES } from '../../lib/academicData';
import { 
  BrainCircuit, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  HelpCircle,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizViewProps {
  quizId?: string;
  onBackToCourses?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ 
  quizId = 'quiz_dbms_norm',
  onBackToCourses 
}) => {
  const [quizzes] = useState<Quiz[]>(INITIAL_QUIZZES);
  const [activeQuiz, setActiveQuiz] = useState<Quiz>(INITIAL_QUIZZES[0]);
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(activeQuiz.durationMinutes * 60);

  // Timer countdown
  useEffect(() => {
    if (isCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompleted]);

  const currentQuestion = activeQuiz.questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isCompleted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const handleNext = () => {
    if (currentIndex < activeQuiz.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setIsCompleted(true);
    // Celebrate with confetti if score >= 80%
    const correctCount = activeQuiz.questions.reduce((acc, q, idx) => {
      return selectedAnswers[idx] === q.correctAnswerIndex ? acc + 1 : acc;
    }, 0);
    const scorePct = (correctCount / activeQuiz.questions.length) * 100;
    if (scorePct >= 70) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    setTimeLeft(activeQuiz.durationMinutes * 60);
  };

  const correctCount = activeQuiz.questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctAnswerIndex ? acc + 1 : acc;
  }, 0);
  const scorePercent = Math.round((correctCount / activeQuiz.questions.length) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div id="quiz-view-root" className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Top Header Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {activeQuiz.subjectName} Practice Test
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            {activeQuiz.title}
          </h2>
          <p className="text-xs text-slate-500">
            {activeQuiz.topicTitle} • {activeQuiz.questions.length} Questions
          </p>
        </div>

        {/* Countdown Timer */}
        {!isCompleted && (
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-xs font-bold self-start sm:self-center">
            <Clock className="w-4 h-4" />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {/* ACTIVE QUIZ QUESTION INTERFACE */}
      {!isCompleted ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          
          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Question {currentIndex + 1} of {activeQuiz.questions.length}</span>
              <span>{Math.round(((currentIndex + 1) / activeQuiz.questions.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / activeQuiz.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-2 border-indigo-600 dark:border-indigo-500 text-indigo-950 dark:text-indigo-100 font-semibold'
                      : 'bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Nav */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentIndex] === undefined}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
            >
              <span>{currentIndex === activeQuiz.questions.length - 1 ? 'Finish & View Score' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* QUIZ SUMMARY & EXPLANATIONS */
        <div className="space-y-6 animate-fadeIn">
          {/* Result Card */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Quiz Completed!
            </h3>

            <p className="text-sm text-slate-500">
              You scored <strong className="text-indigo-600 dark:text-indigo-400 text-base">{correctCount}</strong> out of <strong className="text-slate-800 dark:text-slate-200 text-base">{activeQuiz.questions.length}</strong> questions correctly ({scorePercent}%).
            </p>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={handleRestart}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>

              {onBackToCourses && (
                <button
                  onClick={onBackToCourses}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <span>Back to Courses</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Detailed Question Explanations */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Question Analysis & Explanations
            </h4>

            {activeQuiz.questions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.correctAnswerIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border ${
                    isCorrect
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                      : 'bg-red-50/40 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs font-bold text-slate-500">Question {idx + 1}</span>
                    <span className={`text-xs font-bold flex items-center gap-1 ${
                      isCorrect ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    {q.question}
                  </p>

                  <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                    <p>
                      Your Answer: <span className="font-bold">{q.options[userAns] || 'Not answered'}</span>
                    </p>
                    <p className="text-emerald-600 dark:text-emerald-400">
                      Correct Answer: <span className="font-bold">{q.options[q.correctAnswerIndex]}</span>
                    </p>
                  </div>

                  <div className="mt-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong className="text-slate-900 dark:text-white">Explanation: </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
