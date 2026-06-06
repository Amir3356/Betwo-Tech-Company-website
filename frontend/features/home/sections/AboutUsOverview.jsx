import { useState, useEffect } from "react";
import aboutDataImport from "../../../shared/data/aboutUs.json";
import { motion } from "framer-motion";
import { Shield, Award, Users, Lightbulb, Star, Handshake, ArrowRight, CheckCircle, Code, Database, Smartphone, Settings, Globe, Cloud, Palette, BarChart, Server, PenTool, Zap, Monitor, GitBranch, LayoutTemplate, Repeat, Cpu, Terminal, HardDrive, Tablet, Watch, Box, Layers, Component, Eye, Cog, Wrench, Puzzle, Package, GitPullRequest, Book, FileCode, Braces, Network, Router, Container, Boxes } from "lucide-react";
import { getAssetUrl } from "../../../assets/index.js";

const techIconMap = {
  Code, Database, Smartphone, Settings, Globe, Shield, Cloud, Palette, BarChart, Server, PenTool, Zap, Monitor, GitBranch, Lightbulb, Award, Users, Star, Handshake, LayoutTemplate, Repeat, Cpu, Terminal, HardDrive, Tablet, Watch, Box, Layers, Component, Eye, Cog, Wrench, Puzzle, Package, GitPullRequest, Book, FileCode, Braces, Network, Router, Container, Boxes,
};

const iconMap = {
  Shield,
  Award,
  Users,
  Lightbulb,
  Star,
  Handshake,
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const leftPanelVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const rightPanelVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const valueCardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function AboutUsOverview() {
  const [data] = useState(aboutDataImport);
  const [sectionMeta, setSectionMeta] = useState({ title: "Our Tech Stack", description: "Cutting-edge technologies we use to build powerful solutions" });
  const [techItems, setTechItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [sectionRes, stackRes] = await Promise.all([
          fetch("/api/tech-stack-section"),
          fetch("/api/tech-stack"),
        ]);
        if (sectionRes.ok) {
          const s = await sectionRes.json();
          if (s?.data) setSectionMeta(s.data);
        }
        if (stackRes.ok) {
          const t = await stackRes.json();
          if (Array.isArray(t?.data)) setTechItems(t.data);
        }
      } catch {}
    };
    load();
  }, []);

  if (!data) {
    return null;
  }

  const hero = data.hero || {};
  const purpose = data.purpose || {};
  const coreValues = data.coreValues || [];
  const culture = data.culture || {};

  return (
    <section className="about-us-overview py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Main Content - Two Column Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12 lg:mb-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Column - Text Content */}
          <motion.div className="space-y-4 sm:space-y-6" variants={leftPanelVariants}>
            <motion.h2
              className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              About Us
            </motion.h2>
            
            <motion.h3
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-700 dark:text-slate-300"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {hero.title} - <span className="text-slate-700 dark:text-slate-300">{hero.highlightText}</span>
            </motion.h3>

            <motion.p
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {hero.description}
            </motion.p>

            {/* Mission & Vision Cards */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 pt-4">
              <motion.div
                className="group bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-700 dark:hover:border-slate-500 transition-all duration-300 hover:shadow-lg hover:shadow-slate-300/50 dark:hover:shadow-slate-900/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-200/50 dark:bg-slate-700/30 rounded-lg flex items-center justify-center text-slate-800 dark:text-slate-300 mb-3 sm:mb-4">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1 sm:mb-2 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                  {purpose.mission?.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {purpose.mission?.description}
                </p>
              </motion.div>

              <motion.div
                className="group bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-700 dark:hover:border-slate-500 transition-all duration-300 hover:shadow-lg hover:shadow-slate-300/50 dark:hover:shadow-slate-900/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-200/50 dark:bg-slate-700/30 rounded-lg flex items-center justify-center text-slate-800 dark:text-slate-300 mb-3 sm:mb-4">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1 sm:mb-2 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                  {purpose.vision?.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {purpose.vision?.description}
                </p>
              </motion.div>
            </div>

            {/* Trust Badge */}
            <motion.div
              className="flex items-center gap-3 pt-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Shield className="w-5 h-5 text-slate-800 dark:text-slate-300" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {hero.trustText}
              </span>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a
                href="/about"
                className="about-us-cta relative z-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black hover:bg-gray-800 dark:bg-sky-400 dark:hover:bg-sky-500 text-white font-extrabold text-lg transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl"
              >
                Learn More About Us <ArrowRight size={20} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div className="relative" variants={rightPanelVariants}>
            <motion.img
              src={getAssetUrl("Company Overview - built with long-term vision.png") || hero.image}
              alt="About Us"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
            />
            
            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -4, scale: 1.05 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200/50 dark:bg-slate-700/30 rounded-full flex items-center justify-center text-slate-800 dark:text-slate-300">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">3+</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Years Experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* How We Work Section */}
        {culture.title ? (
          <motion.div
            className="mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">{culture.title}</h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 sm:mb-8">{culture.description}</p>
                <div className="space-y-4 sm:space-y-6">
                  {culture.points.map((point, i) => {
                    const IconComponent = iconMap[point.icon];
                    return (
                      <div key={i} className="flex gap-3 sm:gap-4">
                        {IconComponent && <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />}
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">{point.title}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{point.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-8 lg:mt-0 rounded-2xl overflow-hidden shadow-xl">
                <motion.img
                  src={getAssetUrl("How We Work.png") || culture.image}
                  alt={culture.title}
                  className="w-full h-auto object-cover"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.04 }}
                />
              </div>
            </div>
          </motion.div>
        ) : null}

        {/* Core Values Section */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Our Core Values
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        {/* Core Values Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {coreValues.map((value, index) => {
            const IconComponent = iconMap[value.icon];
            return (
              <motion.div
                key={index}
                variants={valueCardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-700 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-slate-300/50 dark:hover:shadow-slate-900/30"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-200/50 dark:bg-slate-700/30 rounded-lg flex items-center justify-center text-slate-800 dark:text-slate-300 shrink-0 transition-colors duration-300">
                    {IconComponent && <IconComponent className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300 group-hover:text-slate-800 dark:group-hover:text-slate-100">
                      {value.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          className="mt-12 sm:mt-16 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {sectionMeta.title}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {sectionMeta.description}
            </p>
          </div>

          {/* Tech Stack Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {(() => {
              const grouped = {};
              techItems.forEach((item) => {
                const cat = item.category || "Other";
                if (!grouped[cat]) grouped[cat] = [];
                grouped[cat].push(item);
              });
              return Object.entries(grouped).map(([category, items], index) => {
                const IconComponent = techIconMap[items[0]?.icon] || Cpu;
                return (
                  <motion.div
                    key={category}
                    variants={valueCardVariants}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-700 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-300/50 dark:hover:shadow-slate-900/30"
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:text-slate-800 dark:group-hover:text-slate-300 bg-slate-200/30 dark:bg-slate-700/30 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-slate-800 dark:group-hover:text-slate-100">
                        {category}
                      </h4>
                    </div>

                    {/* Technologies List */}
                    <div className="space-y-3">
                      {items.map((tech, idx) => (
                        <motion.div
                          key={tech.id}
                          className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                        >
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {tech.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              });
            })()}
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}
