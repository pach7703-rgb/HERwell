import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { HEALTH_TOPICS } from '../data/topicsData';
import {
  Heart,
  Bot,
  Activity,
  BookOpen,
  FileText,
  Stethoscope,
  Plus,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Circle,
  HelpCircle,
  Clock,
  ChevronRight,
  ShieldAlert,
  Calendar,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    setActiveTab,
    viewTopic,
    startChatWithPrompt,
    symptoms,
    doctorQuestions,
    toggleDoctorQuestion,
    addDoctorQuestion,
    isSampleDataActive,
    loadSampleData,
    setIsEmergencyOpen,
  } = useHealth();

  const [newQuestionText, setNewQuestionText] = useState('');

  const featuredTopics = HEALTH_TOPICS.filter((t) => t.isFeatured).slice(0, 4);
  const recentLogs = symptoms.slice(0, 3);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    addDoctorQuestion(newQuestionText.trim(), 'Personal Note');
    setNewQuestionText('');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF0F2] via-white to-[#FDF5F7] border border-[#F5D8DE] p-6 sm:p-8 lg:p-10 shadow-sm">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-[#E8A0AD]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-[#F5D8DE]/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8A0AD] text-[#B83250] text-xs font-semibold mb-4 shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-[#B83250]" />
            <span>Welcome to HERwell</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#33272B] tracking-tight leading-tight">
            Your health matters. <br className="hidden sm:inline" />
            <span className="text-[#B83250]">Let’s understand it together.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#554247] font-normal leading-relaxed">
            A supportive, safe, and judgment-free companion to explore symptoms, learn about conditions, record bodily changes, and prepare confident questions for your doctor.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => startChatWithPrompt('Help me understand my symptoms and what might cause them.')}
              className="px-5 py-3 rounded-2xl bg-[#B83250] hover:bg-[#911F37] text-white text-sm font-semibold flex items-center gap-2 shadow-md shadow-[#B83250]/20 transition-all cursor-pointer group"
            >
              <Bot className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Ask a Health Question</span>
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-[#FFF7F4] text-[#33272B] border border-[#E8A0AD] text-sm font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Activity className="w-4 h-4 text-[#B83250]" />
              <span>Track Symptoms</span>
            </button>

            <button
              onClick={() => setActiveTab('topics')}
              className="px-5 py-3 rounded-2xl bg-[#FFF7F4] hover:bg-[#F5D8DE] text-[#B83250] border border-[#F5D8DE] text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Topics</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid: Left 2 Cols (Recent Logs & Daily Pearl), Right 1 Col (Doctor Question Prep) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => setActiveTab('care')}
              className="p-5 rounded-2xl bg-white border border-[#F5D8DE] hover:border-[#E8A0AD] shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF0F2] text-[#B83250] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#33272B]">Find Right Care</h3>
              <p className="text-xs text-[#554247] mt-1">
                Specialist recommendations & consultation guide.
              </p>
              <div className="mt-3 text-xs font-semibold text-[#B83250] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Check specialists</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              onClick={() => setActiveTab('summary')}
              className="p-5 rounded-2xl bg-white border border-[#F5D8DE] hover:border-[#E8A0AD] shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF0F2] text-[#B83250] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#33272B]">Doctor Summary</h3>
              <p className="text-xs text-[#554247] mt-1">
                Printable 1-page health brief for your clinician visit.
              </p>
              <div className="mt-3 text-xs font-semibold text-[#B83250] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Prepare summary</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              onClick={() => setIsEmergencyOpen(true)}
              className="p-5 rounded-2xl bg-red-50/50 border border-red-200 hover:border-red-300 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-red-900">Emergency Signs</h3>
              <p className="text-xs text-red-800/80 mt-1">
                Immediate red-flag indicators & helpline 112 / 108.
              </p>
              <div className="mt-3 text-xs font-semibold text-red-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View emergency guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Recent Symptom Log Summary */}
          <div className="bg-white rounded-3xl p-6 border border-[#F5D8DE] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0F2] text-[#B83250] flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-[#33272B]">Recent Symptom Logs</h2>
                  <p className="text-xs text-[#554247]">
                    {isSampleDataActive ? 'Showing sample demonstration records' : 'Your private local log'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('tracker')}
                className="text-xs font-semibold text-[#B83250] hover:text-[#911F37] flex items-center gap-1 cursor-pointer"
              >
                <span>Open Journal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recentLogs.length === 0 ? (
              <div className="text-center py-8 px-4 rounded-2xl bg-[#FFF7F4] border border-dashed border-[#E8A0AD]">
                <Activity className="w-8 h-8 text-[#E8A0AD] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#33272B]">No symptoms recorded yet</p>
                <p className="text-xs text-[#554247] mt-1 max-w-sm mx-auto">
                  Tracking your pain levels, cycle changes, and energy helps your doctor see real patterns over time.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveTab('tracker')}
                    className="px-4 py-2 rounded-xl bg-[#B83250] text-white text-xs font-semibold hover:bg-[#911F37] transition-colors"
                  >
                    Log First Symptom
                  </button>
                  <button
                    onClick={loadSampleData}
                    className="px-4 py-2 rounded-xl bg-white border border-[#E8A0AD] text-[#33272B] text-xs font-medium hover:bg-[#FFF7F4] transition-colors"
                  >
                    Load Sample Logs
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div
                    key={log.id}
                    onClick={() => setActiveTab('tracker')}
                    className="p-4 rounded-2xl border border-[#F5D8DE] hover:border-[#E8A0AD] hover:bg-[#FFF7F4]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#33272B] group-hover:text-[#B83250] transition-colors">
                          {log.symptomName}
                        </span>
                        {log.menstrualPhase && log.menstrualPhase !== 'Not Applicable / Skip' && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FFF0F2] text-[#B83250] border border-[#F5D8DE]">
                            {log.menstrualPhase.split(' ')[0]}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#554247]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {log.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {log.duration}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span>{log.frequency}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <div className="text-[10px] text-gray-500 font-medium">Severity</div>
                        <div className="text-sm font-bold text-[#B83250]">{log.severity} / 10</div>
                      </div>
                      <div
                        className={`w-3 h-10 rounded-full ${
                          log.severity >= 8
                            ? 'bg-red-500'
                            : log.severity >= 5
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}

                <div className="text-center pt-2">
                  <button
                    onClick={() => setActiveTab('tracker')}
                    className="text-xs text-[#554247] hover:text-[#B83250] font-medium"
                  >
                    View all {symptoms.length} entries & timeline →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Daily Health Education Pearl / Myth Buster */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#FFF7F4] to-[#FDF0F3] border border-[#E8A0AD]/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8A0AD] flex items-center justify-center text-[#B83250] shrink-0 shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-[#B83250] uppercase tracking-wider flex items-center gap-1.5">
                <span>Daily Health Education Pearl</span>
                <span className="text-gray-300">•</span>
                <span className="text-[#554247] font-normal normal-case">Evidence-Based</span>
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#33272B]">
                Myth Buster: Severe Period Pain is NOT "Just Part of Being a Woman"
              </h4>
              <p className="text-xs text-[#554247] leading-relaxed">
                Dysmenorrhea that forces you to miss school, work, or bed-rest may indicate treatable conditions like endometriosis, adenomyosis, or fibroids. Never hesitate to discuss pain with a gynaecologist.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Doctor Discussion Questions */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#F5D8DE] shadow-xs flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FFF0F2] text-[#B83250] flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h2 className="font-serif font-bold text-base text-[#33272B]">Doctor Visit Prep</h2>
                </div>
                <span className="text-[11px] font-semibold text-[#B83250] bg-[#FFF7F4] px-2 py-0.5 rounded-full border border-[#F5D8DE]">
                  {doctorQuestions.filter((q) => q.checked).length} / {doctorQuestions.length} Checked
                </span>
              </div>

              <p className="text-xs text-[#554247] mb-4">
                Saved questions to ask your healthcare provider. Check off questions you discuss during your consultation.
              </p>

              {/* Questions list */}
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {doctorQuestions.length === 0 ? (
                  <p className="text-xs text-gray-400 italic py-4 text-center">
                    No questions saved yet. Add one below or click "Save Question" in the topic guides.
                  </p>
                ) : (
                  doctorQuestions.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => toggleDoctorQuestion(q.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                        q.checked
                          ? 'bg-gray-50 border-gray-200 text-gray-400 line-through'
                          : 'bg-[#FFF7F4]/60 border-[#F5D8DE] hover:border-[#E8A0AD] text-[#33272B]'
                      }`}
                    >
                      <button
                        className="mt-0.5 shrink-0 text-[#B83250]"
                        aria-label="Toggle question status"
                      >
                        {q.checked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-400 hover:text-[#B83250]" />
                        )}
                      </button>
                      <span className="leading-snug">{q.text}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Add custom question input */}
              <form onSubmit={handleAddQuestion} className="mt-4 pt-3 border-t border-[#F5D8DE]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Add a question for your doctor..."
                    className="flex-1 px-3 py-2 rounded-xl text-xs bg-[#FFF7F4]/60 border border-[#F5D8DE] focus:outline-hidden focus:border-[#B83250] text-[#33272B]"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-[#B83250] hover:bg-[#911F37] text-white transition-colors cursor-pointer"
                    title="Add question"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-5 pt-4 border-t border-[#F5D8DE]">
              <button
                onClick={() => setActiveTab('summary')}
                className="w-full py-2.5 rounded-xl bg-white border border-[#B83250] text-[#B83250] hover:bg-[#B83250] hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Export to Doctor Health Summary</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Topics Carousel / Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-serif text-[#33272B]">
              Featured Health Conditions
            </h2>
            <p className="text-xs sm:text-sm text-[#554247]">
              Authoritative, evidence-based guides written in clear, reassuring language.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('topics')}
            className="text-xs sm:text-sm font-semibold text-[#B83250] hover:text-[#911F37] flex items-center gap-1 cursor-pointer"
          >
            <span>View all 14 topics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => viewTopic(topic.id)}
              className="bg-white rounded-3xl p-5 border border-[#F5D8DE] hover:border-[#E8A0AD] shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F2] text-[#B83250] font-semibold border border-[#F5D8DE]">
                    {topic.category.split(' ')[0]}
                  </span>
                  <span className="text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {topic.readTime}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#33272B] group-hover:text-[#B83250] transition-colors leading-snug">
                  {topic.title}
                </h3>

                <p className="text-xs text-[#554247] mt-2 line-clamp-3 leading-relaxed">
                  {topic.overview}
                </p>

                <div className="flex flex-wrap gap-1 mt-3">
                  {topic.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#FFF7F4] text-[#554247] border border-[#F5D8DE]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#B83250] group-hover:translate-x-0.5 transition-transform">
                <span>Read Guide</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
