import {
  CalendarDaysIcon,
  Wand2Icon,
  Share2Icon,
  ZapIcon,
  BarChart3Icon,
  HashIcon,
} from "lucide-react";

const features = [
  {
    icon: CalendarDaysIcon,
    title: "Smart Scheduling",
    description:
      "Queue posts across all platforms with a single click. Set it once and let us handle the rest.",
    color: "bg-red-50 text-red-500",
  },
  {
    icon: Wand2Icon,
    title: "AI Content Generator",
    description:
      "Generate on-brand captions and stunning images with our built-in AI. Never stare at a blank page again.",
    color: "bg-red-50 text-red-500",
  },

  {
    icon: BarChart3Icon,
    title: "Activity Dashboard",
    description:
      "Get a bird's eye view of all published posts, scheduled content, and engagement activity in one place.",
    color: "bg-red-50 text-red-500",
  },
  {
    icon: Share2Icon,
    title: "Multi-Platform",
    description:
      "Connect Twitter, LinkedIn, Facebook, and Instagram. Post everywhere from one unified workspace.",
    color: "bg-red-50 text-red-500",
  },
  {
    icon: ZapIcon,
    title: "Instant Publishing",
    description:
      "Need to go live now? Publish immediately or schedule for peak engagement times with full timezone support.",
    color: "bg-red-50 text-red-500",
  },
  {
    icon: HashIcon,
    title: "Hashtag Suggestions",
    description:
      "Get AI-powered hashtag suggestions to reach a wider audience.",
    color: "bg-red-50 text-red-500",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-linear-to-b from-slate-950 via-zinc-950 to-slate-950 relative overflow-hidden text-white"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-6 inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-sm">
            <ZapIcon className="w-3.5 h-3.5" />
            Built For Maximum Impact
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-5">
            Supercharge every step <br />
            <span className="text-red-400 italic font-normal">
              of your social workflow
            </span>
          </h2>

          <p className="mt-5 text-zinc-400 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            From creative generation to hands-free publishing — Scheduler
            automates the heavy lifting so you can focus on building your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110
               duration-300 ${f.color}/15 border border=${f.color.replace("bg-", "")}/30`}
              >
                <f.icon className="w-5 h-5 text-red-400" />
              </div>

              <h3 className="text-white mb-2 font-semibold text-lg">
                {f.title}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
