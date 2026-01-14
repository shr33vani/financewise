"use client";
import { useState, useEffect } from 'react';
import TransactionInput from '../components/TransactionInput';
import StatsCard from '../components/StatsCard';
import GeminiCard from '../components/GeminiCard';

export default function Home() {
    const [transactions, setTransactions] = useState([]);

    // Load from LocalStorage on start
    useEffect(() => {
        const saved = localStorage.getItem('finance-wise-data');
        if (saved) {
            setTransactions(JSON.parse(saved));
        }
    }, []);

    // Save to LocalStorage on change
    useEffect(() => {
        localStorage.setItem('finance-wise-data', JSON.stringify(transactions));
    }, [transactions]);

    const handleAddTransaction = (newTx) => {
        setTransactions([newTx, ...transactions]);
    };

    return (
        <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)]">
                    FinanceWise
                </h1>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 overflow-hidden border-2 border-white/20">
                    {/* Placeholder Avatar */}
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Column: Stats & AI (4 cols) */}
                <div className="md:col-span-4 space-y-6">
                    <GeminiCard transactions={transactions} />
                    <StatsCard transactions={transactions} />
                </div>

                {/* Right Column: Input & History (8 cols) */}
                <div className="md:col-span-8 space-y-6">
                    <section className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/2">
                            <TransactionInput onAdd={handleAddTransaction} />
                        </div>

                        {/* Recent History List */}
                        <div className="w-full md:w-1/2 glass-panel p-6 max-h-[500px] overflow-y-auto">
                            <h3 className="text-xl font-bold mb-4 text-white">Recent Activity</h3>
                            {transactions.length === 0 ? (
                                <p className="text-gray-500 text-sm">No expenses yet. Add one!</p>
                            ) : (
                                <div className="space-y-3">
                                    {transactions.map((t) => (
                                        <div key={t.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                            <div>
                                                <p className="font-medium text-white">{t.description}</p>
                                                <p className="text-xs text-gray-400 capitalize">{t.type} • {new Date(t.date).toLocaleDateString()}</p>
                                            </div>
                                            <p className="font-bold text-[var(--primary-accent)]">-₹{t.amount}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}
