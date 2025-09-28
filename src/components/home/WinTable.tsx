'use client';

import { useState } from "react";
import { Icon } from "@iconify/react";

interface BetData {
    id: string;
    game: {
        name: string;
        icon: string;
    };
    player: string;
    time: string;
    bet: number;
    multiplier: number;
    payout: number;
}

interface WinTableProps {
    onViewAllClick?: () => void;
}

const mockBetData: BetData[] = [
    {
        id: '1',
        game: { name: 'Game Name', icon: '🎰' },
        player: 'Nunito123',
        time: '12:50:22 AM',
        bet: 20.00,
        multiplier: 88.44,
        payout: 150.25
    },
    {
        id: '2',
        game: { name: 'Game Name', icon: '💰' },
        player: 'Lol56',
        time: '12:50:22 AM',
        bet: 20.00,
        multiplier: 88.44,
        payout: 150.25
    },
    {
        id: '3',
        game: { name: 'Game Name', icon: '🐉' },
        player: 'All_fg',
        time: '12:50:22 AM',
        bet: 20.00,
        multiplier: 88.44,
        payout: 150.25
    },
    {
        id: '4',
        game: { name: 'Game Name', icon: '🍒' },
        player: 'SadSad666',
        time: '12:50:22 AM',
        bet: 20.00,
        multiplier: 88.44,
        payout: 150.25
    },
    {
        id: '5',
        game: { name: 'Game Name', icon: '🪙' },
        player: 'Big Dann',
        time: '12:50:22 AM',
        bet: 20.00,
        multiplier: 88.44,
        payout: 150.25
    },
    {
        id: '6',
        game: { name: 'Game Name', icon: '📖' },
        player: 'Alex 45',
        time: '12:50:22 AM',
        bet: 20.00,
        multiplier: 88.44,
        payout: 150.25
    },
    {
        id: '7',
        game: { name: 'Game Name', icon: '💎' },
        player: 'AAAAAAA56',
        time: '12:50:22 AM',
        bet: 20.00,
        multiplier: 88.44,
        payout: 150.25
    },
    {
        id: '8',
        game: { name: 'Game Name', icon: '🏴‍☠️' },
        player: 'Mr.Mep',
        time: '12:50:22 AM',
        bet: 20.00,
        multiplier: 88.44,
        payout: 150.25
    },
    {
        id: '9',
        game: { name: 'Game Name', icon: '🤠' },
        player: 'Saintboy78',
        time: '12:50:22 AM',
        bet: 20.00,
        multiplier: 88.44,
        payout: 150.25
    },
    {
        id: '10',
        game: { name: 'Game Name', icon: '🎰' },
        player: 'Player10',
        time: '12:50:22 AM',
        bet: 20.00,
        multiplier: 88.44,
        payout: 150.25
    }
];

export default function WinTable({ onViewAllClick }: WinTableProps) {
    const [activeTab, setActiveTab] = useState<'lucky' | 'high-rollers' | 'all'>('lucky');

    const handleViewAll = () => {
        if (onViewAllClick) onViewAllClick();
    };

    const tabs = [
        { id: 'lucky', label: 'Lucky Bets' },
        { id: 'high-rollers', label: 'High Rollers' },
        { id: 'all', label: 'All Bets' }
    ] as const;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-yellow-primary">Recent Wins</h2>
                <button
                    className="text-white hover:text-yellow-primary transition-colors flex items-center space-x-2 font-semibold text-sm"
                    onClick={handleViewAll}
                >
                    <span>View All</span>
                    <Icon icon="mdi:chevron-right" className="w-4 h-4" />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-dark-primary p-3 rounded-2xl md:w-fit w-full">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`md:w-[133px] w-full md:h-[47px] h-[35px] px-4 py-2 rounded-xl md:text-sm text-xs font-medium transition-colors duration-200 ${activeTab === tab.id
                                ? 'bg-lavendar-primary text-dark-primary'
                                : 'text-lavendar-primary '
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-dark-primary rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-dark-primary">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-lavendar-primary/50">Game</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-lavendar-primary/50">Player</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-lavendar-primary/50">Time</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-lavendar-primary/50">Bet</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-lavendar-primary/50">Multiplier</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-lavendar-primary/50">Payout</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {mockBetData.map((bet, index) => (
                                <tr key={bet.id} className={`${index % 2 === 0 ? 'bg-dark-primary' : 'bg-[#22355A]'} transition-colors duration-200`}>
                                    {/* Game Column */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg">{bet.game.icon}</span>
                                            <span className="text-sm text-lavendar-primary">{bet.game.name}</span>
                                        </div>
                                    </td>

                                    {/* Player Column */}
                                    <td className="px-4 py-3">
                                        <span className="text-sm text-yellow-primary/50">{bet.player}</span>
                                    </td>

                                    {/* Time Column */}
                                    <td className="px-4 py-3">
                                        <span className="text-sm text-yellow-primary/50">{bet.time}</span>
                                    </td>

                                    {/* Bet Column */}
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center px-3 py-1 rounded-[6px] text-xs font-medium bg-yellow-primary text-black">
                                            {bet.bet.toFixed(2)}$
                                        </span>
                                    </td>

                                    {/* Multiplier Column */}
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-lavendar-primary text-dark-primary">
                                            X{bet.multiplier.toFixed(2)}
                                        </span>
                                    </td>

                                    {/* Payout Column */}
                                    <td className="px-4 py-3">
                                        <span className="text-sm font-medium text-yellow-primary">
                                            {bet.payout.toFixed(2)}$
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
