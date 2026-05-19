import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Loader2, CheckCircle2, TrendingUp, LineChart, MessageCircle, Star, ShieldCheck, HelpCircle, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { countriesData } from '../data/countriesData';
import { universitiesData } from '../data/universitiesData';
import { programmesData } from '../data/programmes';
import AtlasChat from '../AtlasChat';

export default function CountryDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Active filter states
  const [activeCourseFilter, setActiveCourseFilter] = useState('All');

  // Load country data
  const country = countriesData.find(c => c.slug === slug);
  const universities = universitiesData.filter(u => u.country === slug);
  
  // Programmes filtering logic (if Malaysia, use APU data, else generate mock data based on country courses)
  const availableCourses = slug === 'malaysia' 
    ? [...new Set(programmesData.map(p => p.field))]
    : country?.courses || [];

  const displayProgrammes = slug === 'malaysia'
    ? programmesData.filter(p => activeCourseFilter === 'All' || p.field === activeCourseFilter).slice(0, 12)
    : country?.courses.map((c, i) => ({
        programme_name: `BSc in ${c}`,
        level: 'Bachelor',
        duration_years: 3,
        tuition_int_rm: 40000 + (i * 5000),
      })).filter(p => activeCourseFilter === 'All' || p.programme_name.includes(activeCourseFilter)) || [];

  useEffect(() => {
    // Simulate loading for premium feel
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!loading && !country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Destination Not Found</h1>
          <button onClick={() => navigate('/')} className="text-emerald-600 font-medium hover:underline">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src="/new-logo.png" alt="Abroadly Logo" className="h-10 w-auto object-contain" />
          </div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors bg-slate-100 hover:bg-emerald-50 px-4 py-2 rounded-xl"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </nav>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Curating top universities in {slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : ''}...</p>
        </div>
      ) : (
        <div className="animate-in fade-in duration-700">
          
          {/* Hero Banner (Glassmorphism) */}
          <div className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-slate-900">
            <div className="absolute inset-0">
              <img src={country.bannerImage || country.image} alt={country.name} className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-end justify-between gap-10">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider rounded-full mb-6 backdrop-blur-md">
                  <MapPin className="w-3 h-3" /> Top Study Destination
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                  Study in {country.name} {country.flag}
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                  {country.careerOpportunities}
                </p>
              </div>

              {/* Glassmorphism Quick Stats Card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-white w-full md:w-80 shrink-0 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-sm text-slate-300 font-medium">Visa Success</span>
                    <span className="font-bold text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> {country.visaSuccessRate}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-sm text-slate-300 font-medium">Tuition Range</span>
                    <span className="font-bold text-white">{country.tuitionRange}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300 font-medium">Next Intakes</span>
                    <span className="font-bold text-white">{country.intakes}</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/25">
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {/* Why Study Here */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Why Choose {country.name}?</h2>
                <p className="text-lg text-slate-600 font-medium">Unparalleled opportunities for international students.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {country.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg mb-1">Benefit {i+1}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Top Universities (Filtered by Country) */}
          <section className="py-20 bg-slate-50 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Elite Institutions</h2>
                  <p className="text-lg text-slate-600 font-medium">The most popular universities for international students in {country.name}.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {universities.map((uni, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[9px] uppercase tracking-widest font-extrabold px-2 py-1 rounded">
                         {uni.tag}
                      </span>
                      <div className="flex flex-col gap-1 items-end">
                        {uni.match === "Dream" && <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-200">Dream</span>}
                        {uni.match === "Moderate" && <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">Moderate</span>}
                        {uni.match === "Safe" && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">Safe</span>}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-tight group-hover:text-emerald-600 transition-colors">{uni.name}</h3>
                      <div className="flex items-center gap-1 mb-2 text-xs font-bold text-orange-600">
                        <TrendingUp className="w-3.5 h-3.5" /> {uni.roi}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-500" /> {uni.location}</span>
                        <span className="flex items-center gap-1"><LineChart className="w-3 h-3 text-emerald-500" /> {uni.fees}</span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">{uni.desc}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Top Programs</h4>
                      <ul className="space-y-2">
                        {uni.courses.map((course, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{course}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Dynamic Course Explorer */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Programme Explorer</h2>
                <p className="text-lg text-slate-600 font-medium">Filter and discover the exact degree that matches your goals.</p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <button 
                  onClick={() => setActiveCourseFilter('All')}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeCourseFilter === 'All' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  All Programmes
                </button>
                {availableCourses.map(course => (
                  <button 
                    key={course}
                    onClick={() => setActiveCourseFilter(course)}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeCourseFilter === course ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {course}
                  </button>
                ))}
              </div>

              {/* Programme Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProgrammes.map((prog, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                        {prog.level || 'Degree'}
                      </span>
                      <span className="text-xs font-bold text-slate-400 uppercase">{prog.duration_years} Years</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {prog.programme_name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <Briefcase className="w-4 h-4 text-emerald-500" />
                      {prog.field || 'General'}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400">Est. Tuition</span>
                        <span className="font-bold text-slate-900">RM {prog.tuition_int_rm?.toLocaleString() || 'N/A'}</span>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-colors">
                        <ChevronLeft className="w-5 h-5 rotate-180" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials & FAQs */}
          <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-16">
              
              {/* Testimonials */}
              <div>
                <h2 className="text-3xl font-extrabold mb-8">Student Success Stories</h2>
                <div className="space-y-6">
                  {country.testimonials.map((t, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 rounded-2xl relative">
                      <Star className="w-8 h-8 text-emerald-400 absolute top-6 right-6 opacity-20" />
                      <p className="text-slate-300 italic mb-6 relative z-10">"{t.text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center font-bold text-white shadow-inner">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">{t.name}</h4>
                          <span className="text-xs text-emerald-400 font-medium">{t.course}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-3xl font-extrabold mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {country.faqs.map((faq, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer">
                      <h3 className="font-bold text-lg mb-2 flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                        {faq.question}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed pl-9">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-16 bg-white border-b border-slate-200 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Ready to apply to {country.name}?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-xl">
                Start Free Application
              </button>
              <a href="https://wa.me/60123456789" target="_blank" rel="noreferrer" className="px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-colors shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </div>
          </section>

        </div>
      )}

      {/* Atlas AI Chat Widget */}
      <AtlasChat />
    </div>
  );
}
