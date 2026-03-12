import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Satellite, Activity, Layers, Upload, FileText, Info, Globe } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/', icon: <Satellite size={18} /> },
        { name: 'Classify', path: '/classify', icon: <Upload size={18} /> },
        { name: 'Global Map', path: '/map', icon: <Globe size={18} /> },
        { name: 'About', path: '/about', icon: <Info size={18} /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="glass-panel sticky top-0 z-50 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="bg-earth-blue/20 p-1.5 rounded-full border border-earth-blue/50 group-hover:border-earth-blue transition-colors">
                                <Satellite className="h-6 w-6 text-earth-blue group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-white font-bold text-xl tracking-tight">Land<span className="text-earth-blue">Cover</span>.AI</span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive(item.path)
                                        ? 'bg-earth-blue/20 text-earth-blue border border-earth-blue/30'
                                        : 'text-text-muted hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-text-muted hover:text-white hover:bg-white/10 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden glass-panel border-t border-white/5">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 block px-3 py-2 rounded-md text-base font-medium ${isActive(item.path)
                                    ? 'bg-earth-blue/20 text-earth-blue'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
