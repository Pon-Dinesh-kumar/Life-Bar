import React from 'react';
import { format } from 'date-fns';

interface TimeUnit {
  name: string;
  value: number;
  description: string;
}

type FormatType = 'image' | 'pdf' | 'web';

interface LifePamphletProps {
  timeUnits: TimeUnit[];
  birthDate: Date;
  name: string;
  message?: string;
  mode: 'personal' | 'birthday';
  outputFormat: FormatType;
}

const LifePamphlet: React.FC<LifePamphletProps> = ({
  timeUnits,
  birthDate,
  name,
  message,
  mode,
  outputFormat
}) => {
  const getFormatStyles = () => {
    if (outputFormat === 'pdf') {
      return {
        container: 'bg-white text-gray-900 p-12',
        header: 'text-gray-900',
        subheader: 'text-gray-600',
        card: 'bg-gray-50 border border-gray-200',
        cardTitle: 'text-gray-900',
        cardValue: 'text-purple-600',
        cardDescription: 'text-gray-600',
        message: 'text-gray-700',
        footer: 'text-gray-500'
      };
    }
    return {
      container: 'bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-12',
      header: 'text-white',
      subheader: 'text-gray-300',
      card: 'bg-white/10 backdrop-blur-lg border border-white/20',
      cardTitle: 'text-white',
      cardValue: 'text-purple-300',
      cardDescription: 'text-gray-300',
      message: 'text-white',
      footer: 'text-gray-400'
    };
  };

  const styles = getFormatStyles();

  return (
    <div 
      className={`min-h-full w-full ${styles.container} relative`} 
      style={{
        background: outputFormat === 'pdf' 
          ? 'white'
          : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        minHeight: '100%',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem',
        color: outputFormat === 'pdf' ? '#111827' : 'white'
      }}
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: 0.05
        }}
      >
        <div 
          className="absolute inset-0" 
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      {/* Content */}
      <div 
        className="relative z-10"
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div 
          className="text-center mb-12"
          style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}
        >
          <div 
            className="flex items-center justify-center gap-4 mb-6"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}
          >
            <div 
              className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg"
              style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'white',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
              }}
            >
              LB
            </div>
            <h1 
              className={`text-4xl font-bold ${styles.header} drop-shadow-lg`}
              style={{
                fontSize: '2.25rem',
                fontWeight: 700,
                color: outputFormat === 'pdf' ? '#111827' : 'white',
                filter: 'drop-shadow(0 10px 15px -3px rgb(0 0 0 / 0.1))'
              }}
            >
              {mode === 'personal' ? 'Life Journey' : 'Birthday Wishes'}
            </h1>
          </div>
          <p 
            className={`text-xl ${styles.subheader} drop-shadow-md`}
            style={{
              fontSize: '1.25rem',
              color: outputFormat === 'pdf' ? '#4b5563' : '#d1d5db',
              filter: 'drop-shadow(0 4px 6px -1px rgb(0 0 0 / 0.1))'
            }}
          >
            {mode === 'personal' ? name : `For ${name}`}
          </p>
          <p 
            className={`text-sm mt-2 ${styles.subheader} drop-shadow-sm`}
            style={{
              fontSize: '0.875rem',
              marginTop: '0.5rem',
              color: outputFormat === 'pdf' ? '#4b5563' : '#d1d5db',
              filter: 'drop-shadow(0 1px 2px 0 rgb(0 0 0 / 0.05))'
            }}
          >
            Generated on {format(new Date(), 'MMMM d, yyyy')}
          </p>
        </div>

        {/* Main Content */}
        <div 
          className="grid grid-cols-2 gap-6 mb-12"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          {timeUnits.map((unit, index) => (
            <div
              key={unit.name}
              className={`${styles.card} rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-lg`}
              style={{
                background: outputFormat === 'pdf' 
                  ? '#f9fafb'
                  : 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                border: outputFormat === 'pdf'
                  ? '1px solid #e5e7eb'
                  : '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 300ms',
                transform: 'scale(1)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            >
              <div 
                className="flex items-center gap-4"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div 
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md"
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                >
                  {index + 1}
                </div>
                <h3 
                  className={`text-lg font-semibold ${styles.cardTitle} drop-shadow-sm`}
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: outputFormat === 'pdf' ? '#111827' : 'white',
                    filter: 'drop-shadow(0 1px 2px 0 rgb(0 0 0 / 0.05))'
                  }}
                >
                  {unit.name}
                </h3>
              </div>
              <div 
                className={`text-3xl font-bold mt-2 ${styles.cardValue} drop-shadow-md`}
                style={{
                  fontSize: '1.875rem',
                  fontWeight: 700,
                  marginTop: '0.5rem',
                  color: outputFormat === 'pdf' ? '#9333ea' : '#f0abfc',
                  filter: 'drop-shadow(0 4px 6px -1px rgb(0 0 0 / 0.1))'
                }}
              >
                {unit.value.toLocaleString()}
              </div>
              <p 
                className={`text-sm mt-1 ${styles.cardDescription} drop-shadow-sm`}
                style={{
                  fontSize: '0.875rem',
                  marginTop: '0.25rem',
                  color: outputFormat === 'pdf' ? '#4b5563' : '#d1d5db',
                  filter: 'drop-shadow(0 1px 2px 0 rgb(0 0 0 / 0.05))'
                }}
              >
                {unit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Birthday Message */}
        {mode === 'birthday' && message && (
          <div className="mb-12">
            <div className="relative">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  background: 'linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
                  borderRadius: '0.5rem'
                }}
              />
              <div 
                className="relative p-6 rounded-lg border border-white/20 backdrop-blur-lg"
                style={{
                  position: 'relative',
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(16px)'
                }}
              >
                <div 
                  className="flex items-center gap-2 mb-2"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>🎂</span>
                  <h3 
                    className={`text-xl font-semibold ${styles.cardTitle} drop-shadow-sm`}
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: outputFormat === 'pdf' ? '#111827' : 'white',
                      filter: 'drop-shadow(0 1px 2px 0 rgb(0 0 0 / 0.05))'
                    }}
                  >
                    Birthday Message
                  </h3>
                </div>
                <p 
                  className={`text-lg ${styles.message} drop-shadow-sm`}
                  style={{
                    fontSize: '1.125rem',
                    color: outputFormat === 'pdf' ? '#374151' : 'white',
                    filter: 'drop-shadow(0 1px 2px 0 rgb(0 0 0 / 0.05))'
                  }}
                >
                  {message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div 
          className={`text-center pt-8 border-t border-white/10 ${styles.footer}`}
          style={{
            textAlign: 'center',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: outputFormat === 'pdf' ? '#6b7280' : '#9ca3af'
          }}
        >
          <div 
            className="flex items-center justify-center gap-2 mb-2"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}
          >
            <div 
              className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-md"
              style={{
                width: '1.5rem',
                height: '1.5rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <span 
              className="font-semibold drop-shadow-sm"
              style={{
                fontWeight: 600,
                filter: 'drop-shadow(0 1px 2px 0 rgb(0 0 0 / 0.05))'
              }}
            >
              Life Bar
            </span>
          </div>
          <p 
            className="text-sm drop-shadow-sm"
            style={{
              fontSize: '0.875rem',
              filter: 'drop-shadow(0 1px 2px 0 rgb(0 0 0 / 0.05))'
            }}
          >
            Share your life's journey with the world
          </p>
          <p 
            className="text-xs mt-2 drop-shadow-sm"
            style={{
              fontSize: '0.75rem',
              marginTop: '0.5rem',
              filter: 'drop-shadow(0 1px 2px 0 rgb(0 0 0 / 0.05))'
            }}
          >
            © {new Date().getFullYear()} Life Bar. Made with ❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default LifePamphlet;