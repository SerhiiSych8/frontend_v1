'use client';

import Image from 'next/image';
import { Game } from '@/apis/games';
import HeroBanner from '@/components/home/HeroBanner';
import FeaturedGamesSlider from '@/components/home/FeaturedGamesSlider';
import SportComponent from '@/components/home/SportComponent';
import LiveCasinoSlider from '@/components/home/LiveCasinoSlider';
import SlotsGrid from '@/components/home/SlotsGrid';
import WinTable from '@/components/home/WinTable';
import GameSections from '@/components/home/GameSections';

// Import Game Image
import GameImage from "@/assets/game/game1.jpg"
import { TournamentSection } from '@/components/home/TournamentSection';
import JackpotBanner from '@/assets/banner/jackpot.png';

const featuredGames: Game[] = [
  {
    id: '1',
    name: 'Lucky Slots',
    description: 'Classic slot game with amazing prizes',
    imageUrl: GameImage.src,
    category: 'Slots',
    isActive: true,
    minBet: 0.25,
    maxBet: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Blackjack Pro',
    description: 'Professional blackjack experience',
    imageUrl: GameImage.src,
    category: 'Blackjack',
    isActive: true,
    minBet: 1,
    maxBet: 500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Roulette Royale',
    description: 'European roulette with live dealers',
    imageUrl: GameImage.src,
    category: 'Roulette',
    isActive: true,
    minBet: 0.5,
    maxBet: 1000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Lucky Slots',
    description: 'Classic slot game with amazing prizes',
    imageUrl: GameImage.src,
    category: 'Slots',
    isActive: true,
    minBet: 0.25,
    maxBet: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Blackjack Pro',
    description: 'Professional blackjack experience',
    imageUrl: GameImage.src,
    category: 'Blackjack',
    isActive: true,
    minBet: 1,
    maxBet: 500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Roulette Royale',
    description: 'European roulette with live dealers',
    imageUrl: GameImage.src,
    category: 'Roulette',
    isActive: true,
    minBet: 0.5,
    maxBet: 1000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Home() {

  return (
    <div className="space-y-12">
      {/* Home Page Banner */}
      <HeroBanner />

      {/* Featured Games Slider */}
      <section className='w-full'>
        <FeaturedGamesSlider games={featuredGames} />
      </section>

      {/* Boosted Odds */}
      <section className='w-full'>
        <SportComponent title="Boosted Odds" />
      </section>

      {/* Game Sections */}
      <section className='w-full'>
        <GameSections />
      </section>

      {/* Tournament Section */}
      <section className='w-full'>
        <TournamentSection />
      </section>

      {/* Live Odds */}
      <section className='w-full'>
        <SportComponent title="Live Now" />
      </section>

      {/* Jackpot Banner */}
      <section className='w-full'>
        <Image width={1127} height={356} className='w-full h-full object-cover' src={JackpotBanner.src} alt="Jackpot Banner" />
      </section>

      {/* Live Casino */}
      <section className='w-full'>
        <LiveCasinoSlider />
      </section>

      {/* Slot Games */}
      <section className='w-full'>
        <SlotsGrid />
      </section>

      {/* Win Table */}
      <section className='w-full'>
        <WinTable />
      </section>
    </div>
  );
}