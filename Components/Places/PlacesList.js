import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import PlaceItem from './PlaceItem';

const PlacesList = ({ places }) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackText}>No places added yet - start adding some!</Text>
      </View>
    );
  }

  const navigation = useNavigation();

  const handlerSelect = (id) => {
    navigation.navigate('PlaceDetails', { placeId: id });
  };

  return (
    <FlatList
      contentContainerStyle={styles.contentContainerStyle}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={handlerSelect} />}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    marginHorizontal: 10,
  },
  feedbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 16,
    color: Colors.gray700,
  },
});

export default PlacesList;
