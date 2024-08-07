import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { SocketContextProvider, SocketReducer, defaultSocketContextState } from './Context';
import { useSocket } from '../../hooks/useSockets';
import Message from '../../models/message';

export interface ISocketContextComponentProps extends PropsWithChildren  {}
const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {

    const { children } = props;
    const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);
    const [loading , setLoading] = useState(true);

    const socket = useSocket('ws://localhost:8000', {
        reconnectionAttempts : 5,
        reconnectionDelay : 5000,
        autoConnect : false
    });

    useEffect(() => {
        // Connect to the web socket
        socket.connect();

        // Save the Socket in context
        SocketDispatch({type : 'update_socket', payload : socket});

        // Start the event listneter
        StartListeners();
        // Send the handshakes
        SendHanshake();
        //
    },[]);

    const StartListeners = () => {
        // Reconnect event 
        socket.io.on('reconnect', (attempt) => {
            console.info('Reconnect on attempt ' + attempt);
        });

        // Reconnect attempt event 
        socket.io.on('reconnect_attempt', (attempt) => {
            console.info('Reconnect on attempt ' + attempt);
        });


        // Reconnect error 
        socket.io.on('reconnect_error', (error) => {
            console.info('Reconnect error' + error);
        });

        // Reconnect failed 
        socket.io.on('reconnect_failed', () => {
            console.info('Reconnect failure');
            alert('Unable to connect you the web socket')
        });

        socket.on('user_connected', (users: string[]) => {
            console.info('User connected, updating users list');
            SocketDispatch({ type: 'update_users', payload: users });
        });

        socket.on('user_disconnected', (uid: string) => {
            console.info('User disconnected:', uid);
            SocketDispatch({ type: 'update_users', payload: uid });
        });
    };

    const SendMessage = (data : Message)  => {
        console.log('Send message to an other user');
        socket.emit('send_message', data, (response : any ) => {
            console.log(response)
        })
    }


    const SendHanshake = () => {
        console.info('Sending handshake to server ...');

        socket.emit('handshake', (uid : string, users: string[]) => {


            SocketDispatch({type : 'update_uid', payload : uid});
            SocketDispatch({type : 'update_users' , payload : users});

            setLoading(false);
        });
    }; 

    if (loading) return <p> Loading Socket IO .</p>

    return (
     <SocketContextProvider value={{SocketState, SocketDispatch, SendMessage}}> 
        {children}
     </SocketContextProvider>  
    );
};

export default SocketContextComponent;