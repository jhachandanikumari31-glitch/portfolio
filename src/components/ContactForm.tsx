'use client';

import { FormEvent, useState } from 'react';
import { SITE } from '@/lib/site';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');
    const subject = encodeURIComponent(`Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setStatus('sent');
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" name="name" required autoComplete="name" />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required autoComplete="email" />
      </div>
      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Tell us about your project or workshop needs…"
        />
      </div>
      <button type="submit" className="button primary">
        Send message
      </button>
      <p className="form-note">
        {status === 'sent'
          ? 'Your email app should open with the message ready to send.'
          : 'Opens your email app with the details filled in.'}
      </p>
    </form>
  );
}
