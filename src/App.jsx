import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Globe, 
  ChevronRight, 
  Star, 
  PhoneCall,
  Menu,
  X,
  CheckCircle2,
  Plane,
  Compass,
  MessageSquare,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Bot,
  Smartphone,
  LineChart,
  FileCheck,
  MessageCircle,
  TrendingUp,
  Loader2
} from 'lucide-react';
import AtlasChat from './AtlasChat';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleMatchMe = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Data Collections
  const stats = [
    { label: "Successful Placements", value: "3,000+" },
    { label: "Partner Universities", value: "40+" },
    { label: "Global Destinations", value: "10+" },
    { label: "Visa Success Rate", value: "99%" },
  ];

  const malaysianUniversities = [
    { name: "Asia Pacific University (APU)", tag: "Tech & Business", match: "Dream", roi: "High ROI", desc: "Premium tech and business education with unparalleled 100% employability.", courses: ["IT, AI & Cyber Security", "Accounting & FinTech", "Engineering"], location: "Kuala Lumpur", fees: "$6,500/yr", intakes: "Feb, May, Sep" },
    { name: "INTI International University", tag: "Global Pathways", match: "Moderate", roi: "Fast Payback", desc: "Diverse programs featuring exclusive US/UK transfer options.", courses: ["American Degree Transfer", "Business & HR", "Design & Media"], location: "Subang Jaya", fees: "$5,500/yr", intakes: "Jan, May, Aug" },
    { name: "SEGi University", tag: "Professional Focus", match: "Moderate", roi: "High ROI", desc: "Top choice for medical, law, and rigorous engineering degrees.", courses: ["MBBS & Pharmacy", "Law (UK Collab)", "Engineering"], location: "Kota Damansara", fees: "$6,000/yr", intakes: "Feb, Jun, Sep" },
    { name: "University of Cyberjaya (UOC)", tag: "Healthcare Specialists", match: "Dream", roi: "Premium", desc: "Highly specialized in medical and psychological sciences.", courses: ["MBBS", "Pharmacy & Nursing", "Psychology"], location: "Cyberjaya", fees: "$7,200/yr", intakes: "Mar, Jul, Oct" },
    { name: "TARUMT", tag: "Analytics & Engineering", match: "Safe", roi: "Max Value", desc: "Exceptional value combined with strong data and engineering faculties.", courses: ["Finance & Banking", "Data Science & IT", "Engineering"], location: "Kuala Lumpur", fees: "$3,800/yr", intakes: "May, Sep, Nov" },
    { name: "UOW Malaysia", tag: "Australian Excellence", match: "Dream", roi: "Premium", desc: "Industry-aligned programs boasting global collaborations.", courses: ["Computer Science", "Hospitality", "Business & Accounting"], location: "Shah Alam", fees: "$7,500/yr", intakes: "Jan, Apr, Aug" },
    { name: "MAHSA University", tag: "Healthcare Giant", match: "Moderate", roi: "High ROI", desc: "The ultimate destination for hardcore, intensive medical training.", courses: ["MBBS (5 Years)", "Dentistry", "Physiotherapy & Biomedical"], location: "Bandar Saujana Putra", fees: "$8,000/yr", intakes: "Feb, Sep" },
    { name: "UNITAR University", tag: "Modern Learning", match: "Safe", roi: "Fast Payback", desc: "Ideal for contemporary learners and ambitious working professionals.", courses: ["Business & Management", "Education / TESL", "IT & Design"], location: "Petaling Jaya", fees: "$4,500/yr", intakes: "Jan, May, Sep" }
  ];

  const destinations = [
    { 
      name: "Malaysia", 
      flag: "🇲🇾",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
      universities: ["Asia Pacific University", "INTI International", "MAHSA University", "SEGi University", "University of Wollongong"],
      courses: ["IT & AI", "Business Management", "Engineering", "Medicine"]
    },
    { 
      name: "Russia", 
      flag: "🇷🇺",
      image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&q=80&w=800",
      universities: ["Pirogov National Medical", "First Moscow State", "Dagestan State Medical", "Tomsk Polytechnic"],
      courses: ["MBBS / Medicine", "Aviation Engineering", "Oil & Tech", "Pedagogy"]
    },
    { 
      name: "Poland", 
      flag: "🇵🇱",
      image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&q=80&w=800",
      universities: ["Medical Univ. of Silesia", "Nicolaus Copernicus", "Warsaw Univ. of Business", "SWPS University"],
      courses: ["Medicine", "Psychology", "Business", "IT & Design"]
    },
    { 
      name: "Georgia", 
      flag: "🇬🇪",
      image: "https://images.unsplash.com/photo-1583002621021-39e802a24683?auto=format&fit=crop&q=80&w=800",
      universities: ["Alte University", "East European University", "Caucasus International", "Georgian National"],
      courses: ["MBBS / Medicine", "Business", "International Relations"]
    }
  ];

  const process = [
    { icon: <Bot className="w-6 h-6 text-emerald-600" />, title: "AI Predictive Matching", desc: "Our algorithm matches your budget and grades to the perfect university." },
    { icon: <FileCheck className="w-6 h-6 text-emerald-600" />, title: "Universal Document Vault", desc: "Upload transcripts once. Apply to multiple global universities seamlessly." },
    { icon: <MessageCircle className="w-6 h-6 text-emerald-600" />, title: "WhatsApp Tracking", desc: "Get real-time updates on your application and visa status via WhatsApp." },
    { icon: <Plane className="w-6 h-6 text-emerald-600" />, title: "Premium Concierge", desc: "Access education loans, flight bookings, and local housing seamlessly." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-900 relative">
      
      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/60123456789" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group flex items-center justify-center">
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with AI Counselor
        </span>
        <span className="absolute -inset-1 bg-[#25D366] rounded-full blur opacity-40 animate-pulse -z-10"></span>
      </a>

      {/* Navigation - Premium EdTech Style */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-md py-4 border-b border-slate-200/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div className="flex flex-col cursor-pointer">
              <div className="flex items-center">
                <img src="/logo.png" alt="Abroadly Logo" className="h-16 w-auto object-contain" />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8 font-bold text-slate-600 text-sm">
              <a href="#ai-advantage" className="hover:text-emerald-600 transition-colors">The AI Advantage</a>
              <a href="#destinations" className="hover:text-emerald-600 transition-colors">Study Abroad</a>
              <a href="#malaysia-partners" className="hover:text-emerald-600 transition-colors">Universities</a>
              <a href="#landing-support" className="hover:text-emerald-600 transition-colors">Concierge</a>
              <div className="flex items-center gap-4 border-l border-slate-200 pl-8">
                <button className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition-colors">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" /> WhatsApp Us
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-orange-500/20">
                  Find My Match
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-800 hover:text-emerald-600 transition-colors">
                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 p-6 absolute w-full shadow-2xl flex flex-col gap-5 font-bold text-slate-700">
            <a href="#ai-advantage" onClick={() => setIsMenuOpen(false)} className="hover:text-emerald-600">The AI Advantage</a>
            <a href="#destinations" onClick={() => setIsMenuOpen(false)} className="hover:text-emerald-600">Study Abroad</a>
            <a href="#malaysia-partners" onClick={() => setIsMenuOpen(false)} className="hover:text-emerald-600">Universities</a>
            <a href="#landing-support" onClick={() => setIsMenuOpen(false)} className="hover:text-emerald-600">Concierge</a>
            <hr className="my-2 border-slate-100" />
            <button className="bg-orange-500 text-white px-6 py-3.5 rounded-lg font-bold w-full shadow-lg shadow-orange-500/20">
              Find My Match
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section - AI Driven Form */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 overflow-hidden bg-emerald-50">
        <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/3 w-[800px] h-[800px] bg-white rounded-full blur-3xl pointer-events-none opacity-80"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-8 lg:pr-8">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-bold text-slate-700 shadow-sm">
              <Bot className="w-4 h-4 text-emerald-600" />
              Powered by Advanced Predictive AI
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              Smarter Matching. <br/>
              <span className="text-emerald-600">Better Careers.</span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed font-medium max-w-xl">
              Get personalized university recommendations based on your budget, grades, and career goals. We calculate admission probability and expected ROI instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-200">
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?img=1" alt="Student" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                  <img src="https://i.pravatar.cc/100?img=2" alt="Student" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                  <img src="https://i.pravatar.cc/100?img=3" alt="Student" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                </div>
                <div className="text-sm font-bold text-slate-800">
                  <div className="flex items-center gap-0.5 text-orange-500 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-orange-500" />)}
                  </div>
                  Join 3,000+ Enrolled Scholars
                </div>
              </div>
            </div>
          </div>

          {/* AI Matchmaker Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-8 shadow-2xl shadow-emerald-900/10 border border-slate-200 relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-orange-500 rounded-t-2xl"></div>
              
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2 mt-2 flex items-center gap-2">
                <Bot className="w-6 h-6 text-emerald-600" /> AI Profile Matchmaker
              </h3>
              <p className="text-slate-500 mb-6 text-sm font-medium">Get your Top 3 personalized university recommendations instantly.</p>
              
              <form className="space-y-4" onSubmit={handleMatchMe}>
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 pl-1">Level of Study</label>
                      <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium cursor-pointer">
                        <option value="" disabled className="text-slate-400">Select Level</option>
                        <option>Foundation</option>
                        <option>Diploma</option>
                        <option>Bachelor's</option>
                        <option>Master's</option>
                        <option>PhD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 pl-1">Field of Study</label>
                      <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium cursor-pointer">
                        <option value="" disabled className="text-slate-400">Select Course</option>
                        <option>IT / AI / Data Science</option>
                        <option>Business & Mgmt</option>
                        <option>Engineering</option>
                        <option>Health Sciences / MBBS</option>
                        <option>Other Fields</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 pl-1">Academic Background</label>
                      <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium cursor-pointer">
                        <option value="" disabled className="text-slate-400">Highest Qual.</option>
                        <option>High School / SPM</option>
                        <option>O-Levels / A-Levels</option>
                        <option>Diploma Graduate</option>
                        <option>Bachelor's Graduate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 pl-1">Yearly Budget Range</label>
                      <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium cursor-pointer">
                        <option value="" disabled className="text-slate-400">Select Budget</option>
                        <option>Economy ($3k - $5k / yr)</option>
                        <option>Standard ($5k - $8k / yr)</option>
                        <option>Premium ($8k+ / yr)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 pl-1">Contact for Match Results</label>
                    <div className="flex gap-2">
                      <input type="text" className="w-1/2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium transition-all" placeholder="Full Name" />
                      <div className="flex w-1/2 gap-1 bg-slate-50 border border-slate-200 rounded-lg pr-3 focus-within:ring-2 focus-within:ring-emerald-500 transition-all overflow-hidden">
                        <span className="bg-slate-100 px-2 py-2.5 text-slate-500 text-xs font-bold border-r border-slate-200 flex items-center justify-center">
                          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        </span>
                        <input type="tel" className="w-full bg-transparent px-2 py-2.5 text-slate-900 focus:outline-none text-sm font-medium" placeholder="WhatsApp No." />
                      </div>
                    </div>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white rounded-lg py-3.5 font-bold text-base transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 mt-5"
                >
                  {isAnalyzing ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing Profile...</>
                  ) : (
                    <>Analyze & Match Me <ChevronRight className="w-5 h-5" /></>
                  )}
                </button>
                <p className="text-center text-[10px] text-slate-500 font-bold mt-3 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" /> Matches will be sent via WhatsApp securely.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-emerald-800 py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-emerald-700">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center px-4">
                <div className="text-3xl lg:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-emerald-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Abroadly AI Advantage Section */}
      <section id="ai-advantage" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">The Next-Generation Study Platform</h2>
            <p className="text-lg text-slate-600 font-medium">We've replaced traditional slow counseling with intelligent automation and WhatsApp integration.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
              <Bot className="text-emerald-600 w-10 h-10 mb-6" />
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">Predictive Matching</h3>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">Our algorithm categorizes universities into Safe, Moderate, and Dream targets based on your exact academic profile.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
              <Smartphone className="text-emerald-600 w-10 h-10 mb-6" />
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">WhatsApp Native</h3>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">Discover courses, get counseling, and track your application milestones entirely within WhatsApp. No app downloads required.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
              <LineChart className="text-emerald-600 w-10 h-10 mb-6" />
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">ROI Insights Engine</h3>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">Make data-driven decisions. We compare course fees against expected graduate salaries to calculate payback periods.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
              <FileCheck className="text-emerald-600 w-10 h-10 mb-6" />
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">Universal Vault</h3>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">Upload your transcripts and passport once. Our system auto-fills and submits your applications to multiple universities simultaneously.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Destinations Section (Grid Cards) */}
      <section id="destinations" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Explore Top Destinations</h2>
              <p className="text-lg text-slate-600 font-medium">Discover world-class education hubs matching your career goals.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((dest, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="h-40 relative overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <span className="text-3xl shadow-sm">{dest.flag}</span>
                    <h3 className="text-xl font-extrabold text-white">{dest.name}</h3>
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">High ROI Fields</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.courses.map((course, i) => (
                        <span key={i} className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-[10px] font-bold border border-emerald-100">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Top Partners</h4>
                    <ul className="space-y-1.5">
                      {dest.universities.slice(0, 3).map((uni, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="truncate">{uni}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Malaysian Universities Section (With Predictive Tags) */}
      <section id="malaysia-partners" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Malaysia's Top Institutions</h2>
            <p className="text-lg text-slate-600 font-medium">Affordable tuition, English-medium programs, and incredible ROI.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {malaysianUniversities.map((uni, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                
                {/* AI Probability Tags */}
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center gap-1 bg-slate-200/50 text-slate-600 text-[9px] uppercase tracking-widest font-extrabold px-2 py-1 rounded">
                     {uni.tag}
                  </span>
                  <div className="flex flex-col gap-1 items-end">
                    {uni.match === "Dream" && <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-200">Dream Target</span>}
                    {uni.match === "Moderate" && <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">Moderate Hit</span>}
                    {uni.match === "Safe" && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">Safe Option</span>}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-tight">{uni.name}</h3>
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

      {/* Process / Services Section */}
      <section id="services" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">The AI-Powered Funnel</h2>
            <p className="text-lg text-slate-600 font-medium">A simplified, transparent 4-step journey to your dream global university.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative group">
                <div className="absolute top-6 right-6 text-5xl font-black text-slate-100 group-hover:text-emerald-50 transition-colors">
                  0{idx + 1}
                </div>
                <div className="relative z-10">
                  <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Post-Arrival & Monetization Services Section */}
      <section id="landing-support" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 relative z-10">
              
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider mb-6">
                  <Star className="w-4 h-4 fill-emerald-400" /> Premium Concierge Package
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                  Seamless Landing & Local Integration
                </h2>
                <p className="text-slate-300 text-lg font-medium mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Our commitment to you doesn't end when you get your visa. Access our premium ancillary partnerships for education loans, housing, and immediate post-arrival support.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-lg font-bold transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20">
                    <MessageCircle className="w-5 h-5" /> Ask About Ancillary Services
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-5/12">
                 <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
                   <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Plane className="w-8 h-8 text-emerald-600" />
                   </div>
                   <h3 className="text-2xl font-extrabold text-slate-900 mb-6">Partner Services</h3>
                   <ul className="text-left space-y-4 mb-2">
                     {[
                       "Education Loan Facilitation",
                       "Chauffeur airport pickup & transfer",
                       "Accommodation hunting & booking",
                       "Forex & local bank account setup"
                     ].map((item, i) => (
                       <li key={i} className="flex items-start gap-3 text-slate-700 font-bold text-sm">
                         <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                         <span>{item}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            
            {/* Brand */}
            <div className="md:col-span-4 space-y-6">
              <div className="flex items-center bg-white p-3 rounded-xl w-max">
                <img src="/logo.png" alt="Abroadly Logo" className="h-12 w-auto object-contain" />
              </div>
              <p className="text-sm font-medium leading-relaxed">
                Next-Generation Study Abroad Platform. We use predictive AI and conversational matching to secure your placement globally.
              </p>
            </div>

            {/* Links */}
            <div className="md:col-span-2">
              <h4 className="text-white font-extrabold text-lg mb-6">Destinations</h4>
              <ul className="space-y-3 text-sm font-bold">
                <li><a href="#malaysia-partners" className="hover:text-emerald-500 transition-colors">Study in Malaysia</a></li>
                <li><a href="#destinations" className="hover:text-emerald-500 transition-colors">Study in Russia</a></li>
                <li><a href="#destinations" className="hover:text-emerald-500 transition-colors">Study in Poland</a></li>
                <li><a href="#destinations" className="hover:text-emerald-500 transition-colors">Study in Baltics</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="md:col-span-2">
              <h4 className="text-white font-extrabold text-lg mb-6">Features</h4>
              <ul className="space-y-3 text-sm font-bold">
                <li><a href="#home" className="hover:text-emerald-500 transition-colors">AI Matchmaker</a></li>
                <li><a href="#services" className="hover:text-emerald-500 transition-colors">Universal Vault</a></li>
                <li><a href="#landing-support" className="hover:text-emerald-500 transition-colors">Education Loans</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <h4 className="text-white font-extrabold text-lg mb-6">Get in Touch</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li className="flex items-center gap-3">
                  <div className="bg-[#25D366]/20 p-2 rounded text-[#25D366]"><MessageCircle className="w-4 h-4" /></div>
                  <a href="https://wa.me/60123456789" className="hover:text-[#25D366] transition-colors text-slate-300">WhatsApp AI Counselor</a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-emerald-900/50 p-2 rounded text-emerald-500"><Globe className="w-4 h-4" /></div>
                  <a href="mailto:hello@abroadly.com" className="hover:text-emerald-400 transition-colors text-slate-300">hello@abroadly.com</a>
                </li>
              </ul>
            </div>

          </div>
          
          <div className="pt-8 border-t border-slate-800 text-sm font-bold flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
            <p>© {new Date().getFullYear()} Abroadly AI Education. All rights reserved.</p>
            <p>Smart Matching. Better Careers.</p>
          </div>
        </div>
      </footer>

      {/* Match Results Modal */}
      {showResults && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowResults(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-sm z-20">
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Bot className="w-6 h-6 text-emerald-600" /> AI Match Results
              </h3>
              <button onClick={() => setShowResults(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6 bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm font-medium border border-emerald-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p>Based on your profile, we've analyzed 40+ universities and found the top 3 best matches that align with your budget, academic background, and career goals.</p>
              </div>

              <div className="space-y-4">
                {malaysianUniversities.slice(0, 3).map((uni, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-5 hover:border-emerald-300 transition-all duration-300 relative overflow-hidden group hover:shadow-md">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h4 className="text-lg font-extrabold text-slate-900">{uni.name}</h4>
                          {uni.match === "Dream" && <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-200">Dream Target</span>}
                          {uni.match === "Moderate" && <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">Moderate Hit</span>}
                          {uni.match === "Safe" && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">Safe Option</span>}
                        </div>
                        <p className="text-slate-500 text-sm font-medium mb-3">{uni.desc}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                          <div className="bg-slate-50 p-2 rounded-md border border-slate-100">
                            <span className="block text-[9px] text-slate-400 font-bold uppercase">Location</span>
                            <span className="text-xs font-semibold text-slate-700">{uni.location}</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-md border border-slate-100">
                            <span className="block text-[9px] text-slate-400 font-bold uppercase">Est. Fees</span>
                            <span className="text-xs font-semibold text-slate-700">{uni.fees}</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-md border border-slate-100 hidden md:block">
                            <span className="block text-[9px] text-slate-400 font-bold uppercase">Intakes</span>
                            <span className="text-xs font-semibold text-slate-700">{uni.intakes}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 mb-3">
                           {uni.courses.map((c, i) => <span key={i} className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded border border-emerald-100">{c}</span>)}
                        </div>

                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <span className="flex items-center gap-1 text-orange-600"><TrendingUp className="w-3.5 h-3.5" /> {uni.roi}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span className="text-emerald-600">{uni.tag}</span>
                        </div>
                      </div>
                      <button className="bg-slate-900 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap shadow-md flex items-center justify-center gap-2">
                         Get Full Report <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button onClick={() => setShowResults(false)} className="text-slate-500 hover:text-slate-800 text-sm font-bold transition-colors">
                  Close Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Atlas AI Chat Widget */}
      <AtlasChat />
    </div>
  );
}
