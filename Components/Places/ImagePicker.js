import React, { useState } from 'react';
import { View, Button, Alert, Image, Text, StyleSheet } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import OutLineButton from '../UI/OutLineButton';

const ImagePicker = ({ onPickedImage }) => {
  const [status, requestCameraPermissions] = useCameraPermissions();
  const [image, setImage] = useState();

  const verifyPermissions = async () => {
    if (status.status === PermissionStatus.UNDETERMINED) {
      const permissionsResponse = await requestCameraPermissions();
      return permissionsResponse.granted;
    }
    if (status.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permission to use this app.'
      );
      return false;
    }
    return true;
  };

  const handlerTakeImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const imageResponse = await launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [4, 3],
    });
    setImage(imageResponse);
    onPickedImage(imageResponse.uri);
  };

  let imagePreview = <Text style={styles.imageAlt}>No Image Take yet!</Text>;

  if (image?.uri) {
    imagePreview = <Image source={{ uri: image.uri }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imageContainer}>{imagePreview}</View>
      <OutLineButton onPress={handlerTakeImage} icon='camera'>
        Take Image
      </OutLineButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
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
  imageAlt: {
    fontSize: 16,
    color: Colors.primary800,
  },
});

export default ImagePicker;
