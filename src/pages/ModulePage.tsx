import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { INITIAL_MODULES } from '../constants/modules';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  PlayCircle,
  Play,
  FileText,
  Video,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ModulePage() {
  const { id } = useParams();
  const { profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<'slides' | 'video' | 'pdf' | 'quiz' | 'result'>('slides');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<{ score: number; passed: boolean } | null>(null);

  const module = INITIAL_MODULES.find(m => m.id === id);
  const isCompleted = profile?.completedModules.includes(id || '');

  if (!module) return <div>Module not found</div>;

  const handleComplete = async () => {
    if (!profile || isCompleted) return;
    setLoading(true);
    try {
      const userRef = doc(db, 'users', profile.uid);
      await updateDoc(userRef, {
        completedModules: arrayUnion(module.id)
      });
      await refreshProfile();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < module.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      setCurrentStep('video');
    }
  };

  const handleStartQuiz = () => {
    setQuizAnswers(new Array(module.quiz.questions.length).fill(-1));
    setCurrentStep('quiz');
  };

  const handleProceedToPDF = () => {
    setCurrentStep('pdf');
  };

  const handleAnswerChange = (qIndex: number, aIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[qIndex] = aIndex;
    setQuizAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    const correctCount = quizAnswers.reduce((count, answer, index) => {
      return answer === module.quiz.questions[index].correctAnswerIndex ? count + 1 : count;
    }, 0);
    const score = (correctCount / module.quiz.questions.length) * 100;
    const passed = score >= 80;
    setQuizResult({ score, passed });
    setCurrentStep('result');
    if (passed) {
      handleComplete();
    }
  };

  return (
    <div className="space-y-8 lg:space-y-12 pb-20">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-[10px] lg:text-[11px] font-bold text-text-muted hover:text-brand transition-all uppercase tracking-widest px-2"
      >
        <ArrowLeft size={14} /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        <div className="lg:col-span-3 space-y-6 lg:space-y-10">
          <header className="px-2 lg:px-0">
            <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
              <span className="px-2 py-0.5 bg-surface-hover text-[9px] lg:text-[10px] font-bold text-brand uppercase tracking-[0.2em] rounded-md border border-line">
                {module.category}
              </span>
              <span className="hidden sm:inline text-line">|</span>
              <span className="text-[9px] lg:text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">Module {module.order}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-2 lg:mb-6 tracking-tight leading-tight">{module.title}</h1>
          </header>

          <AnimatePresence mode="wait">
            {currentStep === 'slides' && (
              <motion.div 
                key="slides"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 lg:space-y-8"
              >
                <div className="bg-surface-panel rounded-[24px] lg:rounded-[32px] border border-line overflow-hidden shadow-2xl">
                  <div className="aspect-video relative overflow-hidden bg-black">
                    {module.slides[currentSlideIndex].videoUrl ? (
                      module.slides[currentSlideIndex].videoUrl.endsWith('.gif') ? (
                        <img 
                          src={module.slides[currentSlideIndex].videoUrl} 
                          alt={module.slides[currentSlideIndex].title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <video 
                          controls 
                          autoPlay
                          loop
                          className="w-full h-full object-contain"
                          preload="metadata"
                        >
                          <source src={module.slides[currentSlideIndex].videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )
                    ) : (
                      <img 
                        src={module.slides[currentSlideIndex].imageUrl} 
                        alt={module.slides[currentSlideIndex].title}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <div className="p-6 lg:p-10 space-y-3 lg:space-y-4">
                    <h2 className="text-xl lg:text-2xl font-bold text-text-primary">{module.slides[currentSlideIndex].title}</h2>
                    <p 
                      className="text-sm lg:text-lg text-text-muted leading-relaxed font-medium"
                      dangerouslySetInnerHTML={{ __html: module.slides[currentSlideIndex].content }}
                    />
                    <div className="pt-4 lg:pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
                      <div className="flex gap-4 items-center w-full sm:w-auto justify-between sm:justify-start">
                        <button 
                          onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                          disabled={currentSlideIndex === 0}
                          className="text-text-muted hover:text-text-primary disabled:opacity-20 transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                        >
                          <ArrowLeft size={14} /> Back
                        </button>
                        <div className="flex gap-1.5 lg:gap-2">
                          {module.slides.map((_, i) => (
                            <div key={i} className={cn(
                              "h-1 rounded-full transition-all",
                              i === currentSlideIndex ? "w-6 lg:w-8 bg-brand" : "w-3 lg:w-4 bg-line"
                            )} />
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={handleNextSlide}
                        className="w-full sm:w-auto bg-brand text-white px-8 py-3 rounded-xl font-bold text-sm tracking-tight hover:bg-brand/90 flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-brand/20"
                      >
                        {currentSlideIndex < module.slides.length - 1 ? 'Next Slide' : 'Watch Video'} <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'video' && (
              <motion.div 
                key="video"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-6 lg:space-y-8"
              >
                <div className="aspect-video bg-black rounded-[24px] lg:rounded-[32px] border border-line overflow-hidden shadow-2xl">
                  <video 
                    controls 
                    className="w-full h-full object-contain"
                    preload="metadata"
                  >
                    <source src={module.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                  <button 
                    onClick={() => setCurrentStep('slides')}
                    className="flex-1 bg-surface-panel p-4 lg:p-6 rounded-2xl border border-line flex items-center justify-center gap-3 font-bold text-xs lg:text-sm text-text-muted hover:bg-surface-hover transition-colors"
                  >
                    <ArrowLeft size={16} /> Review Slides
                  </button>
                  <button 
                    onClick={handleProceedToPDF}
                    className="flex-[2] bg-brand text-white p-4 lg:p-6 rounded-2xl font-bold text-xs lg:text-sm tracking-tight hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    View Reference Material <ChevronRight size={16} />
                  </button>
                </div>
                <div className="bg-surface-panel p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] border border-line shadow-xl">
                  <h3 className="font-bold text-text-primary mb-2 text-sm lg:text-base tracking-tight">Certification Requirement</h3>
                  <p className="text-[12px] lg:text-sm text-text-muted leading-relaxed">
                    You have completed the theoretical slides. Please watch the summary video above. When ready, proceed to the qualifying exam. A score of 80% or higher is mandatory for module authentication.
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 'pdf' && (
              <motion.div 
                key="pdf"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="space-y-6 lg:space-y-8"
              >
                <div className="bg-surface-panel p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] border border-line shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="text-brand" size={24} />
                    <h3 className="font-bold text-text-primary text-lg lg:text-xl tracking-tight">Reference Material</h3>
                  </div>
                  <p className="text-sm lg:text-base text-text-muted leading-relaxed mb-6">
                    Review this comprehensive reference guide before taking the qualifying exam. This document contains essential information that will help you succeed.
                  </p>
                  
                  {/* PDF Viewer */}
                  <div className="aspect-[3/4] bg-surface-hover rounded-2xl border border-line overflow-hidden">
                    <iframe
                      src={`${module.id === 'prism-prentice' ? '/Prism.pdf#zoom=page-fit&view=FitH' : ''}`}
                      className="w-full h-full"
                      title="Reference PDF"
                    />
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 lg:gap-4">
                    <a
                      href={module.id === 'prism-prentice' ? '/Prism.pdf' : '#'}
                      download
                      className="flex-1 bg-surface-panel p-4 lg:p-6 rounded-2xl border border-line flex items-center justify-center gap-3 font-bold text-xs lg:text-sm text-text-muted hover:bg-surface-hover transition-colors"
                    >
                      <FileText size={16} /> Download PDF
                    </a>
                    <button 
                      onClick={handleStartQuiz}
                      className="flex-[2] bg-brand text-white p-4 lg:p-6 rounded-2xl font-bold text-xs lg:text-sm tracking-tight hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                      Proceed to Exam ({module.quiz.questions.length} Questions) <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'quiz' && (
              <motion.div 
                key="quiz"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 lg:space-y-10"
              >
                <div className="bg-surface-panel p-6 lg:p-10 rounded-[24px] lg:rounded-[32px] border border-line shadow-2xl space-y-6 lg:space-y-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-6 gap-4">
                    <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Qualifying Exam</h2>
                    <span className="text-brand font-bold text-xs bg-brand/10 px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg inline-flex self-start sm:self-center">Pass Mark: 80%</span>
                  </div>
                  
                  <div className="space-y-10 lg:space-y-12 max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {module.quiz.questions.map((q, qIndex) => (
                      <div key={q.id} className="space-y-4 lg:space-y-6">
                        <div className="flex gap-3 lg:gap-4">
                          <span className="text-text-secondary font-bold font-mono text-xs lg:text-sm">{String(qIndex + 1).padStart(2, '0')}.</span>
                          <p className="text-base lg:text-lg font-bold text-text-primary leading-tight">{q.text}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 sm:ml-10">
                          {q.options.map((option, aIndex) => (
                            <button
                              key={aIndex}
                              onClick={() => handleAnswerChange(qIndex, aIndex)}
                              className={cn(
                                "p-3.5 lg:p-5 rounded-xl lg:rounded-2xl border text-left transition-all font-medium text-xs lg:text-sm",
                                quizAnswers[qIndex] === aIndex 
                                  ? "bg-brand/10 border-brand text-brand ring-1 ring-brand"
                                  : "bg-surface-hover border-line text-text-muted hover:border-text-secondary/30"
                              )}
                            >
                              <div className="flex items-center gap-2.5 lg:gap-3">
                                <div className={cn(
                                  "w-4 h-4 lg:w-5 lg:h-5 rounded-full border flex items-center justify-center shrink-0",
                                  quizAnswers[qIndex] === aIndex ? "border-brand" : "border-line"
                                )}>
                                  {quizAnswers[qIndex] === aIndex && <div className="w-2 lg:w-2.5 h-2 lg:h-2.5 bg-brand rounded-full" />}
                                </div>
                                <span className="flex-1">{option}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 lg:pt-10 border-t border-line">
                    <button 
                      disabled={quizAnswers.includes(-1)}
                      onClick={handleSubmitQuiz}
                      className="w-full py-4 lg:py-5 bg-brand text-white rounded-xl lg:rounded-2xl font-bold text-sm tracking-tight hover:bg-brand/90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand/20 active:scale-[0.98] disabled:opacity-30"
                    >
                      {quizAnswers.includes(-1) ? `Pending Questions (${quizAnswers.filter(a => a === -1).length})` : 'Submit for Qualification'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'result' && quizResult && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 lg:py-20 space-y-6 lg:space-y-8"
              >
                <div className={cn(
                  "w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center shadow-2xl",
                  quizResult.passed ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                )}>
                  {quizResult.passed ? (
                    <CheckCircle2 className="w-12 h-12 lg:w-16 lg:h-16" />
                  ) : (
                    <div className="text-3xl lg:text-4xl font-black">!</div>
                  )}
                </div>
                <div className="text-center space-y-2 lg:space-y-4">
                  <h2 className="text-3xl lg:text-5xl font-bold tracking-tighter text-text-primary px-4">
                    {quizResult.passed ? 'Qualification Achieved' : 'Review Required'}
                  </h2>
                  <p className="text-xl lg:text-2xl text-text-muted">
                    Final Score: <span className={cn("font-black", quizResult.passed ? "text-emerald-400" : "text-red-400")}>{quizResult.score}%</span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full sm:w-auto px-6">
                  {!quizResult.passed && (
                    <button 
                      onClick={() => {
                        setCurrentStep('slides');
                        setCurrentSlideIndex(0);
                      }}
                      className="w-full sm:w-auto px-10 py-4 bg-surface-panel border border-line text-text-primary rounded-xl lg:rounded-2xl font-bold hover:bg-surface-hover transition-colors text-sm"
                    >
                      Try Again
                    </button>
                  )}
                  <button 
                    onClick={() => navigate('/')}
                    className="w-full sm:w-auto px-10 py-4 bg-brand text-white rounded-xl lg:rounded-2xl font-bold hover:bg-brand/90 shadow-lg shadow-brand/20 transition-all text-sm"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-surface-panel p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] border border-line shadow-xl">
              <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-6 lg:mb-8">Course Status</h3>
              
              <div className="space-y-4 lg:space-y-8">
                <div className="flex items-center gap-4 p-4 bg-surface-hover rounded-2xl border border-line">
                  <div className={cn(
                    "w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center transition-all",
                    isCompleted ? "bg-emerald-500/10 text-emerald-400" : "bg-brand/10 text-brand"
                  )}>
                    {isCompleted ? <CheckCircle2 size={24} /> : <PlayCircle size={24} />}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-primary uppercase tracking-wider leading-none">{isCompleted ? 'Qualified' : 'Pending'}</p>
                    <p className="text-[9px] text-text-muted uppercase tracking-widest mt-1.5 leading-none">{isCompleted ? 'Certify complete' : 'Action required'}</p>
                  </div>
                </div>

                {isCompleted ? (
                  <div className="p-4 lg:p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 text-center">
                    <p className="text-emerald-400 text-[10px] font-bold tracking-tight uppercase">
                      Module Authenticated
                    </p>
                  </div>
                ) : (
                  <div className="p-4 lg:p-6 bg-brand/5 rounded-2xl border border-brand/10 text-center">
                    <p className="text-brand text-[10px] font-bold uppercase tracking-wider">Instructions</p>
                    <p className="text-text-muted text-[10px] mt-2 font-medium leading-relaxed">
                        Complete all slides and the video to unlock the {module.quiz.questions.length}-question exam. 80% passing grade required.
                    </p>
                  </div>
                )}
              </div>

              <hr className="my-6 lg:my-8 border-line" />

              <div className="space-y-6">
                <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">Step Control</h4>
                <div className="flex flex-col gap-2">
                  {['slides', 'video', 'quiz'].map((step, idx) => (
                    <div key={idx} className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all",
                      currentStep === step ? "bg-brand/10 border-brand text-brand" : "bg-surface-base border-line text-text-muted opacity-50"
                    )}>
                        <div className="w-5 h-5 rounded-full bg-line flex items-center justify-center text-[8px] text-text-secondary">{idx + 1}</div>
                        {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
