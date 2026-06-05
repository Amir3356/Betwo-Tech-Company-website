import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  Navigation,
  CheckCircle,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import contactDataImport from "../../../shared/data/contactUs.json";
import { motion, AnimatePresence } from "framer-motion";

const iconMap = { Mail, Phone, MapPin, Clock };



function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 sm:p-6 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <span className="font-semibold text-slate-800 dark:text-white pr-4 text-sm sm:text-base">
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
              <p className="text-slate-600 dark:text-slate-400 pt-3 sm:pt-4 text-sm">
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
  const office = data.office || {};
  const faqs = data.faq || [];

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
                className="bg-slate-50 dark:bg-slate-900 p-5 sm:p-6 lg:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-200/50 dark:bg-slate-700/30 rounded-xl flex items-center justify-center text-slate-800 dark:text-slate-300 mb-4 sm:mb-5">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-1 sm:mb-2">
                  {info.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 break-all">
                  {info.content}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 sm:mt-2">
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

      {/* ── Contact Form + Office Info ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-24">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Form */}
          <motion.div variants={fadeUp} id="guaranteed-response">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-8">
              {form.title}
            </h2>
            {submitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 sm:p-8 text-center">
                <CheckCircle className="w-12 sm:w-16 h-12 sm:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  Thank you for reaching out. We&apos;ll get back to you within
                  24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                    {error}
                  </div>
                )}
                {(form.fields || []).map((field, i) =>
                  field.type === "textarea" ? (
                    <div key={i}>
                      <motion.label
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </motion.label>
                      <textarea
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        rows={field.rows || 5}
                        className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ) : (
                    <div key={i}>
                      <motion.label
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </motion.label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all text-sm sm:text-base"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ),
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-blue-600 hover:to-indigo-600 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-400 dark:hover:to-indigo-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-70 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/25"
                >
                  {isSubmitting ? "Sending..." : form.submitButton}{" "}
                  <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Office Info */}
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-8">
              {office.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 sm:mb-8">
              {office.description}
            </p>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 sm:p-6 lg:p-8 border border-slate-100 dark:border-slate-800 mb-6 sm:mb-8">
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-base sm:text-lg">
                    {office.address?.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    {(office.address?.lines || []).join(" ")}
                  </p>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-blue-600 hover:to-indigo-600 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-400 dark:hover:to-indigo-400 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-blue-500/20 text-sm sm:text-base hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/25">
                {office.directionsButton} <Navigation className="w-4 h-4" />
              </button>
            </div>
            <div className="w-full h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3598.8894444363227!2d38.76696689242792!3d8.99646765861126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2set!4v1780560661639!5m2!1sen!2set"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
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
