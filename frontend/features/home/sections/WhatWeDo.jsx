import { useEffect, useState } from "react";
import whatWeDoImport from "../../../shared/data/whatWeDo.json";
import {
  Code,
  Database,
  Smartphone,
  Settings,
  Globe,
  Shield,
  Cloud,
  Palette,
  BarChart,
  Server,
  PenTool,
  Zap,
  Monitor,
  GitBranch,
  Lightbulb,
  Award,
  Users,
  Star,
  Handshake,
  LayoutTemplate,
  Repeat,
} from "lucide-react";
import { motion } from "framer-motion";

const iconMap = {
  Code,
  Database,
  Smartphone,
  Settings,
  Globe,
  Shield,
  Cloud,
  Palette,
  BarChart,
  Server,
  PenTool,
  Zap,
  Monitor,
  GitBranch,
  Lightbulb,
  Award,
  Users,
  Star,
  Handshake,
  LayoutTemplate,
  Repeat,
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export default function WhatWeDo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWhatWeDo = async () => {
      try {
        const response = await fetch(`/api/what-we-do`);
        const payload = await response.json();
        if (!response.ok)
          throw new Error(
            payload?.message || "Failed to load what we do data.",
          );
        setData(payload?.data || null);
      } catch (err) {
        console.error("Failed to load what we do data:", err);
        try {
          const fallbackData = whatWeDoImport;
          setData(fallbackData);
        } catch (fallbackError) {
          console.error("Failed to load fallback what we do data:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };
    loadWhatWeDo();
  }, []);

  if (loading)
    return (
      <div className="px-6 md:px-12 py-20 flex items-center justify-center">
        <motion.div
          className="flex gap-2"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-indigo-500"
              variants={{
                hidden: { opacity: 0.3, y: 0 },
                visible: {
                  opacity: [0.3, 1, 0.3],
                  y: [0, -8, 0],
                  transition: {
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  },
                },
              }}
            />
          ))}
        </motion.div>
      </div>
    );

  if (!data) return null;

  return (
    <section className="what-we-do relative py-16 sm:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Background blob — center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-indigo-500/20 dark:bg-indigo-600/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Background blob — top-right */}
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

      {/* Section header */}
      <motion.div
        className="text-center mb-16 md:mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-slate-200/50 dark:bg-slate-700/30
            border border-slate-300 dark:border-slate-600
            text-slate-800 dark:text-slate-300 text-sm font-semibold mb-6"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Zap size={14} />
          What We Do
        </motion.div>

        {/* Title with gradient highlight */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          <span className="text-slate-800 dark:text-slate-300">
            {(() => {
              const words = (data.title || "").split(" ");
              const mid = Math.ceil(words.length / 2);
              const plain = words.slice(0, mid).join(" ");
              const highlighted = words.slice(mid).join(" ");
              return (
                <>
                  {plain}{" "}
                  <span className="text-slate-700 dark:text-slate-400">
                    {highlighted}
                  </span>
                </>
              );
            })()}
          </span>
        </h2>

        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          {data.description}
        </p>

        {/* Animated divider */}
        <motion.div
          className="h-1 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full mx-auto mt-6"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          style={{ width: 64 }}
        />
      </motion.div>

      {/* Cards grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {data.services.map((service, i) => {
          const IconComponent = iconMap[service.icon];
          return (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl
                border border-slate-200 dark:border-slate-700
                shadow-md hover:shadow-2xl hover:shadow-indigo-500/20 dark:hover:shadow-indigo-500/30
                transition-all duration-300 overflow-hidden"
            >
              {/* Top-border gradient line */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl" />

              {/* Background gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-50 dark:from-sky-900/30 to-blue-50 dark:to-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon with shake on hover */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 bg-slate-200/50 dark:bg-slate-700/30 rounded-2xl flex items-center justify-center
                    text-slate-800 dark:text-slate-300 mb-6
                    group-hover:bg-slate-800 group-hover:text-white
                    dark:group-hover:bg-slate-700 dark:group-hover:text-white
                    transition-colors duration-300 shadow-sm"
                >
                  {IconComponent && (
                    <IconComponent className="w-7 h-7 transform group-hover:scale-110 transition-transform duration-300" />
                  )}
                </motion.div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-300 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
