import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle, Database, Smartphone, Lightbulb, LayoutTemplate, Settings, Repeat } from "lucide-react";

const iconMap = {
  Database,
  Smartphone,
  Lightbulb,
  LayoutTemplate,
  Settings,
  Repeat
};

export default function Services() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState([]);
  const statsRef = useRef(null);
  const animatedRef = useRef(false);
  const hero = data?.hero || { title: "", highlightTitle: "", description: "", buttons: [], stats: [], image: "" };
  const comprehensive = data?.comprehensive || { title: "", description: "", services: [] };
  const featureDeepDivesSection = data?.featureDeepDivesSection || { title: "", description: "" };
  const featureDeepDives = data?.featureDeepDives || [];
  const process = data?.process || { title: "", steps: [] };

  useEffect(() => {
    axios
      .get("/data/services.json")
      .then((response) => {
        setData(response.data);
        if (response.data?.hero?.stats) {
          setCounts(response.data.hero.stats.map(() => "0"));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load services data:", err);
        setLoading(false);
      });
  }, []);

    useEffect(() => {
      if (!hero.stats.length || !statsRef.current) return;

      const parseStat = (value) => {
        const text = String(value).trim();
        const match = text.match(/^([-+]?[\d,.]*\.?\d*)(.*)$/);

        if (!match) {
          return { target: 0, suffix: "", decimals: 0 };
        }

        const numberText = match[1].replace(/,/g, "");
        const suffix = match[2] || "";
        const target = parseFloat(numberText) || 0;
        const decimals = numberText.includes(".") ? numberText.split(".")[1].length : 0;

        return { target, suffix, decimals };
      };

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const animateIndex = (index, target, decimals, suffix) => {
        const duration = 4500;
        const start = performance.now();

        const step = (now) => {
          const elapsed = now - start;
          const progress = Math.min(1, elapsed / duration);
          const value = easeOutCubic(progress) * target;
          const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

          setCounts((prev) => {
            const next = [...prev];
            next[index] = formatted + suffix;
            return next;
          });

          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };

        requestAnimationFrame(step);
      };

      const handleIntersect = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;

            hero.stats.forEach((stat, index) => {
              const { target, suffix, decimals } = parseStat(stat.value);
              animateIndex(index, target, decimals, suffix);
            });

            observer.disconnect();
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersect, { threshold: 0.2 });
      observer.observe(statsRef.current);

      return () => observer.disconnect();
    }, [data]);

  if (loading) {
    return <p className="px-6 md:px-12 py-20">Loading...</p>;
  }

  if (!data) {
    return null;
  }

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const iconVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section className="bg-white dark:bg-slate-950 pt-32 pb-16 overflow-hidden">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <motion.div className="grid lg:grid-cols-2 gap-16 items-center" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <motion.div className="space-y-8" variants={fadeUp}>
            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight" variants={fadeUp}>
              {hero.title} <br />
              <span className="text-blue-400">
                {hero.highlightTitle}
              </span>
            </motion.h1>
            <motion.p className="text-lg md:text-xl text-slate-600 dark:text-slate-400" variants={fadeUp}>
              {hero.description}
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" variants={fadeUp}>
              <motion.button whileHover={{ scale: 1.03 }} className="bg-slate-900 hover:bg-slate-800 dark:bg-blue-400 dark:hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-blue-500/20">
                {hero.buttons[0]?.text || "Start a Project"}
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-center">
                {hero.buttons[1]?.text || "View Services"}
              </motion.button>
            </motion.div>
            <motion.div ref={statsRef} className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-200 dark:border-slate-800" variants={sectionVariants}>
              {hero.stats.map((stat, i) => (
                <motion.div key={i} variants={cardVariant} whileHover={{ scale: 1.02 }}>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-blue-400">{counts[i] || "0"}</p>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div className="relative" variants={fadeUp}>
            <motion.img 
              src={data.hero.image}
              alt="Our team working together" 
              className="rounded-2xl shadow-xl w-full object-cover"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Comprehensive Solutions Grid */}
      <div className="bg-slate-50 dark:bg-slate-900 py-24 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{comprehensive.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">{comprehensive.description}</p>
          </div>
          
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {comprehensive.services.map((service, i) => {
                const IconComponent = iconMap[service.icon];
                return (
                <motion.div key={i} className="group bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800" variants={cardVariant} whileHover={{ y: -8, scale: 1.02 }}>
                  <div className="w-14 h-14 bg-slate-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-slate-900 dark:text-blue-400 mb-6 transition-colors duration-300 group-hover:bg-slate-200 dark:group-hover:bg-blue-100 group-hover:text-slate-900 dark:group-hover:text-blue-500">
                    {IconComponent && <IconComponent className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300 group-hover:text-blue-600">{service.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 min-h-20 transition-colors duration-300 group-hover:text-slate-800 dark:group-hover:text-slate-300">{service.description}</p>
                  <ul className="space-y-3">
                    {service.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm font-medium text-slate-800 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                );
              })}
          </motion.div>
        </div>
      </div>

      {/* Feature Deep Dives */}
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{featureDeepDivesSection.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">{featureDeepDivesSection.description}</p>
        </div>

        <motion.div className="space-y-24" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
          {featureDeepDives.map((item, i) => (
            <motion.div key={i} className={`group flex flex-col lg:flex-row gap-12 items-center ${item.reverse ? 'lg:flex-row-reverse' : ''}`} variants={cardVariant} whileHover={{ scale: 1.01 }}>
              <div className="flex-1 space-y-6">
                <span className="bg-blue-400 text-white font-bold px-4 py-1.5 rounded-full text-sm">Featured Service</span>
                <motion.h3 className="text-3xl font-bold text-slate-900 dark:text-white" variants={fadeUp}>{item.title}</motion.h3>
                <motion.p className="text-lg text-slate-600 dark:text-slate-400" variants={fadeUp}>{item.description}</motion.p>
                
                <div className="grid sm:grid-cols-2 gap-8 pt-4">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {item.features.map((f, idx) => (
                        <motion.li key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm" variants={iconVariants}>
                          <CheckCircle className="w-4 h-4 text-blue-500" /> {f}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-3">Benefits</h4>
                    <ul className="space-y-2">
                      {item.benefits.map((b, idx) => (
                        <motion.li key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm" variants={iconVariants}>
                          <CheckCircle className="w-4 h-4 text-green-500" /> {b}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                   <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm uppercase tracking-wider">Technologies We Use</h4>
                   <div className="flex flex-wrap gap-2">
                     {item.tech.map((t, idx) => (
                       <motion.span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md text-sm font-medium" variants={iconVariants}>
                         {t}
                       </motion.span>
                     ))}
                   </div>
                </div>
              </div>
              <div className="flex-1 w-full relative">
                <motion.div className="aspect-4/3 bg-linear-to-tr from-blue-100 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg" variants={cardVariant}>
                  {item.image ? (
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 0.98, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.6 }}
                    />
                  ) : (
                    <LayoutTemplate className="w-32 h-32 text-blue-200 dark:text-blue-900/50" />
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Our Process Section */}
      <div className="bg-slate-100 dark:bg-slate-900 py-24 text-slate-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h3 className="text-blue-400 font-semibold uppercase tracking-wider">Our Process</h3>
            <h2 className="text-3xl md:text-4xl font-bold">{process.title}</h2>
          </div>
          
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            {process.steps.map((step, i) => (
               <motion.div key={i} className="relative p-4 rounded-xl" variants={cardVariant} whileHover={{ y: -6 }}>
                 <div className="text-5xl font-extrabold text-slate-800 mb-4 opacity-50">{step.number}</div>
                 <h4 className="text-xl font-bold mb-2 flex items-center gap-3">
                   {step.title}
                 </h4>
                 <p className="text-slate-600 dark:text-slate-400 text-sm">{step.description}</p>
               </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
