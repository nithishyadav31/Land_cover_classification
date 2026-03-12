import React from 'react';
import { Layers, Globe } from 'lucide-react';

const MapLayerToggle = ({ currentLayer, onToggle }) => {
    return (
        <div className="flex bg-slate-900 rounded-lg p-1 shadow-xl shadow-black/20 pointer-events-auto h-11 items-center">
            <button
                onClick={() => onToggle('satellite')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${currentLayer === 'satellite'
                        ? 'bg-earth-blue text-white shadow-lg'
                        : 'text-white/40 hover:text-white/70'
                    }`}
            >
                <Globe size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Satellite</span>
            </button>
            <button
                onClick={() => onToggle('street')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${currentLayer === 'street'
                        ? 'bg-earth-blue text-white shadow-lg'
                        : 'text-white/40 hover:text-white/70'
                    }`}
            >
                <Layers size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Streets</span>
            </button>
        </div>
    );
};

export default MapLayerToggle;
