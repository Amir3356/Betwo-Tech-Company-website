import { useEffect, useState } from "react";
import aboutDataImport from "../../../shared/data/aboutUs.json";
const leadershipSectionDefaults = { title: "", subtitle: "", description: "" };
import { motion } from "framer-motion";
import { getAssetUrl } from "../../../assets/index.js";
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
  Activity,
  Globe,
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
  const [leadershipSection, setLeadershipSection] = useState({ title: "", subtitle: "", description: "" });
  const [leadershipMembers, setLeadershipMembers] = useState([]);

  const highlightBlueClass = "text-slate-800 dark:text-slate-100";

  useEffect(() => {
    setAboutData(aboutDataImport);
    setLoading(false);

    fetch("/api/experienced-leadership-section")
      .then((res) => res.json())
      .then((payload) => {
        if (payload?.data) setLeadershipSection(payload.data);
      })
      .catch(() => {});

    fetch("/api/experienced-leadership")
      .then((res) => res.json())
      .then((payload) => {
        if (Array.isArray(payload?.data)) setLeadershipMembers(payload.data);
      })
      .catch(() => {});
  }, []);

  if (loading) {
    return <section id="about" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">Loading...</section>;
  }

  if (error) {
    return <section id="about" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">Error: {error}</section>;
  }

  if (!aboutData || !aboutData.hero) {
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
    <section id="about" className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-950 overflow-hidden">
      {/* 1. Company Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-24">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          variants={overviewVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="space-y-4 sm:space-y-6" variants={leftPanelVariants}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
              {aboutData.hero.title} <br className="hidden sm:block" />
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
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
              {aboutData.hero.description}
            </p>
            <div className="pt-2 sm:pt-4 flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900 dark:text-blue-500" />
              {aboutData.hero.trustText}
            </div>
          </motion.div>
          <motion.div className="relative mt-8 lg:mt-0" variants={rightPanelVariants}>
            <motion.img
              src={aboutData.hero.image}
              alt={aboutData.hero.title}
              className="rounded-2xl shadow-xl w-full object-cover h-52 sm:h-80 md:h-96 lg:h-100"
              whileHover={{ scale: 1.04, rotate: -0.5 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            />
            <motion.div
              className="absolute -bottom-3 sm:-bottom-6 -left-2 sm:-left-6 bg-white dark:bg-slate-900 p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800"
              variants={badgeVariants}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-slate-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-slate-900 dark:text-blue-400">
                  <Activity className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white"><AnimatedCounter target={100} suffix="%" duration={2000} /></p>
                  <p className="text-[10px] sm:text-sm text-slate-500 dark:text-slate-400">{aboutData.hero?.isolatedViewLabel || 'Isolated View'}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* 2. Purpose, Mission, Vision */}
      <div className="bg-slate-50 dark:bg-slate-900 py-12 sm:py-16 lg:py-24 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
            variants={purposeHeadingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h3
className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-blue-400 font-semibold tracking-wider"
              initial={{ opacity: 0, letterSpacing: "0.18em", y: 12 }}
              whileInView={{ opacity: 1, letterSpacing: "0.08em", y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {aboutData.purpose?.sectionLabel || 'Our Purpose'}
            </motion.h3>
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            >
              {aboutData.purpose?.heading || 'Driving Innovation Through Purpose'}
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              className="bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] hover:border-slate-400 dark:hover:border-slate-600"
              variants={purposeCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
            >
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-slate-800 dark:text-slate-300 mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3 sm:mb-4">{aboutData.purpose.mission.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">{aboutData.purpose.mission.description}</p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] hover:border-slate-400 dark:hover:border-slate-600"
              variants={purposeCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
            >
              <Eye className="w-10 h-10 sm:w-12 sm:h-12 text-slate-800 dark:text-slate-300 mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3 sm:mb-4">{aboutData.purpose.vision.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">{aboutData.purpose.vision.description}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. Core Values */}
      <div className="py-12 sm:py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {aboutData.coreValues.map((val, i) => (
            <div key={i} className="flex gap-3 sm:gap-4 p-4 rounded-xl transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:bg-white dark:hover:bg-slate-950 hover:border hover:border-slate-100 dark:hover:border-slate-800">
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-200/50 dark:bg-slate-700/30 flex items-center justify-center text-slate-800 dark:text-slate-300">
                {renderIcon(val.icon, "w-5 h-5 sm:w-6 sm:h-6")}
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">{val.title}</h4>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">{val.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Leadership */}
      <div className="bg-slate-50 dark:bg-slate-900 py-12 sm:py-16 lg:py-24 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12 lg:mb-16">
            <motion.div
              className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900 dark:text-blue-400 font-semibold tracking-wider">{leadershipSection.title || aboutData.leadership?.sectionLabelExperienced || ''}</h3>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{leadershipSection.subtitle || aboutData.leadership?.heading || ''}</h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">{leadershipSection.description || ''}</p>
            </motion.div>
          </div>
          
          <div className="space-y-12 sm:space-y-16">
            {leadershipMembers.length > 0 ? (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 border-b border-slate-200 dark:border-slate-800 pb-3 sm:pb-4">
                  Our Leadership Team
                  <span className="text-xs sm:text-sm font-normal text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 sm:px-3 py-1 rounded-full ml-2 sm:ml-4">{leadershipMembers.length} {leadershipMembers.length === 1 ? 'Leader' : 'Leaders'}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                  {leadershipMembers.map((leader, i) => (
                    <div key={leader.id} className="bg-white dark:bg-slate-950 rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center shadow-sm border border-slate-100 dark:border-slate-800 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]">
                      <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 sm:mb-4 bg-slate-100 dark:bg-slate-800 flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        {leader.image ? (
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
                        ) : (
                          <Users className="h-12 w-12 text-slate-400" />
                        )}
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{leader.name}</h4>
                      <p className="text-slate-700 dark:text-slate-300 font-medium text-sm mb-3 sm:mb-4">{leader.position}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 sm:mb-6 grow">{leader.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

          </div>
        </div>
      </div>

      {/* 5. History */}
      <div className="history-section py-12 sm:py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4"
          variants={historyHeadingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
        >
          <motion.h3
            className="text-2xl sm:text-3xl lg:text-4xl md:text-5xl text-slate-900 dark:text-blue-400 font-semibold tracking-wider"
            initial={{ opacity: 0, y: 18, letterSpacing: "0.18em" }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: "0.08em" }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            {aboutData.historySection.sectionLabel}
          </motion.h3>
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          >
            {aboutData.historySection.heading}
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400"
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
                <h3 className="history-year" style={{ fontSize: "2rem", lineHeight: 1.05 }}>
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
      <div className="bg-slate-100 dark:bg-slate-900 py-12 sm:py-16 lg:py-24 text-slate-900 dark:text-white">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" variants={impactSectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6 }}>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl text-slate-800 dark:text-blue-400 font-semibold tracking-wider">{impactSectionLabel}</h3>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{aboutData.impact.title}</h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">{aboutData.impact.subtitle}</p>
          </motion.div>
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center border-b border-slate-300 dark:border-slate-800 pb-10 sm:pb-12 lg:pb-16">
            {aboutData.impact.stats.map((stat, i) => (
              <motion.div key={i} className="" variants={impactStatVariants} whileHover={{ scale: 1.03 }}>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-blue-400 mb-1 sm:mb-2">{stat.value}</p>
                <h4 className="text-sm sm:text-base font-semibold mb-1">{stat.label}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="pt-10 sm:pt-12 lg:pt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-slate-700 dark:text-slate-300" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
             <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" /> {aboutData.impact.trustText}</div>
          </motion.div>
        </motion.div>
      </div>

      {/* 7. Culture */}
      <div className="py-12 sm:py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            {aboutData.culture.sectionLabel && <h3 className="text-blue-400 font-semibold uppercase tracking-wider mb-3 sm:mb-4">{aboutData.culture.sectionLabel}</h3>}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">{aboutData.culture.title}</h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 mb-6 sm:mb-8">{aboutData.culture.description}</p>
            <div className="space-y-4 sm:space-y-6">
              {aboutData.culture.points.map((point, i) => (
                <div key={i} className="flex gap-3 sm:gap-4">
                  {renderIcon(point.icon, "w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0")}
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{point.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <motion.img
              src={aboutData.culture.image}
              alt={aboutData.culture.title}
              className="rounded-2xl shadow-xl w-full object-cover h-52 sm:h-80 lg:h-96 xl:h-125"
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
      <div className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <motion.div
          className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center text-slate-900 dark:text-white space-y-6 sm:space-y-8 flex flex-col items-center"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mx-auto" variants={ctaButtonVariants}>{aboutData.cta.title}</motion.h2>
          <motion.p className="text-base sm:text-xl text-slate-700 dark:text-white/90 max-w-xl lg:max-w-2xl mx-auto" variants={ctaButtonVariants}>{aboutData.cta.description}</motion.p>
          <div className="flex w-full flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            {aboutData.cta.buttons.filter(b => b.text !== "Join Our Team").map((button, i) => (
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
                className={button.primary ? "bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-colors shadow-lg flex items-center justify-center w-full sm:w-auto" : "bg-transparent border-2 border-slate-900 dark:border-slate-200 text-slate-900 dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center w-full sm:w-auto"}
              >
                {button.text}
              </motion.button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 text-xs sm:text-sm text-slate-600 dark:text-white/80">
            {aboutData.cta.badges.map((badge, i) => (
              <motion.span key={i} className="flex items-center gap-2" variants={ctaBadgeVariants} whileHover={{ scale: 1.04 }}>
                {renderIcon(badge.icon, "w-3 h-3 sm:w-4 sm:h-4")}
                {badge.text}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
