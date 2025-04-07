import { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Entypo from '@react-native-vector-icons/entypo'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import Ionicons from '@react-native-vector-icons/ionicons'
import HomeScreen from '../screens/HomeScreen'
import LikesScreen from '../screens/LikesScreen'
import ChatScreen from '../screens/ChatScreen'
import ProfileScreen from '../screens/ProfileScreen'
import LoginScreen from '../screens/LoginScreen'
import BasicInfoScreen from '../screens/BasicInfoScreen'
import NameScreen from '../screens/NameScreen'
import EmailScreen from '../screens/EmailScreen'
import OtpScreen from '../screens/OtpScreen'
import PasswordScreen from '../screens/PasswordScreen'
import DateOfBirthScreen from '../screens/DateOfBirthScreen'
import LocationScreen from '../screens/LocationScreen'
import GenderScreen from '../screens/GenderScreen'
import TypeScreen from '../screens/TypeScreen'
import DatingType from '../screens/DatingType'
import LookingFor from '../screens/LookingFor'
import HomeTownScreen from '../screens/HomeTownScreen'
import WorkPlace from '../screens/WorkPlace'
import JobTitleScreen from '../screens/JobTitleScreen'
import PhotoScreen from '../screens/PhotoScreen'
import PromptsScreen from '../screens/PromptsScreen'
import ShowPromptsScreen from '../screens/ShowPromptsScreen'
import PreFinalScreen from '../screens/PreFinalScreen'
import WritePrompt from '../screens/WritePrompt'
import { AuthContext } from '../AuthContext'
import SendLikeScreen from '../screens/SendLikeScreen'
import ProfileDetailScreen from '../screens/ProfileDetailScreen'

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const { token } = useContext(AuthContext)
    function BottomTabs() {
        return (
            <Tab.Navigator
                screenOptions={() => ({
                    tabBarStyle: { height: 90 },
                    tabBarShowLabel: false,
                })}>
                <Tab.Screen name="Home" component={HomeScreen}
                    options={{
                        tabBarStyle: { backgroundColor: '#101010' },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="shuffle-outline" size={30} color="white" />
                        ) :
                            (
                                <Ionicons name="shuffle-outline" size={30} color="#989898" />
                            )
                    }}
                />
                <Tab.Screen name="Likes" component={LikesScreen}
                    options={{
                        tabBarStyle: { backgroundColor: '#101010' },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Entypo name="heart" size={30} color="white" />
                        ) :
                            (
                                <Entypo name="heart" size={30} color="#989898" />
                            )
                    }}
                />
                <Tab.Screen name="Chat" component={ChatScreen}
                    options={{
                        tabBarStyle: { backgroundColor: '#101010' },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <MaterialIcons name="chat-bubble-outline" size={30} color="white" />
                        ) :
                            (
                                <MaterialIcons name="chat-bubble-outline" size={30} color="#989898" />
                            )
                    }}
                />
                <Tab.Screen name="Profile" component={ProfileScreen}
                    options={{
                        tabBarStyle: { backgroundColor: '#101010' },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="person-circle-outline" size={30} color="white" />
                        ) :
                            (
                                <Ionicons name="person-circle-outline" size={30} color="#989898" />
                            )
                    }}
                />
            </Tab.Navigator>
        );
    }

    const AuthStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Basic" component={BasicInfoScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Name" component={NameScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Email" component={EmailScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Password" component={PasswordScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="OTP" component={OtpScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Birth" component={DateOfBirthScreen}
                    options={{
                        headerShown: false
                    }}
                />
                {/* <Stack.Screen name="Location" component={LocationScreen}
                    options={{
                        headerShown: false
                    }}
                /> */}
                <Stack.Screen name="Gender" component={GenderScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Type" component={TypeScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Dating" component={DatingType}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="LookingFor" component={LookingFor}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Hometown" component={HomeTownScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="WorkPlace" component={WorkPlace}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Jobtitle" component={JobTitleScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Photos" component={PhotoScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Prompts" component={PromptsScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="ShowPrompts" component={ShowPromptsScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="WritePrompt" component={WritePrompt}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="PreFinal" component={PreFinalScreen}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        )
    }

    function MainStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Main" component={BottomTabs}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen name="SendLike" component={SendLikeScreen}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen name="HandleLike" component={HandleLikeScreen}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen name="ChatRoom" component={ChatRoom}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen name="Subscription" component={SubscriptionScreen}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        );
    }

    return (
        <NavigationContainer>
            {token == null || token == '' ? <AuthStack /> : <MainStack />}
        </NavigationContainer>
    )
}

export default StackNavigator