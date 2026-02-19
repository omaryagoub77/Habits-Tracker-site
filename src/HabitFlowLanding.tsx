import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SplashCursor from './components/SplashCursor';
import Silk from './components/Silk';
import screen1 from '@/assets/screen 1.png';
import screen2 from '@/assets/screen 2.png';
import screen3 from '@/assets/screen 3.png';

// Custom hook for reduced motion accessibility
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
};

const HabitFlowLanding = () => {
  const problemRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const scrollToProblem = () => {
    problemRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <SplashCursor />
    <div className="dark bg-background-dark text-foreground antialiased overflow-x-hidden min-h-screen">
      {/* Navigation */}
      
      <motion.nav 
        className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-md border-b border-primary/10"
        initial={prefersReducedMotion ? { y: 0 } : { y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between px-6 py-4 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <div className="text-primary flex size-8 items-center justify-center">
              <span className="material-symbols-outlined text-3xl">filter_vintage</span>
            </div>
            <h2 className="text-white text-xl font-bold tracking-tight">HabitFlow</h2>
          </div>
          <motion.a 
            href="https://expo.dev/artifacts/eas/j9ubvr7yz6BpBq1HAQVxrP.apk" 
            download 
            className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold border border-primary/20 hover:bg-primary/20 transition-colors relative"
            whileHover={prefersReducedMotion ? {} : { 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(19, 236, 128, 0.3)"
            }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          >
            Get App
          </motion.a>
        </div>
      </motion.nav>
      
      {/* Silk Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Silk
          speed={5}
          scale={1}
          color="#4a7c59"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Main Content */}
      <main className="max-w-lg mx-auto">
        {/* Hero Section */}
        <section className="relative pt-16 pb-20 px-6 text-center overflow-hidden">
          {/* Silk-like animated background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                  background: 'linear-gradient(135deg, #13ec80 0%, #0a0a0a 50%, #161b18 100%)',
                }}
              animate={{
                background: [
                    'linear-gradient(135deg, #13ec80 0%, #0a0a0a 50%, #161b18 100%)',
                    'linear-gradient(225deg, #13ec80 0%, #0a0a0a 50%, #161b18 100%)',
                    'linear-gradient(315deg, #13ec80 0%, #0a0a0a 50%, #161b18 100%)',
                  'linear-gradient(135deg, #13ec80 0%, #0a0a0a 50%, #161b18 100%)',
                ],
              }}
              transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
            />
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, #13ec80 0%, transparent 70%)' }}
              animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                  x: [0, 30, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, #13ec80 0%, transparent 70%)' }}
              animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2],
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10"></div>
          <motion.h1 
            className="text-white text-5xl font-black leading-[1.1] tracking-tight mb-6"
            initial={prefersReducedMotion ? fadeInUp.visible : fadeInUp.hidden}
            animate={fadeInUp.visible}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            Master your day <br /><span className="text-primary">without distractions.</span>
          </motion.h1>
          <motion.p 
            className="text-slate-400 text-lg font-normal leading-relaxed mb-10 px-4"
            initial={prefersReducedMotion ? fadeInUp.visible : fadeInUp.hidden}
            animate={fadeInUp.visible}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            The minimalist habit tracker for those who value consistency over complexity. Focus on growth without the noise.
          </motion.p>
          <div className="flex flex-col gap-4 items-center">
            <motion.button 
              onClick={scrollToProblem}
              className="text-[#2ed573] uppercase tracking-[0.5rem] font-bold text-[1.5rem] px-[3rem] py-[1rem] cursor-pointer border-[1px_0_1px_0] border-transparent relative overflow-hidden transition-all duration-200 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(46,213,116,0.36)_0%,rgba(0,0,0,0)_95%)] before:bg-cover before:bg-center before:z-0 after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(rgba(46,213,116,0.073)_1px,transparent_1px),linear-gradient(to_right,rgba(46,213,116,0.073)_1px,transparent_1px)] after:bg-[length:15px_15px,15px_15px] after:bg-center after:z-0 hover:before:bg-[length:cover] hover:after:bg-[length:10px_10px,10px_10px] active:filter-[hue-rotate(250deg)] z-10 filter-[hue-rotate(0deg)]"
              initial={prefersReducedMotion ? fadeInUp.visible : fadeInUp.hidden}
              animate={fadeInUp.visible}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              whileHover={prefersReducedMotion ? {} : { 
                scale: 1.02,
                boxShadow: "0 0 30px rgba(46, 213, 116, 0.4)"
              }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <span className="relative z-10">Start Your Journey</span>
            </motion.button>
            <motion.p 
              className="text-xs text-slate-500 uppercase tracking-widest font-bold"
              initial={prefersReducedMotion ? fadeInUp.visible : fadeInUp.hidden}
              animate={fadeInUp.visible}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            >
              No ads. No clutter. Just flow.
            </motion.p>
          </div>
        </section>

        {/* Problem Section */}
        <motion.section 
          className="px-6 py-12" 
          ref={problemRef}
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="bg-card-dark rounded-2xl p-8 border border-white/5 relative overflow-hidden group"
            whileHover={prefersReducedMotion ? {} : { 
              borderColor: "rgba(19, 236, 128, 0.2)" 
            }}
          >
            <div className="absolute -right-8 -top-8 text-primary/5 overflow-hidden">
              <motion.span 
                className="material-symbols-outlined text-[120px] block"
                whileHover={prefersReducedMotion ? {} : { rotate: 12, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                block
              </motion.span>
            </div>
            <h2 className="text-white text-2xl font-bold mb-4">The Problem with Noise</h2>
            <p className="text-slate-400 leading-relaxed">
              Most habit trackers treat your life like a video game with loud notifications and complex streaks. HabitFlow is built for the quiet achiever. We remove the distractions so you can focus on the work.
            </p>
          </motion.div>
        </motion.section>

        {/* Core Features */}
        <section className="px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <motion.div 
              className="h-px flex-1 bg-white/10"
              initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            />
            <h3 className="text-slate-300 font-bold uppercase tracking-widest text-xs">Core Features</h3>
            <motion.div 
              className="h-px flex-1 bg-white/10"
              initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: 'lock', title: 'Privacy First', desc: 'Your data stays on your device.' },
              { icon: 'auto_awesome', title: 'Minimal UI', desc: 'Designed for pure focus.' },
              { icon: 'trending_up', title: 'Daily Streaks', desc: 'Visualize your momentum.' },
              { icon: 'notifications_off', title: 'No Distractions', desc: 'Focus on habits, not pings.' },
              { icon: 'analytics', title: 'Insights', desc: 'Deep dive into patterns.' },
              { icon: 'dark_mode', title: 'Native Dark', desc: 'Easy on the eyes, always.' },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                className="bg-card-dark p-6 rounded-xl border border-white/5 cursor-pointer"
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={prefersReducedMotion ? {} : { 
                  y: -8,
                  borderColor: "rgba(19, 236, 128, 0.15)",
                  boxShadow: "0 10px 30px rgba(19, 236, 128, 0.1)"
                }}
              >
                <motion.span 
                  className="material-symbols-outlined text-primary mb-3 block"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.15, rotate: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.span>
                <h4 className="text-white font-bold text-sm mb-1">{feature.title}</h4>
                <p className="text-slate-500 text-xs">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Routine Section */}
        <motion.section className="px-6 py-12">
          <motion.h2 
            className="text-white text-3xl font-bold mb-10 text-center"
            initial={prefersReducedMotion ? fadeInUp.visible : fadeInUp.hidden}
            whileInView={fadeInUp.visible}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Master Your Routine
          </motion.h2>
          
          <div className="relative space-y-12">
            {/* Animated timeline line */}
            <motion.div 
              className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"
              initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            />
            
            {[
              { num: '1', title: 'Define Your Goals', desc: 'Choose habits that align with your long-term vision. Simple, actionable, and specific.' },
              { num: '2', title: 'Log Daily Progress', desc: 'One tap to mark completion. No forms to fill, no data to crunch. Just consistency.' },
              { num: '3', title: 'Visualize Growth', desc: 'Watch your streaks grow and your discipline harden through minimalist heatmaps.' },
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                className="relative flex gap-6 items-start"
                initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: idx * 0.15,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div 
                  className="z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-background-dark border-2 border-primary text-primary font-bold"
                  initial={prefersReducedMotion ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: idx * 0.15 + 0.1,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                >
                  {step.num}
                </motion.div>
                
                <motion.div
                  initial={prefersReducedMotion ? fadeIn.visible : fadeIn.hidden}
                  whileInView={fadeIn.visible}
                  transition={{ delay: idx * 0.15 + 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white font-bold text-lg mb-1">{step.title}</h4>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Slider Section */}
        <motion.section className="py-12 px-6">
          <motion.h2 
            className="text-white text-center text-sm font-bold uppercase tracking-[0.2em] mb-8 text-slate-500"
            initial={prefersReducedMotion ? fadeIn.visible : fadeIn.hidden}
            whileInView={fadeIn.visible}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            The Experience
          </motion.h2>
          
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x no-scrollbar">
            {/* Screenshot Cards */}
            {[
              { 
                src: screen1, 
                alt: 'Dashboard Screen',
                title: 'Dashboard View'
              },
              { 
                src: screen2, 
                alt: 'Calendar Screen',
                title: 'Calendar Tracking'
              },
              { 
                src: screen3, 
                alt: 'Analytics Screen',
                title: 'Progress Analytics'
              }
            ].map((screen, idx) => (
              <motion.div 
                key={idx}
                className="min-w-[280px] snap-center rounded-3xl bg-card-dark border border-white/10 overflow-hidden cursor-pointer group relative"
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={prefersReducedMotion ? {} : { 
                  scale: 1.05,
                  boxShadow: "0 20px 50px rgba(19, 236, 128, 0.2)"
                }}
              >
                {/* Image Container */}
                <div className="relative w-full h-[500px] overflow-hidden bg-card-dark">
                  <motion.img
                    src={screen.src}
                    alt={screen.alt}
                    className="w-full h-full object-cover"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Gradient Overlay on Hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                
                {/* Title Bar */}
                <div className="px-4 py-3 border-t border-white/5 bg-background-dark/50">
                  <motion.h3 
                    className="text-primary font-semibold text-sm text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.15 + 0.2, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {screen.title}
                  </motion.h3>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
              ← Swipe to explore →
            </p>
          </motion.div>
        </motion.section>

        {/* Roadmap Section */}
        <motion.section className="px-6 py-12">
          <motion.h3 
            className="text-white text-2xl font-bold mb-6"
            initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Future Roadmap
          </motion.h3>
          
          <div className="space-y-4">
            {[
              { label: 'Community Challenges', badge: 'In Progress', status: true },
              { label: 'Custom Home Widgets', badge: 'Planned', status: false },
              { label: 'Desktop Sync', badge: 'Q4 2024', status: false, opacity: true }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className={`flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 cursor-pointer transition-colors ${item.opacity ? 'opacity-60' : ''}`}
                initial={prefersReducedMotion ? { opacity: item.opacity ? 0.6 : 1, x: 0 } : { opacity: 0, x: -40 }}
                whileInView={{ opacity: item.opacity ? 0.6 : 1, x: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={prefersReducedMotion ? {} : { 
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  x: 8
                }}
              >
                <span className="text-slate-300 font-medium">{item.label}</span>
                
                <motion.span 
                  className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter ${
                    item.status 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-white/10 text-slate-400'
                  }`}
                  animate={item.status && !prefersReducedMotion ? { scale: [1, 1.05, 1] } : {}}
                  transition={item.status ? { duration: 2, repeat: Infinity } : {}}
                >
                  {item.badge}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section className="px-6 py-12">
          <motion.h3 
            className="text-white text-2xl font-bold mb-6 text-center"
            initial={prefersReducedMotion ? fadeIn.visible : fadeIn.hidden}
            whileInView={fadeIn.visible}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            FAQ
          </motion.h3>
          
          <div className="space-y-6">
            {[
              { q: 'Is HabitFlow free?', a: 'Yes, the core tracking features are free forever. No account required to start.' },
              { q: 'Can I export my data?', a: 'Absolutely. Your data is yours. Export it anytime in CSV or JSON formats.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.h5 
                  className="text-primary font-bold text-sm mb-2 cursor-pointer"
                  whileHover={prefersReducedMotion ? {} : { color: "rgba(19, 236, 128, 0.8)", x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.q}
                </motion.h5>
                <motion.p 
                  className="text-slate-400 text-sm leading-relaxed"
                  initial={prefersReducedMotion ? fadeIn.visible : fadeIn.hidden}
                  whileInView={fadeIn.visible}
                  transition={{ delay: idx * 0.1 + 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {item.a}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section className="px-6 py-16">
          <motion.div 
            className="bg-primary rounded-2xl p-10 text-center relative overflow-hidden"
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="absolute -left-10 -bottom-10 opacity-20 rotate-12"
              animate={prefersReducedMotion ? {} : { rotate: [12, 16, 12] }}
              transition={prefersReducedMotion ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="material-symbols-outlined text-[150px] text-background-dark">trending_up</span>
            </motion.div>
            
            <motion.h2 
              className="text-background-dark text-3xl font-black mb-4 relative z-10"
              initial={prefersReducedMotion ? fadeInUp.visible : fadeInUp.hidden}
              whileInView={fadeInUp.visible}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Ready to Flow?
            </motion.h2>
            
            <motion.p 
              className="text-background-dark/70 font-medium mb-8 relative z-10 leading-snug"
              initial={prefersReducedMotion ? fadeInUp.visible : fadeInUp.hidden}
              whileInView={fadeInUp.visible}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join 10,000+ others who simplified their growth.
            </motion.p>
            
            <motion.a 
              href="https://expo.dev/artifacts/eas/j9ubvr7yz6BpBq1HAQVxrP.apk"
              download
              className="w-full bg-background-dark text-white py-4 rounded-xl font-bold text-lg mb-4 relative z-10 block"
              initial={prefersReducedMotion ? fadeInUp.visible : fadeInUp.hidden}
              whileInView={fadeInUp.visible}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={prefersReducedMotion ? {} : { 
                scale: 1.03,
                boxShadow: "0 0 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(19, 236, 128, 0.1)"
              }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
            >
              Get app
            </motion.a>
            
            <motion.p 
              className="text-background-dark/50 text-xs font-bold relative z-10 uppercase tracking-widest"
              initial={prefersReducedMotion ? fadeIn.visible : fadeIn.hidden}
              whileInView={fadeIn.visible}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Version 2.0.4 Available
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <motion.footer className="px-6 py-12 border-t border-white/5 text-center">
          <motion.div 
            className="flex justify-center gap-2 mb-6 text-primary/40"
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="material-symbols-outlined">filter_vintage</span>
          </motion.div>
          
          <motion.p 
            className="text-slate-500 text-xs mb-2"
            initial={prefersReducedMotion ? fadeIn.visible : fadeIn.hidden}
            whileInView={fadeIn.visible}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            © 2024 HabitFlow Inc. All rights reserved.
          </motion.p>
          
          <div className="flex justify-center gap-6 text-slate-400 text-xs font-medium">
            {[
              { label: 'Privacy', href: '#' },
              { label: 'Terms', href: '#' },
              { label: 'Support', href: '#' }
            ].map((link, idx) => (
              <motion.a 
                key={idx}
                href={link.href}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: idx * 0.08
                }}
                viewport={{ once: true }}
                whileHover={prefersReducedMotion ? {} : { color: "rgba(19, 236, 128, 0.7)", y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.footer>
      </main>
    </div>
              </>
  );
};

export default HabitFlowLanding;
