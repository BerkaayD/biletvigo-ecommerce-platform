'use client'

import { useRouter } from 'next/navigation';
import { MapPin, User, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavbarProps {
    hideAuthButtons?: boolean;
    selectedCity?: string | null;
    onLocationChange?: () => void;
}

interface User {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
}

export default function Navbar({ hideAuthButtons = false, selectedCity, onLocationChange }: NavbarProps) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/auth/me');
                const data = await response.json();
                if (data.user) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error('Kullanıcı bilgisi alınamadı:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Çıkış yapılırken hata oluştu:', error);
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full z-40 p-4 flex justify-between items-center">
            <div
                className="text-4xl left-7 font-bold bg-clip-text bg-gradient-to-r from-blue-400 to-red-500 cursor-pointer text-transparent "
                onClick={() => router.push('/')}
            >
                Biletvigo
            </div>

            <div className="flex items-center space-x-4">
                {onLocationChange && (
                    <button
                        onClick={onLocationChange}
                        className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700 text-white px-4 py-2 rounded-full font-medium transition-all shadow-lg hover:shadow-blue-500/20 border border-gray-700 hover:border-blue-500"
                    >
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">
                            {selectedCity || 'Konum Seç'}
                        </span>
                    </button>
                )}

                {!hideAuthButtons && (
                    <div className="flex items-center space-x-4">
                        {loading ? (
                            <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse" />
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                <div className="relative group">
                                    <button
                                        className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-red-500 flex items-center justify-center text-white font-semibold hover:from-blue-500 hover:to-red-600 transition-all shadow-lg hover:shadow-blue-500/30"
                                        title={`${user.firstName} ${user.lastName}`}
                                    >
                                        <User className="w-5 h-5" />
                                    </button>
                                    <div className="absolute right-0 top-12 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="p-4 border-b border-gray-700">
                                            <p className="text-white font-semibold">{user.firstName} {user.lastName}</p>
                                            <p className="text-gray-400 text-sm">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full p-3 text-left text-red-400 hover:bg-gray-700 rounded-b-lg flex items-center gap-2 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Çıkış Yap
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => router.push('/login')}
                                    className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/20"
                                >
                                    Giriş Yap
                                </button>

                                <button
                                    onClick={() => router.push('/register')}
                                    className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/20"
                                >
                                    Kayıt Ol
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}