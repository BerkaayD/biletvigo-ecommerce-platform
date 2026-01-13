"use client";

import { useEffect, useState } from "react";
import { Trophy, Music, Ticket, Star, Loader2, } from "lucide-react";

interface Category {
  CategoryID: number;
  Name: string;
  Slug: string;
  Icon: string; 
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCategoryClick = (categoryName: string) => {
    const normalizedName = categoryName.trim();
    
    let sectionId = '';
    
    if (normalizedName.toLowerCase().includes('konser') || normalizedName.toLowerCase().includes('müzik') || normalizedName.toLowerCase().includes('music')) {
      sectionId = 'section-konser';
    }
    else if (normalizedName.toLowerCase().includes('spor') || normalizedName.toLowerCase().includes('maç') || normalizedName.toLowerCase().includes('match')) {
      sectionId = 'section-spor';
    }
    else if (normalizedName.toLowerCase().includes('tiyatro') || normalizedName.toLowerCase().includes('theater') || normalizedName.toLowerCase().includes('sanat')) {
      sectionId = 'section-tiyatro';
    }
    else if (normalizedName.toLowerCase().includes('festival') || normalizedName.toLowerCase().includes('etkinlik')) {
      sectionId = 'section-festival';
    }
    else {
      sectionId = `section-${normalizedName.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
      const navbarHeight = 80;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      // Animasyonlu scroll fonksiyonu
      smoothScrollTo(offsetPosition);
    } else {
      // Eğer kategori için özel section yoksa, tüm etkinlikler bölümüne scroll yap
      const allSection = document.getElementById('section-all');
      if (allSection) {
        const navbarHeight = 80;
        const elementPosition = allSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        smoothScrollTo(offsetPosition);
      }
    }
  };


  const smoothScrollTo = (targetPosition: number, baseDuration: number = 1200) => {
    const startPosition = window.pageYOffset;
    const distance = Math.abs(targetPosition - startPosition);
    
    const duration = Math.min(baseDuration + (distance / 5), 2000); 
    
    let startTime: number | null = null;

    const easeInOutQuart = (t: number): number => {
      return t < 0.5
        ? 8 * t * t * t * t
        : 1 - Math.pow(-2 * t + 2, 4) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const easedProgress = easeInOutQuart(progress);
      
      window.scrollTo({
        top: startPosition + (targetPosition - startPosition) * easedProgress,
        behavior: 'auto'
      });

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => console.error("Hata:", err));
  }, []);

  const getIcon = (iconName: string) => {
    const iconMap: any = {
      'trophy': <Trophy className="w-8 h-8 mb-3  text-yellow-400" />,
      'music': <Music className="w-8 h-8 mb-3 text-pink-500" />,
      'theater': <Ticket className="w-8 h-8 mb-3 text-purple-500" />,
      'default': <Star className="w-8 h-8 mb-3 text-red-400" />
    };

    return iconMap[iconName] || iconMap['default'];
  };

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
      </div>
    );
  }

  return (
      <div className="-mt-10 grid grid-cols-2 md:grid-cols-4 gap-4    ">
        {categories.map((cat) => (
          <div 
            key={cat.CategoryID}
            onClick={() => handleCategoryClick(cat.Name)}
            className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-2xl border border-blue-800/50  hover:bg-gray-800 transition-all duration-300 hover:-translate-y-2 cursor-pointer group flex flex-col items-center justify-center text-center shadow-lg">

            <div className="p-3 bg-gray-700/50 rounded-full mb-3 group-hover:bg-gray-700 transition-colors">
               {getIcon(cat.Icon)}
            </div>
            <span className="font-semibold text-lg text-gray-300 group-hover:text-white transition-colors">
              {cat.Name}
            </span>
          </div>
        ))}
      </div>
  );
}