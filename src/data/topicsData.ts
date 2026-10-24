import { HealthTopic } from '../types';

export const HEALTH_TOPICS: HealthTopic[] = [
  {
    id: 'pcos',
    title: 'Polycystic Ovary Syndrome (PCOS)',
    subtitle: 'A common hormonal and metabolic condition affecting up to 1 in 5 women in India and globally.',
    category: 'Hormonal & Reproductive',
    tags: ['Hormones', 'Insulin Resistance', 'Irregular Periods', 'Acne', 'Fertility'],
    readTime: '5 min read',
    isFeatured: true,
    overview:
      'Polycystic Ovary Syndrome (PCOS) is a multi-system endocrine disorder characterized by hormonal imbalances, irregular menstrual cycles, and metabolic tendencies such as insulin resistance. Despite the name, cysts are not true ovarian tumours, but rather harmless follicles containing immature eggs that did not develop to ovulation. With supportive lifestyle modifications and medical guidance, symptoms can be managed effectively.',
    commonSymptoms: [
      'Irregular, delayed, or absent periods (oligomenorrhea or amenorrhea)',
      'Excess facial or body hair growth (hirsutism) on the chin, chest, or abdomen',
      'Persistent hormonal cystic acne along the jawline and back',
      'Scalp hair thinning or male-pattern hair loss (androgenic alopecia)',
      'Difficulty managing weight, especially abdominal fat accumulation',
      'Velvety dark patches on neck creases or underarms (acanthosis nigricans, linked to insulin resistance)',
      'Fatigue, cravings for refined carbohydrates, and mood swings',
    ],
    whyItOccurs: [
      'Elevated Androgens: Ovaries produce slightly higher levels of androgens (male sex hormones), interfering with regular ovulation.',
      'Insulin Resistance: Tissues are less responsive to insulin, prompting the pancreas to release more insulin. High circulating insulin stimulates ovaries to produce excess testosterone.',
      'Low-grade Chronic Inflammation: Subclinical inflammatory markers are frequently elevated, contributing to metabolic and hormonal disruption.',
      'Genetic & Epigenetic Predisposition: Family history of PCOS or Type 2 diabetes significantly increases likelihood.',
    ],
    commonMisconceptions: [
      {
        myth: 'If you have PCOS, you can never get pregnant.',
        fact: 'Most women with PCOS can conceive naturally or with simple first-line medical treatments (like ovulation induction) once hormone levels and ovulation are supported.',
      },
      {
        myth: 'You must have ovarian cysts on an ultrasound to have PCOS.',
        fact: 'Under the international Rotterdam criteria, a diagnosis requires 2 out of 3 features: irregular cycles, androgen excess (clinical or blood test), and/or polycystic ovarian morphology.',
      },
      {
        myth: 'PCOS only affects people with higher body weight.',
        fact: '"Lean PCOS" is common, particularly among South Asian women, driven by androgen sensitivity and subtle insulin resistance regardless of body weight.',
      },
    ],
    whenToSeekMedicalAdvice: [
      'Your menstrual cycles are persistently longer than 35 days or have stopped for 3 consecutive months',
      'You experience rapid development of excessive facial hair or severe cystic acne',
      'You have been trying to conceive for 6 to 12 months without success',
      'You experience sudden or extreme pelvic pain, which warrants immediate clinical review',
    ],
    questionsForDoctor: [
      'Based on my symptoms and lab work, which subtype of PCOS features do I present with?',
      'Do you recommend testing for fasting insulin, HbA1c, and a lipid panel in addition to reproductive hormones?',
      'What lifestyle and nutritional approaches do you recommend to improve insulin sensitivity alongside medical care?',
      'How does PCOS impact my long-term cardiovascular and metabolic health, and how can we monitor this?',
    ],
    reliableSources: [
      { name: 'World Health Organization (WHO) PCOS Factsheet', organization: 'WHO' },
      { name: 'Ministry of Health and Family Welfare (MoHFW) India — PCOS Advisory', organization: 'MoHFW India' },
      { name: 'National Health Service (NHS) — Polycystic Ovary Syndrome', organization: 'NHS UK' },
      { name: 'Federation of Obstetric and Gynaecological Societies of India (FOGSI)', organization: 'FOGSI' },
    ],
  },
  {
    id: 'endometriosis',
    title: 'Endometriosis',
    subtitle: 'A chronic inflammatory condition where tissue similar to the uterine lining grows outside the uterus.',
    category: 'Pain & Discomfort',
    tags: ['Pelvic Pain', 'Periods', 'Chronic Illness', 'Fertility', 'Inflammation'],
    readTime: '6 min read',
    isFeatured: true,
    overview:
      'Endometriosis occurs when tissue resembling the lining of the uterus (endometrium) implants and grows in places outside the uterus, most commonly on ovaries, fallopian tubes, the outer uterine surface, and pelvic peritoneum. During each cycle, this tissue thickens, breaks down, and bleeds, but has no exit path, triggering localized inflammation, nerve irritation, and scarring (adhesions).',
    commonSymptoms: [
      'Severe, debilitating period cramps (dysmenorrhea) not relieved by standard over-the-counter painkillers',
      'Chronic non-cyclical pelvic pain and lower back aching',
      'Deep pain during or following sexual intercourse (dyspareunia)',
      'Painful bowel movements or painful urination, especially during menstruation',
      'Heavy menstrual bleeding or bleeding between cycles',
      'Debilitating fatigue, nausea, bloating ("endo belly"), and bowel irregularities during periods',
    ],
    whyItOccurs: [
      'Retrograde Menstruation: Menstrual blood containing endometrial cells flows backwards through fallopian tubes into the pelvic cavity.',
      'Cellular Metaplasia: Peritoneal cells may transform into endometrial-like tissue under hormonal and immunological influences.',
      'Immune Dysregulation: A sub-optimal immune response fails to recognize and clear ectopic endometrial tissue.',
      'Vascular & Lymphatic Transport: Endometrial cells may migrate through blood or lymphatic vessels.',
    ],
    commonMisconceptions: [
      {
        myth: 'Debilitating period pain is normal and something women just have to bear.',
        fact: 'Severe pain that interferes with school, work, or daily life is never normal and warrants thorough medical evaluation.',
      },
      {
        myth: 'Pregnancy or hysterectomy cures endometriosis permanently.',
        fact: 'Neither pregnancy nor hysterectomy is a guaranteed cure; hormonal symptoms and residual lesions may persist.',
      },
      {
        myth: 'A standard abdominal ultrasound will always rule out endometriosis.',
        fact: 'Superficial peritoneal endometriosis frequently evades standard ultrasound; advanced specialized transvaginal scans or laparoscopy by experts is often needed.',
      },
    ],
    whenToSeekMedicalAdvice: [
      'Period pain requires you to take bed rest, miss work or university regularly',
      'Pain persists between periods or radiates down into thighs and lower back',
      'You experience painful bowel movements or blood in your urine during menstruation',
      'Pain during intercourse causes significant physical or emotional distress',
    ],
    questionsForDoctor: [
      'Could my chronic pelvic discomfort and period cramps be caused by endometriosis?',
      'Do you have specialized experience with endometriosis diagnosis and management, or can you refer me to a pelvic pain specialist?',
      'What are the pros and cons of medical hormonal therapies versus laparoscopic excision in my situation?',
      'What multidisciplinary strategies (pelvic floor physical therapy, pain management, dietary changes) could support me?',
    ],
    reliableSources: [
      { name: 'World Health Organization (WHO) Endometriosis Information', organization: 'WHO' },
      { name: 'Endometriosis Society of India & FOGSI Clinical Practice Guidelines', organization: 'FOGSI' },
      { name: 'American College of Obstetricians and Gynecologists (ACOG)', organization: 'ACOG' },
    ],
  },
  {
    id: 'menstrual-health',
    title: 'Menstrual Health & Irregular Periods',
    subtitle: 'Understanding cycle rhythm, hormonal phases, and when variations signal an underlying cause.',
    category: 'Menstrual Health',
    tags: ['Cycle Length', 'Bleeding', 'Ovulation', 'Hormones'],
    readTime: '4 min read',
    isFeatured: true,
    overview:
      'The menstrual cycle is a vital sign of overall health. A typical cycle lasts between 21 and 35 days, with 2 to 7 days of bleeding. Hormones including estrogen, progesterone, LH, and FSH orchestrate this monthly rhythm. Occasional slight variations of a few days are normal, but chronic irregularities often point to hormonal, metabolic, or structural factors.',
    commonSymptoms: [
      'Cycle length shorter than 21 days or longer than 35 days',
      'Missed periods for several months in a row (amenorrhea)',
      'Heavy menstrual bleeding (soaking through pads every 1-2 hours or passing large clots)',
      'Bleeding lasting longer than 7 to 8 consecutive days',
      'Spotting or bleeding between periods or after intercourse',
    ],
    whyItOccurs: [
      'Anovulation: Cycles where an egg is not released prevent the rise of progesterone, resulting in irregular or delayed shedding.',
      'Stress & Hypothalamic Amenorrhea: High physical or mental stress suppresses GnRH pulsatility from the brain.',
      'Thyroid Dysfunction: Both hypothyroidism and hyperthyroidism disrupt cycle predictability.',
      'Uterine Structural Factors: Polyps, fibroids, or adenomyosis can alter bleeding volume and duration.',
    ],
    commonMisconceptions: [
      {
        myth: 'Every woman should bleed precisely every 28 days.',
        fact: 'Only a minority of women have a precise 28-day cycle; a natural variation between 24 and 35 days is considered clinically normal.',
      },
      {
        myth: 'Missing a period always means pregnancy.',
        fact: 'While pregnancy must be checked in sexually active individuals, stress, travel, illness, rapid weight changes, and PCOS frequently cause missed cycles.',
      },
    ],
    whenToSeekMedicalAdvice: [
      'Periods have ceased for 90 days or more without pregnancy',
      'Bleeding is so heavy that you bleed through pads every 1-2 hours for several hours',
      'Bleeding occurs between cycles or following sexual intercourse',
      'Severe pain accompanies previously painless periods',
    ],
    questionsForDoctor: [
      'What diagnostic blood tests (thyroid, prolactin, FSH, LH, and ferritin) should we run?',
      'Would a pelvic pelvic ultrasound help evaluate my endometrial thickness and ovaries?',
      'Are there lifestyle or medical treatments to restore a predictable, healthy cycle?',
    ],
    reliableSources: [
      { name: 'MedlinePlus — Menstruation & Menstrual Disorders', organization: 'US National Library of Medicine' },
      { name: 'MoHFW India — Rashtriya Kishor Swasthya Karyakram (RKSK) Menstrual Hygiene', organization: 'MoHFW India' },
      { name: 'Royal College of Obstetricians and Gynaecologists (RCOG)', organization: 'RCOG UK' },
    ],
  },
  {
    id: 'pms-pmdd',
    title: 'Premenstrual Syndrome (PMS) & PMDD',
    subtitle: 'Distinguishing typical premenstrual shifts from severe premenstrual dysphoric disorder.',
    category: 'Mental Wellbeing',
    tags: ['Mood', 'PMS', 'PMDD', 'Hormone Sensitivity', 'Cramps'],
    readTime: '4 min read',
    overview:
      'Many women experience mild physical and emotional symptoms in the 7–10 days before their period (the luteal phase), known as Premenstrual Syndrome (PMS). In approximately 3–8% of menstruating women, a severe, clinically recognized neurobiological reaction occurs called Premenstrual Dysphoric Disorder (PMDD), causing intense depression, anxiety, anger, or despair that resolves shortly after bleeding begins.',
    commonSymptoms: [
      'Irritability, sudden rage, or mood swings in the week before menstruation',
      'Severe anxiety, feeling overwhelmed, or deep depressive episodes (PMDD)',
      'Physical bloating, fluid retention, and painful breast tenderness',
      'Headaches, joint aches, and intense fatigue',
      'Strong food cravings, particularly for salty or sugary foods',
      'Difficulty concentrating and sleep disturbances (insomnia or hypersomnia)',
    ],
    whyItOccurs: [
      'Abnormal Sensitivity to Normal Fluctuations: Individuals with PMDD do not have abnormal hormone levels, but their brain neurotransmitters (serotonin, GABA) have an exaggerated sensitivity to progesterone and estrogen drops.',
      'Genetic Vulnerability: Genetic differences in cellular receptors for estrogen and progesterone.',
      'Inflammatory Factors: Heightened inflammatory responses in the late luteal phase.',
    ],
    commonMisconceptions: [
      {
        myth: 'PMDD is just women being "moody" or "over-dramatic".',
        fact: 'PMDD is a recognized medical condition in the DSM-5 and WHO ICD-11 with proven neurochemical and genetic underpinnings.',
      },
      {
        myth: 'PMS and PMDD require you to just wait it out without treatment.',
        fact: 'Effective medical treatments exist, including SSRIs (continuous or luteal-phase), hormonal regulation, cognitive behavioral therapy, and targeted supplements (calcium, vitamin B6).',
      },
    ],
    whenToSeekMedicalAdvice: [
      'Premenstrual mood symptoms cause intense conflict at work, university, or in relationships',
      'You experience thoughts of hopelessness, self-harm, or feeling out of control before your period',
      'Symptoms do not improve after your period starts, suggesting depression or generalized anxiety rather than PMDD alone',
    ],
    questionsForDoctor: [
      'Could my luteal-phase mood changes and fatigue be indicative of PMDD?',
      'Would tracking my symptoms on a daily calendar for two full cycles help confirm a diagnosis?',
      'What evidence-based medical and psychological treatment options are available to me?',
    ],
    reliableSources: [
      { name: 'International Association for Premenstrual Disorders (IAPMD)', organization: 'IAPMD' },
      { name: 'NHS — PMS and PMDD Clinical Overview', organization: 'NHS' },
    ],
  },
  {
    id: 'menopause',
    title: 'Menopause & Perimenopause',
    subtitle: 'Navigating the natural biological transition, hormonal changes, and symptom management.',
    category: 'Hormonal & Reproductive',
    tags: ['Hot Flashes', 'Estrogen', 'Sleep', 'Perimenopause', 'Bone Health'],
    readTime: '5 min read',
    overview:
      'Perimenopause is the transitional phase leading up to menopause, often starting in a woman’s 40s (or sometimes late 30s), during which ovarian estrogen production fluctuates unpredictably. Menopause is formally diagnosed when a woman has gone 12 consecutive months without a menstrual period. This is a natural life transition, but symptoms like hot flashes, sleep changes, and mood shifts deserve attentive clinical support.',
    commonSymptoms: [
      'Irregular periods with unpredictable flow volume and spacing',
      'Sudden sensations of intense heat, flushing, and sweating (hot flashes and night sweats)',
      'Sleep disturbances and waking up soaked or anxious',
      'Vaginal dryness, discomfort during intercourse, or increased urinary frequency',
      'Brain fog, memory lapses, and concentration challenges',
      'Shifts in mood, irritability, or new feelings of anxiety',
      'Changes in skin elasticity and joint stiffness',
    ],
    whyItOccurs: [
      'Ovarian Follicle Depletion: The natural depletion of remaining ovarian follicles leads to declining and fluctuating production of estrogen and progesterone.',
      'Thermoregulatory Dysregulation: Estrogen drops alter temperature control in the hypothalamus, triggering abrupt vasodilatation.',
    ],
    commonMisconceptions: [
      {
        myth: 'Menopause happens overnight at age 50.',
        fact: 'Perimenopause typically lasts 4 to 8 years before menopause occurs, with symptoms fluctuating along the way.',
      },
      {
        myth: 'Hormone Replacement Therapy (HRT) is dangerous for all women.',
        fact: 'Modern bioidentical hormone replacement therapy (MHT) started within 10 years of menopause has favorable safety profiles for most women and protects against osteoporosis.',
      },
      {
        myth: 'You cannot get pregnant during perimenopause.',
        fact: 'Ovulation can still occur unpredictably; contraception is advised until 12 full months without a period (or 24 months if under age 50).',
      },
    ],
    whenToSeekMedicalAdvice: [
      'Any vaginal bleeding occurring AFTER menopause (12 months without a period) — this is a red-flag requiring evaluation',
      'Hot flashes or night sweats severely disrupt sleep and work',
      'Severe mood changes or depressive symptoms emerge',
      'You experience painful intercourse or recurring urinary tract infections',
    ],
    questionsForDoctor: [
      'Am I in perimenopause, and what lifestyle or medical options can alleviate my specific symptoms?',
      'Am I a suitable candidate for Menopausal Hormone Therapy (MHT), and what are my individual risks and benefits?',
      'What screening tests should I have scheduled for bone density (DEXA) and cardiovascular health?',
    ],
    reliableSources: [
      { name: 'The Menopause Society (formerly NAMS)', organization: 'NAMS' },
      { name: 'Indian Menopause Society (IMS) Guidelines', organization: 'IMS' },
      { name: 'British Menopause Society (BMS)', organization: 'BMS' },
    ],
  },
  {
    id: 'pelvic-pain',
    title: 'Pelvic Pain & Chronic Discomfort',
    subtitle: 'Investigating chronic, non-menstrual, or sharp pelvic discomfort in women.',
    category: 'Pain & Discomfort',
    tags: ['Pelvic Floor', 'Adenomyosis', 'Ovarian Cysts', 'Pain'],
    readTime: '5 min read',
    overview:
      'Pelvic pain is discomfort occurring in the lowest part of the abdomen and pelvis. It is categorized as acute (sudden onset) or chronic (lasting 6 months or longer). Causes can span gynaecological organs, the urinary bladder, intestines, musculoskeletal pelvic floor muscles, or nerve hypersensitivity.',
    commonSymptoms: [
      'Dull, aching constant pain in the lower abdomen or groin',
      'Sharp, sudden cramping or stabbing sensations',
      'Pressure or heaviness deep within the pelvic bowl',
      'Pain aggravated by sitting for long periods, walking, or bowel movements',
      'Painful bladder syndrome (interstitial cystitis) with frequency and urgency',
    ],
    whyItOccurs: [
      'Adenomyosis: Endometrial tissue grows into the muscular wall of the uterus, causing an enlarged, painful uterus.',
      'Ovarian Cysts: Functional cysts or endometriomas that become enlarged, rupture, or twist.',
      'Pelvic Inflammatory Disease (PID): Infection spreading from cervix/vagina to upper reproductive organs.',
      'Pelvic Floor Myofascial Spasm: Tight, hypertonic pelvic floor muscles holding chronic tension.',
    ],
    commonMisconceptions: [
      {
        myth: 'Chronic pelvic pain is purely psychological if initial scans look clear.',
        fact: 'Musculoskeletal dysfunctions, nerve sensitization, and microscopic endometriosis frequently produce severe physical pain without obvious findings on routine imaging.',
      },
    ],
    whenToSeekMedicalAdvice: [
      'Sudden, sharp, agonizing pelvic pain on one side (could indicate ovarian torsion or ruptured ectopic pregnancy) — GO TO ER',
      'Pelvic pain accompanied by fever, chills, or unusual foul-smelling discharge',
      'Pain that progressively worsens over weeks and limits mobility',
    ],
    questionsForDoctor: [
      'Could my pain be related to adenomyosis, ovarian cysts, or pelvic floor muscle dysfunction?',
      'Would pelvic floor physical therapy be beneficial for my pain pattern?',
      'What specialized imaging (contrast MRI or expert pelvic ultrasound) do you recommend?',
    ],
    reliableSources: [
      { name: 'International Pelvic Pain Society (IPPS)', organization: 'IPPS' },
      { name: 'NHS — Pelvic Pain Guidance', organization: 'NHS' },
    ],
  },
  {
    id: 'breast-health',
    title: 'Breast Health & Clinical Evaluation',
    subtitle: 'Recognizing normal breast variations, benign changes, and critical warning signs.',
    category: 'General & Preventive',
    tags: ['Breast Check', 'Lumps', 'Mammography', 'Screening', 'Red Flags'],
    readTime: '5 min read',
    isFeatured: true,
    overview:
      'Breast tissue naturally changes across menstrual cycles, pregnancy, and aging. Most breast lumps and tenderness are benign (non-cancerous), such as fibroadenomas or fluid-filled cysts influenced by monthly estrogen and progesterone shifts. However, becoming familiar with your breasts and seeking clinical assessment for new, firm, or asymmetric changes is essential for early detection.',
    commonSymptoms: [
      'A new lump or thickening in the breast or under the armpit (axilla)',
      'Changes in breast size, shape, or symmetry that are new',
      'Dimpling, puckering, or redness of the breast skin (orange peel texture / peau d’orange)',
      'Inversion, turning inward, or changes in the nipple appearance',
      'Spontaneous nipple discharge, especially if clear, watery, or bloody',
      'Persistent localized pain that does not correlate with menstrual cycles',
    ],
    whyItOccurs: [
      'Fibrocystic Changes: Benign hormonal fluctuations causing lumpy, tender breast tissue, most prominent before a period.',
      'Fibroadenomas: Common benign solid tumors of glandular and connective tissue, especially frequent in women under 30.',
      'Mastitis or Infection: Inflammation of breast tissue, common during lactation.',
      'Malignant Changes: Abnormal genetic mutations causing unregulated proliferation of cells in breast ducts or lobules.',
    ],
    commonMisconceptions: [
      {
        myth: 'A breast lump that hurts is definitely cancer.',
        fact: 'In fact, most breast cancers are painless. Painful lumps are far more commonly linked to benign cysts, hormonal fluctuations, or muscle strain.',
      },
      {
        myth: 'Young women under 35 do not need to pay attention to breast changes.',
        fact: 'While breast cancer is more common over 40, young women can develop breast changes and should have any new lump clinically examined.',
      },
      {
        myth: 'If you have no family history of breast cancer, you cannot get it.',
        fact: 'Approximately 75–85% of women diagnosed with breast cancer have no known family history.',
      },
    ],
    whenToSeekMedicalAdvice: [
      'Any newly discovered firm, fixed, or painless lump in your breast or armpit',
      'Spontaneous blood-stained or clear discharge from one nipple',
      'Skin dimpling, retraction, or rash around the nipple area',
      'A lump that persists through an entire menstrual cycle',
    ],
    questionsForDoctor: [
      'Can you perform a clinical breast examination to evaluate this change?',
      'Do you recommend a breast ultrasound (common for younger, denser breast tissue) or a mammogram?',
      'Given my age, breast density, and family history, what screening schedule is appropriate for me?',
    ],
    reliableSources: [
      { name: 'World Health Organization (WHO) Global Breast Cancer Initiative', organization: 'WHO' },
      { name: 'Tata Memorial Centre & National Cancer Grid of India', organization: 'TMC India' },
      { name: 'American Cancer Society (ACS)', organization: 'ACS' },
    ],
  },
  {
    id: 'anaemia-iron',
    title: 'Anaemia & Iron Deficiency',
    subtitle: 'Addressing the most widespread nutritional deficiency affecting over 50% of Indian women.',
    category: 'Metabolic & Nutrition',
    tags: ['Iron', 'Fatigue', 'Ferritin', 'Heavy Bleeding', 'Hemoglobin'],
    readTime: '4 min read',
    isFeatured: true,
    overview:
      'Anaemia occurs when the blood has a lower than normal concentration of hemoglobin or red blood cells, impairing oxygen delivery to tissues. Iron deficiency anaemia is exceptionally prevalent in India, driven by heavy menstrual bleeding, dietary factors (low bioavailable iron), and increased physiological demands during reproductive years. Even before hemoglobin drops, low stored iron (ferritin) can cause debilitating exhaustion.',
    commonSymptoms: [
      'Chronic, unrefreshing fatigue and weakness',
      'Pale skin, pale inner eyelids, and pale nail beds',
      'Shortness of breath or rapid heart rate during light activities (like climbing stairs)',
      'Cold hands and feet, dizziness, or lightheadedness when standing up',
      'Brittle, spoon-shaped nails (koilonychia) and hair shedding',
      'Craving non-food items like ice, chalk, or clay (pica)',
      'Restless legs syndrome, poor memory, and brain fog',
    ],
    whyItOccurs: [
      'Menstrual Blood Loss: Heavy menstrual bleeding (menorrhagia) depletes iron reserves faster than dietary absorption can replace.',
      'Dietary Factors: Traditional vegetarian diets may be high in non-heme iron but hindered by phytates in grains and polyphenols/tannins in tea/coffee consumed with meals.',
      'Poor Absorption: Celiac disease, H. pylori infection, or gastrointestinal inflammation.',
      'Increased Demand: Pregnancy and lactation place heavy demands on maternal iron stores.',
    ],
    commonMisconceptions: [
      {
        myth: 'Feeling tired all the time is just part of being a busy woman.',
        fact: 'Chronic fatigue is a symptom of an underlying physical state, and simple blood checks often reveal correctable iron deficiency.',
      },
      {
        myth: 'A normal Hemoglobin test completely rules out iron deficiency.',
        fact: 'Hemoglobin can remain in normal range while Serum Ferritin (bone marrow iron reserves) is severely depleted.',
      },
    ],
    whenToSeekMedicalAdvice: [
      'You feel short of breath, dizzy, or notice your heart racing during mild exertion',
      'You experience heavy menstrual periods soaking through pads every 1-2 hours',
      'You feel constantly fatigued despite adequate sleep',
    ],
    questionsForDoctor: [
      'Can we test a Complete Blood Count (CBC) along with a Serum Ferritin and Iron profile?',
      'If I have heavy periods, can we investigate the underlying cause (e.g., fibroids, adenomyosis)?',
      'What oral iron formulation (or IV iron if intolerant) is most effective and gentle on the stomach?',
    ],
    reliableSources: [
      { name: 'MoHFW India — Anemia Mukt Bharat (AMB) National Strategy', organization: 'MoHFW India' },
      { name: 'World Health Organization (WHO) — Anaemia in Women & Children', organization: 'WHO' },
      { name: 'MedlinePlus — Iron Deficiency Anemia', organization: 'NIH' },
    ],
  },
  {
    id: 'thyroid-disorders',
    title: 'Thyroid Disorders in Women',
    subtitle: 'How an underactive (hypo) or overactive (hyper) thyroid influences weight, cycle, and mood.',
    category: 'Metabolic & Nutrition',
    tags: ['Thyroid', 'TSH', 'Hypothyroidism', 'Metabolism', 'Weight'],
    readTime: '5 min read',
    overview:
      'The thyroid is a butterfly-shaped gland at the base of the neck that produces hormones (T3 and T4) regulating metabolic rate, heart function, temperature, and menstrual regularity. Women are 5 to 8 times more likely than men to develop thyroid disorders. Hypothyroidism (underactive) is most common, frequently caused by the autoimmune condition Hashimoto’s thyroiditis.',
    commonSymptoms: [
      'Hypothyroidism: Unexplained weight gain, persistent fatigue, cold intolerance, constipation, dry skin, puffy face, heavy or irregular periods, and hoarse voice',
      'Hyperthyroidism: Rapid heartbeat, palpitations, unintentional weight loss, heat intolerance, anxiety, tremors in hands, and light or skipped periods',
      'Enlargement or swelling at the base of the front neck (goiter)',
      'Diffuse hair thinning and sluggish mental clarity',
    ],
    whyItOccurs: [
      'Autoimmune Attack: Hashimoto’s thyroiditis (in hypo) or Graves’ disease (in hyper) where antibodies mistakenly attack thyroid tissue.',
      'Iodine Imbalance: Insufficient or excessive dietary iodine intake.',
      'Postpartum Thyroiditis: Temporary inflammation of the thyroid occurring within 12 months after giving birth.',
    ],
    commonMisconceptions: [
      {
        myth: 'Thyroid issues always cause noticeable neck swelling.',
        fact: 'Many individuals with severe thyroid dysfunction have completely normal-looking necks without any visible goiter.',
      },
      {
        myth: 'Once you take thyroid medication, you can stop it when you feel better.',
        fact: 'Thyroid hormone replacement (e.g., levothyroxine) replaces what the gland cannot make; stopping abruptly causes symptoms to return.',
      },
    ],
    whenToSeekMedicalAdvice: [
      'Persistent, unexplained fatigue combined with cold intolerance and sudden weight changes',
      'Heart palpitations, resting heart rate over 100 bpm, or trembling hands',
      'Difficulty swallowing, a lump in your neck, or changes in your voice',
    ],
    questionsForDoctor: [
      'Can we check a comprehensive thyroid panel (TSH, Free T3, Free T4, and Anti-TPO antibodies)?',
      'Could my menstrual irregularities or difficulties conceiving be related to thyroid levels?',
      'How often should my TSH levels be rechecked to optimize medication dosage?',
    ],
    reliableSources: [
      { name: 'Endocrine Society Clinical Practice Guidelines', organization: 'Endocrine Society' },
      { name: 'Indian Thyroid Society (ITS)', organization: 'ITS' },
      { name: 'American Thyroid Association (ATA)', organization: 'ATA' },
    ],
  },
  {
    id: 'reproductive-sexual-health',
    title: 'Reproductive & Sexual Health',
    subtitle: 'Safe sex, vaginal biome balance, contraceptive awareness, and cervical screening.',
    category: 'Hormonal & Reproductive',
    tags: ['HPV', 'Vaginal Health', 'Contraception', 'STI', 'Pap Smear'],
    readTime: '5 min read',
    overview:
      'Reproductive and sexual health encompasses the physical, emotional, and social wellbeing related to the reproductive system. This includes understanding the vaginal microbiome (lactobacilli balance), safe sex practices, contraceptive choices, and routine screenings such as HPV vaccination and Pap tests to prevent cervical cancer.',
    commonSymptoms: [
      'Unusual vaginal discharge with strong odor, frothy texture, or greenish/gray color',
      'Vaginal burning, itching, or redness around the vulva',
      'Pain or burning during sexual intercourse',
      'Bleeding during or after intercourse (post-coital bleeding)',
      'Sores, bumps, or blisters on the genital area',
    ],
    whyItOccurs: [
      'Bacterial Vaginosis (BV): Overgrowth of anaerobic bacteria when normal protective acidic lactobacilli decrease.',
      'Yeast Infection (Candidiasis): Overgrowth of Candida albicans fungus, triggered by antibiotics, damp clothing, or diabetes.',
      'Sexually Transmitted Infections (STIs): Chlamydia, gonorrhea, trichomoniasis, or HPV transmitted during intimate contact.',
      'Cervical Dysplasia: Pre-cancerous cellular changes usually driven by persistent high-risk HPV strains.',
    ],
    commonMisconceptions: [
      {
        myth: 'Douching or using fragranced intimate washes is essential for vaginal hygiene.',
        fact: 'The vagina is self-cleaning. Fragranced soaps and douching disrupt the natural pH and kill protective bacteria, leading to infections.',
      },
      {
        myth: 'Cervical cancer cannot be prevented.',
        fact: 'Cervical cancer is one of the most preventable cancers worldwide through the HPV vaccine (recommended for girls and young women) and routine Pap/HPV testing.',
      },
    ],
    whenToSeekMedicalAdvice: [
      'Bleeding after intercourse or between periods',
      'Foul-smelling, cottage-cheese-like, or discolored discharge with vulvar itching',
      'New pelvic pain, genital sores, or pain during intercourse',
    ],
    questionsForDoctor: [
      'Am I eligible for the HPV vaccine (e.g., Cervavac or Gardasil 9) to protect against cervical cancer?',
      'When should I schedule my next Pap smear or HPV DNA test?',
      'Which contraceptive method best fits my hormonal profile and lifestyle preferences?',
    ],
    reliableSources: [
      { name: 'WHO — Global Cervical Cancer Elimination Initiative', organization: 'WHO' },
      { name: 'MoHFW India — National Reproductive, Maternal, Newborn, Child, and Adolescent Health (RMNCAH+A)', organization: 'MoHFW India' },
      { name: 'CDC — Sexual and Reproductive Health', organization: 'CDC' },
    ],
  },
  {
    id: 'cardiovascular-health',
    title: 'Cardiovascular Health in Women',
    subtitle: 'Why heart disease presents differently in women and the critical signs often overlooked.',
    category: 'General & Preventive',
    tags: ['Heart Health', 'Blood Pressure', 'Atypical Symptoms', 'Lipids'],
    readTime: '5 min read',
    overview:
      'Cardiovascular disease is the leading cause of mortality in women globally. However, women are frequently underdiagnosed because their symptoms often differ from the "classic" movie heart attack. Instead of crushing chest pain, women may experience subtle shortness of breath, nausea, back pain, or jaw pain. Risk factors like gestational diabetes, pre-eclampsia, and PCOS also uniquely elevate long-term cardiac risk.',
    commonSymptoms: [
      'Atypical heart attack signs: Shortness of breath, dizziness, sudden lightheadedness, or cold sweats',
      'Pain or discomfort in the neck, jaw, throat, shoulder, upper back, or upper abdomen',
      'Nausea, indigestion, vomiting, or overwhelming fatigue that feels like flu',
      'Chest tightness, pressure, fullness, or squeezing (may be subtle rather than sharp)',
      'Heart flutters, pounding pulse, or shortness of breath while lying flat',
    ],
    whyItOccurs: [
      'Microvascular Disease: Women often develop diffuse plaque in the heart’s smallest coronary arteries (coronary microvascular disease) rather than focal blockages in main arteries.',
      'Estrogen Decline Post-Menopause: Estrogen offers arterial elasticity; post-menopausal drops increase arterial stiffness and LDL cholesterol.',
      'Pregnancy Complications & PCOS: History of gestational hypertension, preeclampsia, or PCOS indicates underlying vascular endothelial vulnerability.',
    ],
    commonMisconceptions: [
      {
        myth: 'Heart disease is predominantly a man’s health issue.',
        fact: 'Heart disease kills more women than all forms of cancer combined.',
      },
      {
        myth: 'A heart attack in women always involves sudden clutching of the chest in agony.',
        fact: 'Many women experience no chest pain at all; unexplained breathlessness, nausea, and back/jaw pain are common.',
      },
    ],
    whenToSeekMedicalAdvice: [
      'EMERGENCY: Sudden pressure in chest or upper body with shortness of breath, cold sweat, or nausea — CALL 112 / 108 IMMEDIATELY',
      'Unexplained shortness of breath during routine activities that were previously effortless',
      'Persistent high blood pressure readings (> 130/85 mmHg)',
    ],
    questionsForDoctor: [
      'What is my 10-year cardiovascular risk profile considering my lipid panel, blood pressure, and family history?',
      'How does my pregnancy history (preeclampsia, gestational diabetes) or PCOS affect my heart health today?',
      'What heart-healthy dietary patterns and aerobic targets do you recommend for me?',
    ],
    reliableSources: [
      { name: 'American Heart Association (AHA) — Go Red For Women', organization: 'AHA' },
      { name: 'Cardiological Society of India (CSI)', organization: 'CSI' },
      { name: 'World Heart Federation', organization: 'WHF' },
    ],
  },
  {
    id: 'osteoporosis',
    title: 'Osteoporosis & Bone Density',
    subtitle: 'Preventing the silent loss of bone density that disproportionately impacts women.',
    category: 'General & Preventive',
    tags: ['Bone Density', 'Calcium', 'Vitamin D', 'DEXA', 'Fractures'],
    readTime: '4 min read',
    overview:
      'Osteoporosis is a systemic skeletal condition where bone mass and structural density decrease, making bones fragile and prone to fractures (especially in the hip, spine, and wrist). Known as a "silent condition" because bone loss occurs without pain until a fracture happens. Women lose up to 20% of their bone density in the 5 to 7 years immediately following menopause due to estrogen reduction.',
    commonSymptoms: [
      'Early stages: Typically silent with no noticeable symptoms',
      'Later stages: Gradual loss of height over time (1 inch or more)',
      'Stooped posture (kyphosis or "dowager’s hump")',
      'Sudden severe back pain caused by a collapsed or fractured vertebra',
      'A bone fracture from a mild fall or low-impact incident',
    ],
    whyItOccurs: [
      'Estrogen Deficiency: Estrogen inhibits bone-resorbing osteoclast cells. Post-menopause or surgical ovary removal accelerates bone breakdown.',
      'Low Calcium & Vitamin D: Insufficient dietary calcium intake and low sunlight/supplementation lead to poor mineralization.',
      'Sedentary Lifestyle: Lack of weight-bearing exercise deprives bone of the mechanical stress that triggers bone formation.',
    ],
    commonMisconceptions: [
      {
        myth: 'Osteoporosis is an inevitable part of aging that you can do nothing about.',
        fact: 'Targeted resistance training, adequate calcium/vitamin D intake in youth and adulthood, and modern medications can prevent or reverse bone loss.',
      },
      {
        myth: 'Drinking milk is the only way to build strong bones.',
        fact: 'Weight-bearing impact exercises, dark leafy greens, sesame seeds (til), lentils, vitamin D3, and adequate protein are equally vital.',
      },
    ],
    whenToSeekMedicalAdvice: [
      'You experience sudden, sharp back pain after lifting a light object or coughing',
      'You have lost measurable height or notice curvature in your upper spine',
      'You have reached age 65 (or earlier if you have risk factors like early menopause or long-term steroid use) for a routine DEXA bone scan',
    ],
    questionsForDoctor: [
      'Do I need a DEXA (dual-energy X-ray absorptiometry) bone density scan?',
      'What are my current Vitamin D (25-OH) and calcium levels, and should I supplement?',
      'What strength and resistance exercises are safest for my current bone mineral density?',
    ],
    reliableSources: [
      { name: 'International Osteoporosis Foundation (IOF)', organization: 'IOF' },
      { name: 'Indian Society for Bone and Mineral Research (ISBMR)', organization: 'ISBMR' },
      { name: 'National Osteoporosis Foundation', organization: 'NOF' },
    ],
  },
  {
    id: 'uti',
    title: 'Urinary Tract Infections (UTIs)',
    subtitle: 'Understanding recurring bladder infections, anatomy, prevention, and safe antibiotic stewardship.',
    category: 'Pain & Discomfort',
    tags: ['UTI', 'Bladder', 'Urinary Burning', 'Antibiotics'],
    readTime: '4 min read',
    overview:
      'Urinary tract infections (UTIs) are bacterial infections of any part of the urinary system, most commonly the bladder (cystitis) and urethra. Women are up to 30 times more prone to UTIs than men due to their shorter urethra, which is closer to the anus. While uncomplicated UTIs are readily treatable, recognizing warning signs of kidney involvement (pyelonephritis) is crucial.',
    commonSymptoms: [
      'Burning or stinging pain during urination (dysuria)',
      'Intense, persistent urge to urinate (urinary urgency) even when only drops pass',
      'Cloudy, dark, or strong-smelling urine',
      'Pink, red, or cola-colored urine (hematuria / blood in urine)',
      'Pelvic pressure or discomfort in the center of the lower pelvis',
      'Low-grade fever and feeling generally unwell',
    ],
    whyItOccurs: [
      'Bacterial Translocation: E. coli bacteria from the gastrointestinal tract enter the urethra and ascend into the bladder.',
      'Sexual Activity: Mechanical friction can introduce bacteria into the urethra.',
      'Holding Urine & Low Hydration: Stagnant urine in the bladder provides a breeding ground for bacteria.',
      'Menopausal Hormonal Shifts: Loss of estrogen thins the urethral mucosa and alters protective vaginal flora.',
    ],
    commonMisconceptions: [
      {
        myth: 'Drinking cranberry juice cures active bladder infections on its own.',
        fact: 'While cranberry proanthocyanidins may help prevent bacterial adherence, an established bacterial infection requires clinical diagnosis and targeted antibiotic therapy.',
      },
      {
        myth: 'UTIs are sexually transmitted infections.',
        fact: 'UTIs are not STIs, although sexual intercourse can mechanically facilitate entry of one’s own commensal gut bacteria into the urinary tract.',
      },
    ],
    whenToSeekMedicalAdvice: [
      'High fever (> 38°C / 100.4°F), chills, back or flank pain, or nausea/vomiting (suggests kidney infection — seek immediate medical attention)',
      'Visible blood in the urine',
      'Symptoms do not improve after 48 hours of prescribed treatment',
      'You experience 3 or more UTIs in a single year (recurrent UTIs)',
    ],
    questionsForDoctor: [
      'Will you perform a urine routine analysis and a urine culture to identify the exact bacteria before prescribing antibiotics?',
      'What evidence-based preventative measures (D-mannose, post-coital voiding, vaginal estrogen if postmenopausal) can prevent recurrences?',
    ],
    reliableSources: [
      { name: 'National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)', organization: 'NIH' },
      { name: 'Urological Society of India (USI)', organization: 'USI' },
      { name: 'NHS — Urinary Tract Infections', organization: 'NHS' },
    ],
  },
  {
    id: 'mental-health-stress',
    title: 'Mental Wellbeing, Stress & Hormones',
    subtitle: 'The bi-directional relationship between the endocrine system, chronic stress, and emotional health.',
    category: 'Mental Wellbeing',
    tags: ['Stress', 'Cortisol', 'Anxiety', 'Sleep', 'Mind-Body'],
    readTime: '5 min read',
    overview:
      'A woman’s mental health and hormonal balance are deeply intertwined. The hypothalamic-pituitary-adrenal (HPA) axis regulates stress hormones like cortisol and adrenaline, while the hypothalamic-pituitary-gonadal (HPG) axis governs estrogen and progesterone. Chronic psychological or physical stress dysregulates both axes, disrupting menstrual regularity, exacerbating PMS/PMDD, weakening immunity, and accelerating burnout.',
    commonSymptoms: [
      'Chronic tension, persistent worry, and feeling emotionally depleted',
      'Sleep onset insomnia or waking up with racing thoughts at 3 AM',
      'Digestive issues like IBS flares, bloating, and stomach cramps under stress',
      'Skipped, delayed, or unusually painful menstrual cycles during high-stress periods',
      'Tension headaches, jaw clenching (bruxism), and shoulder tightness',
      'Feeling detached, irritable, or overwhelmed by routine tasks',
    ],
    whyItOccurs: [
      'Cortisol Steal & GnRH Suppression: Sustained high cortisol dampens GnRH pulsatility in the brain, impairing normal ovulatory signaling.',
      'Neurotransmitter Imbalance: Fluctuating estrogen directly modulates serotonin, dopamine, and endorphin pathways.',
      'Societal & Caregiving Burden: Disproportionate emotional labor, caregiving duties, and cultural pressures placed on women.',
    ],
    commonMisconceptions: [
      {
        myth: 'Mental health struggles are signs of weakness or lack of willpower.',
        fact: 'Anxiety and depression are neurobiological and physiological conditions shaped by genetics, brain chemistry, and chronic stress.',
      },
      {
        myth: 'Stress is purely in the mind and doesn’t affect physical organs.',
        fact: 'Stress directly affects gut microbiome diversity, heart rate variability, inflammatory cytokines, and ovarian hormone production.',
      },
    ],
    whenToSeekMedicalAdvice: [
      'Persistent sadness, loss of pleasure, or hopelessness lasting more than 2 weeks',
      'Panic attacks, severe anxiety, or physical trembling',
      'Thoughts of self-harm or despair — Contact emergency helpline Tele-MANAS (14416 in India) or local crisis services immediately',
    ],
    questionsForDoctor: [
      'How might my chronic stress levels or sleep patterns be contributing to my menstrual or digestive symptoms?',
      'Can you recommend a licensed psychologist or counselor experienced in women’s health and hormonal transitions?',
      'What evidence-based stress-reduction protocols (mindfulness, CBT, sleep hygiene) should I explore?',
    ],
    reliableSources: [
      { name: 'National Institute of Mental Health and Neuro-Sciences (NIMHANS) India', organization: 'NIMHANS' },
      { name: 'MoHFW India — Tele-MANAS National Mental Health Helpline (14416)', organization: 'MoHFW India' },
      { name: 'World Health Organization (WHO) — Women’s Mental Health', organization: 'WHO' },
    ],
  },
];
