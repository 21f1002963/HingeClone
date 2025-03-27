import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SendLikeScreen = () => {
    const [ comment, setComment ] = useState('')
    const route = useRoute();
    const likedProfile = async () => {
        try{
            const token = await AsyncStorage.getItem('token')
            const payload = {
                userId : route?.params?.userId,
                likedUserId : route?.params?.likedUserId,
                image: route?.params?.image,
                prompt: route?.params?.prompt,
                type: route?.params?.type,
            }

            if(comment && comment.trim() !== ''){
                payload.comment = comment.trim()
            }

            const response = await axios.post(`${BASE_URL}/like-profile`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response)

            if(resonse == 200){
                navigation.goBack()
            }
        } catch(e) {
            console.log(e)
        }   
    }   
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(240, 240, 240, 1)'}}>
        <View style={{marginTop: 'auto', marginBottom: 'auto', marginHorizontal: 25}}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>{route?.params?.name}</Text>

        {route?.params?.type === 'image' ? (
            <View
            style={{
                width: '100%',
                height: 350,
                borderRadius: 10,
                marginTop: 20,
                overflow: 'hidden',
                backgroundColor: 'white'
            }}>
                <Image style={{ width: '100%', height: '100%', resizeMode: 'cover'}}
                source={{uri: route?.params?.image}}></Image>
            </View>
        ) : (
            <View style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 5,
                width: '100%',
                justifyContent: 'center',
                marginTop: 20,
                height: 200
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#333',
                    textAlign: 'left',
                    marginBottom: 10
                }}>{route?.params?.prompt?.question}</Text>
                <Text numberOfLines={3}
                style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    textAlign: 'left',
                }}>{route?.params?.prompt?.answer}</Text>
            </View>
        )}

        <TextInput
            value={comment}
            onChangeText={text => setComment(text)}
            placeholder="Add a comment"
            style={{
                backgroundColor: 'white',
                padding: 15,
                borderRadius: 8,
                marginTop: 14,
                fontSize: comment ? 17 : 17
            }}/>

            <View style={{
                flexDirection: 'row',
                marginVertical: 12,
                alignItems: 'center',
                gap: 10
            }}>
                <Pressable style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: '#ead8f0',
                    borderRadius: 30,
                    paddingHorizontal: 25,
                    paddingVertical: 20,
                    gap: 4
                }}>
                    <Text style={{ fontSize: 15, fontWeight:'bold'  }}>2</Text>
                    <Ionicons name="rose" size={22} color="#a04aba" />
                </Pressable>

                <Pressable 
                onPress={likedProfile}
                style={{
                    backgroundColor: '#d4badb',
                    borderRadius: 30,
                    padding: 20,
                    flex: 1
                }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>Send Like</Text>
                </Pressable>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default SendLikeScreen

const styles = StyleSheet.create({})