import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageTab, SymptomLog, DoctorQuestion, ServerStatus } from '../types';
import { SAMPLE_SYMPTOM_LOGS, SAMPLE_DOCTOR_QUESTIONS } from '../data/sampleData';

interface HealthContextType {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  selectedTopicId: string | null;
  setSelectedTopicId: (id: string | null) => void;
  viewTopic: (topicId: string) => void;
  symptoms: SymptomLog[];
  addSymptom: (log: Omit<SymptomLog, 'id' | 'createdAt'>) => void;
  updateSymptom: (id: string, log: Partial<SymptomLog>) => void;
  deleteSymptom: (id: string) => void;
  clearAllSymptoms: () => void;
  doctorQuestions: DoctorQuestion[];
  addDoctorQuestion: (text: string, category?: string, sourceTopicTitle?: string) => void;
  toggleDoctorQuestion: (id: string) => void;
  deleteDoctorQuestion: (id: string) => void;
  isEmergencyOpen: boolean;
  setIsEmergencyOpen: (open: boolean) => void;
  serverStatus: ServerStatus | null;
  refreshServerStatus: () => Promise<void>;
  isSampleDataActive: boolean;
  loadSampleData: () => void;
  resetToEmptyData: () => void;
  pendingCompanionPrompt: string | null;
  setPendingCompanionPrompt: (prompt: string | null) => void;
  startChatWithPrompt: (prompt: string) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<PageTab>('dashboard');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [pendingCompanionPrompt, setPendingCompanionPrompt] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);

  // Symptoms state with localStorage persistence
  const [symptoms, setSymptoms] = useState<SymptomLog[]>(() => {
    try {
      const stored = localStorage.getItem('herwell_symptoms');
      if (stored) {
        return JSON.parse(stored);
      }
      return SAMPLE_SYMPTOM_LOGS;
    } catch {
      return SAMPLE_SYMPTOM_LOGS;
    }
  });

  // Doctor Questions state with localStorage persistence
  const [doctorQuestions, setDoctorQuestions] = useState<DoctorQuestion[]>(() => {
    try {
      const stored = localStorage.getItem('herwell_questions');
      if (stored) {
        return JSON.parse(stored);
      }
      return SAMPLE_DOCTOR_QUESTIONS;
    } catch {
      return SAMPLE_DOCTOR_QUESTIONS;
    }
  });

  // Check if current data contains sample records
  const isSampleDataActive = symptoms.some((s) => s.id.startsWith('sample-'));

  // Save to localStorage whenever symptoms change
  useEffect(() => {
    try {
      localStorage.setItem('herwell_symptoms', JSON.stringify(symptoms));
    } catch (e) {
      console.error('Failed to save symptoms to local storage', e);
    }
  }, [symptoms]);

  // Save to localStorage whenever doctor questions change
  useEffect(() => {
    try {
      localStorage.setItem('herwell_questions', JSON.stringify(doctorQuestions));
    } catch (e) {
      console.error('Failed to save doctor questions to local storage', e);
    }
  }, [doctorQuestions]);

  // Fetch server status on mount
  const refreshServerStatus = async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setServerStatus(data);
      }
    } catch (e) {
      console.warn('Could not contact /api/status endpoint:', e);
      setServerStatus({
        appName: 'HERwell',
        hasApiKey: false,
        model: 'gemini-3.8-flash',
        mode: 'demo',
        timestamp: new Date().toISOString(),
      });
    }
  };

  useEffect(() => {
    refreshServerStatus();
  }, []);

  const addSymptom = (log: Omit<SymptomLog, 'id' | 'createdAt'>) => {
    const newLog: SymptomLog = {
      ...log,
      id: 'log-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setSymptoms((prev) => [newLog, ...prev]);
  };

  const updateSymptom = (id: string, updated: Partial<SymptomLog>) => {
    setSymptoms((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteSymptom = (id: string) => {
    setSymptoms((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllSymptoms = () => {
    setSymptoms([]);
  };

  const addDoctorQuestion = (text: string, category = 'General', sourceTopicTitle?: string) => {
    // Avoid duplicate text
    if (doctorQuestions.some((q) => q.text.trim().toLowerCase() === text.trim().toLowerCase())) {
      return;
    }
    const newQ: DoctorQuestion = {
      id: 'q-' + Date.now(),
      text,
      category,
      checked: false,
      sourceTopicTitle,
      createdAt: new Date().toISOString(),
    };
    setDoctorQuestions((prev) => [newQ, ...prev]);
  };

  const toggleDoctorQuestion = (id: string) => {
    setDoctorQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, checked: !q.checked } : q))
    );
  };

  const deleteDoctorQuestion = (id: string) => {
    setDoctorQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const loadSampleData = () => {
    setSymptoms(SAMPLE_SYMPTOM_LOGS);
    setDoctorQuestions(SAMPLE_DOCTOR_QUESTIONS);
  };

  const resetToEmptyData = () => {
    setSymptoms([]);
    setDoctorQuestions([]);
  };

  const viewTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveTab('topics');
  };

  const startChatWithPrompt = (prompt: string) => {
    setPendingCompanionPrompt(prompt);
    setActiveTab('companion');
  };

  return (
    <HealthContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedTopicId,
        setSelectedTopicId,
        viewTopic,
        symptoms,
        addSymptom,
        updateSymptom,
        deleteSymptom,
        clearAllSymptoms,
        doctorQuestions,
        addDoctorQuestion,
        toggleDoctorQuestion,
        deleteDoctorQuestion,
        isEmergencyOpen,
        setIsEmergencyOpen,
        serverStatus,
        refreshServerStatus,
        isSampleDataActive,
        loadSampleData,
        resetToEmptyData,
        pendingCompanionPrompt,
        setPendingCompanionPrompt,
        startChatWithPrompt,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
