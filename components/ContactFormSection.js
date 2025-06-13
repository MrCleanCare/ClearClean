import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ContactFormSection() {
  const { t } = useTranslation('translation');
  const [form, setForm] = useState({ name: '', email: '', mobile: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formMessage, setFormMessage] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const locale = router.locale || 'ar';

  useEffect(() => {
    setMounted(true);
  }, []);

  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1';
  const inputClass = 'w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm';
  const buttonClass = 'w-full bg-primary-600 hover:bg-primary-700 text-white text-lg font-bold py-3 rounded-lg shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400';
  const messageClass = 'mt-4 text-center font-semibold';
  const successClass = 'mb-4 text-green-600';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/contact', form);
      setSubmitted(true);
      setFormMessage({ type: 'success', text: t('contact.success') });
      setForm({ name: '', email: '', mobile: '', message: '' });
    } catch (error) {
      setFormMessage({ type: 'error', text: t('contact.error') });
    }
    setLoading(false);
  };

  if (!mounted) {
    return null; // Return null on server-side and first render
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('contact.title')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">{t('contact.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700"
                      placeholder={t('contact.namePlaceholder')}
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="mobile">
                      {t('contact.phone')}
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={form.mobile}
                      onChange={e => setForm({ ...form, mobile: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700"
                      placeholder={t('contact.phonePlaceholder')}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="message">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 resize-none"
                    placeholder={t('contact.messagePlaceholder')}
                  ></textarea>
                </div>

                {formMessage && (
                  <div className={`p-4 rounded-lg ${formMessage.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>
                    {formMessage.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || submitted}
                  className={`w-full py-3 px-6 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] ${
                    (loading || submitted) ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? t('contact.sending') : submitted ? t('contact.success') : t('contact.submit')}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition-all duration-300">
                <div className="space-y-8">
                  <div className="flex items-start space-x-6 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <i className="fas fa-map-marker-alt text-primary-600 dark:text-primary-400 text-2xl"></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('footer.addressLabel')}</h3>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=21.5652855,39.1422406"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {t('footer.address')}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <i className="fas fa-phone text-primary-600 dark:text-primary-400 text-2xl"></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('footer.phoneLabel')}</h3>
                      <div className="space-y-1">
                        <a href="tel:+966561062662" className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                          +966 56 106 2662
                        </a>
                        <a href="tel:+966501266260" className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                          +966 50 126 6260
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <i className="fas fa-envelope text-primary-600 dark:text-primary-400 text-2xl"></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('footer.emailLabel')}</h3>
                      <a href="mailto:info@masterclean-care.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                        info@masterclean-care.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <i className="fas fa-clock text-primary-600 dark:text-primary-400 text-2xl"></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('footer.hoursLabel')}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{t('footer.hours')}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.379796328514!2d39.1422406!3d21.5652855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDMzJzU1LjAiTiAzOcKwMDgnMzIuMSJF!5e0!3m2!1sen!2ssa!4v1622915847321!5m2!1sen!2ssa"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
