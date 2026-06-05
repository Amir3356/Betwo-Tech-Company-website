import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const iconMap = {
  telegram: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 3.5 2.8 11.1c-1 .4-1 1.8.1 2.2l4.7 1.5 1.8 5.6c.3.8 1.3 1 1.9.5l2.7-2.2 4.9 3.6c.7.5 1.7.1 1.9-.8l2.9-15.1c.2-1-1-1.7-1.9-1.3z"/><path d="m8.8 14.8 8.8-6.3"/></svg>,
  whatsapp: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 11.9a8.5 8.5 0 0 1-12.5 7.5L3 21l1.6-4.8A8.5 8.5 0 1 1 20.5 11.9z"/><path d="M9.2 8.7c.2-.5.4-.5.7-.5h.6c.2 0 .5 0 .7.5l.7 1.7c.1.3.1.6-.1.8l-.5.6c-.2.2-.2.5 0 .7.5.8 1.3 1.6 2.1 2.1.2.1.5.1.7 0l.7-.5c.2-.1.5-.2.8-.1l1.7.7c.5.2.5.5.5.7v.6c0 .3 0 .5-.5.7-.4.2-1 .4-1.7.4-4.4 0-8-3.6-8-8 0-.7.2-1.3.4-1.7z"/></svg>,
  tiktok: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>,
};

const quickLinks = [
  { text: "Home", link: "#home" },
  { text: "About Us", link: "/about#about" },
  { text: "Our Projects", link: "/projects#projects" }
];

const services = [
  { text: "Web Application Development", link: "#" },
  { text: "Mobile iOS & Android Apps", link: "#" },
  { text: "Enterprise Custom Software", link: "#" }
];

const socialLinks = [
  { name: "Telegram", url: "https://t.me/ForChristAlone", icon: "telegram" },
  { name: "WhatsApp", url: "https://wa.me/251912882357", icon: "whatsapp" },
  { name: "TikTok", url: "https://tiktok.com/@Betwo tech", icon: "tiktok" }
];

const bottomLinks = [
  { text: "Privacy Policy", link: "#" },
  { text: "Terms of Service", link: "#" },
  { text: "Cookie Policy", link: "#" }
];

export default function Footer() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const colVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <footer
      id="contact"
      className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800 mt-auto overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/5 dark:bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/5 dark:bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/3 dark:bg-purple-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 py-12 sm:py-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="lg:col-span-1 space-y-6" variants={colVariants}>
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-slate-700/30 dark:shadow-slate-600/30 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                B
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-sky-400 dark:via-sky-300 dark:to-sky-400 bg-clip-text text-transparent">
                Betwo Tech
              </span>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
                Connect With Us
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    aria-label={social.name}
                    className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden"
                    variants={iconVariants}
                    whileHover={{ y: -4, scale: 1.1 }}
                  >
                    <div className="absolute inset-0 bg-slate-600/80 dark:bg-slate-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">{iconMap[social.icon]}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={colVariants}>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <motion.li key={i} variants={iconVariants}>
                  <a
                    href={link.link}
                    className="group flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 text-sm font-medium"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.text}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={colVariants}>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 text-lg">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <motion.li key={i} variants={iconVariants}>
                  <a
                    href={service.link}
                    className="group flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 text-sm font-medium"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {service.text}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={colVariants}>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 text-lg">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              
              <li className="group">
                <div className="inline-flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 w-full">
                  <div className="w-8 h-8 rounded-lg bg-slate-400/10 dark:bg-slate-400/20 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone size={16} />
                  </div>
                  <div className="inline-flex items-baseline gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">Phone:</span>
                    <a href="tel:+251911234567" className="text-sm text-slate-700 dark:text-slate-300 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors">+251 911 234 567</a>
                  </div>
                </div>
              </li>
              
              <li className="group">
                <div className="inline-flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 w-full">
                  <div className="w-8 h-8 rounded-lg bg-slate-400/10 dark:bg-slate-400/20 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail size={16} />
                  </div>
                  <div className="inline-flex items-baseline gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">Email:</span>
                    <a href="mailto:hello@betwoch.tech" className="text-sm text-slate-700 dark:text-slate-300 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors break-all">hello@betwoch.tech</a>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-slate-200 dark:border-slate-800 py-6 sm:py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} Betwo Tech. Made in Ethiopia
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
              {bottomLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.link}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium relative group"
                  whileHover={{ y: -2 }}
                >
                  {link.text}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}