import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import PlacesList from '../Components/Places/PlacesList';
import { fetchPlace } from '../util/database';

const AllPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      if (isFocused) {
        const response = await fetchPlace();
        setLoadedPlaces(response);
        console.log(response);
      }
    };
    fetchData();
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
