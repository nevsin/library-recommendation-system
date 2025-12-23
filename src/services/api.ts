import { Book, ReadingList, Review, Recommendation } from '@/types';
import { fetchAuthSession } from 'aws-amplify/auth';
import { mockBooks as initialBooks } from '@/services/mockData';

/**
 * ============================================================================
 * API SERVICE LAYER – WEEK 3 FINAL
 * ============================================================================
 *
 * ✔ Authentication: Cognito JWT ready
 * ✔ Admin role via Cognito Groups
 * ✔ Books initialized from mockData
 * ✔ Admin-created books added in-memory
 * ✔ Prepared for DynamoDB in Week 4
 *
 * NOTE:
 * This file uses IN-MEMORY MOCK DATA.
 * All persistence will move to DynamoDB in Week 4.
 * ============================================================================
 */

/**
 * ============================================================================
 * AUTH HEADER HELPER
 * ============================================================================
 */
async function getAuthHeaders(): Promise<HeadersInit> {
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();

    if (!token) throw new Error('No token');

    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  } catch {
    return {
      'Content-Type': 'application/json',
    };
  }
}

/**
 * ============================================================================
 * BOOKS – IN-MEMORY STORE (SEED + ADMIN ADDS)
 * ============================================================================
 */

// Seed books from mockData.ts
let mockBooks: Book[] = [...initialBooks];

/**
 * Get all books
 */
export async function getBooks(): Promise<Book[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockBooks]);
    }, 300);
  });
}

/**
 * Get book by id
 */
export async function getBook(id: string): Promise<Book | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBooks.find((b) => b.id === id) ?? null);
    }, 300);
  });
}

/**
 * Create book (ADMIN)
 * Week 3: in-memory
 * Week 4: DynamoDB + POST /books
 */
export async function createBook(book: Omit<Book, 'id'>): Promise<Book> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBook: Book = {
        ...book,
        id: Date.now().toString(),
      };

      mockBooks.push(newBook);
      resolve(newBook);
    }, 500);
  });
}

/**
 * ============================================================================
 * READING LISTS – JWT PROTECTED (MOCK)
 * ============================================================================
 */

let mockReadingLists: ReadingList[] = [];

/**
 * Get reading lists (authenticated)
 */
export async function getReadingLists(): Promise<ReadingList[]> {
  await getAuthHeaders(); // auth check simulation

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockReadingLists]);
    }, 300);
  });
}

/**
 * Create reading list
 */
export async function createReadingList(
  list: Omit<ReadingList, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ReadingList> {
  await getAuthHeaders();

  return new Promise((resolve) => {
    setTimeout(() => {
      const newList: ReadingList = {
        ...list,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockReadingLists.push(newList);
      resolve(newList);
    }, 500);
  });
}

/**
 * Update reading list
 */
export async function updateReadingList(
  id: string,
  list: Partial<ReadingList>
): Promise<ReadingList> {
  await getAuthHeaders();

  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockReadingLists.findIndex((l) => l.id === id);

      const updated: ReadingList = {
        ...mockReadingLists[index],
        ...list,
        id,
        updatedAt: new Date().toISOString(),
      };

      mockReadingLists[index] = updated;
      resolve(updated);
    }, 500);
  });
}

/**
 * Delete reading list
 */
export async function deleteReadingList(id: string): Promise<void> {
  await getAuthHeaders();

  return new Promise((resolve) => {
    setTimeout(() => {
      mockReadingLists = mockReadingLists.filter((l) => l.id !== id);
      resolve();
    }, 300);
  });
}

/**
 * ============================================================================
 * RECOMMENDATIONS – WEEK 4 PLACEHOLDER
 * ============================================================================
 */

export async function getRecommendations(): Promise<Recommendation[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 500);
  });
}

/**
 * ============================================================================
 * REVIEWS – MOCK
 * ============================================================================
 */

export async function getReviews(bookId: string): Promise<Review[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          bookId,
          userId: 'demo-user',
          rating: 5,
          comment: 'Great book!',
          createdAt: new Date().toISOString(),
        },
      ]);
    }, 300);
  });
}

export async function createReview(
  review: Omit<Review, 'id' | 'createdAt'>
): Promise<Review> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...review,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });
    }, 300);
  });
}
