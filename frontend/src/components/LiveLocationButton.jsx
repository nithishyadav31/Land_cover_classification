import React, { useState } from 'react';
import { Navigation, Loader2 } from 'lucide-react';

const LiveLocationButton = ({ onLocationFound }) => {
    const [isLocating, setIsLocating] = useState(false);

    const handleLocate = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                onLocationFound({ lat: latitude, lng: longitude });
                setIsLocating(false);
            },
            (error) => {
                console.error("Error detecting location:", error);
                alert("Unable to retrieve your location. Please check your permissions.");
                setIsLocating(false);
            },
            { enableHighAccuracy: true }
        );
    };

    return (
        <button
            onClick={handleLocate}
            disabled={isLocating}
            className="group flex items-center gap-3 px-4 py-2.5 bg-space-950/80 backdrop-blur-md border border-white/10 rounded-xl hover:bg-earth-blue/20 hover:border-earth-blue/50 transition-all duration-300 shadow-lg pointer-events-auto"
        >
            {isLocating ? (
                <Loader2 size={16} className="text-earth-blue animate-spin" />
            ) : (
                <Navigation size={16} className="text-earth-blue group-hover:scale-110 transition-transform" />
            )}
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">
                {isLocating ? 'Locating...' : 'Use My Location'}
            </span>
        </button>
    );
};

export default LiveLocationButton;
