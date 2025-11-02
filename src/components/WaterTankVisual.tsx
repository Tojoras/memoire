import { useMemo } from 'react';

interface WaterTankVisualProps {
  currentVolume: number;
  maxCapacity: number;
}

export function WaterTankVisual({ currentVolume, maxCapacity }: WaterTankVisualProps) {
  const fillPercentage = useMemo(() => {
    return Math.min((currentVolume / maxCapacity) * 100, 100);
  }, [currentVolume, maxCapacity]);

  const getFillColor = () => {
    if (fillPercentage > 75) return 'from-blue-400 to-blue-600';
    if (fillPercentage > 50) return 'from-cyan-400 to-cyan-600';
    if (fillPercentage > 25) return 'from-yellow-400 to-yellow-600';
    return 'from-orange-400 to-orange-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">Niveau de la cuve</h3>

      <div className="flex flex-col items-center gap-6">
        <div className="relative w-40 h-56 border-4 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
          <div
            className={`absolute bottom-0 w-full bg-gradient-to-t ${getFillColor()} transition-all duration-1000 ease-out`}
            style={{ height: `${fillPercentage}%` }}
          >
            <div
              className="absolute inset-0 opacity-20 bg-repeat animate-wave"
              style={{
                backgroundImage: 'linear-gradient(transparent 50%, rgba(255,255,255,0.2) 50%)',
                backgroundSize: '100% 20px',
              }}
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center z-10">
              <p className={`text-5xl font-bold ${fillPercentage > 50 ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                {fillPercentage.toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="absolute top-2 left-2 right-2 flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
            <span>100%</span>
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
            <span>0%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-3 text-center">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Volume</p>
            <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
              {currentVolume.toFixed(3)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">m³</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900 dark:to-cyan-800 rounded-lg p-3 text-center">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Volume</p>
            <p className="text-xl font-bold text-cyan-700 dark:text-cyan-300">
              {(currentVolume * 1000).toFixed(0)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">L</p>
          </div>
        </div>
      </div>
    </div>
  );
}
