import { Mail, Phone, MapPin, ArrowRight, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const iconMap = {
  telegram: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 3.5 2.8 11.1c-1 .4-1 1.8.1 2.2l4.7 1.5 1.8 5.6c.3.8 1.3 1 1.9.5l2.7-2.2 4.9 3.6c.7.5 1.7.1 1.9-.8l2.9-15.1c.2-1-1-1.7-1.9-1.3z"/><path d="m8.8 14.8 8.8-6.3"/></svg>,
  whatsapp: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 11.9a8.5 8.5 0 0 1-12.5 7.5L3 21l1.6-4.8A8.5 8.5 0 1 1 20.5 11.9z"/><path d="M9.2 8.7c.2-.5.4-.5.7-.5h.6c.2 0 .5 0 .7.5l.7 1.7c.1.3.1.6-.1.8l-.5.6c-.2.2-.2.5 0 .7.5.8 1.3 1.6 2.1 2.1.2.1.5.1.7 0l.7-.5c.2-.1.5-.2.8-.1l1.7.7c.5.2.5.5.5.7v.6c0 .3 0 .5-.5.7-.4.2-1 .4-1.7.4-4.4 0-8-3.6-8-8 0-.7.2-1.3.4-1.7z"/></svg>,
  twitter: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 5.8c-.8.4-1.7.7-2.6.8a4.5 4.5 0 0 0-7.8 3v1A12.7 12.7 0 0 1 3 5.4s-4 9 5 13a13.7 13.7 0 0 1-8 2c9 5 20 0 20-11.5 0-.2 0-.5-.1-.7.9-.6 1.7-1.4 2.1-2.4z"/></svg>,
};

export default function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    axios.get("/data/footer.json")
      .then((res) => setFooterData(res.data))
      .catch(console.error);
  }, []);

  const brand = footerData?.brand || { name: "Betwoch Tech" };
  const socialLinks = footerData?.socialLinks || [];
  const quickLinks = footerData?.quickLinks || [];
  const services = footerData?.services || [];
  const contact = footerData?.contact || {};
  const bottomLinks = footerData?.bottomLinks || [];

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
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/5 dark:bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/5 dark:bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/3 dark:bg-purple-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Brand Column */}
          <motion.div className="lg:col-span-1 space-y-6" variants={colVariants}>
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-400/30 dark:shadow-blue-500/30 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                B
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                {brand.name}
              </span>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Building innovative digital solutions that transform businesses and drive growth.
            </p>

            {/* Social Links */}
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
                    className="group relative w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden"
                    variants={iconVariants}
                    whileHover={{ y: -4, scale: 1.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">{iconMap[social.icon]}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={colVariants}>
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">
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

          {/* Services Column */}
          <motion.div variants={colVariants}>
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">
              Our Services
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

          {/* Contact Column */}
          <motion.div variants={colVariants}>
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="group">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-blue-400/10 dark:bg-blue-400/20 flex items-center justify-center text-blue-500 dark:text-blue-400 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1">
                      Address
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      {contact.address}<br/>{contact.addressDetail}
                    </p>
                  </div>
                </div>
              </li>
              
              <li className="group">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-green-400/10 dark:bg-green-400/20 flex items-center justify-center text-green-500 dark:text-green-400 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1">
                      Phone
                    </p>
                    <a href={`tel:${contact.phone}`} className="text-sm text-slate-700 dark:text-slate-300 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </li>
              
              <li className="group">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-purple-400/10 dark:bg-purple-400/20 flex items-center justify-center text-purple-500 dark:text-purple-400 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <a href={`mailto:${contact.email}`} className="text-sm text-slate-700 dark:text-slate-300 font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors break-all">
                      {contact.email}
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-slate-200 dark:border-slate-800 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
              © {new Date().getFullYear()} {brand.name}. Made with 
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> 
              in Ethiopia
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm">
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
