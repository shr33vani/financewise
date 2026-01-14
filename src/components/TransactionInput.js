"use client";
import { useState } from 'react';

export default function TransactionInput({ onAdd }) {
    const [activeTab, setActiveTab] = useState('text');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !description) return;

        onAdd({
            id: Date.now(), // simple unique id
            amount: parseFloat(amount),
            description,
            type: activeTab,
            date: new Date().toISOString()
        });

        setAmount('');
        setDescription('');
    };

    return (
        <div className="glass-panel p-6 w-full max-w-md">
            <div className="flex mb-6 space-x-2 bg-black/20 p-1 rounded-lg">
                {['text', 'link', 'voice'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab ? 'bg-[var(--primary-accent)] text-black shadow-lg' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'text' && (
                    <>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Description</label>
                            <input
                                type="text"
                                placeholder="Where did you spend?"
                                className="input-field"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </>
                )}

                {activeTab === 'link' && (
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Paste Link</label>
                        <input
                            type="url"
                            placeholder="https://amazon.in/..."
                            className="input-field"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <p className="text-[10px] text-gray-500 mt-1">We'll auto-extract the product name.</p>
                    </div>
                )}

                {activeTab === 'voice' && (
                    <div className="text-center py-8 border-2 border-dashed border-[var(--glass-border)] rounded-lg">
                        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                            🎤
                        </div>
                        <p className="text-sm text-gray-400">Tap to Start Recording</p>
                        <input
                            type="text"
                            className="hidden"
                            value={description}
                            onChange={() => { }} // dummy
                        />
                    </div>
                )}

                <div>
                    <label className="block text-xs text-gray-400 mb-1">Amount (₹)</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        className="input-field text-lg font-bold"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn-primary w-full mt-4">
                    Add Expense
                </button>
            </form>
        </div>
    );
}
