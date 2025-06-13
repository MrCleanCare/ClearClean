import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function FAQSection() {
  const { t } = useTranslation('translation');
  const router = useRouter();
  const locale = router.locale || 'ar';
  const faqs = [
    {
      question: locale === 'ar' ? 'ما هي خدمات التنظيف التي تقدمونها؟' : 'What cleaning services do you offer?',
      answer: locale === 'ar' ? 'نقدم خدمات تنظيف المنازل، المكاتب، التنظيف العميق، تنظيف الانتقال، والمزيد.' : 'We offer house cleaning, office cleaning, deep cleaning, move-in/move-out cleaning, and more.'
    },
    {
      question: locale === 'ar' ? 'هل تستخدمون منتجات صديقة للبيئة؟' : 'Do you use eco-friendly products?',
      answer: locale === 'ar' ? 'نعم، نستخدم منتجات تنظيف آمنة وصديقة للبيئة.' : 'Yes, we use safe and eco-friendly cleaning products.'
    },
    {
      question: locale === 'ar' ? 'كيف يمكنني الحجز؟' : 'How can I book a service?',
      answer: locale === 'ar' ? 'يمكنك الحجز عبر الموقع أو الاتصال بنا مباشرة.' : 'You can book through the website or contact us directly.'
    },
    {
      question: locale === 'ar' ? 'ما هي ساعات العمل؟' : 'What are your business hours?',
      answer: locale === 'ar' ? 'نعمل من 8 صباحًا حتى 5 مساءً من الأحد إلى الخميس والسبت.' : 'We operate from 8 AM to 5 PM, Sunday to Thursday and Saturday.'
    }
  ];
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-primary-700 dark:text-primary-200 drop-shadow">{locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</h2>
        <div className="space-y-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2 text-primary-700 dark:text-primary-200">{faq.question}</h3>
              <p className="text-gray-700 dark:text-gray-200 text-base">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 