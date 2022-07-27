import React from 'react';
import { Text, Pressable, Image, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/colors';

const PlaceItem = ({ place, onSelect }) => {
  const { title, imageUri, address, location, id } = place;
  return (
    <Pressable
      onPress={onSelect.bind(this, id)}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.primary300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    flex: 1,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 5,
    marginLeft: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary800,
  },
  address: {
    fontSize: 16,
    color: Colors.primary800,
  },
});
export default PlaceItem;
