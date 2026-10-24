import React from 'react';
import { HealthProvider, useHealth } from './context/HealthContext';
import { Navbar } from './components/Navbar';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { DemoTourBanner } from './components/DemoTourBanner';
import { EmergencyModal } from './components/EmergencyModal';
import { DashboardPage } from './pages/DashboardPage';
import { EducationLibraryPage } from './pages/EducationLibraryPage';
import { AiCompanionPage } from './pages/AiCompanionPage';
import { SymptomTrackerPage } from './pages/SymptomTrackerPage';
import { HealthSummaryPage } from './pages/HealthSummaryPage';
import { FindCarePage } from './pages/FindCarePage';
import { AboutPage } from './pages/AboutPage';
import { Heart, ShieldCheck, Phone, ExternalLink } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeTab, setActiveTab, setIsEmergencyOpen } = useHealth();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7F4] text-[#33272B]">
      {/* Top Banners */}
      <DisclaimerBanner />
      <DemoTourBanner />

      {/* Main Responsive Header */}
      <Navbar />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'topics' && <EducationLibraryPage />}
        {activeTab === 'companion' && <AiCompanionPage />}
        {activeTab === 'tracker' && <SymptomTrackerPage />}
        {activeTab === 'summary' && <HealthSummaryPage />}
        {activeTab === 'care' && <FindCarePage />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-[#F5D8DE] mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#B83250] to-[#911F37] flex items-center justify-center text-white shadow-xs">
                <Heart className="w-5 h-5 fill-white/20 stroke-white stroke-[2.2]" />
              </div>
              <div>
                <div className="text-lg font-bold font-serif text-[#B83250]">HERwell</div>
                <p className="text-xs text-[#554247]">
                  Understand Your Health. Own Your Wellbeing.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#554247]">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="hover:text-[#B83250] transition-colors cursor-pointer"
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('topics')}
                className="hover:text-[#B83250] transition-colors cursor-pointer"
              >
                Condition Library
              </button>
              <button
                onClick={() => setActiveTab('companion')}
                className="hover:text-[#B83250] transition-colors cursor-pointer"
              >
                AI Health Companion
              </button>
              <button
                onClick={() => setActiveTab('tracker')}
                className="hover:text-[#B83250] transition-colors cursor-pointer"
              >
                Symptom Tracker
              </button>
              <button
                onClick={() => setActiveTab('summary')}
                className="hover:text-[#B83250] transition-colors cursor-pointer"
              >
                Doctor Summary
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className="hover:text-[#B83250] transition-colors cursor-pointer"
              >
                Find Right Care
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className="hover:text-[#B83250] transition-colors cursor-pointer"
              >
                About & Safety
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEmergencyOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold border border-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Helplines (112 / 108)</span>
              </button>
            </div>
          </div>

          <div className="border-t border-[#F5D8DE] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#554247] gap-3">
            <p>
              © {new Date().getFullYear()} HERwell. Designed for digital women’s healthcare empowerment. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Client-Side Local Storage Privacy</span>
              </span>
              <span>•</span>
              <span>No Medical Diagnosis</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Emergency Modal */}
      <EmergencyModal />
    </div>
  );
};

export default function App() {
  return (
    <HealthProvider>
      <MainAppContent />
    </HealthProvider>
  );
}
