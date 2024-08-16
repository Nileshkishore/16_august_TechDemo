"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/register/`;
    const payload = { username, password };

    console.log('Register API URL:', url);
    console.log('Payload:', JSON.stringify(payload)); // Verifies payload format

    try {
      await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      router.push('/login');
    } catch (err: any) {
      console.error('Error details:', err);
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Register</button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
