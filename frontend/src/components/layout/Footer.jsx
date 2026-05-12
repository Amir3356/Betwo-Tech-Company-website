import { Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const iconMap = {
  telegram: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 3.5 2.8 11.1c-1 .4-1 1.8.1 2.2l4.7 1.5 1.8 5.6c.3.8 1.3 1 1.9.5l2.7-2.2 4.9 3.6c.7.5 1.7.1 1.9-.8l2.9-15.1c.2-1-1-1.7-1.9-1.3z"/><path d="m8.8 14.8 8.8-6.3"/></svg>,
  whatsapp: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 11.9a8.5 8.5 0 0 1-12.5 7.5L3 21l1.6-4.8A8.5 8.5 0 1 1 20.5 11.9z"/><path d="M9.2 8.7c.2-.5.4-.5.7-.5h.6c.2 0 .5 0 .7.5l.7 1.7c.1.3.1.6-.1.8l-.5.6c-.2.2-.2.5 0 .7.5.8 1.3 1.6 2.1 2.1.2.1.5.1.7 0l.7-.5c.2-.1.5-.2.8-.1l1.7.7c.5.2.5.5.5.7v.6c0 .3 0 .5-.5.7-.4.2-1 .4-1.7.4-4.4 0-8-3.6-8-8 0-.7.2-1.3.4-1.7z"/></svg>,
  twitter: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 5.8c-.8.4-1.7.7-2.6.8a4.5 4.5 0 0 0-7.8 3v1A12.7 12.7 0 0 1 3 5.4s-4 9 5 13a13.7 13.7 0 0 1-8 2c9 5 20 0 20-11.5 0-.2 0-.5-.1-.7.9-.6 1.7-1.4 2.1-2.4z"/></svg>,
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
  const backgroundImage = footerData?.backgroundImage;

  const sectionVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, when: "beforeChildren" },
    },
  };

  const colVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
  };

  const iconVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <footer
      id="contact"
      className="relative border-t border-slate-200/60 dark:border-slate-800/60 pt-16 pb-8 px-6 md:px-12 mt-auto overflow-hidden"
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(15, 23, 42, 0.86), rgba(15, 23, 42, 0.9)), url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-slate-950/88 via-slate-950/72 to-slate-900/88 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <motion.div className="lg:col-span-1" variants={colVariants}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-blue-400 flex items-center justify-center text-white font-bold text-xl">
                B
              </div>
              <span className="text-xl font-bold text-slate-900 dark:bg-clip-text dark:text-transparent dark:bg-linear-to-r from-blue-400 via-sky-400 to-cyan-300">
                {brand.name}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, i) => (
                <motion.a key={i} href={social.url} aria-label={social.name} className="w-10 h-10 rounded-full bg-white/70 dark:bg-white/10 flex items-center justify-center text-slate-900 dark:text-white/90 hover:text-cyan-300 hover:shadow-md transition-all border border-slate-300/70 dark:border-white/15 backdrop-blur-sm" variants={iconVariants} whileHover={{ scale: 1.08 }}>
                  {iconMap[social.icon]}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={colVariants}>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, i) => (
                <motion.li key={i} variants={iconVariants}><a href={link.link} className="text-slate-200 hover:text-cyan-300 transition-colors text-sm font-medium">{link.text}</a></motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={colVariants}>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Expertise</h3>
            <ul className="space-y-4">
              {services.map((service, i) => (
                <motion.li key={i} variants={iconVariants}><a href={service.link} className="text-slate-200 hover:text-cyan-300 transition-colors text-sm font-medium">{service.text}</a></motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={colVariants}>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-slate-900 dark:text-cyan-300 mt-1 shrink-0" size={18} />
                <span className="text-slate-200 text-sm font-medium">{contact.address}<br/>{contact.addressDetail}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-slate-900 dark:text-cyan-300 shrink-0" size={18} />
                <span className="text-slate-200 text-sm font-medium">{contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-slate-900 dark:text-cyan-300 shrink-0" size={18} />
                <span className="text-slate-200 text-sm font-medium">{contact.email}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <p className="text-slate-200 text-sm font-medium">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            {bottomLinks.map((link, i) => (
              <motion.a key={i} href={link.link} className="text-slate-200 hover:text-cyan-300 transition-colors font-medium" whileHover={{ scale: 1.03 }}>
                {link.text}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}