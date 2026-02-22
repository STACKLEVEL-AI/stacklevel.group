'use client';

import { useEffect } from 'react';

export default function RootPage() {
  useEffect(() => {
    // Try to detect browser language, fall back to English
    const browserLang = navigator.language.split('-')[0];
    const preferredLocale = ['ru', 'en'].includes(browserLang) ? browserLang : 'en';
    window.location.replace(`/${preferredLocale}`);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'system-ui' }}>
      <p>Redirecting...</p>
    </div>
  );
}
