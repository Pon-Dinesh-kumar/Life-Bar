import React from 'react';
import { Clock } from 'lucide-react';

interface LifeProgressProps {
  timeUnits: any;
}

const LifeProgress: React.FC<LifeProgressProps> = ({ timeUnits }) => {
  if (!timeUnits) return null;

  const progressBars = [
    { label: 'Years', value: timeUnits.years, max: 100 },
    { label: 'Months', value: timeUnits.months, max: 12 },
    { label: 'Days', value: timeUnits.days, max: 31 },
    { label: 'Hours', value: timeUnits.hours, max: 24 },
    { label: 'Minutes', value: timeUnits.minutes, max: 60 },
    { label: 'Seconds', value: timeUnits.seconds, max: 60 },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="text-purple-400" size={24} />
        <h2 className="text-2xl font-semibold">Your Life Progress</h2>
      </div>

      <div className="space-y-6">
        {progressBars.map((bar) => (
          <div key={bar.label}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">{bar.label}</span>
              <span className="text-sm font-medium text-gray-300">
                {Math.floor(bar.value)} / {bar.max}
              </span>
            </div>
            <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${(bar.value / bar.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifeProgress;