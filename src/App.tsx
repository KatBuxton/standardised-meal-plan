import "./App.css";
import Card from "./Components/Meal/Card";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecipeDetail } from "./Components/RecipeDetail";
import { PageLayout } from "./Components/PageLayout";
import { MealData, MealDataContext } from "./MealDataContext";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

async function fetchMealData() {
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

    const combinedData = data.map((meal) => ({
        ...meal,
        ingredients: ingredients.find((ingredient) => ingredient.id === meal.id),
        recipe: recipes.find((recipe) => recipe.id === meal.id),
    }));

    return combinedData;
}

function App() {
    const { isLoading, data: mealData } = useQuery<MealData[]>(
        "mealData",
        fetchMealData
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <MealDataContext.Provider value={{ mealData }}>
                <PageLayout>
                    <Routes>
                        <Route path="/" element={<Card />} />
                        <Route path="/:mealId" element={<RecipeDetail />} />
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
