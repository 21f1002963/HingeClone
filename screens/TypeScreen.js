import { StyleSheet, Text, View, SafeAreaView, Platform, Pressable } from 'react-native'
import { Image } from 'react-native';
import { TouchableOpacity }  from 'react-native';
import { useEffect } from 'react'
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import Ionicons  from '@react-native-vector-icons/ionicons';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils';
import { useState } from 'react';

const TypeScreen = () => {
  const [type, setType] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('Type').then((progress) => {
      if(progress) {
        console.log('Progress', progress.type);
        setType(progress.type || '');
      }
    })
  }, [])
  const handleNext = () => {
    if(type.trim() !== '') {
      saveRegistrationProgress('Type', {type})
    }
    navigation.navigate('Dating');
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
          }}>What's your sexuality?
          </Text>
        </View>
        <Text style={{fontSize: 15, marginTop: 20, color:"gray"}}>Hinge users are matched based on these type groups. You can add more about genders after registering</Text>

        <View style={{marginTop: 30, flexDirection:"column", gap:12}}>
          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
              <Text style={{fontSize:18, fontWeight:"500"}}>Straight</Text>
              <Pressable onPress={() => setType('Straight')}>
              <FontAwesome name="circle" size={26} color={type =="Straight" ? "#581845" : "#F0F0F0"}></FontAwesome>
              </Pressable>
          </View>

          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
              <Text style={{fontSize:18, fontWeight:"500"}}>Gay</Text>
              <Pressable onPress={() => setType('Gay')}>
              <FontAwesome name="circle" size={26} color={type =="Gay" ? "#581845" : "#F0F0F0"}></FontAwesome>
              </Pressable>
          </View>

          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
              <Text style={{fontSize:18, fontWeight:"500"}}>Lesbian</Text>
              <Pressable onPress={() => setType('Lesbian')}>
              <FontAwesome name="circle" size={26} color={type =="Lesbian" ? "#581845" : "#F0F0F0"}></FontAwesome>
              </Pressable>
          </View>

          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
              <Text style={{fontSize:18, fontWeight:"500"}}>Bisexual</Text>
              <Pressable onPress={() => setType('Bisexual')}>
              <FontAwesome name="circle" size={26} color={type =="Bisexual" ? "#581845" : "#F0F0F0"}></FontAwesome>
              </Pressable>
          </View>

          <View style={{marginTop: 30, flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <MaterialDesignIcons name="checkbox-marked" size={25} color='#900C3F'></MaterialDesignIcons>
            <Text style={{fontSize: 15}}>Visible on my profile</Text>
          </View>
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

export default TypeScreen

const styles = StyleSheet.create({})