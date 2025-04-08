import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import axios from 'axios';
import { BASE_URL } from '../urls/url';
import { useSocketContext } from '../SocketContext';


const ChatRoom = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const { userId } = useContext(AuthContext)
    const { socket } = useSocketContext()

    useLayoutEffect(() => {
        return navigation.setOptions({
            headerTitle: '',
            headerLeft: () => (
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Ionicons name="arrow-back" size={24} color='black'></Ionicons>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', }}>{route?.params?.name}</Text>
                </View>
            ),
            headerRight: () => (
                <Ionicons name="videocam-outline" size={24} color='black'></Ionicons>
            )
        })
    }, [])

    useEffect(() => {
        fetchMessages()
    }, [])

    const sendMessage = async (senderId, receiverId) => {
        try {
            setMessage('')
            await axios.post(`${BASE_URL}/sendMessage`, {
                senderId: senderId,
                receiverId: receiverId,
                message: message
            })

            socket.emit('sendMessage', { senderId, receiverId, message: message })

            setTimeout(() => {
                fetchMessages()
            }, 100)

        } catch (error) {
            console.log('Error', error)
        }
    }

    const fetchMessages = async () => {
        try {
            const senderId = userId
            const receiverId = route?.params?.receiverId
            const response = await axios.get(`${BASE_URL}/messages`, {
                params: {
                    senderId,
                    receiverId
                }
            })
            setMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const listenMessages = () => {
        const { socket } = useSocketContext()

        useEffect(() => {
            socket?.on('newMessage', (newMessage) => {
                newMessage.shouldShake = true
                setMessages([...messages, newMessage])
            })

        }, [socket, messages, setMessages])
    }

    listenMessages()
    console.log(messages)
    const keyboardVerticalOffset = Platform.OS === 'android' ? 65 : 0

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {messages.map((item, index) => {
                    return (
                        <Pressable key={index} style={[
                            (item?.senderId === userId) ? {
                                alignSelf: 'flex-end',
                                backgroundColor: '#5b0d63',
                                padding: 10,
                                maxWidth: '60%',
                                borderRadius: 7,
                                margin: 10,
                            } : {
                                alignSelf: 'flex-start',
                                backgroundColor: '#e1e3e3',
                                padding: 10,
                                maxWidth: '60%',
                                borderRadius: 7,
                                margin: 10,
                            }]}>
                            <Text style={{
                                fontSize: 15,
                                textAlign: 'left',
                                color: item?.senderId === userId ? 'white' : 'black',
                                letterSpacing: 0.3,
                            }}>{item?.message}</Text>
                        </Pressable>
                    )
                })}
            </ScrollView>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderTopWidth: 1,
                borderTopColor: '#dddddd',
                marginBottom: 30,
                gap: 12
            }}>
                <TextInput
                    value={message}
                    onChangeText={text => setMessage(text)}
                    placeholder='Type a message...'
                    style={{
                        backgroundColor: '#dddddd',
                        flex: 1,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        borderRadius: 20,
                        height: 40,
                        fontSize: 15
                    }}
                />
                <Pressable
                    onPress={() => sendMessage(userId, route?.params?.receiverId)}
                    style={{
                        backgroundColor: '#662d91',
                        paddingVertical: 8,
                        borderRadius: 20,
                        paddingHorizontal: 12
                    }}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Send</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ChatRoom

const styles = StyleSheet.create({})