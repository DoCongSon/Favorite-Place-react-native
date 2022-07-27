import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import OutLineButton from '../Components/UI/OutLineButton';
import { Colors } from '../constants/colors';
import { fetchPlaceDetails } from '../util/database';

const PlaceDetails = ({ navigation, route }) => {
  const [fetchPlace, setFetchPlace] = useState();
  const handlerShowMap = () => {
    navigation.navigate('Map', {
      initialLocation: {
        latitude: fetchPlace.location.lat,
        longitude: fetchPlace.location.lng,
      },
    });
  };

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    console.log(selectedPlaceId);
    const fetchData = async () => {
      const response = await fetchPlaceDetails(selectedPlaceId);
      setFetchPlace(response);
    };
    fetchData();
  }, [selectedPlaceId]);

  if (!fetchPlace) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchPlace.address}</Text>
        </View>
        <OutLineButton icon='map' onPress={handlerShowMap}>
          View on map
        </OutLineButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary800,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PlaceDetails;
