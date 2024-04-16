import express, { Request, Response } from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
import {Server} from 'socket.io'

dotenv.config();
const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer);

let PORT = process.env.PORT  || 7000;

httpServer.listen(PORT, () =>{
    console.log('hello david')
})








