// pages/404.js
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    // Operasi yang mengakses DOM hanya dijalankan di sisi klien
    if (typeof document !== 'undefined') {
      console.log('Halaman 404 dimuat di klien!');
    }
  }, []);

  return <div>404 - Page Not Found</div>;
}
