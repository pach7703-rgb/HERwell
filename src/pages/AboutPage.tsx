import React from 'react';
import { useHealth } from '../context/HealthContext';
import {
  Heart,
  ShieldCheck,
  Lock,
  Trash2,
  Phone,
  Sparkles,
  Bot,
  Activity,
  FileText,
  AlertTriangle,
  Award,
  Globe,
  ExternalLink,
  Download,
  Code2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { clearAllSymptoms, resetToEmptyData, loadSampleData, isSampleDataActive, setIsEmergencyOpen } =
    useHealth();

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in pb-16">
      {/* Brand Hero */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#B83250] to-[#911F37] flex items-center justify-center text-white mx-auto shadow-lg shadow-[#B83250]/20">
          <Heart className="w-8 h-8 fill-white/20 stroke-white stroke-[2.2]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#33272B]">
          HERwell — Your Women’s Health Companion
        </h1>
        <p className="text-base text-[#B83250] font-serif italic">
          "Understand Your Health. Own Your Wellbeing."
        </p>
        <p className="text-xs sm:text-sm text-[#554247] leading-relaxed">
          Designed to make reliable women’s healthcare information accessible, non-intimidating, and scientifically grounded. Created for young women, college students, and adults everywhere.
        </p>
      </section>

      {/* Core Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-[#F5D8DE] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF0F2] text-[#B83250] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-base text-[#33272B]">Medical Safety First</h3>
          <p className="text-xs text-[#554247] leading-relaxed">
            Strict AI guardrails ensure HERwell never invents diagnoses, prescribes dosages, or downplays potentially critical symptoms.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#F5D8DE] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF0F2] text-[#B83250] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-base text-[#33272B]">100% Privacy by Design</h3>
          <p className="text-xs text-[#554247] leading-relaxed">
            Your symptom journal and notes remain strictly inside your browser's local storage. No health data is stored or commercialized on remote servers.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#F5D8DE] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF0F2] text-[#B83250] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-base text-[#33272B]">Doctor Preparation</h3>
          <p className="text-xs text-[#554247] leading-relaxed">
            Bridge the gap between patient experience and clinical consultations with 1-page printable clinical appointment briefs.
          </p>
        </div>
      </div>

      {/* Privacy Architecture & Data Control */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5D8DE] shadow-xs space-y-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FFF0F2] text-[#B83250] flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold font-serif text-[#33272B]">
            Your Privacy & Data Ownership
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#554247] leading-relaxed">
          Health information is deeply personal. For this prototype, all symptom entries, custom doctor questions, and journal notes are saved solely in your local browser storage (<code className="bg-[#FFF7F4] px-1.5 py-0.5 rounded-sm border border-[#E8A0AD] text-[#B83250]">localStorage</code>). You can wipe your data at any time with one click.
        </p>

        <div className="p-4 rounded-2xl bg-[#FFF7F4] border border-[#F5D8DE] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#33272B]">Manage Your Local Records</h4>
            <p className="text-xs text-[#554247] mt-0.5">
              Reset your journal to a clean slate or reload the sample hackathon scenario.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={loadSampleData}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#E8A0AD] text-[#B83250] text-xs font-semibold hover:bg-[#FFF7F4] cursor-pointer"
            >
              Reload Sample Data
            </button>
            <button
              onClick={resetToEmptyData}
              className="px-3.5 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-semibold hover:bg-red-100 flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Local Data</span>
            </button>
          </div>
        </div>
      </section>

      {/* Indian Healthcare Context & Helplines */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5D8DE] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#B83250]" />
            <h2 className="text-xl font-bold font-serif text-[#33272B]">
              India Healthcare Context & Public Resources
            </h2>
          </div>
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="text-xs text-red-600 font-semibold hover:underline"
          >
            Emergency Contacts
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#554247] leading-relaxed">
          Women in India face distinct public health challenges, including over 50% prevalence of anaemia among women of reproductive age, significant underdiagnosis of PCOS and endometriosis, and social taboos regarding menstrual hygiene and sexual health. HERwell integrates public health guidelines from:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#FFF7F4] border border-[#F5D8DE] space-y-1">
            <strong className="text-[#33272B]">Anemia Mukt Bharat (AMB)</strong>
            <p className="text-[#554247]">
              National nutritional initiative providing weekly iron and folic acid supplementation.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFF7F4] border border-[#F5D8DE] space-y-1">
            <strong className="text-[#33272B]">Tele-MANAS (14416)</strong>
            <p className="text-[#554247]">
              Govt. of India 24x7 toll-free mental health counseling in multiple regional languages.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFF7F4] border border-[#F5D8DE] space-y-1">
            <strong className="text-[#33272B]">Rashtriya Kishor Swasthya Karyakram (RKSK)</strong>
            <p className="text-[#554247]">
              Adolescent health program emphasizing menstrual hygiene, nutrition, and mental health.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFF7F4] border border-[#F5D8DE] space-y-1">
            <strong className="text-[#33272B]">Women Helpline (181) & Ambulance (108)</strong>
            <p className="text-[#554247]">
              National round-the-clock emergency assistance and medical dispatch across Indian states.
            </p>
          </div>
        </div>
      </section>

      {/* College Hackathon Evaluation Guide */}
      <section className="bg-gradient-to-br from-[#FFF0F2] via-white to-[#FDF0F3] rounded-3xl p-6 sm:p-8 border border-[#E8A0AD] shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#B83250]" />
          <h2 className="text-xl font-bold font-serif text-[#33272B]">
            Hackathon Judge Demonstration Notes
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#554247] leading-relaxed">
          If you are demonstrating HERwell to hackathon judges, follow this recommended 5-minute showcase script:
        </p>

        <div className="space-y-3 text-xs sm:text-sm text-[#33272B]">
          <div className="p-3 rounded-xl bg-white border border-[#F5D8DE] flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-[#B83250] text-white text-xs font-bold flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <strong>Condition Library:</strong> Show topics like <em>PCOS</em>, <em>Endometriosis</em>, and <em>Anaemia</em>. Highlight the "Save Question" button that moves clinical questions straight to the user's doctor prep list.
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#F5D8DE] flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-[#B83250] text-white text-xs font-bold flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <strong>AI Health Companion:</strong> Test a question like <em>"What is the difference between PCOS and endometriosis?"</em>. Point out the medical safety guardrails (no definitive diagnosis, conservative emergency triage).
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#F5D8DE] flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-[#B83250] text-white text-xs font-bold flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <strong>Symptom Tracker:</strong> Demonstrate logging a symptom with the 1-10 pain slider, frequency options, and skippable menstrual cycle phase.
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#F5D8DE] flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-[#B83250] text-white text-xs font-bold flex items-center justify-center shrink-0">
              4
            </span>
            <div>
              <strong>Find the Right Care:</strong> Demonstrate symptom triage matching (e.g., severe cramps to Gynaecologist, fatigue to Primary Physician, breast changes to Breast Specialist).
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#F5D8DE] flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-[#B83250] text-white text-xs font-bold flex items-center justify-center shrink-0">
              5
            </span>
            <div>
              <strong>Doctor Health Summary:</strong> Click <em>"Download PDF"</em> or <em>"Print Brief"</em> to show the finished clinical summary ready to take into the doctor’s office.
            </div>
          </div>
        </div>
      </section>

      {/* Export to GitHub & Download Code */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5D8DE] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-[#FFF0F2] text-[#B83250] flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-[#33272B]">
                Download App & Push to GitHub
              </h2>
              <p className="text-xs text-[#554247]">
                Export your hackathon project code to your local machine or your GitHub account
              </p>
            </div>
          </div>

          <a
            href="/api/download-zip"
            download="HERwell-source-code.zip"
            className="px-4 py-2.5 rounded-2xl bg-[#B83250] hover:bg-[#911F37] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Download Project ZIP</span>
          </a>
        </div>

        <div className="space-y-4 pt-2 text-xs sm:text-sm text-[#33272B]">
          <div className="p-4 rounded-2xl bg-[#FFF7F4] border border-[#F5D8DE] space-y-2">
            <h4 className="font-bold text-[#33272B] text-xs uppercase tracking-wider">
              Option 1: One-Click ZIP Download
            </h4>
            <p className="text-xs text-[#554247] leading-relaxed">
              Click the <strong>Download Project ZIP</strong> button above. Unzip the file on your computer, open a terminal in the folder, and run:
            </p>
            <pre className="p-3 rounded-xl bg-gray-900 text-emerald-400 text-xs font-mono overflow-x-auto">
npm install
npm run dev
            </pre>
            <p className="text-[11px] text-gray-500">
              The app will launch on <code>http://localhost:3000</code>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-3">
            <h4 className="font-bold text-[#33272B] text-xs uppercase tracking-wider">
              Option 2: Push Directly to Your GitHub Repository
            </h4>
            <ol className="text-xs text-[#554247] space-y-2 list-decimal list-inside">
              <li>
                Create a new empty repository on <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-[#B83250] underline font-medium">GitHub.com</a> (e.g. named <code>HERwell</code>). Do not initialize it with a README.
              </li>
              <li>
                In your terminal, connect the project to your GitHub repository:
              </li>
            </ol>
            <pre className="p-3 rounded-xl bg-gray-900 text-emerald-400 text-xs font-mono overflow-x-auto">
git remote add origin https://github.com/YOUR_USERNAME/HERwell.git
git branch -M main
git push -u origin main
            </pre>
            <p className="text-[11px] text-gray-500">
              The Git repository is already initialized and cleanly committed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
