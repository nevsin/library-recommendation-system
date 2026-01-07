import { fetchAuthSession } from 'aws-amplify/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* =========================
   🔐 AUTH 
   ========================= */
const getAuthHeaders = async (): Promise<HeadersInit> => {
  try {
    
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = token;

    }

    return headers;
  } catch (error) {
    console.error("Auth hatası:", error);
    return { 'Content-Type': 'application/json' };
  }
};

/* =========================
   📚 BOOKS 
   ========================= */
export const getBooks = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/books`, { headers });
  if (!res.ok) throw new Error('Failed to fetch books');
  return await res.json();
};

export const getBook = async (bookId: string) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/books/${bookId}`, { headers });
  if (!res.ok) return null;

  const data = await res.json();
  if (Array.isArray(data)) {
    return data.find((b: any) => String(b.id) === String(bookId)) ?? null;
  }
  return data;
};

export const createBook = async (bookData: any) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/books`, {
    method: 'POST',
    headers,
    body: JSON.stringify(bookData),
  });
  if (!res.ok) throw new Error('Failed to create book');
  return await res.json();
};


/* =========================
   📖 READING LISTS 
   ========================= */
export const getReadingLists = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/reading-lists`, { headers });
  if (!res.ok) throw new Error('Failed to fetch reading lists');
  return await res.json();
};

export const createReadingList = async (listData: any) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/reading-lists`, {
    method: 'POST',
    headers,
    body: JSON.stringify(listData),
  });
  if (!res.ok) throw new Error('Failed to create reading list');
  return await res.json();
};

/* =========================
   🤖 RECOMMENDATIONS 
   ========================= */
export const getRecommendations = async (query: string) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/recommendations`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to fetch recommendations');
  }

  const data = await res.json();
  return data.recommendations ?? data ?? [];
};