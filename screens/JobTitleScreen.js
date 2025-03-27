import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { TextInput } from 'react-native'
import { saveRegistrationProgress, getRegistrationProgress } from '../utils/registrationUtils'
import { useEffect } from 'react'

const JobTitleScreen = () => {
  const [Jobtitle, setJobtitle] = useState('')
  const navigation = useNavigation() 
  useEffect(() => {
      getRegistrationProgress('Jobtitle').then((progress) => {
        if(progress){
          setJobtitle(progress.Jobtitle || '')
        }
      })
    }, []) 
  const handleNext = () => {
    if(Jobtitle.trim() !== ''){
      saveRegistrationProgress('Jobtitle', {Jobtitle})
    }
    navigation.navigate('Photos')
  }
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 50 : 0, flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 30, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
          <MaterialDesignIcons name="lan" size={26} color="black" />

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
          }}>What's your job title?
          </Text>
        </View>

        <TextInput autoFocus={true} 
        value={Jobtitle}
        onChangeText={text => setJobtitle(text)}
        placeholder='Jobtitle'
        style={{
          width:340,
          marginTop: 25,
          borderBottomWidth: 1,
          borderBottomColor: 'black',
          paddingBottom:10,
          fontFamily: 'GeezaPro-Bold',
          fontSize: Jobtitle ? 22 : 22,
        }}></TextInput>

          <TouchableOpacity
            onPress={handleNext}
            style={{ marginTop: 30, marginLeft: 'auto' }}>
            <Ionicons name="chevron-forward-circle-outline" size={45} color="#581845" />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default JobTitleScreen

const styles = StyleSheet.create({})