import React from 'react';
import { Bookmark as BookmarkType } from '../../types';
import { Bookmark, Trash2, ExternalLink, FileText, Sparkles, BookOpen } from 'lucide-react';

interface BookmarksViewProps {
  bookmarks: BookmarkType[];
  onRemoveBookmark: (id: string) => void;
  onNavigateToItem?: (item: BookmarkType) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({ 
  bookmarks, 
  onRemoveBookmark,
  onNavigateToItem 
}) => {
  return (
    <div id="bookmarks-view-root" className="space-y-6 pb-12">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Saved Academic Bookmarks
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Curated notes, AI explanations, key exam answers, and syllabus topics
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <Bookmark className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">No bookmarks saved yet</p>
          <p className="text-xs text-slate-400 mt-1">
            Click the bookmark icon on any topic or AI explanation to save it here for quick revision.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 uppercase">
                    {b.type.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => onRemoveBookmark(b.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {b.title}
                </h3>
                {b.subtitle && (
                  <p className="text-xs text-slate-500 mt-0.5">{b.subtitle}</p>
                )}

                {b.contentSnippet && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 line-clamp-3">
                    {b.contentSnippet}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Added on {b.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
