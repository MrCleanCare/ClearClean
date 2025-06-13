import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const Feature = ({ icon, title, description }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-14 h-14 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center text-3xl shadow-md border border-primary-200 dark:border-primary-800">
        {icon}
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-bold mb-1 text-primary-700 dark:text-primary-200">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-base">{description}</p>
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
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
            <Image
              src="/images/why-choose-us.avif"
              alt="Professional cleaning team"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              style={{objectFit: 'cover'}}
              priority={false}
            />
            <div className="absolute inset-0 bg-primary-800/20 dark:bg-primary-900/40" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-primary-700 dark:text-primary-200 drop-shadow">{t('whyUs.title')}</h2>
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