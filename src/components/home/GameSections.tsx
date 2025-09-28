'use client';

import GameCategorySlider from './GameCategorySlider';

// Import Game Image
import BanquetOfDead from '@/assets/game/banquet_of_dead.png';
import BigBassBonanza from '@/assets/game/big_bass.png';
import CoinStrikeHoldAndWin3x3 from '@/assets/game/coin_strake.png';
import DragonsPlayground from '@/assets/game/dragon.png';
import Feature from '@/assets/game/feature.png';
import SweetBonanza from '@/assets/game/sweet.png';

// Mock game data - you can replace this with actual API data
const mockGames = [
  {
    id: '1',
    name: 'Coin Strike Hold and Win 3x3',
    provider: 'Provider',
    imageUrl: CoinStrikeHoldAndWin3x3.src,
    isNew: false,
    isLive: false
  },
  {
    id: '2',
    name: 'Banquet of Dead',
    provider: 'Provider',
    imageUrl: BanquetOfDead.src,
    isNew: false,
    isLive: false
  },
  {
    id: '3',
    name: 'Sweet Bonanza',
    provider: 'Provider',
    imageUrl: SweetBonanza.src,
    isNew: true,
    isLive: false
  },
  {
    id: '4',
    name: 'Big Bass Bonanza',
    provider: 'Provider',
    imageUrl: BigBassBonanza.src,
    isNew: false,
    isLive: false
  },
  {
    id: '5',
    name: 'Dragons Playground',
    provider: 'Provider',
    imageUrl: DragonsPlayground.src,
    isNew: true,
    isLive: false
  },
  {
    id: '6',
    name: '777 Valentine\'s',
    provider: 'Provider',
    imageUrl: Feature.src,
    isNew: false,
    isLive: false
  },
  {
    id: '7',
    name: 'Jellycious Doublemax',
    provider: 'Provider',
    imageUrl: SweetBonanza.src,
    isNew: false,
    isLive: false
  },
  {
    id: '8',
    name: 'Egyptian Darkness Book of the Divine',
    provider: 'Provider',
    imageUrl: Feature.src,
    isNew: true,
    isLive: false
  },
  {
    id: '9',
    name: 'Joker\'s Charms Valentine\'s',
    provider: 'Provider',
    imageUrl: SweetBonanza.src,
    isNew: false,
    isLive: false
  },
  {
    id: '10',
    name: 'Jelly Belly Megaways',
    provider: 'Provider',
    imageUrl: BigBassBonanza.src,
    isNew: true,
    isLive: true
  }
];

const GameSections = () => {
  const handleViewAll = (category: string) => {
    console.log(`View all ${category} clicked`);
    // Add your navigation logic here
  };

  return (
    <div className="space-y-12">
      {/* Popular Games */}
      <GameCategorySlider
        title="Popular Games"
        games={mockGames.slice(0, 7)}
        onViewAllClick={() => handleViewAll('Popular Games')}
      />

      {/* New Games */}
      <GameCategorySlider
        title="New Games"
        games={mockGames.slice(4, 10)}
        onViewAllClick={() => handleViewAll('New Games')}
      />

      {/* Live Now */}
      {/* <GameCategorySlider
        title="Live Now"
        games={mockGames.filter(game => game.isLive)}
        onViewAllClick={() => handleViewAll('Live Now')}
        showLiveBadge={true}
      /> */}

      {/* Crash Games */}
      <GameCategorySlider
        title="Crash Games"
        games={mockGames.slice(2, 9)}
        onViewAllClick={() => handleViewAll('Crash Games')}
      />
    </div>
  );
};

export default GameSections;
