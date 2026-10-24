import React, { useState, useEffect, useRef } from 'react';
import { useHealth } from '../context/HealthContext';
import { ChatMessage } from '../types';
import {
  Bot,
  User,
  Send,
  Trash2,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  Plus,
  Check,
  RefreshCw,
  Heart,
} from 'lucide-react';

const STARTER_PROMPTS = [
  'Why might my periods be irregular?',
  'What is the difference between PCOS and endometriosis?',
  'What should I discuss with a gynaecologist?',
  'Help me understand my symptoms.',
  'When should I seek urgent medical care?',
];

export const AiCompanionPage: React.FC = () => {
  const {
    serverStatus,
    setIsEmergencyOpen,
    addDoctorQuestion,
    pendingCompanionPrompt,
    setPendingCompanionPrompt,
    symptoms,
  } = useHealth();

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: `Hello! I am your **HERwell Health Companion**. 

I am here to help you understand women's health conditions, explore what might be contributing to changes in your body, and prepare questions for your doctor. 

*Please note: I provide supportive health education, not medical diagnoses. I cannot prescribe medicines or replace an evaluation by a licensed doctor.*

How can I help you today? You can choose a suggested question below or type your concern.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: 'live',
        suggestedFollowUps: [
          'Why might my periods be irregular?',
          'What is the difference between PCOS and endometriosis?',
          'What should I discuss with a gynaecologist?',
        ],
      },
    ];
  });

  const [savedQuestionAlert, setSavedQuestionAlert] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle incoming prompt passed from other pages (e.g. Dashboard or Topics)
  useEffect(() => {
    if (pendingCompanionPrompt) {
      sendMessage(pendingCompanionPrompt);
      setPendingCompanionPrompt(null);
    }
  }, [pendingCompanionPrompt]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userText = textToSend.trim();
    setInputMessage('');

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Build context if user has recorded symptoms
    let contextNote = '';
    if (symptoms.length > 0) {
      contextNote = `User has logged ${symptoms.length} symptoms in HERwell. Recent entry: "${symptoms[0].symptomName}" (Severity: ${symptoms[0].severity}/10, Frequency: ${symptoms[0].frequency}, Phase: ${symptoms[0].menstrualPhase || 'N/A'}).`;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: messages.map((m) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content,
          })),
          context: contextNote,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: data.isEmergency ? 'emergency' : 'assistant',
        content: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: data.mode || (serverStatus?.hasApiKey ? 'live' : 'demo'),
        suggestedFollowUps: data.followUps || [
          'What questions should I ask my doctor about this?',
          'Which healthcare specialist is right for these symptoms?',
        ],
        isEmergencyAlert: data.isEmergency,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      // Graceful fallback display
      const fallbackMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: `Thank you for sharing your question. While exploring this symptom:

* Bodily changes can relate to multiple factors, including cycle phases, hormonal shifts, nutritional status (such as anaemia), and stress.
* Tracking your symptoms for 2 to 3 cycles in the **HERwell Symptom Tracker** creates an objective record for your doctor.
* If symptoms persist, interfere with your activities, or cause distress, consulting a primary physician or gynaecologist is strongly recommended.

*Would you like to explore related topics in the Condition Library or find the right care specialist?*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: 'demo',
        suggestedFollowUps: [
          'What questions should I ask a gynaecologist?',
          'When should I seek urgent medical care?',
        ],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-cleared',
        role: 'assistant',
        content:
          'Chat history cleared. How can I assist you with women’s health education today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: 'live',
        suggestedFollowUps: STARTER_PROMPTS.slice(0, 3),
      },
    ]);
  };

  const handleSaveQuestion = (questionText: string) => {
    addDoctorQuestion(questionText, 'From Chat Assistant');
    setSavedQuestionAlert(`Saved: "${questionText}" to your doctor questions!`);
    setTimeout(() => setSavedQuestionAlert(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fade-in pb-12">
      {/* Header with Mode & Status */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F5D8DE] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-[#FFF0F2] text-[#B83250] flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#33272B]">
                AI Health Companion
              </h1>
              <p className="text-xs text-[#554247]">
                Empathetic, non-judgmental guidance grounded in medical safety
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status pill */}
          <div className="px-3 py-1 rounded-full bg-[#FFF7F4] border border-[#E8A0AD] text-[11px] font-medium flex items-center gap-1.5 text-[#33272B]">
            <span
              className={`w-2 h-2 rounded-full ${
                serverStatus?.liveVerified ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span>
              {serverStatus?.liveVerified
                ? 'Gemini 3.8 Flash (Live)'
                : 'Educational Demo Knowledge Base'}
            </span>
          </div>

          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-[#FFF0F2]/70 border border-[#F5D8DE] rounded-2xl p-3 text-xs text-[#554247] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#B83250] shrink-0" />
          <span>
            <strong>Safety Guardrails:</strong> The companion never provides definitive clinical diagnoses or medication prescriptions.
          </span>
        </div>
        <button
          onClick={() => setIsEmergencyOpen(true)}
          className="text-[#B83250] hover:text-[#911F37] font-semibold underline shrink-0 cursor-pointer text-[11px]"
        >
          Emergency Signs
        </button>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-[#F5D8DE] shadow-xs flex flex-col h-[520px] overflow-hidden">
        {/* Messages scroll area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isEmergency = msg.role === 'emergency' || msg.isEmergencyAlert;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${
                      isEmergency ? 'bg-red-600' : 'bg-[#B83250]'
                    }`}
                  >
                    {isEmergency ? <AlertTriangle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                  <div
                    className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                      isUser
                        ? 'bg-[#B83250] text-white rounded-tr-xs'
                        : isEmergency
                        ? 'bg-red-50 border border-red-200 text-red-950 rounded-tl-xs'
                        : 'bg-[#FFF7F4] border border-[#F5D8DE] text-[#33272B] rounded-tl-xs'
                    }`}
                  >
                    {msg.content}

                    {/* Mode tag */}
                    {!isUser && msg.mode && (
                      <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-[10px] text-gray-500">
                        <span>
                          {msg.mode === 'live'
                            ? 'Generated via Gemini 3.8 Flash'
                            : 'Curated Educational Knowledge Base'}
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>
                    )}
                  </div>

                  {/* Emergency CTA button if emergency detected */}
                  {isEmergency && (
                    <div className="p-3 bg-red-100 border border-red-300 rounded-2xl flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-red-900">
                        Immediate medical evaluation advised
                      </span>
                      <button
                        onClick={() => setIsEmergencyOpen(true)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
                      >
                        View Helplines (112 / 108)
                      </button>
                    </div>
                  )}

                  {/* Suggested follow-up prompt pills */}
                  {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-semibold text-[#554247] flex items-center gap-1">
                        <HelpCircle className="w-3 h-3 text-[#B83250]" />
                        <span>Suggested follow-up explorations:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((promptText, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <button
                              onClick={() => sendMessage(promptText)}
                              className="text-left text-[11px] px-3 py-1.5 rounded-xl bg-white border border-[#E8A0AD] hover:bg-[#FFF7F4] text-[#B83250] font-medium transition-colors cursor-pointer"
                            >
                              {promptText}
                            </button>
                            <button
                              onClick={() => handleSaveQuestion(promptText)}
                              title="Save to Doctor Prep Questions"
                              className="p-1.5 rounded-lg bg-white border border-[#E8A0AD] text-[#554247] hover:text-[#B83250] hover:bg-[#FFF7F4] transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-[#E8A0AD] text-[#33272B] flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#B83250] text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-3xl rounded-tl-xs bg-[#FFF7F4] border border-[#F5D8DE] text-xs text-[#554247] flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#B83250] animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-[#B83250] animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#B83250] animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
                <span>HERwell is formulating safe, supportive guidance...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Saved question alert notification */}
        {savedQuestionAlert && (
          <div className="bg-emerald-50 border-t border-emerald-200 px-4 py-2 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{savedQuestionAlert}</span>
          </div>
        )}

        {/* Input box */}
        <form
          onSubmit={handleSubmit}
          className="p-3 sm:p-4 bg-[#FFF7F4]/60 border-t border-[#F5D8DE] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about symptoms, conditions, doctor prep, or body changes..."
            className="flex-1 px-4 py-3 rounded-2xl bg-white border border-[#E8A0AD] text-xs sm:text-sm text-[#33272B] focus:outline-hidden focus:border-[#B83250] focus:ring-2 focus:ring-[#B83250]/10 transition-all placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="p-3 rounded-2xl bg-[#B83250] text-white hover:bg-[#911F37] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Starter Prompts Carousel */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-[#554247] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#B83250]" />
          <span>Popular Conversation Starters:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {STARTER_PROMPTS.map((promptText, i) => (
            <button
              key={i}
              onClick={() => sendMessage(promptText)}
              className="text-xs whitespace-nowrap px-3.5 py-2 rounded-xl bg-white border border-[#F5D8DE] hover:border-[#E8A0AD] hover:bg-[#FFF7F4] text-[#33272B] transition-all cursor-pointer shadow-2xs font-medium"
            >
              {promptText}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
