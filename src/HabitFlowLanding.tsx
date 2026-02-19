import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import SplashCursor from './components/SplashCursor';
import Silk from './components/Silk';

const HabitFlowLanding = () => {
  const problemRef = useRef<HTMLElement>(null);

  const scrollToProblem = () => {
    problemRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <SplashCursor />
    <div className="dark bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden min-h-screen">
      {/* Navigation */}
      
      <nav className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center justify-between px-6 py-4 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <div className="text-primary flex size-8 items-center justify-center">
              <span className="material-symbols-outlined text-3xl">filter_vintage</span>
            </div>
            <h2 className="text-white text-xl font-bold tracking-tight">HabitFlow</h2>
          </div>
          <a href="https://expo.dev/artifacts/eas/j9ubvr7yz6BpBq1HAQVxrP.apk" download className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold border border-primary/20 hover:bg-primary/20 transition-colors">
            Get App
          </a>
        </div>
      </nav>
      
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
          <h1 className="text-white text-5xl font-black leading-[1.1] tracking-tight mb-6">
            Master your day <br /><span className="text-primary">without distractions.</span>
          </h1>
          <p className="text-slate-400 text-lg font-normal leading-relaxed mb-10 px-4">
            The minimalist habit tracker for those who value consistency over complexity. Focus on growth without the noise.
          </p>
          <div className="flex flex-col gap-4 items-center">
            <button onClick={scrollToProblem} className="text-[#2ed573] uppercase tracking-[0.5rem] font-bold text-[1.5rem] px-[3rem] py-[1rem] cursor-pointer border-[1px_0_1px_0] border-transparent relative overflow-hidden transition-all duration-200 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(46,213,116,0.36)_0%,rgba(0,0,0,0)_95%)] before:bg-cover before:bg-center before:z-0 after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(rgba(46,213,116,0.073)_1px,transparent_1px),linear-gradient(to_right,rgba(46,213,116,0.073)_1px,transparent_1px)] after:bg-[length:15px_15px,15px_15px] after:bg-center after:z-0 hover:before:bg-[length:cover] hover:after:bg-[length:10px_10px,10px_10px] active:filter-[hue-rotate(250deg)] z-10 filter-[hue-rotate(0deg)]">
              <span className="relative z-10">Start Your Journey</span>
            </button>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">No ads. No clutter. Just flow.</p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="px-6 py-12" ref={problemRef}>
          <div className="bg-card-dark rounded-2xl p-8 border border-white/5 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 text-primary/5">
              <span className="material-symbols-outlined text-[120px]">block</span>
            </div>
            <h2 className="text-white text-2xl font-bold mb-4">The Problem with Noise</h2>
            <p className="text-slate-400 leading-relaxed">
              Most habit trackers treat your life like a video game with loud notifications and complex streaks. HabitFlow is built for the quiet achiever. We remove the distractions so you can focus on the work.
            </p>
          </div>
        </section>

        {/* Core Features */}
        <section className="px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-white/10"></div>
            <h3 className="text-slate-300 font-bold uppercase tracking-widest text-xs">Core Features</h3>
            <div className="h-px flex-1 bg-white/10"></div>
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
              <div key={idx} className="bg-card-dark p-6 rounded-xl border border-white/5">
                <span className="material-symbols-outlined text-primary mb-3">{feature.icon}</span>
                <h4 className="text-white font-bold text-sm mb-1">{feature.title}</h4>
                <p className="text-slate-500 text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Routine Section */}
        <section className="px-6 py-12">
          <h2 className="text-white text-3xl font-bold mb-10 text-center">Master Your Routine</h2>
          <div className="relative space-y-12">
            <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
            
            {[
              { num: '1', title: 'Define Your Goals', desc: 'Choose habits that align with your long-term vision. Simple, actionable, and specific.' },
              { num: '2', title: 'Log Daily Progress', desc: 'One tap to mark completion. No forms to fill, no data to crunch. Just consistency.' },
              { num: '3', title: 'Visualize Growth', desc: 'Watch your streaks grow and your discipline harden through minimalist heatmaps.' },
            ].map((step, idx) => (
                <div key={idx} className="relative flex gap-6 items-start">
                <div className="z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-background-dark border-2 border-primary text-primary font-bold">{step.num}</div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">{step.title}</h4>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Slider Section */}
        <section className="py-12 px-6">
          <h2 className="text-white text-center text-sm font-bold uppercase tracking-[0.2em] mb-8 text-slate-500">The Experience</h2>
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x no-scrollbar">
            {/* Phone Mockups */}
            <div className="min-w-[260px] snap-center rounded-3xl bg-card-dark border border-white/10 aspect-[9/16] overflow-hidden p-3">
              <div className="w-full h-full rounded-2xl bg-zinc-900 flex flex-col items-center justify-center p-6 text-center border border-white/5">
                <span className="material-symbols-outlined text-primary text-5xl mb-4">dashboard</span>
                <div className="space-y-3 w-full">
                  <div className="h-4 bg-white/5 rounded-full w-3/4 mx-auto"></div>
                  <div className="h-4 bg-white/5 rounded-full w-full"></div>
                  <div className="h-4 bg-primary/20 rounded-full w-1/2 mx-auto"></div>
                </div>
              </div>
            </div>
            <div className="min-w-[260px] snap-center rounded-3xl bg-card-dark border border-white/10 aspect-[9/16] overflow-hidden p-3">
              <div className="w-full h-full rounded-2xl bg-zinc-900 flex flex-col items-center justify-center p-6 text-center border border-white/5">
                <span className="material-symbols-outlined text-primary text-5xl mb-4">calendar_month</span>
                <div className="grid grid-cols-4 gap-2 w-full">
                  <div className="aspect-square bg-primary rounded-md"></div>
                  <div className="aspect-square bg-primary/40 rounded-md"></div>
                  <div className="aspect-square bg-primary rounded-md"></div>
                  <div className="aspect-square bg-primary/10 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="px-6 py-12">
          <h3 className="text-white text-2xl font-bold mb-6">Future Roadmap</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <span className="text-slate-300 font-medium">Community Challenges</span>
              <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-1 rounded uppercase tracking-tighter">In Progress</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <span className="text-slate-300 font-medium">Custom Home Widgets</span>
              <span className="text-[10px] font-bold bg-white/10 text-slate-400 px-2 py-1 rounded uppercase tracking-tighter">Planned</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 opacity-60">
              <span className="text-slate-300 font-medium">Desktop Sync</span>
              <span className="text-[10px] font-bold bg-white/10 text-slate-400 px-2 py-1 rounded uppercase tracking-tighter">Q4 2024</span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-12">
          <h3 className="text-white text-2xl font-bold mb-6 text-center">FAQ</h3>
          <div className="space-y-6">
            <div>
              <h5 className="text-primary font-bold text-sm mb-2">Is HabitFlow free?</h5>
              <p className="text-slate-400 text-sm leading-relaxed">Yes, the core tracking features are free forever. No account required to start.</p>
            </div>
            <div>
              <h5 className="text-primary font-bold text-sm mb-2">Can I export my data?</h5>
              <p className="text-slate-400 text-sm leading-relaxed">Absolutely. Your data is yours. Export it anytime in CSV or JSON formats.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16">
          <div className="bg-primary rounded-2xl p-10 text-center relative overflow-hidden">
            <div className="absolute -left-10 -bottom-10 opacity-20 rotate-12">
              <span className="material-symbols-outlined text-[150px] text-background-dark">trending_up</span>
            </div>
            <h2 className="text-background-dark text-3xl font-black mb-4 relative z-10">Ready to Flow?</h2>
            <p className="text-background-dark/70 font-medium mb-8 relative z-10 leading-snug">
              Join 10,000+ others who simplified their growth.
            </p>
            <a href="https://expo.dev/artifacts/eas/j9ubvr7yz6BpBq1HAQVxrP.apk" download className="w-full bg-background-dark text-white py-4 rounded-xl font-bold text-lg mb-4 relative z-10 block">
              Get app
            </a>
            <p className="text-background-dark/50 text-xs font-bold relative z-10 uppercase tracking-widest">Version 2.0.4 Available</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-white/5 text-center">
          <div className="flex justify-center gap-2 mb-6 text-primary/40">
            <span className="material-symbols-outlined">filter_vintage</span>
          </div>
          <p className="text-slate-500 text-xs mb-2">© 2024 HabitFlow Inc. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-slate-400 text-xs font-medium">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Support</a>
          </div>
        </footer>
      </main>
    </div>
              </>
  );
};

export default HabitFlowLanding;
