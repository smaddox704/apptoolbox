"use client";

import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";

type Note = { id: string; text: string; updatedAt: number };
const STORAGE_KEY = "steves-toolbox-notes";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setNotes(JSON.parse(saved));
    } catch { localStorage.removeItem(STORAGE_KEY); }
    setReady(true);
  }, []);

  useEffect(() => { if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); }, [notes, ready]);

  function saveNote() {
    const text = draft.trim();
    if (!text) return;
    if (editingId) setNotes((items) => items.map((note) => note.id === editingId ? { ...note, text, updatedAt: Date.now() } : note));
    else setNotes((items) => [{ id: crypto.randomUUID(), text, updatedAt: Date.now() }, ...items]);
    setDraft("");
    setEditingId(null);
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
      <AppHeader label="Notes" />
      <div className="mb-9"><h1 className="text-4xl font-bold tracking-[-.04em] sm:text-6xl">Your notes</h1><p className="mt-3 text-black/50">Saved automatically on this device.</p></div>
      <section className="rounded-[2rem] bg-white/85 p-5 shadow-card ring-1 ring-black/5 sm:p-7">
        <label htmlFor="note" className="mb-3 block text-sm font-bold">{editingId ? "Edit note" : "New note"}</label>
        <textarea id="note" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="What's on your mind?" rows={4} className="w-full resize-none rounded-2xl bg-canvas p-4 text-base outline-none ring-1 ring-black/5 transition focus:ring-2 focus:ring-blue-500" />
        <div className="mt-4 flex gap-3">
          <button onClick={saveNote} disabled={!draft.trim()} className="min-h-12 flex-1 rounded-2xl bg-black px-6 font-bold text-white transition hover:bg-black/80 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-30">{editingId ? "Save changes" : "Add note"}</button>
          {editingId && <button onClick={() => { setEditingId(null); setDraft(""); }} className="min-h-12 rounded-2xl bg-black/5 px-5 font-semibold">Cancel</button>}
        </div>
      </section>
      <section className="mt-8 space-y-4" aria-label="Saved notes">
        {ready && notes.length === 0 && <div className="rounded-[2rem] border-2 border-dashed border-black/10 p-12 text-center"><div className="text-4xl">📝</div><p className="mt-4 font-semibold text-black/45">Your first note is just a thought away.</p></div>}
        {notes.map((note) => <article key={note.id} className="rounded-[1.75rem] bg-white/85 p-6 shadow-sm ring-1 ring-black/5"><p className="whitespace-pre-wrap leading-relaxed">{note.text}</p><div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4"><span className="text-xs text-black/35">Updated {new Date(note.updatedAt).toLocaleDateString()}</span><div className="flex gap-2"><button onClick={() => { setEditingId(note.id); setDraft(note.text); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="min-h-11 rounded-xl bg-blue-50 px-4 text-sm font-bold text-blue-600">Edit</button><button onClick={() => { if (editingId === note.id) { setEditingId(null); setDraft(""); } setNotes((items) => items.filter((item) => item.id !== note.id)); }} className="min-h-11 rounded-xl bg-red-50 px-4 text-sm font-bold text-red-600">Delete</button></div></div></article>)}
      </section>
    </main>
  );
}
