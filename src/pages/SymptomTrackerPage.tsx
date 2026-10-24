import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { SymptomLog, MenstrualPhase, SymptomFrequency } from '../types';
import {
  Activity,
  Plus,
  Calendar,
  Clock,
  Trash2,
  Edit2,
  Filter,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  X,
  FileText,
  Search,
} from 'lucide-react';

const COMMON_SYMPTOMS = [
  'Severe Pelvic Cramping',
  'Chronic Fatigue & Exhaustion',
  'Irregular / Delayed Bleeding',
  'Heavy Bleeding (Menorrhagia)',
  'Abdominal Bloating ("Endo Belly")',
  'Hormonal Cystic Acne',
  'Breast Tenderness',
  'Premenstrual Mood Drops / Rage',
  'Migraine / Hormonal Headache',
  'Pain During Intercourse',
  'Burning During Urination',
  'Hot Flashes / Night Sweats',
];

const ASSOCIATED_OPTIONS = [
  'Lower back pain',
  'Nausea',
  'Dizziness / Lightheadedness',
  'Brain fog',
  'Cold extremities',
  'Insomnia',
  'Digestive upset / Diarrhea',
  'Loss of appetite',
  'Sugar / Carb cravings',
  'Pelvic heaviness',
];

const MENSTRUAL_PHASES: MenstrualPhase[] = [
  'Menstrual (Bleeding)',
  'Follicular (Pre-ovulation)',
  'Ovulation',
  'Luteal (Post-ovulation / Pre-period)',
  'Irregular / Unsure',
  'Not Applicable / Skip',
];

const FREQUENCIES: SymptomFrequency[] = [
  'One-time / Rare',
  'Intermittent (comes and goes)',
  'Constant / Daily',
  'Cyclical (same time in cycle)',
];

export const SymptomTrackerPage: React.FC = () => {
  const { symptoms, addSymptom, updateSymptom, deleteSymptom, setActiveTab } = useHealth();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [symptomName, setSymptomName] = useState('');
  const [category, setCategory] = useState('Pelvic & Menstrual');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  );
  const [duration, setDuration] = useState('4 hours');
  const [severity, setSeverity] = useState<number>(5);
  const [frequency, setFrequency] = useState<SymptomFrequency>('Intermittent (comes and goes)');
  const [associatedSymptoms, setAssociatedSymptoms] = useState<string[]>([]);
  const [menstrualPhase, setMenstrualPhase] = useState<MenstrualPhase>('Not Applicable / Skip');
  const [doctorNotes, setDoctorNotes] = useState('');

  // Filtering states
  const [filterSearch, setFilterSearch] = useState('');
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState('All');

  const resetForm = () => {
    setSymptomName('');
    setCategory('General');
    setDate(new Date().toISOString().split('T')[0]);
    setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    setDuration('4 hours');
    setSeverity(5);
    setFrequency('Intermittent (comes and goes)');
    setAssociatedSymptoms([]);
    setMenstrualPhase('Not Applicable / Skip');
    setDoctorNotes('');
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEditClick = (log: SymptomLog) => {
    setEditingId(log.id);
    setSymptomName(log.symptomName);
    setCategory(log.category);
    setDate(log.date);
    setTime(log.time);
    setDuration(log.duration);
    setSeverity(log.severity);
    setFrequency(log.frequency);
    setAssociatedSymptoms(log.associatedSymptoms);
    setMenstrualPhase(log.menstrualPhase || 'Not Applicable / Skip');
    setDoctorNotes(log.doctorNotes || '');
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomName.trim()) return;

    if (editingId) {
      updateSymptom(editingId, {
        symptomName: symptomName.trim(),
        category,
        date,
        time,
        duration,
        severity,
        frequency,
        associatedSymptoms,
        menstrualPhase,
        doctorNotes: doctorNotes.trim(),
      });
    } else {
      addSymptom({
        symptomName: symptomName.trim(),
        category,
        date,
        time,
        duration,
        severity,
        frequency,
        associatedSymptoms,
        menstrualPhase,
        doctorNotes: doctorNotes.trim(),
      });
    }

    resetForm();
  };

  const toggleAssociated = (tag: string) => {
    setAssociatedSymptoms((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Filtered symptoms
  const filteredLogs = symptoms.filter((log) => {
    const matchesSearch =
      log.symptomName.toLowerCase().includes(filterSearch.toLowerCase()) ||
      (log.doctorNotes && log.doctorNotes.toLowerCase().includes(filterSearch.toLowerCase())) ||
      log.associatedSymptoms.some((s) => s.toLowerCase().includes(filterSearch.toLowerCase()));

    const matchesPhase =
      selectedPhaseFilter === 'All' || log.menstrualPhase === selectedPhaseFilter;

    return matchesSearch && matchesPhase;
  });

  // Calculate statistics
  const avgSeverity =
    symptoms.length > 0
      ? (symptoms.reduce((acc, curr) => acc + curr.severity, 0) / symptoms.length).toFixed(1)
      : '0';

  const severeCount = symptoms.filter((s) => s.severity >= 7).length;

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8A0AD] text-[#B83250] text-xs font-semibold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Personal Health Journal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#33272B]">
            Symptom Tracker & Timeline
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#554247]">
            Log occurrences, evaluate pain severity, and uncover patterns to discuss with your doctor.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('summary')}
            className="px-4 py-2.5 rounded-2xl bg-white border border-[#E8A0AD] hover:bg-[#FFF7F4] text-[#B83250] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Doctor Summary</span>
          </button>

          <button
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
            className="px-4 py-2.5 rounded-2xl bg-[#B83250] hover:bg-[#911F37] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record New Symptom</span>
          </button>
        </div>
      </div>

      {/* Safety Notice regarding patterns */}
      <div className="p-3.5 rounded-2xl bg-[#FFF0F2] border border-[#F5D8DE] text-xs text-[#554247] flex items-center gap-2.5">
        <AlertCircle className="w-4 h-4 text-[#B83250] shrink-0" />
        <span>
          <strong>Clinical Note:</strong> Recurring patterns in this journal are user-recorded observations, not medical diagnoses. They give your doctor context during consultations.
        </span>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-[#F5D8DE] shadow-xs">
          <div className="text-xs font-semibold text-[#554247]">Total Logs Recorded</div>
          <div className="text-2xl font-bold font-serif text-[#33272B] mt-1">
            {symptoms.length}
          </div>
          <div className="text-[11px] text-gray-500 mt-1">Stored securely in your browser</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#F5D8DE] shadow-xs">
          <div className="text-xs font-semibold text-[#554247]">Average Severity Scale</div>
          <div className="text-2xl font-bold font-serif text-[#B83250] mt-1">
            {avgSeverity} <span className="text-sm font-normal text-[#554247]">/ 10</span>
          </div>
          <div className="text-[11px] text-gray-500 mt-1">1 = Mild discomfort, 10 = Severe</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#F5D8DE] shadow-xs">
          <div className="text-xs font-semibold text-[#554247]">High Severity Episodes (≥7)</div>
          <div className="text-2xl font-bold font-serif text-amber-600 mt-1">
            {severeCount}
          </div>
          <div className="text-[11px] text-gray-500 mt-1">Episodes warranting priority clinical mention</div>
        </div>
      </div>

      {/* Logging Form (Drawer / Modal or Embedded Card) */}
      {isFormOpen && (
        <div className="bg-white rounded-3xl border-2 border-[#E8A0AD] p-6 sm:p-8 shadow-md space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-[#F5D8DE] pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#FFF0F2] text-[#B83250] flex items-center justify-center font-bold">
                {editingId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
              <h2 className="font-serif font-bold text-xl text-[#33272B]">
                {editingId ? 'Edit Symptom Entry' : 'Log a New Symptom'}
              </h2>
            </div>
            <button
              onClick={resetForm}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Quick symptom picker pills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#33272B] uppercase tracking-wider">
                Quick Select or Enter Symptom Name *
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {COMMON_SYMPTOMS.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setSymptomName(name)}
                    className={`text-[11px] px-2.5 py-1 rounded-xl border transition-all cursor-pointer ${
                      symptomName === name
                        ? 'bg-[#B83250] text-white border-[#B83250]'
                        : 'bg-[#FFF7F4] text-[#554247] border-[#F5D8DE] hover:border-[#E8A0AD]'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>

              <input
                type="text"
                required
                value={symptomName}
                onChange={(e) => setSymptomName(e.target.value)}
                placeholder="e.g. Throbbing pelvic cramp, extreme exhaustion, irregular spotting..."
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E8A0AD] text-sm text-[#33272B] focus:outline-hidden focus:border-[#B83250] focus:ring-2 focus:ring-[#B83250]/10"
              />
            </div>

            {/* Date, Time, Duration, Frequency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#33272B] mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E8A0AD] text-xs text-[#33272B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#33272B] mb-1">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E8A0AD] text-xs text-[#33272B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#33272B] mb-1">Duration</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 2 hours, all day, 3 days"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E8A0AD] text-xs text-[#33272B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#33272B] mb-1">Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as SymptomFrequency)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E8A0AD] text-xs text-[#33272B] bg-white"
                >
                  {FREQUENCIES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Severity Slider (1-10) with Visual Pain Gauge */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#FFF7F4] border border-[#F5D8DE]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#33272B] uppercase tracking-wider">
                  Severity Rating (1 to 10 Scale) *
                </label>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      severity >= 8
                        ? 'bg-red-100 text-red-700'
                        : severity >= 5
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    Level {severity} / 10 —{' '}
                    {severity >= 8 ? 'Severe' : severity >= 5 ? 'Moderate' : 'Mild'}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="10"
                value={severity}
                onChange={(e) => setSeverity(Number(e.target.value))}
                className="w-full accent-[#B83250] cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-gray-500 font-medium px-1">
                <span>1 (Barely noticeable)</span>
                <span>5 (Interferes with focus)</span>
                <span>10 (Debilitating / Bed rest)</span>
              </div>
            </div>

            {/* Menstrual Cycle Phase (Optional / Skippable) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#33272B] uppercase tracking-wider">
                  Cycle Phase (Optional — Skip if not applicable)
                </label>
                <span className="text-[11px] text-gray-400">
                  Not all women menstruate; feel free to skip
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {MENSTRUAL_PHASES.map((phase) => (
                  <button
                    key={phase}
                    type="button"
                    onClick={() => setMenstrualPhase(phase)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      menstrualPhase === phase
                        ? 'bg-[#B83250] text-white border-[#B83250]'
                        : 'bg-white text-[#554247] border-[#F5D8DE] hover:border-[#E8A0AD]'
                    }`}
                  >
                    {phase}
                  </button>
                ))}
              </div>
            </div>

            {/* Associated Symptoms Tags */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#33272B] uppercase tracking-wider">
                Associated Symptoms (Select any that apply)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ASSOCIATED_OPTIONS.map((tag) => {
                  const isSelected = associatedSymptoms.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleAssociated(tag)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#B83250]/10 text-[#B83250] border-[#B83250] font-semibold'
                          : 'bg-white text-[#554247] border-[#F5D8DE] hover:border-[#E8A0AD]'
                      }`}
                    >
                      {tag} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes for Doctor */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#33272B] uppercase tracking-wider">
                Notes for Doctor Consultation (Triggers, pain relief tried, functional impact)
              </label>
              <textarea
                rows={3}
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                placeholder="e.g. Occurred after 8 hours of standing; paracetamol provided slight relief; had to miss classes."
                className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#E8A0AD] text-xs sm:text-sm text-[#33272B] focus:outline-hidden focus:border-[#B83250]"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F5D8DE]">
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#B83250] hover:bg-[#911F37] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
              >
                {editingId ? 'Save Changes' : 'Record Symptom Entry'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar for Logs */}
      <div className="bg-white rounded-3xl p-5 border border-[#F5D8DE] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
            placeholder="Search symptoms or notes..."
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-[#E8A0AD] text-xs text-[#33272B] focus:outline-hidden focus:border-[#B83250]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-[#554247] shrink-0 font-medium">Phase:</span>
          {['All', 'Menstrual', 'Luteal', 'Follicular'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPhaseFilter(p)}
              className={`px-3 py-1 rounded-xl text-xs font-medium border cursor-pointer shrink-0 transition-all ${
                selectedPhaseFilter === p
                  ? 'bg-[#B83250] text-white border-[#B83250]'
                  : 'bg-[#FFF7F4] text-[#554247] border-[#F5D8DE] hover:border-[#E8A0AD]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Log Timeline List */}
      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-3xl border border-[#F5D8DE]">
            <Activity className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <h3 className="font-serif font-bold text-base text-[#33272B]">No entries found</h3>
            <p className="text-xs text-[#554247] mt-1 max-w-sm mx-auto">
              No recorded entries match your filter. Click "Record New Symptom" to begin.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F5D8DE] hover:border-[#E8A0AD] shadow-xs transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#33272B]">
                        {log.symptomName}
                      </h3>
                      {log.menstrualPhase && log.menstrualPhase !== 'Not Applicable / Skip' && (
                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FFF0F2] text-[#B83250] border border-[#F5D8DE]">
                          {log.menstrualPhase}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#554247]">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {log.date} at {log.time}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        Duration: {log.duration}
                      </span>
                      <span>•</span>
                      <span className="font-medium text-[#B83250]">{log.frequency}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[10px] text-gray-400 uppercase font-bold">Severity</div>
                      <div
                        className={`text-base font-bold ${
                          log.severity >= 8
                            ? 'text-red-600'
                            : log.severity >= 5
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                        }`}
                      >
                        {log.severity} / 10
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditClick(log)}
                        className="p-2 rounded-xl text-gray-500 hover:text-[#B83250] hover:bg-[#FFF7F4] border border-transparent hover:border-[#E8A0AD] transition-colors cursor-pointer"
                        title="Edit entry"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteSymptom(log.id)}
                        className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Associated Symptoms Pills */}
                {log.associatedSymptoms && log.associatedSymptoms.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[11px] font-medium text-gray-400 self-center mr-1">
                      Associated:
                    </span>
                    {log.associatedSymptoms.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-0.5 rounded-md bg-[#FFF7F4] text-[#554247] border border-[#F5D8DE]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Notes for Doctor */}
                {log.doctorNotes && (
                  <div className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100 text-xs text-[#33272B] leading-relaxed">
                    <span className="font-semibold text-gray-700">Doctor Note: </span>
                    {log.doctorNotes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
