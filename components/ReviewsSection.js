import { useTranslation } from 'next-i18next';
import { StarIcon } from '@heroicons/react/24/solid';

export default function ReviewsSection() {
  const { t } = useTranslation('translation');

  const reviews = [
    {
      id: 1,
      rating: 5,
      content: t('reviews.review1'),
      author: t('reviews.author1'),
      date: t('reviews.date1'),
    },
    {
      id: 2,
      rating: 5,
      content: t('reviews.review2'),
      author: t('reviews.author2'),
      date: t('reviews.date2'),
    },
    {
      id: 3,
      rating: 5,
      content: t('reviews.review3'),
      author: t('reviews.author3'),
      date: t('reviews.date3'),
    },
  ];

  return (
    <section id="reviews" className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t('reviews.title')}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400">
            {t('reviews.subtitle')}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-sm leading-6 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="relative isolate flex max-w-2xl flex-col gap-8 rounded-2xl bg-gray-50 dark:bg-gray-800 px-8 py-10"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <div className="flex items-center gap-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <time dateTime={review.date} className="text-gray-500 dark:text-gray-400">
                  {review.date}
                </time>
              </div>
              <div className="relative">
                <p className="mt-4 text-gray-600 dark:text-gray-300">{review.content}</p>
                <h3 className="mt-8 font-semibold text-gray-900 dark:text-white">
                  {review.author}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 