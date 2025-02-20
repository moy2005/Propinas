import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Boton from '../components/Boton';
import { COLORS, FONTS } from '../constants/theme';

const Propinas = () => {
  // Estados
  const [consumo, setConsumo] = useState<string>('');
  const [propina, setPropina] = useState<number>(0);
  const [otroPorcentaje, setOtroPorcentaje] = useState<string>('');
  const [porcentajeActivo, setPorcentajeActivo] = useState<number | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Funcion para calcular propina
  const calcularPropina = (porcentaje: number) => {
    const montoConsumo = parseFloat(consumo);
    if (!isNaN(montoConsumo)) {
      setPorcentajeActivo(porcentaje);
      const propinaCalculada = montoConsumo * (porcentaje / 100);
      setPropina(propinaCalculada);
      
      if (!showResults) {
        setShowResults(true);
      }
    }
  };

  const handleOtroPorcentaje = () => {
    const porcentaje = parseFloat(otroPorcentaje);
    if (!isNaN(porcentaje)) {
      calcularPropina(porcentaje);
    }
  };

  const limpiarCampos = () => {
    setConsumo('');
    setOtroPorcentaje('');
    setPropina(0);
    setPorcentajeActivo(null);
    setShowResults(false);
  };

  // Total a calcular
  const total = isNaN(parseFloat(consumo) + propina) ? 0 : (parseFloat(consumo) + propina);

  return (

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Consumo Total</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="numeric"
                  value={consumo}
                  onChangeText={setConsumo}
                />
              </View>
            </View>

            <Text style={styles.sectionTitle}>Porcentaje de Propina</Text>
            <View style={styles.buttonContainer}>
              <Boton titulo="10%" onPress={() => calcularPropina(10)} active={porcentajeActivo === 10} />
              <Boton titulo="15%" onPress={() => calcularPropina(15)} active={porcentajeActivo === 15} />
              <Boton titulo="20%" onPress={() => calcularPropina(20)} active={porcentajeActivo === 20} />
            </View>

            <View style={styles.otroContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Otro porcentaje</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.input, styles.otroInput]}
                    placeholder="0"
                    placeholderTextColor={COLORS.textMuted}
                    keyboardType="numeric"
                    value={otroPorcentaje}
                    onChangeText={setOtroPorcentaje}
                  />
                  <Text style={styles.percentSymbol}>%</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={handleOtroPorcentaje}
              >
                <Ionicons name="checkmark" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {showResults && (
              <View style={styles.resultContainer}>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Consumo:</Text>
                  <Text style={styles.resultValue}>${parseFloat(consumo || '0').toFixed(2)}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Propina ({porcentajeActivo}%):</Text>
                  <Text style={styles.resultValue}>${propina.toFixed(2)}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.resultRow}>
                  <Text style={styles.totalLabel}>Total:</Text>
                  <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                </View>
              </View>
            )}

            <TouchableOpacity 
              style={styles.clearButton}
              onPress={limpiarCampos}
            >
              <Ionicons name="refresh-outline" size={18} color={COLORS.textSecondary} />
              <Text style={styles.clearButtonText}>Reiniciar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  );
};

export default Propinas;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 12,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    overflow: 'hidden',
  },
  currencySymbol: {
    paddingHorizontal: 15,
    fontSize: 22,
    color: COLORS.textSecondary,
    fontFamily: FONTS.semiBold,
  },
  percentSymbol: {
    paddingHorizontal: 15,
    fontSize: 20,
    color: COLORS.textSecondary,
    fontFamily: FONTS.semiBold,
  },
  label: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 8,
    fontFamily: FONTS.regular,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    padding: 16,
    fontSize: 18,
    fontFamily: FONTS.semiBold,
  },
  otroInput: {
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  otroContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  resultContainer: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  resultValue: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontFamily: FONTS.semiBold,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
  },
  totalValue: {
    fontSize: 24,
    color: COLORS.accent,
    fontFamily: FONTS.bold,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  clearButtonText: {
    color: COLORS.textSecondary,
    marginLeft: 6,
    fontFamily: FONTS.regular,
  },
});

