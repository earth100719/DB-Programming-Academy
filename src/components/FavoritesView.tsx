import React, { useState } from "react";
import { 
  Heart, 
  Trash2, 
  Search, 
  Compass, 
  FolderOpen,
  ArrowRight
} from "lucide-react";
import { Chapter, CodeExample } from "../types";
import { CodeTerminal } from "./CodeTerminal";

interface FavoritesViewProps {
  chapters: Chapter[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onNavigateToTopic: (chapterID: number, topicSlug: string) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  chapters,
  favorites,
  onToggleFavorite,
  onNavigateToTopic
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Extract only bookmarked examples
  const favRecords: Array<{
    example: CodeExample;
    chapterId: number;
    chapterTitle: string;
    topicSlug: string;
    topicTitle: string;
  }> = [];

  chapters.forEach((ch) => {
    ch.topics.forEach((top) => {
      top.examples.forEach((ex) => {
        if (favorites.includes(ex.id)) {
          favRecords.push({
            example: ex,
            chapterId: ch.id,
            chapterTitle: ch.title,
            topicSlug: top.slug,
            topicTitle: top.title
          });
        }
      });
    });
  });

  const filteredFavs = favRecords.filter(r => 
    r.example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.topicTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Title Header Board */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Heart className="h-6 w-6 text-red-500 fill-current" />
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-sans tracking-wide">
              คลังตัวอย่างโค้ดสลักใจ (My Bookmarked Code List)
            </h1>
            <p className="text-xs text-slate-400 font-sans font-light">
              รวบรวมตัวอย่างหัวข้อย่อยและโปรเจกต์งานที่คุณกดบันทึกโปรดไว้ทบทวน ทั้งสิ้น {favRecords.length} ชิ้นงาน
            </p>
          </div>
        </div>

        {/* Search inside Bookmarks */}
        {favRecords.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="🔍 ค้นหาในกลุ่มโค้ดโปรดของคุณ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs md:text-sm outline-none focus:ring-2 focus:ring-blue-500 font-sans"
            />
          </div>
        )}
      </div>

      {favRecords.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 text-center rounded-2xl space-y-4 shadow-sm max-w-md mx-auto">
          <Heart className="h-12 w-12 text-slate-250 dark:text-slate-700 mx-auto animate-pulse" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-750 dark:text-slate-205 font-sans">คลังของสะสมคุณยังว่างเปล่า</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
              ขณะที่คุณเรียนและทดลองไล่รันพาสโค้ด สามารถกดปุ่มไอคอนหัวใจ ❤️ 
              ในหน้ารายละเอียดบทเรียนหรือคลังโค้ดเพื่อเซฟนำพาสเก็บตกไว้ที่บอร์ดนี้ได้ความสะดวกสบาย!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredFavs.map((record, i) => (
            <div 
              key={record.example.id} 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4.5 shadow-sm space-y-4"
            >
              
              {/* Top Meta Details Row */}
              <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 font-sans">
                  <FolderOpen className="h-4 w-4 text-blue-500" />
                  <span>
                    บทที่ {record.chapterId} &gt; <strong>{record.topicTitle}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onNavigateToTopic(record.chapterId, record.topicSlug)}
                    className="flex items-center gap-0.5 text-[11.5px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-sans"
                  >
                    ข้ามสถิติจุลภาคสู่บทความตำราเรียน <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onToggleFavorite(record.example.id)}
                    className="text-red-500 hover:text-red-650 flex items-center gap-1 font-bold text-[11.5px] font-sans"
                    title="ลบออกจากประวัติโปรด"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> ถอนสัญลักษณ์โปรด
                  </button>
                </div>
              </div>

              {/* Monospace terminal console */}
              <CodeTerminal
                example={record.example}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
              />

            </div>
          ))}

          {filteredFavs.length === 0 && (
            <div className="text-center py-10 text-slate-400 italic font-sans text-xs">ไม่พบรายการผลตรงพิมพ์ชื่อในรหัสของสะสมคัดกรอง</div>
          )}
        </div>
      )}

    </div>
  );
};
