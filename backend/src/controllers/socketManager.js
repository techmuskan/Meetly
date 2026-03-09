import { connection } from "mongoose";
import path from "path";
import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-call", (path) => {
      if(connections[path] === undefined){
        connections[path] = [];
      }
      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();
      // connections[path].forEach((id) => {
      //   if(id !== socket.id){
      //     io.to(id).emit("user-joined", socket.id);
      //   } 
      // });
      for(let a = 0; a < connections[path].length - 1; a++){
        io.to(connections[path][a]).emit("user-joined", socket.id);
      }
      if(messages[path]!==undefined){
        for(let a = 0; a < messages[path].length; a++){
          io.to(socket.id).emit("chat-messgage", messages[path][a]['data'], messages[path][a]['sender'], messages[path][a]['socket-id-sender']);
        }
      }
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-messgage", (data, sender)=> {
      const [matchingRoom, found] = Object.entries(connections).reduce(([room, isFound],[roomKey, roomValue])=>{
        if(!isFound && roomValue.includes(socket.id)){
          return [roomKey, true];
        }
        return [room, isFound];
      }, ['', false]);
      if(found == true){
        if(messages[matchingRoom] = [])
      }
    });

    socket.on("disconnect", () => {
      
    });



});  
  

  return io;

};