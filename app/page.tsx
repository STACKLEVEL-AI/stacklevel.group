'use client';

import { useEffect } from 'react';

export default function RootPage() {
  useEffect(() => {
    // Try to detect browser language, fall back to English
    const browserLang = navigator.language.split('-')[0];
    const preferredLocale = ['ru', 'en'].includes(browserLang) ? browserLang : 'en';
    // Include basePath in the redirect
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/stacklevel.group';
    window.location.replace(`${basePath}/${preferredLocale}`);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'system-ui' }}>
      <p>Redirecting...</p>
    </div>
  );
}
