import { Star, ShieldCheck, Users, Handshake } from "lucide-react";

export default function TrustedBy() {
  const testimonials = [
    {
      quote: "Betwoch Tech transformed our digital infrastructure. Their attention to detail in the healthcare sector is unmatched.",
      name: "Abebe Speaker",
      role: "Lead Designer",
      company: "Design Hub Ethiopia",
      initials: "A"
    },
    {
      quote: "The event management system they built is intuitive and robust. It handled our peak traffic without a single glitch.",
      name: "Sara Tekle",
      role: "Project Manager",
      company: "EventPro Solutions",
      initials: "S"
    },
    {
      quote: "Professional, timely, and highly skilled developers. They understand the local context while delivering world-class code.",
      name: "Samuel Girma",
      role: "Operations Manager",
      company: "Logistics Corp",
      initials: "S"
    },
    {
      quote: "Their fintech platform exceeded our expectations. Security, scalability, and user experience all top-notch.",
      name: "From Tig to Hai",
      role: "CTO",
      company: "FinTech Ethiopia",
      initials: "T"
    }
  ];

  return (
    <section className="py-20 bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            See what our partners have to say about our digital solutions and commitment to excellence.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
          <div className="py-4 md:py-0">
            <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 mb-2">50+</div>
            <div className="text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wider text-sm">Happy Clients</div>
          </div>
          <div className="py-4 md:py-0">
            <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 mb-2">5.0</div>
            <div className="text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wider text-sm">Average Rating</div>
          </div>
          <div className="py-4 md:py-0">
            <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 mb-2">100%</div>
            <div className="text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wider text-sm">Satisfaction</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6 italic leading-relaxed">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{t.role}</div>
                  <div className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 mt-0.5">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Badges */}
        <div className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 p-6 md:p-8 rounded-2xl border border-blue-100 dark:border-blue-800/50">
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 mb-6 lg:mb-0">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <ShieldCheck className="text-blue-500" size={20} /> Verified Reviews
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Users className="text-blue-500" size={20} /> Real Clients
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Handshake className="text-blue-500" size={20} /> Long-term Partnerships
            </div>
          </div>
          <div className="text-center lg:text-right">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-bold text-lg">
              Join 12+ satisfied clients who trust our solutions
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
