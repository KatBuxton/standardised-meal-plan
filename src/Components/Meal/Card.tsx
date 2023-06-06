import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {MealDataContext} from "../../MealDataContext";

export default function Card() {
    const {mealData} = useContext(MealDataContext);
    console.log(mealData);

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-100 text-center">Spring</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {mealData.map((meal) => (
                    <div key={meal.id} className="group relative">
                        <div className="mb-2 flex flex-col text-center">
                        <p className="text-sm text-gray-500">{meal.weekday}</p>
                           <h3 className="text-sm text-gray-200">
                                    <Link to={`/${meal.id}`}>
                                        <span aria-hidden="true" className="absolute inset-0"/>
                                        {meal.title}
                                    </Link>
                           </h3>
                        </div>
                        <div
                            className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-80">
                            <img
                                src={meal.image}
                                alt={meal.title}
                                className="h-full w-full object-cover object-bottom
  lg:h-full lg:w-full"
                            />
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
