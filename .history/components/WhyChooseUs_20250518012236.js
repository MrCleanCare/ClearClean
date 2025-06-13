import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const Feature = ({ icon, title, description }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default function WhyChooseUs() {
  const { t } = useTranslation('translation');

  const features = [
    {
      icon: '🌟',
      title: t('whyUs.quality'),
      description: t('whyUs.qualityDesc')
    },
    {
      icon: '👥',
      title: t('whyUs.professional'),
      description: t('whyUs.professionalDesc')
    },
    {
      icon: '🌿',
      title: t('whyUs.eco'),
      description: t('whyUs.ecoDesc')
    },
    {
      icon: '💯',
      title: t('whyUs.satisfaction'),
      description: t('whyUs.satisfactionDesc')
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/images/why-choose-us.jpg"
              alt="Professional cleaning team"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('whyUs.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('whyUs.subtitle')}
            </p>
            <div className="space-y-8">
              {features.map((feature, index) => (
                <Feature key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 