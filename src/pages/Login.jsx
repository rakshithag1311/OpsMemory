import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Shield, Zap, Database, Eye, EyeOff, ArrowRight, Radio } from 'lucide-react';
import VisualEffects from '../components/ui/VisualEffects';

// Floating particle component
function Particle({ style }) {
  return (
    <div
      className="absolute rounded-full bg-[#84E071] opacity-20 animate-float"
      style={style}
    />
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If already logged in, redirect to dashboard
    if (localStorage.getItem('ops_auth')) {
      navigate('/app', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    // Simulate auth delay
    await new Promise((r) => setTimeout(r, 1200));
    localStorage.setItem('ops_auth', JSON.stringify({ email, name: email.split('@')[0], provider: 'email' }));
    setLoading(false);
    navigate('/app', { replace: true });
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');
    // Simulate Google OAuth delay
    await new Promise((r) => setTimeout(r, 1500));
    localStorage.setItem('ops_auth', JSON.stringify({ email: 'user@gmail.com', name: 'SRE Engineer', provider: 'google' }));
    setGoogleLoading(false);
    navigate('/app', { replace: true });
  };

  const particles = [
    { width: '6px', height: '6px', top: '15%', left: '10%', animationDelay: '0s',   animationDuration: '3s'   },
    { width: '4px', height: '4px', top: '25%', left: '85%', animationDelay: '0.5s', animationDuration: '4s'   },
    { width: '8px', height: '8px', top: '60%', left: '5%',  animationDelay: '1s',   animationDuration: '3.5s' },
    { width: '5px', height: '5px', top: '75%', left: '90%', animationDelay: '1.5s', animationDuration: '2.8s' },
    { width: '3px', height: '3px', top: '40%', left: '92%', animationDelay: '0.8s', animationDuration: '4.2s' },
    { width: '7px', height: '7px', top: '85%', left: '20%', animationDelay: '0.3s', animationDuration: '3.8s' },
    { width: '4px', height: '4px', top: '10%', left: '60%', animationDelay: '1.2s', animationDuration: '3.2s' },
    { width: '6px', height: '6px', top: '50%', left: '75%', animationDelay: '0.7s', animationDuration: '4.5s' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0C0E] login-grid-bg flex items-center justify-center relative overflow-hidden">
      <VisualEffects />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

      {/* Radial green glow behind card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[#84E071]/5 blur-3xl" />
      </div>

      {/* Top-left brand mark */}
      <div className={`absolute top-6 left-6 flex items-center gap-2.5 ${mounted ? 'animate-fade-in-down' : 'opacity-0'}`}>
        <div className="w-8 h-8 rounded-full bg-[#17191C] border border-[#272A2F] flex items-center justify-center animate-glow-green">
          <Radio className="w-4 h-4 text-[#84E071]" />
        </div>
        <span className="text-sm font-semibold text-[#EDEDED] font-mono tracking-tight">OPSMEMORY</span>
      </div>

      {/* Feature badges top-right */}
      <div className={`absolute top-6 right-6 hidden md:flex items-center gap-2 ${mounted ? 'animate-fade-in-down delay-200' : 'opacity-0'}`}>
        {[
          { icon: Shield, label: 'SOC2 Ready' },
          { icon: Zap,    label: 'Real-time' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#17191C] border border-[#272A2F] text-[10px] font-mono text-[#8E95A0] hover-glow cursor-default">
            <Icon className="w-3 h-3 text-[#84E071]" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Main card */}
      <div className={`w-full max-w-md mx-4 ${mounted ? 'animate-scale-in' : 'opacity-0'}`}>
        <div className="bg-[#111214] border border-[#272A2F] rounded-3xl p-8 shadow-2xl shadow-black/60 hover-glow transition-all duration-300">

          {/* Logo + Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#84E071]/12 border border-[#84E071]/30 mb-4 animate-glow-green">
              <Brain className="w-8 h-8 text-[#84E071]" />
            </div>
            <h1 className="text-2xl font-bold text-[#EDEDED] tracking-tight font-sans">
              Welcome back
            </h1>
            <p className="text-sm text-[#8E95A0] mt-1.5">
              Sign in to your OpsMemory workspace
            </p>
          </div>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="google-btn w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-sm font-medium text-[#EDEDED] mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <svg className="w-4 h-4 animate-spin text-[#84E071]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            <span>{googleLoading ? 'Signing in...' : 'Continue with Google'}</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#272A2F]" />
            <span className="text-[11px] font-mono text-[#5A606B] uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-[#272A2F]" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#8E95A0] uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-[#0B0C0E] border border-[#272A2F] rounded-xl px-4 py-2.5 text-sm text-[#EDEDED] placeholder-[#3B3F47] focus:outline-none focus:border-[#84E071]/60 focus:shadow-[0_0_0_3px_rgba(132,224,113,0.1)] transition-all font-sans"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#8E95A0] uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0B0C0E] border border-[#272A2F] rounded-xl px-4 py-2.5 pr-11 text-sm text-[#EDEDED] placeholder-[#3B3F47] focus:outline-none focus:border-[#84E071]/60 focus:shadow-[0_0_0_3px_rgba(132,224,113,0.1)] transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 text-[#5A606B] hover:text-[#84E071] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 animate-fade-in">
                {error}
              </div>
            )}

            {/* Forgot password */}
            <div className="flex justify-end">
              <button type="button" className="text-xs text-[#8E95A0] hover:text-[#84E071] transition-colors font-mono">
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="primary-btn-glow w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#84E071] text-[#090A0C] text-sm font-bold tracking-tight disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-xs text-[#5A606B] mt-6">
            Don't have an account?{' '}
            <button className="text-[#84E071] hover:underline font-medium transition-colors">
              Request access
            </button>
          </p>
        </div>

        {/* Bottom feature strip */}
        <div className={`flex items-center justify-center gap-6 mt-6 ${mounted ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          {[
            { icon: Brain,    label: 'Hindsight AI'   },
            { icon: Database, label: 'Memory Bank'     },
            { icon: Shield,   label: 'Secure & Encrypted' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-[10px] font-mono text-[#5A606B] hover:text-[#84E071] transition-colors cursor-default">
              <Icon className="w-3 h-3" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
