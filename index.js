const express = require('express')
const app = express();
const port = 3301 || process.env.PORT;



app.use(express.json());


const server = app.listen(port, () => console.log(`Executando na porta: ${port}`))
const io = require('socket.io')(server);

let dados = []

io.on('connection', (socket) => {
   console.log('a user connected');

   socket.on('disconnect', () => {
      console.log('user disconnected');
   });

   socket.on('chatmsg', (nome, msg,fullDate) => {
      console.log(`${nome} - ${msg} `)
      dados.push({ nome: nome, mensagem: msg,fullDate: fullDate })
      console.log(dados)
      io.emit('chatmsg', dados);
   })
   socket.on('getchatmsg', () => {
      io.emit('chatmsg', dados);
   })


});

