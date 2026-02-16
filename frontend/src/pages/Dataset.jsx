import React from 'react';
import { Database, Layers, CheckCircle, BarChart3, Image as ImageIcon } from 'lucide-react';

const Dataset = () => {
    const bands = [
        { name: 'Band 1', desc: 'Coastal Aerosol', res: '30m' },
        { name: 'Band 2', desc: 'Blue', res: '30m' },
        { name: 'Band 3', desc: 'Green', res: '30m' },
        { name: 'Band 4', desc: 'Red', res: '30m' },
        { name: 'Band 5', desc: 'Near Infrared (NIR)', res: '30m' },
        { name: 'Band 6', desc: 'SWIR 1', res: '30m' },
        { name: 'Band 7', desc: 'SWIR 2', res: '30m' },
    ];

    const indices = [
        { name: 'NDVI', fullName: 'Normalized Difference Vegetation Index', formula: '(NIR - Red) / (NIR + Red)' },
        { name: 'NDWI', fullName: 'Normalized Difference Water Index', formula: '(Green - NIR) / (Green + NIR)' },
        { name: 'BI', fullName: 'Bare Soil Index', formula: '((SWIR + Red) - (NIR + Blue)) / ((SWIR + Red) + (NIR + Blue))' },
    ];

    const classes = [
        'Water Body', 'Forest / Vegetation', 'Agricultural Land',
        'Built-up / Urban', 'Barren Land', 'Rocky Terrain',
        'Sand', 'Wetland', 'Cloud / Shadow'
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 border-b border-white/10 pb-6">
                <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                    <Database className="text-earth-blue" size={32} /> Dataset Overview
                </h1>
                <p className="text-xl text-text-muted max-w-3xl">
                    Technical specifications of the Landsat-8 OLI sensor data and the spectral indices derived for land cover classification.
                </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Landsat-8 Info */}
                <div className="glass-panel p-8 rounded-xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <ImageIcon className="text-earth-blue" /> Landsat-8 Params
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between border-b border-white/10 pb-3">
                            <span className="text-text-muted font-medium">Sensor Platform</span>
                            <span className="text-white font-mono">OLI / TIRS</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-3">
                            <span className="text-text-muted font-medium">Spatial Res</span>
                            <span className="text-white font-mono">30m (Visible, NIR)</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-3">
                            <span className="text-text-muted font-medium">Revisit Time</span>
                            <span className="text-white font-mono">16 Days</span>
                        </div>
                        <div className="flex justify-between pb-2">
                            <span className="text-text-muted font-medium">Tile Count</span>
                            <span className="text-white font-mono">2,500+</span>
                        </div>
                    </div>
                </div>

                {/* Indices Used */}
                <div className="glass-panel p-8 rounded-xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Layers className="text-earth-land" /> Spectral Indices
                    </h2>
                    <div className="space-y-4">
                        {indices.map((index, i) => (
                            <div key={i} className="bg-space-900/50 p-4 rounded-lg border border-white/5">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-white font-bold text-lg">{index.name}</span>
                                    <span className="text-xs text-text-muted font-mono bg-space-950 px-2 py-1 rounded border border-white/10">{index.formula}</span>
                                </div>
                                <p className="text-sm text-text-muted">{index.fullName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bands Table */}
            <div className="glass-panel rounded-xl overflow-hidden mt-8">
                <div className="p-6 border-b border-white/10 bg-space-800/50">
                    <h2 className="text-xl font-bold text-white">Spectral Bands Evaluated</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-space-900/80 border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-text-muted font-semibold text-sm uppercase tracking-wider">Band Name</th>
                                <th className="px-6 py-4 text-text-muted font-semibold text-sm uppercase tracking-wider">Description</th>
                                <th className="px-6 py-4 text-text-muted font-semibold text-sm uppercase tracking-wider">Resolution</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {bands.map((band, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-white font-medium">{band.name}</td>
                                    <td className="px-6 py-4 text-text-muted">{band.desc}</td>
                                    <td className="px-6 py-4 text-text-muted font-mono">{band.res}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Classes Section */}
            <div className="mt-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="text-earth-green" /> Land Cover Classes
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {classes.map((cls, i) => (
                        <div key={i} className="glass-card p-4 rounded-lg text-center cursor-default group">
                            <div className="w-12 h-12 rounded-full mx-auto mb-3 bg-space-800 group-hover:bg-earth-green/20 flex items-center justify-center transition-colors border border-white/10 group-hover:border-earth-green/50">
                                <CheckCircle className="text-text-muted group-hover:text-earth-green transition-colors" size={20} />
                            </div>
                            <h3 className="text-gray-300 font-medium text-sm group-hover:text-white">{cls}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dataset;
