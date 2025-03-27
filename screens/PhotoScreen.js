import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { TextInput } from 'react-native'
import { Pressable } from 'react-native'
import  EvilIcons  from '@react-native-vector-icons/evil-icons'
import { Button } from 'react-native'
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils'

const PhotoScreen = () => {
  const [imgUrls, setImgUrls] = useState(['', '', '', '', '',''])
  const [imgUrl, setImgUrl] = useState('')
  useEffect(() => {
    getRegistrationProgress('Photos').then(progress => {
      if (progress) {
        setImgUrls(progress.imgUrls)
      }
    })
  }, [])
  const handleNext = () => {
    saveRegistrationProgress('Photos',{imgUrls})
    navigation.navigate('Prompts')
  }
  const navigation = useNavigation()
  const handleAddImage = () => {
    const index = imgUrls?.findIndex(url => url === '')
    if (index !== -1) {
      const updatedImgUrls = [...imgUrls]
      updatedImgUrls[index] = imgUrl
      setImgUrls(updatedImgUrls)
      setImgUrl('')
    }
  }
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 50 : 0, flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 30, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
          <MaterialIcons name="photo-camera-back" size={26} color="black" />

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
          }}>Pick your photos and videos
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            {imgUrls?.slice(0,3).map((url, index) => (
              <Pressable key={index} onPress={() => setImgUrl(url)}
              style={{
                borderColor: '#581845',
                borderWidth: url ? 0 : 2,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'dashed',
                borderRadius: 10,
                height: 100, 
              }}>
                {url ? (
                  <Image 
                  src={{uri: url}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    resizeMode: 'cover'
                  }}></Image>
                ) :(
                  <EvilIcons name="image" size={22} color="black" />
                )}
              </Pressable>  
            ))}
          </View>

          <View style={{ marginTop: 20 }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            {imgUrls?.slice(3, 6).map((url, index) => (
              <Pressable key={index} onPress={() => setImgUrl(url)}
              style={{
                borderColor: '#581845',
                borderWidth: url ? 0 : 2,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'dashed',
                borderRadius: 10,
                height: 100, 
              }}>
                {url ? (
                  <Image 
                  src={{uri: url}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    resizeMode: 'cover'
                  }}></Image>
                ) :(
                  <EvilIcons name="image" size={22} color="black" />
                )}
              </Pressable>  
            ))}
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ color: 'gray', fontSize: 15 }}>
              Drag to reorder
            </Text>

            <Text style={{marginTop: 4, color: '#581845', fontWeight: '500', fontSize: 15}}>Add four to six photos</Text>
          </View>

          <View style={{marginTop: 25}}>
            <Text>Add a picture of yourself</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 5, marginTop: 10, backgroundColor: "#DCDCDC", paddingVertical: 6}}>
              <EvilIcons name="image" size={22} color="black" style={{marginLeft: 8}}/>
              <TextInput 
              value={imgUrl}
              onChangeText={text=> setImgUrl(text)}
              style={{marginVertical: 10, color: 'black', width: 300}}
              placeholder="Enter your image URL"
              placeholderTextColor="black"
              ></TextInput>
            </View>

            <Button onPress={handleAddImage} title="Add Image"></Button>
          </View>
          </View>
          <TouchableOpacity
            onPress={handleNext}
            style={{ marginTop: 30, marginLeft: 'auto' }}>
            <Ionicons name="chevron-forward-circle-outline" size={45} color="#581845" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >
  )
}

export default PhotoScreen

const styles = StyleSheet.create({})