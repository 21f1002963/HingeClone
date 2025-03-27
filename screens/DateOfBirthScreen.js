import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native'
import { useEffect, useState, useRef} from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { saveRegistrationProgress } from '../utils/registrationUtils'
import { getRegistrationProgress } from '../utils/registrationUtils'

const DateOfBirthScreen = () => {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const handleDayChange = (text) => {
    setDay(text)
    if (text.length === 2) {
      monthRef.current.focus()
    }
  }

  const handleMonthChange = (text) => {
    setMonth(text)
    if (text.length === 2) {
      yearRef.current.focus()
    }
  }

  const handleYearChange = (text) => {
    setYear(text)
  }

  const navigation = useNavigation()

  useEffect(() => {
    getRegistrationProgress('dateOfBirth').then((DOB) => {
      if (DOB) {
        console.log(DOB)
        const [day, month, year] = DOB.split('/')
        setDay(day)
        setMonth(month)
        setYear(year)
      }
    })
  }, [])

  const handleNext = () => {
    if(day.trim() !== '' && month.trim() !== '' && year.trim() !== '') {
      const dateOfBirth = `${day}/${month}/${year}`
      saveRegistrationProgress('dateOfBirth', dateOfBirth)
    }
    navigation.navigate('Gender')
  }

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 50 : 0, flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 30, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
          <MaterialDesignIcons name="calendar-blank" size={26} color="black" />

          </View>
          <Image style={{ width: 100, height: 40 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png'
            }}>
          </Image>
        </View>
        <View style={{ marginTop: 30 }}>

          <Text style={{
            fontSize: 25, fontWeight: 'bold', fontFamily: 'GeezaPro-Bold'
          }}> What's your date of birth?
          </Text>

          <View style={{ flexDirection: 'row', marginTop: 80, justifyContent: 'center', gap: 10, alignItems: 'center' }}>
            <TextInput
              value={day}
              onChangeText={handleDayChange}
              keyboardType='numeric'
              autoFocus={true} placeholder='DD'
              maxLength={2}
              placeholderTextColor={"#BEBEBE"}
              style={{
                borderBottomWidth: 1,
                borderColor: 'black',
                padding: 10,
                width: 60,
                fontFamily: 'GeezaPro-Bold',
                fontSize: day ? 22 : 22
              }} />
            <TextInput
              value={month}
              onChangeText={handleMonthChange} 
              keyboardType='numeric'
              maxLength={2}
              ref={monthRef}
              placeholder='MM'
              placeholderTextColor={"#BEBEBE"}
              style={{
                borderBottomWidth: 1,
                borderColor: 'black',
                padding: 10,
                width: 60,
                fontFamily: 'GeezaPro-Bold',
                fontSize: month ? 22 : 22
              }} />
            <TextInput
              value={year}
              onChangeText={handleYearChange}
              placeholder='YYYY'
              ref={yearRef}
              maxLength={4}
              keyboardType='numeric'
              placeholderTextColor={"#BEBEBE"}
              style={{
                borderBottomWidth: 1,
                borderColor: 'black',
                padding: 10,
                width: 80,
                fontFamily: 'GeezaPro-Bold',
                fontSize: year ? 22 : 22
              }} />
          </View>

          <TouchableOpacity
            onPress={handleNext}
            style={{ marginTop: 30, marginLeft: 'auto' }}>
            <Ionicons name="chevron-forward-circle-outline" size={45} color="#581845" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DateOfBirthScreen

const styles = StyleSheet.create({})