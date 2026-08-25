import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Save } from 'lucide-react';
import { getUniversities, addUniversity, updateUniversity, deleteUniversity } from '../firebase/firestore';
import { universitiesData } from '../data/universitiesData';

const fields = ['name', 'slug', 'country', 'image', 'ranking', 'website', 'description'];

export default function AdminUniversities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const load = async () => { setLoading(true); setItems(await getUniversities()); setLoading(false); };
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await getUniversities();
      if (!cancelled) { setItems(data); setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, []);

  const openNew = () => { setEditing('new'); setForm({}); };
  const openEdit = (item) => { setEditing(item.id); setForm({ ...item }); };
  const cancel = () => { setEditing(null); setForm({}); };

  const save = async () => {
    setSaving(true);
    try {
      if (editing === 'new') await addUniversity(form);
      else await updateUniversity(editing, form);
      await load(); cancel();
    } catch (err) { alert('Error: ' + err.message); }
    setSaving(false);
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this university?')) return;
    await deleteUniversity(id); await load();
  };

  const seedFromLocal = async () => {
    if (!window.confirm('Add local seed universities to Firestore?')) return;
    for (const u of universitiesData) await addUniversity(u);
    await load();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-emerald-500 animate-spin" /></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Universities</h1>
        <div className="flex gap-2">
          <button onClick={seedFromLocal} className="text-sm font-bold text-slate-500 hover:text-slate-700 px-3 py-2">Seed Local</button>
          <button onClick={openNew} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors">
            <Plus className="w-4 h-4" /> Add University
          </button>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={cancel}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-extrabold">{editing === 'new' ? 'New University' : 'Edit University'}</h2>
              <button onClick={cancel} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              {fields.map(k => (
                <div key={k}>
                  <label className="block text-sm font-bold text-slate-700 mb-1 capitalize">{k}</label>
                  <input value={form[k] || ''} onChange={e => setForm({ ...form, [k]: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                <textarea rows={3} value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm" />
              </div>
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
              <th className="text-left px-6 py-3 font-bold text-slate-600">Country</th>
              <th className="text-left px-6 py-3 font-bold text-slate-600">Ranking</th>
              <th className="text-right px-6 py-3 font-bold text-slate-600">Actions</th>
            </tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{item.country}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{item.ranking || '-'}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => openEdit(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => remove(item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {!items.length && <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium">No universities yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
