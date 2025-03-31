import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserChat = ({item, userId}) => {
  return (
    <Pressable style={{flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 12}}>
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
        <Text style={{fontWeight: '500', fontSize: 15, marginTop: 6}}>Start Chat with {item?.firstName}</Text>
      </View>
    </Pressable>
  )
}

export default UserChat

const styles = StyleSheet.create({})