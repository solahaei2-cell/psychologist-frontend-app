import React, { useEffect, useRef, useState } from "react";
import api from "../../lib/api";

export default function Chat() {
  // توکن دیگر نیاز نیست اینجا پاس شود؛ اینترسپتور axios آن را اضافه می‌کند
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  function push(role, content) {
    setMessages((m) => [...m, { role, content, id: Date.now() + Math.random() }]);
    setTimeout(() => listRef.current?.scrollTo({ top: 999999, behavior: "smooth" }), 0);
  }

  async function send() {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    push("user", userMsg);
    const res = await api.post("/api/chat/message", { message: userMsg });
    const data = res.data || res;
    const botText = data.reply || data.answer || data.message || JSON.stringify(data);
    push("assistant", botText);
  }

  useEffect(() => {
    push("assistant", "سلام! هرچی دوست داری بپرس ✨");
  }, []);

  return (
    <section className="grid grid-rows-[1fr_auto] h-[calc(100vh-160px)] gap-3">
      <div ref={listRef} className="rounded-2xl bg-white/5 p-4 overflow-y-auto border border-white/10 space-y-3">
        {messages.map(m => (
          <div key={m.id} className={`max-w-[85%] rounded-2xl p-3 ${m.role === "user" ? "ml-auto bg-primary/60" : "bg-white/10"}`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="بنویس..." className="flex-1 px-4 py-3 rounded-2xl bg-white/10" />
        <button onClick={send} className="px-4 py-3 rounded-2xl bg-primary">ارسال</button>
      </div>
    </section>
  );
}
