import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { INITIAL_MODULES } from "../constants/modules";
import { motion } from "motion/react";
import {
  Play,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
} from "lucide-react";
import { cn } from "../lib/utils";

export default function Dashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const completedCount = profile?.completedModules.length || 0;
  const progressPercent = Math.round(
    (completedCount / INITIAL_MODULES.length) * 100,
  );

  return (
    <div className="space-y-8 lg:space-y-12">
      <header>
        <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2 tracking-tight">
          System Dashboard
        </h1>
        <p className="text-text-muted text-base lg:text-lg">
          Welcome back, {profile?.username || "trainee"}. Your current progress
          is {progressPercent}%.
        </p>
      </header>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-surface-panel p-6 rounded-[24px] border border-line flex flex-col justify-between h-40 lg:h-44 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">
              Learning Metric
            </span>
            <TrendingUp size={18} className="text-brand" />
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-light mb-4 text-text-primary">
              {progressPercent}%
            </div>
            <div className="w-full h-1.5 bg-line rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-brand"
              />
            </div>
          </div>
        </div>

        <div className="bg-surface-panel p-6 rounded-[24px] border border-line flex flex-col justify-between h-40 lg:h-44 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">
              Efficiency
            </span>
            <Award size={18} className="text-brand" />
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-light text-text-primary">
              {completedCount}
            </div>
            <div className="text-text-muted text-[11px] font-medium uppercase tracking-wider mt-1">
              Modules Qualified
            </div>
          </div>
        </div>

        <div
          className="bg-brand p-6 rounded-[24px] text-white flex flex-col justify-between md:col-span-2 lg:col-span-1 h-40 lg:h-44 cursor-pointer hover:bg-brand/90 transition-all shadow-xl shadow-brand/10 active:scale-[0.98]"
          onClick={() => navigate("/library")}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
              Continue Session
            </span>
            <ArrowRight size={18} />
          </div>
          <div>
            <div className="text-lg lg:text-xl font-bold leading-tight line-clamp-1">
              {INITIAL_MODULES.find(
                (m) => !profile?.completedModules.includes(m.id),
              )?.title || "Onboarding Complete"}
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider opacity-80 mt-2 flex items-center gap-2">
              Launch Module <Play size={8} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Modules */}
      <section>
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <h2 className="text-lg lg:text-xl font-bold tracking-tight text-text-primary uppercase tracking-[0.1em]">
            Academy Coursework
          </h2>
          <button
            onClick={() => navigate("/library")}
            className="text-[10px] lg:text-[11px] font-bold text-text-secondary hover:text-brand transition-colors flex items-center gap-2 uppercase tracking-widest"
          >
            Full Catalog <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-3 lg:space-y-4">
          {INITIAL_MODULES.map((module) => {
            const isCompleted = profile?.completedModules.includes(module.id);
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate(`/module/${module.id}`)}
                className="group bg-surface-panel p-4 lg:p-6 rounded-[20px] border border-line flex items-center gap-4 lg:gap-6 cursor-pointer hover:bg-surface-hover hover:border-text-secondary/20 transition-all"
              >
                <div
                  className={cn(
                    "w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all",
                    isCompleted
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-line text-text-secondary group-hover:bg-brand group-hover:text-white",
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Play size={18} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 lg:mb-1">
                    <span className="text-[9px] lg:text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">
                      {module.category}
                    </span>
                    <span className="w-1 h-1 bg-line rounded-full" />
                    <span className="text-[9px] lg:text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">
                      Session {module.order}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm lg:text-base text-text-primary tracking-tight transition-colors truncate">
                    {module.title}
                  </h3>
                </div>

                <div className="text-text-muted group-hover:text-brand transition-colors shrink-0">
                  <ArrowRight size={18} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ChevronRight({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return <ArrowRight size={size} className={cn("rotate-0", className)} />;
}
