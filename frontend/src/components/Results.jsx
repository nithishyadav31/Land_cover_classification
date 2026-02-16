import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Download, Share2, Map, BarChart3, PieChart } from 'lucide-react';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Results = ({ image, analysisData }) => {
  // Use passed data or fall back to mock data
  const inputImage = image || "https://images.unsplash.com/photo-1559586616-361e18714958?q=80&w=1000&auto=format&fit=crop";
  const classifiedImage = image || "https://images.unsplash.com/photo-1559586616-361e18714958?q=80&w=1000&auto=format&fit=crop"; // potentially processed image URL

  // Mock Data for Visualization (can be overridden by analysisData)
  const pieLabels = analysisData?.pieData?.labels || ['Water Body', 'Vegetation', 'Urban', 'Barren Land', 'Agriculture'];
  const pieValues = analysisData?.pieData?.data || [25, 35, 15, 10, 15];

  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieValues,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)', // Blue
          'rgba(16, 185, 129, 0.8)', // Green
          'rgba(239, 68, 68, 0.8)',   // Red
          'rgba(245, 158, 11, 0.8)',  // Amber
          'rgba(217, 119, 6, 0.8)',   // Orange
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(217, 119, 6, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barLabels = analysisData?.barData?.labels || ['Water', 'Veg', 'Urban', 'Barren', 'Agri'];
  const barValues = analysisData?.barData?.data || [0.95, 0.92, 0.88, 0.85, 0.90];

  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: 'F1-Score',
        data: barValues,
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const metrics = analysisData?.metrics || {
    accuracy: "92.4",
    kappa: "0.89",
    inferenceTime: "1.2",
    area: "12"
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#cbd5e1' } // light text
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.label === 'F1-Score') return `F1-Score: ${context.parsed.y}`;
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#cbd5e1' }
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#cbd5e1' }
      }
    }
  };

  return (
    <div className="w-full">
      {/* Maps Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Original Image */}
        <div className="glass-panel p-4 rounded-xl border border-white/5">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-white font-bold flex items-center gap-2"><Map size={18} className="text-earth-blue" /> Original Input (RGB)</h3>
            <span className="text-xs text-text-muted bg-space-950/50 px-2 py-1 rounded border border-white/5">Satellite Source</span>
          </div>
          <div className="aspect-square w-full bg-black rounded-lg overflow-hidden border border-white/10 relative group">
            <img
              src={inputImage}
              alt="Satellite Input"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </div>

        {/* Classified Result */}
        <div className="glass-panel p-4 rounded-xl border border-earth-green/20 bg-earth-green/5">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-white font-bold flex items-center gap-2"><Map size={18} className="text-earth-green" /> Classified Map (LULC)</h3>
            <span className="text-xs text-earth-green font-medium animate-pulse">Analysis Complete</span>
          </div>
          <div className="aspect-square w-full bg-space-900 rounded-lg overflow-hidden border border-earth-green/30 relative">
            <img
              src={classifiedImage}
              alt="Classified Output"
              className="w-full h-full object-cover filter contrast-150 saturate-200 hue-rotate-[120deg] brightness-110 sepia-[0.3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-900/40 to-transparent pointer-events-none"></div>
            {/* Legend Overlay */}
            <div className="absolute bottom-4 right-4 bg-space-950/80 backdrop-blur-md p-2 rounded-lg border border-white/10 text-[10px] grid grid-cols-2 gap-x-3 gap-y-1">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span><span className="text-white/70">Water</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span><span className="text-white/70">Veg</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span><span className="text-white/70">Urban</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500"></span><span className="text-white/70">Barren</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Pie Chart */}
        <div className="glass-panel p-6 rounded-xl border border-white/5">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2"><PieChart size={18} className="text-earth-blue" /> Land Cover Distribution</h3>
          <div className="w-full max-w-[260px] mx-auto">
            <Pie data={pieData} options={{ ...chartOptions, scales: {} }} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="glass-panel p-6 rounded-xl lg:col-span-2 border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold flex items-center gap-2"><BarChart3 size={18} className="text-earth-green" /> Classification Precision</h3>
            <span className="text-xs text-text-muted">F1-Score per Class</span>
          </div>
          <div className="w-full h-[300px]">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl text-center border border-white/5 hover:border-white/10 transition-colors">
          <span className="text-text-muted text-[10px] uppercase tracking-[0.2em] block mb-2">Overall Accuracy</span>
          <span className="text-3xl font-bold text-white tabular-nums">{metrics.accuracy}%</span>
        </div>
        <div className="glass-panel p-5 rounded-xl text-center border border-white/5 hover:border-white/10 transition-colors">
          <span className="text-text-muted text-[10px] uppercase tracking-[0.2em] block mb-2">Kappa Coefficient</span>
          <span className="text-3xl font-bold text-earth-blue tabular-nums">{metrics.kappa}</span>
        </div>
        <div className="glass-panel p-5 rounded-xl text-center border border-white/5 hover:border-white/10 transition-colors">
          <span className="text-text-muted text-[10px] uppercase tracking-[0.2em] block mb-2">Inference Time</span>
          <span className="text-3xl font-bold text-earth-green tabular-nums">{metrics.inferenceTime}s</span>
        </div>
        <div className="glass-panel p-5 rounded-xl text-center border border-white/5 hover:border-white/10 transition-colors">
          <span className="text-text-muted text-[10px] uppercase tracking-[0.2em] block mb-2">Area Analyzed</span>
          <span className="text-3xl font-bold text-orange-400 tabular-nums">{metrics.area}km²</span>
        </div>
      </div>
    </div>
  );
};

export default Results;
