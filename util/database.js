import * as SQLite from 'expo-sqlite';
import Place from '../models/place';

const database = SQLite.openDatabase('places.db');

const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

const insertPlace = (place) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [place.title, place.imageUri, place.address, place.location.lat, place.location.lng],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

const fetchPlace = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];
          result.rows._array.forEach((item) => {
            places.push(
              new Place(
                item.title,
                item.imageUri,
                {
                  address: item.address,
                  lat: item.lat,
                  lng: item.lng,
                },
                item.id
              )
            );
          });
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

const fetchPlaceDetails = (id) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          const placeData = result.rows._array[0];
          resolve(
            new Place(
              placeData.title,
              placeData.imageUri,
              {
                address: placeData.address,
                lat: placeData.lat,
                lng: placeData.lng,
              },
              placeData.id
            )
          );
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export { init, insertPlace, fetchPlace, fetchPlaceDetails };
