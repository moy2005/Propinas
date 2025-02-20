import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Boton from '../components/Boton';
import { COLORS, FONTS } from '../constants/theme';

interface HistoryItem {
  id: string;
  consumo: number;
  porcentaje: number;
  propina: number;
  total: number;
  fecha: Date;
}

const Propinas = () => {
  // Estados
  const [consumo, setConsumo] = useState<string>('');
  const [propina, setPropina] = useState<number>(0);
  const [otroPorcentaje, setOtroPorcentaje] = useState<string>('');
  const [porcentajeActivo, setPorcentajeActivo] = useState<number | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [historial, setHistorial] = useState<HistoryItem[]>([]);

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
      
      // Agregamos al historial
      const nuevoItem: HistoryItem = {
        id: Date.now().toString(),
        consumo: montoConsumo,
        porcentaje: porcentaje,
        propina: propinaCalculada,
        total: montoConsumo + propinaCalculada,
        fecha: new Date()
      };
      
      setHistorial(prevHistorial => [nuevoItem, ...prevHistorial]);
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

  // Renderizar un item del historial
  const renderHistoryItem = ({ item }: { item: HistoryItem }) => {
    const formattedDate = item.fecha.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    return (
      <View style={styles.historyItem}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTime}>{formattedDate}</Text>
          <Text style={styles.historyPercentage}>{item.porcentaje}%</Text>
        </View>
        <View style={styles.historyDetails}>
          <View style={styles.historyRow}>
            <Text style={styles.historyLabel}>Consumo:</Text>
            <Text style={styles.historyValue}>${item.consumo.toFixed(2)}</Text>
          </View>
          <View style={styles.historyRow}>
            <Text style={styles.historyLabel}>Propina:</Text>
            <Text style={styles.historyValue}>${item.propina.toFixed(2)}</Text>
          </View>
          <View style={styles.historyRow}>
            <Text style={styles.historyTotalLabel}>Total:</Text>
            <Text style={styles.historyTotalValue}>${item.total.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    );
  };

  // Total a calcular
  const total = isNaN(parseFloat(consumo) + propina) ? 0 : (parseFloat(consumo) + propina);

  return (
    <View style={styles.mainContainer}>
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
          
          {/* Historial de Operaciones */}
          {historial.length > 0 && (
            <View style={styles.historyContainer}>
              <Text style={styles.historyTitle}>Historial de Operaciones</Text>
              <FlatList
                data={historial}
                renderItem={renderHistoryItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                style={styles.historyList}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Propinas;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 12,
  },
  inputContainer: {
    width: '100%',
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
    width: '100%',
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
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
  // Estilos para el historial
  historyContainer: {
    width: '100%',
    marginTop: 10,
  },
  historyTitle: {
    fontSize: 20,
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
    marginBottom: 16,
  },
  historyList: {
    width: '100%',
  },
  historyItem: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  historyPercentage: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  historyDetails: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    padding: 12,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  historyLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  historyValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontFamily: FONTS.semiBold,
  },
  historyTotalLabel: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
  },
  historyTotalValue: {
    fontSize: 18,
    color: COLORS.accent,
    fontFamily: FONTS.bold,
  },
});

