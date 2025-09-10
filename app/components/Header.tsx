// app/components/Header.tsx
export default function Header() {
  return (
    <header className="w-full bg-blue-500 text-white py-4 shadow">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">📚 Book Explorer</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#self-help" className="hover:underline">Self-help</a>
          <a href="#story-books" className="hover:underline">Story Books</a>
        </nav>
      </div>
    </header>
  );
}
