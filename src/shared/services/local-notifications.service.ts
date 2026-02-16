const DEFAULT_CHANNEL = "default";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { colors } from "../../styles/colors";

const NOTIFICATION_IDS = {
  CART_REMINDER: "cart-reminder",
  PURCHASE_FEEDBACK: "purchase-feedback",
} as const;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowBanner: true,
    shouldSetBadge: false,
    shouldShowList: true,
  }),
});

const setupNotificationChannel = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(DEFAULT_CHANNEL, {
      name: "Notificações do marketplace",
      importance: Notifications.AndroidImportance.HIGH,
      lightColor: colors["purple-base"],
      vibrationPattern: [0, 250, 250, 250],
    });
  }
};

const requestPermissions = async (): Promise<boolean> => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
};

interface IScheduleCartReminderProps {
  productName: string;
  productId: string;
  delayInMinutes: number;
}

const scheduleCartReminder = async ({
  delayInMinutes,
  productId,
  productName,
}: IScheduleCartReminderProps) => {
  const hasPermission = await requestPermissions();
  if (!hasPermission) return;

  const notification = await Notifications.scheduleNotificationAsync({
    identifier: NOTIFICATION_IDS.CART_REMINDER,
    content: {
      title: "Você esqueceu algo no carrinho!",
      body: `O produto "${productName}" ainda está esperando por você. Volte para finalizar sua compra!`,
      data: {
        type: "cart-reminder",
        productId,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: delayInMinutes * 60,
    },
  });

  return notification;
};

export const localNotificationsService = {
  scheduleCartReminder,
  requestPermissions,
  setupNotificationChannel,
};
