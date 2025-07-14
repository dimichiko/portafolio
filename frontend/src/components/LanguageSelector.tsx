import React from 'react';

interface LanguageSelectorProps {
  currentLanguage: 'es' | 'en';
  onLanguageChange: (language: 'es' | 'en') => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <button
        onClick={() => onLanguageChange('es')}
        className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
          currentLanguage === 'es'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
        }`}
        aria-label="Cambiar a español"
      >
        ES
      </button>
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
          currentLanguage === 'en'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector; 