'use client'

import { useEffect, useState } from "react";

interface City {
    id: number;
    name: string;
}

interface CityModalProps {
    onSelect: (cityName: string) => void;
}

export default function Cities({ onSelect }: CityModalProps) {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await fetch('./api/cities');
                const data = await res.json();

                if (Array.isArray(data)) {
                    setCities(data);
                }
            } catch (error) {
                console.error("Sehirler cekilemedi:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchCities();
    }, []);

    const handleSelect = (cityName: string) => {
        // Kapanma animasyonunu başlat
        setIsClosing(true);

        setTimeout(() => {
            onSelect(cityName);
        }, 500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm ${isClosing ? 'city-modal-overlay-closing' : ''}`} />

            <div className={`relative bg-gray-900 border border-gray-700 p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center animate-in fade-in zoom-in duration-300 city-modal-panel ${isClosing ? 'city-modal-closing' : ''}`}>
                <h2 className="text-3xl font-bold text-white mb-2">Konum Seçiniz</h2>
                <p className="text-gray-400 mb-8">Etkinlikleri görmek istediğiniz şehri seçin.</p>

                {loading ? (
                    <div className="text-blue-500 animate-pulse">Şehirler Yükleniyor...</div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {cities.map((city) => (
                            <button
                                key={city.id}
                                onClick={() => handleSelect(city.name)}
                                className="bg-slate-800 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors font-medium border border-slate-700 hover:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-sm truncate"
                            >
                                {city.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

