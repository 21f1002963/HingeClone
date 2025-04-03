import { createContext, useEffect } from "react";
import {io} from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const {userId, authUser} = useContext(AuthContext);

    useEffect(() => {
        if(authUser){
            const socket = io("http://localhost:2500", {
                query: { userId: userId },
            });
            
            setSocket(newSocket);
            
            return () => {
                newSocket.close();
            };
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }

    }, [userId]);

    return (
        <SocketContext.Provider value={{socket, setSocket}}>
            {children}
        </SocketContext.Provider>
    )
}