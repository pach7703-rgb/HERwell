import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { PageTab } from '../types';
import {
  Menu,
  X,
  Heart,
  AlertTriangle,
  LayoutDashboard,
  BookOpen,
  Bot,
  Activity,
  FileText,
  Stethoscope,
  Info,
} from 'lucide-react';

interface NavItem {
  id: PageTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Home Dashboard', icon: LayoutDashboard },
  { id: 'topics', label: 'Explore Topics', icon: BookOpen },
  { id: 'companion', label: 'AI Health Companion', icon: Bot },
  { id: 'tracker', label: 'Symptom Tracker', icon: Activity },
  { id: 'summary', label: 'My Health Summary', icon: FileText },
  { id: 'care', label: 'Find Right Care', icon: Stethoscope },
  { id: 'about', label: 'About & Safety', icon: Info },
];

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, setIsEmergencyOpen, symptoms } = useHealth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F5D8DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand identity */}
        <div
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#B83250] to-[#911F37] flex items-center justify-center text-white shadow-md shadow-[#B83250]/20 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white/20 stroke-white stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold font-serif tracking-tight text-[#B83250]">
                HERwell
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-[#FFF7F4] text-[#B83250] border border-[#E8A0AD]">
                Companion
              </span>
            </div>
            <p className="text-[11px] text-[#554247] hidden sm:block tracking-wide">
              Understand Your Health. Own Your Wellbeing.
            </p>
          </div>
        </div>

        {/* Desktop Quick Shortcuts */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FFF7F4] text-[#B83250] shadow-xs'
                    : 'text-[#554247] hover:text-[#B83250] hover:bg-[#FFF7F4]/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#B83250]' : 'text-gray-400'}`} />
                <span>{item.label}</span>
                {item.id === 'tracker' && symptoms.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#E8A0AD] text-[#33272B] font-bold text-[9px] flex items-center justify-center">
                    {symptoms.length}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B83250] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right CTA: Emergency Warning Guidance & Mobile Menu button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer group"
          >
            <AlertTriangle className="w-4 h-4 text-red-600 group-hover:animate-bounce" />
            <span className="hidden sm:inline">Emergency Help</span>
            <span className="sm:hidden">112 / Help</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#33272B] hover:bg-[#FFF7F4] transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#F5D8DE] bg-white px-4 py-3 space-y-1 shadow-lg animate-fade-in">
          <div className="text-xs font-semibold text-[#554247] uppercase tracking-wider px-2 py-1">
            Navigation
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#B83250] text-white'
                    : 'text-[#33272B] hover:bg-[#FFF7F4]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#B83250]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.id === 'tracker' && symptoms.length > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? 'bg-white text-[#B83250]' : 'bg-[#F5D8DE] text-[#B83250]'
                    }`}
                  >
                    {symptoms.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
