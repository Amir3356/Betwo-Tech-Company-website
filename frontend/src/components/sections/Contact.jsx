import { Mail, Phone, MapPin, Clock, Send, ChevronDown, Navigation, Bus, Car, ExternalLink, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const iconMap = { Mail, Phone, MapPin, Clock };

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <span className="font-semibold text-slate-800 dark:text-white pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-400 pt-4">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get("/data/contactUs.json")
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  if (loading) return <section className="bg-white dark:bg-slate-950 pt-32 pb-16">Loading...</section>;
  if (!data) return <section className="bg-white dark:bg-slate-950 pt-32 pb-16">Error loading data</section>;

  const hero = data.hero || {};
  const contactInfo = data.contactInfo || [];
  const guaranteed = data.guaranteedResponse || {};
  const form = data.form || {};
  const office = data.office || {};
  const faqs = data.faq || [];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.985 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section className="contact-section bg-white dark:bg-slate-950 pt-32 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <motion.div className="text-center max-w-3xl mx-auto space-y-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white leading-tight">{hero.title}<br/><span className="text-slate-900 dark:text-blue-400">{hero.highlightText}</span></h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{hero.description}</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          {contactInfo.map((info, i) => {
            const IconComponent = iconMap[info.icon] || Mail;
            return (
              <motion.div key={i} variants={cardVariant} whileHover={{ y: -6, scale: 1.02 }} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 bg-slate-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-slate-900 dark:text-blue-400 mb-5">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-2">{info.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm break-all">{info.content}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">{info.subtext}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <motion.div className="bg-slate-100 dark:bg-blue-400 py-12 mb-24" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="max-w-4xl mx-auto px-6 text-center text-slate-900 dark:text-white space-y-4">
          <CheckCircle className="w-12 h-12 mx-auto text-slate-700 dark:text-white/80" />
          <h2 className="text-2xl md:text-3xl font-bold">{guaranteed.title}</h2>
          <p className="text-slate-600 dark:text-white/90 text-lg">{guaranteed.description}</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <motion.div className="grid lg:grid-cols-2 gap-16" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">{form.title}</h2>
            {submitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-600 dark:text-slate-400">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {(form.fields || []).map((field, i) => (
                  field.type === "textarea" ? (
                    <div key={i}>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
                      <textarea name={field.name} value={formData[field.name]} onChange={handleChange} required={field.required} rows={field.rows || 5} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder={field.placeholder} />
                    </div>
                  ) : (
                    <div key={i}>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
                      <input type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} required={field.required} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder={field.placeholder} />
                    </div>
                  )
                ))}
                <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-400 dark:hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-blue-500/20">
                  {form.submitButton} <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">{office.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">{office.description}</p>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-slate-900 dark:text-blue-400 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">{office.address?.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{(office.address?.lines || []).join("<br/>")}</p>
                </div>
              </div>
              <button className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-400 dark:hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-blue-500/20">
                {office.directionsButton} <Navigation className="w-4 h-4" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <motion.div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800" variants={cardVariant} whileHover={{ y: -6 }}>
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wider"><MapPin className="w-4 h-4 text-slate-900 dark:text-blue-500" /> Nearby Landmarks</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">{(office.landmarks || []).map((l, i) => <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {l}</li>)}</ul>
              </motion.div>
              <motion.div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800" variants={cardVariant} whileHover={{ y: -6 }}>
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wider"><Car className="w-4 h-4 text-slate-900 dark:text-blue-500" /> Parking</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{office.parking}</p>
              </motion.div>
            </div>
            <motion.div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800" variants={cardVariant} whileHover={{ y: -6 }}>
              <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wider"><Bus className="w-4 h-4 text-slate-900 dark:text-blue-500" /> Public Transport</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{office.transport}</p>
            </motion.div>
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
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

      <div className="bg-slate-50 dark:bg-slate-900 py-24 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-blue-400 font-semibold uppercase tracking-wider">FAQ</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <motion.div className="space-y-4" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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