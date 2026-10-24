import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { CARE_SPECIALISTS, SYMPTOM_TRIAGE_MATCHES, SymptomTriageMatch } from '../data/careSpecialistsData';
import {
  Stethoscope,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Phone,
  HelpCircle,
  ShieldAlert,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const FindCarePage: React.FC = () => {
  const { setIsEmergencyOpen, setActiveTab } = useHealth();
  const [selectedConcernId, setSelectedConcernId] = useState<string>('heavy-painful-periods');

  const activeMatch = SYMPTOM_TRIAGE_MATCHES.find((m) => m.concernId === selectedConcernId);
  const matchedSpecialist = activeMatch
    ? CARE_SPECIALISTS.find((s) => s.id === activeMatch.recommendedSpecialistId)
    : CARE_SPECIALISTS[0];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8A0AD] text-[#B83250] text-xs font-semibold mb-2">
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Clinical Guidance & Referral Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#33272B]">
          Find the Right Healthcare Specialist
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#554247]">
          Unsure which type of medical doctor to see? Select your primary health concern to explore recommended specialties, urgency levels, and appointment checklists.
        </p>
      </div>

      {/* Emergency Alert Banner */}
      <div className="p-4 rounded-3xl bg-red-50 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
          <div>
            <strong className="text-red-950">Experiencing acute, agonizing pain or severe sudden bleeding?</strong>
            <p className="text-red-800/90 text-[11px]">
              Do not wait for a clinic appointment. Call <strong>112</strong> or <strong>108</strong> (India) or visit the nearest hospital emergency room.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsEmergencyOpen(true)}
          className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shrink-0 cursor-pointer shadow-xs"
        >
          Emergency Helplines
        </button>
      </div>

      {/* Interactive Concern Selector */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5D8DE] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold font-serif text-[#33272B] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B83250]" />
            Step 1: Select Your Primary Concern or Symptom
          </h2>
          <span className="text-xs text-gray-400">Interactive Triage Guide</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SYMPTOM_TRIAGE_MATCHES.map((triage) => (
            <button
              key={triage.concernId}
              onClick={() => setSelectedConcernId(triage.concernId)}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                selectedConcernId === triage.concernId
                  ? 'bg-[#B83250] text-white border-[#B83250] shadow-sm'
                  : 'bg-[#FFF7F4]/60 text-[#33272B] border-[#F5D8DE] hover:border-[#E8A0AD] hover:bg-[#FFF7F4]'
              }`}
            >
              <div className="text-xs sm:text-sm font-medium leading-snug">
                {triage.concernLabel}
              </div>
              <ChevronRight
                className={`w-4 h-4 shrink-0 ${
                  selectedConcernId === triage.concernId ? 'text-white' : 'text-gray-400'
                }`}
              />
            </button>
          ))}
        </div>
      </section>

      {/* Step 2: Matched Specialist Recommendation Card */}
      {activeMatch && matchedSpecialist && (
        <section className="bg-white rounded-3xl border-2 border-[#E8A0AD] p-6 sm:p-8 shadow-md space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F5D8DE] pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FFF0F2] text-[#B83250] border border-[#F5D8DE]">
                  Recommended Medical Specialist
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    activeMatch.urgency === 'Emergency'
                      ? 'bg-red-100 text-red-700'
                      : activeMatch.urgency === 'Prompt (within 24-48 hrs)'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  Urgency: {activeMatch.urgency}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#33272B]">
                {matchedSpecialist.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#554247] mt-1 font-medium">
                {matchedSpecialist.specialty}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] text-gray-500 block">Assessment Window:</span>
              <span className="text-xs font-bold text-[#33272B]">{activeMatch.urgencyNote}</span>
            </div>
          </div>

          {/* Emergency warning if present */}
          {activeMatch.emergencyWarning && (
            <div className="p-4 rounded-2xl bg-red-50 border-l-4 border-red-500 text-xs text-red-900 leading-relaxed">
              <strong>Red Flag Notice: </strong>
              {activeMatch.emergencyWarning}
            </div>
          )}

          {/* Reasoning */}
          <div className="space-y-1.5">
            <h3 className="font-serif font-bold text-sm text-[#33272B]">
              Why this specialist is appropriate:
            </h3>
            <p className="text-xs sm:text-sm text-[#554247] leading-relaxed">
              {activeMatch.reasoning}
            </p>
          </div>

          {/* What to expect */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-sm text-[#33272B]">
              What to expect during your consultation:
            </h3>
            <div className="space-y-1.5">
              {matchedSpecialist.whatToExpect.map((point, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#FFF7F4] text-xs text-[#33272B] flex items-start gap-2.5 border border-[#F5D8DE]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#B83250] mt-0.5 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist to prepare */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-sm text-[#33272B]">
              What information to prepare before you go:
            </h3>
            <ul className="text-xs sm:text-sm text-[#554247] space-y-1.5 list-disc list-inside">
              {matchedSpecialist.questionsToPrepare.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="pt-4 border-t border-[#F5D8DE] flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setActiveTab('summary')}
              className="px-4 py-2 rounded-xl bg-[#B83250] hover:bg-[#911F37] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span>Prepare Your 1-Page Summary for this Appointment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {matchedSpecialist.helplineIndia && (
              <span className="text-xs text-[#554247] font-medium">
                {matchedSpecialist.helplineIndia}
              </span>
            )}
          </div>
        </section>
      )}

      {/* Directory of All Medical Specialties */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#33272B]">
              Medical Specialists Directory
            </h2>
            <p className="text-xs sm:text-sm text-[#554247]">
              Browse all women’s health-related specialties and typical consultation reasons.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CARE_SPECIALISTS.map((spec) => (
            <div
              key={spec.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F5D8DE] hover:border-[#E8A0AD] shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F2] text-[#B83250] font-semibold border border-[#F5D8DE] text-[11px]">
                  {spec.badge}
                </span>
                <span className="text-gray-400 font-medium">{spec.urgencyLevel}</span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-[#33272B]">{spec.title}</h3>
                <p className="text-xs text-[#554247] mt-1 leading-relaxed">
                  {spec.roleDescription}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#33272B] uppercase tracking-wider block mb-1">
                  Common Concerns Handled:
                </span>
                <ul className="text-xs text-[#554247] space-y-1 list-disc list-inside">
                  {spec.typicalConcerns.slice(0, 3).map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Important Disclaimer regarding directories */}
      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-500">
        <strong>Directory Transparency Notice:</strong> The recommendations above provide educational specialization guidance. HERwell does not endorse or list individual private clinics, and no simulated doctor identities are presented as real providers. For verified physician directories in India, consult the National Health Portal (MoHFW) or state medical council registers.
      </div>
    </div>
  );
};
