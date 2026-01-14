"use client";
import { useState, useEffect } from 'react';

export default function GeminiCard({ transactions }) {
    const [insight, setInsight] = useState("Analyzing your spending habits...");
    const [loading, setLoading] = useState(false);

    // Simulated Gemini API Call
    // In a real app, you would call your backend endpoint which calls Google Gemini API
    useEffect(() => {
        if (transactions.length === 0) {
            setInsight("Start adding expenses to get AI insights!");
            return;
        }

        setLoading(true);
        // Mock API delay
        const timer = setTimeout(() => {
            const total = transactions.reduce((sum, t) => sum + t.amount, 0);
            const advice = [
                `You've spent ₹${total} total. Try to limit eating out this week to save 20%.`,
                "Great job tracking! Your education expenses are high, consider second-hand books.",
                "Warning: You are reaching 80% of your projected weekly budget.",
                "Looks like you visit coffee shops often. Making coffee at home could save ₹500/week.",
            ];
            // Pick random advice for demo
            const randomInsight = advice[Math.floor(Math.random() * advice.length)];
            setInsight(randomInsight);
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [transactions]);

    return (
        <div className="glass-panel p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
                ✨
            </div>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-white">
                <span className="text-purple-400">✦</span> Gemini Insight
            </h3>

            <div className={`transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}>
                <p className="text-sm font-light leading-relaxed text-gray-200">
                    {insight}
                </p>
            </div>

            {loading && (
                <div className="absolute bottom-1 w-full bg-blue-500/20 h-1 left-0 overflow-hidden">
                    <div className="h-full bg-blue-400 animate-progress w-1/3"></div>
                </div>
            )}
        </div>
    )
}
