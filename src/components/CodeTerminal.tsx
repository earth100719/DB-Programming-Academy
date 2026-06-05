import React, { useState, useEffect } from "react";
import { 
  Play, 
  Copy, 
  Download, 
  Heart, 
  Terminal as TermIcon, 
  Check, 
  Info,
  HelpCircle
} from "lucide-react";
import { CodeExample } from "../types";

interface CodeTerminalProps {
  example: CodeExample;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const CodeTerminal: React.FC<CodeTerminalProps> = ({
  example,
  isFavorite,
  onToggleFavorite
}) => {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string>("");
  const [selectedLine, setSelectedLine] = useState<number | null>(null);

  // Reset states when example changes
  useEffect(() => {
    setIsRunning(false);
    setTerminalOutput(">>> สถานะพร้อมประมวลผล... กดปุ่ม 'รันโค้ดตรวจผล' เพื่อเริ่มดีดตัวโปรแกรม\n");
    setSelectedLine(null);
  }, [example]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(example.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([example.code], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    // Sanitize title for filename
    const sanitizedTitle = example.title
      .replace(/[^a-zA-Z0-9ก-๙_ ]/g, "")
      .trim()
      .replace(/\s+/g, "_");
    element.download = `${sanitizedTitle}.py`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalOutput(">>> กำหนดค่าตัวแปลภาษาและจัดรูปแบบ...\n>>> python main.py\n");
    
    // Simulate terminal roll-out with beautiful typing effects
    setTimeout(() => {
      setTerminalOutput((prev) => prev + "---------------------------------------\n");
      // Add lines of simulated output incrementally
      const outputLines = example.output.split("\n");
      let currentLineIndex = 0;
      
      const interval = setInterval(() => {
        if (currentLineIndex < outputLines.length) {
          setTerminalOutput((prev) => prev + outputLines[currentLineIndex] + "\n");
          currentLineIndex++;
        } else {
          clearInterval(interval);
          setTerminalOutput((prev) => prev + "\n[รันคำสั่งเสร็จสิ้น - Exit Code 0]\n>>> ");
          setIsRunning(false);
        }
      }, 300);
    }, 800);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950/45 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-4">
      {/* Top action header info */}
      <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold font-mono tracking-wider uppercase
            ${example.level === "basic" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : ""}
            ${example.level === "intermediate" ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" : ""}
            ${example.level === "applied" ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300" : ""}
          `}>
            {example.level === "basic" ? "ระดับ: พื้นฐาน" : ""}
            {example.level === "intermediate" ? "ระดับ: กลาง" : ""}
            {example.level === "applied" ? "ระดับ: ประยุกต์" : ""}
          </span>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-sans tracking-wide">
            {example.title}
          </h4>
        </div>

        {/* Buttons to copy, run, download, bookmark */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleFavorite(example.id)}
            className={`p-2 rounded-lg border transition ${
              isFavorite 
                ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 text-red-600" 
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            }`}
            title="เพิ่มประดับคลังโปรด"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
          
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition"
            title="คัดลอกโค้ดสูตร"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          </button>

          <button
            onClick={handleDownload}
            className="p-2 rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition"
            title="ดาวน์โหลดไฟล์ .py"
          >
            <Download className="h-4 w-4" />
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-55 text-white text-xs font-bold transition font-mono tracking-wide"
          >
            <Play className="h-3 w-3 fill-current" />
            {isRunning ? "RUNNING..." : "RUN CODE"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Monospace Code Editor Pane with line numbering (interactive clicks) */}
        <div className="lg:col-span-7 bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-md">
          <div className="bg-slate-800 px-4 py-2 flex justify-between items-center text-[11px] font-mono text-slate-400">
            <span>💻 Python Code Window (แตะคลิกแต่ละบรรทัดเพื่อเรียนรู้วิธีรัน)</span>
            <span className="text-yellow-400 font-bold font-mono">index.py</span>
          </div>
          
          <div className="p-3 text-xs font-mono overflow-x-auto leading-relaxed max-h-[290px] min-h-[180px]">
            {example.code.split("\n").map((line, idx) => {
              const isHighlighted = selectedLine === idx + 1;
              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedLine(idx + 1)}
                  className={`flex items-start group select-all cursor-pointer transition py-0.5 px-1 rounded
                    ${isHighlighted ? "bg-amber-950/65 text-yellow-300 font-bold border-l-2 border-yellow-500" : "hover:bg-slate-800/40"}
                  `}
                >
                  <span className="w-8 shrink-0 text-slate-500 select-none text-right pr-2">
                    {idx + 1}
                  </span>
                  <pre className="whitespace-pre-wrap flex-1">{line || " "}</pre>
                </div>
              );
            })}
          </div>
        </div>

        {/* Console and Teacher Explanation Panel */}
        <div className="lg:col-span-5 flex flex-col gap-3 justify-between">
          
          {/* Simulated Terminal Screen */}
          <div className="bg-black text-emerald-400 rounded-xl overflow-hidden border border-slate-900 shadow-lg flex-1 flex flex-col">
            <div className="bg-slate-950 px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-900 font-mono">
              <span className="flex items-center gap-1">
                <TermIcon className="h-3 w-3" /> TERMINAL OUT - Python 3.10
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            
            <pre className="p-3 text-[11.5px] font-mono flex-1 whitespace-pre-wrap overflow-y-auto max-h-[160px] min-h-[110px] text-emerald-400/90 leading-tight">
              {terminalOutput}
            </pre>
          </div>

          {/* Teacher Guide: active line commentary */}
          <div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl p-3 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 font-sans">
              <Info className="h-4 w-4 text-blue-500" />
              <span>อรรถาธิบายโค้ดโดยคุณครู AI:</span>
            </div>
            
            {selectedLine !== null ? (
              <div className="bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <p className="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-bold mb-1">
                  💡 วิเคราะห์ที่บรรทัด {selectedLine}:
                </p>
                <p className="text-slate-700 dark:text-slate-300 font-sans tracking-wide">
                  {example.lineByLine[selectedLine - 1] || 
                    example.lineByLine.find(exp => exp.includes(`บรรทัดที่ ${selectedLine}:`)) ||
                    "บรรทัดประกาศสถิติ คำสั่งเตรียมเนื้อความหรือจัดวางตัวแปร"}
                </p>
              </div>
            ) : (
              <div className="text-slate-500 dark:text-slate-400 italic font-sans flex items-center gap-1.5 justify-center py-2 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                <HelpCircle className="h-4 w-4" /> แตะจิ้มที่บรรทัดโค้ดซ้ายมือ เพื่อดูวิเคราะห์สอนทีละบรรทัด
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
