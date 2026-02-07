import { Tabs } from 'expo-router';
import { colors } from '../../../styles/colors';
import { Ionicons } from '@expo/vector-icons';

export default function PrivateTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 110,
          paddingTop: 16,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Produtos',
          tabBarActiveTintColor: colors['purple-base'],
          tabBarIcon: ({ color }) => <Ionicons name="storefront-outline" size={25} color={color} />,
          tabBarLabelStyle: {
            fontSize: 14,
            marginBottom: 4,
          },
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: 'Pedidos',
          tabBarActiveTintColor: colors['purple-base'],
          tabBarIcon: ({ color }) => <Ionicons name="clipboard-outline" size={25} color={color} />,
          tabBarLabelStyle: {
            fontSize: 14,
            marginBottom: 4,
          },
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrinho',
          tabBarActiveTintColor: colors['purple-base'],
          tabBarIcon: ({ color }) => <Ionicons name="cart-outline" size={25} color={color} />,
          tabBarLabelStyle: {
            fontSize: 14,
            marginBottom: 4,
          },
        }}
      />
    </Tabs>
  );
}
