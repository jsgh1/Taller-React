import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/HomeScreenStyles';

const PAGE_SIZE = 8;
const MAX_ITEMS = 32;

export default function HomeScreen({ navigation }) {
  const [message, setMessage] = useState('Toca una tarjeta para comenzar');
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionCount, setActionCount] = useState(0);
  const [lastAction, setLastAction] = useState('Sin acciones todavía');
  const timeoutRef = useRef(null);

  const loadMoreItems = () => {
    if (loading || items.length >= MAX_ITEMS) return;

    setLoading(true);
    timeoutRef.current = setTimeout(() => {
      setItems((currentItems) => {
        const startIndex = currentItems.length + 1;
        const newItems = Array.from({ length: PAGE_SIZE }, (_, index) => {
          const globalIndex = startIndex + index;
          const variants = [
            { tag: 'Interface', accent: 'Cian' },
            { tag: 'Navegación', accent: 'Verde' },
            { tag: 'UX', accent: 'Ámbar' },
            { tag: 'Lógica', accent: 'Violeta' },
          ];
          const variant = variants[globalIndex % variants.length];

          return {
            id: String(globalIndex),
            title: `Bloque ${globalIndex}`,
            subtitle: `${variant.tag} • estilo ${variant.accent}`,
            badge: variant.tag,
          };
        });

        return [...currentItems, ...newItems];
      });
      setLoading(false);
    }, 900);
  };

  useEffect(() => {
    loadMoreItems();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const openDetail = () => {
    setActionCount((current) => current + 1);
    setLastAction('Ir a detalle');
    setMessage('Abriendo la pantalla de detalle');
    navigation.navigate('Detalle');
  };

  const actions = useMemo(() => ([
    {
      label: 'Mensaje rápido',
      description: 'Actualiza el texto y suma un clic',
      icon: 'chatbubble-ellipses-outline',
      onPress: () => {
        setActionCount((current) => current + 1);
        setLastAction('Mensaje rápido');
        setMessage('Mensaje cambiado con éxito');
      },
    },
    {
      label: 'Abrir modal',
      description: 'Muestra un cuadro informativo',
      icon: 'open-outline',
      onPress: () => {
        setActionCount((current) => current + 1);
        setLastAction('Modal abierto');
        setMessage('Se abrió el modal principal');
        setModalVisible(true);
      },
    },
    {
      label: 'Ir a detalle',
      description: 'Navega a otra vista del Stack',
      icon: 'arrow-forward-circle-outline',
      onPress: openDetail,
    },
  ]), [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.25}
        ListHeaderComponent={
          <View>
            <View style={styles.heroCard}>
              <View style={styles.heroTopRow}>
                <View style={styles.pill}>
                  <Ionicons name="phone-portrait-outline" size={14} color="#06111f" />
                  <Text style={styles.pillText}>React Native</Text>
                </View>
                <View style={styles.pillSoft}>
                  <Text style={styles.pillSoftText}>{actionCount} acciones</Text>
                </View>
              </View>

              <Text style={styles.kicker}>INTERFAZ</Text>
              <Text style={styles.title}>Componentes básicos</Text>
              <Text style={styles.subtitle}>
                Este dashboard reúne botones, modal y carga progresiva.
              </Text>

              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{items.length}</Text>
                  <Text style={styles.statLabel}>Elementos</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>3</Text>
                  <Text style={styles.statLabel}>Acciones</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{loading ? '...' : 'OK'}</Text>
                  <Text style={styles.statLabel}>Carga</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Panel de acciones</Text>
              <Text style={styles.helperText}>Cada tarjeta cambia el estado visual.</Text>
              <View style={styles.actionsGrid}>
                {actions.map((action) => (
                  <Pressable
                    key={action.label}
                    onPress={action.onPress}
                    style={({ pressed }) => [
                      styles.actionButton,
                      pressed && styles.actionButtonPressed,
                    ]}
                  >
                    <View style={styles.actionIconWrap}>
                      <Ionicons name={action.icon} size={22} color="#06111f" />
                    </View>
                    <Text style={styles.actionButtonText}>{action.label}</Text>
                    <Text style={styles.actionButtonNote}>{action.description}</Text>
                  </Pressable>
                ))}
              </View>
              <View style={styles.messageChip}>
                <Text style={styles.messageLabel}>Estado</Text>
                <Text style={styles.message}>{message}</Text>
              </View>
              <Text style={styles.lastAction}>Última acción: {lastAction}</Text>
            </View>

            <View style={styles.cardAccent}>
              <Text style={styles.sectionTitleAccent}>Dialog / Modal</Text>
              <Text style={styles.helperTextAccent}>
                Dialog / Modal, dale al boton de abrir.
              </Text>
              <Pressable
                onPress={() => setModalVisible(true)}
                style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
              >
                <Text style={styles.primaryButtonText}>Abrir modal</Text>
              </Pressable>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Scroll Loading</Text>
              <Text style={styles.helperText}>
                Desplázate para cargar más tarjetas con indicador de espera.
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.listItemBadge}>
              <Text style={styles.listItemBadgeText}>{item.badge}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.listItemTitle}>{item.title}</Text>
              <Text style={styles.listItemSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={18} color="#94a3b8" />
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            {loading ? (
              <>
                <ActivityIndicator size="small" color="#22c55e" />
                <Text style={styles.footerText}>Cargando más elementos...</Text>
              </>
            ) : (
              <Text style={styles.footerText}>
                {items.length >= MAX_ITEMS ? 'No hay más elementos por cargar' : 'Desliza un poco más para continuar'}
              </Text>
            )}
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIcon}>
                <Ionicons name="information-circle-outline" size={22} color="#06111f" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalTitle}>Modal informativo</Text>
                <Text style={styles.modalSubtitle}>Apertura y cierre siguen funcionando con normalidad.</Text>
              </View>
            </View>

            <Text style={styles.modalText}>
              php es mejor que todos los lenguajes que existen, pero no estan listos para esa conversacion.
            </Text>

            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryButtonPressed]}
              >
                <Text style={styles.secondaryButtonText}>Cerrar</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setLastAction('Modal confirmado');
                  setMessage('Modal confirmado y cerrado');
                  setModalVisible(false);
                }}
                style={({ pressed }) => [styles.confirmButton, pressed && styles.confirmButtonPressed]}
              >
                <Text style={styles.confirmButtonText}>Aceptar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
