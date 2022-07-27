import React from 'react';
import PlaceForm from '../Components/Places/PlaceForm';
import { insertPlace } from '../util/database';

const AddPlaces = ({ navigation }) => {
  const handlerCreatePlace = async (place) => {
    await insertPlace(place);
    navigation.navigate('AllPlaces');
  };
  return <PlaceForm onCreatePlace={handlerCreatePlace} />;
};

export default AddPlaces;
