import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

const FoodAnalysisApp = () => {
  const [tg, setTg] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;
    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp;
        setTg(webApp);
        webApp.ready();
        webApp.expand();
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleTakePhoto = async () => {
    if (!tg) return;

    // Используем Telegram API для отправки фото напрямую в бот
    tg.sendData(JSON.stringify({
      action: 'requestPhoto'
    }));

    // Закрываем WebApp, так как фото будет обрабатываться в боте
    tg.close();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-center text-purple-600">Food Analyzer</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Анализ блюда</h2>
            <button 
              onClick={handleTakePhoto}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors"
            >
              <Camera className="w-6 h-6" />
              <span>Сделать фото блюда</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FoodAnalysisApp;
