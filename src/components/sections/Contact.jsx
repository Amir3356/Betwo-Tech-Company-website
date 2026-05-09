import { Mail, Phone, MapPin, Clock, Send, ChevronDown, MessageSquare, Navigation, Bus, Car, ExternalLink, CheckCircle } from "lucide-react";
import { useState } from "react";

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <span className="font-semibold text-slate-900 dark:text-white pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <section className="bg-white dark:bg-slate-950 pt-32 pb-16 overflow-hidden">

      {/* 1. Hero Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-semibold uppercase tracking-wider">
            Get In Touch
          </h3>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
            Let's Discuss Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400">
              Next Big Idea
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Whether you have a question about our services, need a quote, or want to discuss a project — we're here to help.
          </p>
        </div>
      </div>

      {/* 2. Contact Information Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Email Us</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm break-all">yanoltech@gmail.com</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">We reply within 24 hours</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Call Us</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">+251 942 497 990</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">Mon-Sat 8am-6pm</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Visit Us</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Goro, Addis Ababa</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">Near Jackros & Alamayehu Building</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Business Hours</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Monday - Saturday</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">8:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>

      {/* 3. Guaranteed Response */}
      <div className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 py-12 mb-24">
        <div className="max-w-4xl mx-auto px-6 text-center text-white space-y-4">
          <CheckCircle className="w-12 h-12 mx-auto text-white/80" />
          <h2 className="text-2xl md:text-3xl font-bold">Guaranteed Response Within 24 Hours</h2>
          <p className="text-white/90 text-lg">We value your time and respond to every inquiry promptly.</p>
        </div>
      </div>

      {/* 4. Contact Form + Office Info */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Send Us a Message</h2>
            {submitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-600 dark:text-slate-400">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    How can we help you? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 hover:from-blue-600 hover:via-sky-400 hover:to-cyan-300 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  Send Message <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>

          {/* Office Info */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Visit Our Office in Goro</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Located near Jackros Restaurant and Alamayehu Building</p>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Goro Office</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    Near Jackros Restaurant<br />
                    Alamayehu Building, 3rd Floor<br />
                    Goro, Addis Ababa
                  </p>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 hover:from-blue-600 hover:via-sky-400 hover:to-cyan-300 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                Get Directions <Navigation className="w-4 h-4" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-blue-500" /> Nearby Landmarks
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Jackros Restaurant (2 min walk)</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Alamayehu Building</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Goro Roundabout</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Car className="w-4 h-4 text-blue-500" /> Parking
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Free parking available behind Alamayehu Building</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Bus className="w-4 h-4 text-blue-500" /> Public Transport
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Buses and minibuses available at Goro Roundabout</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. FAQ */}
      <div className="bg-slate-50 dark:bg-slate-900 py-24 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-semibold uppercase tracking-wider">FAQ</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <FAQItem
              question="How quickly do you respond to inquiries?"
              answer="We guarantee a response within 24 hours. Most inquiries are answered within a few hours during business hours (Monday to Saturday, 8:00 AM - 6:00 PM)."
            />
            <FAQItem
              question="Do you work with international clients?"
              answer="Absolutely! We work with clients from around the world. Our team is experienced in remote collaboration and can accommodate different time zones for meetings and communication."
            />
            <FAQItem
              question="What information should I provide for a project quote?"
              answer="To provide an accurate quote, please share details about your project scope, desired features, timeline expectations, and any specific requirements or preferences you have. The more detail you provide, the more accurate our estimate will be."
            />
            <FAQItem
              question="Can I schedule a consultation call?"
              answer="Yes, we'd be happy to schedule a consultation call. Simply fill out the contact form with your preferred date and time, or email us directly at yanoltech@gmail.com and we'll arrange a convenient time."
            />
          </div>
          <div className="text-center mt-12 p-8 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-slate-600 dark:text-slate-400">
              Still have questions? Email our support team and we'll get back to you within 24 hours.
            </p>
            <a
              href="mailto:yanoltech@gmail.com"
              className="inline-flex items-center gap-2 mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-semibold hover:opacity-80 transition-opacity"
            >
              yanoltech@gmail.com <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
