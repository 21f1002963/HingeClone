import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { AuthContext } from '../AuthContext'
import { useEffect } from 'react'
import UserChat from '../components/UserChat'

const ChatScreen = () => {
  const [matches, setMatches] = useState([])
  const {userId, setUserId} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [categorizedChats, setCategorizedChats] = useState({
    yourTurn: [],
    theirTurn: [],
  })

  const fetchMatches = async () => {
    try{
      const token = await AsyncStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/get-matches/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setMatches(response.data.matches)
    }catch(error){
      console.error(error)
    } finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(userId) {
      fetchMatches()
    }
  }, [userId])

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F8F8F8',
        }}>
        <LottieView
          source={require('../assets/loading2.json')}
          style={{
            height: 180,
            width: 300,
            alignSelf: 'center',
            marginTop: 40,
            justifyContent: 'center',
          }}
          autoPlay
          loop={true}
          speed={0.7}
        />
      </View>
    );
  }

  return (
    <ScrollView style={{marrginTop: 55}} contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', justifyContent: matches?.length > 0 ? 'flex-start' : 'center' }}> 
      <View>
        <View style={{marginVertical: 12, marginHorizontal: 15}}>
          {matches?.length > 0 ? (
            <>
              <Text style={{fontSize: 22, fontWeight: 'bold', marginVertical: 12}}>Matches</Text>  

              {matches?.map((item, index) => (
                <UserChat key={index} item={item} userId={userId}/>
              ))}
            </>
          ) : (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{width: 100, height: 100}}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/5065/5065340.png',
                }}
              />

              <View style={{marginTop: 50}}>
                  <Text style={{fontSize: 22, fontWeight: 'bold', textAlign: 'center'}}>No Matches right now</Text>
                  <Text style={{color: 'gray', marginTop: 10, fontSize: 15, textAlign: 'center'}}>Matches are more considered on hinge. We can help improve your chances</Text>
              </View>

              <View style={{marginTop: 50}} />

              <Pressable
                style={{
                  padding: 12,
                  borderRadius: 22,
                  backgroundColor: '#0a7064',
                  width: 250,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: 15,
                    color: 'white',
                  }}>
                  Boost Your Profile
                </Text>
              </Pressable>

              <Pressable
                style={{
                  padding: 12,
                  borderRadius: 22,

                  borderColor: '#E0E0E0',
                  borderWidth: 1,
                  marginTop: 15,
                  width: 250,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: 15,
                  }}>
                  Upgrage to HingeX
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})