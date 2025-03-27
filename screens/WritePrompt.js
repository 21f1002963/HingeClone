import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Pressable,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';


const WritePrompt = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const question = route.params.question
  const {index, prompts, setPrompts} = route.params
  const [answer, setAnswer] = useState('')
  const handleDone = () => {
    const updatePrompts = [...prompts]
    updatePrompts[index]={question, answer}
    navigation.replace('Prompts', {prompts: updatePrompts})
  }
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 50 : 0, flex: 1}}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}>
      <View style={{flexDirection: 'row', padding: 12, gap: 5, alignItems: 'center'}}>
        <Ionicons name="chevron-back-outline "
        size={25} 
        color="#581845"></Ionicons>
        <Text style={{fontSize: 15}}>Write Answer</Text>
      </View>
      <Pressable onPress={() => {handleDone()}}>
        <Text style={{fontSize: 15, fontWeight: '500', color: '#5a0763', marginRight: 10}}>Done</Text>
      </Pressable>
      </View>

      <View style={{padding: 12}}>
        <View style={{backgroundColor: "white", padding: 15, borderRadius: 10}}>
          <Text>{question}</Text>
        </View>
        <View style={{marginTop: 15, padding: 10, borderRadius: 10, backgroundColor: 'white', height: 100 }}>
          <TextInput 
          multiline placeholder="Write your answer here" value={answer} onChangeText={text => setAnswer(text)}
            style={{fontSize: answer ? 17 : 17, fontfamily: 'Helvetica'}}>
          </TextInput>
        </View>
      </View>
    </SafeAreaView>
  ) 
}

export default WritePrompt

const styles = StyleSheet.create({})