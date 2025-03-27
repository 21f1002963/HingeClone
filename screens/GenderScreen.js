import { StyleSheet, Text, View, SafeAreaView, Platform, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import FontAwesome from '@react-native-vector-icons/fontawesome'
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils'

const GenderScreen = () => {
  const [gender, setGender] = useState('')
  const navigation = useNavigation()
  useEffect(() => {
    getRegistrationProgress('Gender').then(progressData => {
      if(progressData) {
        setGender(progressData.gender || '')
      }
  }, [])
  })
  const handleNext = () => {
    if(gender.trim() !== '') {
      saveRegistrationProgress('Gender', {gender})
    }
    navigation.navigate('Type')
  }
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 50 : 0, flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 30, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
          <MaterialDesignIcons name="gender-male" size={26} color="black" />

          </View>
          <Image style={{ width: 100, height: 40 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png'
            }}>
          </Image>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={{
            fontSize: 25, fontWeight: 'bold', fontFamily: 'GeezaPro-Bold'
          }}>Which gender describes you the best?
          </Text>
        </View>
        <Text style={{fontSize: 15, marginTop: 20, color:"gray"}}>Hinge users are matched based on these gender groups. You can add more about genders after registering</Text>

        <View style={{marginTop: 30}}>
          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom: 20}}>
              <Text style={{fontSize:18, fontWeight:"500"}}>Men</Text>
              <Pressable onPress={() => setGender('Men')}>
              <FontAwesome name="circle" size={26} color={gender =="Men" ? "#581845" : "#F0F0F0"}></FontAwesome>
              </Pressable>
          </View>

          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom: 20}}>
              <Text style={{fontSize:18, fontWeight:"500"}}>Women</Text>
              <Pressable onPress={() => setGender('Women')}>
              <FontAwesome name="circle" size={26} color={gender =="Women" ? "#581845" : "#F0F0F0"}></FontAwesome>
              </Pressable>
          </View>

          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom: 20}}>
              <Text style={{fontSize:18, fontWeight:"500"}}>Non Binary</Text>
              <Pressable onPress={() => setGender('Non Binary')}>
              <FontAwesome name="circle" size={26} color={gender =="Non Binary" ? "#581845" : "#F0F0F0"}></FontAwesome>
              </Pressable>
          </View>
        </View>

        <View style={{marginTop: 30, flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <MaterialDesignIcons name="checkbox-marked" size={25} color='#900C3F'></MaterialDesignIcons>
          <Text style={{fontSize: 15}}>Visible on my profile
          </Text>
        </View>

          <TouchableOpacity
            onPress={handleNext}
            style={{ marginTop: 30, marginLeft: 'auto' }}>
            <Ionicons name="chevron-forward-circle-outline" size={45} color="#581845" />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default GenderScreen

const styles = StyleSheet.create({})