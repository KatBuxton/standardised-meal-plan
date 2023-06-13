import { createContext } from "react";


export interface Ingredient {
    id: number;
    title: string;
    ing1: string;
    ing2: string;
    ing3: string;
    ing4: string;
    ing5: string;
    ing6: string;
    ing7: string;
    ing8: string;
    ing9: string;
    ing10: string;
    ing11: string;
    ing12: string;
    ing13: string;
    ing14: string;
}

export interface Recipe {
    id: number;
    title: string;
    "step 1": string;
    "step 2": string;
    "step 3": string;
    "step 4": string;
    "step 5": string;
    "step 6": string;
}

export interface MealData {
    id: number;
    season: string;
    weekday: string;
    title: string;
    image: string;
    ingredients: Ingredient;
    recipe: Recipe;
}
interface MealDataContextType {
    mealData: MealData[] | undefined;
}

export const MealDataContext = createContext<MealDataContextType>({ mealData:[] });
