import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { INITIAL_MODULES } from "../constants/modules";
import { Module, ModuleCategory } from "../types";
import { motion } from "motion/react";
import { Play, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

const CATEGORY_LOGOS: Record<ModuleCategory, string> = {
  "Clinical & Technical Proficiency": "/categorylogo/clinical.png",
  "Lens Technology & Products": "/categorylogo/lenstech.png",
  "Patient Management & Sales": "/categorylogo/patientmanage.png",
  "Administrative & Compliance": "/categorylogo/compliance.png",
};

const CATEGORY_DESCRIPTIONS: Record<ModuleCategory, string> = {
  "Clinical & Technical Proficiency":
    'The "Science" of Opticianry. ABO/NCLE standards covering physics, anatomy, and technical troubleshooting.',
  "Lens Technology & Products":
    'The "Inventory" and Product Knowledge. Understanding lens designs, materials, and latest technology.',
  "Patient Management & Sales":
    'The "Service" and Communication. Turning technicians into consultants through patient experience mastery.',
  "Administrative & Compliance":
    'The "Operations" and Legal Standards. Medicaid/VSP workflows, HIPAA, and operational excellence.',
};

export default function Dashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<ModuleCategory | null>(null);

  // Group modules by category
  const modulesByCategory = INITIAL_MODULES.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {} as Record<ModuleCategory, Module[]>);

  const categories = Object.keys(modulesByCategory) as ModuleCategory[];

  const completedCount = profile?.completedModules.length || 0;
  const progressPercent = Math.round(
    (completedCount / INITIAL_MODULES.length) * 100,
  );

  // If a category is selected, show modules in that category
  if (selectedCategory) {
    return (
      <div className="space-y-8 lg:space-y-12">
        <header>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-4 flex items-center text-brand hover:text-brand/80 transition-colors text-sm font-medium"
          >
            <ArrowRight className="rotate-180 mr-2" size={16} /> Back to Categories
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2 tracking-tight">
            {selectedCategory}
          </h1>
          <p className="text-text-muted text-base lg:text-lg">
            {CATEGORY_DESCRIPTIONS[selectedCategory]}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {modulesByCategory[selectedCategory].map((module) => {
            const isCompleted = profile?.completedModules.includes(module.id);
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate(`/module/${module.id}`)}
                className="group bg-surface-panel p-6 rounded-[20px] border border-line cursor-pointer hover:bg-surface-hover hover:border-brand/30 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden",
                      isCompleted
                        ? "bg-emerald-500/10"
                        : "bg-line group-hover:bg-brand/10",
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={24} className="text-emerald-500" />
                    ) : module.logo ? (
                      <img
                        src={module.logo}
                        alt={`${module.title} logo`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Play size={24} className="text-text-secondary" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">
                        Session {module.order}
                      </span>
                      {isCompleted && (
                        <span className="ml-auto flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] font-bold uppercase tracking-wider rounded-md">
                          <CheckCircle2 size={10} /> Completed
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-base lg:text-lg text-text-primary tracking-tight mb-2 group-hover:text-brand transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm text-text-muted line-clamp-2">
                      {module.description}
                    </p>
                  </div>

                  <div className="text-text-muted group-hover:text-brand transition-colors shrink-0 self-center">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Show category cards
  return (
    <div className="space-y-8 lg:space-y-12">
      <header>
        <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2 tracking-tight">
          Optistep Academy
        </h1>
        <p className="text-text-muted text-base lg:text-lg">
          Welcome back, {profile?.username || "trainee"}. Your current progress
          is {progressPercent}%. Select a learning path below.
        </p>
      </header>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-surface-panel p-6 rounded-[24px] border border-line shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">
              Overall Progress
            </span>
          </div>
          <div className="text-3xl lg:text-4xl font-light mb-4 text-text-primary">
            {progressPercent}%
          </div>
          <div className="w-full h-2 bg-line rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className="h-full bg-brand"
            />
          </div>
        </div>

        <div className="bg-surface-panel p-6 rounded-[24px] border border-line shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">
              Modules Completed
            </span>
          </div>
          <div className="text-3xl lg:text-4xl font-light text-text-primary">
            {completedCount}
          </div>
          <div className="text-text-muted text-[11px] font-medium uppercase tracking-wider mt-1">
            out of {INITIAL_MODULES.length} total modules
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <section>
        <h2 className="text-lg lg:text-xl font-bold tracking-tight text-text-primary uppercase tracking-[0.1em] mb-6 lg:mb-8">
          Learning Paths
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category) => {
            const logo = CATEGORY_LOGOS[category];
            const count = modulesByCategory[category].length;
            const completedInCategory = modulesByCategory[category].filter(
              (m) => profile?.completedModules.includes(m.id),
            ).length;
            const categoryProgress = Math.round((completedInCategory / count) * 100);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedCategory(category)}
                className="group bg-surface-panel p-6 lg:p-8 rounded-[24px] border border-line cursor-pointer hover:border-brand/40 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform">
                    <img
                      src={logo}
                      alt={`${category} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-text-primary">
                      {count}
                    </div>
                    <div className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">
                      Modules
                    </div>
                  </div>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-text-primary mb-3 group-hover:text-brand transition-colors tracking-tight">
                  {category}
                </h3>

                <p className="text-sm text-text-muted mb-6 leading-relaxed">
                  {CATEGORY_DESCRIPTIONS[category]}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary font-medium">
                      Progress
                    </span>
                    <span className="text-text-primary font-bold">
                      {completedInCategory}/{count}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-line rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${categoryProgress}%` }}
                      className="h-full bg-brand"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center text-brand text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  View Modules <ArrowRight size={16} className="ml-2" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
