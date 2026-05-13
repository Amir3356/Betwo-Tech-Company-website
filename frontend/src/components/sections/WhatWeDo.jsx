import { useEffect, useState } from "react";
import axios from "axios";
import { Code, Database, Smartphone, Settings } from "lucide-react";
import { motion } from "framer-motion";

const iconMap = {
  Code,
  Database,
  Smartphone,
  Settings
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
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

export default function WhatWeDo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/data/whatWeDo.json")
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
    return <p className="px-6 md:px-12 py-20">Loading...</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <section className="what-we-do py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{data.title}</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          {data.description}
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {data.services.map((service, i) => {
          const IconComponent = iconMap[service.icon];
          return (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="group bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-[1.02] hover:border-slate-400 dark:hover:border-slate-600"
            >
              <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-900 dark:text-slate-300 mb-6 transition-colors duration-300 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:text-slate-900 dark:group-hover:text-slate-200">
                {IconComponent && <IconComponent className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300 group-hover:text-slate-800 dark:group-hover:text-slate-300">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-300">{service.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}