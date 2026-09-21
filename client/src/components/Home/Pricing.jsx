import { CheckIcon, CircleCheckBigIcon } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description:
      "Perfect for creators just getting started with social media automation.",
    features: [
      "2 social accounts",
      "10 scheduled posts/month",
      "AI content (5 credits/mo)",
      "Basic dashboard",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description:
      "Everything you need to grow and automate your social presence.",
    features: [
      "Unlimited accounts",
      "Unlimited scheduling",
      "AI content (200 credits/mo)",
      "Priority support",
    ],
    cta: "Start 14-day Free Trial",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$79",
    period: "/month",
    description: "For teams and agencies managing multiple brands at scale.",
    features: [
      "Everything in Pro",
      "5 team members",
      "Unlimited AI credits",
      "Custom AI personas",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 bg-linear-to-b from-slate-950 via-zinc-950 to-slate-950 relative overflow-hidden text-white"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-6 inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-sm">
            <CircleCheckBigIcon className="w-4 h-4 text-red-400" />
            Simple pricing
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-medium leading-tight text-white tracking-tight">
            Plans for every stage <br />
            <span className="text-red-400 italic font-normal">of growth</span>
          </h2>

          <p className="mt-5 text-zinc-300 max-w-md mx-auto leading-relaxed text-base sm:text-lg">
            Start free, upgrade when you&apos;re ready. Cancel anytime &bull; no
            hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.highlight
                  ? "bg-linear-to-b from-zinc-900 to-zinc-950 text-white border-2 border-red-500/50 shadow-2xl shadow-red-500/10 lg:-translate-y-2"
                  : "bg-zinc-900/80 backdrop-blur-sm text-white border border-zinc-800 hover:border-zinc-700 shadow-xl"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <div
                  className={`text-sm font-semibold mb-2 uppercase tracking-wider ${plan.highlight ? "text-red-400" : "text-red-400"}`}
                >
                  {plan.name}
                </div>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm font-medium text-zinc-400">
                    {plan.period}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-8 text-zinc-300">
                  {plan.description}
                </p>

                <div
                  className={`h-px w-full mb-8 ${plan.highlight ? "bg-zinc-800" : "bg-zinc-800"}`}
                />

                <ul className="space-y-4 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          plan.highlight
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-red-500/15 text-red-400 border border-red-500/20"
                        }`}
                      >
                        <CheckIcon className="w-3.5 h-3.5 text-red-400" />
                      </div>
                      <span className="text-zinc-200">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/#"
                className={`w-full text-center font-semibold text-sm py-4 px-6 rounded-full transition-all duration-200 shadow-md ${
                  plan.highlight
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-red-600/30"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
