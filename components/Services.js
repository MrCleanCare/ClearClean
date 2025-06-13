import React from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const ServiceCard = ({ title, description, image, icon, onClick }) => {
  const { t } = useTranslation('translation');
  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700 flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/5 dark:bg-black/30 group-hover:bg-black/0 transition-colors duration-300"></div>
        <div className="absolute left-4 top-4 z-10 w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center text-3xl shadow-lg border border-primary-200 dark:border-primary-700 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          {icon}
        </div>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          style={{
            objectFit: 'cover',
            transform: 'scale(1.01)',
          }}
          className="group-hover:scale-110 transition-transform duration-500"
          priority={false}
        />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-transparent to-primary-50/20 dark:to-primary-900/20">
        <div>
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">{description}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <span className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
            {t('services.learnMore')}
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Services({ openModal }) {
  const { t } = useTranslation('translation');

  const services = [
    {
      title: t('services.residential'),
      description: t('services.residentialDesc'),
      image: '/images/residential.avif',
      icon: '🏠'
    },
    {
      title: t('services.commercial'),
      description: t('services.commercialDesc'),
      image: '/images/commercial.avif',
      icon: '🏢'
    },
    {
      title: t('services.deep'),
      description: t('services.deepDesc'),
      image: '/images/deep-cleaning.avif',
      icon: '✨'
    },
    {
      title: t('services.move'),
      description: t('services.moveDesc'),
      image: '/images/move-cleaning.avif',
      icon: '📦'
    },
    {
      title: t('services.tank'),
      description: t('services.tankDesc'),
      image: '/images/tank-cleaning.avif',
      icon: '🛢️'
    },
    {
      title: t('services.pest'),
      description: t('services.pestDesc'),
      image: '/images/pest-control.avif',
      icon: '🐜'
    },
    {
      title: t('services.steam'),
      description: t('services.steamDesc'),
      image: '/images/steam-cleaning.avif',
      icon: '🛋️'
    },
    {
      title: t('services.ac'),
      description: t('services.acDesc'),
      image: '/images/ac-cleaning.avif',
      icon: '❄️'
    },
    {
      title: t('services.marble'),
      description: t('services.marbleDesc'),
      image: '/images/marble-polishing.avif',
      icon: '🪞'
    },
  ];

  const handleServiceClick = (service) => {
    const content = (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
        <div className="relative w-full h-64 mb-4">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            style={{objectFit: 'cover'}}
            className="rounded-lg mb-4"
          />
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{service.description}</p>
      </div>
    );
    openModal(content, service.title);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-300">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} onClick={() => handleServiceClick(service)} />
          ))}
        </div>
      </div>
    </section>
  );
}
