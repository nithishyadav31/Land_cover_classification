import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                        alt="Satellite Earth View"
                        className="rounded-2xl shadow-xl h-80 w-full object-cover border border-slate-200"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=3872&auto=format&fit=crop"
                        alt="High Altitude Remote Sensing"
                        className="rounded-2xl shadow-xl h-80 w-full object-cover border border-slate-200"
                    />
                </div>

                {/* Information Section */}
                <div className="max-w-4xl mx-auto bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="border-l-4 border-earth-blue pl-8">
                        <p className="text-xl md:text-2xl leading-relaxed text-slate-800 font-medium italic text-justify">
                            This project focuses on automated Land Cover Classification using multi-temporal satellite imagery from the Landsat-8 OLI sensor.
                            By analyzing time-series data, our system accurately distinguishes between diverse terrains such as forests, urban areas, and water bodies.
                            We implement a custom Multi-CNN (MCNN) deep learning architecture designed to extract both spatial features and complex temporal patterns.
                            This integration significantly improves classification precision compared to traditional methods by eliminating seasonal phenological noise.
                            Our research provides a robust framework for environmental monitoring, supporting data-driven decisions for sustainable land resource management.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

