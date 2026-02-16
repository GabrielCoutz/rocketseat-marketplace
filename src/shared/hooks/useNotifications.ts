import { useEffect } from "react";
import { localNotificationsService } from "../services/local-notifications.service";
import * as Notifications from "expo-notifications";
import { Linking } from "react-native";

export const useNotifications = () => {
  useEffect(() => {
    localNotificationsService.requestPermissions();
    localNotificationsService.setupNotificationChannel();

    const lastResponse = Notifications.getLastNotificationResponse();

    if (lastResponse) {
      const deepLink =
        lastResponse.notification.request.content?.data?.deepLink;

      const hasDeepLink = !!deepLink && typeof deepLink === "string";
      if (hasDeepLink) Linking.openURL(deepLink);
    }

    Notifications.addNotificationResponseReceivedListener((response) => {
      const deepLink = response.notification.request.content?.data?.deepLink;

      const hasDeepLink = !!deepLink && typeof deepLink === "string";
      if (hasDeepLink) Linking.openURL(deepLink);
    });
  }, []);

  return {};
};
