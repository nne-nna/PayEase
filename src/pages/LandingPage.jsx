import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  CreditCard,
  Globe, HandCoins,
  LineChart,
  Lock,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";
import heroStack from "../assets/hero.png";

const trustBadges = ["Secure", "Trusted", "Valued", "Support", "Fast"];

const featureCards = [
  {
    icon: Wallet,
    title: "Finance That Moves Fast",
    text: "Fund your wallet, pay bills, and keep cash flow visible from one place.",
  },
  {
    icon: ShieldCheck,
    title: "Security Built In",
    text: "Protected sessions, validated requests, and safer transaction handling across flows.",
  },
  {
    icon: LineChart,
    title: "Visibility You Can Use",
    text: "Track spending patterns, transaction history, and account activity without guesswork.",
  },
];

const valueCards = [
  {
    title: "Transfer Across The Globe Are Free",
    text: "Make movement feel simple with fast wallet actions and clean account visibility.",
    tone: "bg-white text-black",
  },
  {
    title: "Create A Card That Is Unique And Customized",
    text: "Design-led product experiences that still stay grounded in real payment tasks.",
    tone: "bg-lime-100 text-black",
  },
  {
    title: "Personalized Insights And Financial Goals",
    text: "Stay close to balance trends, payment behavior, and spending decisions.",
    tone: "bg-emerald-600 text-black",
  },
  {
    title: "100% Dedication",
    text: "Support for day-to-day bills, wallet actions, and profile control in one product.",
    tone: "bg-lime-200 text-black",
  },
  {
    title: "Visit Our Services Page",
    text: "Explore airtime, data, electricity, cable TV, and wallet operations in one dashboard.",
    tone: "bg-emerald-400 text-black",
  },
];

const clientCards = [
  {
    name: "Adaeze Okafor",
    role: "Small Business Owner",
    title: "Faster Payments, Less Stress",
    text: "PayEase helps me handle electricity and airtime for my shop without delays. Everything just works.",
  },
  {
    name: "Tunde Balogun",
    role: "Freelancer",
    title: "Reliable Wallet Experience",
    text: "Funding my wallet and making payments is smooth. I like how clear the transaction history is.",
    featured: true,
  },
  {
    name: "Chinedu Eze",
    role: "Student",
    title: "Simple and Easy to Use",
    text: "I use PayEase mostly for data and airtime. It’s straightforward and doesn’t confuse me.",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#02131b] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(85,243,186,0.28),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_25%),linear-gradient(180deg,_#0a3843_0%,_#02131b_42%,_#03060a_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/" className="flex items-center gap-2">
            <HandCoins className="text-emerald-200 " />
            <span className="text-sm font-semibold tracking-[0.32em] text-emerald-200 uppercase">
              PayEase
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#security" className="hover:text-white">
              Security
            </a>
            <a href="#clients" className="hover:text-white">
              Clients
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur md:inline-flex"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-lime-200"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>
        </header>

        <section className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-20 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:pb-28 lg:pt-16">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-emerald-200">
              <Sparkles size={14} />
              Digital finance for everyday use
            </div>

            <h1 className="max-w-xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
              Finance with security and flexibility.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/70 md:text-lg">
              A cleaner way to manage wallet funding, bill payments, notifications,
              and account controls with a product experience built for speed.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-lime-200"
              >
                Open an account
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white/85 backdrop-blur transition hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              {trustBadges.map((badge) => (
                <div
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/65"
                >
                  <BadgeCheck size={14} className="text-lime-300" />
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute left-6 top-14 hidden h-28 w-28 rounded-3xl bg-lime-300/15 blur-3xl lg:block" />
            <div className="absolute bottom-10 right-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/6 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur">
              <div className="rounded-[1.75rem] border border-white/10 bg-[#061922] p-6">
                <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-300/15 bg-emerald-300/10 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/70">
                      Wallet balance
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-white">N 54,500.89</p>
                  </div>
                  <div className="rounded-2xl bg-lime-300 px-4 py-3 text-sm font-semibold text-slate-950">
                    Active
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-3xl bg-white p-4 text-slate-900">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Weekly flow
                      </span>
                      <LineChart size={18} className="text-emerald-600" />
                    </div>
                    <div className="mt-6">
                      <div className="flex h-28 items-end gap-3">
                        {[
                          { day: "Mon", value: 42 },
                          { day: "Tue", value: 64 },
                          { day: "Wed", value: 58 },
                          { day: "Thu", value: 86 },
                          { day: "Fri", value: 70 },
                          { day: "Sat", value: 94 },
                        ].map((item, index) => (
                            <div key={item.day} className="flex flex-1 flex-col items-center">
                              <div className="w-full">
                                <div
                                    className={`rounded-t-2xl ${
                                        index === 5 ? "bg-lime-300" : "bg-emerald-600"
                                    }`}
                                    style={{ height: `${item.value}%` }}
                                />
                              </div>
                              <span className="mt-2 text-[10px] text-slate-400">
                              {item.day}
                              </span>
                            </div>
                        ))}
                      </div>

                      <div className="mt-4 flex justify-between text-xs text-slate-500">
                        <span>Total: ₦24,500</span>
                        <span className="text-emerald-600 font-medium">+12.4%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                        Instant transfer
                      </p>
                      <p className="mt-2 text-lg font-semibold">
                        Send and verify with less friction.
                      </p>
                    </div>
                    <div className="rounded-3xl border border-lime-300/35 bg-lime-300/10 p-4 text-lime-50">
                      <p className="text-xs uppercase tracking-[0.24em] text-lime-100/70">
                        Verified access
                      </p>
                      <p className="mt-2 text-lg font-semibold">
                        Safer requests and better feedback.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative mt-8 flex items-center justify-center rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,_rgba(7,33,44,1)_0%,_rgba(9,71,63,1)_60%,_rgba(95,230,171,0.55)_100%)] px-4 py-6">
                  <img
                    src="/login.png"
                    alt="PayEase product preview"
                    className="max-h-[24rem] w-auto rounded-[1.5rem] object-contain shadow-2xl"
                  />
                  <div className="absolute -left-2 bottom-8 hidden rounded-2xl border border-white/10 bg-white/95 px-4 py-3 text-slate-900 shadow-xl md:block">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Monthly growth
                    </p>
                    <p className="mt-1 text-xl font-semibold">+18.4%</p>
                  </div>
                  <div className="absolute -right-1 top-8 hidden rounded-2xl bg-lime-300 px-4 py-3 text-slate-950 shadow-xl md:block">
                    <p className="text-xs uppercase tracking-[0.2em]">Bill success rate</p>
                    <p className="mt-1 text-xl font-semibold">99.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <main className="relative">
        <section
          id="features"
          className="mx-auto grid max-w-7xl gap-6 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10"
        >
          <div className="max-w-sm">
            <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-emerald-200">
              Services
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              One product, multiple payment moments.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              The landing page mirrors the product: direct, fast, and built around
              clear financial actions instead of decorative filler.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featureCards.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur"
              >
                <div className="inline-flex rounded-2xl bg-lime-300 p-3 text-slate-950">
                  <Icon size={22} />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="security"
          className="relative overflow-hidden bg-[linear-gradient(135deg,_#0b1d35_0%,_#0b5949_45%,_#02131b_100%)]"
        >
          <div className="absolute inset-y-0 left-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,_rgba(163,230,53,0.22),_transparent_58%)] lg:block" />
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />
              <img
                src={heroStack}
                alt="Layered secure payment illustration"
                className="relative w-72 max-w-full drop-shadow-[0_30px_50px_rgba(122,255,211,0.18)]"
              />
            </div>

            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-white/75">
                Trust and security
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                We value your trust and security.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 md:text-base">
                Every important user flow should explain failures cleanly, validate
                references before sending them, and keep the experience predictable.
                That principle now shows up in the product and in the frontend.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Lock, label: "Protected Sessions" },
                  { icon: BellRing, label: "Clear Notifications" },
                  { icon: CreditCard, label: "Safer Transactions" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-white/10 bg-white/8 p-4"
                  >
                    <Icon size={18} className="text-lime-300" />
                    <p className="mt-4 text-sm font-medium text-white/85">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-emerald-200">
                Why people choose it
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
                A financial surface that feels practical.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/60">
              The reference uses stacked cards and contrasting panels. This version
              keeps that rhythm while staying grounded in the PayEase product.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-5 md:grid-cols-2">
              {valueCards.map((card) => (
                <article
                  key={card.title}
                  className={`rounded-[2rem] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.18)] ${card.tone}`}
                >
                  <h3 className="max-w-xs text-xl font-semibold text-current">{card.title}</h3>
                  <p
                    className={`mt-4 text-sm leading-7 ${
                      card.tone.includes("text-white") ? "text-white/75" : "text-slate-600"
                    }`}
                  >
                    {card.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                    Service overview
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    Built for bills, balance, and control.
                  </h3>
                </div>
                <div className="rounded-2xl bg-lime-300 p-3 text-slate-950">
                  <Globe size={20} />
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                {[
                  {
                    icon: Smartphone,
                    title: "Wallet Funding",
                    text: "Initialize payment, redirect cleanly, and verify the reference safely.",
                  },
                  {
                    icon: Zap,
                    title: "Bill Payments",
                    text: "Handle electricity, airtime, data, and cable flows in one payment surface.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Profile Validation",
                    text: "Display field-level backend errors clearly instead of hiding them in generic toasts.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="rounded-3xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl bg-emerald-300/10 p-3 text-emerald-200">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-white">{title}</p>
                        <p className="mt-2 text-sm leading-7 text-white/60">{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="clients" className="bg-white py-20 text-slate-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-emerald-700">
                Social proof
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
                Get to know our clients.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {clientCards.map((card) => (
                <article
                  key={card.title}
                  className={`rounded-[2rem] border p-6 shadow-sm ${
                    card.featured
                      ? "border-emerald-700 bg-[#0b5f50] text-white"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <p className={`text-xs uppercase tracking-[0.24em] ${
                      card.featured ? "text-emerald-100/70" : "text-slate-400"
                  }`}>
                    {card.role}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
                  <p className={`mt-1 text-sm ${
                      card.featured ? "text-emerald-100/70" : "text-slate-500"
                  }`}>
                    {card.name}
                  </p>
                  <p
                    className={`mt-4 text-sm leading-7 ${
                      card.featured ? "text-white/78" : "text-slate-600"
                    }`}
                  >
                    {card.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-[#071c22] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0d2a33]"
              >
                Start with PayEase
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
