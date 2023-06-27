import React, {useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import {MealDataContext} from "../MealDataContext";

export const RecipeDetail = () => {
    const {mealData} = useContext(MealDataContext);
    const {mealId} = useParams<{ mealId: string }>();
    const selectedMeal = parseInt(mealId!);

    if (!mealData) {
        return <div>Loading...</div>;
    }
    console.log(mealId, selectedMeal)
    console.log(mealData)

    return (
        <>
        {mealData
            .filter((mealItem) => parseInt(String(mealItem.id)) === selectedMeal)
                .map((meal) => (
        <div key={meal.id}
             className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">

                        <div className="lg:max-w-lg lg:self-end">

                            <Link className=" text-sm text-gray-200 hover:text-sky-500" to="/" >
                                Back to all meals
                            </Link>
                            <div className="mt-4">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">{meal.title}</h1>
                            </div>

                                <section aria-labelledby="recipe-heading" className="mt-4">
                                    <h2 id="recipe-heading" className="sr-only">
                                        Recipe description
                                    </h2>

                                    <div className="mt-4 space-y-6">
                                        <p className="text-base text-gray-200">Ingredients</p>
                                        <ul className="ml-6 list-disc text-sm text-gray-200">
                                            {Object.entries(meal.ingredients).map(([key, value]) => {
                                                if (key.startsWith("ing") && value !== "") {
                                                    const itemKey = meal.id + key;
                                                    return <li key={itemKey}>{value}</li>;
                                                }
                                                return null;
                                            })}
                                        </ul>
                                    </div>
                                    <div className="mt-4 space-y-6">
                                        <p className="text-base text-gray-200">Method</p>
                                        <ol className="ml-6 list-decimal text-sm text-gray-200">
                                            {Object.entries(meal.recipe).map(([key, value]) => {
                                                if (key.startsWith("step") && value !== "") {
                                                    const itemKey = meal.id + key;
                                                    return <li key={itemKey}>{value}</li>;
                                                }
                                                return null;
                                            })}
                                        </ol>
                                    </div>
                                </section>
                        </div>
                        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                                <img src={meal.image} alt={meal.title}
                                     className="h-full w-full object-cover object-center"/>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
};
