import React, { useState } from 'react';
import GlobalMapComponent from '../components/GlobalMap';
import LiveLocationButton from '../components/LiveLocationButton';
import MapLayerToggle from '../components/MapLayerToggle';
import ResultPanel from '../components/ResultPanel';
import MapSearchBar from '../components/MapSearchBar';
import { Globe, MapPin, Activity, Loader2 } from 'lucide-react';

const GlobalMap = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [mapType, setMapType] = useState('satellite');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleRunAnalysis = async () => {
        if (!selectedLocation) return;
        setIsAnalyzing(true);
        setAnalysisResult(null);

        try {
            // Updated to the new modular backend
            const response = await fetch('http://localhost:5000/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    latitude: selectedLocation.lat,
                    longitude: selectedLocation.lng,
                    zoom: 15
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Return a result object with error so ResultPanel can show it
                setAnalysisResult({ 
                    error: data.error || 'The analysis engine encountered a server error. Please try again later.'
                });
                return;
            }

            // Calculate a 0.05 degree bounding box around the point
            const d = 0.0125; // Smaller box for higher focus (approx 2.5km)
            const bounds = [
                [selectedLocation.lat - d, selectedLocation.lng - d],
                [selectedLocation.lat + d, selectedLocation.lng + d]
            ];

            setAnalysisResult({
                url: data.classification_map, // Base64 string from backend
                bounds: bounds,
                statistics: data.statistics,
                dominant_class: data.dominant_class,
                confidence: data.confidence
            });
        } catch (error) {
            console.error('Analysis failed:', error);
            setAnalysisResult({ 
                error: 'MCNN Analysis Engine is unreachable. Please ensure the backend is running with "python app.py" on port 5000.'
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetAnalysis = () => {
        setAnalysisResult(null);
    };

    const handleStartOver = () => {
        setAnalysisResult(null);
        setSelectedLocation(null);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-space-950">
            {/* Full Screen Map Container */}
            <div className="flex-grow relative overflow-hidden group">
                <GlobalMapComponent
                    onLocationSelect={setSelectedLocation}
                    selectedLocation={selectedLocation}
                    analysisOverlay={analysisResult}
                    mapType={mapType}
                />

                {/* Floating Map Controls - Top Center */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] flex gap-4">
                    <MapSearchBar onLocationFound={setSelectedLocation} />
                    <LiveLocationButton onLocationFound={setSelectedLocation} />
                    <MapLayerToggle currentLayer={mapType} onToggle={setMapType} />
                    
                    {/* Start Over Button */}
                    {(selectedLocation || analysisResult) && (
                        <button
                            onClick={handleStartOver}
                            className="group flex items-center gap-2 px-4 py-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/30 rounded-lg transition-all duration-300 shadow-xl shadow-black/20 pointer-events-auto h-11"
                        >
                            <span className="text-[10px] font-bold text-rose-200 uppercase tracking-widest">
                                Start Over
                            </span>
                        </button>
                    )}
                </div>

                {/* Floating Sidebar - Right */}
                <div className="absolute top-6 right-6 bottom-6 w-80 z-[1000] flex flex-col gap-6 pointer-events-none">

                    {/* Information Panel */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-space-950/70 pointer-events-auto animate-fade-in-right">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-earth-blue/20 rounded-lg">
                                <Globe className="text-earth-blue" size={20} />
                            </div>
                            <h2 className="text-white font-bold tracking-tight uppercase text-xs tracking-[0.2em]">Target Matrix</h2>
                        </div>

                        {!selectedLocation ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-white/10 rounded-xl bg-white/5">
                                <MapPin size={32} className="text-white/20 mb-4" />
                                <p className="text-white/40 text-[9px] px-6 uppercase tracking-[0.2em] font-medium leading-relaxed">Select a point on the global map to begin real-time analysis</p>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-scale-in">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                                        <span className="text-[8px] text-white/40 uppercase tracking-widest block mb-1 font-bold">Latitude</span>
                                        <span className="text-sm font-mono text-white tabular-nums">{selectedLocation.lat.toFixed(6)}</span>
                                    </div>
                                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                                        <span className="text-[8px] text-white/40 uppercase tracking-widest block mb-1 font-bold">Longitude</span>
                                        <span className="text-sm font-mono text-white tabular-nums">{selectedLocation.lng.toFixed(6)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action & Result Area */}
                    <div className="pointer-events-auto flex-grow flex flex-col animate-fade-in-right delay-100 min-h-0">
                        {!analysisResult ? (
                            <div className="flex flex-col h-full">
                                <div className="flex-grow"></div> {/* Push button to bottom */}
                                <button
                                    onClick={handleRunAnalysis}
                                    disabled={!selectedLocation || isAnalyzing}
                                    className={`
                                        w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl transition-all duration-500 overflow-hidden relative
                                        ${!selectedLocation || isAnalyzing
                                            ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                                            : 'bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-emerald-500/20 active:scale-95 border-t border-white/20'}
                                    `}
                                >
                                    {isAnalyzing && (
                                        <div className="absolute inset-0 bg-emerald-400/20 animate-pulse"></div>
                                    )}
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin text-white" />
                                            <span className="uppercase text-[11px] font-black tracking-[0.3em]">Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Activity size={18} className={selectedLocation ? "animate-pulse" : ""} />
                                            <span className="uppercase text-[11px] font-black tracking-[0.3em]">Analyze Area</span>
                                        </>
                                    )}
                                </button>
                                <p className="mt-4 text-center text-[8px] text-white/30 uppercase tracking-[0.2em]">
                                    Engine: MCNN V2.1 // Regional Focus: 2.5km
                                </p>
                            </div>
                        ) : (
                            <ResultPanel result={analysisResult} onReset={handleStartOver} />
                        )}
                    </div>
                </div>

                {/* Bottom Status - Left */}
                <div className="absolute bottom-6 left-6 z-[1000] animate-fade-in-up">
                    <div className="glass-panel px-4 py-2 rounded-lg border border-white/10 bg-space-950/80 flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${analysisResult ? 'bg-emerald-400' : 'bg-earth-blue'} animate-pulse`}></div>
                        <span className="text-[9px] text-white/50 font-mono tracking-widest uppercase">
                            {analysisResult ? 'Inference Complete' : 'Awaiting Selection'} // Data Layer: Landsat-8
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalMap;
