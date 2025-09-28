'use client';

import { useState, useEffect } from 'react';

export function TournamentSection() {
    const [timeLeft, setTimeLeft] = useState({
        days: 12,
        hours: 8,
        minutes: 45,
        seconds: 23
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        } else {
                            hours = 23;
                            if (days > 0) {
                                days--;
                            }
                        }
                    }
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="mb-8">
            <h2 className="text-yellow-primary text-xl md:text-2xl font-bold mb-6">Tournaments</h2>

            <div
                className="rounded-xl px-6 py-16 bg-dark-primary"
            >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-6 lg:mb-0">
                        <h3 className="text-yellow-primary text-3xl font-bold mb-2">Golden Spin Cup</h3>
                        <div className="text-gray-300 mb-1">Prize winner:</div>
                        <div className="text-[#97B9FF] text-xl font-semibold mb-6">800$ + 200 FS</div>

                        <button
                            className="bg-lavendar-primary text-dark-primary border border-lavendar-primary
             hover:bg-lavendar-primary/80 hover:border-lavendar-primary/80 hover:text-dark-primary
             font-semibold px-2 transition-colors duration-300 rounded-sm h-[44px]"
                        >
                            PARTICIPATE IN A TOURNAMENT
                        </button>
                    </div>

                    <div className="lg:text-left ">
                        <div className="text-lavendar-primary text-sm mb-2">Time before the Tournament</div>
                        <div className="flex space-x-3">
                            <div className="text-center">
                                <div className="border border-white/10 rounded-lg p-3 min-w-[60px]" style={{ backgroundColor: 'blue-primary' }}>
                                    <div className="text-yellow-primary text-xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
                                    <div className="text-gray-400 text-xs">Days</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="border border-white/10 rounded-lg p-3 min-w-[60px]" style={{ backgroundColor: 'blue-primary' }}>
                                    <div className="text-yellow-primary text-xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                                    <div className="text-gray-400 text-xs">Hours</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="border border-white/10 rounded-lg p-3 min-w-[60px]" style={{ backgroundColor: 'blue-primary' }}>
                                    <div className="text-yellow-primary text-xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                                    <div className="text-gray-400 text-xs">Minutes</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="border border-white/10 rounded-lg p-3 min-w-[60px]" style={{ backgroundColor: 'blue-primary' }}>
                                    <div className="text-yellow-primary text-xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                                    <div className="text-gray-400 text-xs">Seconds</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
