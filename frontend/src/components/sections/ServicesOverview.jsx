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

// Map service titles to images
const imageMap = {
  "Custom Management Systems": "/assets/Custom Management System.jpeg",
  "Web & Mobile Application Development": "/assets/Web-Mobile-Application-Development.jpeg",
  "Business Process Digitalization": "/assets/Business Process Digitalization.jpeg",
  "UI/UX Design for Management Systems": "/assets/UI/UX Design for Management Systems.jpeg",
  "System Upgrade & Optimization": "/assets/System-Upgrade-Optimization.jpeg",
  "Support & Long-Term Partnership": "/assets/Support & Long-Term Partnership.jpeg"
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
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h2>
          <motion.h3 
            className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {comprehensive.title}
          </motion.h3>
          <motion.p 
            className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
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
            const serviceImage = imageMap[service.title];
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl overflow-hidden"
              >
                {/* Image */}
                {serviceImage && (
                  <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <motion.img
                      src={serviceImage}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      initial={{ opacity: 0, scale: 1.1 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Floating Icon */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-slate-900 dark:text-slate-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                      {IconComponent && <IconComponent className="w-6 h-6" />}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-8">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300 group-hover:text-slate-800 dark:group-hover:text-slate-300">
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
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500 dark:bg-slate-400 mt-1.5 shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  
                </div>
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
            href="/services#how-we-bring-your-vision-to-life"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-lg transition-all shadow-lg shadow-slate-900/20 dark:shadow-slate-900/20 hover:-translate-y-1 hover:shadow-xl"
          >
            View All Services <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
