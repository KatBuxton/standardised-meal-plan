import { createContext } from "react";

export interface MealData {
    id: number;
    season: string;
    weekday: string;
    title: string;
    image: string;
    href: string;
}

interface MealDataContextType {
    mealData: MealData[] | undefined;
}

export const MealDataContext = createContext<MealDataContextType>({ mealData:[] });
