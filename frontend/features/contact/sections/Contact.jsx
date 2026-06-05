import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  CheckCircle,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import contactDataImport from "../../../shared/data/contactUs.json";
import { motion, AnimatePresence } from "framer-motion";

const iconMap = { Mail, Phone, MapPin, Clock };

const socialIcons = {
  telegram: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 3.5 2.8 11.1c-1 .4-1 1.8.1 2.2l4.7 1.5 1.8 5.6c.3.8 1.3 1 1.9.5l2.7-2.2 4.9 3.6c.7.5 1.7.1 1.9-.8l2.9-15.1c.2-1-1-1.7-1.9-1.3z"/><path d="m8.8 14.8 8.8-6.3"/></svg>,
  whatsapp: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 11.9a8.5 8.5 0 0 1-12.5 7.5L3 21l1.6-4.8A8.5 8.5 0 1 1 20.5 11.9z"/><path d="M9.2 8.7c.2-.5.4-.5.7-.5h.6c.2 0 .5 0 .7.5l.7 1.7c.1.3.1.6-.1.8l-.5.6c-.2.2-.2.5 0 .7.5.8 1.3 1.6 2.1 2.1.2.1.5.1.7 0l.7-.5c.2-.1.5-.2.8-.1l1.7.7c.5.2.5.5.5.7v.6c0 .3 0 .5-.5.7-.4.2-1 .4-1.7.4-4.4 0-8-3.6-8-8 0-.7.2-1.3.4-1.7z"/></svg>,
  tiktok: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>,
};



function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 sm:p-6 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <span className="font-semibold text-slate-800 dark:text-white pr-4 text-base sm:text-lg">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <p className="text-slate-600 dark:text-slate-400 pt-3 sm:pt-4 text-base sm:text-lg">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [data] = useState(contactDataImport);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // contact data is statically imported from src/data/contactUs.json

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch(`/api/contact-messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to send message.");
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (submitError) {
      setError(submitError.message || "Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!data)
    return (
      <section className="bg-white dark:bg-slate-950 pt-20 sm:pt-24 lg:pt-32 pb-10">
        Error loading data
      </section>
    );

  const hero = data.hero || {};
  const contactInfo = data.contactInfo || [];
  const guaranteed = data.guaranteedResponse || {};
  const form = data.form || {};
  const faqs = data.faq || [];
  const socialMedia = data.socialMedia || [];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.06 },
    },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const cardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <section className="contact-section bg-white dark:bg-slate-950 pt-20 sm:pt-24 lg:pt-32 pb-10 sm:pb-12 lg:pb-16 overflow-hidden">
      {/* ── Hero ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-24">
        {/* Background orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/5 dark:bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/5 dark:bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          className="relative z-10 text-center max-w-3xl mx-auto space-y-4 sm:space-y-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/40 text-blue-600 dark:text-blue-300 text-sm font-semibold">
            <MessageSquare size={14} /> Get In Touch
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white leading-tight">
            {hero.title}
            <br className="hidden sm:block" />
            <span className="text-slate-800 dark:text-slate-300">
              {hero.highlightText}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl sm:max-w-2xl mx-auto">
            {hero.description}
          </p>
        </motion.div>
      </div>

      {/* ── Contact Info Cards ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-24">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {contactInfo.map((info, i) => {
            const IconComponent = iconMap[info.icon] || Mail;
            return (
              <motion.div
                key={i}
                variants={cardVariant}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-300"
              >
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-slate-200/50 dark:bg-slate-700/30 rounded-xl flex items-center justify-center text-slate-800 dark:text-slate-300 mb-3 sm:mb-5">
                  <IconComponent className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">
                  {info.title}
                </h3>
                <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 break-all">
                  {info.content}
                </p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-500 mt-1 sm:mt-2">
                  {info.subtext}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ── Guaranteed Response Banner ── */}
      <motion.div
        className="bg-slate-800 dark:bg-blue-900/20 py-8 sm:py-10 lg:py-12 mb-12 sm:mb-16 lg:mb-24"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3 sm:space-y-4">
          <CheckCircle className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mx-auto text-white/80" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            {guaranteed.title}
          </h2>
          <p className="text-base sm:text-lg text-white/90">
            {guaranteed.description}
          </p>
        </div>
      </motion.div>

      {/* ── Google Map Section ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-24">
        <motion.div
          className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800">
            <a
              href="https://www.google.com/maps/search/?api=1&query=8.99485,38.76457"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 dark:bg-sky-400 dark:hover:bg-sky-500 dark:text-black font-semibold transition-all shadow-sm hover:shadow-md"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
          </div>
          <div className="relative w-full h-[500px] overflow-hidden bg-slate-200 dark:bg-slate-800">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=38.76257,8.99285,38.76657,8.99685&layer=mapnik&marker=8.99485,38.76457"
              width="100%"
              height="100%"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-200 dark:bg-slate-800 pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* ── Contact Form ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-24">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Column - Contact Info (2x2 grid matching homepage) */}
          <motion.div
            className="space-y-6"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => {
                const IconComponent = iconMap[info.icon] || Mail;
                return (
                  <motion.div
                    key={index}
                    variants={cardVariant}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-700 dark:hover:border-blue-500 transition-all duration-300"
                  >
                    <div className="w-9 h-9 sm:w-12 sm:h-12 bg-slate-200/50 dark:bg-slate-700/30 rounded-lg flex items-center justify-center text-slate-800 dark:text-slate-300 mb-3 sm:mb-4">
                      {IconComponent && <IconComponent className="w-4 h-4 sm:w-6 sm:h-6" />}
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">
                      {info.title}
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300 font-medium mb-1 text-xs sm:text-sm">
                      {info.content}
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-500">
                      {info.subtext}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Response Badge */}
            <motion.div
              className="bg-slate-800 dark:bg-blue-900/20 border border-slate-700 dark:border-blue-800 rounded-xl p-6 mt-8"
              id="guaranteed-response"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-white dark:text-slate-300 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white dark:text-white mb-2">
                    {guaranteed.title}
                  </h4>
                  <p className="text-sm text-white/80 dark:text-slate-400">
                    {guaranteed.description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Connect With Us */}
            {socialMedia.length > 0 && (
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">
                  Connect With Us
                </h4>
                <div className="flex items-center gap-3">
                  {socialMedia.map((item, i) => (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md"
                      title={item.name}
                    >
                      {socialIcons[item.icon] || null}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Form (matching homepage style) */}
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Quick Message
            </h3>

            {submitted ? (
              <motion.div
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Message Sent!
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-400 dark:hover:bg-blue-500 text-white dark:text-black px-6 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-blue-500/20 hover:-translate-y-1 hover:shadow-xl"
                >
                  {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* ── FAQ ── */}
      <div className="bg-slate-50 dark:bg-slate-900 py-12 sm:py-16 lg:py-24 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest">
              <HelpCircle size={16} /> FAQ
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <motion.div
            className="space-y-3 sm:space-y-4"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={cardVariant} whileHover={{ y: -4 }}>
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
