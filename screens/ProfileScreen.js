import { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

const ProfileScreen = () => {
  const { userId, userInfo, setUserInfo } = useContext(UserContext)
  const [routes] = useState([
    { key: 'getMore', title: 'Get More' },
    { key: 'safety', title: 'Safety' },
    { key: 'myHinge', title: 'My Hinge' },
  ])
  const [index, setIndex] = useState(0)

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'getMore':
        return <GetMore />
      case 'safety':
        return <Safety />
      case 'myHinge':
        return <MyHinge />
      default:
        return null
    }
  }

  const checkActiveSubscription = () => {
    if (!userInfo || !userInfo.subscription) return { isActive: false, plan: null }

    const { activePlan } = userInfo.subscription.find(item => item.status === 'active')

    return activePlan ? { isActive: true, plan: activePlan.plan } : { isActive: false, plan: null }
  }
  const { isActive, plan: planName } = checkActiveSubscription();

  const GetMore = () => {
    <View>
      <View style={{ flex: 1, margionTop: 30, marginHorizontal: 20 }}>
        <Pressable onPress={() => navigation.navigate('Subscription')}>
          <Image
            style={{ height: 250, width: '100%', borderRadius: 10 }}
            source={{
              uri: 'https://cdn.sanity.io/images/l7pj44pm/production/5f4e26a82da303138584cff340f3eff9e123cd56-1280x720.jpg',
            }}
          />
        </Pressable>
      </View>

      <View
        style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderColor: '#E0E0E0',
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: '#0a7064',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons name="infinite-outline" size={22} color='white' />
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: '600' }}>Boost</Text>
          <Text style={{ color: '#282828', marginTop: 3 }}>Get seen by 11x more people</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderColor: '#E0E0E0',
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: '#d4abde',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons name="rose-outline" size={22} color='white' />
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: '600' }}>Boost</Text>
          <Text style={{ color: '#282828', marginTop: 3 }}>Get seen by 11x more people</Text>
        </View>
      </View>
    </View>
  }

  const Safety = () => {
    <ScrollView>
      <View style={{ marginTop: 10, marginHorizontal: 20, flex: 1 }}>
        <View style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          padding: 10,
          borderRadius: 8,
          backgroundColor: 'white',
        }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: '#E0E0E0',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialDesignIcons name="check-decagram-outline" size={22} color='black' />
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: '600' }}>Selfie Verification</Text>
            <Text style={{ color: '#282828', marginTop: 3 }}>You're not verified yet</Text>
          </View>
        </View>

        <View style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          padding: 10,
          borderRadius: 8,
          backgroundColor: 'white',
        }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: '#E0E0E0',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather name="eye-off" size={22} color='black' />
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: '600' }}>Hidden words</Text>
            <Text style={{ color: '#282828', marginTop: 3 }}>Hide likes with offensive words</Text>
          </View>
        </View>

        <View style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          padding: 10,
          borderRadius: 8,
          backgroundColor: 'white',
          marginVertical: 20,
        }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: '#E0E0E0',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialDesignIcons name="lock" size={22} color='black' />
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: '600' }}>Block List</Text>
            <Text style={{ color: '#282828', marginTop: 3 }}>Block People you know</Text>
          </View>
        </View>

        <Text style={{ fontSize: 20, fontWeight: '500' }}>Explore safety resources</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 12 }}>
          <View style={{
            padding: 14,
            borderRadius: 7,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderColor: '#E0E0E0',
            borderWidth: 0.7,
            backgroundColor: 'white',
            flex: 1,
          }}>
            <MaterialDesignIcons name='phone-outline' size={22} color="black" />
            <Text style={{ fontSize: 17, fontWeight: '500' }}>Crisis Hotlines</Text>
          </View>

          <View style={{
            padding: 14,
            borderRadius: 7,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderColor: '#E0E0E0',
            borderWidth: 0.7,
            backgroundColor: 'white',
            flex: 1,
          }}>
            <MaterialDesignIcons name="help-box" size={22} color="black" />
            <Text style={{ fontSize: 17, fontWeight: '500' }}>Help Center</Text>
          </View>
        </View>

        <View style={{
          padding: 12,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 15,
          backgroundColor: 'white',
          borderColor: '#E0E0E0',
          borderWidth: 0.7,
          borderRadius: 8,
        }}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{
              uri: 'https://images.hinge.co/6e7d61055e6f7783f84a1e41bc85aa3807f9ddba-1200x1094.jpg?w=1200&q=75',
            }}
          />
          <Text style={{ textAlign: 'center', fontSize: 19, fontWeight: 'bold' }}>Safe Dating Advice</Text>
          <Text style={{ textAlign: 'center', color: '#282828', fontSize: 15 }}>Our guide for how to stay safe without loosing the momentum</Text>
        </View>
      </View>
    </ScrollView>
  }

  const MyHinge = () => {
    <ScrollView>
      <View style={{ marginTop: 10, marginHorizontal: 20, flex: 1 }}>
        <View
          style={{
            marginVertical: 20,

            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            borderColor: '#E0E0E0',
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: '#E0E0E0',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialDesignIcons name="help" size={22} color="black" />
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: '600' }}>Help Center</Text>
            <Text style={{ color: '#282828', marginTop: 3 }}>
              Safety, Security and more
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            borderColor: '#E0E0E0',
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: '#E0E0E0',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialDesignIcons
              name="alarm-light-outline"
              size={22}
              color="black"
            />
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: '600' }}>What works</Text>
            <Text style={{ color: '#282828', marginTop: 3 }}>
              Check out our expert dating tips
            </Text>
          </View>
        </View>

        <View
          style={{
            padding: 12,
            marginVertical: 12,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 15,
            backgroundColor: 'white',
            borderColor: '#E0E0E0',
            borderWidth: 0.7,
            borderRadius: 7,
          }}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{
              uri: 'https://images.hinge.co/6e7d61055e6f7783f84a1e41bc85aa3807f9ddba-1200x1094.jpg?w=1200&q=75',
            }}
          />

          <Text style={{ textAlign: 'center', fontSize: 19, fontWeight: 'bold' }}>
            Try a fresh photo
          </Text>

          <Text style={{ textAlign: 'center', color: '#282828', fontSize: 15 }}>
            Show people your latest and greatest by adding a new photo
          </Text>
        </View>
      </View>
    </ScrollView>
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 12, alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 26, fontFamily: 'Helvetica-Bold' }}>
              HINGE
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Pressable>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/7854/7854753.png',
                  }}
                />
              </Pressable>
              <Pressable>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/1827/1827737.png',
                  }}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Pressable onPress={() => navigation.navigate('ProfileDetail', {
            userInfo: userInfo,
          })}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                resizeMode: 'cover',
                borderColor: 'purple',
                borderWidth: 3,
              }}
              source={{ uri: userInfo?.imageUrls[1] }}
            />
          </Pressable>
          <Text style={{ marginTop: 10, fontSize: 24, fontWeight: '500' }}>
            {userInfo?.firstName}
          </Text>
        </View>

        {isActive && (
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 7,
                borderRadius: 25,
                backgroundColor: 'purple',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                {planName}
              </Text>
            </View>
          )}
        </View>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'purple' }}
              style={{ backgroundColor: '#F8F8F8' }}
              labelStyle={{ fontWeight: 'bold' }}
              activeColor='black'
              inactiveColor='gray'
            />
          )}
        />
      </SafeAreaView>
    </ScrollView >
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})