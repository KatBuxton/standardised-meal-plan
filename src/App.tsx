import "./App.css";
import Card from "./Components/Meal/Card";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecipeDetail } from "./Components/RecipeDetail";
import { PageLayout } from "./Components/PageLayout";
import {Ingredient, Recipe, MealData, MealDataContext} from "./MealDataContext";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Menu from "./Components/Menu";
import React, {useEffect, useState} from "react";
import ShoppingList from "./Components/ShoppingList";

async function fetchMealData(): Promise<MealData[]> {
    const [dataResponse, ingredientsResponse, recipesResponse] = await Promise.all([
        fetch("https://katbuxton.github.io/standardised-meal-plan-data/data.json"),
        fetch("https://katbuxton.github.io/standardised-meal-plan-data/ingredients.json"),
        fetch("https://katbuxton.github.io/standardised-meal-plan-data/recipes.json"),
    ]);
    const [data, ingredients, recipes] = await Promise.all([
        dataResponse.json(),
        ingredientsResponse.json(),
        recipesResponse.json(),
    ]);

    const combinedData = data.map((meal: MealData) => ({
        ...meal,
        ingredients: ingredients.find((ingredient: Ingredient) => ingredient.id === meal.id),
        recipe: recipes.find((recipe: Recipe) => recipe.id === meal.id),
    }));

    return combinedData;
}

function getCurrentSeason(): string {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based

    if (currentMonth >= 3 && currentMonth <= 5) {
        return "spring";
    } else if (currentMonth >= 6 && currentMonth <= 8) {
        return "summer";
    } else if (currentMonth >= 9 && currentMonth <= 11) {
        return "autumn";
    } else {
        return "winter";
    }
}
function App() {
    const [season, setSeason] = useState<string>(getCurrentSeason())
    const { isLoading, data: mealData } = useQuery<MealData[]>(
        "mealData",
        fetchMealData
    );

    useEffect(() => {
        const currentSeason = getCurrentSeason();
        setSeason(currentSeason);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <MealDataContext.Provider value={{mealData}}>
                <PageLayout>
                    <Menu setSeason={setSeason}/>
                    <Routes>
                        <Route path="/" element={<Card season={season}/>} />
                        <Route path="/:mealId" element={<RecipeDetail />} />
                        <Route path="/shopping-list" element={<ShoppingList season={season} />} />
                    </Routes>
                </PageLayout>
            </MealDataContext.Provider>
        </BrowserRouter>
    );
}

const queryClient = new QueryClient();

function WrappedApp() {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );
}

export default WrappedApp;
