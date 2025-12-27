import { useState } from 'react';
import { createBook } from '@/services/api';
import { Book } from '@/types';

/**
 * Admin Dashboard Page
 *
 * - Accessible only by admin users
 * - Create Book functionality
 */
export function Admin() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    if (!title || !author || !description) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      // Sadece gerekli alanları göndermek için Partial kullandık
      const newBook: Partial<Omit<Book, 'id'>> = {
        title,
        author,
        description,
      };

      await createBook(newBook);

      setSuccess('Book created successfully.');
      setTitle('');
      setAuthor('');
      setDescription('');
    } catch {
      setError('Failed to create book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold mb-2 gradient-text">
        Admin Dashboard
      </h1>

      <p className="text-slate-600 mb-8">
        This page is restricted to administrators only. Admins can manage
        library resources and configure system features.
      </p>

      {/* CREATE BOOK */}
      <div className="glass-effect p-6 rounded-2xl border max-w-xl">
        <h2 className="text-xl font-semibold mb-4">📚 Create New Book</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:from-violet-700 hover:to-indigo-700 transition"
          >
            {loading ? 'Creating...' : 'Create Book'}
          </button>
        </form>
      </div>
    </div>
  );
}
