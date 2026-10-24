import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { jsPDF } from 'jspdf';
import {
  Printer,
  Download,
  Copy,
  Check,
  FileText,
  Calendar,
  AlertCircle,
  Plus,
  Trash2,
  Edit3,
  Stethoscope,
  Clock,
  ShieldCheck,
  User,
  FileDown,
  Loader2,
} from 'lucide-react';
import { SAMPLE_PATIENT_NAME } from '../data/sampleData';

export const HealthSummaryPage: React.FC = () => {
  const {
    symptoms,
    doctorQuestions,
    addDoctorQuestion,
    toggleDoctorQuestion,
    deleteDoctorQuestion,
    isSampleDataActive,
  } = useHealth();

  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [patientName, setPatientName] = useState(
    isSampleDataActive ? 'Priya Sharma (Sample Patient)' : 'Patient Self-Report'
  );
  const [patientAge, setPatientAge] = useState('21');
  const [additionalClinicalNotes, setAdditionalClinicalNotes] = useState(
    'Primary goal for appointment: Discuss severity of menstrual cramps and persistent daytime fatigue.'
  );
  const [newQuestionInput, setNewQuestionInput] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let y = 18;

      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - 20) {
          doc.addPage();
          y = 18;
          addPageHeaderDecorations();
        }
      };

      const addPageHeaderDecorations = () => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('HERwell — Clinical Consultation Health Summary', margin, 10);
        doc.text(`Patient: ${patientName}`, pageWidth - margin, 10, { align: 'right' });
        doc.setDrawColor(230, 230, 230);
        doc.setLineWidth(0.3);
        doc.line(margin, 12, pageWidth - margin, 12);
      };

      // Header Bar
      doc.setFillColor(184, 50, 80); // #B83250 Burgundy
      doc.rect(margin, y, contentWidth, 2, 'F');
      y += 6;

      // Title & Subtitle
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(184, 50, 80);
      doc.text('HERwell', margin, y);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(51, 39, 43);
      doc.text('Clinical Consultation Brief', margin + 30, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        pageWidth - margin,
        y,
        { align: 'right' }
      );
      y += 5;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(120, 120, 120);
      doc.text('Patient Pre-Consultation Symptom Journal & Doctor Discussion Prep', margin, y);
      y += 7;

      // Patient Metadata Card
      doc.setFillColor(255, 247, 244); // #FFF7F4
      doc.setDrawColor(245, 216, 222); // #F5D8DE
      doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(120, 120, 120);
      doc.text('PATIENT IDENTIFIER', margin + 4, y + 5);
      doc.text('AGE', margin + 65, y + 5);
      doc.text('SYMPTOMS LOGGED', margin + 115, y + 5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 39, 43);
      doc.text(patientName || 'Not specified', margin + 4, y + 11);
      doc.text(patientAge ? `${patientAge} yrs` : 'Not specified', margin + 65, y + 11);
      doc.setTextColor(184, 50, 80);
      doc.text(`${symptoms.length} entries recorded`, margin + 115, y + 11);

      y += 22;

      // Section 1: Chief Clinical Goal
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(184, 50, 80);
      doc.text('1. Chief Clinical Concern / Primary Goal', margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 39, 43);
      const noteLines = doc.splitTextToSize(
        additionalClinicalNotes || 'No specific chief concern noted.',
        contentWidth - 6
      );
      const boxHeight = Math.max(10, noteLines.length * 4.5 + 4);
      doc.setFillColor(249, 250, 251);
      doc.setDrawColor(229, 231, 235);
      doc.roundedRect(margin, y, contentWidth, boxHeight, 1.5, 1.5, 'FD');
      doc.text(noteLines, margin + 3, y + 5);
      y += boxHeight + 8;

      // Section 2: Symptom Timeline
      checkPageBreak(25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(184, 50, 80);
      doc.text(`2. Self-Reported Symptom Timeline & Severity (${symptoms.length} entries)`, margin, y);
      y += 5;

      if (symptoms.length === 0) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text('No symptoms currently recorded in the journal.', margin + 2, y + 4);
        y += 10;
      } else {
        symptoms.forEach((s, idx) => {
          checkPageBreak(28);

          const cardY = y;
          doc.setFillColor(255, 255, 255);
          doc.setDrawColor(230, 230, 230);
          doc.roundedRect(margin, cardY, contentWidth, 22, 1.5, 1.5, 'FD');

          // Left severity bar
          if (s.severity >= 8) {
            doc.setFillColor(239, 68, 68);
          } else if (s.severity >= 5) {
            doc.setFillColor(245, 158, 11);
          } else {
            doc.setFillColor(16, 185, 129);
          }
          doc.rect(margin, cardY, 2, 22, 'F');

          // Symptom title
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9.5);
          doc.setTextColor(51, 39, 43);
          doc.text(`#${idx + 1}  ${s.symptomName}`, margin + 5, cardY + 5);

          // Severity
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(184, 50, 80);
          doc.text(`Severity: ${s.severity}/10`, pageWidth - margin - 35, cardY + 5);

          if (s.menstrualPhase && s.menstrualPhase !== 'Not Applicable / Skip') {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.5);
            doc.setTextColor(120, 120, 120);
            doc.text(`(${s.menstrualPhase.split(' ')[0]})`, pageWidth - margin - 15, cardY + 5, { align: 'right' });
          }

          // Metadata row
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          doc.text(
            `Date: ${s.date} ${s.time ? `at ${s.time}` : ''} | Duration: ${s.duration || 'N/A'} | Frequency: ${s.frequency}`,
            margin + 5,
            cardY + 10
          );

          // Associated & notes
          let subText = '';
          if (s.associatedSymptoms && s.associatedSymptoms.length > 0) {
            subText += `Associated: ${s.associatedSymptoms.join(', ')}. `;
          }
          if (s.doctorNotes) {
            subText += `Patient Note: ${s.doctorNotes}`;
          }

          if (subText) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.5);
            doc.setTextColor(70, 70, 70);
            const subLines = doc.splitTextToSize(subText, contentWidth - 10);
            doc.text(subLines.slice(0, 2), margin + 5, cardY + 15);
          }

          y = cardY + 25;
        });
      }

      y += 4;

      // Section 3: Prepared Questions
      checkPageBreak(30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(184, 50, 80);
      doc.text(`3. Questions Prepared for Healthcare Provider (${doctorQuestions.length})`, margin, y);
      y += 6;

      if (doctorQuestions.length === 0) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text('No questions currently prepared.', margin + 2, y + 2);
        y += 8;
      } else {
        doctorQuestions.forEach((q, idx) => {
          checkPageBreak(12);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(q.checked ? 140 : 51, q.checked ? 140 : 39, q.checked ? 140 : 43);

          const checkMark = q.checked ? '[X]' : '[  ]';
          doc.text(checkMark, margin + 2, y);

          doc.setFont('helvetica', q.checked ? 'italic' : 'normal');
          doc.setFontSize(8.5);
          const qTextLines = doc.splitTextToSize(
            `${idx + 1}. ${q.text}${q.sourceTopicTitle ? ` (Ref: ${q.sourceTopicTitle})` : ''}`,
            contentWidth - 12
          );
          doc.text(qTextLines, margin + 8, y);
          y += Math.max(6.5, qTextLines.length * 4.2);
        });
      }

      y += 6;

      // Section 4: Clinician Notes space
      checkPageBreak(35);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(100, 100, 100);
      doc.text('CLINICIAN CONSULTATION NOTES & RECOMMENDATIONS (FOR CLINICAL USE)', margin, y);
      y += 4;

      doc.setDrawColor(190, 190, 190);
      doc.setLineDashPattern([2, 2], 0);
      doc.roundedRect(margin, y, contentWidth, 22, 1.5, 1.5, 'D');
      doc.setLineDashPattern([], 0);
      y += 26;

      // Footers on all pages
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(140, 140, 140);
        doc.setDrawColor(230, 230, 230);
        doc.setLineWidth(0.3);
        doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
        doc.text(
          'HERwell — Digital Women’s Health Companion | Self-Reported Health Journal | Does Not Replace Medical Care',
          margin,
          pageHeight - 8
        );
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
      }

      const cleanName = (patientName || 'Patient').replace(/[^a-zA-Z0-9]/g, '_');
      doc.save(`HERwell_Health_Summary_${cleanName}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF with jsPDF:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const generateMarkdownSummary = () => {
    let md = `# HERwell — Clinical Consultation Health Summary\n`;
    md += `Date Generated: ${new Date().toLocaleDateString()} | Time: ${new Date().toLocaleTimeString()}\n`;
    md += `Patient Identifier: ${patientName} (Age: ${patientAge})\n\n`;
    md += `IMPORTANT NOTICE: This summary contains self-reported symptoms and user-selected questions compiled via HERwell. It does NOT constitute a clinical diagnosis or medical record.\n\n`;

    md += `## 1. Primary Clinical Intent & Notes\n`;
    md += `${additionalClinicalNotes || 'None specified'}\n\n`;

    md += `## 2. Self-Reported Symptom Timeline & Severity (${symptoms.length} entries)\n`;
    if (symptoms.length === 0) {
      md += `*No symptoms recorded.*\n\n`;
    } else {
      symptoms.forEach((s, idx) => {
        md += `### ${idx + 1}. ${s.symptomName}\n`;
        md += `- **Date/Time:** ${s.date} at ${s.time} (Duration: ${s.duration})\n`;
        md += `- **Severity Rating:** ${s.severity}/10 | **Frequency:** ${s.frequency}\n`;
        if (s.menstrualPhase && s.menstrualPhase !== 'Not Applicable / Skip') {
          md += `- **Cycle Phase:** ${s.menstrualPhase}\n`;
        }
        if (s.associatedSymptoms.length > 0) {
          md += `- **Associated Symptoms:** ${s.associatedSymptoms.join(', ')}\n`;
        }
        if (s.doctorNotes) {
          md += `- **User Notes:** ${s.doctorNotes}\n`;
        }
        md += `\n`;
      });
    }

    md += `## 3. Questions to Discuss with Healthcare Provider\n`;
    if (doctorQuestions.length === 0) {
      md += `*No questions prepared.*\n\n`;
    } else {
      doctorQuestions.forEach((q, idx) => {
        md += `${idx + 1}. [${q.checked ? 'X' : ' '}] ${q.text}`;
        if (q.sourceTopicTitle) {
          md += ` *(Topic: ${q.sourceTopicTitle})*`;
        }
        md += `\n`;
      });
    }

    md += `\n---\n*Generated using HERwell — Your Women’s Health Companion.*`;
    return md;
  };

  const handleCopy = () => {
    const text = generateMarkdownSummary();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const text = generateMarkdownSummary();
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HERwell-Health-Summary-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionInput.trim()) return;
    addDoctorQuestion(newQuestionInput.trim(), 'Appointment Prep');
    setNewQuestionInput('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Screen-Only Header & Action Toolbar */}
      <div className="no-print space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8A0AD] text-[#B83250] text-xs font-semibold mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Doctor Consultation Brief</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#33272B]">
              My Health Summary
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#554247]">
              Preview, customize, and print your structured health summary before your doctor visit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-2.5 rounded-2xl bg-[#B83250] hover:bg-[#911F37] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              title="Generate and download clinical PDF report"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2.5 rounded-2xl bg-white border border-[#E8A0AD] hover:bg-[#FFF7F4] text-[#33272B] text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              title="Open browser print dialog"
            >
              <Printer className="w-4 h-4 text-[#B83250]" />
              <span>Print Brief</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="px-3.5 py-2.5 rounded-2xl bg-white border border-[#E8A0AD] hover:bg-[#FFF7F4] text-[#33272B] text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#B83250]" />
              <span>Download .md</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3.5 py-2.5 rounded-2xl bg-white border border-[#E8A0AD] hover:bg-[#FFF7F4] text-[#33272B] text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#B83250]" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Customization Card */}
        <div className="bg-white rounded-3xl p-5 border border-[#F5D8DE] shadow-xs space-y-3">
          <div className="text-xs font-bold text-[#33272B] uppercase tracking-wider flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5 text-[#B83250]" />
            <span>Customize Appointment Header Details</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                Patient Name or Identifier
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8A0AD] text-xs text-[#33272B]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">Age</label>
              <input
                type="text"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8A0AD] text-xs text-[#33272B]"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 mb-1">
              Primary Goal for Appointment / Main Concern
            </label>
            <input
              type="text"
              value={additionalClinicalNotes}
              onChange={(e) => setAdditionalClinicalNotes(e.target.value)}
              placeholder="e.g. Discussing irregular periods, pelvic pain, requesting blood tests..."
              className="w-full px-3 py-2 rounded-xl border border-[#E8A0AD] text-xs text-[#33272B]"
            />
          </div>
        </div>
      </div>

      {/* Printable Clinical Document Canvas */}
      <div className="print-container bg-white rounded-3xl p-6 sm:p-10 border border-[#F5D8DE] shadow-md space-y-8 text-[#33272B]">
        {/* Document Header */}
        <div className="border-b-2 border-[#B83250] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-serif text-[#B83250] tracking-tight">
                HERwell
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#FFF0F2] text-[#B83250] border border-[#F5D8DE]">
                Clinical Consultation Brief
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Self-Reported Patient Symptom Journal & Appointment Prep
            </p>
          </div>

          <div className="text-xs text-gray-500 text-left sm:text-right space-y-0.5">
            <div>
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </div>
            <div>
              <strong>Time:</strong> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div>
              <strong>Format:</strong> Patient Pre-Consultation Summary
            </div>
          </div>
        </div>

        {/* Patient & Consultation Overview Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#FFF7F4] border border-[#F5D8DE] text-xs">
          <div>
            <span className="text-gray-500 block text-[10px] uppercase font-bold">Patient Name</span>
            <span className="font-semibold text-sm text-[#33272B]">{patientName}</span>
          </div>
          <div>
            <span className="text-gray-500 block text-[10px] uppercase font-bold">Age</span>
            <span className="font-semibold text-sm text-[#33272B]">{patientAge || 'Not specified'}</span>
          </div>
          <div>
            <span className="text-gray-500 block text-[10px] uppercase font-bold">Total Logs Tracked</span>
            <span className="font-semibold text-sm text-[#B83250]">{symptoms.length} entries</span>
          </div>
        </div>

        {/* Main Concern */}
        <div className="space-y-1.5">
          <h3 className="font-serif font-bold text-sm text-[#33272B] uppercase tracking-wider">
            1. Chief Clinical Concern / Goal
          </h3>
          <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 text-xs sm:text-sm text-[#33272B] leading-relaxed">
            {additionalClinicalNotes || 'No specific chief concern noted.'}
          </div>
        </div>

        {/* Symptom Timeline Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-sm text-[#33272B] uppercase tracking-wider">
              2. User-Reported Symptom Timeline & Severity
            </h3>
            <span className="text-[11px] text-gray-500">Chronological Record</span>
          </div>

          {symptoms.length === 0 ? (
            <div className="p-6 text-center text-xs text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              No symptoms currently recorded in the journal.
            </div>
          ) : (
            <div className="space-y-3">
              {symptoms.map((log, idx) => (
                <div
                  key={log.id}
                  className="p-4 rounded-2xl border border-gray-200 bg-white space-y-2 break-inside-avoid"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="font-bold text-sm text-[#33272B]">
                      <span className="text-[#B83250] mr-2">#{idx + 1}</span>
                      {log.symptomName}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                        Severity: {log.severity}/10
                      </span>
                      {log.menstrualPhase && log.menstrualPhase !== 'Not Applicable / Skip' && (
                        <span className="px-2 py-0.5 rounded-full bg-[#FFF0F2] text-[#B83250] border border-[#F5D8DE]">
                          {log.menstrualPhase}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                    <div>
                      <strong>Date & Time:</strong> {log.date} at {log.time}
                    </div>
                    <div>
                      <strong>Duration:</strong> {log.duration}
                    </div>
                    <div>
                      <strong>Frequency:</strong> {log.frequency}
                    </div>
                  </div>

                  {log.associatedSymptoms && log.associatedSymptoms.length > 0 && (
                    <div className="text-xs text-gray-600">
                      <strong>Associated Symptoms:</strong> {log.associatedSymptoms.join(', ')}
                    </div>
                  )}

                  {log.doctorNotes && (
                    <div className="text-xs text-[#33272B] bg-[#FFF7F4] p-2.5 rounded-xl border border-[#F5D8DE]">
                      <strong>Patient Note:</strong> {log.doctorNotes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Questions for Doctor */}
        <div className="space-y-3 break-inside-avoid">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-sm text-[#33272B] uppercase tracking-wider">
              3. Questions Prepared for the Clinician ({doctorQuestions.length})
            </h3>
            <span className="text-[11px] text-gray-500">Check during consultation</span>
          </div>

          {doctorQuestions.length === 0 ? (
            <div className="p-4 text-center text-xs text-gray-400 bg-gray-50 rounded-2xl">
              No questions prepared yet.
            </div>
          ) : (
            <div className="space-y-2">
              {doctorQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-3 rounded-xl border border-gray-200 bg-white flex items-start gap-3 text-xs text-[#33272B]"
                >
                  <input
                    type="checkbox"
                    checked={q.checked}
                    onChange={() => toggleDoctorQuestion(q.id)}
                    className="mt-0.5 accent-[#B83250] rounded-sm cursor-pointer"
                  />
                  <div className="flex-1 leading-relaxed">
                    <span className="font-medium">
                      {idx + 1}. {q.text}
                    </span>
                    {q.sourceTopicTitle && (
                      <span className="text-[10px] text-gray-400 ml-2 italic">
                        (Ref: {q.sourceTopicTitle})
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => deleteDoctorQuestion(q.id)}
                    className="no-print text-gray-400 hover:text-red-600 transition-colors p-1"
                    title="Remove question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Quick add question (screen only) */}
          <form onSubmit={handleAddQuestion} className="no-print flex gap-2 pt-2">
            <input
              type="text"
              value={newQuestionInput}
              onChange={(e) => setNewQuestionInput(e.target.value)}
              placeholder="Add another question for your doctor to this summary..."
              className="flex-1 px-3 py-2 rounded-xl text-xs bg-[#FFF7F4]/60 border border-[#E8A0AD] text-[#33272B]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#B83250] hover:bg-[#911F37] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>
        </div>

        {/* Doctor's Consultation Notes Box for Paper Writing */}
        <div className="p-4 rounded-2xl border-2 border-dashed border-gray-300 bg-white space-y-2 break-inside-avoid">
          <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">
            Physician / Clinician Notes & Recommendations (For clinical use during appointment)
          </div>
          <div className="h-24 border-b border-gray-100" />
        </div>

        {/* Medical Demarcation & Privacy Notice */}
        <div className="border-t border-gray-200 pt-4 text-[11px] text-gray-500 space-y-1">
          <p>
            <strong>Data Provenance Notice:</strong> All symptom logs, pain scales, and questions above were self-recorded by the user using the HERwell application. No automated AI diagnoses or assumed clinical facts have been inserted into this record.
          </p>
          <p>
            HERwell — Digital Women’s Health Companion. Built for educational empowerment and clinical appointment preparation.
          </p>
        </div>
      </div>
    </div>
  );
};
