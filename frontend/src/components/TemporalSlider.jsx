import React from 'react';
import { Calendar } from 'lucide-react';

const TemporalSlider = ({ year, setYear }) => {
    const years = [2014, 2016, 2018, 2020, 2023];

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-space-950/40">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-earth-blue" />
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Temporal Mode</span>
                </div>
                <span className="text-2xl font-black text-white tabular-nums tracking-tighter">
                    {year}
                </span>
            </div>

            <div className="relative pt-2 pb-6 px-2">
                <input
                    type="range"
                    min="2014"
                    max="2023"
                    step="1"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-earth-blue hover:accent-earth-blue/80 transition-all"
                />

                {/* Year Ticks */}
                <div className="absolute left-2 right-2 flex justify-between top-0 -translate-y-1">
                    {years.map((y) => (
                        <div
                            key={y}
                            className={`w-0.5 h-3 transition-colors duration-300 ${year >= y ? 'bg-earth-blue' : 'bg-white/10'}`}
                        />
                    ))}
                </div>
            </div>

            <p className="text-[10px] text-text-muted mt-2 leading-relaxed">
                Select a target year for historical land cover comparison. Accuracy may vary based on cloud coverage and available satellite passes.
            </p>
        </div>
    );
};

export default TemporalSlider;
