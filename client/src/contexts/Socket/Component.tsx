import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { SocketContextProvider, SocketReducer, defaultSocketContextState } from './Context';
import { useSocket } from '../../hooks/useSockets';

export interface ISocketContextComponentProps extends PropsWithChildren  {}
const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {

    const { children } = props;
    const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);
    const [loading , setLoading] = useState(true);

    const socket = useSocket('ws://localhost:8000', {
        reconnectionAttempts : 5,
        reconnectionDelay : 50000,
        autoConnect : false
    });

    useEffect(() => {
        // Connect to the web socket
        socket.connect();

        // Save the Socket in context
        SocketDispatch({type : 'update_socket', payload : socket});

        // Start the event listneter
        StartListeners();
        // Send the hanshks
        SendHanshake();
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
    };


    const SendHanshake = () => {
        console.info('Sending handshake to server ...');

        socket.emit('hanshake', (uid : string, users: string[]) => {
            console.log('User handshake callback message');

            SocketDispatch({type : 'update_uuid', payload : uid});
            SocketDispatch({type : 'update_users' , payload : users});

            setLoading(false);
        });
    }; 
    if (loading) return <p> Loading Socket IO .</p>

    return (
     <SocketContextProvider value={{SocketState, SocketDispatch}}> 
        {children}
     </SocketContextProvider>  
    );
};

export default SocketContextComponent;