import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { useHealth } from '../context/HealthContext';

export const DisclaimerBanner: React.FC = () => {
  const { setIsEmergencyOpen } = useHealth();

  return (
    <div className="no-print bg-[#FFF0F2] border-b border-[#F5D8DE] px-4 py-2 text-xs text-[#554247]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <ShieldCheck className="w-4 h-4 text-[#B83250] shrink-0" />
          <span>
            <strong>Educational & Informational Companion:</strong> HERwell does not diagnose conditions or replace individual medical evaluation.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="text-xs text-red-700 hover:text-red-900 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
          >
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
            Emergency Warning Signs
          </button>
        </div>
      </div>
    </div>
  );
};
