import { StyleSheet, Text, View, SafeAreaView, Platform, Pressable } from 'react-native'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'

const BasicInfo = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 200 : 0 , flex:1, backgroundColor: 'white'}}>
      <View>
        <Text style={{
          fontSize: 32,
          fontWeight: 'bold',
          fontFamily: 'GeezaPro-Bold',
          marginLeft: 20,
        }}>You're one of a kind</Text>
        <Text style={{
          fontSize: 32,
          fontWeight: 'bold',
          fontFamily: 'GeezaPro-Bold',
          marginTop: 10,
          marginLeft: 20,
        }}>Your profile should be too.</Text>
      </View>
      <View>
        <LottieView
        style={{
          height: 150,
          width: 250,
          alignSelf: 'center',
          marginTop: 40,
          justifyContent: 'center',
        }}
        source= {require('../assets/love.json')}
        autoPlay
        loop={true}
        speed={0.7}
        />
      </View>
      <Pressable 
      style={{ backgroundColor: '#900C3F', justifyContent: 'center', alignItems: 'center', marginTop: 'auto', marginBottom: 25, padding: 15}}
      onPress={() => navigation.navigate('Name')}>
        <Text style={{
          color: 'white',
          fontSize: 18,
          fontWeight: '600',
          fontFamily: 'GeezaPro',

        }}>Enter Basic Info</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default BasicInfo

const styles = StyleSheet.create({})