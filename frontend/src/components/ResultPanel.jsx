import React from 'react';
import { Activity, ShieldCheck, PieChart, Info, Trash2, Download } from 'lucide-react';

const ResultPanel = ({ result, onReset }) => {
    if (!result) return null;

    if (result.error) {
        return (
            <div className="glass-panel p-6 rounded-3xl border border-rose-500/30 bg-rose-500/5 animate-scale-in flex flex-col items-center justify-center text-center h-full">
                <div className="p-3 bg-rose-500/20 rounded-xl mb-4">
                    <Activity className="text-rose-400" size={24} />
                </div>
                <h3 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-3">Analysis Error</h3>
                <p className="text-white/60 text-xs leading-relaxed mb-6">{result.error}</p>
                <button
                    onClick={onReset}
                    className="px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                    Try Another Area
                </button>
            </div>
        );
    }

    const isUnclassified = result.dominant_class === "Unclassified/Ocean" || result.confidence < 5;

    const stats = [
        { label: 'Forest', val: result.statistics?.Forest || 0, color: 'bg-emerald-600' },
        { label: 'Urban', val: result.statistics?.Urban || 0, color: 'bg-rose-500' },
        { label: 'Water', val: result.statistics?.Water || 0, color: 'bg-blue-500' },
        { label: 'Agriculture', val: result.statistics?.Agriculture || 0, color: 'bg-amber-500' },
        { label: 'Barren', val: result.statistics?.Barren || 0, color: 'bg-slate-400' },
        { label: 'Unclassified', val: result.statistics?.['Unclassified/Ocean'] || 0, color: 'bg-slate-900' }
    ];

    return (
        <div className={`glass-panel p-6 rounded-3xl border ${isUnclassified ? 'border-amber-500/30 bg-amber-500/5' : 'border-emerald-500/30 bg-emerald-500/5'} animate-scale-in flex flex-col h-full`}>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className={`p-2.5 ${isUnclassified ? 'bg-amber-500/20' : 'bg-emerald-500/20'} rounded-xl`}>
                        <Activity className={isUnclassified ? 'text-amber-400' : 'text-emerald-400'} size={18} />
                    </div>
                    <h3 className="text-white font-black text-xs uppercase tracking-[0.2em]">Inference Report</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                    <ShieldCheck size={12} className={isUnclassified ? 'text-amber-400' : 'text-emerald-400'} />
                    <span className="text-[10px] font-bold text-white/70">{result.confidence}%</span>
                </div>
            </div>

            <div className="space-y-6 flex-grow overflow-y-auto pr-1">
                {/* Highlight Card */}
                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <PieChart size={48} className="text-white" />
                    </div>
                    <span className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold block mb-1">Dominant Class</span>
                    <span className={`text-2xl font-black ${isUnclassified ? 'text-amber-200' : 'text-white'} tracking-tight`}>
                        {isUnclassified ? "Low Confidence Area" : result.dominant_class}
                    </span>
                    {isUnclassified && (
                        <p className="text-[9px] text-amber-500/60 uppercase tracking-widest mt-2 font-bold">
                            Model weights missing or area unclassified
                        </p>
                    )}
                </div>

                {/* Statistics List */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 opacity-40">
                        <Info size={12} className="text-white" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white">Land Cover Breakdown</span>
                    </div>

                    {stats.map((item) => (
                        <div key={item.label} className="space-y-1.5">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-white/50">{item.label}</span>
                                <span className="text-white tabular-nums">{item.val}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className={`${item.color} h-full transition-all duration-1000 ease-out`}
                                    style={{ width: `${item.val}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
                <button className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 active:scale-95">
                    <Download size={16} /> Export Data
                </button>
                <button
                    onClick={onReset}
                    className="w-full py-3 bg-white/5 hover:bg-rose-500/20 text-white/40 hover:text-rose-400 rounded-2xl text-[10px] font-bold transition-all uppercase tracking-widest border border-white/5 hover:border-rose-500/30 flex items-center justify-center gap-2"
                >
                    <Trash2 size={14} /> Clear Analysis
                </button>
            </div>
        </div>
    );
};

export default ResultPanel;
