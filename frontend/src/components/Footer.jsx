import React from 'react';
import { Link } from 'react-router-dom';
import { Satellite, Github, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Satellite className="h-6 w-6 text-earth-blue" />
                            <span className="text-black font-black text-xl tracking-tighter uppercase italic">Land<span className="text-earth-blue">Cover</span>.AI</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                            Advancing environmental monitoring through multi-temporal satellite imagery and deep learning.
                            An academic initiative focused on sustainable land resource management.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-black font-bold text-xs uppercase tracking-widest mb-6 border-b border-slate-200 pb-2 inline-block">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link to="/dataset" className="text-slate-500 hover:text-black text-sm transition-colors">Satellite Dataset</Link></li>
                            <li><Link to="/classify" className="text-slate-500 hover:text-black text-sm transition-colors">Classification Tool</Link></li>
                            <li><Link to="/results" className="text-slate-500 hover:text-black text-sm transition-colors">Research Results</Link></li>
                        </ul>
                    </div>

                    {/* Contact/Social */}
                    <div>
                        <h4 className="text-black font-bold text-xs uppercase tracking-widest mb-6 border-b border-slate-200 pb-2 inline-block">Collaboration</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white border border-slate-200 rounded hover:bg-black hover:text-white transition-all">
                                <Github size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white border border-slate-200 rounded hover:bg-black hover:text-white transition-all">
                                <Mail size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white border border-slate-200 rounded hover:bg-black hover:text-white transition-all">
                                <ExternalLink size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
                        © {new Date().getFullYear()} LandCover.AI Research Project • All Rights Reserved
                    </p>
                    <div className="flex gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        <span>Built with Vite & React</span>
                        <span>Multi-CNN Architecture</span>
                        <span>Landsat-8 OLI Data</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
