import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../constants/theme';

type Propiedades = {
  titulo: string,
  nombre: string,
  imagen: any
};

const Header = (props: Propiedades) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={props.imagen} style={styles.imagen} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{props.titulo}</Text>
        <Text style={styles.nombre}>{props.nombre}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 24,
    width: '100%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 7,
    marginBottom: 25,
  },
  imageContainer: {
    marginRight: 20,
  },
  imagen: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  textContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  nombre: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  }
});