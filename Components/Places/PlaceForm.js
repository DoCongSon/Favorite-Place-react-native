import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../../constants/colors';
import Place from '../../models/place';
import Button from '../UI/Button';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

const PlaceForm = ({ onCreatePlace }) => {
  const [inputValue, setInputValue] = useState('');
  const [pickedImage, setPickedImage] = useState();
  const [pickedLocation, setPickerLocation] = useState();

  const handlerSave = () => {
    const place = new Place(inputValue, pickedImage, pickedLocation);
    onCreatePlace(place);
  };

  const handlerPickedImage = (imageUri) => {
    setPickedImage(imageUri);
  };

  const handlerPickedLocation = (location) => {
    setPickerLocation(location);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Place form</Text>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={(value) => setInputValue(value)}
        />
        <ImagePicker onPickedImage={handlerPickedImage} />
        <LocationPicker onPickedLocation={handlerPickedLocation} />
        <View style={styles.submit}>
          <Button onPress={handlerSave}>save</Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary800,
  },
  input: {
    padding: 10,
    fontSize: 18,
    borderRadius: 4,
    backgroundColor: Colors.primary100,
    borderColor: Colors.primary400,
    borderWidth: 2,
    color: Colors.gray700,
  },
  submit: {
    alignItems: 'center',
  },
});

export default PlaceForm;
