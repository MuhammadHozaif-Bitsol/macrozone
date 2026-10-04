import ConfirmDialog from '@/components/ConfirmDialog';
import MealItem from '@/components/MealItem';
import { clearAllMeals, getMeals, Meal } from '@/storage/meals';
import { colors, globalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AllMealsScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const loadMeals = useCallback(() => {
    getMeals().then(setMeals);
  }, []);

  const handleClearAll = async () => {
    setConfirmVisible(false);
    await clearAllMeals();
    loadMeals();
  };

  useFocusEffect(loadMeals);

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={globalStyles.content}
    >
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>All Meals</Text>
        {meals.length > 0 && (
          <TouchableOpacity onPress={() => setConfirmVisible(true)}>
            <Text style={styles.clearButton}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginTop: 30 }}>
        {meals.length === 0 ? (
          <Text style={globalStyles.empty}>No meals logged yet.</Text>
        ) : (
          meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              onDelete={loadMeals}
            />
          ))
        )}
      </View>

      <ConfirmDialog
        visible={confirmVisible}
        title='Clear All Meals'
        message={`Delete all ${meals.length} meals? This can't be undone.`}
        confirmText='Delete All'
        onConfirm={handleClearAll}
        onCancel={() => setConfirmVisible(false)}
      />
    </ScrollView>
  );
}

const styles = {
  clearButton: {
    color: colors.alert,
    fontSize: 16,
  },
};
