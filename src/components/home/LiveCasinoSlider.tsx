'use client';

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Icon } from "@iconify/react";
import 'swiper/css';
import 'swiper/css/navigation';

// Import Game Image
import CrazyPachinko from "@/assets/game/crazy_pachinko.png";
import RedDoor from "@/assets/game/red_door.png";
import CrazyTime from "@/assets/game/crazy_time.png";
import Gonzos from "@/assets/game/gonzos.png";
import VideoPoker from "@/assets/game/video_poker.png";

interface LiveCasinoGame {
  id: string;
  name: string;
  imageUrl: string;
  bannerColor: string;
  isLive?: boolean;
}

interface LiveCasinoSliderProps {
  onViewAllClick?: () => void;
}

const mockLiveCasinoGames: LiveCasinoGame[] = [
  {
    id: '1',
    name: 'Red Door ROULETTE Live',
    imageUrl: RedDoor.src,
    bannerColor: 'bg-red-600',
    isLive: true
  },
  {
    id: '2',
    name: 'CRAZY TIME Live',
    imageUrl: CrazyTime.src,
    bannerColor: 'bg-red-600',
    isLive: true
  },
  {
    id: '3',
    name: 'GONZO\'S TREASURE MAP Live',
    imageUrl: Gonzos.src,
    bannerColor: 'bg-orange-600',
    isLive: true
  },
  {
    id: '4',
    name: 'VIDEO POKER Live',
    imageUrl: VideoPoker.src,
    bannerColor: 'bg-blue-600',
    isLive: true
  },
  {
    id: '5',
    name: 'CRAZY PACHINKO Live',
    imageUrl: CrazyPachinko.src,
    bannerColor: 'bg-green-600',
    isLive: true
  },
  {
    id: '6',
    name: 'CRAZY TIME Live',
    imageUrl: CrazyTime.src,
    bannerColor: 'bg-red-600',
    isLive: true
  }
];

export default function LiveCasinoSlider({ onViewAllClick }: LiveCasinoSliderProps) {
  const swiperRef = useRef<any>(null);

  const handleViewAll = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(mockLiveCasinoGames.length - 1, 600);
    }
    if (onViewAllClick) onViewAllClick();
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-yellow-primary">Live Casino</h2>
        <button
          className="text-yellow-primary/50 transition-colors flex items-center space-x-2 font-semibold text-sm"
          onClick={handleViewAll}
        >
          <span>All</span>
          <Icon icon="mdi:chevron-right" className="w-4 h-4" />
        </button>
      </div>

      {/* Live Casino Games Slider */}
      <div className="relative">
        <Swiper
          ref={swiperRef}
          slidesPerView={2.5}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 3.5,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 4.5,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 5.5,
              spaceBetween: 24
            }
          }}
          navigation={{
            nextEl: '.live-casino-swiper-next',
            prevEl: '.live-casino-swiper-prev',
          }}
          modules={[Navigation]}
          className="w-full"
        >
          {mockLiveCasinoGames.map((game) => (
            <SwiperSlide key={game.id}>
              <div className="bg-[#232b3b] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group relative">
                {/* Game Image Container */}
                <div className="relative w-full h-[284px]">
                  <Image
                    src={game.imageUrl}
                    alt={game.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={true}
                  />

                  {/* Live Indicator */}
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center space-x-1 bg-red-600 text-white px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold">LIVE</span>
                    </div>
                  </div>

                  {/* Play Button Overlay - Show on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00000080]">
                    <button className="w-[86px] h-[86px] bg-yellow-primary hover:bg-yellow-primary/90 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-200">
                      <Icon icon="mdi:play" className="w-14 h-14 text-black ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Black Gradient Overlay for half-visible item */}
          {mockLiveCasinoGames.length > 5 && (
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/90 via-black/50 to-transparent pointer-events-none z-10"></div>
          )}

          {/* Navigation Buttons */}
          <button
            className="live-casino-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 backdrop-blur-sm border-none p-3 rounded-full hover:bg-yellow-primary/20 transition-colors"
            aria-label="Previous"
          >
            <Icon icon="mdi:chevron-left" className="w-6 h-6 text-yellow-primary" />
          </button>
          <button
            className="live-casino-swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 backdrop-blur-sm border-none p-3 rounded-full hover:bg-yellow-primary/20 transition-colors"
            aria-label="Next"
          >
            <Icon icon="mdi:chevron-right" className="w-6 h-6 text-yellow-primary" />
          </button>
        </Swiper>
      </div>
    </div>
  );
}
