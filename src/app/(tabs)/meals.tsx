import { globalStyles } from '@/styles/global';
import { Text, ScrollView } from 'react-native';

export default function MealsScreen() {
  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={globalStyles.content}
    >
      <Text style={globalStyles.title}>All Meals</Text>
    </ScrollView>
  );
}
