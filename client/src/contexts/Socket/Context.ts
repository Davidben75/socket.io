import { createContext } from "react";
import { Socket } from "socket.io-client";

export interface ISocketContextState {
    socket : Socket | undefined;
    uuid : string;
    users : string[];
}

export const defaultSocketContextState : ISocketContextState = {
    socket : undefined,
    uuid : '',
    users : []
}

export type TSocketContextActions = "update_socket" | "update_uuid" | "update_users" | "remove_users";

export type TSocketContextPayload = string  | string[] | Socket;

export interface ISocketContextActions {
    type : TSocketContextActions;
    payload : TSocketContextPayload
}

export const SocketReducer = (state : ISocketContextState, action : ISocketContextActions) => {
    console.log(`Message Receive - Action : ${action.type} - Payload :` , action.payload);
    
    
    switch(action.type) {
        case 'update_socket':
            return {...state, socket : action.payload as Socket};
        case 'update_uuid':
            return {...state, uuid : action.payload as string};
        case 'update_users':
            return {...state, users : action.payload as string[]};
        case 'remove_users':
            return {...state, users : state.users.filter((uid) => uid !== (action.payload as string))};
        default :
         return {...state};
    }
};

export interface ISocketContextProps {
    SocketState : ISocketContextState;
    SocketDispatch : React.Dispatch<ISocketContextActions>
}

const SocketContext = createContext<ISocketContextProps>({
    SocketState : defaultSocketContextState,
    SocketDispatch : () => {}
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;