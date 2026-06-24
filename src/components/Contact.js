import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1400);
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact-inner">
          <div className="contact-info">
            <p className="section-label">&#47;&#47; get in touch</p>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Let's Build Something<br />
              <span style={{ color: 'var(--accent)' }}>Great Together.</span>
            </h2>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: '0 0 2.5rem' }}>
              Got a project, an idea, or just a question? We'd love to hear from you.
              Tell us what you're building and we'll take it from there.
            </p>
            <div className="contact-details">
              <div className="contact-detail">
                <span className="detail-icon">📧</span>
                <div>
                  <p className="detail-label">Email</p>
                  <a href="mailto:Ewan@devinity.co.za" className="detail-value">Ewan@devinity.co.za</a>
                </div>
              </div>
              <div className="contact-detail">
                <span className="detail-icon">🌍</span>
                <div>
                  <p className="detail-label">Location</p>
                  <p className="detail-value">South Africa (Remote-first)</p>
                </div>
              </div>
              <div className="contact-detail">
                <span className="detail-icon">⏱️</span>
                <div>
                  <p className="detail-label">Response Time</p>
                  <p className="detail-value">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {status === 'sent' ? (
              <div className="form-success">
                <span className="success-icon">✓</span>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Tell us about your project</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="What are you building? What's your timeline and budget?"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary form-submit ${status === 'sending' ? 'sending' : ''}`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
