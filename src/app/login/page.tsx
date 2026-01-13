'use client'

import { useState } from 'react';
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
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
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/');
        router.refresh(); 
      } else {
        setError(data.error || 'Giriş başarısız');
      }
    } catch (err) {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-slate-900 to-black relative">
      
      <Navbar hideAuthButtons={true} />

      <div className="flex w-full max-w-5xl h-[600px] bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700 mt-20 md:mt-0 relative z-10">

        {/* Sol Taraf: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gray-800 relative">
          <div className="max-w-md w-full mx-auto">
            <h1 className="text-3xl font-bold mb-3 text-white">Tekrar Hoş Geldiniz</h1>
            <p className="text-gray-400 mb-8 text-sm">Hesabınıza giriş yapabilirsiniz.</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-400 ml-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-medium text-gray-400 ml-1">Şifre</label>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex justify-end mt-1">
                    <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                        Şifremi unuttum
                    </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-400 to-red-500 hover:from-blue-500 hover:to-red-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-400">
              Hesabınız yok mu?{" "}
              <a href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline">
                Kayıt Ol
              </a>
            </p>
          </div>
        </div>
        
        <div className="hidden md:block w-1/2 relative">
          <Image 
            src="/eglence.jpg" 
            alt="Login Visual" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
        </div>

      </div>
    </div>
  );
}
