import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import {MealDataContext} from "../MealDataContext";

export const RecipeDetail = () => {
    const { mealData } = useContext(MealDataContext);
    const { mealId } = useParams();
    const selectedMeal = parseInt(mealId);

    if (!mealData) {
        return <div>Loading...</div>;
    }
    console.log(mealId)

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                {mealData
                    .filter((meal) => meal.id === selectedMeal)
                    .map((recipe) => (
                        <>
                        <div className="lg:max-w-lg lg:self-end">
                        <div key={recipe.id} className="mt-4">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">{recipe.title}</h1>
                            <section aria-labelledby="information-heading" className="mt-4">
                                <h2 id="information-heading" className="sr-only">
                                    Product information
                                </h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-base text-gray-500">Ingredients</p>
                                </div>

                                <div className="mt-6 flex items-center">
                                    <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
                                </div>
                            </section>
                        </div>
                </div>
                    <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                    <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover object-center" />
                    </div>
                    </div>
                        </>
                ))}
        </div>
    );
};
