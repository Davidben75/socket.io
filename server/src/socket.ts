import {Server as HTTPServer} from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';

export class ServerSocket {
    //  This means there will be only one instance of this class shared across the application
    public static instance : ServerSocket;
    public io : Server;

    // Master list of all connected users

    public users: {[uuid : string] : string}

    constructor(server : HTTPServer){
        ServerSocket.instance = this;
        this.users = {};
        this.io = new Server(server , {
            //  Disables serving the Socket.io client script from the server.
            serveClient : false,
            //  The server sends a ping to the client every 10 seconds to check if the connection is still alive.
            pingInterval : 10000,
            // If the server doesn't receive a pong response from the client within 5 seconds, the connection is considered closed.
            pingTimeout : 5000,
            cookie : false,
            cors : {
                origin : "*"
            }
        });

        this.io.on('connect' , this.StartListeners);
        console.info('Socket IO OK');
    }

    StartListeners = (socket : Socket) => {
        console.info(`Message received from ${socket.id}`);

        socket.on('handshake', () => {
            console.info(`Hanshake received form ${socket.id}`);
        });

        socket.on('disconnect', () => {
            console.info(`Disconnnect received form ${socket.id}`);
        });
    };
}