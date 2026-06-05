import React, { useState } from "react";
import { 
  Search, 
  Code, 
  Compass, 
  Terminal as TermIcon, 
  FolderOpen,
  Filter,
  PlayCircle
} from "lucide-react";
import { Chapter, CodeExample } from "../types";
import { CodeTerminal } from "./CodeTerminal";

interface CodeLibraryViewProps {
  chapters: Chapter[];
  userStats: { favorites: string[] };
  onToggleFavorite: (id: string) => void;
}

export const CodeLibraryView: React.FC<CodeLibraryViewProps> = ({
  chapters,
  userStats,
  onToggleFavorite
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<"all" | "basic" | "intermediate" | "applied">("all");
  const [selectedChapterId, setSelectedChapterId] = useState<number | "all">("all");
  const [activeExampleId, setActiveExampleId] = useState<string | null>(null);

  // Extract all examples from all chapters with parent metadata
  const allExamplesArr: Array<{
    example: CodeExample;
    chapterId: number;
    chapterTitle: string;
    topicTitle: string;
  }> = [];

  chapters.forEach((ch) => {
    ch.topics.forEach((top) => {
      top.examples.forEach((ex) => {
        allExamplesArr.push({
          example: ex,
          chapterId: ch.id,
          chapterTitle: ch.title,
          topicTitle: top.title
        });
      });
    });
  });

  // Filter based on query, level, and chapter
  const filteredExamples = allExamplesArr.filter((record) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      record.example.title.toLowerCase().includes(query) ||
      record.example.code.toLowerCase().includes(query) ||
      record.topicTitle.toLowerCase().includes(query);
    
    const matchesLevel = 
      selectedLevel === "all" || 
      record.example.level === selectedLevel;

    const matchesChapter = 
      selectedChapterId === "all" || 
      record.chapterId === selectedChapterId;

    return matchesSearch && matchesLevel && matchesChapter;
  });

  // Initialize active item if null or not found in current filtered
  const activeRecord = 
    filteredExamples.find(r => r.example.id === activeExampleId) || 
    filteredExamples[0];

  return (
    <div className="space-y-6">
      
      {/* Search and Filters Header Board */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-sans tracking-wide">
              คลังตัวอย่างโค้ดสากล (Central Code Library)
            </h1>
            <p className="text-xs text-slate-400 font-sans font-light">
              ค้นหา วิเคราะห์ และทดสอบรันผลสถิติจากคลังตัวอย่างทั้งสิ้น {allExamplesArr.length} บทความโค้ด
            </p>
          </div>
        </div>

        {/* Filters Panel layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          
          {/* Query input (md:col-span-5) */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3 top-3 text-slate-400 h-4.5 w-4.5" />
            <input
              type="text"
              placeholder="🔍 พิมพ์ค้นหาโค้ด... (เช่น: def, print, class, Label, if)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs md:text-sm outline-none focus:ring-2 focus:ring-blue-500 font-sans tracking-wide text-slate-800 dark:text-slate-200"
            />
          </div>

          {/* Chapter Selector Dropdown (md:col-span-4) */}
          <div className="md:col-span-4 relative flex items-center gap-1.5">
            <FolderOpen className="h-4.5 w-4.5 text-slate-400 shrink-0" />
            <select
              value={selectedChapterId}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedChapterId(val === "all" ? "all" : Number(val));
              }}
              className="w-full p-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-300 outline-none font-sans"
            >
              <option value="all">📁 แสดงทุกบทเรียน (All Chapters)</option>
              {chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>บทที่ {ch.id}: {ch.title.substring(0, 30)}...</option>
              ))}
            </select>
          </div>

          {/* Filter options chips (md:col-span-3) */}
          <div className="md:col-span-3 flex flex-wrap gap-1 items-center justify-end">
            <button
              onClick={() => setSelectedLevel("all")}
              className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold font-sans transition
                ${selectedLevel === "all" 
                  ? "bg-blue-600 text-white" 
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-705 text-slate-600 dark:text-slate-300"}`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setSelectedLevel("basic")}
              className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold font-sans transition
                ${selectedLevel === "basic" 
                  ? "bg-emerald-600 text-white" 
                  : "bg-slate-100 hover:bg-slate-205 dark:bg-slate-800 text-emerald-600 dark:text-emerald-450"}`}
            >
              พื้นฐาน
            </button>
            <button
              onClick={() => setSelectedLevel("intermediate")}
              className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold font-sans transition
                ${selectedLevel === "intermediate" 
                  ? "bg-amber-500 text-white" 
                  : "bg-slate-100 hover:bg-slate-205 dark:bg-slate-800 text-amber-600"}`}
            >
              กลาง
            </button>
            <button
              onClick={() => setSelectedLevel("applied")}
              className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold font-sans transition
                ${selectedLevel === "applied" 
                  ? "bg-indigo-600 text-white" 
                  : "bg-slate-100 hover:bg-slate-205 dark:bg-slate-800 text-indigo-600"}`}
            >
              ประยุกต์
            </button>
          </div>

        </div>
      </div>

      {/* Main library core panel: list left + active simulator right (10:14 mesh layout) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        
        {/* Left Hand: list of filtered example items (xl:col-span-4) */}
        <div className="xl:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-3.5 space-y-3 shadow-sm min-h-[350px]">
          <div className="flex items-center justify-between border-b pb-2 select-none border-slate-100 dark:border-slate-800 text-xs">
            <span className="font-bold text-slate-500 font-sans flex items-center gap-1">
              <Filter className="h-4 w-4 text-blue-500" /> อะไหล่สเกลตรวจเจอกรอง
            </span>
            <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 rounded font-bold text-blue-600 dark:text-blue-400">
              {filteredExamples.length} ชิ้น
            </span>
          </div>

          <div className="space-y-1.5 overflow-y-auto max-h-[500px] pr-1.5 scrollbar-thin">
            {filteredExamples.map((item) => {
              const isActive = item.example.id === activeRecord?.example.id;
              return (
                <button
                  key={item.example.id}
                  onClick={() => setActiveExampleId(item.example.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition flex items-start gap-1.5 group
                    ${isActive 
                      ? "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50 text-slate-900" 
                      : "border-slate-100 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-850 bg-white dark:bg-slate-900/40 text-slate-650"
                    }`}
                >
                  <TermIcon className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 group-hover:text-blue-500"}`} />
                  <div className="space-y-0.5 truncate flex-1">
                    <p className="text-[9.5px] font-bold font-mono tracking-wider text-blue-600 dark:text-blue-400 leading-none">
                      บทที่ {item.chapterId} | {item.topicTitle.substring(0, 20)}
                    </p>
                    <p className={`text-xs font-bold truncate transition-colors ${isActive ? "text-blue-700 dark:text-blue-300" : "text-slate-850 dark:text-slate-200"}`}>
                      {item.example.title}
                    </p>
                    <div className="flex gap-1">
                      <span className="text-[8.5px] opacity-75 font-mono">
                        LV: {item.example.level.toUpperCase()}
                      </span>
                      {userStats.favorites.includes(item.example.id) && (
                        <span className="text-[9px] text-red-500 font-bold ml-1">❤️ FAVED</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}

            {filteredExamples.length === 0 && (
              <div className="text-center py-10 space-y-1 text-slate-400">
                <Compass className="h-8 w-8 mx-auto text-slate-300 opacity-60 animate-bounce" />
                <p className="text-xs italic font-sans">ไม่พบคลิปข้อมูลสอดคล้องกล้องกรอง</p>
                <p className="text-[10px] text-slate-300">กรุณาลองปรับเปลี่ยนตัวอักษรสืบค้นสลิตใหม่</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Hand: Interactive Sandbox Terminal for click-selected item (xl:col-span-8) */}
        <div className="xl:col-span-8">
          {activeRecord ? (
            <div className="space-y-4">
              {/* Parent breadcrumb guide */}
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-100/30 rounded-xl text-xs font-sans text-slate-600 dark:text-slate-350 flex items-center justify-between">
                <span>
                  📍 สะพานที่ยึดโยง: <strong>{activeRecord.chapterTitle}</strong> / {activeRecord.topicTitle}
                </span>
                <span className="font-mono text-[10.px] opacity-80 uppercase tracking-widest text-blue-600">
                  ID: {activeRecord.example.id}
                </span>
              </div>

              {/* Console rendering */}
              <CodeTerminal
                example={activeRecord.example}
                isFavorite={userStats.favorites.includes(activeRecord.example.id)}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 border rounded-2xl">
              <Compass className="h-10 w-10 mx-auto text-slate-350 opacity-50 animate-spin" />
              <p className="text-sm font-bold text-slate-400 mt-2">โปรแกรมกำลังถอดประจุ...</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
