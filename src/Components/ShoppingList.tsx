import { useContext } from 'react';
import { MealDataContext } from '../MealDataContext';
import {CardProps} from "./Meal/Card";
interface ShoppingListProps extends CardProps {}

export default function ShoppingList({season}: ShoppingListProps) {
    const { mealData } = useContext(MealDataContext);

    if (!mealData) {
        return <div>Loading...</div>;
    }

    // Gather all unique ingredients from the current season's meals
    const ingredientsSet = new Set<string>();
    mealData.forEach((meal) => {
        if (meal.season === season) {
            Object.keys(meal.ingredients).forEach((key) => {
                if (key.startsWith('ing')) {
                    const ingredient = meal.ingredients[key].trim();
                    if (ingredient !== '') {
                        ingredientsSet.add(ingredient);
                    }
                }
            });
        }
    });
    const ingredientsList = Array.from(ingredientsSet);
    return (
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <fieldset>
            <legend className="sr-only">Shopping List</legend>
            <div className="space-y-5">
                {ingredientsList.map((ingredient, index) => (
                    <div key={index} className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id={`ingredient-${index}`}
                                name={`ingredient-${index}`}
                                aria-describedby="comments-description"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                            <label htmlFor={`ingredient-${index}`} className="font-medium text-gray-100">
                                {ingredient}
                            </label>{' '}
                            <span id="comments-description" className="text-gray-500">
              <span className="sr-only">{ingredient}</span>
            </span>
                        </div>
                    </div>
                ))}
            </div>
        </fieldset>
        </div>
    )
}
