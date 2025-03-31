import {
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useContext, useCallback} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {AuthContext} from '../AuthContext';
import 'core-js/stable/atob';
import axios from 'axios';
import {BASE_URL} from '../urls/url';
import Ionicons from '@react-native-vector-icons/ionicons';
import Entypo from '@react-native-vector-icons/entypo';
import LottieView from 'lottie-react-native';

const HomeScreen = () => {
  const navigation = useNavigation()
  const { userId, setUserId, token, setToken } = useContext(AuthContext)
  const [ users, setUsers ] = useState([])
  const [ currentProfile, setCurrentProfile ] = useState([users[0]]);
  const { options, setOptions } = useState("Age");
  

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token')
      const decodedtoken = jwtDecode(token)
      const userId = decodedtoken.userId
      setUserId(userId)
    }
    fetchUser();
  }, [])

  // useEffect(() => {
  //   fetchUsers()
  // }, [userId])

  useEffect(() => {
    if(users.length > 0){
      setCurrentProfile(users[0])
    }
  }, [users])
   
  // THIS BRINGS UP THE NEXT PROFILE
  useFocusEffect(
    useCallback(() => {
      if(userId){
        fetchMatches()
      }
    }, [userId])
  )

  const fetchMatches = async() => {
    try{
      const response = await axios.get(`${BASE_URL}/matches/${encodeURIComponent(userId)}`)
      const matches = response.data.matches;
      setUsers(matches)
    } catch(error){
      console.log("Error fetching matches", error)
    }
  }

  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken('');
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <>
    <ScrollView contentContainerStyle={{flexGrow: 1, marginTop:55, }}>
      <View style = {{flexDirection: 'row', padding: 10, alignItems: 'center', gap: 10}}>
        <Pressable
        onPress={logout} 
        style={{
          width: 38,
          height: 38,
          borderRadius: 19,
          backgroundColor: '#D0D0D0',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Ionicons name="sparkles-sharp" size={22} color="black"/>
        </Pressable>

        <Pressable onPress={() => setOptions("Age")}  
        style={{
          borderColor: options === "Age" ? 'transparent' : '#808080',
          borderWidth: 0.7,
          borderRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 8,
          backgroundColor: options === "Age" ? 'black' : 'transparent',
        }}>
          <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '400',
            color: options === "Age" ? 'white' : '#808080',
          }}>Age</Text>
        </Pressable>

        <Pressable onPress={() => setOptions("Height")}  
        style={{
          borderColor: options === "Height" ? 'transparent' : '#808080',
          borderWidth: 0.7,
          borderRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 8,
          backgroundColor: options === "Height" ? 'black' : 'transparent',
        }}>
          <Text style={{
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '400',
            color: options === "Height" ? 'white' : '#808080',
          }}>Height</Text>
        </Pressable>

        <Pressable onPress={() => setOptions("Dating Intention")}  
        style={{
          borderColor: options === "Dating Intention" ? 'transparent' : '#808080',
          borderWidth: 0.7,
          borderRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 8,
          backgroundColor: options === "Dating Intention" ? 'black' : 'transparent',
        }}>
          <Text style={{
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '400',
            color: options === "Dating Intention" ? 'white' : '#808080',
          }}>Dating Intention</Text>
        </Pressable>

        <Pressable onPress={() => setOptions("Nearby")}  
        style={{
          borderColor: options === "Nearby" ? 'transparent' : '#808080',
          borderWidth: 0.7,
          borderRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 8,
          backgroundColor: options === "Nearby" ? 'black' : 'transparent',
        }}>
          <Text style={{
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '400',
            color: options === "Nearby" ? 'white' : '#808080',
          }}>Nearby</Text>
        </Pressable>
      </View>

      <View style={{marginHorizontal: 12, marginVertical: 12}}>
        <>
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', alignItems:'center', gap: 10}}>
                <Text style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                }}>{currentProfile?.firstName}</Text>
                <View style={{
                  backgroundColor: '#452c63',
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 20, 
                }}>
                  <Text style={{textAlign: 'center', color:'white'}}>New here</Text>
                </View>

                <View>
                  <Entypo name='dots-three-horizontal' size={22} color='black'></Entypo>
                </View>
              </View>
            </View>

            <View style={{marginVertical: 15}}>
              <View>
                {currentProfile && currentProfile?.imageUrls && currentProfile?.imageUrls.length > 0 && (
                <View>
                  <Image style={{
                    width: '100%',
                    height: 410,
                    resizeMode: 'cover',
                    borderRadius: 10
                  }}
                  source={{uri: currentProfile?.imageUrls[0]}}></Image>
                  <Pressable
                  onPress={() => navigation.navigate('SendLike', {
                    type: 'image',
                    image: currentProfile?.imageUrls[0],
                    userId: userId,
                    likedUserId: currentProfile?.userId,
                    name: currentProfile?.firstName,
                  })}
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: 'contain',
                        }}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/128/2724/2724657.png',
                        }}
                      />
                    </Pressable>
                </View>
                )}
              </View>
            </View>

            <View style={{marginVertical: 15}}>
                {currentProfile && currentProfile?.prompts && currentProfile?.prompts.slice(0, 1).map((prompt, index) => (
                  <>
                    <View key={index}
                    style={{
                      backgroundColor: 'white',
                      padding: 12,
                      borderRadius: 10,
                      height: 150,
                      justifyContent: 'center',
                    }}>
                      <Text style={{fontSize: 15, fontWeight: '500'}}>{prompt.question}</Text>
                      <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 20, fontFamily: 'Carlito', lineHeight: 30}}>{prompt.answer}</Text>
                    </View>
                    <Pressable
                    onPress={() => navigation.navigate('SendLike', {
                      type: 'prompt',
                      userId: userId,
                      likedUserId: currentProfile?.userId,
                      name: currentProfile?.firstName,
                      prompt: {
                        question: prompt.question,
                        answer: prompt.answer
                      }
                    })}
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: 'contain',
                        }}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/128/2724/2724657.png',
                        }}
                      />
                    </Pressable>
                  </>
                ))}
            </View>   

            <View style={{backgroundColor: 'white', padding: 10, borderRadius: 8}}>
              <View style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: '#E0E0E0', paddingBottom: 10, borderBottomWidth: 0.8}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View>
                    <Text style={{fontSize: 15}}>{currentProfile?.dateOfBirth}</Text>
                  </View>

                  <View>
                    <Text style={{fontSize: 15}}>{currentProfile?.gender}</Text>
                  </View>

                  <View>
                    <Text style={{fontSize: 15}}>{currentProfile?.type}</Text>
                  </View>

                  <View>
                    <Text style={{fontSize: 15}}>{currentProfile?.hometown}</Text>
                  </View>
                </ScrollView>
              </View>

              <View 
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                marginTop: 15,
                borderBottomColor: '#E0E0E0',
                paddingBottom: 10,
                borderBottomWidth: 0.8,
              }}>
                <Ionicons name='bag-outline' size={20} color='black'></Ionicons>
                <Text>{currentProfile?.jobTitle}</Text>
              </View>

              <View 
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                marginTop: 15,
                borderBottomColor: '#E0E0E0',
                paddingBottom: 10,
                borderBottomWidth: 0.8,
              }}>
                <Ionicons name='locate-outline' size={20} color='black'></Ionicons>
                <Text>{currentProfile?.workPlace}</Text>
              </View>

              <View 
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                marginTop: 15,
                borderBottomColor: '#E0E0E0',
                paddingBottom: 10,
                borderBottomWidth: 0.8,
              }}>
                <Ionicons name='home-outline' size={20} color='black'></Ionicons>
                <Text>{currentProfile?.location}</Text>
              </View>

              <View 
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                marginTop: 15,
                borderBottomColor: '#E0E0E0',
                paddingBottom: 10,
                borderBottomWidth: 0.8,
              }}>
                <Ionicons name='search-outline' size={20} color='black'></Ionicons>
                <Text>{currentProfile?.lookingFor}</Text>
              </View>
            </View>

            <View>
              {currentProfile && currentProfile?.imageUrls && currentProfile?.imageUrls.slice(1, 3).map((item, index) => (
                <View style={{marginVertical: 10}} key={index}>
                  <Image style={{
                    width: '100%',
                    height: 410,
                    resizeMode: 'cover',
                    borderRadius: 10
                  }}
                  source={{uri: item}}></Image>
                  <Pressable
                  onPress={() => navigation.navigate('SendLike', {
                    type: 'image',
                    image: item,
                    userId: userId,
                    likedUserId: currentProfile?.userId,
                    name: currentProfile?.firstName,
                  })}
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: 'contain',
                        }}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/128/2724/2724657.png',
                        }}
                      />
                    </Pressable>
                </View>
              ))}
            </View> 

            <View style={{marginVertical: 15}}>
              {currentProfile?.prompts && currentProfile?.prompts.slice(1, 2).map((prompt, index) => (
                <>
                  <View key={index}
                    style={{
                      backgroundColor: 'white',
                      padding: 12,
                      borderRadius: 10,
                      height: 150,
                      justifyContent: 'center',
                    }}>
                      <Text style={{fontSize: 15, fontWeight: '500'}}>{prompt.question}</Text>
                      <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 20, fontFamily: 'Carlito', lineHeight: 30}}>{prompt.answer}</Text>
                    </View>
                    <Pressable
                    onPress={() => navigation.navigate('SendLike', {
                      type: 'prompt',
                      userId: userId,
                      likedUserId: currentProfile?.userId,
                      name: currentProfile?.firstName,
                      prompt: {
                        question: prompt.question,
                        answer: prompt.answer
                      }
                    })}
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: 'contain',
                        }}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/128/2724/2724657.png',
                        }}
                      />
                    </Pressable>
                </>
              ))}
            </View>   

            <View>
              {currentProfile?.imageUrls && currentProfile?.imageUrls.slice(3, 4).map((item, index) => (
                <View key={index} style={{marginVertical: 10}}>
                  <Image style={{
                    width: '100%',
                    height: 410,
                    resizeMode: 'cover',
                    borderRadius: 10
                  }}
                  source={{uri: item}}></Image>
                  <Pressable
                  onPress={() => navigation.navigate('SendLike', {
                    type: 'image',
                    image: item,
                    userId: userId,
                    likedUserId: currentProfile?.userId,
                    name: currentProfile?.firstName,
                  })}
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: 'contain',
                        }}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/128/2724/2724657.png',
                        }}
                      />
                    </Pressable>
                </View>
              ))}
            </View>

            <View style={{marginVertical: 15}}>
              {currentProfile?.prompts && currentProfile?.prompts.slice(2, 3).map((prompt, index) => (
                <>
                  <View key={index}
                    style={{
                      backgroundColor: 'white',
                      padding: 12,
                      borderRadius: 10,
                      height: 150,
                      justifyContent: 'center',
                    }}>
                      <Text style={{fontSize: 15, fontWeight: '500'}}>{prompt.question}</Text>
                      <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 20, fontFamily: 'Carlito', lineHeight: 30}}>{prompt.answer}</Text>
                    </View>
                    <Pressable
                    onPress={() => navigation.navigate('SendLike', {
                      type: 'prompt',
                      userId: userId,
                      likedUserId: currentProfile?.userId,
                      name: currentProfile?.firstName,
                      prompt: {
                        question: prompt.question,
                        answer: prompt.answer
                      }
                    })}
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: 'contain',
                        }}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/128/2724/2724657.png',
                        }}
                      />
                    </Pressable>
                </>
              ))}
            </View>  

            <View>
              {currentProfile?.imageUrls && currentProfile?.imageUrls.slice(4, 7).map((item, index) => (
                <View key={index} style={{marginVertical: 10}}>
                  <Image style={{
                    width: '100%',
                    height: 410,
                    resizeMode: 'cover',
                    borderRadius: 10
                  }}
                  source={{uri: item}}></Image>
                  <Pressable
                  onPress={() => navigation.navigate('SendLike', {
                    type: 'image',
                    image: item,
                    userId: userId,
                    likedUserId: currentProfile?.userId,
                    name: currentProfile?.firstName,
                  })}
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: 'contain',
                        }}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/128/2724/2724657.png',
                        }}
                      />
                    </Pressable>
                </View>
              ))}
            </View> 
          </View>
        </>
      </View>
    </ScrollView>

    <Pressable
        style={{
          position: 'absolute',
          bottom: 15,
          left: 12,
          backgroundColor: 'white',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}>
        <Image
          style={{width: 30, height: 30, resizeMode: 'contain'}}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/17876/17876989.png',
          }}
        />
      </Pressable>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})