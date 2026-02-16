import React from 'react';
import { MapContainer, TileLayer, ZoomControl, Marker, useMapEvents, ImageOverlay, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const LocationMarker = ({ setLocation, selectedLocation }) => {
    useMapEvents({
        click(e) {
            setLocation(e.latlng);
        },
    });

    return selectedLocation ? (
        <Marker position={selectedLocation} />
    ) : null;
};

// Map Controller for Centering
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    React.useEffect(() => {
        if (center) {
            map.setView(center, zoom || 14, { animate: true });
        }
    }, [center, zoom, map]);
    return null;
};

const GlobalMap = ({ onLocationSelect, selectedLocation, analysisOverlay, mapType = 'satellite' }) => {
    // ESRI Tile URLs
    const satelliteUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
    const streetUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    const position = [20.5937, 78.9629]; // Geographic center of India
    const zoom = 5;

    return (
        <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-space-950">
            <MapContainer
                center={position}
                zoom={zoom}
                scrollWheelZoom={true}
                className="w-full h-full z-0"
                zoomControl={false}
            >
                {/* Layer Switching */}
                {mapType === 'satellite' ? (
                    <TileLayer
                        attribution='&copy; ESRI & contributors'
                        url={satelliteUrl}
                    />
                ) : (
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url={streetUrl}
                    />
                )}

                {/* Map Helpers */}
                {selectedLocation && <ChangeView center={selectedLocation} />}

                <ZoomControl position="bottomright" />
                <LocationMarker setLocation={onLocationSelect} selectedLocation={selectedLocation} />

                {analysisOverlay && (
                    <ImageOverlay
                        url={analysisOverlay.url}
                        bounds={analysisOverlay.bounds}
                        opacity={0.8}
                        zIndex={1000}
                    />
                )}
            </MapContainer>

            {/* Legend Overlay (Visible when analysis is active) */}
            {analysisOverlay && (
                <div className="absolute top-4 right-4 z-[1000] bg-space-950/90 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/30 animate-scale-in">
                    <span className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] block mb-3 text-center border-b border-emerald-500/10 pb-2">Overlay Legend</span>
                    <div className="grid grid-cols-1 gap-2 text-[10px] font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500 shadow-sm shadow-blue-500/50"></span><span className="text-white/70">Water</span></div>
                        <div className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-sm bg-rose-500 shadow-sm shadow-rose-500/50"></span><span className="text-white/70">Urban</span></div>
                        <div className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 shadow-sm shadow-emerald-600/50"></span><span className="text-white/70">Forest</span></div>
                        <div className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-sm bg-amber-500 shadow-sm shadow-amber-500/50"></span><span className="text-white/70">Agriculture</span></div>
                        <div className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-sm bg-slate-400 shadow-sm shadow-slate-400/50"></span><span className="text-white/70">Barren</span></div>
                    </div>
                </div>
            )}

            {/* Map Mode Indicator */}
            <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
                <div className="bg-space-950/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 shadow-lg pointer-events-auto flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${mapType === 'satellite' ? 'bg-orange-400' : 'bg-earth-blue'} animate-pulse`}></div>
                    <span className="text-[10px] text-white/70 font-mono tracking-widest uppercase">
                        {mapType.toUpperCase()} MODE ACTIVE
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GlobalMap;

