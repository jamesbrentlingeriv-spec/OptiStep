import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Lock, User as UserIcon, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Simple trick to use username as email for Firebase Auth
  const getEmail = (uname: string) => `${uname.toLowerCase().replace(/\s+/g, '.')}@optistep.training`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, getEmail(username), password);
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, getEmail(username), password);
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          username,
          completedModules: [],
          createdAt: new Date().toISOString()
        });
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message === 'Firebase: Error (auth/invalid-credential).' ? 'Invalid username or password.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-base px-4 font-sans text-text-primary">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-surface-panel rounded-[24px] shadow-2xl border border-line overflow-hidden">
          <div className="p-10">
            <div className="flex justify-center mb-10">
              <img 
                src="/android-chrome-512x512.png" 
                alt="OptiStep Academy Logo" 
                className="w-20 h-20 rounded-3xl shadow-xl shadow-brand/20 border-2 border-brand/20"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <h1 className="text-3xl font-bold text-center text-text-primary mb-3 tracking-tight">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-text-secondary text-center mb-10 text-sm font-medium">
              {isLogin ? 'Enter your credentials to access the training clinic' : 'Start your journey with OptiStep Academy'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-[0.1em]">Username</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-hover border border-line rounded-xl focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all text-text-primary placeholder:text-text-secondary/50"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-[0.1em]">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-hover border border-line rounded-xl focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all text-text-primary placeholder:text-text-secondary/50"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20 text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-brand text-white rounded-xl font-bold text-sm tracking-tight hover:bg-brand/90 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 shadow-lg shadow-brand/20 active:scale-[0.98]"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Access Academy' : 'Join Program')}
              </button>
            </form>

            <div className="mt-10 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs font-bold text-text-muted hover:text-brand transition-colors uppercase tracking-widest"
              >
                {isLogin ? "Need an account? Sign up" : "Already registered? Sign in"}
              </button>
            </div>
          </div>
        </div>
        
        <p className="mt-10 text-center text-[10px] text-text-secondary uppercase tracking-[0.2em] font-bold">
          OptiStep Training Systems v2.4
        </p>
      </motion.div>
    </div>
  );
}
