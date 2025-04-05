import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface TimeComparisonsProps {
  timeUnits: any;
}

interface TitleWithTooltipProps {
  title: string;
  tooltip: string;
}

const TitleWithTooltip: React.FC<TitleWithTooltipProps> = ({ title, tooltip }) => (
  <div className="flex items-center justify-center gap-1">
    <h3 className="text-lg font-medium">{title}</h3>
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <span className="cursor-help text-gray-400 hover:text-gray-300">ⓘ</span>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className="bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm shadow-lg"
            sideOffset={5}
          >
            {tooltip}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  </div>
);

const comparisons = [
  {
    title: "Earth's Orbital Distance",
    calculation: (days: number) => Math.floor(days * 2600000), // Earth travels about 2.6 million km per day
    unit: "km",
    tooltip: "Based on Earth's average orbital speed of 107,000 km/h"
  },
  {
    title: "Age in Moon Years",
    calculation: (years: number) => (years / 0.083).toFixed(1),
    unit: "years",
    tooltip: "Calculated by dividing Earth years by 0.083 (lunar year length)"
  },
  {
    title: "Universe Age Percentage",
    calculation: (years: number) => ((years / 13800000000) * 100).toFixed(10),
    unit: "%",
    tooltip: "Calculated using the estimated age of the universe (13.8 billion years)"
  }
];

const TimeComparisons: React.FC<TimeComparisonsProps> = ({ timeUnits }) => {
  const [randomComparisons, setRandomComparisons] = useState<typeof comparisons>([]);

  useEffect(() => {
    const shuffled = [...comparisons].sort(() => Math.random() - 0.5).slice(0, 3);
    setRandomComparisons(shuffled);
  }, []);

  if (!timeUnits) return null;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="text-purple-400" size={24} />
        <h2 className="text-2xl font-semibold">Celestial Timeline</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {randomComparisons.map((comparison) => (
          <div
            key={comparison.title}
            className="bg-white/5 rounded-lg p-6 text-center hover:bg-white/10 transition-colors"
          >
            <TitleWithTooltip title={comparison.title} tooltip={comparison.tooltip} />
            <p className="text-3xl font-bold text-purple-400 mt-3">
              {comparison.calculation(
                timeUnits[Object.keys(timeUnits)[0]]
              )}
              <span className="text-lg ml-2 text-gray-400">{comparison.unit}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeComparisons;