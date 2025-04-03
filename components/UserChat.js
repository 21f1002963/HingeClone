import { Pressable, StyleSheet, Text, View } from 'react-native'
import http from 'http'
import {Server} from 'socket.io'
import { useEffect } from 'react'

const UserChat = ({item, userId}) => {
  const [lastMessage, setLastMessage] = useState([])
  const navigation = useNavigation()
  const {socket} = useContext(SocketContext)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try{
      const senderId = userId
      const receiverId = item?.userId
      const response = await axios.get(`${BASE_URL}/messages`,{
        params: {
          senderId,
          receiverId
        }
      })
      setMessages(response.data)
      setLastMessage(response.data[response.data.length - 1])
    }catch(error){
      console.log(error)
    }
  }

  return (
    <Pressable 
    onPress={()  => 
      navigaiton.navigate('ChatRoom', {
        senderId: userId,
        receiverId: item?.userId,
        name: item?.firstName,
        image: item?.imageUrls[0],
      })
    }
    style={{flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 12}}>
      <View>
      <Image
          style={{width: 70, height: 70, borderRadius: 35}}
          source={{uri: item?.imageUrls[0]}}
        />
      </View>

      <View>
        <Text style={{
            fontWeight: '500',
            fontSize: 16,
            fontFamily: 'GeezaPro-Bold',
          }}>{item?.firstName}</Text>
        <Text style={{fontWeight: '500', fontSize: 15, marginTop: 6}}>{lastMessage ? lastMessage?.message : `Start Chat with {item?.firstName}`}</Text>
      </View>
    </Pressable>
  )
}

export default UserChat

const styles = StyleSheet.create({})