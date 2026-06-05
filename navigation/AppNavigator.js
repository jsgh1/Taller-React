import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ConfigScreen from '../screens/ConfigScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createStackNavigator();

const colors = {
  bg: '#07111f',
  panel: '#0f1a2b',
  panelSoft: '#13233d',
  primary: '#22c55e',
  secondary: '#38bdf8',
  accent: '#f97316',
  text: '#eef2ff',
  muted: '#94a3b8',
  border: '#1f2d46',
  white: '#ffffff',
};

function baseStackOptions() {
  return {
    headerStyle: {
      backgroundColor: colors.bg,
      borderBottomColor: colors.border,
      shadowColor: 'transparent',
    },
    headerTintColor: colors.text,
    headerTitleStyle: { fontWeight: '800' },
    headerTitleAlign: 'center',
    headerTitleContainerStyle: { paddingHorizontal: 8 },
  };
}

function MenuButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          marginLeft: 14,
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: colors.panel,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: colors.border,
        },
        pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
      ]}
    >
      <Ionicons name="layers-outline" size={22} color={colors.text} />
    </Pressable>
  );
}

function MenuSheet({ visible, onClose, onNavigate, currentRoute }) {
  const items = [
    { label: 'Inicio', route: 'Inicio', icon: 'grid-outline', desc: 'Panel principal' },
    { label: 'Lenguajes', route: 'Lenguajes', icon: 'prism-outline', desc: 'Selector interactivo' },
    { label: 'Calculadora', route: 'Calculadora', icon: 'calculator-outline', desc: 'Operaciones básicas' },
    { label: 'Detalle', route: 'Detalle', icon: 'document-text-outline', desc: 'Vista secundaria' },
  ];

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <SafeAreaView>
            <View style={styles.brandCard}>
              <View style={styles.brandBadge}>
                <Ionicons name="sparkles-outline" size={18} color={colors.bg} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sheetTitle}>Navegación Móvil</Text>
                <Text style={styles.sheetSubtitle}>Jsgh</Text>
              </View>
            </View>

            <View style={styles.itemList}>
              {items.map((item) => {
                const active = currentRoute === item.route;

                return (
                  <Pressable
                    key={item.route}
                    onPress={() => onNavigate(item.route)}
                    style={({ pressed }) => [
                      styles.item,
                      active && styles.itemActive,
                      pressed && styles.itemPressed,
                    ]}
                  >
                    <View style={[styles.itemIcon, active && styles.itemIconActive]}>
                      <Ionicons
                        name={item.icon}
                        size={18}
                        color={active ? colors.bg : colors.text}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.itemText, active && styles.itemTextActive]}>
                        {item.label}
                      </Text>
                      <Text style={styles.itemDesc}>{item.desc}</Text>
                    </View>
                    {active ? (
                      <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
                    ) : (
                      <Ionicons name="chevron-forward" size={18} color={colors.muted} />
                    )}
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.footerCard}>
              <Text style={styles.footerTitle}>Acceso rápido</Text>
              <Text style={styles.footerText}>El proyecto usa Stack Navigation y mantiene la lógica intacta.</Text>
            </View>
          </SafeAreaView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function AppNavigator({ navigationRef, currentRoute }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const navigateFromMenu = (route) => {
    setMenuVisible(false);

    if (!navigationRef || !navigationRef.isReady()) {
      return;
    }

    navigationRef.reset({
      index: 0,
      routes: [{ name: route }],
    });
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          ...baseStackOptions(),
          headerLeft: () => <MenuButton onPress={() => setMenuVisible(true)} />,
        })}
      >
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ title: 'Inicio' }}
        />
        <Stack.Screen
          name="Lenguajes"
          component={ProfileScreen}
          options={{ title: 'Lenguajes' }}
        />
        <Stack.Screen
          name="Calculadora"
          component={ConfigScreen}
          options={{ title: 'Calculadora' }}
        />
        <Stack.Screen
          name="Detalle"
          component={DetailScreen}
          options={{ title: 'Detalle' }}
        />
      </Stack.Navigator>

      <MenuSheet
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onNavigate={navigateFromMenu}
        currentRoute={currentRoute}
      />
    </>
  );
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(3, 7, 18, 0.68)',
  },
  sheet: {
    width: '88%',
    maxWidth: 340,
    height: '100%',
    backgroundColor: colors.panel,
    paddingHorizontal: 16,
    paddingTop: 18,
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 8, height: 0 },
    elevation: 6,
  },
  brandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.panelSoft,
    borderRadius: 22,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  brandBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  sheetSubtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2,
  },
  itemList: {
    gap: 10,
  },
  item: {
    minHeight: 64,
    borderRadius: 18,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#0b1526',
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemActive: {
    backgroundColor: '#12263f',
    borderColor: colors.primary,
  },
  itemPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.99 }],
  },
  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#17253b',
  },
  itemIconActive: {
    backgroundColor: colors.primary,
  },
  itemText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  itemTextActive: {
    color: colors.primary,
  },
  itemDesc: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  footerCard: {
    marginTop: 16,
    backgroundColor: colors.panelSoft,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  footerTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  footerText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },
};
