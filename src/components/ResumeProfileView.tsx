import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home,
  Briefcase, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Instagram, 
  ArrowRight, 
  Layers, 
  FileText, 
  Quote, 
  Sparkles,
  Download,
  Building2,
  Cpu,
  Compass
} from 'lucide-react';
import { RESUME_DATA } from '../data/initialData';
import { sound } from '../utils/audio';

interface ResumeProfileViewProps {
  onBackToMaquette: () => void;
}

export const ResumeProfileView: React.FC<ResumeProfileViewProps> = ({
  onBackToMaquette
}) => {
  return (
    <div className="min-h-screen bg-[#f5f6f8] pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Back to Home Button */}
      <div className="mb-6">
        <button
          onClick={() => { sound.playClick(); onBackToMaquette(); }}
          className="text-xs font-bold text-gray-800 hover:text-white hover:bg-black flex items-center gap-2 transition-all glass-panel px-4 py-2.5 rounded-2xl shadow-clay-sm w-fit border border-white hover:scale-105 active:scale-95 cursor-pointer"
          title="بازگشت به صفحه اصلی ماکت شهرک"
        >
          <Home className="w-4 h-4 text-blue-600" />
          <span>🏠 بازگشت به صفحه اصلی (ماکت شهرک)</span>
        </button>
      </div>

      {/* Hero Profile Bento Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 sm:p-10 shadow-clay-md border border-white/90 relative overflow-hidden mb-8"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar Profile Initials / Badge */}
            <div className="w-24 h-24 rounded-3xl bg-black text-white flex flex-col items-center justify-center shadow-clay-lg shrink-0 border-2 border-white">
              <span className="font-mono text-2xl font-black tracking-tighter">SM</span>
              <span className="text-[9px] font-mono tracking-widest text-gray-400 mt-1">ARCHITECT</span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  GAAM STUDIO // BARCELONA & TEHRAN
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  15+ YEARS EXPERIENCE
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                {RESUME_DATA.name}
              </h1>
              <p className="text-xs sm:text-sm font-mono text-gray-500 mt-1 font-semibold">
                {RESUME_DATA.englishTitle}
              </p>
              <p className="text-xs text-gray-600 flex items-center gap-1.5 mt-2">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {RESUME_DATA.location}
              </p>
            </div>
          </div>

          {/* Direct Contact Buttons */}
          <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0">
            <a
              href={`mailto:${RESUME_DATA.email}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors shadow-clay-sm"
            >
              <Mail className="w-4 h-4" />
              <span>ارسال ایمیل به سهیل مستی</span>
            </a>
            <a
              href="https://linkedin.com/in/soheil-masti"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0077b5] text-white text-xs font-bold hover:bg-[#005f93] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>پروفایل لینکدین (LinkedIn)</span>
            </a>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-100 text-gray-800 text-xs font-mono font-bold">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span className="dir-ltr">{RESUME_DATA.phone}</span>
            </div>
          </div>
        </div>

        {/* Bio Narrative */}
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mt-6 pt-6 border-t border-gray-100 max-w-4xl text-justify">
          {RESUME_DATA.bio}
        </p>
      </motion.div>

      {/* Grid: Experience Timeline & Competencies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Experience Timeline (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2 rounded-xl bg-black text-white">
              <Briefcase className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">
              سوابق حرفه‌ای و رهبری پروژه‌ها (Experience)
            </h2>
          </div>

          <div className="space-y-4">
            {RESUME_DATA.experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white p-6 rounded-3xl shadow-clay-sm border border-gray-100 relative group hover:shadow-clay-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold mb-3">
                  <span className="text-black">{exp.company}</span>
                  <span>•</span>
                  <span>{exp.location}</span>
                </div>

                <ul className="space-y-2 text-xs text-gray-600 leading-relaxed">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Competencies, BIM Stack & Education (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* BIM & Software Stack */}
          <div className="bg-white p-6 rounded-3xl shadow-clay-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-gray-900">
                تخصص‌های فنی و مهارت‌های نرم‌افزاری
              </h2>
            </div>

            <div className="space-y-4">
              {RESUME_DATA.competencies.map((comp, cIdx) => (
                <div key={cIdx} className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-700">{comp.category}:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {comp.skills.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 text-[11px] font-medium border border-gray-100 transition-colors"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white p-6 rounded-3xl shadow-clay-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-gray-900">
                تحصیلات آکادمیک (Education)
              </h2>
            </div>

            <div className="space-y-4">
              {RESUME_DATA.education.map((edu, eIdx) => (
                <div key={eIdx} className="border-r-2 border-emerald-500 pr-3.5 space-y-1">
                  <h4 className="text-xs font-bold text-gray-900">{edu.degree}</h4>
                  <p className="text-xs text-gray-600">{edu.university}</p>
                  <span className="text-[10px] font-mono text-gray-400 block">{edu.year} • {edu.location}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Competition Awards */}
          <div className="bg-white p-6 rounded-3xl shadow-clay-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-gray-900">
                جوایز و مسابقات معماری
              </h2>
            </div>

            <div className="space-y-3">
              {RESUME_DATA.awards.map((award, aIdx) => (
                <div key={aIdx} className="flex items-start gap-2.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-gray-800 block">{award.title}</span>
                    <span className="text-gray-500 font-mono text-[11px]">{award.rank} — {award.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials & Professional References */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-clay-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Quote className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">
            توصیه‌نامه‌ها و بازخورد کارفرمایان برجسته (References)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESUME_DATA.references.map((ref, rIdx) => (
            <div key={rIdx} className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <p className="text-xs text-gray-700 leading-relaxed italic mb-4">
                {ref.quote}
              </p>
              <div className="pt-3 border-t border-gray-200">
                <h4 className="text-xs font-bold text-gray-900">{ref.name}</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">{ref.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
