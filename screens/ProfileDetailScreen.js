import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { use } from 'react'

const ProfileDetailScreen = () => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'edit', title: 'Edit' },
    { key: 'view', title: 'View' },
  ])
  const route = useRoute();
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'edit':
        return <EditProfile/>
      case 'view':
        return <ViewProfile userInfo={route.params?.userInfo} />
      default:
        return null
    }
  }
  const EditProfile = () => {}
  
  return (
    <SafeAreaView>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 17, fontWeight: '500', textAlign: 'center'}}>{route.params?.userInfo?.firstName}</Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: '100%'}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: 'black'}}
            style={{backgroundColor: 'white'}}
            labelStyle={{fontWeight: 'bold'}}
            activeColor="black"
            inactiveColor="gray"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default ProfileDetailScreen

const styles = StyleSheet.create({})