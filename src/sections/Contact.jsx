import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiPhone, FiGithub, FiLinkedin, FiSend, FiCheckCircle } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { portfolioData } from '../data/portfolioData';

export function Contact() {
  const { email, phone, location, github, linkedin } = portfolioData.personalInfo;
  
  const formRef = useRef();
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Validate form fields
  const validateForm = () => {
    const tempErrors = {};
    if (!formState.name.trim()) tempErrors.name = 'Name is required';
    if (!formState.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formState.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formState.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters long';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(formRef.current);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        if (!response.ok && response.status !== 404) {
          throw new Error('Netlify form submission error');
        }

        // Send via EmailJS as well if keys are configured
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey) {
          emailjs.sendForm(serviceId, templateId, formRef.current, publicKey).catch((err) => {
            console.warn('EmailJS submission notice:', err);
          });
        }

        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
        console.error('Submission error:', error);
        setIsSubmitting(false);
        setSubmitStatus('error');
      });
  };

  return (
    <section id="contact" className="py-24 bg-surface/30 backdrop-blur-[2px] border-y border-border/50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 items-start text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-2">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-text">
            Contact Me
          </h2>
          <div className="w-12 h-[2px] bg-primary mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Social Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-text">
                Let's build something great together
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
                I'm available for full-time frontend roles. Whether you have a project in mind or just want to connect, feel free to reach out!
              </p>
            </div>

            {/* Direct Icons Panel */}
            <div className="space-y-5 font-mono text-xs">
              {/* Address */}
              <div className="flex items-center space-x-3.5 text-text-secondary">
                <div className="p-2.5 rounded-lg bg-card border border-border text-accent">
                  <FiMapPin className="w-4 h-4" />
                </div>
                <span>{location}</span>
              </div>

              {/* Email */}
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3.5 text-text-secondary hover:text-primary transition-colors duration-300 w-fit"
              >
                <div className="p-2.5 rounded-lg bg-card border border-border text-accent">
                  <FiMail className="w-4 h-4" />
                </div>
                <span>{email}</span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center space-x-3.5 text-text-secondary hover:text-primary transition-colors duration-300 w-fit"
              >
                <div className="p-2.5 rounded-lg bg-card border border-border text-accent">
                  <FiPhone className="w-4 h-4" />
                </div>
                <span>{phone}</span>
              </a>
            </div>

            {/* Social profiles */}
            <div className="flex items-center space-x-3.5">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-3 rounded-xl bg-card border border-border text-text hover:text-accent hover:border-accent transition-all duration-300"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3 rounded-xl bg-card border border-border text-text hover:text-accent hover:border-accent transition-all duration-300"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
              {submitStatus === 'success' ? (
                // Success state screen
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <FiCheckCircle className="w-16 h-16 text-success animate-bounce" />
                  <h4 className="font-display text-xl font-bold text-text">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-text-secondary max-w-xs">
                    Thank you for reaching out, Surya will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="px-5 py-2 rounded-xl bg-surface border border-border text-xs text-text hover:border-accent hover:text-accent font-mono transition-colors duration-300"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                // Form entry fields
                <form
                  ref={formRef}
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  {/* Hidden fields required for Netlify Forms */}
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" />

                  {/* Name field */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="form-name" className="text-xs font-mono font-medium text-text-secondary">
                      Full Name
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. John Doe"
                      className={`px-4 py-3 rounded-xl bg-surface border text-sm text-text placeholder-text-secondary/40 focus:outline-none transition-colors duration-300 ${
                        errors.name ? 'border-[#EF4444] focus:border-[#EF4444]' : 'border-border focus:border-primary'
                      }`}
                    />
                    {errors.name && <span className="text-[10px] font-mono text-[#EF4444]">{errors.name}</span>}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="form-email" className="text-xs font-mono font-medium text-text-secondary">
                      Email Address
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. john@example.com"
                      className={`px-4 py-3 rounded-xl bg-surface border text-sm text-text placeholder-text-secondary/40 focus:outline-none transition-colors duration-300 ${
                        errors.email ? 'border-[#EF4444] focus:border-[#EF4444]' : 'border-border focus:border-primary'
                      }`}
                    />
                    {errors.email && <span className="text-[10px] font-mono text-[#EF4444]">{errors.email}</span>}
                  </div>

                  {/* Subject field */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="form-subject" className="text-xs font-mono font-medium text-text-secondary">
                      Subject
                    </label>
                    <input
                      id="form-subject"
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Hiring inquiry / Project proposal"
                      className={`px-4 py-3 rounded-xl bg-surface border text-sm text-text placeholder-text-secondary/40 focus:outline-none transition-colors duration-300 ${
                        errors.subject ? 'border-[#EF4444] focus:border-[#EF4444]' : 'border-border focus:border-primary'
                      }`}
                    />
                    {errors.subject && <span className="text-[10px] font-mono text-[#EF4444]">{errors.subject}</span>}
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="form-message" className="text-xs font-mono font-medium text-text-secondary">
                      Message
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Write your message details here..."
                      className={`px-4 py-3 rounded-xl bg-surface border text-sm text-text placeholder-text-secondary/40 focus:outline-none transition-colors duration-300 resize-none ${
                        errors.message ? 'border-[#EF4444] focus:border-[#EF4444]' : 'border-border focus:border-primary'
                      }`}
                    />
                    {errors.message && <span className="text-[10px] font-mono text-[#EF4444]">{errors.message}</span>}
                  </div>

                  {/* Error response check banner */}
                  {submitStatus === 'error' && (
                    <div className="p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl text-[11px] font-mono text-[#EF4444] text-center">
                      Failed to send message. Please email directly at suryarajesh.tbm@gmail.com
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="clickable flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-primary text-[#FFFFFF] hover:bg-opacity-90 disabled:bg-primary/50 disabled:cursor-not-allowed font-display text-sm font-semibold tracking-wide transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        {/* Loading spinner */}
                        <svg className="animate-spin h-4.5 w-4.5 text-[#FFFFFF]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Sending message...</span>
                      </span>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
