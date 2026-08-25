import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, query, where, orderBy, serverTimestamp, writeBatch
} from 'firebase/firestore';
import { db } from './config';

// ─── COUNTRIES ───────────────────────────────────────────
export const getCountries = async () => {
  const snap = await getDocs(collection(db, 'countries'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getCountryBySlug = async (slug) => {
  const q = query(collection(db, 'countries'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
};

export const addCountry = (data) => addDoc(collection(db, 'countries'), data);
export const updateCountry = (id, data) => updateDoc(doc(db, 'countries', id), data);
export const deleteCountry = (id) => deleteDoc(doc(db, 'countries', id));

// ─── UNIVERSITIES ────────────────────────────────────────
export const getUniversities = async (countrySlug) => {
  let q;
  if (countrySlug) {
    q = query(collection(db, 'universities'), where('country', '==', countrySlug));
  } else {
    q = query(collection(db, 'universities'));
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addUniversity = (data) => addDoc(collection(db, 'universities'), data);
export const updateUniversity = (id, data) => updateDoc(doc(db, 'universities', id), data);
export const deleteUniversity = (id) => deleteDoc(doc(db, 'universities', id));

// ─── PROGRAMMES ──────────────────────────────────────────
export const getProgrammes = async (filters = {}) => {
  let q = collection(db, 'programmes');
  const constraints = [];
  if (filters.university) constraints.push(where('university', '==', filters.university));
  if (filters.field) constraints.push(where('field', '==', filters.field));
  if (filters.level) constraints.push(where('level', '==', filters.level));
  if (constraints.length) q = query(q, ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addProgramme = (data) => addDoc(collection(db, 'programmes'), data);
export const updateProgramme = (id, data) => updateDoc(doc(db, 'programmes', id), data);
export const deleteProgramme = (id) => deleteDoc(doc(db, 'programmes', id));

// ─── ENQUIRIES ───────────────────────────────────────────
export const addEnquiry = (data) => addDoc(collection(db, 'enquiries'), {
  ...data,
  createdAt: serverTimestamp(),
  status: 'new',
});

export const getEnquiries = async () => {
  const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const updateEnquiry = (id, data) => updateDoc(doc(db, 'enquiries', id), data);

// ─── SEED DATA ───────────────────────────────────────────
import { countriesData } from '../data/countriesData';
import { universitiesData } from '../data/universitiesData';
import { programmesData } from '../data/programmes';

export const seedAllData = async () => {
  const batch = writeBatch(db);

  countriesData.forEach(c => {
    const ref = doc(collection(db, 'countries'));
    batch.set(ref, c);
  });

  universitiesData.forEach(u => {
    const ref = doc(collection(db, 'universities'));
    batch.set(ref, u);
  });

  programmesData.forEach(p => {
    const ref = doc(collection(db, 'programmes'));
    batch.set(ref, p);
  });

  await batch.commit();
};
