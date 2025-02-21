import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

const FoodAnalysisApp = () => {
  const [tg, setTg] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

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

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePhotoCapture = async () => {
    if (!tg) return;
    
    try {
      // Запускаем нативную камеру Telegram
      const photo = await tg.showPopup({
        title: "Фото блюда",
        message: "Сделайте фото или выберите из галереи",
        buttons: [
          {text: "Камера", type: "default"},
          {text: "Галерея", type: "default"},
          {text: "Отмена", type: "cancel"}
        ]
      });

      // После получения фото отправляем его в бот
      if (photo) {
        tg.sendData(JSON.stringify({
          type: 'photo',
          photo: photo
        }));
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-center text-purple-600">Food Analyzer</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-md mx-auto space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Анализ блюда</CardTitle>
            </CardHeader>
            <CardContent>
              <button 
                onClick={handlePhotoCapture}
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors"
              >
                <Camera className="w-6 h-6" />
                <span>Сделать фото блюда</span>
              </button>
            </CardContent>
          </Card>

          {photoUrl && (
            <div className="mt-4">
              <img src={photoUrl} alt="Food" className="w-full rounded-lg" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FoodAnalysisApp;
