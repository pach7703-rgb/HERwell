import { CareSpecialist, CareUrgency } from '../types';

export const CARE_SPECIALISTS: CareSpecialist[] = [
  {
    id: 'gynaecologist',
    specialty: 'Obstetrics & Gynaecology (OB-GYN)',
    title: 'Gynaecologist',
    badge: 'Reproductive & Menstrual Health',
    roleDescription:
      'A physician who specializes in the female reproductive system, menstrual disorders, pelvic pain, contraception, fertility, and pregnancy.',
    typicalConcerns: [
      'Irregular, missed, heavy, or excessively painful periods',
      'Pelvic pain, cramping not relieved by common painkillers',
      'Suspected PCOS, endometriosis, fibroids, or ovarian cysts',
      'Unusual vaginal discharge, burning, odor, or pelvic infection',
      'Contraceptive counseling, pre-conception planning, and Pap smears',
    ],
    urgencyLevel: 'Prompt (within 24-48 hrs)',
    whatToExpect: [
      'Detailed discussion of your menstrual cycle history (first day of last period, cycle length, flow duration).',
      'External and internal pelvic examination if clinically indicated and with your informed consent.',
      'Order for pelvic ultrasound (transabdominal or transvaginal) and hormonal blood panels.',
    ],
    questionsToPrepare: [
      'First day of last menstrual period (LMP)',
      'List of tracked symptoms and severity notes from HERwell',
      'Any medications, supplements, or contraceptive methods currently in use',
      'Questions regarding treatment options and ultrasound findings',
    ],
    helplineIndia: 'Women Helpline: 181 | FOGSI Guidance',
  },
  {
    id: 'endocrinologist',
    specialty: 'Endocrinology & Metabolism',
    title: 'Endocrinologist',
    badge: 'Hormones, Thyroid & Metabolism',
    roleDescription:
      'A medical doctor specialized in hormone-producing glands and metabolic conditions affecting weight, blood sugar, and systemic balance.',
    typicalConcerns: [
      'Complex or treatment-resistant PCOS with insulin resistance',
      'Thyroid conditions (Hypothyroidism, Hyperthyroidism, Hashimoto’s)',
      'Unexplained significant weight changes, hair thinning, or excess facial hair (hirsutism)',
      'Gestational diabetes or prediabetes screening and management',
      'Bone density loss (osteoporosis) and calcium metabolism',
    ],
    urgencyLevel: 'Routine / Scheduled',
    whatToExpect: [
      'Palpation of the thyroid gland at the front of your neck.',
      'Comprehensive review of metabolic lab work (Fasting Glucose, HbA1c, Fasting Insulin, TSH, Free T3/T4, Lipid profile).',
      'Evaluation of systemic signs such as blood pressure, skin pigmentation, and hair distribution.',
    ],
    questionsToPrepare: [
      'Recent blood test results and thyroid history',
      'Log of energy levels, temperature sensitivity, and weight trends',
      'Family history of diabetes, autoimmune disease, or thyroid disorders',
    ],
  },
  {
    id: 'general-physician',
    specialty: 'Internal Medicine / Family Practice',
    title: 'Primary Care Physician / General Practitioner',
    badge: 'First Point of Clinical Care',
    roleDescription:
      'A qualified clinician who assesses overall health, performs routine examinations, diagnoses general ailments, and coordinates specialist referrals.',
    typicalConcerns: [
      'Unexplained chronic fatigue, weakness, or feeling run down',
      'Screening for nutritional deficiencies like anaemia (low iron/ferritin) or vitamin B12/D',
      'Routine health checkups, blood pressure monitoring, and preventive care',
      'Headaches, non-specific abdominal discomfort, or sleep problems',
      'Unsure which specialist to consult for overlapping symptoms',
    ],
    urgencyLevel: 'Routine / Scheduled',
    whatToExpect: [
      'Vital signs check (Blood pressure, heart rate, temperature, oxygen saturation).',
      'Comprehensive review of physical symptoms and lifestyle factors.',
      'Initial baseline investigations (CBC, Iron profile, liver & kidney function, urine routine).',
    ],
    questionsToPrepare: [
      'Summary of chief symptoms and their onset',
      'HERwell 1-page health summary printout',
      'List of all current medications, vitamins, and allergies',
    ],
    helplineIndia: 'National Health Portal (MoHFW): 1800-180-1104',
  },
  {
    id: 'breast-specialist',
    specialty: 'Breast Surgery / Surgical Oncology',
    title: 'Breast Surgeon / Specialist',
    badge: 'Clinical Breast Evaluation',
    roleDescription:
      'A physician or surgeon specialized in evaluating and treating benign breast changes as well as breast tumors.',
    typicalConcerns: [
      'New, firm, painless, or asymmetric lump in breast or armpit',
      'Skin dimpling, puckering, or nipple retraction',
      'Spontaneous or blood-stained nipple discharge',
      'Persistent localized breast pain not correlating with cycle',
    ],
    urgencyLevel: 'Prompt (within 24-48 hrs)',
    whatToExpect: [
      'Bilateral clinical breast examination and examination of regional lymph nodes (armpit and collarbone).',
      'Appropriate diagnostic imaging: Breast ultrasound for younger women (<40) or diagnostic mammogram.',
      'Reassurance or core needle biopsy if a suspicious discrete mass is identified.',
    ],
    questionsToPrepare: [
      'When the change or lump was first felt and whether its size has fluctuated',
      'Personal or family history of breast, ovarian, or related conditions',
      'Any previous mammograms or ultrasound reports for comparison',
    ],
  },
  {
    id: 'dermatologist',
    specialty: 'Dermatology & Trichology',
    title: 'Dermatologist',
    badge: 'Skin, Scalp & Hormonal Acne',
    roleDescription:
      'A specialist diagnosing and treating diseases and disorders of the skin, scalp, hair, and nails, including hormonal manifestations.',
    typicalConcerns: [
      'Cystic, painful hormonal acne along jawline, chin, and back resistant to over-the-counter washes',
      'Rapid scalp hair shedding, widening hair parting, or androgenic alopecia',
      'Darkened velvety skin folds (acanthosis nigricans) around neck or armpits',
      'Excessive facial or body hair growth',
    ],
    urgencyLevel: 'Routine / Scheduled',
    whatToExpect: [
      'Dermoscopic examination of scalp hair follicles and density.',
      'Visual examination of skin lesions and inflammatory acne grades.',
      'Coordination with gynaecologist/endocrinologist if PCOS is suspected.',
    ],
    questionsToPrepare: [
      'Current skincare routine, topical creams, and cosmetics used',
      'Timeline of hair loss or acne outbreaks',
      'Co-existing menstrual irregularity or diagnosed hormonal conditions',
    ],
  },
  {
    id: 'cardiologist',
    specialty: 'Cardiology',
    title: 'Cardiologist',
    badge: 'Heart & Vascular Care',
    roleDescription:
      'A physician specialized in diseases of the heart and blood vessels, with expertise in women’s cardiovascular health patterns.',
    typicalConcerns: [
      'Unexplained shortness of breath with mild exertion',
      'Heart palpitations, racing pulse, or fluttering sensations in chest',
      'Chest tightness, burning, or aching radiating to jaw, shoulder, or back',
      'Persistent hypertension (high blood pressure > 130/85 mmHg)',
      'History of preeclampsia, gestational diabetes, or early menopause',
    ],
    urgencyLevel: 'Prompt (within 24-48 hrs)',
    whatToExpect: [
      'Resting 12-lead Electrocardiogram (ECG).',
      'Echocardiogram (ultrasound of the heart) to evaluate valves and pumping function.',
      'Blood tests for troponin, lipid panel, and cardiac biomarkers.',
    ],
    questionsToPrepare: [
      'History of blood pressure readings at home',
      'Description of triggers (exercise, stress, rest) for breathlessness or fluttering',
      'Any past pregnancy complications involving blood pressure or sugar',
    ],
    helplineIndia: 'Emergency Ambulance: 108 / 112',
  },
  {
    id: 'mental-health-specialist',
    specialty: 'Psychiatry & Clinical Psychology',
    title: 'Mental Health Professional (Psychologist / Psychiatrist)',
    badge: 'Emotional Wellbeing & PMDD',
    roleDescription:
      'Mental healthcare providers trained in supporting women through stress, depression, anxiety, trauma, and reproductive mood disorders (PMDD, postpartum depression, perimenopausal anxiety).',
    typicalConcerns: [
      'Severe mood shifts, despair, or rage in the 7-10 days before menstrual bleeding (PMDD)',
      'Chronic anxiety, panic attacks, or persistent depressive feelings',
      'Postpartum anxiety, feeling unable to bond with baby, or intrusive thoughts',
      'Burnout, chronic insomnia, and emotional exhaustion',
    ],
    urgencyLevel: 'Routine / Scheduled',
    whatToExpect: [
      'Compassionate, confidential diagnostic assessment and history taking.',
      'Collaborative discussion about therapeutic modalities (CBT, ACT, supportive psychotherapy).',
      'Discussion of pharmacological options (like selective serotonin reuptake inhibitors) if indicated and requested.',
    ],
    questionsToPrepare: [
      'Notes on when low moods or panic spikes occur (e.g. cycle correlation)',
      'Any major life stressors, sleep patterns, and physical symptoms',
      'Your goals for therapy or treatment',
    ],
    helplineIndia: 'Tele-MANAS (MoHFW): 14416 (Toll-Free 24x7) | Vandrevala Foundation: 9999 666 555',
  },
  {
    id: 'urologist',
    specialty: 'Urology / Urogynaecology',
    title: 'Urologist / Urogynaecologist',
    badge: 'Urinary System & Pelvic Floor',
    roleDescription:
      'Physicians who specialize in conditions of the female urinary tract (kidneys, ureters, bladder, urethra) and pelvic floor reconstructive health.',
    typicalConcerns: [
      'Recurrent urinary tract infections (3+ per year)',
      'Involuntary leakage of urine with coughing or laughing (stress urinary incontinence)',
      'Sudden intense urge to urinate with inability to reach the bathroom in time (urge incontinence)',
      'Chronic bladder pain or feeling of incomplete bladder emptying',
    ],
    urgencyLevel: 'Routine / Scheduled',
    whatToExpect: [
      'Urine culture review and pelvic floor muscle tone evaluation.',
      'Post-void residual bladder scan via ultrasound.',
      'Urodynamic studies or cystoscopy if bladder pain or recurrent infection warrants deeper visualization.',
    ],
    questionsToPrepare: [
      'Frequency of daytime and nighttime urination',
      'List of past antibiotic courses taken for bladder infections',
      'Fluid intake habits (water, coffee, tea)',
    ],
  },
];

export interface SymptomTriageMatch {
  concernId: string;
  concernLabel: string;
  recommendedSpecialistId: string;
  urgency: CareUrgency;
  urgencyNote: string;
  reasoning: string;
  emergencyWarning?: string;
}

export const SYMPTOM_TRIAGE_MATCHES: SymptomTriageMatch[] = [
  {
    concernId: 'heavy-painful-periods',
    concernLabel: 'Severe period cramps, heavy bleeding, or irregular cycles',
    recommendedSpecialistId: 'gynaecologist',
    urgency: 'Prompt (within 24-48 hrs)',
    urgencyNote: 'Schedule a visit within a few days or weeks; sooner if bleeding is causing dizziness or weakness.',
    reasoning: 'Gynaecologists specialize in hormonal evaluations, pelvic ultrasound, and diagnosing PCOS, endometriosis, and fibroids.',
    emergencyWarning: 'If soaking through two or more maxi pads per hour for two hours with faintness, seek emergency medical care immediately.',
  },
  {
    concernId: 'breast-lump',
    concernLabel: 'New lump, skin dimpling, or spontaneous nipple discharge',
    recommendedSpecialistId: 'breast-specialist',
    urgency: 'Prompt (within 24-48 hrs)',
    urgencyNote: 'Prompt clinical evaluation is advised within a few days for diagnostic breast imaging.',
    reasoning: 'Clinical breast examination and targeted ultrasound or mammography are essential to evaluate any new or firm breast change.',
  },
  {
    concernId: 'chronic-fatigue',
    concernLabel: 'Persistent, unexplained fatigue, pale skin, weakness, or cold intolerance',
    recommendedSpecialistId: 'general-physician',
    urgency: 'Routine / Scheduled',
    urgencyNote: 'Schedule a routine consultation for laboratory blood work.',
    reasoning: 'A primary care physician can evaluate widespread nutritional deficiencies like iron deficiency anaemia (ferritin) or screen thyroid function.',
  },
  {
    concernId: 'acne-hair-thinning',
    concernLabel: 'Hormonal jawline acne, unwanted facial hair, or scalp hair loss',
    recommendedSpecialistId: 'dermatologist',
    urgency: 'Routine / Scheduled',
    urgencyNote: 'Schedule a routine clinic consultation.',
    reasoning: 'Dermatologists assess hair follicle health and acne grade, and frequently co-manage hormonal factors alongside a gynaecologist or endocrinologist.',
  },
  {
    concernId: 'urinary-burning',
    concernLabel: 'Pain or burning during urination, urinary urgency, or cloudy urine',
    recommendedSpecialistId: 'general-physician',
    urgency: 'Prompt (within 24-48 hrs)',
    urgencyNote: 'Seek prompt assessment within 24 hours to obtain a urine culture and appropriate antibiotics if bacterial.',
    reasoning: 'Prompt medical attention prevents uncomplicated bladder infections from ascending into the kidneys.',
    emergencyWarning: 'If accompanied by high fever (>101°F), chills, back/side pain, or vomiting, go to the emergency room immediately.',
  },
  {
    concernId: 'premenstrual-mood',
    concernLabel: 'Severe mood swings, depression, or intense rage in the week before periods (suspected PMDD)',
    recommendedSpecialistId: 'mental-health-specialist',
    urgency: 'Routine / Scheduled',
    urgencyNote: 'Book an appointment for comprehensive psychological and hormonal evaluation.',
    reasoning: 'Mental health professionals and gynaecologists collaborate to treat PMDD through targeted evidence-based therapies and cycle symptom tracking.',
    emergencyWarning: 'If you experience thoughts of self-harm, immediately call Tele-MANAS (14416) or National Emergency (112).',
  },
  {
    concernId: 'chest-flutter-breathless',
    concernLabel: 'Sudden shortness of breath, chest pressure, dizziness, or rapid pulse',
    recommendedSpecialistId: 'cardiologist',
    urgency: 'Emergency',
    urgencyNote: 'Immediate emergency evaluation required.',
    reasoning: 'Atypical cardiovascular signs in women can be subtle. Immediate evaluation via ECG and cardiac markers is critical.',
    emergencyWarning: 'Call 112 / 108 or go to the nearest emergency room immediately.',
  },
  {
    concernId: 'hot-flashes-perimenopause',
    concernLabel: 'Hot flashes, night sweats, brain fog, and menstrual cycle changes in late 30s/40s+',
    recommendedSpecialistId: 'gynaecologist',
    urgency: 'Routine / Scheduled',
    urgencyNote: 'Schedule a routine consultation for perimenopause and hormone management guidance.',
    reasoning: 'Gynaecologists assess menopausal hormone therapy (MHT) suitability and screen for bone and cardiovascular health.',
  },
];
