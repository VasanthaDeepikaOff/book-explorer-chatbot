// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-600 py-4 border-t">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} Book Explorer. All rights reserved.
      </div>
    </footer>
  );
}
