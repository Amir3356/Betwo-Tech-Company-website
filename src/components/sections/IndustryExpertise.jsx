import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, ShieldCheck, Cpu, HeadphonesIcon } from "lucide-react";

const badgeIcons = {
  "Industry Compliant": ShieldCheck,
  "Cutting-edge Technology": Cpu,
  "24/7 Dedicated Support": HeadphonesIcon,
};

export default function IndustryExpertise() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/data/industriesSolutionsData.json")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load industries data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="px-6 md:px-12 py-20">Loading...</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <section id="industries" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">{data.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
            {data.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto text-center divide-x divide-slate-200 dark:divide-slate-800">
          {data.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Industry Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {data.industries.map((industry) => (
            <div
              key={industry.name}
              className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="mb-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-blue-500/10 via-sky-500/10 to-cyan-400/10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400">
                  {industry.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{industry.name}</h3>
              <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 mb-4">{industry.metric}</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{industry.description}</p>
              <a
                href={industry.link}
                className="inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-semibold hover:gap-3 transition-all text-sm"
              >
                Learn more <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {data.badges.map((badge) => {
            const Icon = badgeIcons[badge];
            return (
              <div
                key={badge}
                className="flex items-center gap-3 bg-white dark:bg-slate-800/50 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                {Icon && <Icon className="w-5 h-5 text-blue-500" />}
                <span className="font-semibold text-slate-800 dark:text-slate-200">{badge}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
