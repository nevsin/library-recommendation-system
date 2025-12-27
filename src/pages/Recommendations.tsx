import { useState } from 'react';
import { getRecommendations } from '@/services/api';

export function Recommendations() {
  const [query, setQuery] = useState('');
  const [recommendationText, setRecommendationText] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRecommendationText([]);
    if (!query) {
      setError('Please enter a query.');
      return;
    }

    setLoading(true);
    try {
      const result = await getRecommendations(query);
      setRecommendationText(result.recommendations); // artık hatasız
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold mb-4 gradient-text">
        🤖 Book Recommendations
      </h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query"
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-2.5 px-6 rounded-xl font-semibold hover:from-violet-700 hover:to-indigo-700 transition"
        >
          {loading ? 'Fetching...' : 'Get Recommendations'}
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {recommendationText.length > 0 && (
        <div className="space-y-4">
          {recommendationText.map((book, index) => (
            <div key={index} className="glass-effect p-4 rounded-xl border">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-sm text-slate-600">Author: {book.author}</p>
              <p className="text-sm mt-1">{book.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
