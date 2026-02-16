const DEFAULT_CHANNEL = "default";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { colors } from "../../styles/colors";

const NOTIFICATION_IDS = {
  CART_REMINDER: "cart-reminder",
  PURCHASE_FEEDBACK: "purchase-feedback",
} as const;

const DEEP_LINK = "marketplace://";

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

interface IScheduleProductProps {
  productName: string;
  productId: string;
  delayInMinutes: number;
}

const scheduleCartReminder = async ({
  delayInMinutes,
  productId,
  productName,
}: IScheduleProductProps) => {
  const hasPermission = await requestPermissions();
  if (!hasPermission) return;

  await Notifications.scheduleNotificationAsync({
    identifier: NOTIFICATION_IDS.CART_REMINDER,
    content: {
      title: "Você esqueceu algo no carrinho!",
      body: `O produto "${productName}" ainda está esperando por você. Volte para finalizar sua compra!`,
      data: {
        type: "cart-reminder",
        productId,
        deepLink: `${DEEP_LINK}cart`,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    },
  });
};

const scheduleFeedbackNotification = async ({
  delayInMinutes,
  productId,
  productName,
}: IScheduleProductProps) => {
  const hasPermission = await requestPermissions();
  if (!hasPermission) return;

  await Notifications.scheduleNotificationAsync({
    identifier: NOTIFICATION_IDS.PURCHASE_FEEDBACK,
    content: {
      title: "Como foi sua experiência de compra?",
      body: `O que você achou do produto "${productName}"? Deixe seu feedback para ajudar outros compradores!`,
      data: {
        type: "purchase-feedback",
        productId,
        deepLink: `${DEEP_LINK}product/${productId}?openFeedbackBottomsheet=true`,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    },
  });
};

export const localNotificationsService = {
  scheduleCartReminder,
  scheduleFeedbackNotification,

  requestPermissions,
  setupNotificationChannel,
};
