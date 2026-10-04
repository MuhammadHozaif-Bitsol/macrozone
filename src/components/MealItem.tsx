import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { deleteMeal } from '@/storage/meals';
import { colors } from '@/styles/global';
import ConfirmDialog from './ConfirmDialog';

type MealItemProps = Readonly<{
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  onDelete: () => void;
}>;

export default function MealItem({
  id,
  name,
  calories,
  protein,
  carbs,
  fat,
  onDelete,
}: MealItemProps) {
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleDelete = async () => {
    setConfirmVisible(false);
    await deleteMeal(id);
    onDelete();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => setConfirmVisible(true)}
    >
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.macros}>
        {calories} cal • {protein}g P • {carbs}g C • {fat}g F
      </Text>

      <ConfirmDialog
        visible={confirmVisible}
        title='Delete Meal'
        message={`Are you sure you want to delete "${name}"?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmVisible(false)}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  macros: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
