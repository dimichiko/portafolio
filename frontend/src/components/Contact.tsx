import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactTranslation {
  title: string;
  subtitle: string;
  name: string;
  email: string;
  message: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  sendMessage: string;
  sending: string;
  successMessage: string;
  errorMessage: string;
  errors: {
    nameRequired: string;
    nameMinLength: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
    messageMinLength: string;
  };
}

interface Translations {
  [lang: string]: {
    contact: ContactTranslation;
  };
}

interface ContactProps {
  language: 'es' | 'en';
  translations: Translations;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC<ContactProps> = ({ language, translations }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const t = translations[language];

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Real-time validation
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return t.contact.errors?.nameRequired || 'Name is required';
        if (value.trim().length < 2) return t.contact.errors?.nameMinLength || 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return t.contact.errors?.emailRequired || 'Email is required';
        if (!emailRegex.test(value)) return t.contact.errors?.emailInvalid || 'Please enter a valid email';
        return undefined;
      case 'message':
        if (!value.trim()) return t.contact.errors?.messageRequired || 'Message is required';
        if (value.trim().length < 10) return t.contact.errors?.messageMinLength || 'Message must be at least 10 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  // Handle input changes with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Handle blur events
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.message.trim() &&
      emailRegex.test(formData.email) &&
      formData.name.trim().length >= 2 &&
      formData.message.trim().length >= 10 &&
      Object.keys(errors).length === 0
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({
        name: true,
        email: true,
        message: true
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Cambia aquí tu endpoint de Formspree:
      const response = await fetch('https://formspree.io/f/xxxxxxx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: t.contact.successMessage
        });
        setFormData({ name: '', email: '', message: '' });
        setTouched({});
        setErrors({});
        
        // Track analytics event
        const win = window as unknown as { gtag?: (...args: unknown[]) => void };
        if (typeof win.gtag === 'function') {
          win.gtag('event', 'form_submit', {
            event_category: 'contact',
            event_label: 'portfolio_contact_form'
          });
        }
      } else {
        throw new Error('Network response was not ok');
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: t.contact.errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear status after 5 seconds
  useEffect(() => {
    if (submitStatus.type) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus.type]);

  useEffect(() => {
    setErrors({});
    setTouched({});
  }, [language]);

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">{t.contact.title}</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-zinc-200 text-lg max-w-2xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-6"
        >
          {/* Name Field */}
          <div className="space-y-2">
            <label 
              htmlFor="name" 
              className="block text-base font-medium text-blue-300 leading-relaxed"
            >
              {t.contact.name} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`
                w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white 
                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent
                transition-all duration-150 ease-in-out
                ${errors.name 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-zinc-700 hover:border-zinc-600 focus:border-blue-500'
                }
              `}
              placeholder={t.contact.namePlaceholder}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  id="name-error"
                  role="alert"
                  className="text-red-400 text-sm flex items-center gap-2"
                >
                  <FaExclamationTriangle className="text-xs" />
                  {errors.name}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="block text-base font-medium text-blue-300 leading-relaxed"
            >
              {t.contact.email} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`
                w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white 
                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent
                transition-all duration-150 ease-in-out
                ${errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-zinc-700 hover:border-zinc-600 focus:border-blue-500'
                }
              `}
              placeholder={t.contact.emailPlaceholder}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  id="email-error"
                  role="alert"
                  className="text-red-400 text-sm flex items-center gap-2"
                >
                  <FaExclamationTriangle className="text-xs" />
                  {errors.email}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label 
              htmlFor="message" 
              className="block text-base font-medium text-blue-300 leading-relaxed"
            >
              {t.contact.message} *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              rows={5}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={`
                w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white resize-none
                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent
                transition-all duration-150 ease-in-out
                ${errors.message 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-zinc-700 hover:border-zinc-600 focus:border-blue-500'
                }
              `}
              placeholder={t.contact.messagePlaceholder}
            />
            <AnimatePresence>
              {errors.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  id="message-error"
                  role="alert"
                  className="text-red-400 text-sm flex items-center gap-2"
                >
                  <FaExclamationTriangle className="text-xs" />
                  {errors.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Status */}
          <AnimatePresence>
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`
                  p-4 rounded-lg flex items-center gap-3
                  ${submitStatus.type === 'success' 
                    ? 'bg-green-900/50 text-green-300 border border-green-700' 
                    : 'bg-red-900/50 text-red-300 border border-red-700'
                  }
                `}
                role="alert"
              >
                {submitStatus.type === 'success' ? (
                  <FaCheck className="text-green-400" />
                ) : (
                  <FaExclamationTriangle className="text-red-400" />
                )}
                {submitStatus.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !isFormValid()}
            whileHover={!isSubmitting && isFormValid() ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting && isFormValid() ? { scale: 0.98 } : {}}
            className={`
              w-full px-6 py-4 text-white font-medium rounded-lg shadow-lg 
              transition-all duration-300 flex items-center justify-center gap-3
              ${isSubmitting || !isFormValid()
                ? 'bg-zinc-600 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl hover:from-blue-700 hover:to-indigo-700'
              }
            `}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>{t.contact.sending}</span>
              </>
            ) : (
              <>
                <span>{t.contact.sendMessage}</span>
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact; 