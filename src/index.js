/**Permite arrancar la aplicacion */
import app from './app';
import { Server as WebSocketServer } from 'socket.io';
import http from 'http';
// import dbConection from './db';
import sockets from './sockets'

// const app = require('./app');
// const {Server: WebSocketServer} = require('socket.io');
// const http = require('http');
// const sockets = require('./sockets');

// dbConection();

const serverApp = http.createServer(app);//esto es un requerimiento para que sea pasado al socket y asi esten conectados 
const httpServer = serverApp.listen(5050);
const io = new WebSocketServer(httpServer); //es la conexion que tendremos con los clientes 

console.log('Servidor corriendo en el puerto 5050');

sockets(io);