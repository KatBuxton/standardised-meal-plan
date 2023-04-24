import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

type Meal = {
  mealId: number;
  season: string;
  weekday: string;
  title: string;
  image: string;
  href: string;
};

export default function Card() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mealData, setMealData] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch('/data.json');
  //       if (response.ok) {
  //         const data = await response.json();
  //         setMealData(data);
  //         setIsLoading(false); // set loading state to false once data is loaded
  //       } else {
  //         console.error('Error retrieving data:', response.status);
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving data:', error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    const loadData = () => {
      fetch('/data.json')
        .then((response) => {
          switch (response.status) {
            case 200:
              return response.json();
            case 400:
              alert('Nenalezeno');
            case 500:
              alert('Server vratil chybu');
              break;
          }
        })
        .then((data) => {
          if (data) {
            setMealData(data);
          }
        });
    };

    loadData();
  }, []);

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

  if (isLoading) {
    return <div className="text-white">Loading...</div>; // render loading state while data is being fetched
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="group mx-auto mt-16 max-w-2xl gap-8 sm:mt-20 lg:mx-0 lg:max-w-none pr-6 pl-6">
          <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-96 sm:pt-48 lg:pt-96 ">
            <img
              src={mealData[currentIndex].image}
              alt=""
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 " />
            <div className="flex flex-wrap justify-center absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <p className="gap-y-1 text-sm leading-6 text-gray-300">
              {mealData[currentIndex].weekday}
            </p>
            <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
              <a href={mealData[currentIndex].href}>
                <span className="absolute inset-0" />
                {mealData[currentIndex].title}
              </a>
            </h3>
          </article>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] left-5 text-2xl text-white/30 cursor-pointer w-8 h-8">
            <ChevronLeftIcon onClick={prevSlide} />
          </div>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] right-5 text-2xl text-white/30 cursor-pointer w-8 h-8">
            <ChevronRightIcon onClick={nextSlide} />
          </div>
        </div>
      </div>
    </div>
  );
}
