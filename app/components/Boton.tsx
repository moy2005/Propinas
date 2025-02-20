import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
} from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

type BotonProps = {
  titulo: string;
  onPress: () => void;
  active?: boolean;
};

const Boton = ({ titulo, onPress, active = false }: BotonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.boton, active ? styles.botonActivo : null]}
    >
      <Text style={[styles.texto, active ? styles.textoActivo : null]}>
        {titulo}
      </Text>
    </TouchableOpacity>
  );
};

export default Boton;

const styles = StyleSheet.create({
  boton: {
    backgroundColor: COLORS.inputBackground,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  botonActivo: {
    backgroundColor: COLORS.primary,
  },
  texto: {
    color: COLORS.textSecondary,
    fontSize: 18,
    fontFamily: FONTS.semiBold,
  },
  textoActivo: {
    color: COLORS.textPrimary,
  },
});

