import { CheckCircle, Mail, Calendar, Database, Smartphone, Lightbulb, LayoutTemplate, Settings, Repeat } from "lucide-react";
import WebMobileApp from "../../assets/Web-Mobile-Application-Development.jpeg";
import SystemUpgrade from "../../assets/System-Upgrade-Optimization.jpeg";
import SupportPartnership from "../../assets/Support & Long-Term Partnership.jpeg";
import CustomManagement from "../../assets/Custom Management System.jpeg";
import BusinessProcess from "../../assets/Business Process Digitalization.jpeg";
import UXDesign from "../../assets/UI/UX Design for Management Systems.jpeg";

export default function Services() {
  return (
    <section className="bg-white dark:bg-slate-950 pt-32 pb-16 overflow-hidden">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              Transform Your Business With <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400">
                Custom Software Solutions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
              We build practical, scalable software that streamlines your operations, automates workflows, and drives real business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 hover:from-blue-600 hover:via-sky-400 hover:to-cyan-300 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                Start a Project
              </button>
              <button className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-center">
                View Services
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400">3+</p>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400">150+</p>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Projects Completed</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400">50+</p>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Happy Clients</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Our team working together" 
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Comprehensive Solutions Grid */}
      <div className="bg-slate-50 dark:bg-slate-900 py-24 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Comprehensive Solutions for Your Business</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">From custom management systems to ongoing support, we provide end-to-end software solutions tailored to your unique business needs.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Management Systems",
                desc: "We design and build tailored management systems based on how your business actually works — not generic software.",
                points: ["Business process analysis", "Pain point identification"],
                icon: Database
              },
              {
                title: "Web & Mobile Application Development",
                desc: "Production-ready applications focused on data, workflows, and measurable business outcomes.",
                points: ["Secure data management", "Action-based workflows"],
                icon: Smartphone
              },
              {
                title: "Business Process Digitalization",
                desc: "We eliminate inefficient manual workflows and replace them with fast, reliable digital systems.",
                points: ["Replace paper files", "Replace Excel-based operations"],
                icon: Lightbulb
              },
              {
                title: "UI/UX Design for Management Systems",
                desc: "Clean, simple, and functional interfaces designed for everyday business users.",
                points: ["Simple and intuitive layouts", "Fast learning curve"],
                icon: LayoutTemplate
              },
              {
                title: "System Upgrade & Optimization",
                desc: "We modernize and improve existing systems to match current business needs.",
                points: ["UI redesign", "Performance optimization"],
                icon: Settings
              },
              {
                title: "Support & Long-Term Partnership",
                desc: "We provide continuous support so your system evolves as your business grows.",
                points: ["System maintenance", "Feature updates"],
                icon: Repeat
              }
            ].map((service, i) => (
              <div key={i} className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 min-h-[80px]">{service.desc}</p>
                <ul className="space-y-3">
                  {service.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm font-medium text-slate-800 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Deep Dives */}
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">How We Bring Your Vision to Life</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Each service is delivered with meticulous attention to detail and a focus on measurable business outcomes.</p>
        </div>

        <div className="space-y-24">
          {[
            {
              title: "Custom Management Systems",
              desc: "We design and build tailored management systems based on how your business actually works — not generic software.",
              features: ["Business process analysis", "Pain point identification", "End-to-end system automation"],
              benefits: ["Web-based", "Mobile-friendly", "Highly scalable"],
              tech: ["React", "Node.js", "Python", "PostgreSQL", "MongoDB"],
              image: CustomManagement
            },
            {
              title: "Web & Mobile Application Development",
              desc: "Production-ready applications focused on data, workflows, and measurable business outcomes.",
              features: ["Secure data management", "Action-based workflows", "Tracking, reporting & dashboards", "Decision-support systems"],
              benefits: ["Built for real users", "Business-driven logic"],
              tech: ["React Native", "Flutter", "Vue.js", "AWS", "Firebase"],
              image: WebMobileApp
            },
            {
              title: "Business Process Digitalization",
              desc: "We eliminate inefficient manual workflows and replace them with fast, reliable digital systems.",
              features: ["Replace paper files", "Replace Excel-based operations", "Remove repetitive manual work"],
              benefits: ["Faster operations", "Fewer errors", "Higher productivity"],
              tech: ["Workflow Automation", "API Integration", "Cloud Services"],
              image: BusinessProcess
            },
            {
              title: "UI/UX Design for Management Systems",
              desc: "Clean, simple, and functional interfaces designed for everyday business users.",
              features: ["Simple and intuitive layouts", "Fast learning curve", "Optimized for all devices"],
              benefits: ["Reduces confusion", "Improves adoption", "A powerful system must be usable"],
              tech: ["Figma", "Adobe XD", "User Testing", "Prototyping"],
              image: UXDesign
            },
            {
              title: "System Upgrade & Optimization",
              desc: "We modernize and improve existing systems to match current business needs.",
              features: ["UI redesign", "Performance optimization", "Feature enhancement"],
              benefits: ["Future-ready systems", "Better performance"],
              tech: ["Code Refactoring", "Database Optimization", "Security Audit"],
              image: SystemUpgrade
            },
            {
              title: "Support & Long-Term Partnership",
              desc: "We provide continuous support so your system evolves as your business grows.",
              features: ["System maintenance", "Feature updates", "Performance improvements", "Ongoing technical support"],
              benefits: ["Reliable partnership", "Long-term growth"],
              tech: ["24/7 Monitoring", "Regular Updates", "Priority Support"],
              image: SupportPartnership
            }
          ].map((item, i) => (
            <div key={i} className={`flex flex-col lg:flex-row gap-12 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1 space-y-6">
                <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 text-white font-bold px-4 py-1.5 rounded-full text-sm">Featured Service</span>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400">{item.desc}</p>
                
                <div className="grid sm:grid-cols-2 gap-8 pt-4">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {item.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                          <CheckCircle className="w-4 h-4 text-blue-500" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-3">Benefits</h4>
                    <ul className="space-y-2">
                      {item.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                   <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm uppercase tracking-wider">Technologies We Use</h4>
                   <div className="flex flex-wrap gap-2">
                     {item.tech.map((t, idx) => (
                       <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md text-sm font-medium">
                         {t}
                       </span>
                     ))}
                   </div>
                </div>
              </div>
              <div className="flex-1 w-full relative">
                <div className="aspect-[4/3] bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <LayoutTemplate className="w-32 h-32 text-blue-200 dark:text-blue-900/50" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Process Section */}
      <div className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-semibold uppercase tracking-wider">Our Process</h3>
            <h2 className="text-3xl md:text-4xl font-bold">How We Bring Ideas to Life</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[
              { num: "01", title: "Understand Your Vision", desc: "We carefully listen to your goals and requirements" },
              { num: "02", title: "Strategic Planning", desc: "We design a clear plan to build the right solution for you" },
              { num: "03", title: "Secure Development", desc: "We build your product using modern technologies and secure practices" },
              { num: "04", title: "Collaborative Review", desc: "We work closely with you, refining the product based on feedback" },
              { num: "05", title: "Quality and Security Testing", desc: "We rigorously test the system to ensure reliabilit, performance, and security" },
              { num: "06", title: "Launch and Continous Support", desc: "We deploy your solution and support it to ensure long-term-success" }
            ].map((step, i) => (
               <div key={i} className="relative">
                 <div className="text-5xl font-extrabold text-slate-800 mb-4 opacity-50">{step.num}</div>
                 <h4 className="text-xl font-bold mb-2 flex items-center gap-3">
                   {step.title}
                 </h4>
                 <p className="text-slate-400 text-sm">{step.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
          <div className="flex-1 text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Ready to Transform Your Business?</h2>
            <p className="text-white/90 text-lg">Let's discuss how we can build custom software solutions that streamline your operations and drive growth.</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-300 flex items-center justify-center"><Mail className="w-5 h-5" /></div>
                <div className="text-sm">
                  <p className="text-white/80">Email Us</p>
                  <p className="font-bold">yanoltech@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-300 flex items-center justify-center"><Calendar className="w-5 h-5" /></div>
                <div className="text-sm">
                  <p className="text-white/80">Hours</p>
                  <p className="font-bold">Mon-Sat 9am-6pm</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-auto">
              <button className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg w-full">Start Your Project</button>
             <button className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors w-full">Schedule a Meeting</button>
          </div>
        </div>
      </div>

    </section>
  );
}
