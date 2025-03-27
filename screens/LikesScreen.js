import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable } from 'react-native'

const LikesScreen = () => {
  const navigation = useNavigation()
  const {isLoading, setIsLoading} = useState(true)
  const {userId} = useContext(AuthContext)
  const {likes, setLikes} = useState([])

  useFocusEffect(
    useCallback(() => {
      if(userId){
        fetchRecievedLikes();
      }
    }, [userId])
  )

  const fetchRecievedLikes = async () => {
    try{
      const token = await AsyncStorage.getItem('token')
      const response = await axios.get(`${BASE_URL}/received-likes/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const receivedLikes = response.data.receivedLikes;
      setLikes(receivedLikes)
    } catch(error){
      console.log("Error", error)
    } finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRecievedLikes()
  }, [userId])

  const screenWidth = Dimensions.get('window').width
  const profileWidth = (screenWidth - 46) / 2

  const renderProfile = ({item: like}) => {
    <Pressable style={{
      width: profileWidth,
      marginVertical: 10,
      borderColor: '#E0E0E0',
      borderWidth: 0.5,
      borderRadius: 7
    }}>
      <View style={{paddingHorizontal: 10, paddingTop: 10}}>
      {like?.comment ? (
        <View style={{
          alignSelf: 'flex-start',
          backgroundColor: '#fae8e0',
          borderRadius: 5,
          marginBottom: 8,
          alignSelf: 'flex-start',
          maxWidth: profileWidth-20,
          paddingHorizontal: 12,
          paddingVertical: 10
        }}>
          <Text numberOfLines={1} ellipsizeMode='tail'>{like?.comment}</Text>
        </View>
      ) : (
        <View style={{
          alignItems : 'flex-start',
          paddingVertical: 10,
          borderRadius: 5,
          marginBlock : 8,
          alignSelf: 'flex-start',
        }}>
          <Text style={{fontStyle: 'italic'}}>Liked your photo</Text>
        </View>
      )}
      <Text style={{
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 10
      }}>{like.userId?.firstName}</Text>

      <View style={{
        height: 220,
        width: profileWidth,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      }}>
        <Image source={{uri: like?.userId?.imageUrls[0]}}></Image>
      </View>
      </View> 
    </Pressable>
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'white', justifyContent: likes.length > 0 ? 'flex-start' : 'center', padding: 15}}>
        {likes.length > 0 ? (
          <>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
                <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              fontFamily: 'GeezaPro-Bold',
              marginTop: 15 }}>Likes You</Text>

              <Pressable style={{
                  backgroundColor: '#008B8B',
                  padding: 10,
                  borderRadius: 30
                }}>
                <Text style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>Boost</Text>
              </Pressable>
            </View>

            <Pressable style={{
              marginTop: 13,
              flexDirection: 'row',
              borderColor: '#E0E0E0',
              borderWidth: 1,
              alignSelf: 'flex-start',
              gap: 6,
              alignItems: 'center',
              paddingVertical: 7,
              paddingHorizontal: 10,
              borderRadius: 24
            }}>
              <Text style={{color: '#404040', fontWeight: '500'}}>Recent</Text>
              <MaterialDesignIcons name="chevron-down" size={22} color="gray" />
            </Pressable>

            <View style={{marginTop: 15}}>
                {likes.length > 0 && (
                  <Pressable style={{
                    padding: 10,
                    borderColor: '#E0E0E0',
                    borderWidth: 2,
                    borderRadius: 7
                  }}>
                    <View>
                      <View style={{
                        alignItems: 'flex-start',
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        backgroundColor: '#fae8e0',
                        borderRadius: 5,
                        marginBottom: 8,
                        alignSelf: 'flex-start'
                      }}>
                        <Text>{likes[0].comment ? likes[0].comment : likes[0].type=='prompt' ? 'Liked your prompt' : likes[0].type=='image' ? 'Liked your photo' : 'Like your content'}</Text>
                      </View>

                      <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold'
                      }}>{likes[0].userId?.firstName}
                      </Text>
                      <Image style={{width: '100%', height: 350, resizeMode: 'cover', marginTop: 20, borderRadius: 10}}
                      source={{uri: likes[0].userId?.imageUrls[0]}}></Image>
                    </View>
                  </Pressable>
                )}
            </View>

            {likes?.length > 1 && (
              <View>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontFamily: 'GeezaPro-Bold',
                  marginTop: 20
                }}>Up Next</Text>
                <Text style={{
                  marginTop: 4,
                  color: '#282828'
                }}>Subscribe to see everyone who likes you</Text>
              </View>   
            )}

            <View style={{
              backgroundColor: '#e0ceed',
              padding: 12,
              borderRadius: 10,
              gap: 10,
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 5,
              paddingBottom: 15
            }}>
              <View>
                <Text style={{
                  fontSize: 18,
                  fontWeight: '600',
                  width: 280
                }}>
                  Meet {likes[1].userId?.firstName} and {likes.length - 2} others who like you 
                </Text>
                <Pressable style={{
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  backgroundColor: '#8446b0',
                  marginTop: 10,
                  alignSelf: 'flex-start',
                  borderRadius: 10
                }}>
                  <Text style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 13
                  }}>Get Hinge +</Text>
                </Pressable>
              </View>

              <View style={{position: 'relative'}}>
              <Image
                  source={{
                    uri: 'https://www.instagram.com/p/C27SU9sNMXO/media/?size=l',
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    position: 'absolute',
                    top: 0,
                    left: 20,
                    transform: [{rotate: '-10deg'}],
                    zIndex: 2,
                    borderWidth: 2,
                    borderColor: 'white',
                  }}
                />

                <Image
                  source={{
                    uri: 'https://www.instagram.com/p/C1Rzh7KJ0OY/media/?size=l',
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    position: 'absolute',
                    top: 40,
                    left: 0,
                    transform: [{rotate: '10deg'}],
                    zIndex: 1,
                    borderWidth: 2,
                    borderColor: 'white',
                  }}
                />
              </View>
            </View>

            
          </>
        ) : (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image
              style={{width: 100, height: 100}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/38/38384.png',
              }}
            />
            <View>
              <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                You're new here, no likes yet
              </Text>
              <Text style={{
                color:'gray',
                marginTop: 10,
                fontSize: 15,
                textAlign: 'center'
              }}>We can help you to get your first one sooner</Text>
            </View>

            <View style={{marginTop:50}}></View>

            <Pressable style={{
              padding: 12,
              borderRadius: 22,
              backgroundColor: '#0a7064',
              width: 250
            }}  >
              <Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 15,
                color: 'white'
              }}>Boost your Profile</Text>
            </Pressable> 

            <Pressable style={{
              padding: 12,
              borderRadius: 22,
              backgroundColor: '#0a7064',
              width: 250,
              borderColor:'#E0E0E0',
              borderWidth: 1,
              marginTop: 15
            }}>
                <Text style={{
                  textAlign: 'center',
                  fontWeight: '500',
                  fontSize: 13,
                }}>Upgrade to HingeX</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default LikesScreen

const styles = StyleSheet.create({})