import React from "react";
import { 
  Terminal, 
  Settings, 
  HelpCircle, 
  Download, 
  CheckCircle,
  Cpu,
  Bookmark
} from "lucide-react";

export const HandbookView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Title Header area */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          <Terminal className="h-6 w-6 text-blue-600" />
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-sans tracking-wide">
              🛠️ คู่มือชุดเครื่องมือช่างโปรแกรมเมอร์ (Vocational Setup Guide)
            </h1>
            <p className="text-xs text-slate-400 font-sans">
              ขั้นตอนประกอบติดตั้งสิ่งแวดล้อมสถิติเพื่อเขียนและรัน Python บนคอมพิวเตอร์จริงในโรงฝึกงานวิทยาลัย
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        
        {/* Section 1: Python installation */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3.5">
          <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 font-sans flex items-center gap-1.5">
            <span className="p-1 rounded bg-blue-100 text-blue-850 text-xs font-mono">1</span>
            ดาวน์โหลดและติดตั้งตัวแปลภาษา Python 3.x
          </h3>

          <div className="text-xs text-slate-600 dark:text-slate-350 space-y-2 font-sans leading-relaxed">
            <p>
              อุปกรณ์มาตรฐานของภาษาไพทอน ตัวคอมไพเลอร์แปลคำสั่งคณิตศาสตร์ จำเป็นต้องอพยพติดตั้งพอร์ตลงกระบอกบอร์ดเครื่องของคุณเป็นด่านแรก:
            </p>
            <ol className="list-decimal pl-4.5 space-y-1.5">
              <li>เปิดเว็บเบราว์เซอร์แล้วเข้าพอร์ทลิงก์สากล <a href="https://www.python.org" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">python.org/downloads</a></li>
              <li>คลิกปุ่มสีเหลืองใหญ่ <strong>Download Python 3.xx</strong> ดาวน์โหลดตัวรันติดตั้งล่าสุด</li>
              <li>
                ⚠️ <strong className="text-rose-600 dark:text-rose-400">จุดสำคัญที่สุดสำหรับเด็กอาชีวะ:</strong> 
                ขณะเบิกโปรแกรมติดตั้ง บนหน้าต่างแรกสุด ต้องขีดติ๊กถูกช่องข้อเลือกบอกว่า 
                <span className="font-mono bg-slate-100 dark:bg-slate-950 p-1 rounded font-bold">Add Python to PATH</span> เด็ดขาด! 
                มิฉะนั้น เครื่อง CMD คอนโซลจะเตือน 'python is not recognized' สวิงกลับล่มสลาย
              </li>
              <li>คลิก <strong>Install Now</strong> แล้วรอระบบสแกนแถวเขียวประมวลผลเสร็จสิ้น</li>
            </ol>
          </div>
        </div>

        {/* Section 2: Editor visual code setup */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3.5">
          <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 font-sans flex items-center gap-1.5">
            <span className="p-1 rounded bg-blue-100 text-blue-805 text-xs font-mono">2</span>
            ติดตั้งโปรแกรมจัดพิมพ์เขียนโค้ดคู่ใจ Visual Studio Code
          </h3>

          <div className="text-xs text-slate-600 dark:text-slate-350 space-y-2 font-sans leading-relaxed">
            <p>
              เพื่ออำนาจความสะดวกเขียน ตรวจฟรอนท์จัดเรียงสี่เคาะสีแฮนล็อกสวยงาม แนะนำให้พึ่งใช้ชุดโปรแกรมยอดฮิตของวงการสากล:
            </p>
            <ol className="list-decimal pl-4.5 space-y-1.5">
              <li>ไปที่เว็บหลัก <a href="https://code.visualstudio.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">code.visualstudio.com</a> และดึงพาสติดตั้งตรงรุ่น OS (Windows / Mac)</li>
              <li>หลังลากติดตั้งเปิดแอป VS Code ให้จับจิ้มไปที่แท็บซ้ายมือรูปสกินสี่เหลี่ยมต่อกล่องจิ๊กซอว์ <strong>Extensions (Ctrl+Shift+X)</strong></li>
              <li>พิมพ์สแกนหาคำศัพท์ว่า <strong>Python</strong> (ค่าย Microsoft) แล้วกดดีไซน์ติดตั้ง <strong>Install</strong></li>
              <li>การปักตัวเสริมนี้จะช่วยตรวจจับความเพี้ยน ยิงสีสันขีดสีวรรค แนะนำคำสะกด Syntax ล่วงหน้าทันตา</li>
            </ol>
          </div>
        </div>

        {/* Section 3: CMD compiling */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3.5">
          <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 font-sans flex items-center gap-1.5">
            <span className="p-1 rounded bg-blue-100 text-blue-805 text-xs font-mono">3</span>
            ฝึกเขียนสัญจรพิมพ์รันไฟล์แรกทาง Terminal
          </h3>

          <div className="text-xs text-slate-600 dark:text-slate-350 space-y-2.5 font-sans leading-relaxed">
            <div className="space-y-1 bg-slate-900 text-slate-100 p-3.5 rounded-xl border border-slate-850 font-mono">
              <p className="text-blue-400"># เปิดหน้าต่างรับคำสั่งประจักษ์ขึ้นรันพิมพ์:</p>
              <p className="text-emerald-400">C:\Users\Student&gt; python --version</p>
              <p className="text-slate-450">&gt;&gt; Python 3.10.5 (ยืนยันประสานขั้วแปลสถิติสำเร็จ!)</p>
            </div>
            
            <p>
              <strong>ขั้นตอนจัดฟอร์มและรันไฟล์ประสาช่าง:</strong>
            </p>
            <ul className="list-disc pl-4.5 space-y-1.5">
              <li>สร้างโฟลเดอร์เก็บโปรเจกต์คอมพิวเตอร์ในเครื่อง ตั้งไฟล์ใหม่เซฟพิมพ์ว่า <span className="font-mono bg-slate-100 dark:bg-slate-950 p-1 rounded">workshop.py</span></li>
              <li>ใน VS Code, กดใช้ปุ่มทางขวามือบนไอคอนรูป <strong>Run Python File</strong> แผงเครื่องสามเหลี่ยมเอียง</li>
              <li>หรือหากรันผ่านแผงดำ Terminal ดั้งเดิม ให้ใช้คำสั่งเปลี่ยนโฟลเดอร์สิงสถิต <span className="font-mono bg-slate-105 p-1 rounded bg-slate-100 dark:bg-slate-950">cd paths_ของโฟลเดอร์</span> แล้วประทับชุดคำสั่งรันระบบว่า:</li>
              <li className="font-mono bg-slate-950 text-emerald-400 p-2.5 rounded border border-slate-850">python workshop.py</li>
            </ul>
          </div>
        </div>

        {/* Section 4: Module packaging installer */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3.5">
          <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 font-sans flex items-center gap-1.5">
            <span className="p-1 rounded bg-blue-100 text-blue-805 text-xs font-mono">4</span>
            การใช้คำสั่ง PIP เพื่อติดตั้งหอสมุดภายนอก (เช่น SQLite / Database SQLite)
          </h3>

          <div className="text-xs text-slate-600 dark:text-slate-350 space-y-2 font-sans leading-relaxed">
            <p>
              วิชาอาชีวะการพัฒนาโปรแกรมธุรกิจต้องการฐานข้อมูลพ่วงระบบเก็บข้อมูลถาวร SQLite ยามต้องการติดตั้งชุดเชื่อมขยาย ให้เปิดแอก CMD พิมพ์ประชันคิตติ้งว่า:
            </p>
            <div className="bg-slate-950 text-emerald-400 p-3.5 rounded-xl border border-slate-850 font-mono space-y-1">
              <p className="text-slate-500"># คำสั่งติดตั้งแพ็กเกจเชื่อมต่อระบบวิเศษ</p>
              <p>pip install sqlalchemy requests matplotlib pandas</p>
            </div>
            <p className="text-[11px] text-slate-450 italic">
              * ข้อจำกัดความปลอดภัยของโรงเรียน: ตรวจดูว่าสาย LAN ขั้วต่อเปิดอินเทอร์เน็ตสมดุลลื่นไหลยามรัน pip ดาวน์โหลดดักประชากรกล่องรัน
            </p>
          </div>
        </div>

        {/* Gamified Vocational Pledge card */}
        <div className="p-5 bg-blue-600 text-white rounded-2xl space-y-3 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-15 transform translate-x-5 translate-y-2">
            <Cpu className="h-40 w-40" />
          </div>
          <h4 className="text-sm md:text-base font-bold font-sans flex items-center gap-1.5">
            <Bookmark className="h-5 w-5 text-blue-200 fill-current" /> คำปฏิญญาผู้เรียน DB Academy
          </h4>
          <p className="text-xs text-blue-100 font-sans font-light leading-relaxed">
            &ldquo;ข้าพเจ้าจะตั้งใจทดลองไล่รันพาสโค้ดด้วยความใส่ใจซื่อสัตย์ หมั่นซ้อมมือ วิเคราะห์ส่วนล่มผิดพลาดทีละบรรทัด 
            เพื่อฝึกฝนปัดโครงร่างระบบ ไปค้ำจุนพัฒนาอภิมหาโปรเจกต์งานอาชีวศึกษาสร้างคุณประโยชน์ยั่งยืนแก่ส่วนกลางสืบไป!&rdquo;
          </p>
        </div>

      </div>

    </div>
  );
};
