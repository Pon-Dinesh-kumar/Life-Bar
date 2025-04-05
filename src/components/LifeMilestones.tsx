import React from 'react';
import { Trophy } from 'lucide-react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface LifeMilestonesProps {
  timeUnits: any;
  birthDate: Date;
}

interface Milestone {
  category: string;
  title: string;
  value: string | number;
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

const calculatePresidentialTerms = (birthDate: Date): number => {
  const startYear = birthDate.getFullYear();
  const currentYear = new Date().getFullYear();
  const terms = Math.floor((currentYear - startYear) / 4);
  return terms;
};

const calculateOlympicGames = (birthDate: Date): number => {
  const startYear = birthDate.getFullYear();
  const currentYear = new Date().getFullYear();
  const games = Math.floor((currentYear - startYear) / 4);
  return games;
};

const calculateTechnologicalRevolutions = (birthDate: Date): number => {
  const startYear = birthDate.getFullYear();
  let revolutions = 0;
  
  // Major tech revolutions since 1970
  if (startYear <= 1970) revolutions++; // Personal Computing
  if (startYear <= 1990) revolutions++; // Internet
  if (startYear <= 2007) revolutions++; // Mobile Revolution
  if (startYear <= 2015) revolutions++; // AI/ML Revolution
  if (startYear <= 2020) revolutions++; // Remote Work Revolution
  
  return revolutions;
};

const calculateHistoricalEvents = (birthDate: Date): string => {
  const startYear = birthDate.getFullYear();
  const currentYear = new Date().getFullYear();
  
  const events = [];
  
  // Major historical events since 1970
  if (startYear <= 1972) events.push("Apollo Moon Landing");
  if (startYear <= 1989) events.push("Fall of Berlin Wall");
  if (startYear <= 1991) events.push("End of Cold War");
  if (startYear <= 2001) events.push("9/11 Attacks");
  if (startYear <= 2008) events.push("Global Financial Crisis");
  if (startYear <= 2020) events.push("COVID-19 Pandemic");
  
  return events.join(", ");
};

const LifeMilestones: React.FC<LifeMilestonesProps> = ({ timeUnits, birthDate }) => {
  if (!timeUnits) return null;

  const milestones: Milestone[] = [
    {
      category: "Political",
      title: "Presidential Terms",
      value: calculatePresidentialTerms(birthDate),
      tooltip: "Number of U.S. presidential terms during your lifetime"
    },
    {
      category: "Sports",
      title: "Olympic Games",
      value: calculateOlympicGames(birthDate),
      tooltip: "Number of Olympic Games held during your lifetime"
    },
    {
      category: "Technology",
      title: "Tech Revolutions",
      value: calculateTechnologicalRevolutions(birthDate),
      tooltip: "Major technological revolutions witnessed (Personal Computing, Internet, Mobile, AI, Remote Work)"
    },
    {
      category: "History",
      title: "Historical Events",
      value: calculateHistoricalEvents(birthDate),
      tooltip: "Major historical events that occurred during your lifetime"
    },
    {
      category: "Space",
      title: "Space Missions",
      value: Math.floor(timeUnits.years / 2),
      tooltip: "Approximate number of major space missions launched during your lifetime"
    },
    {
      category: "Digital",
      title: "Digital Evolution",
      value: Math.floor(timeUnits.years / 5),
      tooltip: "Number of major digital platform generations (social media, smartphones, etc.)"
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-purple-400" size={24} />
        <h2 className="text-2xl font-semibold">Life Milestones</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.title}
            className="bg-white/5 rounded-lg p-6 text-center hover:bg-white/10 transition-colors"
          >
            <TitleWithTooltip title={milestone.title} tooltip={milestone.tooltip} />
            <p className="text-3xl font-bold text-purple-400 mt-3">
              {typeof milestone.value === 'number' ? milestone.value.toLocaleString() : milestone.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifeMilestones; 