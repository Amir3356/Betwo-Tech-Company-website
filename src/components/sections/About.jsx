import { CheckCircle, Target, Eye, Shield, Award, Users, Lightbulb, Star, Handshake, ChevronRight, Activity, Globe, Calendar, Briefcase, Zap } from "lucide-react";
import ceoImage from "../../assets/Executive Leadership.jpg";
import exec1Image from "../../assets/Executive Leadership  1.jpeg";
import exec2Image from "../../assets/Executive Leadership  2.jpeg";
import exec3Image from "../../assets/Executive Leadership 4.jpeg";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      {/* 1. Company Overview */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              Company Overview <br />
              Reliable digital solutions <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400">
                built with long-term vision
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              We are a technology-driven company focused on building scalable, secure, and future-proof digital products. Our work is grounded in strong engineering principles and long-term partnerships.
            </p>
            <div className="pt-4 flex items-center gap-4 text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              <Shield className="w-5 h-5 text-blue-500" />
              Trusted by Industry Leaders
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Professional developer visualization" 
              className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">100%</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Isolated View</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Purpose, Mission, Vision */}
      <div className="bg-slate-50 dark:bg-slate-900 py-24 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-semibold uppercase tracking-wider">Our Purpose</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Driving Innovation Through Purpose</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <Target className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-400">To empower businesses through thoughtfully engineered software solutions that solve real problems and scale with confidence.</p>
            </div>
            <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <Eye className="w-12 h-12 text-cyan-500 mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-400">To become a trusted technology partner known for reliability, transparency, and long-term impact across industries.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Values */}
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-semibold uppercase tracking-wider">What Drives Us</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Core Values</h2>
          <p className="text-slate-600 dark:text-slate-400">The principles that guide our actions and define our culture</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Integrity", desc: "We operate with honesty, transparency, and accountability in every interaction.", icon: Shield },
            { title: "Excellence", desc: "We focus on quality, performance, and sustainable engineering practices.", icon: Award },
            { title: "Collaboration", desc: "Strong partnerships and teamwork drive our collective success.", icon: Users },
            { title: "Innovation", desc: "We embrace creative thinking and continuous improvement in all we do.", icon: Lightbulb },
            { title: "Quality", desc: "We deliver exceptional results through attention to detail and craftsmanship.", icon: Star },
            { title: "Customer Focus", desc: "Our clients' success is at the heart of every decision we make.", icon: Handshake },
          ].map((val, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <val.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{val.title}</h4>
                <p className="text-slate-600 dark:text-slate-400">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Leadership */}
      <div className="bg-slate-50 dark:bg-slate-900 py-24 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-semibold uppercase tracking-wider">Experienced Leadership</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Visionary Leaders Driving Innovation</h2>
            <p className="text-slate-600 dark:text-slate-400">Our leadership team brings a strong technical background, business insight, and a commitment to building long-lasting products and partnerships.</p>
          </div>
          
          <div className="space-y-16">
            {/* CEO */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">Chief Executive Officer <span className="text-sm font-normal text-slate-500 bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full ml-4">1 Leader</span></h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-950 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-slate-200">
                    <img src={ceoImage} alt="Debeb Ketema Adugna" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Debeb Ketema Adugna</h4>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-medium mb-4">Founder & CEO</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">Visionary tech leader with 15+ years of experience driving digital transformation across Ethiopian enterprises.</p>
                  <button className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2">View Details <ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* Executives */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">Executive Leadership <span className="text-sm font-normal text-slate-500 bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full ml-4">3 Leaders</span></h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: "Muluken Tilahun Molla", role: "Chief Operating Officer", desc: "Technology innovator specializing in scalable cloud architectures and enterprise software systems.", image: exec1Image },
                  { name: "Ayana Basha Challie", role: "Chief Technology Officer", desc: "Operations excellence expert focused on scaling business processes and ensuring exceptional client delivery.", image: exec2Image },
                  { name: "Fikiru Ababe", role: "Industry Consultant", desc: "Product strategist passionate about creating user-centric solutions that solve real Ethiopian business challenges.", image: exec3Image }
                ].map((leader, i) => (
                  <div key={i} className="bg-white dark:bg-slate-950 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-slate-200">
                      <img src={leader.image || `https://ui-avatars.com/api/?name=${leader.name.replace(/ /g, '+')}&background=random&color=fff&size=200`} alt={leader.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{leader.name}</h4>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-medium text-sm mb-4">{leader.role}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">{leader.desc}</p>
                    <button className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 mt-auto">View Details <ChevronRight className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 5. History */}
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-semibold uppercase tracking-wider">Our History</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">The Journey</h2>
          <p className="text-slate-600 dark:text-slate-400">From foundation to future — our path of growth and innovation</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 -z-10"></div>
          {[
            { year: "2022", title: "The Beginning", desc: "Company founded with a vision for scalable solutions." },
            { year: "2023", title: "First Milestone", desc: "Delivered first enterprise-grade products." },
            { year: "2024", title: "Expansion", desc: "Expanded into multi-industry solutions." },
            { year: "2025", title: "Future Vision", desc: "Focused on long-term partnerships and growth." },
          ].map((timeline, i) => (
            <div key={i} className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4 border-4 border-white dark:border-slate-950">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-bold mb-2">{timeline.year}</h3>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{timeline.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{timeline.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Impact */}
      <div className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-semibold uppercase tracking-wider">Our Impact</h3>
            <h2 className="text-3xl md:text-4xl font-bold">Company Achievements</h2>
            <p className="text-slate-400">Measurable results that demonstrate our commitment to excellence</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center border-b border-slate-800 pb-16">
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 mb-2">123+</p>
              <h4 className="text-xl font-bold mb-2">Clients Served</h4>
              <p className="text-slate-400 text-sm">Enterprise companies trust our solutions</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 mb-2">840+</p>
              <h4 className="text-xl font-bold mb-2">Projects Delivered</h4>
              <p className="text-slate-400 text-sm">Successful implementations worldwide</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 mb-2">10+</p>
              <h4 className="text-xl font-bold mb-2">Countries Reached</h4>
              <p className="text-slate-400 text-sm">Global presence across continents</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 mb-2">3</p>
              <h4 className="text-xl font-bold mb-2">Years Exp.</h4>
              <p className="text-slate-400 text-sm">Building since 2022</p>
            </div>
          </div>
          <div className="pt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-slate-300">
             <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-blue-500" /> Trusted by industry leaders worldwide</div>
          </div>
        </div>
      </div>

      {/* 7. Culture */}
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 font-semibold uppercase tracking-wider mb-4">Our Culture</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">How We Work</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
              We've built an environment where collaboration, innovation, and growth are part of everyday life. We believe in cross-functional collaboration where every voice matters. Our teams work together in an open, supportive environment that encourages innovation and continuous learning. We celebrate wins together and support each other through challenges.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Users className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Collaboration</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm shadow-none">Cross-functional teams working together to solve complex problems</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Lightbulb className="w-6 h-6 text-cyan-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Innovation</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Freedom to experiment and bring new ideas to life</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Zap className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Growth</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Continuous learning and opportunities to advance</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Team culture" 
              className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
            />
          </div>
        </div>
      </div>

      {/* 8. Call to Action */}
      <div className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white space-y-8">
          <h2 className="text-4xl font-bold">Work With Us</h2>
           <p className="text-xl text-white/90">Ready to bring your ideas to life? Let's collaborate on your next project.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg">Start a Conversation</button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">Join Our Team</button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-white/80">
            <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> Quick Response</span>
            <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> Free Consultation</span>
            <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> No Commitment</span>
          </div>
        </div>
      </div>

    </section>
  );
}
