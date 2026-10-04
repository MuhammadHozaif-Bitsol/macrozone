import { getData, saveData } from '@/utils/storage';

const MEALS_KEY = 'meals';

export type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: string;
};

export type NewMeal = Omit<Meal, 'id' | 'createdAt'>;

export const getMeals = async (): Promise<Meal[]> => {
  const meals = await getData(MEALS_KEY);
  return Array.isArray(meals) ? meals : [];
};

export const addMeal = async (meal: NewMeal): Promise<Meal> => {
  const newMeal: Meal = {
    ...meal,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  const meals = await getMeals();
  await saveData(MEALS_KEY, [newMeal, ...meals]);
  return newMeal;
};

export const deleteMeal = async (id: string): Promise<void> => {
  const meals = await getMeals();
  const filtered = meals.filter((meal) => meal.id !== id);
  await saveData(MEALS_KEY, filtered);
};
