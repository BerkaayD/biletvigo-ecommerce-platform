"use client";

import { Calendar, MapPin, Ticket } from "lucide-react";

// Kartın alacağı veri tiplerini belirliyoruz
interface EventProps {
    id: number;
    title: string;
    date: string;
    location: string;
    price: number;
    imageUrl: string;
    category: string;
}

export default function EventCard({ data }: { data: EventProps }) {
    return (
        <div className="group relative bg-gray-800/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer">

            {/* Resim Alanı */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={data.imageUrl}
                    alt={data.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Kategori Etiketi */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                    {data.category}
                </div>
            </div>

            {/* Bilgi Alanı */}
            <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {data.title}
                </h3>

                <div className="space-y-2 text-gray-400 text-sm mb-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>{data.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span>{data.location}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <div className="text-white font-bold text-lg">
                        {data.price} ₺
                    </div>
                    <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition-all">
                        <Ticket className="w-4 h-4" />
                        Bilet Al
                    </button>
                </div>
            </div>
        </div>
    );
}