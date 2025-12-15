'use client';

import { useState } from 'react';

const MOODS = [
    { label: 'Happy', value: 'happy', icon: '😊' },
    { label: 'Sad', value: 'sad', icon: '😢' },
    { label: 'Energetic', value: 'energetic', icon: '⚡' },
    { label: 'Calm', value: 'calm', icon: '😌' },
    { label: 'Romantic', value: 'romantic', icon: '❤️' },
    { label: 'Focus', value: 'focus', icon: '🧠' },
];

function MoodSelectionContent({ selectedMood, onMoodSelect, isGameMode, setIsOpen }) {
    return (
        <div className="grid grid-cols-2 gap-3 p-4">
            {MOODS.map(mood => (
                <button
                    key={mood.value}
                    onClick={() => {
                        onMoodSelect(mood.value);
                        if (!isGameMode && setIsOpen) setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm font-medium transition-all rounded-xl flex items-center gap-2 ${selectedMood === mood.value
                        ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/25 scale-105'
                        : 'bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300'
                        }`}
                >
                    <span className="text-2xl">{mood.icon}</span>
                    <span className="font-bold">{mood.label}</span>
                </button>
            ))}
        </div>
    );
}

export default function MoodWidget({ selectedMood, onMoodSelect, isGameMode = false }) {
    const [isOpen, setIsOpen] = useState(false);

    const currentMood = MOODS.find(m => m.value === selectedMood) || MOODS[0];

    if (isGameMode) {
        return (
            <MoodSelectionContent
                selectedMood={selectedMood}
                onMoodSelect={onMoodSelect}
                isGameMode={isGameMode}
                setIsOpen={null}
            />
        );
    }

    return (
        <div className="relative">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white/60 dark:bg-black/40 backdrop-blur-xl rounded-[2rem] p-6 border border-gray-200 dark:border-white/5 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] hover:-translate-y-1 cursor-pointer h-full flex flex-col justify-between group"
            >
                <div>
                    <h3 className="text-lg font-bold mb-1 flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <span className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                            </svg>
                        </span>
                        Mood
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 pl-1">Vibe check</p>
                </div>

                <div className="flex items-center gap-3 mt-4">
                    <span className="text-4xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{currentMood.icon}</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{currentMood.label}</span>
                </div>
            </div>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-white/10 z-20 overflow-hidden">
                        <MoodSelectionContent
                            selectedMood={selectedMood}
                            onMoodSelect={onMoodSelect}
                            isGameMode={isGameMode}
                            setIsOpen={setIsOpen}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
