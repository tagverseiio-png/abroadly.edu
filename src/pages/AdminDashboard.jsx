import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Building2, BookOpen, MessageSquare, Loader2, Database } from 'lucide-react';
import { getCountries, getUniversities, getProgrammes, getEnquiries, seedAllData } from '../firebase/firestore';

const cards = [
  { key: 'countries', label: 'Countries', icon: Globe, color: 'bg-emerald-500', to: '/admin/countries' },
  { key: 'universities', label: 'Universities', icon: Building2, color: 'bg-blue-500', to: '/admin/universities' },
  { key: 'programmes', label: 'Programmes', icon: BookOpen, color: 'bg-violet-500', to: '/admin/programmes' },
  { key: 'enquiries', label: 'Enquiries', icon: MessageSquare, color: 'bg-orange-500', to: '/admin/enquiries' },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [c, u, p, e] = await Promise.all([
        getCountries(), getUniversities(), getProgrammes(), getEnquiries()
      ]);
      if (!cancelled) setCounts({ countries: c.length, universities: u.length, programmes: p.length, enquiries: e.length });
    })();
    return () => { cancelled = true; };
  }, []);

  const handleSeed = async () => {
    if (!window.confirm('This will add the default countries, universities, and programmes to Firestore. Continue?')) return;
    setSeeding(true); setSeedMsg('');
    try {
      await seedAllData();
      setSeedMsg('Seed data added successfully!');
      const [c, u, p, e] = await Promise.all([
        getCountries(), getUniversities(), getProgrammes(), getEnquiries()
      ]);
      setCounts({ countries: c.length, universities: u.length, programmes: p.length, enquiries: e.length });
    } catch (err) {
      setSeedMsg('Error: ' + err.message);
    } finally {
      setSeeding(false);
    }
  };

  if (!counts) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-emerald-500 animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
        <button onClick={handleSeed} disabled={seeding} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors">
          <Database className="w-4 h-4" />
          {seeding ? 'Seeding...' : 'Seed Data'}
        </button>
      </div>

      {seedMsg && <div className="mb-6 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-xl px-4 py-3">{seedMsg}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(c => (
          <Link key={c.key} to={c.to} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow group">
            <div className={`w-12 h-12 ${c.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <c.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{counts[c.key]}</div>
            <div className="text-sm font-bold text-slate-500 mt-1">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
