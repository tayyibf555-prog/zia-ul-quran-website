import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calculator, Info, Landmark, Coins, Briefcase, Heart } from 'lucide-react';

const ZakatCalculator = () => {
    const [assets, setAssets] = useState({
        cash: 0,
        gold: 0,
        silver: 0,
        investments: 0,
        business: 0,
        other: 0,
        debts: 0
    });

    const [prices, setPrices] = useState({ gold: 55.42, silver: 0.68 }); // Mock prices per gram

    const totalAssets = Object.entries(assets)
        .filter(([key]) => key !== 'debts')
        .reduce((sum, [, val]) => sum + Number(val), 0);

    const nisabGold = prices.gold * 87.48; // Nisab based on Gold (approx)
    const netAssets = totalAssets - assets.debts;
    const zakatDue = netAssets >= nisabGold ? netAssets * 0.025 : 0;

    const handleInput = (e) => {
        const { name, value } = e.target;
        setAssets(prev => ({ ...prev, [name]: Number(value) }));
    };

    return (
        <div className="min-h-screen bg-neutral-50 pt-28 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-600 mb-4">
                        Zakat Calculator
                    </h1>
                    <p className="text-neutral-600 text-lg">
                        A simple tool to help you fulfill your religious obligation with precision.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Input Section */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-100">
                            <h3 className="text-xl font-bold text-primary-900 mb-8 flex items-center gap-2">
                                <Landmark className="text-accent-500" />
                                Your Assets (GBP)
                            </h3>

                            <div className="space-y-4">
                                {[
                                    { name: 'cash', label: 'Cash at Home/Bank', icon: Landmark },
                                    { name: 'gold', label: 'Gold Value', icon: Coins },
                                    { name: 'silver', label: 'Silver Value', icon: Coins },
                                    { name: 'investments', label: 'Shares / Investments', icon: Briefcase }
                                ].map(({ name, label, icon: Icon }) => (
                                    <div key={name} className="relative">
                                        <label className="text-sm font-medium text-neutral-500 block mb-1">{label}</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">£</span>
                                            <input
                                                type="number"
                                                name={name}
                                                onChange={handleInput}
                                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 pl-8 pr-4 focus:ring-2 focus:ring-accent-500 outline-none transition-shadow"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-4 border-t border-neutral-100">
                                    <label className="text-sm font-medium text-red-500 block mb-1">Total Debts / Liabilities</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">£</span>
                                        <input
                                            type="number"
                                            name="debts"
                                            onChange={handleInput}
                                            className="w-full bg-red-50/30 border border-red-100 rounded-xl py-3 pl-8 pr-4 focus:ring-2 focus:ring-red-500 outline-none transition-shadow"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Result Card */}
                    <div className="space-y-6">
                        <motion.div
                            className="bg-primary-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden h-full flex flex-col justify-between"
                            animate={{ scale: zakatDue > 0 ? [1, 1.02, 1] : 1 }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-accent-400 mb-2 uppercase tracking-wider">Zakat Due</h3>
                                <div className="text-5xl font-display font-bold mb-4">
                                    £{zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <p className="text-primary-200 text-sm mb-6">
                                    {zakatDue > 0
                                        ? "You have exceeded the Nisab threshold. This amount is 2.5% of your net assets."
                                        : "Your net assets are below the Nisab threshold of £" + nisabGold.toFixed(0) + "."}
                                </p>
                            </div>

                            <div className="relative z-10 space-y-4">
                                <a
                                    href="https://donate.justgiving.com/charity/ziaulquran/donation-amount"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-gold-gradient text-white text-center py-4 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all shadow-lg shadow-amber-900/40"
                                >
                                    Pay Zakat via Masjid
                                </a>
                                <div className="flex items-center gap-2 text-[10px] text-primary-300 uppercase font-bold text-center justify-center">
                                    <Info size={12} />
                                    Nisab is based on market gold rates
                                </div>
                            </div>

                            {/* Background Pattern */}
                            <div className="absolute inset-0 z-0 opacity-10 bg-[url('/hero-pattern.jpg')] bg-cover"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZakatCalculator;
