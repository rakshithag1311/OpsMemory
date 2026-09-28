import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileSearch, Cpu, WifiOff, Shield, ArrowRight,
  ScanLine, Brain, ChevronDown, Sparkles
} from 'lucide-react';
import VisualEffects from '../components/ui/VisualEffects';

/* ── tiny reusable fade-wrapper ── */
function Reveal({ children, delay = 0, from = 'up' }) {
  const dir = { up: 'animate-fade-in-up', down: 'animate-fade-in-down', left: 'animate-fade-in-left', right: 'animate-fade-in-right' };
  return (
    <div className={`${dir[from] || 'animate-fade-in-up'}`} style={{ animationDelay: `${delay}s`, animationFillMode: 'both' }}>
      {children}
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If already logged in skip landing
    if (localStorage.getItem('ops_auth')) navigate('/', { replace: true });
  }, [navigate]);

  const features = [
    {
      icon: ScanLine,
      title: 'Document Scanning & OCR',
      desc: 'Snap or upload any government or legal document. Our OCR engine extracts text with high accuracy — even from low-quality scans.',
    },
    {
      icon: Brain,
      title: 'On-Device AI',
      desc: 'All AI processing happens locally on your device. No data ever leaves. No cloud dependency. No privacy risk.',
    },
    {
      icon: FileSearch,
      title: 'Plain-Language Summaries',
      desc: 'Complex legal jargon simplified into clear, actionable language anyone can understand — in seconds.',
    },
    {
      icon: Cpu,
      title: 'Multilingual Support',
      desc: 'Understands documents in multiple Indian regional languages and translates summaries for broader accessibility.',
    },
  ];

  const pills = [
    { icon: WifiOff, label: 'Offline' },
    { icon: Shield,  label: 'Privacy-Focused' },
    { icon: Sparkles, label: 'AI-Powered' },
  ];

  const steps = [
    { num: '01', title: 'Scan or Upload', desc: 'Take a photo or upload a PDF of your document.' },
    { num: '02', title: 'AI Reads It',    desc: 'On-device OCR + AI processes the document instantly.' },
    { num: '03', title: 'Understand It',  desc: 'Get a plain-language summary with key points highlighted.' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#EDEDED] overflow-x-hidden relative">
      <VisualEffects />

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-[#272A2F]/60 bg-[#0B0C0E]/80 backdrop-blur-md ${mounted ? 'animate-fade-in-down' : 'opacity-0'}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#84E071]/12 border border-[#84E071]/30 flex items-center justify-center animate-glow-green">
            <FileSearch className="w-4 h-4 text-[#84E071]" />
          </div>
          <span className="text-sm font-bold text-[#EDEDED] font-mono tracking-tight">DocSaathi</span>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="text-xs font-semibold text-[#8E95A0] hover:text-[#84E071] transition-colors duration-200 font-mono"
        >
          Sign In
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16" style={{ zIndex: 2 }}>
        {/* badge */}
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#84E071]/10 border border-[#84E071]/25 text-[#84E071] text-[11px] font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84E071] animate-pulse" />
            On-Device AI · No Internet Required
          </div>
        </Reveal>

        {/* heading */}
        <Reveal delay={0.2}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#EDEDED] leading-tight max-w-3xl mx-auto">
            Understand Complex{' '}
            <span className="text-[#84E071] relative">
              Documents
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#84E071]/60 to-transparent" />
            </span>
            .<br />Offline. Privately.
          </h1>
        </Reveal>

        {/* tagline */}
        <Reveal delay={0.35}>
          <p className="mt-5 text-base sm:text-lg text-[#8E95A0] max-w-xl mx-auto leading-relaxed">
            DocSaathi uses document scanning, OCR, and on-device AI to help you instantly understand government and legal documents — in plain language, with zero data leaving your device.
          </p>
        </Reveal>

        {/* pills */}
        <Reveal delay={0.45}>
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            {pills.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#17191C] border border-[#272A2F] text-xs font-mono text-[#EDEDED] hover:border-[#84E071]/40 hover:text-[#84E071] transition-all duration-200 cursor-default" style={{ transform: 'scale(1)', transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s ease, color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Icon className="w-3.5 h-3.5 text-[#84E071]" />
                {label}
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.55}>
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
            <button
              onClick={() => navigate('/login')}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#84E071] text-[#090A0C] text-sm font-bold tracking-tight transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(132,224,113,0.45)] active:scale-95"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-1.5 px-5 py-3.5 rounded-full border border-[#272A2F] text-[#8E95A0] text-sm font-medium hover:border-[#84E071]/40 hover:text-[#84E071] transition-all duration-200"
            >
              See How It Works
            </button>
          </div>
        </Reveal>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#5A606B] animate-bounce">
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="relative py-20 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-4xl mx-auto">
          <Reveal delay={0.1}>
            <div className="text-center mb-12">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#84E071]">How It Works</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#EDEDED] mt-2">Three simple steps</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={0.1 + i * 0.12} from="up">
                <div
                  className="relative p-6 rounded-2xl bg-[#111214] border border-[#272A2F] text-left overflow-hidden group"
                  style={{ transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, border-color 0.2s ease' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.012)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(132,224,113,0.3), 0 0 20px rgba(132,224,113,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(132,224,113,0.35)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  {/* big faded number */}
                  <span className="absolute top-3 right-4 text-6xl font-black text-[#84E071]/5 font-mono select-none">{s.num}</span>
                  <div className="w-8 h-8 rounded-xl bg-[#84E071]/10 border border-[#84E071]/25 flex items-center justify-center mb-4">
                    <span className="text-xs font-mono font-bold text-[#84E071]">{s.num}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#EDEDED] mb-1.5">{s.title}</h3>
                  <p className="text-xs text-[#8E95A0] leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="relative py-20 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-4xl mx-auto">
          <Reveal delay={0.1}>
            <div className="text-center mb-12">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#84E071]">Features</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#EDEDED] mt-2">Built for real people</h2>
              <p className="text-sm text-[#8E95A0] mt-2 max-w-md mx-auto">Designed for citizens who receive complex government and legal documents and need clarity — fast.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.1 + i * 0.1} from={i % 2 === 0 ? 'left' : 'right'}>
                <div
                  className="p-5 rounded-2xl bg-[#111214] border border-[#272A2F] flex gap-4 group"
                  style={{ transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, border-color 0.2s ease' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(132,224,113,0.25)';
                    e.currentTarget.style.borderColor = 'rgba(132,224,113,0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#84E071]/10 border border-[#84E071]/20 flex items-center justify-center shrink-0 group-hover:bg-[#84E071]/15 transition-colors duration-200">
                    <f.icon className="w-4 h-4 text-[#84E071]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#EDEDED] mb-1 group-hover:text-[#84E071] transition-colors duration-200">{f.title}</h3>
                    <p className="text-xs text-[#8E95A0] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative py-20 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-2xl mx-auto">
          <Reveal delay={0.1}>
            <div
              className="relative p-8 sm:p-10 rounded-3xl bg-[#111214] border border-[#272A2F] text-center overflow-hidden"
              style={{ transition: 'border-color 0.3s ease, box-shadow 0.3s ease' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(132,224,113,0.3)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(132,224,113,0.07)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {/* background glow */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '1.5rem',
                background: 'radial-gradient(ellipse at 50% 0%, rgba(132,224,113,0.07) 0%, transparent 65%)',
                pointerEvents: 'none',
              }} />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#84E071]/12 border border-[#84E071]/30 mb-5 animate-glow-green mx-auto">
                  <FileSearch className="w-6 h-6 text-[#84E071]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#EDEDED] mb-3">
                  Start Understanding Your Documents
                </h2>
                <p className="text-sm text-[#8E95A0] mb-7 max-w-md mx-auto leading-relaxed">
                  Join thousands of citizens using DocSaathi to decode government notices, legal contracts, and official letters — privately and offline.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#84E071] text-[#090A0C] text-sm font-bold tracking-tight transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(132,224,113,0.45)] active:scale-95"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative py-8 px-6 border-t border-[#272A2F]/60 text-center" style={{ zIndex: 2 }}>
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto gap-3">
          <div className="flex items-center gap-2">
            <FileSearch className="w-4 h-4 text-[#84E071]" />
            <span className="text-xs font-mono font-semibold text-[#EDEDED]">DocSaathi</span>
          </div>
          <p className="text-xs text-[#5A606B] font-mono">
            Offline · Private · AI-Powered · Built for India
          </p>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#5A606B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84E071] animate-pulse" />
            On-Device Processing Active
          </div>
        </div>
      </footer>
    </div>
  );
}
