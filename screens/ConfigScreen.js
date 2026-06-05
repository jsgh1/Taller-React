import React, { useMemo, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/ConfigScreenStyles';

function normalizeNumber(value) {
  const parsed = parseFloat(String(value).replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}

export default function ConfigScreen() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('Escribe dos numeros y elige una operacion');
  const [history, setHistory] = useState([]);

  const values = useMemo(() => ({ a: normalizeNumber(num1), b: normalizeNumber(num2) }), [num1, num2]);

  const pushHistory = (entry) => {
    setHistory((current) => [entry, ...current].slice(0, 6));
  };

  const calculate = (operation) => {
    const { a, b } = values;

    if (a === null || b === null) {
      setResult('Por favor ingresa numeros validos');
      return;
    }

    let output = '';
    let symbol = '';

    switch (operation) {
      case 'sum':
        output = a + b;
        symbol = '+';
        break;
      case 'rest':
        output = a - b;
        symbol = '-';
        break;
      case 'mul':
        output = a * b;
        symbol = '×';
        break;
      case 'div':
        if (b === 0) {
          setResult('Error: division por cero');
          return;
        }
        output = a / b;
        symbol = '÷';
        break;
      default:
        setResult('Operacion no valida');
        return;
    }

    const line = `${a} ${symbol} ${b} = ${output}`;
    setResult(`Resultado: ${output}`);
    pushHistory(line);
  };

  const operations = [
    { symbol: '+', label: 'Sumar', key: 'sum', color: styles.sumButton },
    { symbol: '-', label: 'Restar', key: 'rest', color: styles.restButton },
    { symbol: '×', label: 'Multiplicar', key: 'mul', color: styles.mulButton },
    { symbol: '÷', label: 'Dividir', key: 'div', color: styles.divButton },
  ];

  const clearAll = () => {
    setNum1('');
    setNum2('');
    setResult('Escribe dos numeros y elige una operacion');
    setHistory([]);
  };

  const swapValues = () => {
    setNum1(num2);
    setNum2(num1);
  };

  return (
    <Pressable style={styles.screen} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
              <View style={styles.headerRow}>
                <View style={styles.calcBadge}>
                  <Ionicons name="calculator-outline" size={22} color="#07111f" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.kicker}>Calculadora dinámica</Text>
                  <Text style={styles.title}>Operaciones básicas con historial</Text>
                </View>
              </View>
              <Text style={styles.subtitle}>
                Suma, resta, multiplicación y división con validación y registro visual de resultados.
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Numero 1"
                placeholderTextColor="#7c8aa5"
                keyboardType="decimal-pad"
                value={num1}
                onChangeText={setNum1}
              />
              <TextInput
                style={styles.input}
                placeholder="Numero 2"
                placeholderTextColor="#7c8aa5"
                keyboardType="decimal-pad"
                value={num2}
                onChangeText={setNum2}
              />

              <View style={styles.toolRow}>
                <Pressable
                  onPress={swapValues}
                  style={({ pressed }) => [styles.toolButton, pressed && styles.toolButtonPressed]}
                >
                  <Ionicons name="swap-horizontal-outline" size={18} color="#e2e8f0" />
                  <Text style={styles.toolButtonText}>Intercambiar</Text>
                </Pressable>
                <Pressable
                  onPress={clearAll}
                  style={({ pressed }) => [styles.toolButtonSoft, pressed && styles.toolButtonPressed]}
                >
                  <Ionicons name="trash-outline" size={18} color="#07111f" />
                  <Text style={styles.toolButtonTextDark}>Limpiar</Text>
                </Pressable>
              </View>

              <View style={styles.buttonsGrid}>
                {operations.map((operation) => (
                  <Pressable
                    key={operation.key}
                    onPress={() => calculate(operation.key)}
                    style={({ pressed }) => [
                      styles.opButton,
                      operation.color,
                      pressed && styles.opButtonPressed,
                    ]}
                  >
                    <Text style={styles.opSymbol}>{operation.symbol}</Text>
                    <Text style={styles.opLabel}>{operation.label}</Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.resultBox}>
                <Text style={styles.resultLabel}>Resultado</Text>
                <Text style={styles.result}>{result}</Text>
              </View>

              <View style={styles.historyBox}>
                <Text style={styles.historyTitle}>Historial reciente</Text>
                {history.length === 0 ? (
                  <Text style={styles.historyEmpty}>Aquí aparecerán las últimas operaciones.</Text>
                ) : (
                  history.map((entry, index) => (
                    <View key={`${entry}-${index}`} style={styles.historyItem}>
                      <Text style={styles.historyItemText}>{entry}</Text>
                    </View>
                  ))
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Pressable>
  );
}
