import { useEffect, useState } from "react";
import axios from "axios";
import {
  Code2,
  Cloud,
  Shield,
  Zap,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2,
  Database,
  Smartphone,
  Settings,
  Lightbulb,
  LayoutTemplate,
  Repeat,
} from "lucide-react";

const iconMap = {
  Code2,
  Cloud,
  Shield,
  Zap,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2,
  Database,
  Smartphone,
  Settings,
  Lightbulb,
  LayoutTemplate,
  Repeat,
};

export default function WhatWeDo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/data/whatWeDoData.json")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load what we do data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-slate-600 dark:text-slate-400">
          Loading...
        </div>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <section id="what-we-do" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold">
              <Zap className="w-4 h-4" />
              Our Expertise
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              {data.title?.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400">
                {data.title?.split(" ").slice(-1)}
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              {data.description}
            </p>
          </div>
          <div className="lg:text-right">
            <button className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all">
              View All Services <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Capabilities Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.services?.map((item, index) => {
            const Icon = iconMap[item.icon] || Zap;
            return (
              <div
                key={index}
                className="group relative bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-400 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {item.description}
                </p>

                {item.features && (
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Stats */}
      {data.stats && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-20">
          <div className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {data.stats.map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  <p className="text-3xl md:text-4xl font-extrabold text-white">
                    {stat.value}
                  </p>
                  <p className="text-blue-100 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
