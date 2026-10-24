import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Sparkles, RefreshCw, Trash2, CheckCircle2, ChevronDown, ChevronUp, Bot, BookOpen, Stethoscope, FileText, Activity, Download } from 'lucide-react';

export const DemoTourBanner: React.FC = () => {
  const {
    isSampleDataActive,
    loadSampleData,
    resetToEmptyData,
    serverStatus,
    activeTab,
    setActiveTab,
    viewTopic,
    startChatWithPrompt,
  } = useHealth();

  const [isOpen, setIsOpen] = useState(false);

  const demoSteps = [
    {
      num: 1,
      title: 'Explore Condition Library',
      desc: 'Browse evidence-based guides for PCOS, Endometriosis, Anaemia & more.',
      action: () => viewTopic('endometriosis'),
      active: activeTab === 'topics',
      icon: BookOpen,
    },
    {
      num: 2,
      title: 'Ask AI Companion',
      desc: 'Explore symptoms without fear of definitive AI diagnosis or judgement.',
      action: () => startChatWithPrompt('What is the difference between PCOS and endometriosis?'),
      active: activeTab === 'companion',
      icon: Bot,
    },
    {
      num: 3,
      title: 'Record & Track Symptoms',
      desc: '1-10 severity pain scale, frequency, cyclical tags, and doctor notes.',
      action: () => setActiveTab('tracker'),
      active: activeTab === 'tracker',
      icon: Activity,
    },
    {
      num: 4,
      title: 'Find the Right Specialist',
      desc: 'Interactive care triage matching concerns to Gynaecologist, Endocrinologist, etc.',
      action: () => setActiveTab('care'),
      active: activeTab === 'care',
      icon: Stethoscope,
    },
    {
      num: 5,
      title: 'Generate Doctor Brief',
      desc: 'Export a structured, print-ready appointment summary with customized questions.',
      action: () => setActiveTab('summary'),
      active: activeTab === 'summary',
      icon: FileText,
    },
  ];

  return (
    <div className="no-print bg-gradient-to-r from-[#FFF7F4] via-[#FDF0F3] to-[#FFF7F4] border-b border-[#F5D8DE] px-4 py-2.5 transition-all text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left: Persona & AI Engine badge */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-center sm:text-left justify-center sm:justify-start">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#B83250]/10 text-[#B83250] font-semibold border border-[#B83250]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hackathon Showcase Hub</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#554247]">
            <span>Active Persona:</span>
            <span className="font-semibold text-[#33272B]">
              {isSampleDataActive ? 'Priya Sharma (Sample College Demo)' : 'Custom User Session'}
            </span>
          </div>

          {/* AI Connection status */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white border border-[#E8A0AD]/50 text-[11px]">
            <span
              className={`w-2 h-2 rounded-full ${
                serverStatus?.liveVerified ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span className="font-medium text-[#33272B]">
              {serverStatus?.liveVerified
                ? 'Gemini 3.8 Flash (Live Server)'
                : 'Educational Demo Engine (Hackathon Ready)'}
            </span>
          </div>
        </div>

        {/* Right: Quick Demo controls */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/api/download-zip"
            download="HERwell-source-code.zip"
            className="px-2.5 py-1 rounded-lg bg-white border border-[#E8A0AD] hover:bg-[#FFF7F4] text-[#B83250] font-medium flex items-center gap-1 transition-colors cursor-pointer text-[11px]"
            title="Download full project code as a ZIP archive"
          >
            <Download className="w-3 h-3" />
            <span>Download App ZIP</span>
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-2.5 py-1 rounded-lg bg-white border border-[#E8A0AD] hover:bg-[#FFF7F4] text-[#33272B] font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Demo Guide</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {!isSampleDataActive ? (
            <button
              onClick={loadSampleData}
              className="px-2.5 py-1 rounded-lg bg-[#B83250] text-white hover:bg-[#911F37] font-medium flex items-center gap-1 transition-colors cursor-pointer"
              title="Preload 3 sample symptom logs and 4 doctor questions"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Load Demo Data</span>
            </button>
          ) : (
            <button
              onClick={resetToEmptyData}
              className="px-2.5 py-1 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-1 transition-colors cursor-pointer"
              title="Clear to blank state"
            >
              <Trash2 className="w-3 h-3 text-gray-500" />
              <span>Clear Sample Data</span>
            </button>
          )}
        </div>
      </div>

      {/* Expanded Demo Journey Drawer */}
      {isOpen && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-[#F5D8DE]/80 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-serif font-bold text-[#33272B] text-sm">
              Judge Demonstration Journey (5 Key Steps)
            </h4>
            <span className="text-[11px] text-[#554247]">Click any step to demonstrate live:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
            {demoSteps.map((step) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.num}
                  onClick={step.action}
                  className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    step.active
                      ? 'bg-white border-[#B83250] shadow-sm ring-1 ring-[#B83250]/30'
                      : 'bg-white/80 border-[#E8A0AD]/40 hover:bg-white hover:border-[#E8A0AD]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#FFF7F4] border border-[#E8A0AD] text-[#B83250] font-bold flex items-center justify-center text-[10px]">
                      {step.num}
                    </span>
                    <Icon className="w-4 h-4 text-[#B83250]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#33272B] text-[11px] leading-snug">
                      {step.title}
                    </div>
                    <div className="text-[10px] text-[#554247] mt-0.5 line-clamp-2">
                      {step.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
