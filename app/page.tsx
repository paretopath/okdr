import Link from "next/link";
import { Brain, BarChart3, FileText, ShieldCheck, ChevronRight, Star } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <span className="font-black text-xl tracking-tight text-white">OKDR</span>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-slate-400 hover:text-white text-sm transition-colors">
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 text-center max-w-4xl mx-auto">
        <div className="inline-block bg-indigo-900/50 border border-indigo-700 text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          Clinical-grade · Psychometrically validated
        </div>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
          Oxford Kings<br />
          <span className="text-indigo-400">Development Rating</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          The most rigorous combined intelligence and personality assessment available
          online. Measure where you truly stand across cognitive ability and
          the Big Five personality dimensions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/signup"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors text-lg"
          >
            Take the Assessment <ChevronRight className="w-5 h-5" />
          </Link>
          <Link
            href="#what-you-get"
            className="flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-medium py-4 px-8 rounded-xl transition-colors text-lg"
          >
            Learn more
          </Link>
        </div>
        <p className="text-slate-500 text-sm mt-6">
          Takes 40–60 minutes · Basic results free · Full report £19.99
        </p>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-800 py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: "170",   label: "Total questions" },
            { value: "5",     label: "IQ subtests" },
            { value: "30",    label: "Personality facets" },
            { value: "α≥.85", label: "Reliability" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-black text-indigo-400">{value}</p>
              <p className="text-slate-400 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you measure */}
      <section id="what-you-get" className="px-6 py-24 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">What you&apos;ll discover</h2>
        <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
          The OKDR combines two of the most psychometrically robust assessments in
          cognitive and personality science.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
            <Brain className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Cognitive Intelligence</h3>
            <p className="text-slate-400 text-sm mb-4">
              Based on the ICAR open-access battery, measuring five dimensions
              of intelligence with clinical-grade reliability.
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              {[
                "Matrix reasoning (fluid intelligence)",
                "Verbal analogies (crystallised intelligence)",
                "Numerical sequences (inductive reasoning)",
                "Spatial reasoning (visual-spatial processing)",
                "Working memory (letter-number series)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
            <BarChart3 className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Big Five Personality</h3>
            <p className="text-slate-400 text-sm mb-4">
              The full IPIP-NEO-120, measuring 5 domains and 30 facets of
              personality — the gold standard in personality science.
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              {[
                "Openness to Experience (6 facets)",
                "Conscientiousness (6 facets)",
                "Extraversion (6 facets)",
                "Agreeableness (6 facets)",
                "Neuroticism (6 facets)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-16 bg-slate-900/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Pricing</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col gap-4">
              <div>
                <p className="text-2xl font-black">Free</p>
                <p className="text-slate-400 text-sm">After completing the assessment</p>
              </div>
              <ul className="text-slate-300 text-sm space-y-2 flex-1">
                {["Full Scale IQ score", "IQ percentile ranking", "Big Five domain scores (5)", "Radar chart visualisation"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-yellow-400" />{f}</li>
                ))}
              </ul>
              <Link href="/auth/signup" className="w-full text-center border border-slate-600 hover:border-slate-500 text-white font-medium py-3 rounded-xl transition-colors block">
                Get started free
              </Link>
            </div>
            <div className="bg-indigo-900/40 border border-indigo-700 rounded-2xl p-6 flex flex-col gap-4 relative">
              <div className="absolute top-4 right-4 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">Popular</div>
              <div>
                <p className="text-2xl font-black">£19.99</p>
                <p className="text-slate-400 text-sm">One-time · Full report</p>
              </div>
              <ul className="text-indigo-200 text-sm space-y-2 flex-1">
                {["Everything in Free", "5 cognitive subtest scores", "All 30 personality facets", "Personalised interpretation", "PDF report download", "Lifetime access to results"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-indigo-400" />{f}</li>
                ))}
              </ul>
              <Link href="/auth/signup" className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors block">
                Start assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-6">
          {[
            { Icon: ShieldCheck, title: "Scientifically validated", body: "Uses the ICAR cognitive battery and IPIP-NEO-120 — both peer-reviewed and psychometrically validated against established clinical instruments." },
            { Icon: FileText,    title: "Public domain",            body: "All items are open-source (ICAR) or public domain (IPIP). No proprietary lock-in, no hidden licensing fees — just rigorous science." },
            { Icon: Brain,       title: "Clinical standard",        body: "Reliability coefficients (α≥0.85) meeting or exceeding clinical-grade thresholds. Scores normed against general adult population data." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="flex-1 flex flex-col gap-3">
              <Icon className="w-7 h-7 text-indigo-400" />
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-8 text-center text-slate-500 text-sm">
        <p>Oxford Kings Development Rating · <a href="https://paretopath.com" className="hover:text-slate-300">paretopath.com</a></p>
        <p className="mt-1 text-xs text-slate-700">
          OKDR is not a clinical diagnostic tool. Results are for self-development and informational purposes only.
        </p>
      </footer>
    </main>
  );
}
