import { useState, useEffect } from 'react';

export const useSettings = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('clawmatrix_settings');
    return saved ? JSON.parse(saved) : {
      enhancedSecurity: true,
      performanceMode: true,
      autoSync: true,
      crisisMode: false
    };
  });

  useEffect(() => {
    localStorage.setItem('clawmatrix_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return [settings, updateSetting];
};
