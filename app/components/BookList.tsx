
// app/components/BookList.tsx
import Image from "next/image";

async function fetchBooks(subject: string) {
  const res = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=12`, {
    next: { revalidate: 3600 }, // cache for 1h
  });
  if (!res.ok) throw new Error("Failed to fetch books");
  const data = await res.json();
  return data.works || [];
}

export default async function BookList() {
  const [storyBooks, selfHelpBooks] = await Promise.all([
    fetchBooks("fiction"),
    fetchBooks("self-help"),
  ]);

  return (
    <div className="p-4 container mx-auto">
      <div className="space-y-10 mt-10 mb-10">
        {/* Self-help Books */}
        <section id="self-help" className="pt-5">
          <h2 className="text-2xl font-semibold mb-4">🌱 Self-help Books</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {selfHelpBooks.map((book: any) => {
              const coverUrl = book.cover_id
                ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                : "/no-cover.jpg";

              return (
                <div
                  key={book.key}
                  className="border rounded-lg p-3 shadow hover:shadow-md transition"
                >
                  <div className="relative w-full h-60">
                    <Image
                      src={coverUrl}
                      alt={book.title}
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-medium line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {book.authors?.[0]?.name || "Unknown"}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Story Books */}
        <section className="mt-10 pt-5" id="story-books">
          <h2 className="text-2xl font-semibold mb-4">📖 Story Books</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {storyBooks.map((book: any) => {
              const coverUrl = book.cover_id
                ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                : "/no-cover.jpg";

              return (
                <div
                  key={book.key}
                  className="border rounded-lg p-3 shadow hover:shadow-md transition"
                >
                  <div className="relative w-full h-60">
                    <Image
                      src={coverUrl}
                      alt={book.title}
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-medium line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {book.authors?.[0]?.name || "Unknown"}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
