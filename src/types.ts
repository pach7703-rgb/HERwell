export type PageTab =
  | 'dashboard'
  | 'topics'
  | 'companion'
  | 'tracker'
  | 'summary'
  | 'care'
  | 'about';

export type TopicCategory =
  | 'All'
  | 'Hormonal & Reproductive'
  | 'Menstrual Health'
  | 'Pain & Discomfort'
  | 'Metabolic & Nutrition'
  | 'General & Preventive'
  | 'Mental Wellbeing';

export interface TopicSource {
  name: string;
  url?: string;
  organization: string;
}

export interface HealthTopic {
  id: string;
  title: string;
  subtitle: string;
  category: TopicCategory;
  tags: string[];
  readTime: string;
  overview: string;
  commonSymptoms: string[];
  whyItOccurs: string[];
  commonMisconceptions: { myth: string; fact: string }[];
  whenToSeekMedicalAdvice: string[];
  questionsForDoctor: string[];
  reliableSources: TopicSource[];
  isFeatured?: boolean;
}

export type MenstrualPhase =
  | 'Menstrual (Bleeding)'
  | 'Follicular (Pre-ovulation)'
  | 'Ovulation'
  | 'Luteal (Post-ovulation / Pre-period)'
  | 'Irregular / Unsure'
  | 'Not Applicable / Skip';

export type SymptomFrequency =
  | 'One-time / Rare'
  | 'Intermittent (comes and goes)'
  | 'Constant / Daily'
  | 'Cyclical (same time in cycle)';

export interface SymptomLog {
  id: string;
  symptomName: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  severity: number; // 1 to 10
  frequency: SymptomFrequency;
  associatedSymptoms: string[];
  menstrualPhase?: MenstrualPhase;
  doctorNotes?: string;
  createdAt: string;
}

export interface DoctorQuestion {
  id: string;
  text: string;
  category: string;
  checked: boolean;
  sourceTopicTitle?: string;
  notes?: string;
  createdAt: string;
}

export type CareUrgency = 'Emergency' | 'Prompt (within 24-48 hrs)' | 'Routine / Scheduled';

export interface CareSpecialist {
  id: string;
  specialty: string;
  title: string;
  badge: string;
  roleDescription: string;
  typicalConcerns: string[];
  urgencyLevel: CareUrgency;
  whatToExpect: string[];
  questionsToPrepare: string[];
  helplineIndia?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'emergency';
  content: string;
  timestamp: string;
  mode?: 'live' | 'demo';
  suggestedFollowUps?: string[];
  isEmergencyAlert?: boolean;
}

export interface ServerStatus {
  appName: string;
  hasApiKey: boolean;
  liveVerified?: boolean;
  model: string;
  mode: 'live' | 'demo';
  note?: string;
  setupPath?: string;
  timestamp: string;
}
