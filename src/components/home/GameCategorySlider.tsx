'use client';

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Icon } from "@iconify/react";
import 'swiper/css';
import 'swiper/css/navigation';

interface Game {
  id: string;
  name: string;
  provider: string;
  imageUrl: string;
  isNew?: boolean;
  isLive?: boolean;
  category?: string;
}

interface GameCategorySliderProps {
  title: string;
  games: Game[];
  onViewAllClick?: () => void;
  showLiveBadge?: boolean;
}

export default function GameCategorySlider({ 
  title, 
  games, 
  onViewAllClick, 
  showLiveBadge = false 
}: GameCategorySliderProps) {
  const swiperRef = useRef<any>(null);

  const handleViewAll = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(games.length - 1, 600);
    }
    if (onViewAllClick) onViewAllClick();
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-yellow-primary">{title}</h2>
        <button
          className="text-yellow-primary/50 transition-colors flex items-center space-x-2 font-semibold text-sm"
          onClick={handleViewAll}
        >
          <span>All</span>
          <Icon icon="mdi:chevron-right" className="w-4 h-4" />
        </button>
      </div>

       {/* Games Slider */}
       <div className="relative">
         <Swiper
           ref={swiperRef}
           slidesPerView={2.5}
           spaceBetween={12}
           breakpoints={{
             640: {
               slidesPerView: 3.5,
               spaceBetween: 4
             },
             768: {
               slidesPerView: 4.5,
               spaceBetween: 16
             },
             1024: {
               slidesPerView: 5.5,
               spaceBetween: 20
             }
           }}
           navigation={{
             nextEl: `.${title.toLowerCase().replace(/\s+/g, '-')}-swiper-next`,
             prevEl: `.${title.toLowerCase().replace(/\s+/g, '-')}-swiper-prev`,
           }}
           modules={[Navigation]}
           className="w-full"
         >
          {games.map((game) => (
            <SwiperSlide key={game.id}>
              <div className="bg-[#232b3b] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group relative md:w-[200px] w-full">
                {/* Game Image */}
                <div className="relative aspect-[3/4] w-full md:h-[200px] h-[140px]">
                  <Image
                    src={game.imageUrl}
                    alt={game.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200 w-full"
                    priority={true}
                  />
                  
                  {/* Badges */}
                  <div className="absolute bottom-2 left-2 flex flex-col space-y-1 h-5">
                    {showLiveBadge && game.isLive && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-[6px] animate-pulse">
                        Live
                      </span>
                    )}
                    {game.isNew && (
                      <span className="bg-yellow-primary text-dark-primary text-xs font-bold px-2 py-1 rounded-[6px]">
                        New
                      </span>
                    )}
                  </div>

                  {/* Live indicator for Live Now section */}
                  {showLiveBadge && (
                    <div className="absolute top-2 right-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>

                {/* Game Info */}
                <div className="px-3 py-2">
                  <h3 className="text-lg font-semibold text-yellow-primary truncate mb-1">
                    {game.name}
                  </h3>
                  <p className="text-sm text-yellow-primary/50 truncate">
                    {game.provider}
                  </p>
                </div>
              </div>
            </SwiperSlide>
           ))}

           {/* Black Gradient Overlay for half-visible item */}
           {games.length > 5 && <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/90 via-black/50 to-transparent pointer-events-none z-10"></div>}

           {/* Navigation Buttons */}
           <button 
             className={`${title.toLowerCase().replace(/\s+/g, '-')}-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/20 backdrop-blur-sm border-none p-2 rounded-full hover:bg-yellow-primary/20 transition-colors`} 
             aria-label="Previous"
           >
             <Icon icon="mdi:chevron-left" className="w-5 h-5 text-yellow-primary" />
           </button>
           <button 
             className={`${title.toLowerCase().replace(/\s+/g, '-')}-swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/20 backdrop-blur-sm border-none p-2 rounded-full hover:bg-yellow-primary/20 transition-colors`} 
             aria-label="Next"
           >
             <Icon icon="mdi:chevron-right" className="w-5 h-5 text-yellow-primary" />
           </button>
         </Swiper>
       </div>
    </div>
  );
}
