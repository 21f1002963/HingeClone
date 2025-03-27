import { StyleSheet, Text, View, SafeAreaView, Platform, Pressable, ActivityIndicator } from 'react-native'
import {useState, useEffect, useContext} from 'react';
import LottieView from 'lottie-react-native'
import { AuthContext } from '../AuthContext'
import axios from 'axios'
import { BASE_URL } from '../urls/url'
import { getRegistrationProgress } from '../utils/registrationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreFinalScreen = () => {
  const [userData, setUserData] = useState()
  const [loading, setLoading] = useState(false)
  const { token, setToken } = useContext(AuthContext)

  const getAllUserData = async () => {
    try {
      const screens = [
        'Name',
        'Email',
        'Password',
        'Birth',
        'Location',
        'Gender',
        'Type',
        'Dating',
        'LookingFor',
        'Hometown',
        'Workplace',
        'JobTitle',
        'Photos',
        'Prompts',
      ]; 
      let userData = {};
      for(const screenName of screens) {
        const screenData = await getRegistrationProgress(screenName)
        console.log('Screen data', screenName, screenData);
        if(screenData){
          userData = {...userData, ...screenData}
        }
      }
      setUserData(userData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllUserData()
  }, [])

  console.log('User', userData)

  const clearAllScreenData = async () => {
    try {
      const screens = [
        'Name',
        'Email',
        'Password',
        'Birth',
        'Location',
        'Gender',
        'Type',
        'Dating',
        'LookingFor',
        'Hometown',
        'Workplace',
        'JobTitle',
        'Photos',
        'Prompts',
      ];

      for (const screenName of screens) {
        const key = `registration_progress_${screenName}`;
        await AsyncStorage.removeItem(key);
      }

      console.log('All screen data cleared!');
    } catch (error) {
      console.log('Error', error);
    }
  };

  const registerUser = async () => {
    try {
      setLoading(true)
      const response = await axios
        .post(`${BASE_URL}/register`, userData)
        .then(response => {
          console.log('Response', response);
          const newToken = response.data.token;
          AsyncStorage.setItem('token', newToken);
          setToken(newToken);
          // navigation.navigate('MainStack');
        });
      clearAllScreenData()
    }
    catch(error) {
      console.log("Error", error)
  }finally{
    setLoading(false);
  }
  }

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 200 : 0 , flex:1, backgroundColor: 'white'}}>
      <View>
        <Text style={{
          fontSize: 32,
          fontWeight: 'bold',
          fontFamily: 'GeezaPro-Bold',
          marginLeft: 20,
        }}>All set to register</Text>
        <Text style={{
          fontSize: 32,
          fontWeight: 'bold',
          fontFamily: 'GeezaPro-Bold',
          marginTop: 10,
          marginLeft: 20,
        }}>Setting up your profile for you.</Text>
      </View>
      <View>
        <LottieView
        style={{
          height: 150,
          width: 250,
          alignSelf: 'center',
          marginTop: 40,
          justifyContent: 'center',
        }}
        source= {require('../assets/love.json')}
        autoPlay
        loop={true}
        speed={0.7}
        />
      </View>
      <Pressable 
      onPress={registerUser}
      style={{ backgroundColor: '#900C3F', justifyContent: 'center', alignItems: 'center', marginTop: 'auto', padding: 15}}>
        {loading ? (<ActivityIndicator size='small' color='white' />) :(
        <Text style={{
          color: 'white',
          fontSize: 18,
          fontWeight: '600',
          fontFamily: 'GeezaPro',
        }}>Finish Registering</Text>)}
      </Pressable>
    </SafeAreaView>
  )
}

export default PreFinalScreen

const styles = StyleSheet.create({})