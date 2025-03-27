import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [authUser, setAuthUser] = useState(AsyncStorage.getItem('token') || null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem('token');
            setToken(token);
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        };
        fetchUser();
    }, []);

    return <AuthContext.Provider value={{token, setToken, userId, setUserId, userInfo, setUserInfo, authUser, setAuthUser}}>
        {children}
    </AuthContext.Provider>
}

export {AuthProvider, AuthContext};