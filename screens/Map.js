import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../Components/UI/IconButton';

const Map = ({ navigation, route }) => {
  const initialLocation = route.params?.initialLocation;
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const handlerLocationSelector = (event) => {
    if (initialLocation) {
      return;
    }
    const coordinate = { ...event.nativeEvent.coordinate };
    setSelectedLocation(coordinate);
  };

  const handlerSavePickerLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('No location picker!', 'Please select a location by tapping on the map');
      return;
    }
    navigation.navigate('AddPlaces', { location: { ...selectedLocation } });
  }, [navigation, selectedLocation]);

  useEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton color={tintColor} icon='save' size={28} onPress={handlerSavePickerLocation} />
      ),
    });
  }, [navigation, handlerSavePickerLocation, initialLocation]);

  return (
    <MapView
      style={styles.mapView}
      initialRegion={{
        latitude: initialLocation ? initialLocation.latitude : 20.8586187,
        longitude: initialLocation ? initialLocation.longitude : 105.6454793,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={handlerLocationSelector}>
      {selectedLocation && <Marker coordinate={selectedLocation} />}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
});

export default Map;
