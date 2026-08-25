import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Save } from 'lucide-react';
import { getProgrammes, addProgramme, updateProgramme, deleteProgramme } from '../firebase/firestore';
import { programmesData } from '../data/programmes';

const fields = ['name', 'slug', 'university', 'field', 'level', 'degree', 'duration', 'language', 'tuitionFee', 'description'];

export default function AdminProgrammes() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [filterUni, setFilterUni] = useState('');

  const load = async () => {
    setLoading(true);
    setItems(await getProgrammes(filterUni ? { university: filterUni } : {}));
    setLoading(false);
  };
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await getProgrammes(filterUni ? { university: filterUni } : {});
      if (!cancelled) { setItems(data); setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [filterUni]);

  const openNew = () => { setEditing('new'); setForm({}); };
  const openEdit = (item) => { setEditing(item.id); setForm({ ...item }); };
  const cancel = () => { setEditing(null); setForm({}); };

  const save = async () => {
    setSaving(true);
    try {
      if (editing === 'new') await addProgramme(form);
      else await updateProgramme(editing, form);
      await load(); cancel();
    } catch (err) { alert('Error: ' + err.message); }
    setSaving(false);
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this programme?')) return;
    await deleteProgramme(id); await load();
  };

  const seedFromLocal = async () => {
    if (!window.confirm(`Add all ${programmesData.length} local programmes to Firestore? This may take a moment.`)) return;
    for (const p of programmesData) await addProgramme(p);
    await load();
  };

  const uniNames = [...new Set(items.map(p => p.university).filter(Boolean))];

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-emerald-500 animate-spin" /></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Programmes</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <select value={filterUni} onChange={e => setFilterUni(e.target.value)} className="text-sm font-medium border border-slate-200 rounded-xl px-3 py-2 bg-white">
            <option value="">All Universities</option>
            {uniNames.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
          <button onClick={seedFromLocal} className="text-sm font-bold text-slate-500 hover:text-slate-700 px-3 py-2">Seed Local</button>
          <button onClick={openNew} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors">
            <Plus className="w-4 h-4" /> Add Programme
          </button>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={cancel}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-extrabold">{editing === 'new' ? 'New Programme' : 'Edit Programme'}</h2>
              <button onClick={cancel} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              {fields.map(k => (
                <div key={k}>
                  <label className="block text-sm font-bold text-slate-700 mb-1 capitalize">{k.replace(/([A-Z])/g, ' $1')}</label>
                  <input value={form[k] || ''} onChange={e => setForm({ ...form, [k]: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm" />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-bold px-5 py-2.5 rounded-xl">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
                </button>
                <button onClick={cancel} className="text-sm font-bold text-slate-500 hover:text-slate-700 px-4 py-2.5">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-6 py-3 font-bold text-slate-600">Name</th>
              <th className="text-left px-6 py-3 font-bold text-slate-600">University</th>
              <th className="text-left px-6 py-3 font-bold text-slate-600">Field</th>
              <th className="text-left px-6 py-3 font-bold text-slate-600">Level</th>
              <th className="text-right px-6 py-3 font-bold text-slate-600">Actions</th>
            </tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 max-w-[200px] truncate">{item.name}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{item.university}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{item.field}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{item.level}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => openEdit(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => remove(item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {!items.length && <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">No programmes yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
