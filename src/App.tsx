import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  Code, 
  Award, 
  Heart, 
  Terminal, 
  GraduationCap, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  User, 
  Map, 
  HelpCircle,
  Lightbulb
} from "lucide-react";
import { chapters } from "./data/chapters";
import { UserStats, Chapter, Topic } from "./types";
import { Sidebar } from "./components/Sidebar";
import { ChapterDashboard } from "./components/ChapterDashboard";
import { TopicContentView } from "./components/TopicContentView";
import { CodeLibraryView } from "./components/CodeLibraryView";
import { FavoritesView } from "./components/FavoritesView";
import { HandbookView } from "./components/HandbookView";
import { QuizView } from "./components/QuizView";
import { ExercisesCenterView } from "./components/ExercisesCenterView";

const STORAGE_KEY = "db_academy_user_stats_v1";

const defaultUserStats: UserStats = {
  favorites: [],
  quizScores: {},
  completedTopics: []
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const [activeTopicSlug, setActiveTopicSlug] = useState<string | null>(null);
  const [activeQuizChapterId, setActiveQuizChapterId] = useState<number | null>(null);
  
  // Search state across primary interface
  const [lessonQuery, setLessonQuery] = useState("");
  const [codeQuery, setCodeQuery] = useState("");

  // Load from local storage
  const [userStats, setUserStats] = useState<UserStats>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error reading localStorage stats", e);
    }
    return defaultUserStats;
  });

  // Save to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userStats));
  }, [userStats]);

  // Aggregate stats across our 10 chapters
  const totalTopics = chapters.reduce((sum, ch) => sum + ch.topics.length, 0);
  const completedCount = userStats.completedTopics.length;
  const progressPercentage = totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0;

  // Calculate total snippets and exercises
  const totalSnippets = chapters.reduce((sum, ch) => 
    sum + ch.topics.reduce((sumEx, top) => sumEx + top.examples.length, 0), 0
  );
  const totalExercises = chapters.reduce((sum, ch) => 
    sum + ch.topics.reduce((sumEx, top) => sumEx + top.exercises.length, 0), 0
  );

  // Profile actions
  const handleToggleFavorite = (id: string) => {
    setUserStats((prev) => {
      const favorites = prev.favorites.includes(id)
        ? prev.favorites.filter((f) => f !== id)
        : [...prev.favorites, id];
      return { ...prev, favorites };
    });
  };

  const handleSetTopicCompletion = (id: string, complete: boolean) => {
    setUserStats((prev) => {
      const completedTopics = complete
        ? prev.completedTopics.includes(id) ? prev.completedTopics : [...prev.completedTopics, id]
        : prev.completedTopics.filter((t) => t !== id);
      return { ...prev, completedTopics };
    });
  };

  const handleSaveQuizScore = (chapterId: number, score: number) => {
    setUserStats((prev) => {
      const currentBest = prev.quizScores[chapterId] || 0;
      const quizScores = {
        ...prev.quizScores,
        [chapterId]: Math.max(currentBest, score)
      };
      return { ...prev, quizScores };
    });
  };

  // Nav actions
  const handleSelectTopic = (chapterID: number, topicSlug: string) => {
    setActiveChapterId(chapterID);
    setActiveTopicSlug(topicSlug);
    setCurrentTab("dashboard");
    setActiveQuizChapterId(null);
  };

  const handleStartQuiz = (chapterID: number) => {
    setActiveQuizChapterId(chapterID);
    setCurrentTab("quizzone");
    setActiveChapterId(null);
    setActiveTopicSlug(null);
  };

  const selectedChapter = activeChapterId 
    ? chapters.find((ch) => ch.id === activeChapterId) 
    : null;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-800 antialiased">
      
      {/* PROFESSIONAL POLISH SIDEBAR */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col shrink-0 h-full overflow-hidden select-none">
        
        {/* Sidebar Logo Header */}
        <div className="p-5 flex items-center gap-3 border-b border-slate-800 shrink-0">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center font-extrabold text-white text-lg tracking-tight shadow-md shadow-blue-500/20">
            DB
          </div>
          <div>
            <span className="font-bold text-white tracking-tight text-base block font-sans leading-none">
              DB Academy
            </span>
            <span className="text-[10px] text-slate-500 font-mono tracking-wider">
              VOCATIONAL PORTAL
            </span>
          </div>
        </div>

        {/* Sidebar Navigation Links and Chapter list */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 scrollbar-thin">
          
          {/* General Navigation Menu */}
          <div className="space-y-1">
            <div className="px-2 text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">
              Menu Navigation
            </div>
            
            <button 
              onClick={() => {
                setCurrentTab("dashboard");
                setActiveChapterId(null);
                setActiveTopicSlug(null);
                setActiveQuizChapterId(null);
              }}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer
                ${currentTab === "dashboard" && activeChapterId === null
                  ? "bg-blue-600/10 text-blue-400 border-l-2 border-blue-500 font-bold" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
            >
              <span className="text-base shrink-0">🏠</span> 
              <span className="font-sans font-medium">Home Dashboard</span>
            </button>

            <button 
              onClick={() => {
                setCurrentTab("codelib");
                setActiveChapterId(null);
                setActiveTopicSlug(null);
                setActiveQuizChapterId(null);
              }}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer
                ${currentTab === "codelib" 
                  ? "bg-blue-600/10 text-blue-400 border-l-2 border-blue-500 font-bold" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
            >
              <span className="text-base shrink-0">⌨️</span> 
              <span className="font-sans font-medium">Code Library</span>
            </button>

            <button 
              onClick={() => {
                setCurrentTab("exercises-hub");
                setActiveChapterId(null);
                setActiveTopicSlug(null);
                setActiveQuizChapterId(null);
              }}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer
                ${currentTab === "exercises-hub" 
                  ? "bg-blue-600/10 text-blue-400 border-l-2 border-blue-500 font-bold" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
            >
              <span className="text-base shrink-0">📝</span> 
              <span className="font-sans font-medium">Exercises Hub</span>
            </button>

            <button 
              onClick={() => {
                setCurrentTab("favorites");
                setActiveChapterId(null);
                setActiveTopicSlug(null);
                setActiveQuizChapterId(null);
              }}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer
                ${currentTab === "favorites" 
                  ? "bg-blue-600/10 text-blue-400 border-l-2 border-blue-500 font-bold font-semibold" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
            >
              <span className="text-base shrink-0">❤️</span> 
              <span className="font-sans font-medium">Saved Bookmarks</span>
            </button>

            <button 
              onClick={() => {
                setCurrentTab("handbook");
                setActiveChapterId(null);
                setActiveTopicSlug(null);
                setActiveQuizChapterId(null);
              }}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer
                ${currentTab === "handbook" 
                  ? "bg-blue-600/10 text-blue-400 border-l-2 border-blue-500 font-bold font-semibold" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
            >
              <span className="text-base shrink-0">🔧</span> 
              <span className="font-sans font-medium">Setup Guild-Lab</span>
            </button>
          </div>

          {/* Chapters Sub-Menu Navigation */}
          <div className="space-y-1">
            <div className="px-2 text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2 flex justify-between items-center">
              <span>Learning Path</span>
              <span className="font-mono text-slate-600 font-semibold text-[9px]">{progressPercentage.toFixed(0)}% done</span>
            </div>
            
            <div className="space-y-1 max-h-[280px] overflow-y-auto pr-1">
              {chapters.map((ch) => {
                const isChActive = activeChapterId === ch.id;
                // Count progress in this chapter
                const totalInCh = ch.topics.length;
                const completedInCh = ch.topics.filter(t => userStats.completedTopics.includes(t.id)).length;
                const percentInCh = totalInCh > 0 ? (completedInCh / totalInCh) * 100 : 0;

                return (
                  <button
                    key={ch.id}
                    onClick={() => handleSelectTopic(ch.id, ch.topics[0]?.slug)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-md transition-all text-left cursor-pointer group
                      ${isChActive 
                        ? "bg-slate-800/90 border border-slate-700 text-blue-400" 
                        : "hover:bg-slate-800/45 text-slate-400 hover:text-slate-250"
                      }`}
                  >
                    <span className="truncate italic font-serif flex items-center gap-1.5 antialiased">
                      <span className="font-sans font-bold text-[10px] bg-slate-800 text-slate-500 px-1 rounded">Ch {ch.id}</span>
                      <span className="truncate">{ch.title}</span>
                    </span>
                    
                    {percentInCh === 100 ? (
                      <span className="text-[9.5px] bg-green-500/20 text-green-400 px-1 py-0.2 rounded font-mono shrink-0">100%</span>
                    ) : percentInCh > 0 ? (
                      <span className="text-[9.5px] bg-blue-500/10 text-blue-400 px-1 py-0.2 rounded font-mono shrink-0">{percentInCh.toFixed(0)}%</span>
                    ) : (
                      <span className="text-[10px] text-slate-650 font-bold shrink-0">🔒</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Sidebar Bottom Profile Section */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg select-none">
              👤
            </div>
            <div className="text-left select-none">
              <div className="font-semibold text-white text-xs tracking-tight">Vocational Student</div>
              <div className="text-slate-500 text-[10.5px]">Python Programming 101</div>
            </div>
          </div>
        </div>

      </aside>

      {/* MAIN LAYOUT FRAME */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
        
        {/* TOP LEVEL NAVIGATION HEADER */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 leading-none select-none">
          <div className="flex items-center gap-6 w-3/4 max-w-4xl">
            {/* Quick search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4.5 w-4.5" />
              <input 
                type="text" 
                placeholder="Search Lessons (e.g. GUI, Loops)..." 
                value={lessonQuery}
                onChange={(e) => {
                  setLessonQuery(e.target.value);
                  setCurrentTab("dashboard");
                  setActiveChapterId(null);
                  setActiveTopicSlug(null);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-xs sm:text-sm text-slate-700 placeholder-slate-450 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
              {lessonQuery && (
                <button 
                  onClick={() => setLessonQuery("")} 
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10.5px] font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Code snippets search */}
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs text-blue-500">⌨️</span>
              <input 
                type="text" 
                placeholder="Search Code Library (e.g. print, class)..." 
                value={codeQuery}
                onChange={(e) => {
                  setCodeQuery(e.target.value);
                  setCurrentTab("codelib");
                  setActiveChapterId(null);
                  setActiveTopicSlug(null);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-blue-50/50 border-none rounded-xl text-xs sm:text-sm text-blue-900 placeholder-blue-300 focus:ring-2 focus:ring-blue-400 transition-all outline-none"
              />
              {codeQuery && (
                <button 
                  onClick={() => setCodeQuery("")} 
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10.5px] font-bold text-blue-400 hover:text-blue-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Top header navigation actions */}
          <div className="flex gap-3">
            <button 
              onClick={() => {
                setCurrentTab("handbook");
                setActiveChapterId(null);
                setActiveTopicSlug(null);
                setActiveQuizChapterId(null);
              }}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100/65 rounded-lg transition-all cursor-pointer font-sans"
            >
              Help Center
            </button>
            <button 
              onClick={() => {
                setCurrentTab("dashboard");
                setActiveChapterId(null);
                setActiveTopicSlug(null);
                setActiveQuizChapterId(null);
              }}
              className="px-5 py-2 bg-blue-700 hover:bg-blue-800 hover:scale-[1.02] text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-blue-700/15 transition-all text-center cursor-pointer font-sans whitespace-nowrap"
            >
              My Progress: {progressPercentage.toFixed(0)}%
            </button>
          </div>
        </header>

        {/* CONTAINER CONTENT SECTION */}
        <section className="p-6 md:p-8 flex-1 overflow-y-auto flex flex-col gap-6 min-h-0">
          
          {/* Bento Grid Analytics Statistics (PROFESSIONAL POLISH STATS BANNER) */}
          {currentTab === "dashboard" && activeChapterId === null && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 shrink-0 select-none">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block font-sans">
                    Total Curriculum
                  </span>
                  <span className="text-3xl font-light text-slate-800 antialiased tracking-tight font-sans">
                    10 <span className="text-sm font-normal text-slate-400 ml-1">Chapters</span>
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1 font-sans">
                    <span>Completed Topics</span>
                    <span>{completedCount} / {totalTopics}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-550" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block font-sans">
                    Interactive Codeworks
                  </span>
                  <span className="text-3xl font-light text-slate-800 antialiased tracking-tight font-sans">
                    {totalSnippets} <span className="text-sm font-normal text-slate-400 ml-1">Templates</span>
                  </span>
                </div>
                <span className="text-[10.5px] text-green-600 mt-2 font-medium flex items-center gap-1 font-sans">
                  🟢 Live compilers & line analysis active
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block font-sans">
                    Mini Exercise Labs
                  </span>
                  <span className="text-3xl font-light text-slate-800 antialiased tracking-tight font-sans">
                    {totalExercises} <span className="text-sm font-normal text-slate-400 ml-1">Worksheets</span>
                  </span>
                </div>
                <span className="text-[10.5px] text-blue-600 mt-2 font-medium flex items-center gap-1 font-sans">
                  💡 Real answers & explanations annotated
                </span>
              </div>

            </div>
          )}

          {/* ACTIVE ROUTE / VIEW PORTAL CONTAINER */}
          <div className="flex-1 bg-white dark:bg-slate-900/40 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-0 flex flex-col justify-start">
            
            {/* View Render Conditional Routing */}
            {currentTab === "dashboard" && (
              <>
                {selectedChapter && activeTopicSlug ? (
                  <TopicContentView
                    chapter={selectedChapter}
                    activeTopicSlug={activeTopicSlug}
                    onBackToDashboard={() => {
                      setActiveChapterId(null);
                      setActiveTopicSlug(null);
                    }}
                    userStats={userStats}
                    onToggleFavorite={handleToggleFavorite}
                    onSetTopicCompletion={handleSetTopicCompletion}
                    onChangeTopic={(slug) => setActiveTopicSlug(slug)}
                  />
                ) : (
                  <ChapterDashboard
                    chapters={chapters}
                    userStats={userStats}
                    onSelectTopic={handleSelectTopic}
                    onNavigateTab={(tab) => setCurrentTab(tab)}
                  />
                )}
              </>
            )}

            {currentTab === "codelib" && (
              <CodeLibraryView
                chapters={chapters}
                userStats={userStats}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {currentTab === "exercises-hub" && (
              <ExercisesCenterView
                chapters={chapters}
                userStats={userStats}
              />
            )}

            {currentTab === "favorites" && (
              <FavoritesView
                chapters={chapters}
                favorites={userStats.favorites}
                onToggleFavorite={handleToggleFavorite}
                onNavigateToTopic={handleSelectTopic}
              />
            )}

            {currentTab === "handbook" && (
              <HandbookView />
            )}

          </div>

        </section>

        {/* BRANded FOOTER */}
        <footer className="px-8 py-4 bg-white border-t border-slate-200 text-[10px] text-slate-400 flex justify-between shrink-0 select-none antialiased">
          <div>Developed for Vocational Education • Python & Small Business App Development • สอศ. พระจอมเกล้าปริวรรต</div>
          <div className="flex gap-4 font-medium text-slate-500">
            <a href="#dashboard" onClick={() => setCurrentTab("dashboard")} className="hover:text-blue-600 transition">Course Map</a>
            <a href="#handbook" onClick={() => setCurrentTab("handbook")} className="hover:text-blue-600 transition">Instructor Panel</a>
            <a href="#handbook" onClick={() => setCurrentTab("handbook")} className="hover:text-blue-600 transition">Contact Center</a>
          </div>
        </footer>

      </main>

    </div>
  );
}
