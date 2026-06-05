import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  BookOpen, 
  Code, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle,
  ChevronRight,
  Sparkles,
  Info
} from "lucide-react";
import { Chapter, Topic, UserStats } from "../types";
import { CodeTerminal } from "./CodeTerminal";

interface TopicContentViewProps {
  chapter: Chapter;
  activeTopicSlug: string;
  onBackToDashboard: () => void;
  userStats: UserStats;
  onToggleFavorite: (id: string) => void;
  onSetTopicCompletion: (id: string, complete: boolean) => void;
  onChangeTopic: (slug: string) => void;
}

export const TopicContentView: React.FC<TopicContentViewProps> = ({
  chapter,
  activeTopicSlug,
  onBackToDashboard,
  userStats,
  onToggleFavorite,
  onSetTopicCompletion,
  onChangeTopic
}) => {
  const [activeTab, setActiveTab] = useState<"tutorial" | "errors" | "exercises">("tutorial");
  const [revealSolutions, setRevealSolutions] = useState<Record<string, boolean>>({});

  const activeTopic = chapter.topics.find((t) => t.slug === activeTopicSlug) || chapter.topics[0];

  // Reset navigation tabs when active topic alters
  useEffect(() => {
    setActiveTab("tutorial");
    setRevealSolutions({});
  }, [activeTopicSlug]);

  if (!activeTopic) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border">
        <p className="text-slate-400">ระดมหาบทเรียนไม่เจอในระบบการคลัง...</p>
        <button onClick={onBackToDashboard} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          กลับสู่สารบัญหน้าแรก
        </button>
      </div>
    );
  }

  const isCurrentTopicCompleted = userStats.completedTopics.includes(activeTopic.id);

  const toggleSolutionReveal = (id: string) => {
    setRevealSolutions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Navigation Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-sans cursor-pointer transition"
        >
          <ArrowLeft className="h-4 w-4" /> ย้อนกลับสู่หน้าสารบัญบทเรียน
        </button>

        <div className="text-right">
          <p className="text-[10px] text-slate-400 font-mono">กำลังศึกษาบทที่ {chapter.id}</p>
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-sans">
            {chapter.title}
          </h2>
        </div>
      </div>

      {/* Main layout frame: local side listing menu + textbook contents */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Side Topic Sub-Menu Navigator (xl:col-span-3) */}
        <div className="xl:col-span-3 space-y-2.5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 font-mono tracking-wider px-2 uppercase mb-2">
              หัวข้อย่อยบทที่ {chapter.id}
            </h3>
            
            <div className="space-y-1">
              {chapter.topics.map((top) => {
                const isActive = top.slug === activeTopicSlug;
                const isCompleted = userStats.completedTopics.includes(top.id);
                return (
                  <button
                    key={top.id}
                    onClick={() => onChangeTopic(top.slug)}
                    className={`w-full flex items-center justify-between text-left p-2.5 rounded-lg text-xs font-medium transition-colors
                      ${isActive 
                        ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50" 
                        : "hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400"
                      }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-1">
                      <span className={`text-[9.5px] font-mono shrink-0 px-1.5 py-0.5 rounded
                        ${isActive ? "bg-blue-200 text-blue-800" : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}>
                        {isActive ? "ACTIVE" : "LEARN"}
                      </span>
                      <span className="truncate font-sans">{top.title}</span>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-500 fill-current bg-emerald-100 dark:bg-slate-900 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats Summary Card */}
          <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-center space-y-1">
            <p className="text-[10px] text-slate-400 font-sans">คืบหน้าของบทเรียน</p>
            <p className="text-sm font-extrabold text-slate-700 dark:text-slate-300 font-mono">
              {chapter.topics.filter(t => userStats.completedTopics.includes(t.id)).length} / {chapter.topics.length} หัวข้อสำเร็จ
            </p>
          </div>
        </div>

        {/* Right Side Book content Viewer (xl:col-span-9) */}
        <div className="xl:col-span-9 space-y-6 bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          
          {/* Header of Active Section */}
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 font-sans tracking-wide">
              {activeTopic.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-light">
              {activeTopic.description}
            </p>
          </div>

          {/* Inner Tab Control: Textbook theory, Diagnostics, Exercises */}
          <div className="border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 pt-1 text-sm font-sans font-medium">
            <button
              onClick={() => setActiveTab("tutorial")}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5
                ${activeTab === "tutorial" 
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 font-bold" 
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
            >
              <BookOpen className="h-4 w-4" /> 📖 สาระการเรียนรู้และตัวอย่าง
            </button>
            <button
              onClick={() => setActiveTab("errors")}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5
                ${activeTab === "errors" 
                  ? "border-amber-500 text-amber-600 dark:text-amber-400 font-bold" 
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
            >
              <AlertTriangle className="h-4 w-4" /> ⚠️ ข้อบกพร่องยอดสปอย
            </button>
            <button
              onClick={() => setActiveTab("exercises")}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5
                ${activeTab === "exercises" 
                  ? "border-blue-600 text-indigo-600 dark:text-indigo-400 font-bold" 
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
            >
              <HelpCircle className="h-4 w-4" /> 📝 มินิแบบฝึกหัดทบทวน
            </button>
          </div>

          {/* TAB 1: Main textbook & code examples */}
          {activeTab === "tutorial" && (
            <div className="space-y-6 animate-fade-in">
              {/* Syntax box definition block */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <h3 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-4.5 w-4.5 text-blue-500" /> รูปแบบไวยากรณ์สากล (Syntax)
                </h3>
                <pre className="bg-slate-950 text-slate-100 p-3.5 rounded-lg border border-slate-850 text-xs font-mono overflow-x-auto leading-relaxed max-w-full">
                  {activeTopic.syntax}
                </pre>
              </div>

              {/* Examples listing container */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-sans tracking-wide">
                  🧪 คลังตัวอย่างทดลองเขียนสถิติ ({activeTopic.examples.length} บท)
                </h3>
                
                <div className="space-y-4">
                  {activeTopic.examples.map((ex, i) => (
                    <CodeTerminal
                      key={ex.id}
                      example={ex}
                      isFavorite={userStats.favorites.includes(ex.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Common errors diagnostic comparisons */}
          {activeTab === "errors" && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-4 bg-amber-50 dark:bg-amber-950/10 border border-amber-200/50 rounded-xl flex gap-3 text-xs md:text-sm text-slate-800 dark:text-slate-300 font-sans">
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1 leading-relaxed">
                  <p className="font-bold text-amber-800 dark:text-amber-400">ระดมเตือนสารตรวจบกพร่องยอดนิยม</p>
                  <p>นักเรียน ปวช./ปวส. มักสับสนโครงไวยากรณ์หรือลืมขีดระดับย่อหน้าสี่เคาะตัวคอมมอน วันนี้วิทยาลัยรวบสรุปแนวหลีกเลี่ยงและวิธีซ่อมสเปกมาแชร์</p>
                </div>
              </div>

              <div className="space-y-5">
                {activeTopic.commonErrors.map((err, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                        SIGNAL ERROR
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-250 font-mono">
                        🔴 {err.errorType}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                        <strong>สาเหตุหลัก:</strong> {err.cause}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                        <strong>วิธีแก้ไขตรงจุด:</strong> <span className="text-emerald-600 dark:text-emerald-400 font-bold">{err.solution}</span>
                      </p>
                    </div>

                    {/* High-quality comparison views */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      
                      {/* BAD code window */}
                      <div className="bg-slate-900 border border-red-900/30 rounded-lg overflow-hidden text-xs">
                        <div className="bg-red-950/60 text-red-300 px-3 py-1.5 font-mono text-[10.5px] border-b border-red-900/40 flex justify-between">
                          <span>❌ เขียนรอยผิดพลาด (Bad Code)</span>
                        </div>
                        <pre className="p-3 text-red-300/80 font-mono overflow-x-auto leading-relaxed max-w-full">
                          {err.badCode}
                        </pre>
                      </div>

                      {/* GOOD code window */}
                      <div className="bg-slate-900 border border-emerald-900/30 rounded-lg overflow-hidden text-xs">
                        <div className="bg-emerald-950/60 text-emerald-300 px-3 py-1.5 font-mono text-[10.5px] border-b border-emerald-900/40 flex justify-between">
                          <span>✅ ปรับเซนฟิกถูกต้อง (Good Code)</span>
                        </div>
                        <pre className="p-3 text-emerald-300/80 font-mono overflow-x-auto leading-relaxed max-w-full">
                          {err.goodCode}
                        </pre>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: 3 Worksheet Exercises with toggle spoil solutions */}
          {activeTab === "exercises" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-4">
                {activeTopic.exercises.map((ex, i) => {
                  const isRevealed = revealSolutions[ex.id] || false;
                  return (
                    <div key={ex.id} className="p-4 bg-slate-50 dark:bg-slate-950/30 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                      
                      {/* Exercise difficulty badge header */}
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase
                            ${ex.difficulty === "easy" ? "bg-blue-100 text-blue-800 dark:bg-blue-950" : ""}
                            ${ex.difficulty === "medium" ? "bg-amber-100 text-amber-800 dark:bg-amber-950" : ""}
                            ${ex.difficulty === "hard" ? "bg-orange-100 text-orange-850 dark:bg-orange-950" : ""}
                          `}>
                            โจทย์ระดับ: {ex.difficulty === "easy" ? "ง่าย" : ex.difficulty === "medium" ? "ปานกลาง" : "ท้าทายฝีมือช่าง"}
                          </span>
                          <h4 className="text-sm font-bold text-slate-850 dark:text-slate-150 font-sans">
                            {ex.title}
                          </h4>
                        </div>
                      </div>

                      {/* Description prompt */}
                      <div className="text-xs text-slate-700 dark:text-slate-350 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-3 rounded-xl leading-relaxed whitespace-pre-wrap font-sans">
                        {ex.description}
                      </div>

                      {/* Hint container */}
                      <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/30 p-2.5 rounded-lg text-slate-600 dark:text-slate-400 text-[11px] font-sans flex items-start gap-1.5">
                        <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        <p><strong>เบาะแสแนะแนวทาง (Hint):</strong> {ex.hint}</p>
                      </div>

                      {/* Solutions display inside Spoil drawer */}
                      {isRevealed && (
                        <div className="space-y-3 pt-2">
                          <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-950/50 space-y-1 text-xs">
                            <p className="font-bold text-indigo-950 dark:text-indigo-400 font-sans">💡 แนวคิดและคำอธิบายโดยคุณครูช่าง:</p>
                            <p className="text-slate-650 dark:text-slate-400 font-sans font-light leading-relaxed whitespace-pre-wrap">
                              {ex.detailedSolution}
                            </p>
                          </div>

                          <div className="bg-slate-950 rounded-xl overflow-hidden text-xs border border-slate-850">
                            <div className="bg-slate-900 text-slate-450 px-3/1.5 px-3 py-1.5 font-mono text-[10.5px]">
                              🔑 เฉลยตัวอย่างแนวตอบ (Python Solution Code)
                            </div>
                            <pre className="p-3 text-emerald-400 font-mono overflow-x-auto leading-relaxed max-w-full">
                              {ex.solutionCode}
                            </pre>
                          </div>
                        </div>
                      )}

                      {/* Action trigger button */}
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => toggleSolutionReveal(ex.id)}
                          className={`px-3 py-1.5 rounded-lg font-bold text-xs transition border font-sans cursor-pointer
                            ${isRevealed 
                              ? "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                              : "bg-blue-600 hover:bg-blue-700 border-blue-600 text-white shadow-sm"
                            }`}
                        >
                          {isRevealed ? "✖ ปิดคำเฉลยด่วน" : "👁️ ดูวิเคราะห์คำเฉลยแนวคิด"}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Complete Lesson Actions bar */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/30 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-[11px] text-slate-400 font-sans">หากเข้าใจเนื้อหาของบทนี้ ตอกตรวจสอบยืนยันประวัติการเรียนรู้</p>
              <p className="text-xs text-slate-705 dark:text-slate-305 font-sans font-bold">
                {isCurrentTopicCompleted ? "✓ คุณผ่านการยืนยันศึกษาส่วนนี้เรียบร้อย!" : "⏱ แสตนด์บายเปิดสิทธิ์ตรวจเช็ค"}
              </p>
            </div>

            <button
              onClick={() => onSetTopicCompletion(activeTopic.id, !isCurrentTopicCompleted)}
              className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-xs font-bold transition font-sans cursor-pointer shadow-sm
                ${isCurrentTopicCompleted
                  ? "bg-emerald-100 hover:bg-emerald-200 border border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:hover:bg-emerald-900/60 dark:text-emerald-300 dark:border-emerald-900"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
              <CheckCircle className="h-4 w-4" />
              {isCurrentTopicCompleted ? "ประมวลแล้ว (ยกเลิกคลิก)" : "ฉันเรียนรู้และรันโค้ดบทนี้เสร็จสมบูรณ์"}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
