import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const ServiceCard = ({ title, description, image, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default function Services() {
  const { t } = useTranslation('translation');

  const services = [
    {
      title: t('services.residential'),
      description: t('services.residentialDesc'),
      image: '/images/residential.jpg',
      icon: '🏠'
    },
    {
      title: t('services.commercial'),
      description: t('services.commercialDesc'),
      image: '/images/commercial.jpg',
      icon: '🏢'
    },
    {
      title: t('services.deep'),
      description: t('services.deepDesc'),
      image: '/images/deep-cleaning.jpg',
      icon: '✨'
    },
    {
      title: t('services.move'),
      description: t('services.moveDesc'),
      image: '/images/move-cleaning.jpg',
      icon: '📦'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('services.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
} 