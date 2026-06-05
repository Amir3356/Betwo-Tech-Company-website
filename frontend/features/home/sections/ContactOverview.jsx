import { useState } from "react";
import contactDataImport from "../../../shared/data/contactUs.json";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight, CheckCircle } from "lucide-react";

const iconMap = { Mail, Phone, MapPin, Clock };

const socialIcons = {
  telegram: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 3.5 2.8 11.1c-1 .4-1 1.8.1 2.2l4.7 1.5 1.8 5.6c.3.8 1.3 1 1.9.5l2.7-2.2 4.9 3.6c.7.5 1.7.1 1.9-.8l2.9-15.1c.2-1-1-1.7-1.9-1.3z"/><path d="m8.8 14.8 8.8-6.3"/></svg>,
  whatsapp: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 11.9a8.5 8.5 0 0 1-12.5 7.5L3 21l1.6-4.8A8.5 8.5 0 1 1 20.5 11.9z"/><path d="M9.2 8.7c.2-.5.4-.5.7-.5h.6c.2 0 .5 0 .7.5l.7 1.7c.1.3.1.6-.1.8l-.5.6c-.2.2-.2.5 0 .7.5.8 1.3 1.6 2.1 2.1.2.1.5.1.7 0l.7-.5c.2-.1.5-.2.8-.1l1.7.7c.5.2.5.5.5.7v.6c0 .3 0 .5-.5.7-.4.2-1 .4-1.7.4-4.4 0-8-3.6-8-8 0-.7.2-1.3.4-1.7z"/></svg>,
  tiktok: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>,
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
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ContactOverview() {
  const [data] = useState(contactDataImport);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // contact overview data is statically imported from src/data/contactUs.json

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    (async () => {
      try {
        const response = await fetch(`/api/contact-messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, subject: "" }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to send message.");
        }

        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } catch (submitError) {
        setError(submitError.message || "Failed to send message.");
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  if (!data) {
    return null;
  }

  const hero = data.hero || {};
  const contactInfo = data.contactInfo || [];

  return (
    <section className="contact-overview py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.h2>
          <motion.h3
            className="text-lg sm:text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {hero.title} <span className="text-slate-800 dark:text-slate-300">{hero.highlightText}</span>
          </motion.h3>
          <motion.p
            className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {hero.description}
          </motion.p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-10 sm:mb-16">
          {/* Left Column - Contact Info */}
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
                const IconComponent = iconMap[info.icon];
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-fuchsia-400 dark:hover:border-blue-500 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-slate-200/50 dark:bg-slate-700/30 rounded-lg flex items-center justify-center text-slate-800 dark:text-slate-300 mb-4">
                      {IconComponent && <IconComponent className="w-6 h-6" />}
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                      {info.title}
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300 font-medium mb-1">
                      {info.content}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
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
                    Guaranteed Response Within 24 Hours
                  </h4>
                  <p className="text-sm text-white/80 dark:text-slate-400">
                    We value your time and respond to every inquiry promptly.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Connect With Us */}
            {data.socialMedia && data.socialMedia.length > 0 && (
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
                  {data.socialMedia.map((item, i) => (
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

          {/* Right Column - Quick Contact Form */}
          <motion.div
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
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 sm:p-8 md:p-12 border border-slate-200 dark:border-slate-800 mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Need More Information?
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Visit our full contact page for detailed information, office location, and FAQs.
          </p>
          <a
            href="/contact"
            className="contact-overview-cta inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-400 dark:hover:bg-blue-500 text-white dark:text-black font-extrabold text-lg transition-all shadow-lg shadow-slate-900/20 dark:shadow-blue-500/20 hover:-translate-y-1 hover:shadow-xl"
          >
            Visit Contact Page <ArrowRight size={20} />
          </a>
        </motion.div>

        {/* Google Map Section */}
        <motion.div
          className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >


          {/* Google Map Embed */}
          <div className="relative w-full h-96 bg-slate-200 dark:bg-slate-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3076234567!2d38.7577!3d9.0192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sMeskel%20Square!5e0!3m2!1sen!2set!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location Map"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
