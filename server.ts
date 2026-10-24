import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json());

// Initialize Gemini Client server-side if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('HERwell Gemini AI integration initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize Gemini AI client:', error);
  }
} else {
  console.log('GEMINI_API_KEY not configured or placeholder detected; Educational Demo Mode will be active.');
}

// Health status endpoint
let liveApiVerified = false;
let apiErrorMessage = '';

// Test the Gemini key on startup if provided
if (aiClient) {
  aiClient.models
    .generateContent({
      model: 'gemini-3.8-flash',
      contents: 'Ping',
    })
    .then(() => {
      liveApiVerified = true;
      console.log('Gemini 3.8 Flash live connection verified.');
    })
    .catch((err) => {
      liveApiVerified = false;
      apiErrorMessage = err?.message || 'Permission denied or quota exceeded.';
      console.warn('Gemini API active key requires configuration or permission approval:', apiErrorMessage);
    });
}

app.get('/api/status', (req, res) => {
  res.json({
    appName: 'HERwell',
    hasApiKey: !!aiClient,
    liveVerified: liveApiVerified,
    model: 'gemini-3.8-flash',
    mode: liveApiVerified ? 'live' : 'demo',
    note: liveApiVerified
      ? 'Connected to Gemini 3.8 Flash server-side'
      : 'Curated Educational Demo Mode active (Hackathon zero-downtime)',
    setupPath: 'To switch to Live Gemini API, attach an active Gemini API key in Settings > Secrets.',
    timestamp: new Date().toISOString(),
  });
});

// Download source code as zip
app.get('/api/download-zip', (req, res) => {
  const zipPath = path.resolve(__dirname, 'HERwell-source-code.zip');
  res.download(zipPath, 'HERwell-source-code.zip', (err) => {
    if (err) {
      console.error('Error downloading zip:', err);
      res.status(500).send('Could not download zip archive.');
    }
  });
});

// System instruction enforcing medical safety rules
const SYSTEM_INSTRUCTION = `You are HERwell, an empathetic, supportive, culturally sensitive, and scientifically grounded women's health educational companion.
Your mission is to help women understand their bodies, explore possible explanations for symptoms, learn about conditions, and feel empowered to speak with healthcare professionals.

CRITICAL MEDICAL SAFETY & ETHICAL RULES:
1. NEVER declare a definitive medical diagnosis. You are NOT a doctor and cannot diagnose conditions like PCOS, endometriosis, cancer, pregnancy complications, or thyroid disorders based on text.
2. Frame all explanations as general educational information and possibilities to explore: "Some common factors clinicians consider include...", "This could be related to...", "Only a qualified doctor can diagnose...".
3. NEVER prescribe medications or suggest specific pharmaceutical dosages.
4. NEVER advise stopping or changing doctor-prescribed treatments.
5. NEVER downplay or reassure a user that potentially concerning symptoms are harmless.
6. EMERGENCY PROTOCOL: If the user reports red-flag signs (e.g. sudden severe crushing chest pain, severe shortness of breath, acute heavy bleeding with weakness/dizziness, sudden severe pelvic/abdominal pain, fainting, signs of stroke, suspected ectopic pregnancy, or severe high fever with stiff neck):
   - Immediately instruct them to seek emergency medical care (call 112 / 108 in India or their local emergency services, or visit the nearest emergency room).
   - Do NOT ask them to fill out surveys or wait.
7. Always advise consulting a qualified clinician (e.g., Gynaecologist, Endocrinologist, Primary Care Physician, Dermatologist) for persistent, worsening, or worrisome symptoms.
8. Suggest 2-3 practical, specific questions the user can take to their doctor consultation.
9. Be deeply empathetic, warm, and non-judgmental. Be mindful of cultural stigmas surrounding menstrual, reproductive, and sexual health (especially in India and South Asia).
10. Format responses clearly with readable paragraphs, bullet points for readability, and 1-2 gentle follow-up questions at the end.`;

// Curated educational fallback responses when live API key is unavailable
const FALLBACK_RESPONSES: Record<string, { reply: string; followUps: string[] }> = {
  irregular_periods: {
    reply: `Irregular menstrual cycles can occur for several reasons, as the menstrual cycle is regulated by a delicate balance of hormones involving the brain, ovaries, and other endocrine glands.

### Common Factors Clinicians Evaluate:
* **Hormonal imbalances:** Conditions like Polycystic Ovary Syndrome (PCOS) or thyroid dysfunction (hypo- or hyperthyroidism) are frequent causes.
* **Stress and sleep disruption:** Elevated cortisol levels can suppress the hypothalamic-pituitary-ovarian axis.
* **Significant weight fluctuations:** Rapid weight loss, very low body fat, or rapid weight gain can alter estrogen levels.
* **Perimenopause:** For women in their late 30s to 40s, transitional hormonal fluctuations can lengthen or shorten cycles.
* **Medications or contraception:** Recent changes in hormonal pills, intrauterine devices (IUDs), or emergency contraception.

### Questions to Discuss with a Gynaecologist:
1. "Could my cycle changes be linked to PCOS, thyroid levels, or nutritional factors like anaemia?"
2. "Are there specific blood tests or a pelvic ultrasound you recommend to check my ovarian reserve and uterine lining?"
3. "What signs should prompt me to follow up sooner?"

*Note: If you experience sudden severe pelvic pain, unusually heavy bleeding (soaking through a pad every hour for several consecutive hours), or extreme dizziness, please seek prompt medical care.*`,
    followUps: [
      'What is the difference between PCOS and regular irregular periods?',
      'How does iron deficiency or anaemia affect periods?',
      'What tests do gynaecologists typically perform for irregular cycles?',
    ],
  },
  pcos_vs_endo: {
    reply: `PCOS and Endometriosis are two distinct women's health conditions that affect reproductive organs, but they involve different biological mechanisms:

### Polycystic Ovary Syndrome (PCOS)
* **What it is:** A hormonal and metabolic condition characterized by ovulatory dysfunction, elevated androgen (male hormone) activity, and polycystic appearance of ovaries on ultrasound.
* **Typical Signs:** Irregular or skipped periods, excess facial/body hair (hirsutism), persistent acne, scalp hair thinning, weight gain or insulin resistance.
* **Key Mechanism:** Endocrine/metabolic dysregulation with elevated luteinizing hormone and insulin.

### Endometriosis
* **What it is:** A condition where tissue similar to the lining of the uterus (endometrium) grows outside the uterus (on ovaries, fallopian tubes, bowel, or pelvic lining).
* **Typical Signs:** Severe pelvic pain during periods (dysmenorrhea), deep pain during intercourse, chronic lower back/pelvic aching, pain with bowel movements during menstruation, and potential fertility challenges.
* **Key Mechanism:** Chronic inflammation, tissue scarring (adhesions), and estrogen-dependent lesion bleeding.

### Questions to Ask a Healthcare Professional:
1. "Given my pain and bleeding patterns, could my symptoms indicate endometriosis rather than just hormonal irregularity?"
2. "Would a specialized pelvic ultrasound or referral to a gynaecologist specializing in pelvic pain be appropriate?"`,
    followUps: [
      'Can someone have both PCOS and endometriosis?',
      'What pain relief and management strategies exist for endometriosis?',
      'What should I track in my symptom journal before my gynaecology visit?',
    ],
  },
  gynaecologist_prep: {
    reply: `Preparing for a gynaecology consultation helps ensure your concerns are thoroughly addressed without feeling rushed or overwhelmed.

### Key Information to Bring:
* **Cycle History:** First day of your last menstrual period (LMP), typical cycle length (e.g. 28-35 days), and bleed duration.
* **Symptom Patterns:** Keep track of severity (1-10 scale), dates when symptoms flare, and whether pain occurs before, during, or between periods.
* **Medications & Supplements:** Write down all prescription drugs, vitamins, iron pills, or herbal supplements.
* **Family Medical History:** Any history of PCOS, endometriosis, early menopause, thyroid issues, or reproductive cancers in your mother or sisters.

### Good Questions to Ask Your Clinician:
1. "Based on what I'm experiencing, what are the most likely explanations?"
2. "Do you recommend testing for iron deficiency, thyroid hormones, or reproductive hormones?"
3. "What lifestyle or dietary modifications can support my hormonal balance alongside medical care?"
4. "When should I schedule a follow-up appointment?"`,
    followUps: [
      'What happens during a first routine pelvic examination?',
      'How do I track my symptoms using the HERwell Symptom Tracker?',
      'What questions should I ask about birth control options?',
    ],
  },
  urgent_care: {
    reply: `### When to Seek Immediate Emergency Medical Care:
Please contact emergency services (call **112** or **108** in India, or your local emergency number) or go to the nearest emergency department if you experience:

* **Acute, sudden, severe pelvic or lower abdominal pain** (especially if accompanied by faintness, dizziness, or shoulder-tip pain, which could indicate an ectopic pregnancy or ovarian cyst torsion).
* **Unusually severe vaginal bleeding** (e.g., soaking through two or more maxi pads or tampons every hour for two consecutive hours, or passing large blood clots larger than a quarter/coin).
* **High fever (> 38.5°C / 101.3°F) accompanied by pelvic tenderness, unusual discharge, or foul odor.**
* **Sudden shortness of breath, severe chest pain, or rapid heart rate.**
* **Sudden weakness, facial drooping, or confusion.**

### When to Seek Prompt Care (Within 24–48 Hours):
* Burning or intense pain with urination accompanied by fever or back pain (possible kidney involvement).
* New, hard, or painless lump in the breast, armpit, or collarbone area.
* Post-menopausal vaginal bleeding of any amount.`,
    followUps: [
      'What are emergency helpline numbers in India?',
      'What is an ectopic pregnancy and what are its symptoms?',
      'How can I export my health summary to show emergency staff?',
    ],
  },
};

// AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, context } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message string is required.' });
    }

    const lower = message.toLowerCase();

    // Red flag emergency check
    const isEmergency =
      lower.includes('chest pain') ||
      lower.includes('cannot breathe') ||
      lower.includes('trouble breathing') ||
      lower.includes('fainted') ||
      lower.includes('fainting') ||
      lower.includes('passing out') ||
      lower.includes('bleeding heavily through pads') ||
      lower.includes('soaking through pads') ||
      lower.includes('ectopic') ||
      lower.includes('severe sudden agony');

    // If Gemini client is available, call the real API
    if (aiClient) {
      try {
        let promptText = `User message: ${message}`;
        if (context) {
          promptText += `\n\nUser logged context / tracked symptoms note:\n${context}`;
        }

        // Build contents including past history if provided
        const contents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          for (const item of history.slice(-6)) {
            contents.push({
              role: item.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: item.text || item.content || '' }],
            });
          }
        }
        contents.push({
          role: 'user',
          parts: [{ text: promptText }],
        });

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.6,
            topP: 0.9,
          },
        });

        const textOutput = response.text || 'I could not generate an answer right now. Please try again.';
        return res.json({
          response: textOutput,
          mode: 'live',
          model: 'gemini-3.8-flash',
          isEmergency,
        });
      } catch (geminiError) {
        console.error('Gemini API call error; falling back gracefully to curated demo mode:', geminiError);
      }
    }

    // Curated Educational Demo Mode responses
    let chosenReply = '';
    let chosenFollowUps: string[] = [];

    if (lower.includes('irregular') || lower.includes('period') || lower.includes('cycle') || lower.includes('late period')) {
      chosenReply = FALLBACK_RESPONSES.irregular_periods.reply;
      chosenFollowUps = FALLBACK_RESPONSES.irregular_periods.followUps;
    } else if (lower.includes('pcos') || lower.includes('endometriosis') || lower.includes('endo') || lower.includes('difference')) {
      chosenReply = FALLBACK_RESPONSES.pcos_vs_endo.reply;
      chosenFollowUps = FALLBACK_RESPONSES.pcos_vs_endo.followUps;
    } else if (lower.includes('urgent') || lower.includes('emergency') || lower.includes('red flag') || isEmergency) {
      chosenReply = FALLBACK_RESPONSES.urgent_care.reply;
      chosenFollowUps = FALLBACK_RESPONSES.urgent_care.followUps;
    } else if (lower.includes('doctor') || lower.includes('gynaecologist') || lower.includes('gynecologist') || lower.includes('discuss') || lower.includes('ask')) {
      chosenReply = FALLBACK_RESPONSES.gynaecologist_prep.reply;
      chosenFollowUps = FALLBACK_RESPONSES.gynaecologist_prep.followUps;
    } else {
      chosenReply = `Thank you for sharing your question with HERwell. 

As an educational companion, I can help you understand how clinicians evaluate these symptoms and what questions you might ask during a consultation:

### Important Considerations:
* **Symptom Duration & Triggers:** Notice when this began, how frequently it occurs, and whether it aligns with specific days of your menstrual cycle, stress levels, or dietary habits.
* **Associated Symptoms:** Keep track of whether you also experience fatigue, headache, pelvic aching, gastrointestinal changes, or sleep disruptions.
* **Self-Observation, Not Self-Diagnosis:** While it is natural to search online, bodily symptoms can share multiple overlapping hormonal and metabolic causes that require clinical evaluation.

### Recommended Next Steps:
1. Log this in your **HERwell Symptom Tracker** to establish a clear date and severity record.
2. If this symptom is persistent, worsening, or interfering with daily activities, consider scheduling an assessment with a **Primary Care Physician or Gynaecologist**.
3. Use the **My Health Summary** page to export a structured summary of your notes before your appointment.

*Is there a particular symptom or timeframe you would like to explore further?*`;
      chosenFollowUps = [
        'How do I prepare a symptom log for my doctor?',
        'Which specialist should I consult for this concern?',
        'When should I consider this symptom an emergency?',
      ];
    }

    return res.json({
      response: chosenReply,
      mode: 'demo',
      model: 'curated-educational-knowledgebase',
      isEmergency,
      followUps: chosenFollowUps,
    });
  } catch (err: any) {
    console.error('Server error handling chat request:', err);
    res.status(500).json({
      error: 'An unexpected error occurred while processing the request.',
      message: err?.message,
    });
  }
});

// Vite or static files middleware
async function setupViteOrStatic() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HERwell server running on http://0.0.0.0:${PORT}`);
  });
}

setupViteOrStatic();
