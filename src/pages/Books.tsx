import { useEffect, useState } from "react";
import { BookSearch } from "@/components/books/BookSearch";
import { BookGrid } from "@/components/books/BookGrid";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { getBooks } from "@/services/api";
import { Book } from "@/types";
import { handleApiError } from "@/utils/errorHandling";

export function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setIsLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
      setFilteredBooks(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter((book) => {
      const title = (book.title ?? "").toLowerCase();
      const author = (book.author ?? "").toLowerCase();
      const genre = (book.genre ?? "").toLowerCase();
      return title.includes(q) || author.includes(q) || genre.includes(q);
    });

    setFilteredBooks(filtered);
  };

  const handleSort = (value: string) => {
    setSortBy(value);

    const sorted = [...filteredBooks].sort((a, b) => {
      if (value === "title") return (a.title ?? "").localeCompare(b.title ?? "");
      if (value === "author") return (a.author ?? "").localeCompare(b.author ?? "");
      return 0;
    });

    setFilteredBooks(sorted);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="gradient-text">Book Catalog</span>
          </h1>
          <p className="text-slate-600 text-xl">
            Browse our collection of{" "}
            <span className="font-bold text-violet-600">{books.length}</span> amazing books
          </p>
        </div>

        <div className="mb-8">
          <BookSearch onSearch={handleSearch} />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="glass-effect px-4 py-2 rounded-xl border border-white/20">
            <p className="text-slate-700 font-semibold">
              Showing{" "}
              <span className="text-violet-600">{filteredBooks.length}</span>{" "}
              {filteredBooks.length === 1 ? "book" : "books"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-700 font-semibold">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="input-modern px-4 py-2.5 text-sm font-medium"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
          </div>
        </div>

        <BookGrid books={filteredBooks} />
      </div>
    </div>
  );
}
