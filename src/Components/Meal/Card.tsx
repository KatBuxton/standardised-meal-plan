import React, { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

export default function Card() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const mealData = [
    {
      mealId: 1,
      season: 'spring',
      weekday: 'monday',
      title: 'Wraps',
      image: 'src/Components/Meal/wraps.jpg',
      href: '#',
    },
    {
      mealId: 2,
      season: 'spring',
      weekday: 'tuesday',
      title: 'Hummus',
      image: 'src/Components/Meal/wraps.jpg',
      href: '#',
    },
    {
      mealId: 3,
      season: 'spring',
      weekday: 'wednesday',
      title: 'Tortilla de Patatas',
      image: 'src/Components/Meal/wraps.jpg',
      href: '#',
    },
    {
      mealId: 4,
      season: 'spring',
      weekday: 'thursday',
      title: 'Red Lentil Fritters',
      image: 'src/Components/Meal/wraps.jpg',
      href: '#',
    },
    {
      mealId: 5,
      season: 'spring',
      weekday: 'friday',
      title: 'Risotto',
      image: 'src/Components/Meal/wraps.jpg',
      href: '#',
    },
  ];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? mealData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === mealData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="group mx-auto mt-16 max-w-2xl gap-8 sm:mt-20 lg:mx-0 lg:max-w-none pr-6 pl-6">
          <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
            <img
              src={mealData[currentIndex].image}
              alt=""
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
              <p className="mr-8">{mealData[currentIndex].weekday}</p>
            </div>
            <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
              <a href={mealData[currentIndex].href}>
                <span className="absolute inset-0" />
                {mealData[currentIndex].title}
              </a>
            </h3>
          </article>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer w-12 h-12">
            <ChevronLeftIcon onClick={prevSlide} />
          </div>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer w-12 h-12">
            <ChevronRightIcon onClick={prevSlide} />
          </div>
        </div>
      </div>
    </div>
  );
}
