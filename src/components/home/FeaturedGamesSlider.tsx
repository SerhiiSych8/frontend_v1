'use client';

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";


interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  isActive: boolean;
  minBet: number;
  maxBet: number;
  createdAt: string;
  updatedAt: string;
}

interface FeaturedGamesSliderProps {
  games: Game[];
  onViewAllClick?: () => void;
}

export default function FeaturedGamesSlider({ games, onViewAllClick }: FeaturedGamesSliderProps) {
  const swiperRef = useRef<any>(null);

  const handleViewAll = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(games.length - 1, 600);
    }
    if (onViewAllClick) onViewAllClick();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-yellow-primary">Featured Games</h2>
        <button
          className="text-yellow-primary/50 transition-colors flex items-center space-x-2 font-normal text-sm"
          onClick={handleViewAll}
        >
          <span>All</span>
          <Icon icon="mdi:arrow-right" className="w-4 h-4" />
        </button>
      </div>
      <Swiper
        ref={swiperRef}
        slidesPerView={3}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
      >
        {games.map((game, ind) => (
          <SwiperSlide key={ind}>
            <div className="bg-[#232b3b] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer group w-full max-w-[120px] md:max-w-[140px] md:max-w-[160px] lg:max-w-[166px]">
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src={game.imageUrl}
                  alt={game.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100px, (max-width: 768px) 120px, (max-width: 1024px) 140px, (max-width: 1280px) 160px, 166px"
                  priority={true}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
