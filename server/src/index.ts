import express, { Request, Response } from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { ServerSocket } from './socket';


dotenv.config();

// Instance server first
const app = express();
const httpServer = createServer(app)

// Start the Socket sever
new ServerSocket(httpServer); 

// Parse body of the request
app.use(express.json());
app.use(express.urlencoded({extended : true}));

let PORT = process.env.PORT  || 7000;

httpServer.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})








