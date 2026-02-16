import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Database, Cpu, Map, ChevronRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">

            {/* 1. Hero Section (Fixed Background, Clean Academic Title) */}
            <div className="relative h-screen min-h-[600px] flex flex-col justify-center items-center text-center px-4">
                {/* Fixed Background Image - Only for this section */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=3872&auto=format&fit=crop')",
                    }}
                >
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight leading-tight">
                        Land Cover Classification <br />
                        <span className="text-3xl md:text-5xl font-light text-slate-800 mt-2 block">
                            from Time-Series Satellite Images
                        </span>
                    </h1>

                    <p className="mt-6 text-xl text-slate-900 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        Analyzing land use patterns and environmental changes using Landsat-8 temporal data and Multi-CNN deep learning architectures.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/map"
                            className="px-8 py-3 bg-black hover:bg-slate-900 text-white rounded-md transition-all duration-300 text-sm font-medium uppercase tracking-wider shadow-lg border-2 border-black/20 hover:border-black"
                        >
                            Explore Project
                        </Link>
                    </div>

                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-70 animate-bounce">
                        <ArrowDown className="text-white w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* 2. Project Overview (White Background, Academic Text) */}
            <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-black mb-8 pb-4 border-b border-slate-200 inline-block">Project Overview</h2>

                    <div className="space-y-6 text-slate-700 text-lg leading-relaxed text-center font-sans max-w-3xl mx-auto">
                        <p>
                            This project addresses the limitations of static satellite imagery by utilizing <strong>Landsat-8 Time-Series Data</strong>.
                            Our custom <strong>Multi-CNN architecture</strong> identifies dynamic land cover patterns with high precision, overcoming seasonal phenological
                            variability to provide robust, data-driven environmental monitoring and land use insights.
                        </p>
                        <div className="pt-4">
                            <Link
                                to="/about"
                                className="inline-flex items-center px-6 py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium uppercase tracking-wide"
                            >
                                Read More About Project
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Vision & Mission (Grey Background) */}
            <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Vision */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
                        <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-earth-blue pl-3">Vision</h3>
                        <p className="text-slate-700 leading-relaxed font-medium">
                            "To pioneer the next generation of environmental monitoring by synergizing high-resolution satellite intelligence with advanced deep learning, enabling automated, accurate, and real-time understanding of global land dynamics."
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
                        <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide border-l-4 border-earth-green pl-3">Mission</h3>
                        <ul className="space-y-4 text-slate-700 leading-relaxed list-disc list-outside ml-4">
                            <li>To leverage <strong>Landsat-8 temporal data</strong> to overcome the limitations of static imagery and eliminate phenological noise.</li>
                            <li>To develop and validate robust <strong>Multi-CNN architectures</strong> that set new benchmarks for classification accuracy.</li>
                            <li>To provide policymakers and researchers with <strong>actionable, data-driven insights</strong> for sustainable land resource management.</li>
                        </ul>
                    </div>

                </div>
            </section>

            {/* 4. Methodology Snapshot (Professional 5-Step Pipeline) */}
            <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-bold text-black uppercase tracking-tight">System Workflow</h2>
                        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">High-level overview of the land cover classification pipeline</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                        {/* Horizontal Connector Line for Desktop */}
                        <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-slate-200 z-0"></div>

                        {/* Step 1: Data Acquisition */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-14 h-14 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-black mb-6 shadow-sm">
                                <Database size={24} />
                            </div>
                            <h4 className="font-bold text-black text-center text-sm uppercase tracking-wide">Satellite Data Acquisition</h4>
                        </div>

                        {/* Step 2: Preprocessing */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-14 h-14 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-black mb-6 shadow-sm">
                                <Cpu size={24} />
                            </div>
                            <h4 className="font-bold text-black text-center text-sm uppercase tracking-wide">Preprocessing</h4>
                        </div>

                        {/* Step 3: Feature Extraction */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-14 h-14 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-black mb-6 shadow-sm">
                                <ChevronRight className="rotate-90 md:rotate-0" size={24} />
                            </div>
                            <h4 className="font-bold text-black text-center text-sm uppercase tracking-wide">Feature Extraction</h4>
                        </div>

                        {/* Step 4: Deep Learning */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-14 h-14 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-black mb-6 shadow-sm">
                                <Cpu size={24} />
                            </div>
                            <h4 className="font-bold text-black text-center text-sm uppercase tracking-wide">Deep Learning Classification</h4>
                        </div>

                        {/* Step 5: Output */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-14 h-14 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-black mb-6 shadow-sm">
                                <Map size={24} />
                            </div>
                            <h4 className="font-bold text-black text-center text-sm uppercase tracking-wide">Land Cover Output</h4>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
