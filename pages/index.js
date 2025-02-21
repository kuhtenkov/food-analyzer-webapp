import React, { useState, useEffect } from 'react';
import { Camera, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

const FoodAnalysisApp = () => {
  const [activeTab, setActiveTab] = useState('analyze');
  const [userProfile, setUserProfile] = useState(null);
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(false);
  const [tg, setTg] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/telegram-web-app/6.1.0/telegram-web-app.js';
    script.async = true;
    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp;
        setTg(webApp);
        setIsTelegramWebApp(true);
        webApp.ready();
        webApp.expand();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-center text-purple-600">Food Analyzer</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-md mx-auto space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Анализ блюда</CardTitle>
            </CardHeader>
            <CardContent>
              <button 
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => tg?.showScanQRPopup()}
              >
                <Camera className="w-6 h-6" />
                <span>Сделать фото блюда</span>
              </button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FoodAnalysisApp;
