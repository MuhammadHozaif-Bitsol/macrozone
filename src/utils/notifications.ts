import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const requestPermissions = async (): Promise<boolean> => {
  // Android 13+ only shows the permission prompt once a channel exists
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Meal reminders',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

export const scheduleMealReminders = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'MacroZone',
      body: "Don't forget to log your lunch!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 12,
      minute: 0,
    },
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'MacroZone',
      body: 'Time to log your dinner!',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 18,
      minute: 0,
    },
  });
};

export const cancelMealReminders = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
