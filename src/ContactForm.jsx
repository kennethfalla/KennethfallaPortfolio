import React, { useState } from 'react';
import { email } from './portfolio.js';

export default function ContactForm() {
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const draft = `Reply to: ${sender.trim()}\n\n${message.trim()}`;

  const submit = (event) => {
    event.preventDefault();
    if (!message.trim()) {
      event.currentTarget.elements.message.setCustomValidity('Please enter your message.');
      event.currentTarget.reportValidity();
      return;
    }
    window.location.href = `mailto:${email}?subject=${encodeURIComponent('Portfolio inquiry')}&body=${encodeURIComponent(draft)}`;
    setStatus('Your email app will open with your message. Press Send there to deliver it.');
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(`To: ${email}\n${draft}`);
      setStatus('Message copied. Paste it into an email to Kenneth.');
    } catch {
      setStatus('Copy is unavailable here. Select your message and copy it manually.');
    }
  };

  return (
    <div className="contact-layout">
      <div className="contact-intro">
        <p>Have a project in mind?<br />Leave your email and tell me about it.</p>
        <p className="eyebrow">Nueva Ecija, Philippines</p>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <label htmlFor="contact-email">Your email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" value={sender} onChange={(event) => setSender(event.target.value)} />
        <label htmlFor="contact-message">Your message</label>
        <textarea id="contact-message" name="message" rows={5} required maxLength={3000} placeholder="Tell me about your project..." value={message} onChange={(event) => {
          event.target.setCustomValidity('');
          setMessage(event.target.value);
        }} />
        <p className="contact-help">Continue in your email app to send your message.</p>
        <div className="contact-buttons">
          <button className="outline-link contact-submit" type="submit">Open email draft <span aria-hidden="true">&#8599;</span></button>
          <button className="copy-message" type="button" onClick={copyMessage} disabled={!message.trim()}>Copy message</button>
        </div>
        <p className="contact-status" role="status">{status}</p>
      </form>
    </div>
  );
}
