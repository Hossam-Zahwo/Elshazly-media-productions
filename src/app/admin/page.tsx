'use client';

import { useEffect, useState } from 'react';
import { MediaItem } from '../lib/media';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

export default function AdminPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [form, setForm] = useState<Omit<MediaItem, 'id'>>({
    title: '',
    type: 'image',
    url: '',
    section: '',
  });
  const [message, setMessage] = useState<string | null>(null);

  const sections = ['Wedding', 'Events', 'Production', 'Company', 'Catering', 'Showreel'];

  const getFileName = (section: string) => section.toLowerCase() + '.json';

  useEffect(() => {
    if (!form.section) return;
    const file = getFileName(form.section);
    fetch(`/data/${file}`)
      .then(res => res.json())
      .then(setMedia)
      .catch(() => setMedia([]));
  }, [form.section]);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const addMedia = async () => {
    if (!form.section) return alert('Please select a section first.');

    const res = await fetch(`/api/media?section=${form.section}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        url: form.url,
        type: form.type,
      }),
    });

    const result = await res.json();

    if (!res.ok || result.error) {
      alert(result.error || 'An error occurred while adding.');
      return;
    }

    setMedia(prev => [...prev, result.item]);
    setMessage('✅ Successfully added');
    setForm({ title: '', type: 'image', url: '', section: form.section });
  };

const deleteMedia = async (id: number) => {
  if (!form.section) return;

  const res = await fetch(`/api/media/${id}?section=${form.section}`, {
    method: 'DELETE',
  });

  const result = await res.json();

  if (!res.ok || result.error) {
    alert(result.error || 'An error occurred while deleting.');
    return;
  }

  setMedia(prev => prev.filter(m => m.id !== id));
  setMessage('🗑️ Successfully deleted');
};


  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {message && (
        <div className="bg-green-700 text-white p-2 px-4 rounded mb-6 text-sm shadow">
          {message}
        </div>
      )}

      {/* ✅ Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <input
          placeholder="Title"
          className="p-2 bg-gray-800 rounded text-sm"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Media URL"
          className="p-2 bg-gray-800 rounded text-sm"
          value={form.url}
          onChange={e => setForm({ ...form, url: e.target.value })}
        />
        <select
          className="p-2 bg-gray-800 rounded text-sm"
          value={form.section}
          onChange={e => setForm({ ...form, section: e.target.value })}
        >
          <option value="">Select Section</option>
          {sections.map(section => (
            <option key={section} value={section}>{section}</option>
          ))}
        </select>
        <select
          className="p-2 bg-gray-800 rounded text-sm"
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value as 'image' | 'video' })}
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <button
          onClick={addMedia}
          className="bg-green-600 px-4 py-2 rounded font-bold hover:bg-green-700 text-sm col-span-1 md:col-span-2 lg:col-span-1 flex items-center justify-center gap-2"
        >
          <FaPlusCircle /> Add Media
        </button>
      </div>

      {/* ✅ Media List */}
      <div className="grid gap-4">
        {media.length === 0 ? (
          <p className="text-gray-400">No media items added for this section yet.</p>
        ) : (
          media.map((item) => (
            <div key={item.id} className="bg-gray-900 p-3 rounded flex justify-between items-center shadow">
              <div>
                <div className="font-semibold text-sm">{item.title}</div>
                <div className="text-xs text-gray-400">{item.section} • {item.type}</div>
              </div>
              <button
                onClick={() => deleteMedia(item.id)}
                className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
