import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Database, Smartphone, Lightbulb, LayoutTemplate, Settings, Repeat, ArrowRight } from "lucide-react";

const iconMap = {
  Database,
  Smartphone,
  Lightbulb,
  LayoutTemplate,
  Settings,
  Repeat
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ServicesOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/data/services.json")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load services data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <section className="py-20 bg-white dark:bg-slate-950">Loading...</section>;
  }

  if (!data) {
    return null;
  }

  const comprehensive = data.comprehensive || {};
  const services = comprehensive.services || [];

  return (
    <section className="services-overview py-20 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 
            className="text-blue-400 font-semibold uppercase tracking-wider text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h3>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {comprehensive.title}
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {comprehensive.description}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-white dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-slate-900 dark:text-blue-400 mb-6 transition-all duration-300 group-hover:bg-blue-400 group-hover:text-white dark:group-hover:bg-blue-500 group-hover:scale-110 group-hover:rotate-3">
                  {IconComponent && <IconComponent className="w-7 h-7" />}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                  {service.description}
                </p>

                {/* Key Points */}
                <ul className="space-y-2 mb-6">
                  {service.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 text-slate-900 dark:text-blue-400 font-semibold text-sm hover:gap-3 transition-all group-hover:text-blue-600 dark:group-hover:text-blue-300"
                >
                  Learn more <ArrowRight size={16} />
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-400 dark:hover:bg-blue-500 text-white dark:text-black font-extrabold text-lg transition-all shadow-lg shadow-slate-900/20 dark:shadow-blue-500/20 hover:-translate-y-1 hover:shadow-xl"
          >
            View All Services <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
