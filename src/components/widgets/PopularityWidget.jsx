'use client';

import { useState } from 'react';

const POPULARITY_LEVELS = [
    { label: 'Mainstream', value: 'mainstream', icon: '🔥', range: [80, 100] },
    { label: 'Popular', value: 'popular', icon: '⭐', range: [50, 80] },
    { label: 'Underground', value: 'underground', icon: '💎', range: [0, 50] },
];

export default function PopularityWidget({ selectedPopularity, onPopularitySelect }) {
    const [isOpen, setIsOpen] = useState(false);

    const currentLevel = POPULARITY_LEVELS.find(p => p.value === selectedPopularity) || POPULARITY_LEVELS[0];

    return (
        <div className="relative">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white/60 dark:bg-black/40 backdrop-blur-xl rounded-[2rem] p-6 border border-gray-200 dark:border-white/5 hover:border-pink-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] hover:-translate-y-1 cursor-pointer h-full flex flex-col justify-between group"
            >
                <div>
                    <h3 className="text-lg font-bold mb-1 flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <span className="p-2 rounded-xl bg-pink-500/10 text-pink-500">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </span>
                        Popularity
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 pl-1">Chart status</p>
                </div>

                <div className="flex items-center gap-3 mt-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{currentLevel.icon}</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{currentLevel.label}</span>
                </div>
            </div>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-white/10 z-20 overflow-hidden">
                        {POPULARITY_LEVELS.map(level => (
                            <button
                                key={level.value}
                                onClick={() => {
                                    onPopularitySelect(level.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/10 flex items-center gap-2 ${selectedPopularity === level.value
                                    ? 'bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-300'
                                    : 'text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                <span>{level.icon}</span>
                                {level.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
