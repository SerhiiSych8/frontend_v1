'use client';

import { Icon } from '@iconify/react';

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

interface FeaturedGamesProps {
  games: Game[];
  isLoading: boolean;
}

export default function FeaturedGames({ games, isLoading }: FeaturedGamesProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Featured Games</h2>
        <button className="text-lavendar-primary hover:text-yellow-primary transition-colors flex items-center space-x-2">
          <span>View All</span>
          <Icon icon="mdi:arrow-right" className="w-5 h-5" />
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-dark-primary/50 rounded-lg p-6 animate-pulse">
              <div className="w-full h-48 bg-lavendar-primary/20 rounded-lg mb-4"></div>
              <div className="h-4 bg-lavendar-primary/20 rounded mb-2"></div>
              <div className="h-3 bg-lavendar-primary/20 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="bg-dark-primary/50 hover:bg-dark-primary/70 rounded-lg p-6 transition-colors group">
              <div className="w-full h-48 bg-lavendar-primary/20 rounded-lg mb-4 flex items-center justify-center">
                <Icon icon="mdi:dice-6" className="w-16 h-16 text-lavendar-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-primary transition-colors">
                {game.name}
              </h3>
              <p className="text-white/70 mb-4">{game.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-lavendar-primary font-medium">
                  {game.category}
                </span>
                <button className="bg-yellow-primary text-dark-primary hover:bg-yellow-primary/90 font-medium px-4 py-2 rounded transition-colors">
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
