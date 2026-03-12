import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

const MapSearchBar = ({ onLocationFound }) => {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        try {
            // Use OpenStreetMap Nominatim API to geocode the query string into lat/lon coordinates
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`, {
                headers: {
                    'Accept-Language': 'en-US,en;q=0.9',
                    'User-Agent': 'LandCoverAnalysisApp/1.0'
                }
            });

            const data = await response.json();

            if (data && data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lon = parseFloat(result.lon);
                
                if (onLocationFound && !isNaN(lat) && !isNaN(lon)) {
                    // Coordinates used by standard Leaflet are [lat, lng]
                    onLocationFound({ lat, lng: lon });
                    setQuery(''); // clear the search bar on success
                }
            } else {
                alert('Location not found. Please try a different search term.');
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            alert('Failed to search for location. Please check your connection.');
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <form 
            onSubmit={handleSearch} 
            className="flex items-center bg-slate-900 rounded-lg shadow-xl shadow-black/20 px-3 py-2 pointer-events-auto h-11 transition-all"
        >
            <input
                type="text"
                placeholder="Search location..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent border-none text-white placeholder-white/50 text-xs tracking-wider outline-none w-48 font-mono"
            />
            
            <span className="w-px h-6 bg-white/20 mx-2"></span>
            
            <button 
                type="submit" 
                disabled={isSearching || !query.trim()}
                className="text-white/70 hover:text-white disabled:opacity-50 disabled:hover:text-white/70 transition-colors p-1"
            >
                {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            </button>
        </form>
    );
};

export default MapSearchBar;
