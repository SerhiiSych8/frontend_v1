'use client';

import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

// Team Images
import BarcelonaLogo from '@/assets/game/barcelona.png';
import RealMadridLogo from '@/assets/game/real.png';
import Image from 'next/image';

interface Match {
    id: string;
    league: string;
    homeTeam: {
        name: string;
        logo: string;
    };
    awayTeam: {
        name: string;
        logo: string;
    };
    status: string;
    score: string;
    odds: {
        home: number;
        draw: number;
        away: number;
    };
    events?: {
        home: number;
        away: number;
    };
}

const mockMatches: Match[] = [
    {
        id: '1',
        league: 'Spain • La Liga',
        homeTeam: {
            name: 'Barcelona',
            logo: BarcelonaLogo.src
        },
        awayTeam: {
            name: 'Real Madrid',
            logo: RealMadridLogo.src
        },
        status: '1ST HALF 42',
        score: '0:0',
        odds: {
            home: 2.10,
            draw: 3.60,
            away: 2.10
        },
        events: {
            home: 1,
            away: 2
        }
    },
    {
        id: '2',
        league: 'Belgium • Pro League',
        homeTeam: {
            name: 'Club Brugge',
            logo: BarcelonaLogo.src
        },
        awayTeam: {
            name: 'Red Star',
            logo: RealMadridLogo.src
        },
        status: '1ST HALF 43',
        score: '1:0',
        odds: {
            home: 1.85,
            draw: 3.40,
            away: 4.20
        },
        events: {
            home: 0,
            away: 1
        }
    },
    {
        id: '3',
        league: 'Spain • La Liga',
        homeTeam: {
            name: 'Atletico Madrid',
            logo: BarcelonaLogo.src
        },
        awayTeam: {
            name: 'Inter Milan',
            logo: RealMadridLogo.src
        },
        status: 'HALF TIME',
        score: '0:0',
        odds: {
            home: 2.45,
            draw: 3.20,
            away: 2.80
        },
        events: {
            home: 0,
            away: 0
        }
    },
    {
        id: '4',
        league: 'Italy • Serie A',
        homeTeam: {
            name: 'Atletico Madrid',
            logo: BarcelonaLogo.src
        },
        awayTeam: {
            name: 'Inter Milan',
            logo: RealMadridLogo.src
        },
        status: 'HALF TIME',
        score: '0:0',
        odds: {
            home: 2.30,
            draw: 3.10,
            away: 3.20
        },
        events: {
            home: 0,
            away: 0
        }
    }
];

const HomeSportComponent = ({title}: {title: string}) => {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-yellow-primary">{title}</h2>
                <button className="text-yellow-primary/50 transition-colors flex items-center space-x-2 font-semibold text-sm">
                    <span>Live events</span>
                    <Icon icon="mdi:chevron-right" className="w-4 h-4" />
                </button>
            </div>

            {/* Matches Slider */}
            <Swiper
                slidesPerView={1}
                spaceBetween={16}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 16
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    }
                }}
                className="w-full"
            >
                {mockMatches.map((match) => (
                    <SwiperSlide key={match.id}>
                        <div className="bg-dark-primary rounded-xl p-4 transition-colors duration-200 cursor-pointer">
                            {/* League */}
                            <div className="text-yellow-primary/50 text-xs font-medium mb-3">
                                {match.league}
                            </div>

                            {/* Match Details */}
                            <div className="flex items-center justify-between mb-4">
                                {/* Home Team */}
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="w-10 h-10 flex items-center justify-center">
                                        <Image src={match.homeTeam.logo} alt={match.homeTeam.name} width={32} height={32} className="object-cover" />
                                    </div>
                                    <span className="text-yellow-primary text-xs font-medium text-center">
                                        {match.homeTeam.name}
                                    </span>
                                </div>

                                {/* Score & Status */}
                                <div className="flex flex-col items-center space-y-1">
                                    <div className="text-red-500 text-xs font-medium">
                                        {match.status}
                                    </div>
                                    <div className="text-yellow-primary text-xl font-bold">
                                        {match.score}
                                    </div>
                                    {/* Events Icons */}
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Away Team */}
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="w-10 h-10 flex items-center justify-center">
                                        <Image src={match.awayTeam.logo} alt={match.awayTeam.name} width={32} height={32} className="object-cover" />
                                    </div>
                                    <span className="text-yellow-primary text-xs font-medium text-center">
                                        {match.awayTeam.name}
                                    </span>
                                </div>
                            </div>

                            {/* Betting Odds */}
                            <div className="flex space-x-2">
                                <button className="flex-1 bg-[#1a2332] hover:bg-[#2a3441] rounded-lg p-2 transition-colors duration-200">
                                    <div className="text-white text-sm font-bold">
                                        {match.odds.home}
                                    </div>
                                    <div className="text-gray-400 text-xs">
                                        1
                                    </div>
                                </button>
                                <button className="flex-1 bg-[#1a2332] hover:bg-[#2a3441] rounded-lg p-2 transition-colors duration-200">
                                    <div className="text-white text-sm font-bold">
                                        {match.odds.draw}
                                    </div>
                                    <div className="text-gray-400 text-xs">
                                        X
                                    </div>
                                </button>
                                <button className="flex-1 bg-[#1a2332] hover:bg-[#2a3441] rounded-lg p-2 transition-colors duration-200">
                                    <div className="text-white text-sm font-bold">
                                        {match.odds.away}
                                    </div>
                                    <div className="text-gray-400 text-xs">
                                        2
                                    </div>
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeSportComponent;
