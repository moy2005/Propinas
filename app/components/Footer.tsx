import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../constants/theme';

type Propiedades = {
  fecha: string,
  telefono: string
};

const Footer = (props: Propiedades) => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{props.fecha}</Text>
      <View style={styles.divider} />
      <Text style={styles.texto}>{props.telefono}</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    width: '100%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
    marginTop: 20,
  },
  texto: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.primary,
    marginVertical: 10,
    borderRadius: 1,
  }
});