'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar'; 

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
        router.push('/login');
      } else {
        console.log("API Error Response:", data);
        setError(data.details || data.error || 'Kayıt başarısız');
      }

    } catch (err) {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white p-4 relative overflow-hidden">

      <Navbar />

      <div className="w-full max-w-md p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl mt-20 md:mt-0 relative z-10">
        <h1 className="text-3xl font-bold mb-2 text-center text-white">Kayıt Ol</h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Biletvigo dünyasına katılın.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 block text-xs font-medium mb-1 ml-1">Ad</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
                placeholder="Adınız"
              />
            </div>

            <div>
              <label className="text-gray-300 block text-xs font-medium mb-1 ml-1">Soyad</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
                placeholder="Soyadınız"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 block text-xs font-medium mb-1 ml-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
              placeholder="ornek@email.com"
            />
          </div>

          <div>
            <label className="text-gray-300 block text-xs font-medium mb-1 ml-1">Telefon</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
              placeholder="05xxxxxxxx"
            />
          </div>

          <div>
            <label className="text-gray-300 block text-xs font-medium mb-1 ml-1">Şifre</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
              placeholder="*********"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-400 to-red-500 hover:from-blue-500 hover:to-red-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                Kaydediliyor...
              </span>
            ) : 'Kayıt Ol'}
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-center text-sm">
          Zaten hesabınız var mı? <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline">Giriş Yap</a>
        </p>
      </div>
    </div>
  );
}