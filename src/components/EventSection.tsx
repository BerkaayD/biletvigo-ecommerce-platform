"use client";

import EventCard from "./EventCard";

const MOCK_EVENTS = [
    {
        id: 1,
        title: "Tarkan Konseri",
        date: "15 Ağustos 2026",
        location: "Harbiye Açıkhava, İstanbul",
        price: 1250,
        imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800",
        category: "Konser"
    },
    {
        id: 2,
        title: "Galatasaray - Fenerbahçe",
        date: "22 Eylül 2026",
        location: "Rams Park, İstanbul",
        price: 3500,
        imageUrl: "https://images.unsplash.com/photo-1504454172868-958378431707?auto=format&fit=crop&q=80&w=800",
        category: "Spor"
    },
    {
        id: 3,
        title: "Hamlet Oyunu",
        date: "10 Ekim 2026",
        location: "Zorlu PSM, İstanbul",
        price: 450,
        imageUrl: "https://images.unsplash.com/photo-1503095392269-41f86bb70af3?auto=format&fit=crop&q=80&w=800",
        category: "Tiyatro"
    },
    {
        id: 4,
        title: "Rock Festivali",
        date: "05 Temmuz 2026",
        location: "Kilyos, İstanbul",
        price: 900,
        imageUrl: "https://images.unsplash.com/photo-1459749411177-0473ef716175?auto=format&fit=crop&q=80&w=800",
        category: "Festival"
    },
    {
        id: 5,
        title: "Basketbol Finali",
        date: "12 Haziran 2026",
        location: "Sinan Erdem, İstanbul",
        price: 800,
        imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
        category: "Spor"
    }
];

interface SectionProps {
    title: string;
    categoryFilter?: string; 
}

export default function EventSection({ title, categoryFilter }: SectionProps) {

    const filteredEvents = categoryFilter
        ? MOCK_EVENTS.filter(e => e.category === categoryFilter)
        : MOCK_EVENTS;

    // Kategori adına göre id oluştur (scroll için)
    const sectionId = categoryFilter 
        ? `section-${categoryFilter.toLowerCase()}` 
        : 'section-all';

    return (
        <section id={sectionId} className="w-full max-w-7xl mx-auto px-4 py-12 scroll-mt-20">
            <div className="flex items-center justify-between mb-8">


                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    {title}
                </h2>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Tümünü Gör →
                </button>
            </div>

            {/* Kartların Listelendiği Grid Yapısı */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredEvents.map((event) => (
                    <EventCard key={event.id} data={event} />
                ))}
            </div>
        </section>
    );
}