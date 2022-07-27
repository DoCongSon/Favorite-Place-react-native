import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

const Button = ({ children, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      <Text style={styles.title}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 8,
    backgroundColor: Colors.primary600,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    minWidth: 150,
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    marginLeft: 4,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
  },
});

export default Button;
