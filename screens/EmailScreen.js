import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native'
import { Image } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Fontisto from "@react-native-vector-icons/fontisto"
import Ionicons from '@react-native-vector-icons/ionicons'
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils'

const EmailScreen = () => {
  const navigation = useNavigation()
  const [Email, setEmail] = useState('');

  useEffect(() => {
    getRegistrationProgress('Email').then(data => {
      if(data){
        setEmail(data.Email || '')
      }
    })
  }, [])

  const handleNext = () => {
    if(Email.trim() !== ''){
      saveRegistrationProgress('Email', {Email})
    }
    navigation.navigate('Password', {
      email: Email
    })
  }

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 50 : 0, flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 80, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <Fontisto name="email" size={26} color="black" />
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
          }}> Provide your email
        </Text>
        <Text
        style = {{
          marginTop: 10,
          fontSize: 15,
          color:"gray"
        }}>
          Email Verification helps us keep the account secure
        </Text>
        <TextInput
          value={Email} 
          onChangeText={ text => setEmail(text)}
          autoFocus={true}
          placeholder='Enter your email'
          placeholderTextColor={"#BEBEBE"}
          style={{
            width:340,
            // marginVertical: 10,
            marginTop: 25,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            fontFamily: 'GeezaPro-Bold',
            fontSize: Email ? 22 : 22
          }}/> 
          <Text style={{color: 'gray', marginTop: 7, fontSize: 15}}>
            Note: You will be asked to verify your email
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

export default EmailScreen

const styles = StyleSheet.create({})