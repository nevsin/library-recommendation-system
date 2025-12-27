import { Book, User, ReadingList } from '@/types';

/**
 * ============================================================================
 * MOCK DATA FOR DEVELOPMENT
 * ============================================================================
 */

/**
 * MOCK BOOKS DATA
 */
export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fiction',
    description:
      'Between life and death there is a library, and within that library, the shelves go on forever.',
    coverImage: '/book-covers/midnight-library.jpg',
    rating: 4.5,
    publishedYear: 2020,
    isbn: '978-0525559474',
  },
  {
    id: '2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    description:
      'A lone astronaut must save the earth from disaster in this incredible science-based thriller.',
    coverImage: '/book-covers/project-hail-mary.jpg',
    rating: 4.8,
    publishedYear: 2021,
    isbn: '978-0593135204',
  },
  {
    id: '3',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Mystery',
    description:
      "Alicia Berenson's life is seemingly perfect until she commits a shocking crime.",
    coverImage: '/book-covers/silent-patient.jpg',
    rating: 4.3,
    publishedYear: 2019,
    isbn: '978-1250301697',
  },
  {
    id: '4',
    title: 'People We Meet on Vacation',
    author: 'Emily Henry',
    genre: 'Romance',
    description: 'Two best friends. Ten summer trips. One last chance.',
    coverImage: '/book-covers/people-we-meet.jpg',
    rating: 4.2,
    publishedYear: 2021,
    isbn: '978-1984806758',
  },
  {
    id: '5',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Non-Fiction',
    description:
      'An easy & proven way to build good habits and break bad ones.',
    coverImage: '/book-covers/atomic-habits.jpg',
    rating: 4.7,
    publishedYear: 2018,
    isbn: '978-0735211292',
  },
  {
    id: '6',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    genre: 'Fiction',
    description:
      'A reclusive Hollywood icon finally tells the truth about her life.',
    coverImage: '/book-covers/evelyn-hugo.jpg',
    rating: 4.6,
    publishedYear: 2017,
    isbn: '978-1501161933',
  },
  {
    id: '7',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    description:
      'Set on the desert planet Arrakis, a boy becomes the center of a prophecy.',
    coverImage: '/book-covers/dune.jpg',
    rating: 4.4,
    publishedYear: 1965,
    isbn: '978-0441172719',
  },
  {
    id: '8',
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    genre: 'Mystery',
    description:
      'Four unlikely friends investigate a real murder in their quiet village.',
    coverImage: '/book-covers/thursday-murder-club.jpg',
    rating: 4.1,
    publishedYear: 2020,
    isbn: '978-1984880987',
  },
  {
    id: '9',
    title: 'Educated',
    author: 'Tara Westover',
    genre: 'Non-Fiction',
    description:
      'A memoir about a woman who escapes her survivalist upbringing.',
    coverImage: '/book-covers/educated.jpg',
    rating: 4.5,
    publishedYear: 2018,
    isbn: '978-0399590504',
  },
  {
    id: '10',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    genre: 'Fiction',
    description:
      "A retelling of the Iliad through the love story of Achilles and Patroclus.",
    coverImage: '/book-covers/song-of-achilles.jpg',
    rating: 4.6,
    publishedYear: 2011,
    isbn: '978-0062060624',
  },
];

/**
 * MOCK USERS DATA
 */
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'user',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    email: 'admin@library.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T10:00:00Z',
  },
];

/**
 * MOCK READING LISTS DATA
 */
export const mockReadingLists: ReadingList[] = [
  {
    id: '1',
    userId: '1',
    name: 'Summer Reading 2024',
    description: 'Books to read during summer vacation',
    bookIds: ['1', '2', '4'],
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-15T14:30:00Z',
  },
  {
    id: '2',
    userId: '1',
    name: 'Sci-Fi Favorites',
    description: 'My favorite science fiction novels',
    bookIds: ['2', '7'],
    createdAt: '2024-05-10T10:00:00Z',
    updatedAt: '2024-05-10T10:00:00Z',
  },
];
