import React from 'react';
import { BarChart as ChartBar } from 'lucide-react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface LifeStatsProps {
  timeUnits: any;
}

interface MetricWithTooltipProps {
  label: string;
  value: string | number;
  tooltip: string;
}

interface Stat {
  label: string;
  value: number | string;
  format: (v: number | string) => string;
  tooltip: string;
}

const TitleWithTooltip: React.FC<{ title: string; tooltip: string }> = ({ title, tooltip }) => (
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

const LifeStats: React.FC<LifeStatsProps> = ({ timeUnits }) => {
  if (!timeUnits) return null;

  const stats: Stat[] = [
    {
      label: "Heartbeats",
      value: Math.floor(timeUnits.total.minutes * 80),
      format: (v: number | string) => typeof v === 'number' ? v.toLocaleString() : v,
      tooltip: "Calculated based on an average heart rate of 80 beats per minute"
    },
    {
      label: "Breaths Taken",
      value: Math.floor(timeUnits.total.minutes * 16),
      format: (v: number | string) => typeof v === 'number' ? v.toLocaleString() : v,
      tooltip: "Based on an average breathing rate of 16 breaths per minute"
    },
    {
      label: "Words Spoken",
      value: Math.floor(timeUnits.total.days * 7000),
      format: (v: number | string) => typeof v === 'number' ? v.toLocaleString() : v,
      tooltip: "Estimated based on average daily word count of 7,000 words"
    },
    {
      label: "Steps Walked",
      value: Math.floor(timeUnits.total.days * 5000),
      format: (v: number | string) => typeof v === 'number' ? v.toLocaleString() : v,
      tooltip: "Calculated using an average daily step count of 5,000 steps"
    },
    {
      label: "Earth Rotations",
      value: Math.floor(timeUnits.total.days),
      format: (v: number | string) => typeof v === 'number' ? v.toLocaleString() : v,
      tooltip: "One rotation equals one Earth day (24 hours)"
    },
    {
      label: "Moon Years",
      value: (timeUnits.years / 0.083).toFixed(1),
      format: (v: number | string) => v.toString(),
      tooltip: "Calculated by dividing Earth years by 0.083 (lunar year length)"
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <ChartBar className="text-purple-400" size={24} />
        <h2 className="text-2xl font-semibold">Life Statistics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 rounded-lg p-6 text-center hover:bg-white/10 transition-colors"
          >
            <TitleWithTooltip title={stat.label} tooltip={stat.tooltip} />
            <p className="text-3xl font-bold text-purple-400 mt-3">
              {stat.format(stat.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifeStats;