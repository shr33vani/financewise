"use client";

export default function StatsCard({ transactions }) {
    // Simple category calculation
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);

    // Group by type/category (MVP: just use 'type' from input tabs or description keywords)
    const categories = {
        'Food': 0,
        'Travel': 0,
        'Education': 0,
        'Others': 0
    };

    transactions.forEach(t => {
        const desc = t.description.toLowerCase();
        if (desc.includes('food') || desc.includes('lunch') || desc.includes('dinner')) categories['Food'] += t.amount;
        else if (desc.includes('bus') || desc.includes('uber') || desc.includes('train')) categories['Travel'] += t.amount;
        else if (desc.includes('book') || desc.includes('course')) categories['Education'] += t.amount;
        else categories['Others'] += t.amount;
    });

    return (
        <div className="glass-panel p-6 h-full">
            <h3 className="text-xl font-bold mb-4 gradient-text text-white">Spending Breakdown</h3>
            <div className="flex items-center justify-center p-4">
                {/* Simple CSS Donut Chart approximation or Bar chart */}
                <div className="w-full space-y-3">
                    {Object.entries(categories).map(([cat, amount]) => {
                        if (amount === 0) return null;
                        const percent = total > 0 ? (amount / total) * 100 : 0;
                        return (
                            <div key={cat}>
                                <div className="flex justify-between text-sm mb-1 text-gray-300">
                                    <span>{cat}</span>
                                    <span>{Math.round(percent)}%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] h-2 rounded-full"
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                            </div>
                        )
                    })}
                    {total === 0 && <p className="text-gray-500 text-center text-sm">No data yet</p>}
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--glass-border)] text-center">
                <p className="text-xs text-gray-400">Total Spent</p>
                <p className="text-2xl font-bold text-[var(--primary-accent)]">₹{total.toFixed(2)}</p>
            </div>
        </div>
    )
}
