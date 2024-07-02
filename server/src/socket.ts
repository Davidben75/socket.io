import {Server as HTTPServer} from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';

export class ServerSocket {
    //  This means there will be only one instance of this class shared across the application
    public static instance : ServerSocket;
    public io : Server;

    // Master list of all connected users
    public users: {[uid : string] : string}

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

        socket.on('handshake', (callback : (uid : string, users : string[]) => void ) => {
            console.info(`Hanshake received form ${socket.id}`);

            // Check if this is a reconnection
            const reconnected = Object.values(this.users).includes(socket.id);

            if (reconnected) {
                console.info('This user has reconnected', socket.id);
                const uid = this.GetUidFromSocketId(socket.id);
                const users = Object.values(this.users)

                if (uid) {
                    console.info('Sending callback for reconnect ...');
                    callback(uid, users);
                    return;
                };
            };

            // Generate new user
            const uid = v4();
            this.users[uid] = socket.id;
            const users = Object.values(this.users)

            console.info('Sending callback for handshake');
            callback(uid, users);

            // Send new user to all conneted users
            this.SendMessage(
                'user_connected',
                users.filter((id) => id !== socket.id),
                users
            );
        });

        socket.on('disconnect', () => {
            console.info(`Disconnnect received form ${socket.id}`);

            const uid = this.GetUidFromSocketId(socket.id);

            if (uid) {
                delete this.users[uid];
                const users = Object.values(this.users); 
                this.SendMessage(
                    'user_disconnected',
                    users,
                    uid
                    )
            }
        });

        socket.on('send_message' , (data, callback) => {
            console.log(`Message from ${socket.id} : ${data}`)
            console.log(data)
            callback({
                detail : data,
                message : 'Bien vu'
            })
        })
    };

    GetUidFromSocketId = (id : string) => Object.keys(this.users).find((uid) => this.users[uid] == id);
    
    /** 
    * Send message through the socket 
    * @ param name : the name of the event 
    * @ param users : List of socket id
    * @ param payload any information 
    */
    SendMessage = (name : string, users : string[], payload? : Object) => {
        console.info(`Emmiting event ${name} to`, users) 

        users.forEach(id => payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name))
    }
}