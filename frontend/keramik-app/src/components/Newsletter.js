'use client';

import { useState } from 'react';
import Styles from '../css/components/Newsletter.module.css';
import Button from './Button';

export default function Newsletter({ content }) {
  // State til at håndtere formular-data og status
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  const title = content?.title?.trim();
  const subtitle = content?.subtitle?.trim();
  const placeholder = content?.placeholder?.trim();
  const buttonText = content?.button?.[0]?.title?.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Håndterer indsendelse af formularen
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stopper siden fra at reloade
    setStatus('loading');
    setMessage('');

    // frontend validering
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Indtast venligst en gyldig email (husk punktum, fx .dk, .com og @).');
      return;
    }
    try {
      // denne api route bliver oprettet af Next selv, når vi laver en fil i /app/api/newsletter/route.js
      // den poster tilmeldingsdata til vores backend (route.js)
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Tak! Vi har sendt en bekræftelse til din indbakke.');
        setEmail('');
      } else {
        setStatus('error');
        // Her kaster vi fejlen "Du er allerede tilmeldt!" ned til catch
        throw new Error(data.error || 'Noget gik galt. Prøv igen senere.');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Der opstod en teknisk fejl.');
    }
  };

  return (
    <section className={`container ${Styles.background}`}>
      <div className={Styles.newsletterTag} />
      <div>
        {title && <h2 className={Styles.newsletterTitle}>{title}</h2>}
        {subtitle && <p className={Styles.newsletterSubtitle}>{subtitle}</p>}
      </div>

      <form className={Styles.newsletterForm} onSubmit={handleSubmit}>
        <div className={Styles.field}>
          <input
            type="email"
            className={Styles.newsletterInput}
            placeholder={placeholder || 'Indtast din e-mail'}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
          />
          <div className={Styles.newsletterButton}>
            <Button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sender...' : buttonText || 'Tilmeld'}
            </Button>
          </div>
        </div>

        {/* Feedback besked til brugeren */}
        {message && (
          <p
            style={{
              marginTop: '10px',
              fontSize: '14px',
              color: status === 'error' ? '#ff4d4f' : '#28a745',
            }}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
