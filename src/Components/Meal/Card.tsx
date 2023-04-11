import React from 'react'

const meals =[
    {
        "mealId": "1",
        "season": "spring",
        "weekday": "monday",
        "title": "Wraps",
        "image": "src/Components/Meal/wraps.jpg",
        href: '#'
    },
    {
        "mealId": "2",
        "season": "spring",
        "weekday": "tuesday",
        "title": "Hummus",
        "image": "src/Components/Meal/wraps.jpg",
        href: '#'
    },
    {
        "mealId": "3",
        "season": "spring",
        "weekday": "wednesday",
        "title": "Tortilla de Patatas",
        "image": "src/Components/Meal/wraps.jpg",
        href: '#'
    },
    {
        "mealId": "4",
        "season": "spring",
        "weekday": "thursday",
        "title": "Red Lentil Fritters",
        "image": "src/Components/Meal/wraps.jpg",
        href: '#'
    },
    {
        "mealId": "5",
        "season": "spring",
        "weekday": "friday",
        "title": "Risotto",
        "image": "src/Components/Meal/wraps.jpg",
        href: '#'
    }
]

export default function Card() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {meals.map((meal) => (
                        <article
                            key={meal.mealId}
                            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                        >
                            <img src={meal.image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                                <time className="mr-8">
                                    {meal.weekday}
                                </time>

                            </div>
                            <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                                <a href={meal.href}>
                                    <span className="absolute inset-0" />
                                    {meal.title}
                                </a>
                            </h3>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
