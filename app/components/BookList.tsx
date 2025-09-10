// import Image from "next/image";

// interface Book {
//   key: string;
//   title: string;
//   author_name?: string[];
//   cover_i?: number;
// }

// const BookList = async () => {
//   // Fetch books from Open Library API
//   const res = await fetch(
//     "https://openlibrary.org/search.json?q=programming&limit=12",
//     { next: { revalidate: 3600 } } // cache for 1 hour
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch books");
//   }

//   const data = await res.json();
//   const books: Book[] = data.docs || [];

//   return (
//     <div className="p-4 container mx-auto">
//       <h1 className="text-3xl font-bold mb-6">📚 Book Collection</h1>
//       <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {books.map((book) => {
//           const coverUrl = book.cover_i
//             ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
//             : "https://via.placeholder.com/150x220?text=No+Cover";

//           return (
//             <div
//               key={book.key}
//               className="bg-white border rounded-xl shadow hover:shadow-lg transition p-3 flex flex-col"
//             >
//               <div className="relative w-full h-64">
//                 <Image
//                   src={coverUrl}
//                   alt={book.title}
//                   fill
//                   className="object-cover rounded-lg"
//                 />
//               </div>
//               <h2 className="mt-3 font-semibold line-clamp-2">{book.title}</h2>
//               <p className="text-sm text-gray-600 mt-1">
//                 {book.author_name?.join(", ") || "Unknown Author"}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BookList;


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
