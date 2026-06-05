import React, { useState } from "react";
import { 
  Search, 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  Code, 
  CheckCircle2, 
  Copy, 
  Check, 
  Filter
} from "lucide-react";
import { Chapter, Exercise } from "../types";

interface ExercisesCenterViewProps {
  chapters: Chapter[];
  userStats: { completedTopics: string[] };
}

export const ExercisesCenterView: React.FC<ExercisesCenterViewProps> = ({
  chapters,
  userStats
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [selectedChapterId, setSelectedChapterId] = useState<number | "all">("all");
  const [revealSolutions, setRevealSolutions] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealHints, setRevealHints] = useState<Record<string, boolean>>({});
  const [studentNotes, setStudentNotes] = useState<Record<string, string>>({});

  // Extract all exercises with chapter and topic titles
  const allExercises: Array<{
    exercise: Exercise;
    chapterId: number;
    chapterTitle: string;
    topicId: string;
    topicTitle: string;
  }> = [];

  chapters.forEach((ch) => {
    ch.topics.forEach((top) => {
      top.exercises.forEach((ex) => {
        allExercises.push({
          exercise: ex,
          chapterId: ch.id,
          chapterTitle: ch.title,
          topicId: top.id,
          topicTitle: top.title
        });
      });
    });
  });

  // Filters logic
  const filteredExercises = allExercises.filter((rec) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      rec.exercise.title.toLowerCase().includes(query) ||
      rec.exercise.description.toLowerCase().includes(query) ||
      rec.topicTitle.toLowerCase().includes(query);

    const matchesDifficulty = 
      selectedDifficulty === "all" || 
      rec.exercise.difficulty === selectedDifficulty;

    const matchesChapter = 
      selectedChapterId === "all" || 
      rec.chapterId === selectedChapterId;

    return matchesSearch && matchesDifficulty && matchesChapter;
  });

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSolution = (id: string) => {
    setRevealSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHint = (id: string) => {
    setRevealHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNoteChange = (id: string, value: string) => {
    setStudentNotes(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* HEADER BANNER */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold shadow-sm shadow-indigo-500/10">
            📝
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-sans tracking-wide">
              ศูนย์รวมโจทย์แบบฝึกหัด Python (Python Exercises Hub)
            </h1>
            <p className="text-xs text-slate-400 font-sans font-light">
              คลังรวมแบบฝึกหัดแก้โค้ดทั้งหมด {allExercises.length} ข้อ คัดกรองระดับความยากเพื่อพัฒนาทักษะการแก้ปัญหาโปรแกรมได้อย่างเป็นระบบ
            </p>
          </div>
        </div>

        {/* CONTROLS & FILTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 mt-4">
          
          {/* Query input */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3 top-3 text-slate-400 h-4.5 w-4.5" />
            <input
              type="text"
              placeholder="🔍 ค้นหาคำในโจทย์... (เช่น วนซ้ำ, List, Calculator, if-else)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs md:text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-sans tracking-wide text-slate-800 dark:text-slate-200"
            />
          </div>

          {/* Chapters Dropdown */}
          <div className="md:col-span-4 relative flex items-center gap-1.5">
            <BookOpen className="h-4.5 w-4.5 text-slate-400 shrink-0" />
            <select
              value={selectedChapterId}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedChapterId(val === "all" ? "all" : Number(val));
              }}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-300 outline-none font-sans"
            >
              <option value="all">📁 แสดงโจทย์ทุกบทเรียน (All Chapters)</option>
              {chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>บทที่ {ch.id}: {ch.title.substring(0, 32)}...</option>
              ))}
            </select>
          </div>

          {/* Difficulty options */}
          <div className="md:col-span-3 flex flex-wrap gap-1 items-center justify-end">
            <button
              onClick={() => setSelectedDifficulty("all")}
              className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold font-sans transition
                ${selectedDifficulty === "all" 
                  ? "bg-indigo-600 text-white" 
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"}`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setSelectedDifficulty("easy")}
              className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold font-sans transition
                ${selectedDifficulty === "easy" 
                  ? "bg-emerald-600 text-white" 
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-emerald-600"}`}
            >
              ง่าย
            </button>
            <button
              onClick={() => setSelectedDifficulty("medium")}
              className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold font-sans transition
                ${selectedDifficulty === "medium" 
                  ? "bg-amber-500 text-white" 
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-amber-600"}`}
            >
              ปานกลาง
            </button>
            <button
              onClick={() => setSelectedDifficulty("hard")}
              className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold font-sans transition
                ${selectedDifficulty === "hard" 
                  ? "bg-orange-600 text-white" 
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-orange-600"}`}
            >
              ท้าทาย
            </button>
          </div>

        </div>
      </div>

      {/* EXERCISES CONTENT GRID */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-slate-405 font-sans flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-indigo-500" /> คัดกรองโจทย์พบทั้งหมด: <strong> {filteredExercises.length} โจทย์</strong>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            PERSISTENT CLOUD STATS
          </span>
        </div>

        {filteredExercises.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <HelpCircle className="h-10 w-10 mx-auto text-slate-300 animate-bounce mb-2" />
            <h3 className="text-sm font-bold text-slate-700">ไม่พบหัวข้อโจทย์ดังกล่าว</h3>
            <p className="text-xs text-slate-400 mt-1">ลองเปลี่ยนคำค้นหาหรือตัวกรองที่เลือกใหม่อีกครั้ง</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {filteredExercises.map((rec) => {
              const ex = rec.exercise;
              const isSolutionRevealed = revealSolutions[ex.id] || false;
              const isHintRevealed = revealHints[ex.id] || false;
              const noteText = studentNotes[ex.id] || "";

              return (
                <div 
                  key={ex.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-750 transition duration-200 overflow-hidden"
                >
                  {/* Top Header Row of Exercise */}
                  <div className="p-5 border-b border-slate-100 dark:border-slate-850 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/60">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase
                          ${ex.difficulty === "easy" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/55 dark:text-emerald-400" : ""}
                          ${ex.difficulty === "medium" ? "bg-amber-100 text-amber-800 dark:bg-amber-950/55 dark:text-amber-400" : ""}
                          ${ex.difficulty === "hard" ? "bg-orange-100 text-orange-900 dark:bg-orange-950/55 dark:text-orange-400" : ""}
                        `}>
                          โจทย์ระดับ: {ex.difficulty === "easy" ? "ง่าย" : ex.difficulty === "medium" ? "ปานกลาง" : "ท้าทาย"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          บทเรียนที่ {rec.chapterId} • {rec.topicTitle}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-800 dark:text-slate-150 font-sans">
                        🔑 {ex.title}
                      </h3>
                    </div>

                    <span className="font-mono text-[10px] bg-indigo-50 dark:bg-slate-800 rounded px-2.5 py-1 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-100/30">
                      ID: {ex.id}
                    </span>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 space-y-4">
                    
                    {/* Problem Description Code Block-like or Text */}
                    <div className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap border border-slate-850 select-text">
                      <div className="text-[10px] text-slate-500 font-sans tracking-wide uppercase border-b border-slate-800 pb-1.5 mb-2.5 flex items-center gap-2">
                        <span>📝 โจทย์ระบุความต้องการ (Problem Scope)</span>
                      </div>
                      {ex.description}
                    </div>

                    {/* Hint Dropdown */}
                    <div className="border border-indigo-100/50 dark:border-indigo-900/40 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleHint(ex.id)}
                        className="w-full flex items-center justify-between p-3 bg-indigo-50/20 dark:bg-indigo-950/10 text-xs font-bold text-indigo-700 dark:text-indigo-400 font-sans text-left cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <Lightbulb className="h-4 w-4 text-amber-500" />
                          ดูแผนภาพเบาะแสแนะแนวทาง (Reveal Hint/Strategy)
                        </span>
                        {isHintRevealed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>

                      {isHintRevealed && (
                        <div className="p-4 bg-white dark:bg-slate-900/40 text-[11.5px] text-slate-650 dark:text-slate-405 leading-relaxed font-sans border-t border-indigo-100/20">
                          {ex.hint}
                        </div>
                      )}
                    </div>

                    {/* Scratchpad and Solutions Toggle */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      
                      {/* Left: Scratchpad for students to practice typing draft code */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 font-sans flex items-center gap-1">
                          <Code className="h-3.5 w-3.5 text-blue-500" /> พื้นที่ร่างโค้ด / ออกแบบความคิด (Interactive Scratchpad)
                        </label>
                        <textarea
                          rows={6}
                          placeholder="# ลองเริ่มเขียนคำตอบของคุณที่นี่ (ไวยากรณ์ Python)\n# เช่น:\n# def my_function():\n#     print('Hello Python')\n"
                          value={noteText}
                          onChange={(e) => handleNoteChange(ex.id, e.target.value)}
                          className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200 leading-relaxed max-w-full"
                        />
                        <p className="text-[10px] text-indigo-500 font-sans font-light italic">
                          💡 พิมพ์โค้ดได้อย่างปลอดภัย ข้อมูลจะถูกคงค่าไว้จำเพาะช่วงการใช้งานปัจจุบันเพื่อการเรียนรู้
                        </p>
                      </div>

                      {/* Right: Master solution (Hidden by default) */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 font-sans flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> เฉลยและบทวิเคราะห์จากครูผู้สอน (Instructor Key Solution)
                        </label>

                        {isSolutionRevealed ? (
                          <div className="space-y-2 border border-emerald-100 dark:border-emerald-900/40 rounded-xl overflow-hidden">
                            <div className="bg-emerald-50/20 dark:bg-emerald-950/10 p-3 text-slate-700 dark:text-slate-400 text-xs font-sans leading-relaxed border-b border-emerald-100/30">
                              <span className="font-bold text-emerald-800 dark:text-emerald-400">💡 คำอธิบายเชิงขั้นตอน: </span>
                              {ex.detailedSolution}
                            </div>
                            
                            <div className="bg-slate-950 relative overflow-hidden">
                              <div className="absolute right-2.5 top-2.5 z-10 flex gap-1">
                                <button
                                  onClick={() => handleCopyCode(ex.id, ex.solutionCode)}
                                  className="p-1 px-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-[10.5px] flex items-center gap-1 transition"
                                  title="คัดลอกโค้ดเฉลย"
                                >
                                  {copiedId === ex.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                                  <span>{copiedId === ex.id ? "ก๊อปปี้แล้ว!" : "Copy URL"}</span>
                                </button>
                              </div>
                              <pre className="p-3.5 text-[11px] font-mono text-emerald-350 overflow-x-auto leading-relaxed pt-9 text-emerald-400">
                                {ex.solutionCode}
                              </pre>
                            </div>
                          </div>
                        ) : (
                          <div className="h-[148px] bg-slate-100 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-850 flex flex-col items-center justify-center p-4 text-center">
                            <HelpCircle className="h-8 w-8 text-indigo-400 opacity-60 animate-pulse mb-1.5" />
                            <p className="text-xs font-bold text-slate-650 dark:text-slate-400">คำเฉลยพร้อมวิเคราะห์แนวทางเฉลยแนวคริก</p>
                            <p className="text-[10px] text-slate-400 font-sans mt-0.5 mb-2">ลองฝึกเขียนโค้ดแก้ปริศนาในกระดาษซ้ายมือเสียก่อน</p>
                            <button
                              onClick={() => toggleSolution(ex.id)}
                              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition shadow-sm cursor-pointer"
                            >
                              👁️ เปิดวิเคราะห์คำเฉลย
                            </button>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Reveal/Hide Button for full width screen in case solution already shown */}
                    {isSolutionRevealed && (
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => toggleSolution(ex.id)}
                          className="px-3.5 py-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-md text-xs font-bold cursor-pointer font-sans"
                        >
                          ✖ ปิดกล่องคำเฉลยด่วน
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
