import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';
import { Link } from 'react-router-dom';
import { translations } from '../utils/translations';

Chart.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

interface Stat {
  date: string;
  total: number;
  countries: Record<string, number>;
}

// Mapeo de países a emojis de banderas
const countryFlags: Record<string, string> = {
  'Chile': '🇨🇱',
  'Argentina': '🇦🇷',
  'México': '🇲🇽',
  'España': '🇪🇸',
  'Estados Unidos': '🇺🇸',
  'Canadá': '🇨🇦',
  'Brasil': '🇧🇷',
  'Colombia': '🇨🇴',
  'Perú': '🇵🇪',
  'Venezuela': '🇻🇪',
  'Ecuador': '🇪🇨',
  'Bolivia': '🇧🇴',
  'Paraguay': '🇵🇾',
  'Uruguay': '🇺🇾',
  'Desconocido': '🌍',
};

interface StatsPageProps {
  language: 'es' | 'en';
  setLanguage: (language: 'es' | 'en') => void;
}

export default function StatsPage({ language }: StatsPageProps) {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalVisits, setTotalVisits] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const t = translations[language];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stats');
        setStats(response.data);
        
        // Calcular total de visitas
        const total = response.data.reduce((sum: number, stat: Stat) => sum + stat.total, 0);
        setTotalVisits(total);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-zinc-300">{t.stats.loading}</p>
        </motion.div>
      </div>
    );
  }

  if (!stats.length) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative">
        <Link
          to="/"
          className="text-indigo-400 hover:underline text-sm absolute top-6 right-6"
        >
          {t.stats.backToHome}
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-3xl font-bold text-white mb-4">{t.stats.noVisits}</h1>
          <p className="text-zinc-300 mb-8">{t.stats.noVisitsSubtitle}</p>
        </motion.div>
      </div>
    );
  }

  // Preparar datos para el gráfico (últimos 7 días)
  const recentStats = stats.slice(-7);
  const labels = recentStats.map(s => {
    const date = new Date(s.date);
    return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { 
      day: '2-digit',
      month: 'short'
    });
  });
  
  const chartData = {
    labels,
    datasets: [
      {
        label: t.stats.visits,
        data: recentStats.map(s => s.total),
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#4F46E5',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  // Agrupar países por total de visitas
  const countryTotals: Record<string, number> = {};
  stats.forEach(stat => {
    Object.entries(stat.countries).forEach(([country, count]) => {
      countryTotals[country] = (countryTotals[country] || 0) + count;
    });
  });

  const sortedCountries = Object.entries(countryTotals)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  // Formatear fecha de última actualización
  const formatLastUpdate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'es' ? 'es-ES' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white flex items-center gap-2 mb-2">
            📊 {t.stats.title}
          </h1>
          <p className="text-sm text-zinc-400 uppercase tracking-wide">
            {t.stats.subtitle}
          </p>
        </motion.div>

        {/* Total de visitas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900 rounded-xl p-4 shadow text-center mb-6"
        >
          <h2 className="text-sm text-zinc-400 uppercase tracking-wide mb-2">{t.stats.totalVisits}</h2>
          <div className="text-4xl font-bold text-white">{totalVisits.toLocaleString()}</div>
        </motion.div>

        {/* Gráfico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 rounded-xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-white font-semibold mb-4">📊 {t.stats.visitsByDay}</h3>
          {recentStats.length > 0 ? (
            <div className="h-[300px] w-full">
              <Line 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      backgroundColor: 'rgba(24, 24, 27, 0.95)',
                      titleColor: '#fff',
                      bodyColor: '#fff',
                      borderColor: '#52525b',
                      borderWidth: 1,
                      cornerRadius: 8,
                      displayColors: false,
                      callbacks: {
                        title: (items) => `${t.stats.date}: ${items[0].label}`,
                        label: (item) => `${item.parsed.y} ${t.stats.visits}`,
                      },
                    },
                  },
                  scales: {
                    x: { 
                      grid: { color: 'rgba(82, 82, 91, 0.3)' }, 
                      ticks: { color: '#a1a1aa', font: { size: 12 } } 
                    },
                    y: { 
                      grid: { color: 'rgba(82, 82, 91, 0.3)' }, 
                      ticks: { color: '#a1a1aa', font: { size: 12 } },
                      beginAtZero: true,
                    },
                  },
                  elements: {
                    point: {
                      hoverBackgroundColor: '#4F46E5',
                    },
                  },
                }} 
              />
            </div>
          ) : (
            <div className="h-[300px] w-full flex items-center justify-center">
              <p className="text-zinc-400 text-center">{t.stats.noRecentData}</p>
            </div>
          )}
        </motion.div>

        {/* Top Países */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900 rounded-xl p-4 shadow mb-6"
        >
          <h3 className="text-white font-semibold mb-4">🌍 {t.stats.topCountries}</h3>
          {sortedCountries.length > 0 && !(sortedCountries.length === 1 && sortedCountries[0][0] === 'Desconocido') ? (
            <div className="grid grid-cols-2 gap-4">
              {sortedCountries.map(([country, count], index) => (
                <motion.div
                  key={country}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{countryFlags[country] || '🌍'}</span>
                    <span className="text-zinc-300 text-sm truncate">{country}</span>
                  </div>
                  <span className="text-indigo-400 font-bold">{count}</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-400 text-center py-8">{t.stats.noCountryData}</p>
          )}
        </motion.div>

        {/* Resumen por Fecha */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 mb-6"
        >
          <h3 className="text-white font-semibold">📅 {t.stats.dateSummary}</h3>
          {stats.slice(-5).map((stat, index) => (
            <motion.div
              key={stat.date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-zinc-900 rounded-xl p-4 shadow"
            >
              <h4 className="text-white font-semibold text-lg mb-3">
                {new Date(stat.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h4>
              <div className="space-y-2">
                {Object.entries(stat.countries).map(([country, count]) => (
                  <div key={country} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>{countryFlags[country] || '🌍'}</span>
                      <span className="text-zinc-300">{country}</span>
                    </div>
                    <span className="text-indigo-400 font-medium">{count} {t.stats.visits}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Última actualización */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center pt-6 border-t border-zinc-800"
        >
          <p className="text-sm text-zinc-400">
            📈 {t.stats.lastUpdate}: {formatLastUpdate(lastUpdate)}
          </p>
        </motion.div>

        {/* Botón Volver al Inicio */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/"
            className="text-indigo-400 hover:underline text-sm transition-all duration-150"
          >
            {t.stats.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
} 