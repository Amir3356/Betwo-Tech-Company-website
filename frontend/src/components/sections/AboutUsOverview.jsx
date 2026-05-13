import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Shield, Award, Users, Lightbulb, Star, Handshake, ArrowRight, CheckCircle } from "lucide-react";

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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/data/aboutUs.json")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load about data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <section className="py-20 bg-slate-50 dark:bg-slate-900">Loading...</section>;
  }

  if (!data) {
    return null;
  }

  const hero = data.hero || {};
  const purpose = data.purpose || {};
  const coreValues = data.coreValues || [];

  return (
    <section className="about-us-overview py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Content - Two Column Layout */}
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center mb-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Column - Text Content */}
          <motion.div className="space-y-6" variants={leftPanelVariants}>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              About Us
            </motion.h2>
            
            <motion.h3
              className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {hero.title} - <span className="text-blue-400">{hero.highlightText}</span>
            </motion.h3>

            <motion.p
              className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {hero.description}
            </motion.p>

            {/* Mission & Vision Cards */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <motion.div
                className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 bg-blue-400/10 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {purpose.mission?.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {purpose.mission?.description}
                </p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 bg-blue-400/10 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {purpose.vision?.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
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
              <Shield className="w-5 h-5 text-blue-400" />
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
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-400 dark:hover:bg-blue-500 text-white dark:text-black font-extrabold text-lg transition-all shadow-lg shadow-slate-900/20 dark:shadow-blue-500/20 hover:-translate-y-1 hover:shadow-xl"
              >
                Learn More About Us <ArrowRight size={20} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div className="relative" variants={rightPanelVariants}>
            <motion.img
              src={hero.image}
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
                <div className="w-12 h-12 bg-blue-400/10 rounded-full flex items-center justify-center text-blue-400">
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

        {/* Core Values Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
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
                className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-400/10 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                    {IconComponent && <IconComponent className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {value.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
