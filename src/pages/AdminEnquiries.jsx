import { useEffect, useState } from 'react';
import { Loader2, Eye, Mail, User, GraduationCap, Clock } from 'lucide-react';
import { getEnquiries, updateEnquiry } from '../firebase/firestore';

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  read: 'bg-slate-100 text-slate-600',
  replied: 'bg-emerald-100 text-emerald-700',
};

export default function AdminEnquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = async () => { setLoading(true); setItems(await getEnquiries()); setLoading(false); };
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await getEnquiries();
      if (!cancelled) { setItems(data); setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, []);

  const markRead = async (item) => {
    if (item.status === 'new') {
      await updateEnquiry(item.id, { status: 'read' });
      await load();
    }
    setSelected(item);
  };

  const formatDate = (ts) => {
    if (!ts) return '-';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-emerald-500 animate-spin" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6">Enquiries</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-6 py-3 font-bold text-slate-600">Name</th>
              <th className="text-left px-6 py-3 font-bold text-slate-600">Programme</th>
              <th className="text-left px-6 py-3 font-bold text-slate-600">Date</th>
              <th className="text-left px-6 py-3 font-bold text-slate-600">Status</th>
              <th className="text-right px-6 py-3 font-bold text-slate-600">View</th>
            </tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${item.status === 'new' ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-6 py-4 font-bold text-slate-900">{item.fullName || item.name || '-'}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium max-w-[150px] truncate">{item.programme || '-'}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{formatDate(item.createdAt)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[item.status] || 'bg-slate-100 text-slate-600'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => markRead(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {!items.length && <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">No enquiries yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-extrabold mb-4">Enquiry Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><User className="w-4 h-4 text-slate-400" /><span className="font-bold text-slate-700">Name:</span> {selected.fullName || selected.name || '-'}</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" /><span className="font-bold text-slate-700">Email:</span> {selected.email}</div>
              {selected.phone && <div className="flex items-center gap-2"><span className="font-bold text-slate-700 ml-6">Phone:</span> {selected.phone}</div>}
              <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-slate-400" /><span className="font-bold text-slate-700">Programme:</span> {selected.programme || '-'}</div>
              {selected.message && <div className="pt-2"><span className="font-bold text-slate-700">Message:</span><p className="mt-1 text-slate-600 whitespace-pre-wrap">{selected.message}</p></div>}
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /><span className="font-bold text-slate-700">Date:</span> {formatDate(selected.createdAt)}</div>
            </div>
            <button onClick={() => setSelected(null)} className="mt-6 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition-colors text-sm">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
