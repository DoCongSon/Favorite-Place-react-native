import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const OutLineButton = ({ children, icon, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      <Ionicons name={icon} color={Colors.primary700} size={18} />
      <Text style={styles.title}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary800,
    minWidth: 150,
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    marginLeft: 4,
    color: Colors.primary700,
    textTransform: 'uppercase',
  },
});

export default OutLineButton;
