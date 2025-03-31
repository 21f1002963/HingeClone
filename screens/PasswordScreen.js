import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons"
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Ionicons from "@react-native-vector-icons/ionicons"
import { saveRegistrationProgress } from '../utils/registrationUtils';
import axios from 'axios';
import { BASE_URL } from '../urls/url';
import { useState } from 'react';
import { useEffect } from 'react';

const PasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route?.params?.email;
  const [password, setPassword] = useState('');
  
  const handleSendOtp = async () =>{
    if(!email) console.log("Email is required");
    try{
      const response = await axios.post(`${BASE_URL}/sendOtp`, {
        email: email,
        password: password
      });
      console.log("OTP sent successfully", response.data);
      navigation.navigate('OTP', { email: email });
    }catch(error){
      if (error.response) {
        console.log("Error response data:", error.response.data); 
      }
      console.log("Error sending the otp", error);
    }
  }

  const handleNext = () => {
    if(password.trim() !== '') {
      saveRegistrationProgress('Password', {password})
    }
    handleSendOtp();
  }
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 50 : 0, flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 80, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialDesignIcons name="lock" size={26} color="black" />
          </View>
          <Image style={{ width: 100, height: 40 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png'
            }}>
          </Image>
        </View>
        <Text style={{
            fontSize: 25, fontWeight: 'bold', fontFamily: 'GeezaPro-Bold',
            marginTop: 15
          }}> Please choose a password
        </Text>
        <TextInput
          value={password} 
          onChangeText={ text => setPassword(text)}
          autoFocus={true}
          secureTextEntry={true}
          placeholder='Enter your password'
          placeholderTextColor={"#BEBEBE"}
          style={{
            width:340,
            marginVertical: 20,
            marginTop: 25,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            fontFamily: 'GeezaPro-Bold',
            fontSize: password ? 22 : 22,
            color: 'black'
          }}/> 
          <Text style={{color: 'gray', marginTop: 7, fontSize: 15}}>
            Note: Your details will be safe with us
          </Text>
          <TouchableOpacity 
          onPress= {handleNext}
          style={{ marginTop: 30, marginLeft: 'auto'}}>
            <Ionicons name="chevron-forward-circle-outline" size={45} color="#581845"/>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PasswordScreen

const styles = StyleSheet.create({})