import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native'
import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Ionicons  from '@react-native-vector-icons/ionicons'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import FontAwesome from '@react-native-vector-icons/fontawesome'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils'

const DatingType = () => {
  const navigation = useNavigation()
  const [datingPreference, setDatingPreference] = useState([])
  const chooseOption = (option) => {
    if (datingPreference.includes(option)) {
      setDatingPreference(datingPreference.filter(item => item !== option))
    } else {
      setDatingPreference([...datingPreference, option])
    }
  }

  useEffect(() => {
    getRegistrationProgress('Dating').then((data) => {
      if (data) {
        setDatingPreference(data.datingPreference || [])
      }
    })
  }, [])

  const handleNext = () => {
    if (datingPreference.length > 0) {
      saveRegistrationProgress('Dating', { datingPreference })
    }
    navigation.navigate('LookingFor')
  }

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 50 : 0, flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 30, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
          <MaterialDesignIcons name="datingPreference.includes()-male" size={26} color="black" />

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
          }}>Who do you want to date?
          </Text>
        </View>
        <Text style={{fontSize: 15, marginTop: 20, color:"gray"}}>Select all people you're open to meeting</Text>

        <View style={{marginTop: 30}}>
          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom: 20}}>
              <Text style={{fontSize:18, fontWeight:"500"}}>Men</Text>
              <Pressable onPress={() => chooseOption('Men')}>
              <FontAwesome name="circle" size={26} color={datingPreference.includes('Men') ? "#581845" : "#F0F0F0"}></FontAwesome>
              </Pressable>
          </View>

          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom: 20}}>
              <Text style={{fontSize:18, fontWeight:"500"}}>Women</Text>
              <Pressable onPress={() => chooseOption('Women')}>
              <FontAwesome name="circle" size={26} color={datingPreference.includes('Women') ? "#581845" : "#F0F0F0"}></FontAwesome>
              </Pressable>
          </View>

          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom: 20}}>
              <Text style={{fontSize:18, fontWeight:"500"}}>Everyone</Text>
              <Pressable onPress={() => chooseOption('Everyone')}>
              <FontAwesome name="circle" size={26} color={datingPreference.includes("Everyone") ? "#581845" : "#F0F0F0"}></FontAwesome>
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

export default DatingType

const styles = StyleSheet.create({})