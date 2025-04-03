import { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

const ProfileScreen = () => {
  const { userId, userInfo, setUserInfo } = useContext(UserContext)
  const [routes] = useState([
    { key: 'getMore', title: 'Get More' },
    { key: 'safety', title: 'Safety' },
    { key: 'myHinge', title: 'My Hinge' },
  ])
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView>
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
          <Pressable>
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

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}>
        </TabView>
        
      </SafeAreaView>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})