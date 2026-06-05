import React, { useState } from "react";
import { 
  Search, 
  BookOpen, 
  Award, 
  Flame, 
  Terminal, 
  CheckCircle,
  HelpCircle,
  PlayCircle
} from "lucide-react";
import { Chapter, UserStats } from "../types";

interface ChapterDashboardProps {
  chapters: Chapter[];
  userStats: UserStats;
  onSelectTopic: (chapterID: number, topicSlug: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const ChapterDashboard: React.FC<ChapterDashboardProps> = ({
  chapters,
  userStats,
  onSelectTopic,
  onNavigateTab
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Search through all Chapters and Topics
  const filteredResults: Array<{
    chapterId: number;
    chapterTitle: string;
    topicSlug: string;
    topicTitle: string;
    topicDesc: string;
  }> = [];

  if (searchQuery.trim().length > 1) {
    chapters.forEach((ch) => {
      ch.topics.forEach((top) => {
        const query = searchQuery.toLowerCase();
        if (
          top.title.toLowerCase().includes(query) ||
          top.description.toLowerCase().includes(query) ||
          ch.title.toLowerCase().includes(query)
        ) {
          filteredResults.push({
            chapterId: ch.id,
            chapterTitle: ch.title,
            topicSlug: top.slug,
            topicTitle: top.title,
            topicDesc: top.description
          });
        }
      });
    });
  }

  return (
    <div className="space-y-6">
      
      {/* Search Bar Curriculum Zone */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500 rounded-full opacity-25 blur-xl"></div>
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-500 rounded-full opacity-25 blur-xl"></div>
        
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="bg-blue-500/40 text-blue-200 px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-blue-400/30 uppercase">
            กระทรวงอาชีวศึกษา - สปอตไลท์คอร์ส ปวช./ปวส.
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans">
            DB Programming Academy
          </h1>
          <p className="text-blue-100/90 text-sm md:text-base font-sans font-light leading-relaxed">
            แหล่งค้นพบ ทบทวนสืบค้นข้อมูล และสอบเก็บคะแนนคอร์สการพัฒนาภาษา Python 
            ประกอบบทเรียนตั้งแต่ระดับแรกเริ่ม ดันเข้าสู่บอร์ด GUI, OOP และฐานข้อมูลเพื่อออมทุนความรู้จริง
          </p>

          {/* Search Box Component */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="🔍 ค้นหาคำสำคัญในตำราเรียน... (เช่น: วนซ้ำ, OOP, การตัดสินใจ, tkinter, write)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-slate-800 outline-none focus:ring-4 focus:ring-blue-400 shadow-lg font-sans text-sm transition"
            />
          </div>
        </div>
      </div>

      {/* 🚀 QUICK ACTION GATEWAYS FOR PYTHON CODE & EXERCISES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 select-none">
        <button
          onClick={() => onNavigateTab("codelib")}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-900 hover:shadow-lg transition duration-300 text-left cursor-pointer group flex items-start gap-4 hover:-translate-y-0.5"
        >
          <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-450 group-hover:scale-105 transition shrink-0 text-2xl">
            ⌨️
          </div>
          <div className="space-y-1">
            <h4 className="text-sm md:text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1">
              คลังรวบรวมโค้ดไพทอน (Central Code Library)
            </h4>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-sans leading-relaxed">
              สืบค้น คัดกรองตัวอย่างโค้ดสากล และทดลองกดรันวิเคราะห์ผลลัพธ์จากบทเรียนทั้งสิ้น 10 บทโดยละเอียด
            </p>
            <span className="text-[10.5px] text-blue-600 font-bold font-sans inline-block group-hover:translate-x-1 transition mt-2.5 flex items-center gap-1">
              คลิกเปิดคลังรวบรวมโค้ด ➜
            </span>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab("exercises-hub")}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-900 hover:shadow-lg transition duration-300 text-left cursor-pointer group flex items-start gap-4 hover:-translate-y-0.5"
        >
          <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-405 group-hover:scale-105 transition shrink-0 text-2xl">
            📝
          </div>
          <div className="space-y-1">
            <h4 className="text-sm md:text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1">
              ศูนย์รวมโจทย์แบบฝึกหัด (Practice Problems Hub)
            </h4>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-sans leading-relaxed">
              รวบรวมโจทย์แบบฝึกหัดแก้ปัญหาโค้ด มินิโจทย์ทบทวน แยกความยาก รายละเอียดคำเฉลยและเบาะแสคำใบ้
            </p>
            <span className="text-[10.5px] text-indigo-600 font-bold font-sans inline-block group-hover:translate-x-1 transition mt-2.5 flex items-center gap-1">
              คลิกเปิดคลังโจทย์แบบฝึกหัด ➜
            </span>
          </div>
        </button>
      </div>

      {/* Query matched pop-up list */}
      {searchQuery.trim().length > 1 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-md space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-sans">
              <Search className="h-4 w-4 text-blue-600" />
              ผลสืบค้นตรวจเจอหัวข้อในระบบ ({filteredResults.length}) รายการ
            </h3>
            <button 
              onClick={() => setSearchQuery("")} 
              className="text-xs text-blue-600 hover:underline hover:text-blue-700"
            >
              ล้างค่า
            </button>
          </div>

          {filteredResults.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 text-center italic">ไม่พบบทเรียนประจักษ์ความสัมพันธ์ กรุณาลองใช้คำอื่น</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {filteredResults.map((res, i) => (
                <button
                  key={i}
                  onClick={() => {
                    onSelectTopic(res.chapterId, res.topicSlug);
                    setSearchQuery("");
                  }}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50 dark:bg-slate-950/40 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-left transition flex justify-between items-center group"
                >
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold font-mono">{res.chapterTitle}</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600">{res.topicTitle}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-sm">{res.topicDesc}</p>
                  </div>
                  <PlayCircle className="h-5 w-5 text-blue-600 shrink-0 opacity-40 group-hover:opacity-100 transition" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Map out all Chapters Grid List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-sans tracking-wide">
          🗺️ แผนผังเดินสาระความรู้หลัก (10 บทเรียนสิงสารพาส)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapters.map((chapter) => {
            // Count completed topics in this chapter
            const topicIds = chapter.topics.map(t => t.id);
            const completedInChapter = topicIds.filter(id => userStats.completedTopics.includes(id)).length;
            const completionRate = topicIds.length > 0 ? (completedInChapter / topicIds.length) * 100 : 0;

            return (
              <div 
                key={chapter.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Accent Top Bar */}
                <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 h-1.5"></div>
                
                <div className="p-5 space-y-4 flex-1">
                  {/* Chapter Headers */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full border border-blue-100/20">
                        บทที่ {chapter.id}
                      </span>
                      {completionRate === 100 && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-sans">
                          <CheckCircle className="h-4 w-4 fill-current text-emerald-500/20" /> ผ่านบทเรียนแล้ว
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-sans">
                      {chapter.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono tracking-wide">
                      {chapter.subtitle}
                    </p>
                  </div>

                  {/* Desc textbook outline */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans line-clamp-2">
                    {chapter.description}
                  </p>

                  {/* Topics outline preview */}
                  <div className="bg-slate-50 dark:bg-slate-955 p-3 rounded-xl border border-slate-100 dark:border-slate-850 space-y-1.5 text-xs text-slate-600 dark:text-slate-350">
                    <p className="font-bold text-slate-700 dark:text-slate-250 font-sans flex items-center gap-1 text-[11.5px]">
                      <Terminal className="h-3.5 w-3.5 text-blue-500" /> หัวข้อหลักสูตรในบทเรียน:
                    </p>
                    <div className="space-y-1 pl-1 font-sans text-[11px]">
                      {chapter.topics.map((t, idx) => (
                        <div key={t.id} className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                          <span className="text-blue-500/70">✓</span> 
                          <span className="truncate">{t.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card Footers / Progress + Navigation launch buttons */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2.5">
                  <div className="flex-1 max-w-[50%]">
                    <p className="text-[10px] text-slate-400 font-sans mb-1">ความก้าวหน้าบทเรียน</p>
                    <div className="w-full bg-slate-250 dark:bg-slate-800 rounded-full h-1.5">
                      <div 
                        className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300" 
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() => onSelectTopic(chapter.id, chapter.topics[0]?.slug)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] transition hover:scale-[1.02] active:scale-95 shadow-md shadow-blue-500/10 font-sans cursor-pointer whitespace-nowrap"
                    >
                      เริ่มเรียนรู้บทนี้ ➜
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
