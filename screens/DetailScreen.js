import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/DetailScreenStyles';

export default function DetailScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.iconBox}>
            <Ionicons name="document-text-outline" size={22} color="#07111f" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.kicker}>Stack Navigation</Text>
            <Text style={styles.title}>Pantalla de detalle</Text>
          </View>
        </View>

        <Text style={styles.message}>
          Stack Navigation.
        </Text>

        <View style={styles.grid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Ruta</Text>
            <Text style={styles.infoValue}>Detalle</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Tipo</Text>
            <Text style={styles.infoValue}>Stack</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Compatibilidad</Text>
            <Text style={styles.infoValue}>Android / iOS</Text>
          </View>
        </View>

        <View style={styles.list}>
          <Text style={styles.listItem}>• Ruta accesible desde Home</Text>
          <Text style={styles.listItem}>• Retorno con goBack()</Text>
        </View>

        <Pressable
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
              return;
            }

            navigation.navigate('Inicio');
          }}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
        >
          <Text style={styles.primaryButtonText}>Volver</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
