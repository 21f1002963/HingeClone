import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Pressable } from 'react-native'
import  AntDesign  from '@react-native-vector-icons/ant-design'
import { useRoute } from '@react-navigation/native'
import { saveRegistrationProgress, getRegistrationProgress } from '../utils/registrationUtils'

const PromptsScreen = () => {
  const [prompts, setPrompts] = useState([
    {question: '', answer: ''},
    {question: '', answer: ''},
    {question: '', answer: ''},
  ])
  const route = useRoute()
  const navigation = useNavigation()
  const handleNext = () => {
    saveRegistrationProgress('Prompts', {prompts})
    navigation.navigate('PreFinal')
  }
  useEffect(() => {
    getRegistrationProgress('Prompts').then(data => {
      if(data){
        setPrompts(data.prompts)
      }
    })
    if (route?.params?.prompts) {
      setPrompts(route?.params?.prompts)
    }
  }, [route.params])
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 50 : 0, flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 30, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
          <AntDesign name="eye" size={26} color="black" />

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
          }}>Write your profile answers
          </Text>
        </View>

        <View style={{ marginTop: 20, flexDirection: 'column', gap:20 }}>
          {prompts.map((item, index) => (
            <Pressable 
            onPress = {() => {
              navigation.navigate('ShowPrompts', {prompts, index, setPrompts})
            }}
            key={index} style={{
              borderColor: '#707070', borderWidth: 2, borderRadius: 10, justifyContent: 'center',
              height: 70, borderStyle: 'dashed', alignItems: 'center'   
            }}>
              {item?.question && item?.answer ? (
                <>
                  <Text style={{fontWeight: '600', fontStyle: 'italic', fontSize: 15}}>{item?.question}</Text>
                  <Text style={{fontWeight: '600', fontStyle: 'italic', fontSize: 15, marginTop: 3, textAlign: 'center'}}>{item?.answer}</Text>
                </>
                ) : (
                  <>
                  <Text style={{color: 'gray', fontWeight:'600', fontStyle:'italic', fontSize: 15}}>Select a prompt</Text>
                  <Text style={{color: 'gray', fontWeight:'600', fontStyle:'italic', marginTop: 3, fontSize: 15}}>And write your own answer</Text>
                  </>
                )}
            </Pressable>
          ))}
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

export default PromptsScreen

const styles = StyleSheet.create({})