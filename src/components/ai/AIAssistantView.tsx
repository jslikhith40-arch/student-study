import React, { useState, useEffect, useRef } from 'react';
import { 
  AIChatSession, 
  AIChatMessage, 
  Topic, 
  Subject 
} from '../../types';
import { askStudyMateAssistant } from '../../lib/gemini';
import { useAuth } from '../../context/AuthContext';
import { 
  Bot, 
  Send, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  RotateCcw, 
  ThumbsUp, 
  ThumbsDown,
  BookOpen,
  MessageSquare,
  Search,
  ChevronRight,
  ShieldCheck,
  Code
} from 'lucide-react';

interface AIAssistantViewProps {
  initialTopicContext?: { topic: Topic; subject: Subject } | null;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({ initialTopicContext }) => {
  const { userProfile } = useAuth();
  
  const [sessions, setSessions] = useState<AIChatSession[]>([
    {
      id: 'session_1',
      studentId: userProfile?.uid || 'guest',
      title: 'DBMS Normalization & BCNF Decomposition',
      createdAt: '2026-09-10T10:00:00Z',
      updatedAt: '2026-09-10T10:30:00Z',
      messages: [
        {
          id: 'm1',
          sender: 'assistant',
          content: 'Hello! I am your **StudyMate AI Academic Tutor**.\n\nI can help you break down complex engineering concepts, review university syllabus topics, explain algorithms step-by-step, or generate practice questions.\n\nWhat topic would you like to master today?',
          createdAt: '10:00 AM'
        }
      ]
    },
    {
      id: 'session_2',
      studentId: userProfile?.uid || 'guest',
      title: 'Operating Systems - Deadlock Banker Algorithm',
      createdAt: '2026-09-08T14:00:00Z',
      updatedAt: '2026-09-08T14:20:00Z',
      messages: [
        {
          id: 'm2',
          sender: 'assistant',
          content: 'Ready to examine resource allocation matrices and safe state checks in Banker\'s algorithm!',
          createdAt: '02:00 PM'
        }
      ]
    }
  ]);

  const [activeSessionId, setActiveSessionId] = useState<string>('session_1');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState('');

  const chatBottomRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  // Auto-scroll on new messages
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, loading]);

  // Handle incoming topic prompt from course page
  useEffect(() => {
    if (initialTopicContext) {
      handleCreateNewChat(`Explain: ${initialTopicContext.topic.title}`);
      handleSendPrompt(`Please give me a complete academic breakdown of "${initialTopicContext.topic.title}" from ${initialTopicContext.subject.name}. Include core formulas, real-world examples, and common exam questions.`);
    }
  }, [initialTopicContext]);

  const handleCreateNewChat = (title = 'New Study Session') => {
    const newSession: AIChatSession = {
      id: `session_${Date.now()}`,
      studentId: userProfile?.uid || 'guest',
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `m_${Date.now()}`,
          sender: 'assistant',
          content: `Welcome to a new study session on **${title}**! Ask me any concept, pseudocode proof, or exam numerical.`,
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = sessions.filter(s => s.id !== sessionId);
    if (remaining.length === 0) {
      handleCreateNewChat();
    } else {
      setSessions(remaining);
      if (activeSessionId === sessionId) {
        setActiveSessionId(remaining[0].id);
      }
    }
  };

  const handleSendPrompt = async (textToSend?: string) => {
    const prompt = textToSend || inputText;
    if (!prompt.trim() || loading) return;

    const userMsg: AIChatMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      content: prompt,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update session title if first user message
    const isFirstUserMsg = activeSession.messages.filter(m => m.sender === 'user').length === 0;
    const newTitle = isFirstUserMsg ? prompt.slice(0, 36) + '...' : activeSession.title;

    setSessions(prev => prev.map(s => {
      if (s.id === activeSession.id) {
        return {
          ...s,
          title: newTitle,
          messages: [...s.messages, userMsg],
          updatedAt: new Date().toISOString()
        };
      }
      return s;
    }));

    setInputText('');
    setLoading(true);

    try {
      const historyContext = activeSession.messages.map(m => ({
        role: m.sender,
        text: m.content
      }));
      historyContext.push({ role: 'user', text: prompt });

      const aiText = await askStudyMateAssistant({
        messages: historyContext,
        subjectContext: userProfile?.branchName
      });

      const aiMsg: AIChatMessage = {
        id: `msg_a_${Date.now()}`,
        sender: 'assistant',
        content: aiText,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeSession.id) {
          return {
            ...s,
            messages: [...s.messages, aiMsg],
            updatedAt: new Date().toISOString()
          };
        }
        return s;
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSessions = sessions.filter(s => 
    s.title.toLowerCase().includes(searchHistory.toLowerCase())
  );

  return (
    <div id="ai-assistant-root" className="h-[calc(100vh-8rem)] flex rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
      
      {/* Left History Sidebar (Desktop) */}
      <div className="hidden md:flex flex-col w-72 border-r border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4">
        <button
          onClick={() => handleCreateNewChat()}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-indigo-600/20 cursor-pointer mb-4"
        >
          <Plus className="w-4 h-4" />
          <span>New Study Chat</span>
        </button>

        {/* Search Past Chats */}
        <div className="relative mb-3">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchHistory}
            onChange={(e) => setSearchHistory(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
            Recent Topics
          </p>
          {filteredSessions.map((session) => {
            const isActive = session.id === activeSession.id;
            return (
              <div
                key={session.id}
                onClick={() => setActiveSessionId(session.id)}
                className={`group flex items-center justify-between p-2.5 rounded-xl text-xs cursor-pointer transition-all ${
                  isActive 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs border border-slate-200 dark:border-slate-700' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                  <span className="truncate">{session.title}</span>
                </div>
                <button
                  onClick={(e) => handleDeleteSession(session.id, e)}
                  title="Delete Chat"
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Private to your student account</span>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900">
        
        {/* Chat Header */}
        <div className="h-14 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                {activeSession.title}
              </h3>
              <p className="text-[11px] text-slate-400">
                StudyMate AI Tutor • Gemini 2.5 Flash Engine
              </p>
            </div>
          </div>

          <button
            onClick={() => handleCreateNewChat()}
            className="md:hidden p-2 rounded-xl text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin">
          {activeSession.messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  isUser 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gradient-to-tr from-indigo-600 to-blue-500 text-white'
                }`}>
                  {isUser ? (userProfile?.fullName?.[0] || 'U') : <Sparkles className="w-4 h-4 text-amber-300" />}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none whitespace-pre-wrap'
                  }`}>
                    {msg.content}
                  </div>

                  {/* Actions under AI messages */}
                  {!isUser && (
                    <div className="flex items-center gap-3 px-1 text-[11px] text-slate-400">
                      <span>{msg.createdAt}</span>
                      <button
                        onClick={() => handleCopy(msg.content, msg.id)}
                        className="hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button 
                        onClick={() => alert('Marked as helpful feedback!')}
                        className="hover:text-emerald-500 flex items-center gap-1"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* AI Thinking Animation */}
          {loading && (
            <div className="flex gap-3 max-w-md">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 font-medium">StudyMate AI is analyzing your question...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="ai-prompt-input"
              type="text"
              placeholder="Ask StudyMate anything (e.g. 'Explain 2NF with an example' or 'How does OSPF work?')..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />

            <button
              id="ai-prompt-send-btn"
              type="submit"
              disabled={!inputText.trim() || loading}
              className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white transition-all shadow-sm shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
