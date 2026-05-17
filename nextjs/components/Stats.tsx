const stats = [
  { v: "٤٠+", k: "شركة تستخدم وُزّيفاي" },
  { v: "٢.٤الف", k: "محادثة في الشهر" },
  { v: "٩٤٪",  k: "معدّل حل المشكلات" },
  { v: "١٫٢ث", k: "متوسط زمن الرد" },
];

export default function Stats() {
  return (
    <section className="relative bg-ink text-white py-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(800px 400px at 80% 50%,rgba(128,88,224,0.35),transparent 60%),radial-gradient(800px 400px at 20% 50%,rgba(76,52,145,0.35),transparent 60%)",
        }}
      />
      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10 grid md:grid-cols-4 gap-8 lg:gap-4">
        {stats.map((s) => (
          <div key={s.k}>
            <div className="display text-[64px] grad-text num">{s.v}</div>
            <div className="text-[14px] text-white/70 mt-1">{s.k}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
