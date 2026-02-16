import React, { useState, useRef, useEffect } from 'react';
import { Upload as UploadIcon, Check, AlertCircle, FileText, ChevronDown, Play, Loader2, RefreshCw, Cpu } from 'lucide-react';
import Results from '../components/Results';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [model, setModel] = useState('mcnn');
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [resultData, setResultData] = useState(null);

    // Ref for auto-scroll
    const resultsRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        validateAndSetFile(selectedFile);
    };

    const validateAndSetFile = (file) => {
        setError('');
        if (!file) return;

        // Check file type (allowing images or CSV/tabular for demo)
        const validTypes = ['image/tiff', 'image/png', 'image/jpeg', 'image/jpg', 'text/csv', 'application/vnd.ms-excel'];
        if (!validTypes.includes(file.type) && !file.name.endsWith('.tiff') && !file.name.endsWith('.csv')) {
            setError('Invalid file type. Please upload a satellite image (TIFF/PNG) or CSV dataset.');
            return;
        }
        setFile(file);
        setResultData(null); // Clear previous results when new file is selected
    };

    const handleClassification = () => {
        if (!file) {
            setError('Please upload a file first.');
            return;
        }

        setIsProcessing(true);
        // Simulate processing delay for demo
        setTimeout(() => {
            setIsProcessing(false);

            // Generate randomized but realistic analysis data
            const labels = ['Water Body', 'Vegetation', 'Urban', 'Barren Land', 'Agriculture'];

            // Generate random percentages that sum to 100
            let values = labels.map(() => Math.random() * 100);
            const sum = values.reduce((a, b) => a + b, 0);
            values = values.map(v => Math.round((v / sum) * 100));
            // Adjust to exactly 100 if rounding error
            const currentSum = values.reduce((a, b) => a + b, 0);
            if (currentSum !== 100) values[0] += (100 - currentSum);

            // Create a URL for the uploaded file to display it
            const fileUrl = URL.createObjectURL(file);
            setResultData({
                image: fileUrl,
                analysisData: {
                    pieData: {
                        labels: labels,
                        data: values
                    },
                    barData: {
                        labels: ['Water', 'Veg', 'Urban', 'Barren', 'Agri'],
                        data: labels.map(() => (0.85 + Math.random() * 0.12).toFixed(2)) // 0.85 to 0.97
                    },
                    metrics: {
                        accuracy: (92 + Math.random() * 5).toFixed(1),
                        kappa: (0.88 + Math.random() * 0.08).toFixed(2),
                        inferenceTime: (0.7 + Math.random() * 0.8).toFixed(1),
                        area: (5 + Math.random() * 15).toFixed(0)
                    }
                }
            });
        }, 3000);
    };

    // Auto-scroll when resultData is available
    useEffect(() => {
        if (resultData && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [resultData]);

    const resetAnalysis = () => {
        setFile(null);
        setResultData(null);
        setError('');
    };

    return (
        <div className="container mx-auto px-4 py-8 mb-20 min-h-[calc(100vh-80px)]">

            {/* Page Header */}
            <div className="max-w-5xl mx-auto mb-12 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Satellite Image Classification</h1>
                <p className="text-text-muted max-w-2xl mx-auto">
                    Upload your satellite imagery and select a deep learning model to perform automated land cover classification.
                </p>
            </div>

            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Upload Zone */}
                <div className="md:col-span-2">
                    <div
                        className={`glass-panel rounded-2xl p-8 border-2 border-dashed flex flex-col items-center justify-center text-center h-full min-h-[420px] transition-all duration-500 ${isDragging ? 'border-earth-green bg-earth-green/5 ring-4 ring-earth-green/10' : 'border-white/10 hover:border-earth-blue/40 hover:bg-white/5'}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={handleFileSelect}
                            accept=".tiff,.tif,.png,.csv,.jpg,.jpeg"
                        />

                        {!file ? (
                            <>
                                <div className="w-28 h-28 bg-space-900/50 rounded-full flex items-center justify-center mb-8 shadow-2xl border border-white/5 group-hover:border-earth-blue/30 transition-colors">
                                    <div className="w-20 h-20 bg-earth-blue/10 rounded-full flex items-center justify-center border border-earth-blue/20 group-hover:scale-110 transition-transform duration-500">
                                        <UploadIcon className="h-10 w-10 text-earth-blue" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Drop Imagery Here</h3>
                                <p className="text-text-muted mb-8 max-w-xs mx-auto leading-relaxed text-sm">
                                    Support for TIFF, PNG, and JPG. Recommended size: 512x512 pixels.
                                </p>
                                <label htmlFor="file-upload" className="px-10 py-3.5 bg-earth-blue hover:bg-earth-blue/80 text-white rounded-xl cursor-pointer transition-all font-semibold shadow-xl shadow-earth-blue/25 active:scale-95">
                                    Select from Computer
                                </label>
                            </>
                        ) : (
                            <div className="flex flex-col items-center animate-fade-in-up w-full">
                                <div className="w-24 h-24 bg-earth-green/10 rounded-full flex items-center justify-center mb-6 border border-earth-green/30 shadow-lg shadow-earth-green/5">
                                    <FileText className="h-10 w-10 text-earth-green" />
                                </div>
                                <div className="max-w-md bg-space-900/80 p-4 rounded-xl border border-white/10 mb-6">
                                    <h3 className="text-lg font-bold text-white mb-1 truncate">{file.name}</h3>
                                    <p className="text-text-muted text-xs font-mono uppercase tracking-widest">{(file.size / 1024 / 1024).toFixed(2)} MB • {file.type || 'Unknown Type'}</p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setFile(null)}
                                        className="px-6 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all border border-transparent hover:border-red-400/20"
                                    >
                                        Remove
                                    </button>
                                    <label htmlFor="file-upload" className="px-6 py-2 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 cursor-pointer transition-all">
                                        Change File
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Controls Sidebar */}
                <div className="flex flex-col gap-6">
                    {/* Model Selector */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-2 mb-6">
                            <Cpu size={20} className="text-earth-blue" />
                            <h3 className="text-white font-bold text-lg">Classifier</h3>
                        </div>

                        <div className="space-y-4">
                            <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all group ${model === 'mcnn' ? 'bg-earth-blue/10 border-earth-blue shadow-lg shadow-earth-blue/5' : 'bg-space-950/40 border-white/5 hover:border-white/10'}`}>
                                <div className="pt-1">
                                    <input
                                        type="radio"
                                        name="model"
                                        value="mcnn"
                                        checked={model === 'mcnn'}
                                        onChange={(e) => setModel(e.target.value)}
                                        className="accent-earth-blue w-4 h-4"
                                    />
                                </div>
                                <div>
                                    <span className={`block font-bold text-base transition-colors ${model === 'mcnn' ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>Multi-CNN</span>
                                    <span className="block text-[10px] text-text-muted mt-1 uppercase tracking-wider">High Accuracy (VHR)</span>
                                </div>
                            </label>

                            <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all group ${model === 'rf' ? 'bg-earth-green/10 border-earth-green shadow-lg shadow-earth-green/5' : 'bg-space-950/40 border-white/5 hover:border-white/10'}`}>
                                <div className="pt-1">
                                    <input
                                        type="radio"
                                        name="model"
                                        value="rf"
                                        checked={model === 'rf'}
                                        onChange={(e) => setModel(e.target.value)}
                                        className="accent-earth-green w-4 h-4"
                                    />
                                </div>
                                <div>
                                    <span className={`block font-bold text-base transition-colors ${model === 'rf' ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>Random Forest</span>
                                    <span className="block text-[10px] text-text-muted mt-1 uppercase tracking-wider">Baseline Performance</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleClassification}
                        disabled={!file || isProcessing}
                        className={`
                            w-full py-5 rounded-2xl font-bold text-lg shadow-2xl flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden
                            ${!file || isProcessing
                                ? 'bg-space-800 text-text-muted cursor-not-allowed border border-white/5 mb-2'
                                : 'bg-gradient-to-br from-earth-blue via-earth-blue to-earth-green text-white hover:scale-[1.02] active:scale-[0.98] border border-white/20 shadow-earth-blue/30'}
                        `}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="animate-spin h-5 w-5" />
                                <span className="tracking-wide">Analyzing Imagery...</span>
                            </>
                        ) : (
                            <>
                                <Play className="fill-current h-5 w-5" />
                                <span className="tracking-wide uppercase text-sm">Run Classification</span>
                            </>
                        )}
                        {/* Glow effect */}
                        {!isProcessing && file && <div className="absolute inset-0 bg-white/10 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>}
                    </button>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3 text-red-200 text-xs animate-shake">
                            <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Transition Spacer */}
            <div className="h-12"></div>

            {/* Results Section */}
            {resultData && (
                <div
                    ref={resultsRef}
                    className="w-full max-w-5xl mx-auto animate-fade-in-up border-t border-white/10 pt-16"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2 underline decoration-earth-green decoration-4 underline-offset-8">Classification Report</h2>
                            <p className="text-text-muted">Generated from <span className="text-white font-medium">{model.toUpperCase()}</span> model</p>
                        </div>
                        <button
                            onClick={resetAnalysis}
                            className="group flex items-center gap-2 px-6 py-2.5 bg-space-800 hover:bg-space-700 text-white rounded-xl transition-all border border-white/10 hover:border-white/20 shadow-lg text-sm"
                        >
                            <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                            Clear and Start Over
                        </button>
                    </div>

                    <Results image={resultData.image} analysisData={resultData.analysisData} />
                </div>
            )}
        </div>
    );
};

export default Upload;
