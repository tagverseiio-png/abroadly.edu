import React, { useState } from 'react';
import { 
  X, Building2, MapPin, Award, BookOpen, Clock, 
  Calendar, CheckCircle2, DollarSign, Briefcase, 
  TrendingUp, GraduationCap, FileText, ChevronRight 
} from 'lucide-react';

export default function ReportModal({ universities, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const selectedUni = universities[activeIndex];
  const { reportDetails } = selectedUni;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'fees', label: 'Fees & Scholarships', icon: DollarSign },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'intakes', label: 'Intakes', icon: Calendar },
    { id: 'admission', label: 'Admission', icon: CheckCircle2 },
    { id: 'career', label: 'Career & ROI', icon: Briefcase }
  ];

  if (!reportDetails) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
        <div className="bg-white rounded-2xl shadow-2xl p-8 relative z-10 text-center">
          <p className="text-slate-600 mb-4 font-medium">Detailed report not available for this university yet.</p>
          <button onClick={onClose} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl relative z-10 flex flex-col max-h-full overflow-hidden border border-slate-200">
        
        {/* Header - Navy & Gold Theme */}
        <div className="bg-slate-900 px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-yellow-500" />
              Comprehensive Admission Report
            </h2>
            <p className="text-slate-400 text-sm font-medium mt-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-yellow-500/70" /> {selectedUni.location}, {selectedUni.country.charAt(0).toUpperCase() + selectedUni.country.slice(1)}
            </p>
          </div>
          
          <button 
            onClick={onClose} 
            className="absolute top-5 right-5 sm:relative sm:top-0 sm:right-0 bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-full transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* University Switcher (if multiple) */}
        {universities.length > 1 && (
          <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex overflow-x-auto gap-2 scrollbar-hide shrink-0">
            {universities.map((uni, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeIndex === idx 
                    ? 'bg-slate-900 text-yellow-500 shadow-md' 
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {uni.name}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto shrink-0 p-4 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left whitespace-nowrap md:whitespace-normal ${
                    isActive 
                      ? 'bg-yellow-500 text-slate-900 shadow-md shadow-yellow-500/20' 
                      : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-extrabold text-slate-900">{selectedUni.name}</h3>
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-xs font-bold border border-yellow-200 uppercase tracking-wide">
                    {selectedUni.tag}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Global & National Ranking</h4>
                    <p className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" /> {reportDetails.overview.ranking}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Graduate Employability</h4>
                    <p className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-yellow-500" /> {reportDetails.overview.employability} Employment Rate
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-extrabold text-slate-900 mb-3">About the University</h4>
                  <p className="text-slate-600 leading-relaxed font-medium">{reportDetails.overview.aboutText}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Key Specialisations</h4>
                    <ul className="space-y-2.5">
                      {reportDetails.overview.specialisations.map((spec, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">University Highlights</h4>
                    <ul className="space-y-2.5">
                      {reportDetails.overview.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* FEES TAB */}
            {activeTab === 'fees' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
                  <h4 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-1">Estimated Yearly Total</h4>
                  <p className="text-4xl font-black">{reportDetails.fees.totalEstimate}</p>
                  <p className="text-slate-400 text-xs mt-2 font-medium">Includes tuition, accommodation, and living expenses.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: "Tuition Fee (Per Year)", value: reportDetails.fees.tuition },
                    { label: "Accommodation (Per Year)", value: reportDetails.fees.accommodation },
                    { label: "Living Expenses (Per Year)", value: reportDetails.fees.livingExpenses },
                    { label: "Registration Fee", value: reportDetails.fees.registration },
                  ].map((fee, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 border border-slate-200 rounded-xl bg-slate-50">
                      <span className="text-sm font-bold text-slate-600">{fee.label}</span>
                      <span className="text-sm font-extrabold text-slate-900">{fee.value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl flex gap-4 items-start">
                  <Award className="w-6 h-6 text-yellow-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-extrabold text-yellow-900 mb-1">Scholarships & Financial Aid</h4>
                    <p className="text-sm text-yellow-800 font-medium">{reportDetails.fees.scholarshipInfo}</p>
                  </div>
                </div>
              </div>
            )}

            {/* COURSES TAB */}
            {activeTab === 'courses' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Available Programmes</h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">List of highly sought-after degree programmes matched to your profile.</p>
                
                <div className="space-y-3">
                  {reportDetails.coursesList.map((course, idx) => (
                    <div key={idx} className="flex justify-between items-center p-5 border border-slate-200 rounded-xl hover:border-yellow-500 hover:shadow-md transition-all group">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-slate-400 group-hover:text-yellow-500 transition-colors" />
                        <span className="font-bold text-slate-800 text-sm">{course.name}</span>
                      </div>
                      <div className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {course.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INTAKES TAB */}
            {activeTab === 'intakes' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Application Windows</h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">Missing a deadline means waiting up to 6 months. Plan your application carefully.</p>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reportDetails.intakesList.map((intake, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-center hover:border-yellow-500 transition-colors">
                      <Calendar className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                      <h4 className="text-lg font-extrabold text-slate-900 mb-1">{intake.month} Intake</h4>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Deadline: <span className="text-red-500">{intake.deadline}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADMISSION TAB */}
            {activeTab === 'admission' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Entry Requirements</h3>
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h4 className="text-sm font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-yellow-500" /> Academic Prerequisites
                  </h4>
                  <p className="text-sm text-slate-600 font-medium">{reportDetails.admission.academic}</p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h4 className="text-sm font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-yellow-500" /> Language Requirements
                  </h4>
                  <p className="text-sm text-slate-600 font-medium">{reportDetails.admission.language}</p>
                </div>

                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 mb-4">Required Documents Checklist</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {reportDetails.admission.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg bg-white shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-semibold text-slate-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CAREER TAB */}
            {activeTab === 'career' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800">
                    <h4 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-1">Graduate Employment Rate</h4>
                    <p className="text-4xl font-black">{reportDetails.career.employabilityPercent}%</p>
                    <p className="text-slate-400 text-xs mt-2 font-medium">Secured jobs within 6 months of graduation.</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Average Starting Salary</h4>
                    <p className="text-2xl font-black text-slate-900">{reportDetails.career.averageSalary}</p>
                    <p className="text-slate-500 text-xs mt-2 font-medium">Based on recent alumni surveys.</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-extrabold text-slate-900 mb-6">Employment Sectors</h4>
                  <div className="space-y-4">
                    {reportDetails.career.sectors.map((sector, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm font-bold text-slate-700 mb-1.5">
                          <span>{sector.name}</span>
                          <span>{sector.percent}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-yellow-500 h-2.5 rounded-full transition-all duration-1000" 
                            style={{ width: `${sector.percent}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-end gap-4 shrink-0">
          <button 
            onClick={() => window.open(`https://wa.me/60123456789?text=${encodeURIComponent(`Hi! I'd like to proceed with my application for ${selectedUni.name}.`)}`, '_blank')}
            className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-2.5 rounded-lg text-sm font-extrabold transition-all shadow-md shadow-yellow-500/20 flex items-center gap-2"
          >
            Start Application <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
