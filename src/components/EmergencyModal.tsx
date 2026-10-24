import React from 'react';
import { useHealth } from '../context/HealthContext';
import { AlertTriangle, Phone, X, ShieldAlert, HeartHandshake, ExternalLink } from 'lucide-react';

export const EmergencyModal: React.FC = () => {
  const { isEmergencyOpen, setIsEmergencyOpen } = useHealth();

  if (!isEmergencyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-2 border-red-200 overflow-hidden text-[#33272B] max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="emergency-modal-title"
      >
        {/* Header Banner */}
        <div className="bg-red-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 id="emergency-modal-title" className="text-xl font-bold font-serif tracking-tight">
                Emergency & Urgent Care Guidance
              </h2>
              <p className="text-red-100 text-xs">
                Do not wait for an app response if you face critical danger signs.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEmergencyOpen(false)}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close emergency modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Warning Message */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
            <h3 className="font-semibold text-red-900 flex items-center gap-2 text-sm sm:text-base">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              Immediate Red-Flag Warning Signs:
            </h3>
            <ul className="mt-2 text-xs sm:text-sm text-red-800 space-y-1.5 list-disc list-inside">
              <li>
                <strong>Acute, agonizing pelvic or abdominal pain:</strong> Especially if sudden, one-sided, or with dizziness/fainting (risk of ruptured ectopic pregnancy or ovarian cyst torsion).
              </li>
              <li>
                <strong>Severe vaginal bleeding:</strong> Soaking completely through two or more maxi pads or tampons every hour for two consecutive hours, or passing large blood clots.
              </li>
              <li>
                <strong>Chest tightness or sudden breathlessness:</strong> Crushing chest sensation, pain radiating to neck/jaw/back, or feeling unable to breathe.
              </li>
              <li>
                <strong>Fainting or altered consciousness:</strong> Syncope accompanied by acute pain, pallor, or confusion.
              </li>
              <li>
                <strong>High fever with pelvic tenderness or stiff neck:</strong> Fever above 38.5°C (101.3°F) with foul-smelling vaginal discharge or shivering.
              </li>
            </ul>
          </div>

          {/* India Emergency Helpline Contacts */}
          <div>
            <h3 className="text-base font-bold text-[#33272B] font-serif mb-3 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#B83250]" />
              Official Emergency Helplines (India)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:112"
                className="flex items-center justify-between p-3.5 rounded-xl border border-red-200 bg-red-50/50 hover:bg-red-100/60 transition-all group"
              >
                <div>
                  <div className="text-xs text-red-700 font-medium">All-in-One National Emergency</div>
                  <div className="text-2xl font-bold text-red-900 font-serif">112</div>
                  <div className="text-[11px] text-[#554247]">Police, Fire, Medical, Rescue</div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold group-hover:bg-red-700">
                  Call 112
                </div>
              </a>

              <a
                href="tel:108"
                className="flex items-center justify-between p-3.5 rounded-xl border border-red-200 bg-red-50/50 hover:bg-red-100/60 transition-all group"
              >
                <div>
                  <div className="text-xs text-red-700 font-medium">National Medical Ambulance</div>
                  <div className="text-2xl font-bold text-red-900 font-serif">108</div>
                  <div className="text-[11px] text-[#554247]">Dispatched Medical Response</div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold group-hover:bg-red-700">
                  Call 108
                </div>
              </a>

              <a
                href="tel:181"
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#E8A0AD] bg-[#FFF7F4] hover:bg-[#F5D8DE]/60 transition-all group"
              >
                <div>
                  <div className="text-xs text-[#B83250] font-medium">Women Helpline (National)</div>
                  <div className="text-2xl font-bold text-[#33272B] font-serif">181</div>
                  <div className="text-[11px] text-[#554247]">24x7 Support for Women in Crisis</div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#B83250] text-white text-xs font-semibold group-hover:bg-[#911F37]">
                  Call 181
                </div>
              </a>

              <a
                href="tel:14416"
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#E8A0AD] bg-[#FFF7F4] hover:bg-[#F5D8DE]/60 transition-all group"
              >
                <div>
                  <div className="text-xs text-[#B83250] font-medium">Tele-MANAS Mental Health</div>
                  <div className="text-2xl font-bold text-[#33272B] font-serif">14416</div>
                  <div className="text-[11px] text-[#554247]">Govt. 24x7 Counseling Helpline</div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#B83250] text-white text-xs font-semibold group-hover:bg-[#911F37]">
                  Call 14416
                </div>
              </a>
            </div>
          </div>

          {/* International Guidance */}
          <div className="bg-[#FFF7F4] p-4 rounded-xl border border-[#E8A0AD]/40 text-xs text-[#554247] space-y-1">
            <div className="font-semibold text-[#33272B] flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-[#B83250]" />
              Outside India?
            </div>
            <p>
              In the United States or Canada, call <strong>911</strong>. In the United Kingdom, call <strong>999</strong> (or <strong>111</strong> for non-emergency medical advice). In the European Union, call <strong>112</strong>. Please locate your nearest hospital accident and emergency (A&E / ER) department.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-gray-500 text-center sm:text-left">
            HERwell is an educational resource and cannot provide emergency dispatch or live triage.
          </p>
          <button
            onClick={() => setIsEmergencyOpen(false)}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gray-800 hover:bg-gray-900 text-white text-xs font-semibold transition-colors"
          >
            I Understand — Close
          </button>
        </div>
      </div>
    </div>
  );
};
