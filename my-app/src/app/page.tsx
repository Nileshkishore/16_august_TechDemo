// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-5xl lg:text-6xl font-bold text-blue-600 mb-8 text-center">
        Welcome To Stock Monitoring System
      </h1>
      <div className="flex gap-4">
        <Link href="/next-page">
          <button className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
            Go to Dashboard
          </button>
        </Link>
        <Link href="/report-generation">
          <button className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
            Go to Report Generation
          </button>
        </Link>
      </div>
    </div>
  );
}

