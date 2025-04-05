import React, { useState } from 'react';
import { X, Gift, User, Image, FileText, MessageCircle, Link } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ShareModalProps {
  onClose: () => void;
  timeUnits: any;
  birthDate: Date;
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose, timeUnits, birthDate }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'birthday'>('personal');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const generateContent = (format: 'image' | 'pdf' = 'image') => {
    const container = document.createElement('div');
    container.style.width = format === 'pdf' ? '210mm' : '1200px';
    container.style.height = format === 'pdf' ? '297mm' : '800px';
    container.style.padding = '3rem';
    container.style.background = format === 'pdf' ? 'white' : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
    container.style.color = format === 'pdf' ? '#111827' : 'white';
    container.style.fontFamily = 'Inter, sans-serif';
    container.style.boxSizing = 'border-box';

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 0.5rem;">
          ${activeTab === 'personal' ? 'My Life Journey' : 'Happy Birthday'}
        </h1>
        <p style="font-size: 1.25rem;">${name}</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
        ${Object.entries(timeUnits).map(([unit, value]) => `
          <div style="
            background: ${format === 'pdf' ? '#f3f4f6' : 'rgba(255, 255, 255, 0.1)'};
            border: 1px solid ${format === 'pdf' ? '#e5e7eb' : 'rgba(255, 255, 255, 0.2)'};
            border-radius: 1rem;
            padding: 1.5rem;
            margin-bottom: 1rem;
          ">
            <h3 style="
              color: ${format === 'pdf' ? '#111827' : 'white'};
              font-size: 1.5rem;
              font-weight: 600;
              margin: 0 0 0.5rem 0;
            ">${unit}</h3>
            <p style="
              color: ${format === 'pdf' ? '#4b5563' : '#e5e7eb'};
              margin: 0;
            ">${value}</p>
          </div>
        `).join('')}
      </div>

      ${activeTab === 'birthday' && message ? `
        <div style="
          background: ${format === 'pdf' ? '#f3f4f6' : 'rgba(255, 255, 255, 0.1)'};
          border: 1px solid ${format === 'pdf' ? '#e5e7eb' : 'rgba(255, 255, 255, 0.2)'};
          border-radius: 1rem;
          padding: 1.5rem;
          margin: 2rem 0;
        ">
          <p style="
            color: ${format === 'pdf' ? '#111827' : 'white'};
            font-size: 1.25rem;
            line-height: 1.6;
            margin: 0;
          ">${message}</p>
        </div>
      ` : ''}

      <div style="margin-top: 2rem; text-align: center; font-size: 0.875rem;">
        <p>Generated on ${new Date().toLocaleDateString()}</p>
      </div>
    `;

    return container;
  };

  const handleDownloadImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const container = generateContent('image');
      document.body.appendChild(container);
      
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null
      });

      const link = document.createElement('a');
      link.download = activeTab === 'personal'
        ? `my-life-journey-${name.toLowerCase().replace(/\s+/g, '-')}.png`
        : `birthday-wish-${name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
      setError('Failed to download image. Please try again.');
    } finally {
      setIsGenerating(false);
      const container = document.querySelector('div[style*="width: 1200px"]');
      if (container) container.remove();
    }
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const container = generateContent('pdf');
      document.body.appendChild(container);
      
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      pdf.save(activeTab === 'personal'
        ? `my-life-journey-${name.toLowerCase().replace(/\s+/g, '-')}.pdf`
        : `birthday-wish-${name.toLowerCase().replace(/\s+/g, '-')}.pdf`
      );
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setError('Failed to download PDF. Please try again.');
    } finally {
      setIsGenerating(false);
      const container = document.querySelector('div[style*="width: 210mm"]');
      if (container) container.remove();
    }
  };
  
  const handleShareWhatsApp = () => {
    const text = activeTab === 'personal'
      ? `Check out my life journey! ${name}'s Life Bar`
      : `Happy Birthday ${name}! Here's your special Life Bar birthday card!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyLink = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const container = generateContent('image');
      document.body.appendChild(container);
      
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null
      });

      const imageUrl = canvas.toDataURL('image/png');
      const shareUrl = `${window.location.origin}?data=${encodeURIComponent(JSON.stringify({
        timeUnits,
        birthDate,
        name,
        message,
        mode: activeTab
      }))}`;
      
      await navigator.clipboard.writeText(shareUrl);
      setShareUrl(shareUrl);
    } catch (error) {
      console.error('Error copying link:', error);
      setError('Failed to copy link. Please try again.');
    } finally {
      setIsGenerating(false);
      const container = document.querySelector('div[style*="width: 1200px"]');
      if (container) container.remove();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 group"
        >
          <X size={20} className="text-white group-hover:rotate-90 transition-transform duration-200" />
        </button>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'personal'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-800/50 text-gray-300 hover:bg-purple-800'
            }`}
          >
            <User size={20} />
            Personal
          </button>
          <button
            onClick={() => setActiveTab('birthday')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'birthday'
                ? 'bg-pink-600 text-white'
                : 'bg-pink-800/50 text-gray-300 hover:bg-pink-800'
            }`}
          >
            <Gift size={20} />
            Birthday
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {activeTab === 'personal' ? 'Your Name' : "Friend's Name"}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={activeTab === 'personal' ? 'Enter your name' : "Enter friend's name"}
            />
          </div>

          {activeTab === 'birthday' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Birthday Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Write a birthday message..."
                rows={3}
              />
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {shareUrl && (
            <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
              Link copied to clipboard!
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownloadImage}
              disabled={!name || (activeTab === 'birthday' && !message) || isGenerating}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image size={20} />
              {isGenerating ? 'Generating...' : 'Image'}
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={!name || (activeTab === 'birthday' && !message) || isGenerating}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText size={20} />
              {isGenerating ? 'Generating...' : 'PDF'}
            </button>
            <button
              onClick={handleShareWhatsApp}
              disabled={!name || (activeTab === 'birthday' && !message) || isGenerating}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageCircle size={20} />
              {isGenerating ? 'Generating...' : 'WhatsApp'}
            </button>
            <button
              onClick={handleCopyLink}
              disabled={!name || (activeTab === 'birthday' && !message) || isGenerating}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Link size={20} />
              {isGenerating ? 'Generating...' : 'Link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal; 