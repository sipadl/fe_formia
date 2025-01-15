// pages/404.js
import Link from 'next/link';
import { Button } from 'primereact/button'; // Example using PrimeReact for a styled button

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f8f9fa' }}>
      <h1 style={{ fontSize: '4rem', color: '#dc3545' }}>404</h1>
      <h2 style={{ fontSize: '2rem' }}>Oops! The page you're looking for doesn't exist.</h2>
      <p style={{ marginBottom: '30px' }}>
        It's possible the page has been moved, deleted, or never existed.
      </p>
      <Link href="/">
        <Button label="Go to Homepage" icon="pi pi-home" className="p-button-raised p-button-primary" />
      </Link>
    </div>
  );
}
