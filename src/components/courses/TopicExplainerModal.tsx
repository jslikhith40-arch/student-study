import React, { useState } from 'react';
import { Topic, Subject } from '../../types';
import { explainTopicWithGemini } from '../../lib/gemini';
import { 
  Sparkles, 
  Globe, 
  Layers, 
  Check, 
  Copy, 
  Bookmark, 
  X, 
  BookOpen, 
  HelpCircle,
  FileQuestion,
  Lightbulb,
  Zap,
  GraduationCap
} from 'lucide-react';

interface TopicExplainerModalProps {
  topic: Topic;
  subject: Subject;
  onClose: () => void;
  onBookmark?: (item: any) => void;
}

const LANGUAGES = ['English', 'Telugu', 'Hindi', 'Tamil', 'Kannada'];
const LEVELS = ['Beginner', 'Intermediate', 'Exam Preparation'];

const MODES = [
  { id: 'Explain Simply', label: 'Explain Simply', icon: Lightbulb },
  { id: 'Detailed Explanation', label: 'Detailed Explanation', icon: BookOpen },
  { id: 'Exam Answer', label: 'Exam Answer (High-Yield)', icon: GraduationCap },
  { id: 'Real-Life Example', label: 'Real-Life Example', icon: Sparkles },
  { id: 'Quick Revision', label: 'Quick Revision & Notes', icon: Zap },
  { id: 'Generate MCQs', label: 'Practice MCQs', icon: FileQuestion },
  { id: 'Generate Flashcards', label: 'Flashcards', icon: Layers },
];

export const TopicExplainerModal: React.FC<TopicExplainerModalProps> = ({
  topic,
  subject,
  onClose,
  onBookmark
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [selectedLevel, setSelectedLevel] = useState<string>('Intermediate');
  const [selectedMode, setSelectedMode] = useState<string>('Explain Simply');

  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = async (modeOverride?: string) => {
    const mode = modeOverride || selectedMode;
    setLoading(true);
    try {
      const result = await explainTopicWithGemini({
        topicTitle: topic.title,
        subjectName: subject.name,
        language: selectedLanguage,
        level: selectedLevel,
        mode: mode
      });
      setExplanation(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (explanation) {
      navigator.clipboard.writeText(explanation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>StudyMate AI Academic Explainer</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              {topic.title}
            </h3>
            <p className="text-xs text-slate-500">
              {subject.name} ({subject.code})
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>Language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="py-1 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:ring-1 focus:ring-indigo-500"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Target Level */}
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="py-1 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:ring-1 focus:ring-indigo-500"
              >
                {LEVELS.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {MODES.map(m => {
              const Icon = m.icon;
              const isSelected = selectedMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMode(m.id);
                    handleGenerate(m.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-indigo-600 text-white shadow-xs' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {!explanation && !loading && (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                Generate Smart Explanations & Study Aids
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Select your preferred learning mode above or click Generate to get an AI breakdown customized for your university exams.
              </p>
              <button
                onClick={() => handleGenerate()}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                Generate Explanation Now
              </button>
            </div>
          )}

          {loading && (
            <div className="py-16 text-center space-y-3">
              <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-semibold text-slate-500">
                StudyMate AI is analyzing {topic.title} in {selectedLanguage}...
              </p>
            </div>
          )}

          {explanation && !loading && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-slate-800 dark:text-slate-200 font-sans">
                {explanation}
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Text'}</span>
                  </button>

                  <button
                    onClick={() => {
                      onBookmark?.({
                        title: `${topic.title} (${selectedMode})`,
                        type: 'ai_response',
                        subtitle: `${subject.name} • ${selectedLanguage}`,
                        contentSnippet: explanation.slice(0, 120)
                      });
                      alert('Saved to your Bookmarks!');
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Bookmark Answer</span>
                  </button>
                </div>

                <button
                  onClick={() => handleGenerate()}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
                >
                  Regenerate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
