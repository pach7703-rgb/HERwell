import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { HEALTH_TOPICS } from '../data/topicsData';
import { HealthTopic, TopicCategory } from '../types';
import {
  Search,
  BookOpen,
  Clock,
  ChevronRight,
  ArrowLeft,
  Bot,
  Plus,
  Check,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

const CATEGORIES: TopicCategory[] = [
  'All',
  'Hormonal & Reproductive',
  'Menstrual Health',
  'Pain & Discomfort',
  'Metabolic & Nutrition',
  'General & Preventive',
  'Mental Wellbeing',
];

export const EducationLibraryPage: React.FC = () => {
  const {
    selectedTopicId,
    setSelectedTopicId,
    startChatWithPrompt,
    addDoctorQuestion,
    doctorQuestions,
    setIsEmergencyOpen,
  } = useHealth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory>('All');
  const [addedQuestionMap, setAddedQuestionMap] = useState<Record<string, boolean>>({});

  const activeTopic = HEALTH_TOPICS.find((t) => t.id === selectedTopicId);

  const filteredTopics = HEALTH_TOPICS.filter((topic) => {
    const matchesCategory =
      selectedCategory === 'All' || topic.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      topic.title.toLowerCase().includes(query) ||
      topic.subtitle.toLowerCase().includes(query) ||
      topic.overview.toLowerCase().includes(query) ||
      topic.tags.some((t) => t.toLowerCase().includes(query)) ||
      topic.commonSymptoms.some((s) => s.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const handleAddQuestionToPrep = (questionText: string, topicTitle: string) => {
    addDoctorQuestion(questionText, 'Topic Inquiry', topicTitle);
    setAddedQuestionMap((prev) => ({ ...prev, [questionText]: true }));
    setTimeout(() => {
      setAddedQuestionMap((prev) => ({ ...prev, [questionText]: false }));
    }, 2500);
  };

  // If a topic is selected, render the detailed topic article
  if (activeTopic) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setSelectedTopicId(null)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E8A0AD] hover:bg-[#FFF7F4] text-[#B83250] text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Condition Library</span>
          </button>

          <button
            onClick={() =>
              startChatWithPrompt(
                `Can you explain the key things I should know about ${activeTopic.title} and what questions I should take to my doctor?`
              )
            }
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#B83250] hover:bg-[#911F37] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI about {activeTopic.title}</span>
          </button>
        </div>

        {/* Article Header */}
        <header className="rounded-3xl bg-white border border-[#F5D8DE] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#554247] mb-3">
            <span className="px-3 py-1 rounded-full bg-[#FFF0F2] text-[#B83250] font-semibold border border-[#F5D8DE]">
              {activeTopic.category}
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              {activeTopic.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#33272B] tracking-tight">
            {activeTopic.title}
          </h1>

          <p className="mt-3 text-base text-[#554247] leading-relaxed">
            {activeTopic.subtitle}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {activeTopic.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-md bg-[#FFF7F4] text-[#B83250] border border-[#F5D8DE]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Section 1: Overview */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5D8DE] shadow-xs space-y-3">
          <h2 className="text-xl font-bold font-serif text-[#33272B] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#B83250]" />
            What is {activeTopic.title}?
          </h2>
          <p className="text-sm sm:text-base text-[#554247] leading-relaxed">
            {activeTopic.overview}
          </p>
        </section>

        {/* Section 2: Symptoms & Signs */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5D8DE] shadow-xs space-y-4">
          <h2 className="text-xl font-bold font-serif text-[#33272B] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#B83250]" />
            Common Symptoms & Signs to Notice
          </h2>
          <p className="text-xs sm:text-sm text-[#554247]">
            Symptoms can vary widely between individuals. Experiencing some of these signs is common, but only a healthcare provider can evaluate them clinically.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {activeTopic.commonSymptoms.map((symptom, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#FFF7F4]/60 border border-[#F5D8DE] text-xs sm:text-sm text-[#33272B] flex items-start gap-2.5"
              >
                <div className="w-2 h-2 rounded-full bg-[#B83250] mt-1.5 shrink-0" />
                <span>{symptom}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Why It Occurs */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5D8DE] shadow-xs space-y-4">
          <h2 className="text-xl font-bold font-serif text-[#33272B] flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#B83250]" />
            Why It Can Occur (Evidence-Based Mechanisms)
          </h2>
          <div className="space-y-3">
            {activeTopic.whyItOccurs.map((reason, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-[#F5D8DE] hover:border-[#E8A0AD] transition-all text-xs sm:text-sm text-[#554247] leading-relaxed"
              >
                {reason}
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Common Misconceptions (Myth vs Fact) */}
        {activeTopic.commonMisconceptions && activeTopic.commonMisconceptions.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5D8DE] shadow-xs space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#33272B] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Common Misconceptions Debunked
            </h2>
            <div className="space-y-3 pt-1">
              {activeTopic.commonMisconceptions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gradient-to-r from-red-50/40 to-emerald-50/40 border border-gray-200 space-y-2"
                >
                  <div className="text-xs font-semibold text-red-900 flex items-start gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-[10px] uppercase font-bold shrink-0">
                      Myth
                    </span>
                    <span>"{item.myth}"</span>
                  </div>
                  <div className="text-xs sm:text-sm text-emerald-950 flex items-start gap-2 pl-0 sm:pl-1">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold shrink-0">
                      Fact
                    </span>
                    <span className="leading-relaxed">{item.fact}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: When to Seek Medical Advice */}
        <section className="bg-red-50/50 rounded-3xl p-6 sm:p-8 border border-red-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-serif text-red-950 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              When Someone Should Seek Medical Advice
            </h2>
            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="text-xs font-semibold text-red-700 hover:text-red-900 underline"
            >
              Emergency Helplines
            </button>
          </div>
          <p className="text-xs sm:text-sm text-red-900/80">
            Prompt medical consultation is recommended if you experience any of the following indicators:
          </p>
          <div className="space-y-2.5">
            {activeTopic.whenToSeekMedicalAdvice.map((warning, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white border border-red-200 text-xs sm:text-sm text-red-900 flex items-start gap-2.5"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <span>{warning}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Questions for Doctor */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5D8DE] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold font-serif text-[#33272B] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#B83250]" />
                Questions to Ask Your Healthcare Professional
              </h2>
              <p className="text-xs text-[#554247] mt-1">
                Save these questions directly to your 1-page health summary before your appointment.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {activeTopic.questionsForDoctor.map((qText, idx) => {
              const isAlreadyAdded = doctorQuestions.some(
                (dq) => dq.text.trim().toLowerCase() === qText.trim().toLowerCase()
              );
              const isJustAdded = !!addedQuestionMap[qText];

              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#FFF7F4]/60 border border-[#F5D8DE] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <span className="text-xs sm:text-sm text-[#33272B] leading-relaxed">
                    {qText}
                  </span>
                  <button
                    onClick={() => handleAddQuestionToPrep(qText, activeTopic.title)}
                    disabled={isAlreadyAdded && !isJustAdded}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                      isAlreadyAdded || isJustAdded
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-[#B83250] text-white hover:bg-[#911F37]'
                    }`}
                  >
                    {isAlreadyAdded || isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Saved to My Doctor Prep</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Save Question</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 7: Reliable Sources & References */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5D8DE] shadow-xs space-y-3">
          <h3 className="text-base font-bold font-serif text-[#33272B] flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-[#B83250]" />
            Authoritative Sources for Further Reading
          </h3>
          <p className="text-xs text-[#554247]">
            Content verified against leading clinical and public health organizations. No fabricated citations or unproven claims.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {activeTopic.reliableSources.map((source, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-[#FFF7F4] border border-[#E8A0AD] text-xs font-medium text-[#33272B]"
              >
                {source.name}
              </span>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Otherwise, render the searchable and category-filtered grid
  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8A0AD] text-[#B83250] text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Women's Health Education Library</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#33272B]">
          Explore Health Conditions
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#554247]">
          Reliable, beginner-friendly medical guides written without scare tactics or medical jargon. Filter by category or search symptoms.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4">
        <div className="relative max-w-xl">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search PCOS, heavy periods, breast lump, iron deficiency, thyroid..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-[#E8A0AD] shadow-xs text-sm text-[#33272B] placeholder:text-gray-400 focus:outline-hidden focus:border-[#B83250] focus:ring-2 focus:ring-[#B83250]/10 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded-md"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[#B83250] text-white shadow-xs'
                  : 'bg-white text-[#554247] border border-[#F5D8DE] hover:border-[#E8A0AD] hover:bg-[#FFF7F4]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#F5D8DE]">
          <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-lg text-[#33272B]">No conditions matched</h3>
          <p className="text-xs text-[#554247] mt-1 max-w-sm mx-auto">
            Try searching with broader terms like "period", "pain", "hormones", or clear your filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#B83250] text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className="bg-white rounded-3xl p-6 border border-[#F5D8DE] hover:border-[#E8A0AD] shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F2] text-[#B83250] font-semibold border border-[#F5D8DE] text-[11px]">
                    {topic.category}
                  </span>
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {topic.readTime}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-[#33272B] group-hover:text-[#B83250] transition-colors leading-snug">
                  {topic.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#554247] mt-2 line-clamp-3 leading-relaxed">
                  {topic.overview}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {topic.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-[#FFF7F4] text-[#554247] border border-[#F5D8DE]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#B83250] group-hover:translate-x-1 transition-transform">
                <span>View Complete Guide & Doctor Questions</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
