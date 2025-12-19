
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) onLogin();
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side: Login Form */}
      <div className="flex flex-1 flex-col justify-center items-center bg-white px-8 py-12 sm:px-12 lg:flex-none lg:w-[45%] xl:w-[40%] border-r border-[#e7ebf3] relative z-10 shadow-xl">
        <div className="w-full max-w-sm flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[28px]">token</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight text-[#0d121b]">Twellium</h1>
              <span className="text-xs font-medium text-[#4c669a] uppercase tracking-wider">Industrial Company</span>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#0d121b] mb-2">Welcome Back</h2>
            <p className="text-[#4c669a] text-base">Sign in to the SCM Portal.</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#0d121b]" htmlFor="email">Corporate ID / Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#4c669a]">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
                <input 
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-[#cfd7e7] bg-background-light text-[#0d121b] placeholder:text-[#9aa2b1] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base" 
                  id="email" 
                  placeholder="Enter your ID or Email" 
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#0d121b]" htmlFor="password">Password</label>
                <a className="text-xs font-semibold text-primary hover:text-primary-hover hover:underline" href="#">Forgot?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#4c669a]">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input 
                  className="w-full h-12 pl-11 pr-12 rounded-lg border border-[#cfd7e7] bg-background-light text-[#0d121b] placeholder:text-[#9aa2b1] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base" 
                  id="password" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#4c669a] hover:text-[#0d121b] transition-colors cursor-pointer" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-[18px]">shield</span>
                <span className="text-sm font-semibold text-[#0d121b]">MFA Verification</span>
              </div>
              <div className="p-4 rounded-lg bg-background-light border border-[#cfd7e7] border-dashed">
                <div className="flex gap-2 justify-between">
                  {[1,2,3,4,5,6].map(i => (
                    <input 
                      key={i}
                      className="w-10 h-12 text-center text-lg font-bold rounded-md border border-[#cfd7e7] bg-white focus:border-primary focus:ring-primary focus:outline-none" 
                      maxLength={1} 
                      placeholder="-" 
                      type="text"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-4">
              <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary h-12 px-4 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-hover transition-colors shadow-md shadow-primary/20">
                <span className="material-symbols-outlined text-[20px]">login</span>
                <span>Secure Login</span>
              </button>
              <button type="button" className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#cfd7e7] bg-white h-11 px-4 text-[#0d121b] text-sm font-medium leading-normal hover:bg-[#f8f9fc] transition-colors">
                <span className="material-symbols-outlined text-[20px]">domain</span>
                <span>Single Sign-On (SSO)</span>
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-2 mt-auto text-center pt-8">
            <p className="text-xs text-[#9aa2b1]">© 2024 Twellium Industrial Company.</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 relative bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/scm/1200/800')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#101622]/90 via-[#101622]/40 to-transparent"></div>
        <div className="relative z-10 w-full h-full flex flex-col justify-end p-16">
          <div className="max-w-lg mb-8">
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Streamlining Industrial Supply Chain Operations</h2>
            <p className="text-lg text-gray-200 leading-relaxed">Access real-time logistics data, inventory management, and secure operational workflows.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
