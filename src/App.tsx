import React, { useState, useEffect, useCallback } from 'react';
import { Share2, History } from 'lucide-react';
import BirthdateForm from './components/BirthdateForm';
import LifeProgress from './components/LifeProgress';
import TimeComparisons from './components/TimeComparisons';
import LifeStats from './components/LifeStats';
import LifePamphlet from './components/LifePamphlet';
import LifeMilestones from './components/LifeMilestones';
import LoadingAnimation from './components/LoadingAnimation';
import ShareModal from './components/ShareModal';
import { calculateTimeUnits } from './utils/timeCalculations';

interface TimeUnits {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    months: number;
    years: number;
  };
}

const App: React.FC = () => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [timeUnits, setTimeUnits] = useState<any>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    console.log('App useEffect - birthDate changed:', birthDate);
    if (birthDate) {
      // Initial calculation
      const units = calculateTimeUnits(birthDate);
      setTimeUnits(units);

      // Update every second
      const interval = setInterval(() => {
        const units = calculateTimeUnits(birthDate);
        setTimeUnits(units);
      }, 1000);
      
      return () => {
        console.log('Cleaning up interval');
        clearInterval(interval);
      };
    } else {
      console.log('Resetting states');
      setTimeUnits(null);
      setIsLoading(false);
      setShowContent(false);
    }
  }, [birthDate]);

  const handleLoadingComplete = useCallback(() => {
    console.log('handleLoadingComplete called');
    setIsLoading(false);
    setShowContent(true);
  }, []);

  const handleReset = () => {
    console.log('handleReset called');
    setShowContent(false);
    setBirthDate(null);
    setIsLoading(false);
  };

  console.log('App render - isLoading:', isLoading, 'showContent:', showContent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      {isLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      <header className="py-8 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Life Bar
        </h1>
        <p className="text-lg text-gray-300">Visualize your life's journey in a unique way</p>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {!birthDate ? (
          <div className="max-w-md mx-auto">
            <BirthdateForm onSubmit={(date) => {
              console.log('BirthdateForm submitted:', date);
              setBirthDate(date);
              setIsLoading(true);
              setShowContent(false);
            }} />
          </div>
        ) : (
          <div className={`space-y-12 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            <LifeProgress timeUnits={timeUnits} />
            <TimeComparisons timeUnits={timeUnits} />
            <LifeStats timeUnits={timeUnits} />
            <LifeMilestones timeUnits={timeUnits} birthDate={birthDate} />
            
            <div className="flex justify-center gap-4 pt-8">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <History size={20} />
                Reset
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors"
              >
                <Share2 size={20} />
                Share
              </button>
            </div>
          </div>
        )}
      </main>

      {showShareModal && birthDate && timeUnits && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          timeUnits={timeUnits}
          birthDate={birthDate}
        />
      )}

      <footer className="text-center py-6 text-gray-400">
        <p>© 2025 Life Bar. Made with ❤️ by Dinesh</p>
      </footer>
    </div>
  );
}

export default App;