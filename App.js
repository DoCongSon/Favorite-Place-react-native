import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AllPlaces from './screens/AllPlaces';
import AddPlaces from './screens/AddPlaces';
import IconButton from './Components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { init } from './util/database.js';
import * as SplashScreen from 'expo-splash-screen';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const initDb = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await init();
      } catch (err) {
        console.log(err);
      }
      await SplashScreen.hideAsync();
    };
    initDb();
  }, []);

  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary800 },
            headerTintColor: Colors.primary50,
            cardStyle: {
              backgroundColor: Colors.primary50,
            },
          }}>
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your favorite places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  color={tintColor}
                  icon='add'
                  size={28}
                  onPress={() => {
                    navigation.navigate('AddPlaces');
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name='AddPlaces'
            component={AddPlaces}
            options={{
              title: 'Add a new place',
            }}
          />
          <Stack.Screen
            name='Map'
            component={Map}
            options={{
              title: 'Map',
            }}
          />
          <Stack.Screen
            name='PlaceDetails'
            component={PlaceDetails}
            options={{
              title: 'Place Details',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
