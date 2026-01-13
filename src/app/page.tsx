'use client'

import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

import Navbar from '@/components/Navbar';
import Cities from '@/components/Cities';
import CategoryList from '@/components/CategoryList';
import EventSection from '@/components/EventSection'; 


export default function HomePage() {

    const [showCityModal, setShowCityModal] = useState<boolean | null>(null); // null = henüz kontrol edilmedi
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
    const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
    const polygonRef = useRef<SVGPolygonElement>(null);

    const LIGHTNING_POINTS = '64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100';

    useEffect(() => {
        const CITY_SELECTION_KEY = 'biletvigo_city_selection';
        const CITY_TIMESTAMP_KEY = 'biletvigo_city_timestamp';
        const MINUTES_TO_ASK_AGAIN = 7;

        const savedCity = localStorage.getItem(CITY_SELECTION_KEY);
        const savedTimestamp = localStorage.getItem(CITY_TIMESTAMP_KEY);

        if (savedCity) {
            setSelectedCity(savedCity);
        }

        if (savedTimestamp) {
            const lastSelectionTime = parseInt(savedTimestamp, 10);
            const currentTime = Date.now();
            const minutesPassed = (currentTime - lastSelectionTime) / (1000 * 60);

            if (minutesPassed < MINUTES_TO_ASK_AGAIN) {
                setShowCityModal(false);
                return;
            }
        }


        if (!savedCity || (savedTimestamp && (Date.now() - parseInt(savedTimestamp, 10)) / (1000 * 60) >= MINUTES_TO_ASK_AGAIN)) {
            setShowCityModal(true);
        }
    }, []);

    useEffect(() => {
        const filterTargets = [turbulenceRef.current, displacementRef.current];

        if (!filterTargets[0] || !filterTargets[1]) return;
        
        const filterAnim = animate(filterTargets, {
            baseFrequency: [0, 0.05],
            scale: [1, 15],
            duration: 3000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutQuad'
        });

        return () => {
            if (filterAnim && filterAnim.pause) filterAnim.pause();
        };

    }, []);

    const handleCitySelect = (cityName: string) => {
        console.log("Seçilen Şehir:", cityName);
        setSelectedCity(cityName);
        setShowCityModal(false);

        const CITY_SELECTION_KEY = 'biletvigo_city_selection';
        const CITY_TIMESTAMP_KEY = 'biletvigo_city_timestamp';
        
        localStorage.setItem(CITY_SELECTION_KEY, cityName);
        localStorage.setItem(CITY_TIMESTAMP_KEY, Date.now().toString());
    };

    const handleOpenCityModal = () => {
        setShowCityModal(true);
    };

    return (
        <>
            {showCityModal === true && <Cities onSelect={handleCitySelect} />}

            <div className={`min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-x-hidden transition-all duration-700 ${showCityModal === true ? 'blur-sm brightness-60 pointer-events-none h-screen overflow-hidden' : ''}`}>

                <Navbar selectedCity={selectedCity} onLocationChange={handleOpenCityModal} />

                <div className="w-full flex flex-col items-center justify-center py-20 px-4 flex-grow">
                    <h1 className="text-5xl md:text-6xl md:leading-snug font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500 tracking-wide text-center">
                        Biletvigo'ya <br /> Hoş Geldiniz!
                    </h1>

                    <div className="large centered row mb-8">
                        <svg width="128" height="128" viewBox="0 0 128 128" className="overflow-visible">
                            <filter id="displacementFilter" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence ref={turbulenceRef} type="turbulence" numOctaves="2" baseFrequency="0" result="turbulence" />
                                <feDisplacementMap ref={displacementRef} in2="turbulence" in="SourceGraphic" scale="1" xChannelSelector="R" yChannelSelector="G" />
                            </filter>
                            <polygon
                                ref={polygonRef}
                                points={LIGHTNING_POINTS}
                                fill="currentColor"
                                filter="url(#displacementFilter)"
                                className="text-blue-500"
                            />
                        </svg>
                    </div>

                    <p className="text-gray-400 mb-8 text-lg max-w-2xl text-center">
                        Konser, maç, tiyatro ve daha fazlası için güvenli bilet alım satım platformu.
                    </p>
                </div>

                <div className="w-full bg-black/20 pb-20">
                    
                    <CategoryList />

                    <div className="mt-16 space-y-12">
                        <EventSection title="Yaklaşan Konserler" categoryFilter="Konser" />
                        <EventSection title="Heyecanlı Maçlar" categoryFilter="Spor" />
                        <EventSection title="Tiyatro ve Sanat" categoryFilter="Tiyatro" />
                        <EventSection title="Festival ve Etkinlikler" categoryFilter="Festival" />
                        <EventSection title="Tüm Etkinlikler" />
                    </div>

                </div>
            </div>
        </>
    );
}