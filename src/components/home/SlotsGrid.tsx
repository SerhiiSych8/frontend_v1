'use client';

import Image from "next/image";
import { Icon } from "@iconify/react";

// Import Game Image
import GameImg1 from "@/assets/game/game1.png";
import GameImg2 from "@/assets/game/game2.png";
import GameImg3 from "@/assets/game/game3.png";
import GameImg4 from "@/assets/game/game4.png";
import GameImg5 from "@/assets/game/game5.png";
import GameImg6 from "@/assets/game/game6.png";
import GameImg7 from "@/assets/game/game7.png";
import GameImg8 from "@/assets/game/game8.png";
import GameImg9 from "@/assets/game/game9.png";
import GameImg10 from "@/assets/game/game10.png";
import GameImg11 from "@/assets/game/game11.png";
import GameImg12 from "@/assets/game/game12.png";

interface SlotGame {
  id: string;
  name: string;
  imageUrl: string;
  provider?: string;
  isNew?: boolean;
}

interface SlotsGridProps {
  onViewAllClick?: () => void;
}

const mockSlotGames: SlotGame[] = [
  {
    id: '1',
    name: 'Book of Arabia',
    imageUrl: GameImg1.src,
    provider: 'Provider',
    isNew: false
  },
  {
    id: '2',
    name: 'Firepig',
    imageUrl: GameImg2.src,
    provider: 'Provider',
    isNew: false
  },
  {
    id: '3',
    name: 'Bonsai Dragon Blitz',
    imageUrl: GameImg3.src,
    provider: 'Provider',
    isNew: false
  },
  {
    id: '4',
    name: 'Witch Heart Megaways',
    imageUrl: GameImg4.src,
    provider: 'Provider',
    isNew: false
  },
  {
    id: '5',
    name: 'Fighter Pit',
    imageUrl: GameImg5.src,
    provider: 'Provider',
    isNew: false
  },
  {
    id: '6',
    name: 'Cherry Pop Burst',
    imageUrl: GameImg6.src,
    provider: 'Provider',
    isNew: false
  },
  {
    id: '7',
    name: 'Moon Princess Stargazing',
    imageUrl: GameImg7.src,
    provider: 'Provider',
    isNew: false
  },
  {
    id: '8',
    name: 'Gates of Olympus Super Scatter',
    imageUrl: GameImg8.src,
    provider: 'Provider',
    isNew: false
  },
  {
    id: '9',
    name: 'Book of Arabia',
    imageUrl: GameImg9.src,
    provider: 'Provider',
    isNew: false
  },
  {
    id: '10',
    name: 'Firepig',
    imageUrl: GameImg10.src,
    provider: 'Provider',
    isNew: false
  },
  {
    id: '11',
    name: 'Firepig',
    imageUrl: GameImg11.src,
    provider: 'Provider',
    isNew: false
  },
  {
    id: '12',
    name: 'Firepig',
    imageUrl: GameImg12.src,
    provider: 'Provider',
    isNew: false
  }
];

export default function SlotsGrid({ onViewAllClick }: SlotsGridProps) {
  const handleViewAll = () => {
    if (onViewAllClick) onViewAllClick();
  };

  // Split games into two rows
  const firstRowGames = mockSlotGames.slice(0, 6);
  const secondRowGames = mockSlotGames.slice(6, 12);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-yellow-primary">Slots</h2>
        <button
          className="text-yellow-primary/50 transition-colors flex items-center space-x-2 font-semibold text-sm"
          onClick={handleViewAll}
        >
          <span>All</span>
          <Icon icon="mdi:chevron-right" className="w-4 h-4" />
        </button>
      </div>

      {/* Slots Games Grid - 2 Rows */}
      <div className="space-y-4">
        {/* First Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {firstRowGames.map((game) => (
            <div key={game.id} className="bg-[#232b3b] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group relative">
              {/* Game Image Container */}
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src={game.imageUrl}
                  alt={game.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 220px"
                  priority={true}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {secondRowGames.map((game) => (
            <div key={game.id} className="bg-[#232b3b] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group relative">
              {/* Game Image Container */}
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src={game.imageUrl}
                  alt={game.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 220px"
                  priority={true}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
