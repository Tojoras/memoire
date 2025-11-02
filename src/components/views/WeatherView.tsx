import { Thermometer, Droplets, Wind, Calendar } from 'lucide-react';
import { AtmosphericCondition } from '../../lib/supabase';

interface WeatherViewProps {
  atmospheric: AtmosphericCondition[];
  latestAtmospheric: AtmosphericCondition | null;
}

export function WeatherView({ atmospheric, latestAtmospheric }: WeatherViewProps) {
  const calculateStats = () => {
    if (atmospheric.length === 0) {
      return {
        avgTemp: 0,
        avgHumidity: 0,
        maxTemp: 0,
        minTemp: 0,
        maxHumidity: 0,
        minHumidity: 0
      };
    }

    const temps = atmospheric.map(a => a.temperature);
    const humidities = atmospheric.map(a => a.humidity);

    return {
      avgTemp: temps.reduce((a, b) => a + b, 0) / temps.length,
      avgHumidity: humidities.reduce((a, b) => a + b, 0) / humidities.length,
      maxTemp: Math.max(...temps),
      minTemp: Math.min(...temps),
      maxHumidity: Math.max(...humidities),
      minHumidity: Math.min(...humidities)
    };
  };

  const stats = calculateStats();

  const getComfortLevel = () => {
    if (!latestAtmospheric) return { text: 'Indisponible', color: 'gray' };

    const temp = latestAtmospheric.temperature;
    const humidity = latestAtmospheric.humidity;

    if (temp >= 20 && temp <= 26 && humidity >= 40 && humidity <= 60) {
      return { text: 'Confortable', color: 'green' };
    } else if (temp > 30 || humidity > 70) {
      return { text: 'Chaud et humide', color: 'orange' };
    } else if (temp < 15) {
      return { text: 'Froid', color: 'blue' };
    } else {
      return { text: 'Acceptable', color: 'yellow' };
    }
  };

  const comfort = getComfortLevel();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-5 h-5" />
            <h3 className="text-sm font-medium opacity-90">Température actuelle</h3>
          </div>
          <p className="text-5xl font-bold mb-1">
            {latestAtmospheric ? `${latestAtmospheric.temperature.toFixed(1)}°` : '---'}
          </p>
          <p className="text-sm opacity-75">Celsius</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5" />
            <h3 className="text-sm font-medium opacity-90">Humidité actuelle</h3>
          </div>
          <p className="text-5xl font-bold mb-1">
            {latestAtmospheric ? `${latestAtmospheric.humidity.toFixed(0)}%` : '---'}
          </p>
          <p className="text-sm opacity-75">Humidité relative</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Wind className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Niveau de confort</h3>
        </div>
        <div className={`bg-${comfort.color}-50 border border-${comfort.color}-200 rounded-lg p-6 text-center`}>
          <p className={`text-3xl font-bold text-${comfort.color}-700 mb-2`}>{comfort.text}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Basé sur la température et l'humidité actuelles</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Statistiques température</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Moyenne</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">{stats.avgTemp.toFixed(1)}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Maximum</span>
              <span className="text-lg font-bold text-red-600">{stats.maxTemp.toFixed(1)}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Minimum</span>
              <span className="text-lg font-bold text-blue-600">{stats.minTemp.toFixed(1)}°C</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Statistiques humidité</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Moyenne</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">{stats.avgHumidity.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Maximum</span>
              <span className="text-lg font-bold text-cyan-600">{stats.maxHumidity.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Minimum</span>
              <span className="text-lg font-bold text-orange-600">{stats.minHumidity.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Historique météo</h3>
        </div>
        <div className="overflow-y-auto max-h-[500px]">
          {atmospheric.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">Aucune donnée disponible</p>
          ) : (
            <div className="space-y-2">
              {atmospheric.map((condition, index) => (
                <div
                  key={condition.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-orange-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Thermometer className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {condition.temperature.toFixed(1)}°C
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(condition.timestamp).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">
                      {condition.humidity.toFixed(0)}%
                    </p>
                    {index === 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Plus récent
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
