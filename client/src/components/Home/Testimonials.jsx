import { StarIcon } from "lucide-react";

const testimonials = [
  {
    name: "Sarah K.",
    role: "Marketing Manager",
    avatar: "S",
    avatarBg: "from-red-400 to-pink-400",
    text: "Scheduler has saved our team 10+ hours a week. The AI composer is genuinely impressive — it writes content that sounds like us.",
  },
  {
    name: "Marcus L.",
    role: "Indie Creator",
    avatar: "M",
    avatarBg: "from-violet-400 to-purple-500",
    text: "I used to dread posting. Now I queue up a whole week of content in 20 minutes. The smart scheduling feature alone is worth it.",
  },
  {
    name: "Priya D.",
    role: "Startup Founder",
    avatar: "P",
    avatarBg: "from-sky-400 to-blue-500",
    text: "Finally a scheduler that's beautiful AND powerful. The clean dashboard makes it easy to see exactly what's going out and when.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-linear-to-b from-slate-950 via-zinc-950 to-slate-950 relative overflow-hidden text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-red-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-6 inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full shadow-sm">
            <StarIcon className="w-4 h-4 fill-red-400 text-red-400" />
            Testimonials
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-medium leading-tight text-white tracking-tight">
            Loved by{" "}
            <span className="text-red-400 italic font-normal">
              creators & teams
            </span>
          </h2>

          <p className="mt-5 text-white max-w-xl mx-auto leading-relaxed text-base sm:text-lg">
            Join thousands of people who automate their social media with
            Scheduler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-8 border border-zinc-800 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              <p className="text-white text-sm sm:text-base leading-relaxed mb-8">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-6 border-t border-zinc-800">
                <div
                  className={`w-11 h-11 rounded-full bg-linear-to-br ${t.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-zinc-400 font-medium">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
