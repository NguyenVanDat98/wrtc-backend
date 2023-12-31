// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors"

// const app = express();

// app.use(cors())
// app.use((req, res, next) => {
// 	// res.setHeader('Referrer-Policy', 'same-origin');
// 	// res.setHeader('Access-Control-Allow-Origin', '*');
// 	next();
//   });
// const httpServer = createServer(app);
// const io = new Server(httpServer,{
// 	cors:{
// 		origin: '*',
// 		methods: ['GET', 'POST'],
// 		credentials: true,
// 	},
// 	// pingInterval: 10000,
// });
// //
// // app.get('/', (req, res) => {
// // 	res.sendFile(__dirname + '/index.html');
// //   });
  
//   // API Status để kiểm tra trạng thái kết nối của Socket.IO
// app.get('/status', (req, res) => {
// 	res.json({ status: io.engine.clientsCount  });
// });

// io.on("connection", (socket) => {

// 	socket.emit("me", socket.id);	

// 	socket.on("listenRoom", (object) => {
// 		console.log('object :>> ', object);
// 	});
// 	socket.on("disconnect", () => {
// 		socket.broadcast.emit("callEnded")
// 	});

// 	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
// 		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
// 	});

// 	socket.on("answerCall", (data) => {
// 		io.to(data.to).emit("callAccepted", data.signal)
// 	});

//   // ...
// });

// httpServer.listen(5000,() => {
// 	console.log(`Server is running on http://localhost:${5000}`)
// });
import express from 'express';
import { createServer } from "http";
import cors from "cors"
import { Server } from "socket.io";

var app = express();
app.use(cors())
const server = createServer(app);

const socketIo = new Server(server, {
    cors: {
        origin: "*",
    }
  });


socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  socket.emit("getId", socket.id);

  socket.on("sendDataClient", function(data) {
    console.log(data)
    socketIo.emit("sendDataServer", { data });
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
    console.log('Server đang chay tren cong 5000');
});