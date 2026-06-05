import React, { useMemo, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/ProfileScreenStyles';

const options = [
  {
    label: 'JavaScript',
    value: 'javascript',
    description: 'Lenguaje versátil para frontend y backend.',
    level: 'Intermedio',
    year: '1995',
    icon: 'logo-javascript',
  },
  {
    label: 'Python',
    value: 'python',
    description: 'Popular en automatización, ciencia de datos e IA.',
    level: 'Intermedio',
    year: '1991',
    icon: 'logo-python',
  },
  {
    label: 'Java',
    value: 'java',
    description: 'Muy usado en entornos empresariales y Android.',
    level: 'Intermedio',
    year: '1995',
    icon: 'logo-android',
  },
  {
    label: 'C#',
    value: 'csharp',
    description: 'Potente para aplicaciones de escritorio, web y juegos.',
    level: 'Intermedio',
    year: '2000',
    icon: 'code-slash-outline',
  },
  {
    label: 'TypeScript',
    value: 'typescript',
    description: 'Tipado estático encima de JavaScript.',
    level: 'Avanzado',
    year: '2012',
    icon: 'logo-react',
  },
];

export default function ProfileScreen() {
  const [selectedValue, setSelectedValue] = useState(options[0].value);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const selected = useMemo(
    () => options.find((option) => option.value === selectedValue) || options[0],
    [selectedValue],
  );

  const selectOption = (value) => {
    setSelectedValue(value);
    setDropdownVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.heroRow}>
          <View style={styles.heroIcon}>
            <Ionicons name="layers-outline" size={24} color="#07111f" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.kicker}>Selector adaptable</Text>
            <Text style={styles.title}>Dropdown compatible con Android e iOS</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          iOS usa el Picker nativo y Android muestra una lista personalizada con tarjetas.
        </Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Opción actual</Text>
            <Text style={styles.infoValue}>{selected.label}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Nivel</Text>
            <Text style={styles.infoValue}>{selected.level}</Text>
          </View>
        </View>

        <Text style={styles.label}>Selecciona una opción</Text>

        {Platform.OS === 'ios' ? (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={styles.picker}
            >
              {options.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        ) : (
          <>
            <Pressable
              onPress={() => setDropdownVisible(true)}
              style={({ pressed }) => [
                styles.dropdownTrigger,
                pressed && styles.dropdownTriggerPressed,
              ]}
            >
              <View>
                <Text style={styles.dropdownTriggerText}>{selected.label}</Text>
                <Text style={styles.dropdownTriggerSubtext}>{selected.description}</Text>
              </View>
              <Ionicons name="chevron-down-outline" size={20} color="#22c55e" />
            </Pressable>

            <Modal
              transparent
              animationType="fade"
              visible={dropdownVisible}
              onRequestClose={() => setDropdownVisible(false)}
            >
              <Pressable
                style={styles.dropdownModalOverlay}
                onPress={() => setDropdownVisible(false)}
              >
                <Pressable style={styles.dropdownModalCard} onPress={() => {}}>
                  <Text style={styles.dropdownModalTitle}>Elige un lenguaje</Text>
                  {options.map((option) => {
                    const isSelected = option.value === selectedValue;

                    return (
                      <Pressable
                        key={option.value}
                        onPress={() => selectOption(option.value)}
                        style={({ pressed }) => [
                          styles.dropdownOption,
                          isSelected && styles.dropdownOptionSelected,
                          pressed && styles.dropdownOptionPressed,
                        ]}
                      >
                        <View style={styles.optionLeft}>
                          <View style={[styles.optionIcon, isSelected && styles.optionIconSelected]}>
                            <Ionicons
                              name={option.icon}
                              size={16}
                              color={isSelected ? '#07111f' : '#e2e8f0'}
                            />
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text
                              style={[
                                styles.dropdownOptionText,
                                isSelected && styles.dropdownOptionTextSelected,
                              ]}
                            >
                              {option.label}
                            </Text>
                            <Text style={styles.dropdownOptionSubtext}>{option.description}</Text>
                          </View>
                        </View>
                      </Pressable>
                    );
                  })}

                  <Pressable
                    onPress={() => setDropdownVisible(false)}
                    style={({ pressed }) => [
                      styles.dropdownDoneButton,
                      pressed && styles.dropdownDoneButtonPressed,
                    ]}
                  >
                    <Text style={styles.dropdownDoneButtonText}>Cerrar</Text>
                  </Pressable>
                </Pressable>
              </Pressable>
            </Modal>
          </>
        )}

        <View style={styles.selectionBox}>
          <Text style={styles.selectionLabel}>Selección detallada</Text>
          <Text style={styles.selectionValue}>{selected.label}</Text>
          <Text style={styles.selectionDesc}>{selected.description}</Text>
          <View style={styles.selectionMetaRow}>
            <View style={styles.metaChip}><Text style={styles.metaChipText}>{selected.year}</Text></View>
            <View style={styles.metaChip}><Text style={styles.metaChipText}>{selected.level}</Text></View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
