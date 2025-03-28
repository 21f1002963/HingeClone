import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native'
import { useEffect } from 'react'
import { GOOGLE_MAPS_API_KEY } from '../googleAPI'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps'
import Ionicons  from '@react-native-vector-icons/ionicons'
import { useNavigation } from '@react-navigation/native'
import { saveRegistrationProgress } from '../utils/registrationUtils'
import { PermissionsAndroid, Alert } from 'react-native';
import { useState } from 'react'

const LocationScreen = () => {
  const navigation = useNavigation();
  const [region, setRegion] = useState(null)
  const [location, setLocation] = useState('Loading...')
  const [markerCoordinate, setMarkerCoordinate] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message:
                'This app needs to access your location to show you where you live.',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted');
            getCurrentLocation();
          } else {
            console.log('Location permission denied');
            Alert.alert(
              'Location Permission Denied',
              'You need to grant location permission to use this feature.',
            );
            setLocation('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        getCurrentLocation(); // iOS handles permission differently
      }
    };
  
    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
  
          const initialRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
  
          setRegion(initialRegion);
          setMarkerCoordinate({ latitude, longitude });
          fetchAddress(latitude, longitude);
        },
        error => {
          console.log('Error fetching location:', error);
          if (error.code === 1) {
            setLocation('Permission Denied');
            Alert.alert(
              'Location Permission Denied',
              'Please enable location services for this app in your device settings.',
            );
          } else {
            setLocation('Error Loading Location');
            Alert.alert('Error', 'Could not retrieve your current location.');
          }
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };
  
    requestLocationPermission();
  }, []);

  const fetchAddress = (latitude, longitude) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`,
    )
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          const addressComponents = data?.results[0].address_components;
          let formattedAddress = '';
          for (let component of addressComponents) {
            if (component.types.includes('sublocality_level_1')) {
              formattedAddress += component.long_name + ', ';
            }
            if (component.types.includes('locality')) {
              formattedAddress += component.long_name + ', ';
            }
          }
          formattedAddress = formattedAddress.trim().slice(0, -1);
          setLocation(formattedAddress);
        }
      })
      .catch(error => console.log('Error fetching address:', error));
  };

  const handleNext = () => {
    saveRegistrationProgress('location', location)
    navigation.navigate('Gender')
  }

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 50 : 0, flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 40, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialDesignIcons name="map-marker" size={26} color="black" />

          </View>
          <Image style={{ width: 100, height: 40 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png'
            }}>
          </Image>
        </View>

        <Text style={{
          fontSize: 25, fontWeight: 'bold', fontFamily: 'GeezaPro-Bold'
        }}> Where do you live?
        </Text>

        <MapView
          region={region}
          style={{ width: '100%', height: 500, marginTop: 20, borderRadius: 5 }}>
            { markerCoordinate && (
              <Marker coordinate={{
                markerCoordinate
              }}>
                <View style={{ backgroundColor: 'black', padding: 12, borderRadius: 30 }}>
                  <Text style={{ color: 'white', fontWeight: '500',
                    fontSize: 14, fontFamily: 'GeezaPro-Bold', textAlign: 'center'
                   }}>
                    {location}
                  </Text>
                </View>
              </Marker>
            )}
          </MapView>

          <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 30, marginLeft: 'auto'}}>
          <Ionicons
            name="chevron-forward-circle-outline"
            size={45}
            color="#581845"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LocationScreen

const styles = StyleSheet.create({})