import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Target,
  Eye,
  Shield,
  Award,
  Users,
  Lightbulb,
  Star,
  Handshake,
  ChevronRight,
  Activity,
  Globe,
  Calendar,
  Briefcase,
  Zap,
} from "lucide-react";

const iconMap = {
  Shield,
  Award,
  Users,
  Lightbulb,
  Star,
  Handshake,
  Activity,
  Briefcase,
  Globe,
  Zap,
  Target,
  Eye,
};

const overviewVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const leftPanelVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const rightPanelVariants = {
  hidden: { opacity: 0, x: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
  },
};

const purposeSectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const purposeHeadingVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const purposeCardVariants = {
  hidden: { opacity: 0, y: 26, rotateX: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const historySectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const historyHeadingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const historyCardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const impactSectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const impactStatVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const ctaButtonVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const ctaBadgeVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    const incrementTime = duration / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
}

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const highlightBlueClass = "text-slate-800";

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        console.log("Fetching about data...");
        const response = await fetch("/data/aboutUs.json");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log("About data response:", data);
        setAboutData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return <section id="about" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">Loading...</section>;
  }

  if (error) {
    return <section id="about" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">Error: {error}</section>;
  }

  if (!aboutData || !aboutData.hero) {
    console.log("aboutData:", aboutData);
    return <section id="about" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">No data available</section>;
  }

  const renderIcon = (iconName, className = "w-5 h-5") => {
    const Icon = iconMap[iconName];
    if (!Icon) {
      return null;
    }

    return <Icon className={className} />;
  };

  const impactSectionLabel = (aboutData.impact?.sectionLabel || "Our Impact")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      {/* 1. Company Overview */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          variants={overviewVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="space-y-6" variants={leftPanelVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              {aboutData.hero.title} <br />
              {aboutData.hero.subtitle}{" "}
              {(
                aboutData.hero?.highlightParts && aboutData.hero.highlightParts.length > 0
              ) ? (
                aboutData.hero.highlightParts.map((part, i) => (
                  <span key={i} className={highlightBlueClass}>
                    {part}{i < aboutData.hero.highlightParts.length - 1 ? ' ' : ''}
                  </span>
                ))
              ) : (
                <span className={highlightBlueClass}>{aboutData.hero.highlightText}</span>
              )}.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {aboutData.hero.description}
            </p>
            <div className="pt-4 flex items-center gap-4 text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              <Shield className="w-5 h-5 text-slate-900 dark:text-blue-500" />
              {aboutData.hero.trustText}
            </div>
          </motion.div>
          <motion.div className="relative" variants={rightPanelVariants}>
            <motion.img
              src={aboutData.hero.image}
              alt={aboutData.hero.title}
              className="rounded-2xl shadow-xl w-full object-cover h-100"
              whileHover={{ scale: 1.04, rotate: -0.5 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800"
              variants={badgeVariants}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-slate-900 dark:text-blue-400">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white"><AnimatedCounter target={100} suffix="%" duration={2000} /></p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{aboutData.hero?.isolatedViewLabel || 'Isolated View'}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* 2. Purpose, Mission, Vision */}
      <div className="bg-slate-50 dark:bg-slate-900 py-24 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
            variants={purposeHeadingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h3
              className="text-4xl md:text-5xl text-slate-900 dark:text-blue-400 font-semibold tracking-wider"
              initial={{ opacity: 0, letterSpacing: "0.18em", y: 12 }}
              whileInView={{ opacity: 1, letterSpacing: "0.08em", y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {aboutData.purpose?.sectionLabel || 'Our Purpose'}
            </motion.h3>
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            >
              {aboutData.purpose?.heading || 'Driving Innovation Through Purpose'}
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] hover:border-slate-400 dark:hover:border-slate-600"
              variants={purposeCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
            >
              <Target className="w-12 h-12 text-slate-900 dark:text-slate-300 mb-6" />
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">{aboutData.purpose.mission.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{aboutData.purpose.mission.description}</p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] hover:border-slate-400 dark:hover:border-slate-600"
              variants={purposeCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
            >
              <Eye className="w-12 h-12 text-slate-900 dark:text-slate-300 mb-6" />
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">{aboutData.purpose.vision.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{aboutData.purpose.vision.description}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. Core Values */}
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutData.coreValues.map((val, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:bg-white dark:hover:bg-slate-950 hover:border hover:border-slate-100 dark:hover:border-slate-800">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-400">
                {renderIcon(val.icon, "w-6 h-6")}
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{val.title}</h4>
                <p className="text-slate-600 dark:text-slate-400">{val.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Leadership */}
      <div className="bg-slate-50 dark:bg-slate-900 py-24 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <motion.div
              className="text-center max-w-3xl mx-auto space-y-4"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3 className="text-4xl md:text-5xl text-slate-900 dark:text-blue-400 font-semibold tracking-wider">{aboutData.leadership?.sectionLabelExperienced || 'Experienced Leadership'}</h3>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{aboutData.leadership?.heading || 'Visionary Leaders Driving Innovation'}</h2>
              <p className="text-slate-600 dark:text-slate-400">{aboutData.leadership.description}</p>
            </motion.div>
          </div>
          
          <div className="space-y-16">
            {/* CEO */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">{aboutData.leadership?.ceo?.sectionTitle || 'Chief Executive Officer'} <span className="text-sm font-normal text-slate-500 bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full ml-4">{aboutData.leadership?.ceo?.countLabel || '1 Leader'}</span></h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-950 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm border border-slate-100 dark:border-slate-800 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]">
                    <div className="w-full max-w-xs aspect-video rounded-xl overflow-hidden mb-4 bg-slate-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <motion.img
                        src={aboutData.leadership.ceo.image}
                        alt={aboutData.leadership.ceo.name}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        whileHover={{ scale: 1.04 }}
                      />
                    </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">{aboutData.leadership.ceo.name}</h4>
                    <p className="text-slate-700 dark:text-slate-300 font-medium mb-4">{aboutData.leadership.ceo.role}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{aboutData.leadership.ceo.description}</p>
                  </div>
              </div>
            </div>

            {/* Executives */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">{aboutData.leadership?.executivesSectionTitle || 'Executive Leadership'} <span className="text-sm font-normal text-slate-500 bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full ml-4">{aboutData.leadership?.executivesCountLabel || '3 Leaders'}</span></h3>
              <div className="grid md:grid-cols-3 gap-8">
                {aboutData.leadership.executives.map((leader, i) => (
                  <div key={i} className="bg-white dark:bg-slate-950 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm border border-slate-100 dark:border-slate-800 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]">
                    <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 bg-slate-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <motion.img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                        whileHover={{ scale: 1.04 }}
                      />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{leader.name}</h4>
                      <p className="text-slate-700 dark:text-slate-300 font-medium text-sm mb-4">{leader.role}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 grow">{leader.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 5. History */}
      <div className="history-section py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          variants={historyHeadingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
        >
          <motion.h3
            className="text-4xl md:text-5xl text-slate-900 dark:text-blue-400 font-semibold tracking-wider"
            initial={{ opacity: 0, y: 18, letterSpacing: "0.18em" }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: "0.08em" }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            {aboutData.historySection.sectionLabel}
          </motion.h3>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          >
            {aboutData.historySection.heading}
          </motion.h2>
          <motion.p
            className="text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
          >
            {aboutData.historySection.description}
          </motion.p>
        </motion.div>
        <motion.div
          className="history-timeline"
          variants={historySectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {aboutData.history.map((timeline, i) => (
            <motion.div
              key={i}
              variants={historyCardVariants}
              className="history-card"
            >
              <div className="history-card-content">
                <h3 className="history-year text-[0.45rem] md:text-[0.5rem]" style={{ fontSize: "0.32rem", lineHeight: 1 }}>
                  {timeline.year}
                </h3>
                <h4 className="history-title">{timeline.title}</h4>
                <p className="history-description">{timeline.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 6. Impact */}
      <div className="bg-slate-100 dark:bg-slate-900 py-24 text-slate-900 dark:text-white">
        <motion.div className="max-w-7xl mx-auto px-6 lg:px-8" variants={impactSectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.div className="text-center max-w-3xl mx-auto mb-16 space-y-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6 }}>
            <h3 className="text-5xl md:text-6xl text-slate-800 dark:text-blue-400 font-semibold tracking-wider">{impactSectionLabel}</h3>
            <h2 className="text-2xl md:text-3xl font-bold">{aboutData.impact.title}</h2>
            <p className="text-slate-600 dark:text-slate-400">{aboutData.impact.subtitle}</p>
          </motion.div>
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center border-b border-slate-300 dark:border-slate-800 pb-16">
            {aboutData.impact.stats.map((stat, i) => (
              <motion.div key={i} className="" variants={impactStatVariants} whileHover={{ scale: 1.03 }}>
                <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-blue-400 mb-2">{stat.value}</p>
                <h4 className="text-base font-semibold mb-1">{stat.label}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="pt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-slate-700 dark:text-slate-300" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
             <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-blue-500" /> {aboutData.impact.trustText}</div>
          </motion.div>
        </motion.div>
      </div>

      {/* 7. Culture */}
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            {aboutData.culture.sectionLabel && <h3 className="text-blue-400 font-semibold uppercase tracking-wider mb-4">{aboutData.culture.sectionLabel}</h3>}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">{aboutData.culture.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">{aboutData.culture.description}</p>
            <div className="space-y-6">
              {aboutData.culture.points.map((point, i) => (
                <div key={i} className="flex gap-4">
                  {renderIcon(point.icon, "w-6 h-6 text-blue-400 flex-shrink-0")}
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{point.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <motion.img
              src={aboutData.culture.image}
              alt={aboutData.culture.title}
              className="rounded-2xl shadow-xl w-full object-cover h-125"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
            />
          </div>
        </div>
      </div>

      {/* 8. Call to Action */}
      <div className="relative py-20 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <motion.div
          className="relative max-w-4xl mx-auto px-6 text-center text-slate-900 dark:text-white space-y-8 flex flex-col items-center"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.h2 className="text-4xl font-bold mx-auto" variants={ctaButtonVariants}>{aboutData.cta.title}</motion.h2>
          <motion.p className="text-xl text-slate-700 dark:text-white/90 max-w-2xl mx-auto" variants={ctaButtonVariants}>{aboutData.cta.description}</motion.p>
          <div className="flex w-full flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            {aboutData.cta.buttons.map((button, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => {
                  if (button.primary) {
                    window.dispatchEvent(new Event("betwo:open-chatbot"));
                  }
                }}
                variants={ctaButtonVariants}
                whileHover={{ scale: 1.03 }}
                className={button.primary ? "bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg flex items-center justify-center" : "bg-transparent border-2 border-slate-900 dark:border-slate-200 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center"}
              >
                {button.text}
              </motion.button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-slate-600 dark:text-white/80">
            {aboutData.cta.badges.map((badge, i) => (
              <motion.span key={i} className="flex items-center gap-2" variants={ctaBadgeVariants} whileHover={{ scale: 1.04 }}>
                {renderIcon(badge.icon, "w-4 h-4")}
                {badge.text}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
