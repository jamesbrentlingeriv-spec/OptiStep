import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { 
  BarChart3, 
  BookOpen, 
  ChevronRight, 
  Eye, 
  LogOut, 
  Settings, 
  User as UserIcon,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => signOut(auth);

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/' },
    { icon: BookOpen, label: 'Course Library', path: '/library' },
  ];

  const NavContent = () => (
    <>
      <div className="p-8">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => {
            navigate('/');
            setIsMobileMenuOpen(false);
          }}
        >
          <img 
            src="/android-chrome-512x512.png" 
            alt="OptiStep Logo" 
            className="w-10 h-10 rounded-xl shadow-lg border border-line"
            referrerPolicy="no-referrer"
          />
          <span className="font-bold text-lg tracking-tight text-brand">OptiStep Academy</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <div className="mb-6 px-4">
          <label className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.1em]">Fundamentals</label>
        </div>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group border border-transparent",
                isActive 
                  ? "bg-surface-hover border-line shadow-sm" 
                  : "text-text-muted hover:bg-surface-hover hover:text-text-primary"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-md flex items-center justify-center transition-colors",
                isActive ? "bg-brand text-white" : "bg-line text-text-secondary group-hover:text-text-primary"
              )}>
                <Icon size={16} />
              </div>
              <span className="font-medium text-[13px]">{item.label}</span>
              {isActive && (
                <motion.div layoutId="active-dot" className="ml-auto w-1 h-1 bg-brand rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-surface-hover border border-line rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center font-bold text-xs text-white">
              {profile?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-text-primary truncate">{profile?.username || 'User'}</p>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider font-bold">Trainee</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-red-500/10 hover:text-red-400 transition-all text-xs font-semibold"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-surface-base flex font-sans text-text-primary overflow-x-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[280px] bg-surface-panel border-r border-line flex-col fixed inset-y-0 shadow-xl z-20">
        <NavContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-surface-panel border-r border-line flex flex-col z-[101] lg:hidden shadow-2xl"
            >
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={cn(
        "flex-1 min-h-screen bg-[radial-gradient(circle_at_top_right,_#1a1a1e,_#09090b)] transition-all duration-300",
        "lg:ml-[280px]"
      )}>
        <header className="px-6 lg:px-10 py-4 lg:py-6 border-b border-surface-hover flex justify-between items-center sticky top-0 bg-surface-base/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors hover:bg-surface-hover rounded-lg"
            >
              <Menu size={20} />
            </button>
            <div className="text-xs text-text-secondary">
              <span className="hidden sm:inline">Dashboard / </span>
              <span className="text-text-primary font-semibold truncate capitalize">
                {location.pathname === '/' ? 'Overview' : location.pathname.split('/').pop()?.replace('-', ' ')}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-text-muted">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="hidden sm:inline">System Online</span>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
