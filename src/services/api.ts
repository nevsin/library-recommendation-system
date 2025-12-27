const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* =========================
   🔐 AUTH
   ========================= */
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

/* =========================
   📚 BOOKS
   ========================= */
export const getBooks = async () => {
  const res = await fetch(`${API_BASE_URL}/books`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error('Failed to fetch books');
  return await res.json();
};

export const getBook = async (bookId: string) => {
  const res = await fetch(`${API_BASE_URL}/books/${bookId}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) return null;
  return await res.json();
};

export const createBook = async (bookData: any) => {
  const res = await fetch(`${API_BASE_URL}/books`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(bookData),
  });

  if (!res.ok) throw new Error('Failed to create book');
  return await res.json();
};

/* =========================
   📖 READING LISTS
   ========================= */
export const getReadingLists = async () => {
  const res = await fetch(`${API_BASE_URL}/reading-lists`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error('Failed to fetch reading lists');
  return await res.json();
};

export const createReadingList = async (listData: any) => {
  const res = await fetch(`${API_BASE_URL}/reading-lists`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(listData),
  });

  if (!res.ok) throw new Error('Failed to create reading list');
  return await res.json();
};

/* =========================
   🤖 RECOMMENDATIONS
   ========================= */
export const getRecommendations = async (query: string) => {
  const res = await fetch(`${API_BASE_URL}/recommendations`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to fetch recommendations');
  }

  const data = await res.json();
  console.log('API RESPONSE (getRecommendations):', data);

  return data.recommendations ?? [];
};
