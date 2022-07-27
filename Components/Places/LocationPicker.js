import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from 'expo-location';
import { Colors } from '../../constants/colors';
import OutLineButton from '../UI/OutLineButton';
import { getAddress, getMapPreviews } from '../../util/location';

const LocationPicker = ({ onPickedLocation }) => {
  const [status, requestLocationPermission] = useForegroundPermissions();
  const [locationPicker, setLocationPicker] = useState();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params?.location) {
      const { latitude, longitude } = route.params.location;
      setLocationPicker({
        lat: latitude,
        lng: longitude,
      });
    }
  }, [route, isFocused]);

  useEffect(() => {
    console.log('render');
    const handlerLocation = async () => {
      if (locationPicker) {
        const address = await getAddress(locationPicker.lat, locationPicker.lng);
        onPickedLocation({ ...locationPicker, address });
      }
    };
    handlerLocation();
  }, [locationPicker]);

  const verifyPermissions = async () => {
    if (status.status === PermissionStatus.UNDETERMINED) {
      const permissionsResponse = await requestLocationPermission();
      return permissionsResponse.granted;
    }
    if (status.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permission to use this app.'
      );
      return false;
    }
    return true;
  };

  const handlerGetLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const locationResponse = await getCurrentPositionAsync();
    setLocationPicker({
      lat: locationResponse.coords.latitude,
      lng: locationResponse.coords.longitude,
    });
  };

  const handlerPickOnMap = () => {
    navigation.navigate('Map');
  };

  let locationPreview = <Text style={styles.imageAlt}>No location Take yet!</Text>;

  if (locationPicker) {
    const imageUri = getMapPreviews(locationPicker.lat, locationPicker.lng);
    locationPreview = <Image source={{ uri: imageUri }} style={styles.image} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>{locationPreview}</View>
      <View style={styles.buttonRow}>
        <OutLineButton icon='location' onPress={handlerGetLocation}>
          Location user
        </OutLineButton>
        <OutLineButton icon='map' onPress={handlerPickOnMap}>
          Pick on map
        </OutLineButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary200,
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default LocationPicker;
