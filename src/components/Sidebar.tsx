import React from "react";
import { 
  BookOpen, 
  Code, 
  Award, 
  Heart, 
  Settings, 
  GraduationCap, 
  Terminal,
  Menu,
  ChevronLeft
} from "lucide-react";

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  progressPercentage: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  isOpen,
  setIsOpen,
  progressPercentage
}) => {
  const menuItems = [
    { id: "dashboard", label: "หน้าแรกบทเรียน", icon: BookOpen },
    { id: "codelib", label: "คลังตัวอย่างโค้ด", icon: Code },
    { id: "quizzone", label: "มินิควิดแดนสอบ", icon: Award },
    { id: "favorites", label: "โค้ดโปรดคลังแสง", icon: Heart },
    { id: "handbook", label: "คู่มือช่างโปรแกรม", icon: Terminal }
  ];

  return (
    <aside 
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-30 transition-all duration-300 border-r flex flex-col justify-between
        ${isOpen ? "w-64" : "w-16"} 
        bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100`}
    >
      <div className="py-4 px-3 space-y-4">
        {/* Toggle Sidebar Collapse */}
        <div className="flex justify-end pr-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 px-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            <ChevronLeft className={`h-4 w-4 transform transition-transform ${!isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* User Badge Profile Summary */}
        {isOpen && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl mb-4 border border-blue-100/30">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-bold text-blue-700 dark:text-blue-300">ความก้าวหน้าผู้เรียน</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
              <div 
                className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 text-right font-mono">
              เสร็จสิ้น {progressPercentage.toFixed(0)}%
            </p>
          </div>
        )}

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
                {isOpen && <span className="font-sans tracking-wide truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        {isOpen ? (
          <div className="text-[11px] text-slate-400 text-center font-mono">
            DB Academy v1.0.0
            <br />
            สอศ. อาชีววิทยาการ
          </div>
        ) : (
          <div className="text-[10px] text-slate-400 text-center font-mono font-bold">DB</div>
        )}
      </div>
    </aside>
  );
};
