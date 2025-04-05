import React, { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log('LoadingAnimation mounted');
    const timer = setTimeout(() => {
      console.log('Timer completed');
      setIsVisible(false);
      // Small delay before calling onComplete to allow fade out
      setTimeout(() => {
        console.log('Calling onComplete');
        onComplete();
      }, 300);
    }, 3000);

    return () => {
      console.log('LoadingAnimation cleanup');
      clearTimeout(timer);
    };
  }, [onComplete]);

  if (!isVisible) {
    console.log('LoadingAnimation not visible');
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 z-50">
      <div className="relative">
        <div className="absolute inset-0">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-ping"></div>
        </div>
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center animate-pulse">
            <div className="text-4xl animate-bounce">❤️</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation; 