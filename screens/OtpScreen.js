import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../urls/url';
import { Alert } from 'react-native';


const OtpScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputs = useRef([]);
  const route = useRoute();
  const navigation = useNavigation();
  const email = route?.params?.email;

  const handleConfirmSignUp = async () => {
    const enteredotp = otp.join('');
    console.log("OTP entered is", enteredotp);

    if(!email || !enteredotp){
      return;
    } 
    try{
      const response = await axios.post(`${BASE_URL}/confirmSignUp`, {email, enteredotp});
      if(response.status === 200){
        console.log("OTP confirmed successfully");
        navigation.navigate('Birth')
      }
    } catch(error){
      console.log("Error confirming the otp", error);
    }
  }

  useEffect(()=>{
    if(otp.every(digit => digit !== '')){
      console.log("ALl digits entered");
      handleConfirmSignUp()
    }
  }, [otp])

  const handleChange = (text, index) => {
    const newOtp = [...otp]
    console.log(newOtp);
    newOtp[index] = text;
    setOtp(newOtp)

    if(text && index < 5){
      inputs.current[index+1]?.focus();
    }
  }

  const handleBackspace = (text, index) => {
    if(!text && index > 0){
      inputs.current[index-1]?.focus();
    }
    const newOtp = [...otp]
    newOtp[index] = text;
    setOtp(newOtp)
  }

  const handleResendOtp = async () => {
    setOtp(['', '', '', '', '', ''])
    inputs.current[0]?.focus()
    try{
      const response = await axios.post(`${BASE_URL}/resendOtp`, {email});
      console.log("OTP resent successfully", response.data);
    }catch(erro){
      console.log("Error resending the OTP", error);
    }
  }
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 50 : 0, flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      <View style = {{
        height: 60,
        justifyContent:'center',
        alignItems:'center',
        marginTop:50
      }}>
        <Text style={{
          fontSize: 18, 
          fontWeight: '500'
        }}>Verification code</Text>
        <Text style={{
          fontSize: 14,
          color: 'gray',
          marginTop: 5
        }}>Enter the 6 digit code sent to your email</Text>
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 30
      }}>
        {otp?.map((_, index) => (
          <TextInput
          key={index}
          ref = {el => (inputs.current[index] = el)}
          keyboardType="number-pad"
          style={{
            width: 45,
            height: 45,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            textAlign: 'center',
            fontSize: 18,
            color: '#333'

          }}
          maxLength={1}
          value={otp[index]}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={({nativeEvent}) => {
            if(nativeEvent.key == "BackSpace"){
              handleBackspace(otp[index], index)
            }
          }}
          autoFocus={index===0}>
          </TextInput>
        ))}
      </View>
      
      <View style={{marginTop: 30}}>
        <Button onPress={handleResendOtp} title="Resend OTP"></Button>
      </View>
    </SafeAreaView>
  )
}

export default OtpScreen

const styles = StyleSheet.create({})