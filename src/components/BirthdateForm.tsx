import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface BirthdateFormProps {
  onSubmit: (date: Date) => void;
}

const BirthdateForm: React.FC<BirthdateFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateTime = new Date(`${date}T${time || '00:00'}`);
    onSubmit(dateTime);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="text-purple-400" size={24} />
        <h2 className="text-2xl font-semibold">When were you born?</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">
            Time (optional)
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors"
        >
          Calculate My Life Bar
        </button>
      </form>
    </div>
  );
};

export default BirthdateForm;