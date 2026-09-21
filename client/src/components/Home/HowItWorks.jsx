import { ArrowRightIcon, CheckCircleIcon } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Connect Your Accounts",
    description:
      "Link your social profiles in seconds. We support Twitter, LinkedIn, Facebook, and Instagram.",
  },
  {
    step: "02",
    title: "Create or Generate Content",
    description:
      "Write your own post or let our AI craft a caption and image based on your prompt.",
  },
  {
    step: "03",
    title: "Schedule & Publish",
    description:
      "Pick a time, select your platforms, and hit schedule. We handle publishing automatically.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-linear-to-b from-slate-950 via-zinc-950 to-slate-950 relative overflow-hidden text-white"
    >
      <div className="absolute top-1/3 right-0 w-125 h-125 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-6 inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full shadow-sm">
            <CheckCircleIcon className="w-4 h-4" />
            Simple setup
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-medium leading-tight text-white tracking-tight">
            Up and running in{" "}
            <span className="text-red-400 italic font-normal">minutes</span>
          </h2>

          <p className="mt-5 text-white max-w-lg mx-auto leading-relaxed text-base sm:text-lg">
            No complicated onboarding, no steep learning curve. Just connect,
            create, and grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="group relative bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-8 border border-zinc-800 hover:border-zinc-700 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-lg mb-6 transition-transform group-hover:scale-110 duration-300 shadow-sm">
                  {s.step}
                </div>

                <h3 className="text-white mb-2 font-semibold text-xl">
                  {s.title}
                </h3>

                <p className="text-sm text-white leading-relaxed">
                  {s.description}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 items-center justify-center text-zinc-400 shadow-md">
                  <ArrowRightIcon className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
