import React, { useState } from "react";
import { 
  Award, 
  ArrowLeft, 
  Check, 
  X, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen,
  ArrowRight,
  RefreshCw,
  Sparkles
} from "lucide-react";
import { Chapter, QuizQuestion } from "../types";

interface QuizViewProps {
  chapter: Chapter;
  onBackToDashboard: () => void;
  onSaveScore: (chapterID: number, score: number) => void;
  bestScore: number;
}

export const QuizView: React.FC<QuizViewProps> = ({
  chapter,
  onBackToDashboard,
  onSaveScore,
  bestScore
}) => {
  const [quizState, setQuizState] = useState<"welcome" | "active" | "completed">("welcome");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  // Log option index chosen per quiz
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  const questions = chapter.quizzes;
  const currentQuestion = questions[currentIdx];

  const handleStartQuiz = () => {
    setQuizState("active");
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setUserAnswers({});
  };

  const handleSubmitAnswer = () => {
    if (selectedOpt === null || isAnswerSubmitted) return;
    
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOpt === currentQuestion.answerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    
    setUserAnswers((prev) => ({
      ...prev,
      [currentIdx]: selectedOpt
    }));
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswerSubmitted(false);
    } else {
      // Save quiz results
      onSaveScore(chapter.id, score);
      setQuizState("completed");
    }
  };

  const getVerdict = (finalScore: number) => {
    if (finalScore === 10) return { title: "เกียรตินิยมสมดุลดีเลิศ (10/10)!", desc: "คุณตอบคำวิทยากรได้สมบูรณ์แบบรอดพ้นทุกรูนระบบ รับสิทธิ์ตราทองสโมสรช่าง!", bg: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 border-emerald-200" };
    if (finalScore >= 8) return { title: "ผ่านระดับเหรียญพรรณดีมาก (8-9 คะแนน)!", desc: "ฝีมือการเขียนโค้ดและวิเคราะห์เงื่อนไขดีมาก พร้อมดันขึ้นทำโปรเจกต์เชิงลึกจริง!", bg: "bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300 border-blue-200" };
    if (finalScore >= 5) return { title: "ผ่านเกณฑ์พอใช้ (5-7 คะแนน)!", desc: "ตอบถูกเกินครึ่งหนึ่งด่านประคอง แต่อยากชวนเข้าไปสืบค้นทฤษฎีตัวแปรและโครงสร้างวนซ้ำอีกรอบเพื่อประทับความสมบูรณ์", bg: "bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 border-amber-200" };
    return { title: "พยายามอีกครา (ต่ำกว่า 5 คะแนน)!", desc: "ยังมีจุดสับสนตัวแปรคริสต์และโมดูลสำคัญ สามารถคลิกฝึกทบทวนและกดสอบรีรันเก็บคะแนนใหม่ได้ตลอดเวลา", bg: "bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 border-rose-200" };
  };

  const verdict = getVerdict(score);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Top Bar Header */}
      <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-sans cursor-pointer transition"
        >
          <ArrowLeft className="h-4 w-4" /> ย้อนกลับสู่หน้าหลัก
        </button>
        <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wide">
          Quiz Zone - บทที่ {chapter.id}
        </span>
      </div>

      {/* QUIZ STATE 1: WELCOME SCREEN */}
      {quizState === "welcome" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl text-center space-y-6 shadow-sm">
          <div className="mx-auto w-16 h-16 bg-blue-105 rounded-full flex items-center justify-center bg-blue-50 dark:bg-slate-950">
            <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 font-sans">
              มินิวัคซีนทดสอบ: {chapter.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-400 font-mono tracking-wide">
              {chapter.subtitle}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-955 p-4 rounded-xl border border-slate-150 dark:border-slate-800 text-left text-xs text-slate-600 dark:text-slate-350 space-y-2 font-sans max-w-md mx-auto">
            <p className="font-bold text-slate-800 dark:text-slate-200 text-center mb-1 flex items-center gap-1 justify-center">
              <Sparkles className="h-4 w-4 text-blue-500 animate-spin" /> กติกาสำคัญระบบสอบอัตโนมัติ:
            </p>
            <ul className="space-y-1.5 pl-3 list-disc">
              <li>โจทย์สอบทฤษฎีประยุกต์ร่วมจำนวน <strong>10 ข้อ</strong></li>
              <li>ระบบตรวจคำตอบเก็บเกรดเฉลี่ยแบบ <strong>ทันควันพร้อมเขียนเหตุผลแจง</strong></li>
              <li>สามารถกดสอบกี่ครั้งก็รับสิทธิ์ลบรอยเดิมสลับสแตนด์บายแต้มที่ดีที่สุด</li>
              <li>ทำคะแนนผ่านคีย์พาส <strong>8/10 คะแนนขึ้นไป</strong> คราสรับตราสัญลักษณ์ตราเกียรติศรีกิจกรรม</li>
            </ul>
          </div>

          {bestScore > 0 && (
            <div className="p-3 border border-dashed border-amber-300 dark:border-amber-900 bg-amber-500/5 text-amber-700 dark:text-amber-400 rounded-xl max-w-xs mx-auto text-xs font-sans">
              🏆 แต้มสถิติสูงสุดคุณทำได้พิกัด: <strong>{bestScore} / 10</strong> คะแนน
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleStartQuiz}
              className="w-full max-w-sm py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-md font-sans tracking-wide cursor-pointer"
            >
              เริ่มทำแบบทดสอบ (Start Quiz)
            </button>
          </div>
        </div>
      )}

      {/* QUIZ STATE 2: ACTIVE QUESTION SCREEN */}
      {quizState === "active" && currentQuestion && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 md:p-6 rounded-2xl shadow-sm space-y-6">
          
          {/* Progress indicators */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>คำถามข้อที่ {currentIdx + 1} จาก {questions.length}</span>
              <span>ร้อยละความเสร็จ {((currentIdx + 1) / questions.length * 10).toFixed(0)}0%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <span className="w-6 h-6 shrink-0 bg-blue-105 border border-blue-200/50 rounded-full flex items-center justify-center font-bold text-xs text-blue-600 dark:text-blue-300 font-mono">
                Q
              </span>
              <p className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 font-sans tracking-wide leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>
          </div>

          {/* Answer Options list */}
          <div className="space-y-2">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOpt === idx;
              
              // Background accent styling when reviewed
              let optionStyle = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200";
              
              if (isSelected) {
                optionStyle = "border-blue-600 ring-2 ring-blue-100 dark:ring-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300 font-bold";
              }

              if (isAnswerSubmitted) {
                const isCurrentOptionCorrect = idx === currentQuestion.answerIndex;
                const wasChosenByStudent = idx === selectedOpt;

                if (isCurrentOptionCorrect) {
                  optionStyle = "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 font-bold";
                } else if (wasChosenByStudent) {
                  optionStyle = "border-rose-500 bg-rose-50/70 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 font-bold opacity-80";
                } else {
                  optionStyle = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 scale-95 opacity-55 pointer-events-none";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => setSelectedOpt(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border-2 text-xs md:text-sm font-sans flex items-center justify-between transition gap-3 cursor-pointer
                    ${optionStyle}
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-full border text-[11px] font-mono flex items-center justify-center font-bold shrink-0
                      ${isSelected ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}
                    `}>
                      {idx === 0 ? "ก" : idx === 1 ? "ข" : idx === 2 ? "ค" : "ง"}
                    </span>
                    <span>{option}</span>
                  </div>

                  {/* Icon status tags for submitted questions */}
                  {isAnswerSubmitted && idx === currentQuestion.answerIndex && (
                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && idx === selectedOpt && idx !== currentQuestion.answerIndex && (
                    <X className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Submittion validation and AI explanations box */}
          {isAnswerSubmitted && (
            <div className="p-4 bg-slate-50 dark:bg-slate-950/30 rounded-xl border border-slate-250 dark:border-slate-850 text-xs text-slate-600 dark:text-slate-350 space-y-2 font-sans anim-fade-in animate-fade-in">
              <div className="flex items-center gap-1.5 font-bold">
                {selectedOpt === currentQuestion.answerIndex ? (
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 fill-current text-emerald-500/10" /> ถูกใจคำตอบสิงสถิต (+1 แต้ม)
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                    <AlertCircle className="h-4 w-4 fill-current text-rose-500/10" /> พลาดเสียแต้มหลักการ
                  </span>
                )}
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border leading-relaxed border-slate-200 dark:border-slate-800">
                <p className="font-bold text-slate-800 dark:text-slate-205 mb-1 flex items-center gap-0.5 text-[11.5px]">
                  <BookOpen className="h-4 w-4 text-blue-500" /> วิเคราะห์เฉลยบทสอบสปอย:
                </p>
                <p className="text-slate-650 dark:text-slate-300 text-[11px] font-sans antialiased">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Bottom Actions button */}
          <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOpt === null}
                className="px-5 py-2 rounded-xl bg-blue-600 disabled:opacity-50 text-white font-bold text-xs tracking-wide uppercase font-mono shadow-sm cursor-pointer"
              >
                ตรวจคำตอบ (Submit Answer)
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer shadow-md"
              >
                {currentIdx < questions.length - 1 ? "คำถามถัดไป (Next)" : "ดูสรุปรายงานผลสอบ (Finish)"}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

        </div>
      )}

      {/* QUIZ STATE 3: COMPOSITE SUMMARY RECAP RESULTS */}
      {quizState === "completed" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
          
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-slate-950 rounded-full flex items-center justify-center animate-bounce">
              <Award className="h-8 w-8 text-yellow-500" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans">
                ผลประเมินบทสอบไออาชีวะเสร็จสิ้น!
              </h2>
              <p className="text-xs text-slate-400 font-mono tracking-wide">
                ตำราเรียนบทที่ {chapter.id}: {chapter.title}
              </p>
            </div>

            {/* Score Ring Layout */}
            <div className="py-2.5">
              <div className="inline-block p-4 border-4 border-blue-500 rounded-full bg-slate-50 dark:bg-slate-950 font-mono">
                <span className="text-4xl font-extrabold text-slate-800 dark:text-slate-100">
                  {score}
                </span>
                <span className="text-slate-450 dark:text-slate-400"> / {questions.length}</span>
              </div>
            </div>

            {/* Verdict Box text block */}
            <div className={`p-4 rounded-xl border text-center text-xs md:text-sm font-sans space-y-1 max-w-md mx-auto ${verdict.bg}`}>
              <h4 className="font-extrabold">{verdict.title}</h4>
              <p className="opacity-90 leading-relaxed text-[11px]">{verdict.desc}</p>
            </div>
          </div>

          {/* Auditing panel: review option explanation list for all 10 problems */}
          <div className="space-y-3.5 border-t border-slate-200 dark:border-slate-800 pt-5">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-205 font-sans flex items-center gap-1">
              <HelpCircle className="h-4.5 w-4.5 text-blue-500" /> สมุดบันทึกทวนข้อมูลโจทย์ (Audit Report)
            </h3>
            
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const chosen = userAnswers[idx];
                const correct = q.answerIndex;
                const isPassed = chosen === correct;

                return (
                  <div key={q.id} className="p-3 bg-slate-50 dark:bg-slate-955 rounded-xl border border-slate-200/50 text-xs space-y-2">
                    <div className="flex justify-between items-start gap-2 border-b border-slate-150 dark:border-slate-850 pb-1.5">
                      <p className="font-bold text-slate-800 dark:text-slate-200 font-sans flex items-start gap-1">
                        <span>{idx + 1}.</span>
                        <span className="line-clamp-2">{q.question}</span>
                      </p>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-wide uppercase shrink-0
                        ${isPassed ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 text-emerald-300" : "bg-red-100 text-red-800 dark:bg-rose-950 text-rose-300"}`}>
                        {isPassed ? "CORRECT" : "INCORRECT"}
                      </span>
                    </div>

                    <div className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 space-y-1 font-sans">
                      <p>
                        <strong>ตัวเลือกเฉลยมติ:</strong> 
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                          {q.options[correct]}
                        </span>
                      </p>
                      {!isPassed && (
                        <p>
                          <strong>ตัวเลือกคุณจิ้มเสียแต้ม:</strong> 
                          <span className="text-red-600 font-bold ml-1">
                            {q.options[chosen] || "ไม่มี (ไม่ได้คลิก)"}
                          </span>
                        </p>
                      )}
                      
                      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-2 rounded text-[10.5px] italic text-slate-600 dark:text-slate-350">
                        {q.explanation}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons (Rerun, back to dashboard) */}
          <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-850">
            <button
              onClick={handleStartQuiz}
              className="flex-1 flex justify-center items-center gap-1 py-3 px-4 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs rounded-xl text-slate-700 dark:text-slate-300 cursor-pointer transition font-sans"
            >
              <RefreshCw className="h-4 w-4" /> สอบทบทวนแก้มือใหม่
            </button>
            <button
              onClick={onBackToDashboard}
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 font-bold text-xs rounded-xl text-white shadow-sm cursor-pointer transition text-center font-sans tracking-wide"
            >
              กลับสู่สารบัญหน้าหลัก
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
