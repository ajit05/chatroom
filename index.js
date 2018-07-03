
var socket=require('socket.io');
var express=require('express');

//App Setup

var app=express();
app.use(express.static('public'));
/*app.set('view engine','ejs');
app.set('views','./views');

app.use(require('./routes/Home'));
app.use(require('./routes/chat'));*/


app.set('port',process.env.Port|| 3000);
var server=app.listen(app.get('port'),function(err)
{
    if(typeof (err)=="undefined")
    {
        console.log("your application is running at "+app.get('port'));
    }
})
// socket setup

var io=socket(server);

io.on('connection',function(socket)
{
    console.log('made socket connection',socket.id);

    socket.on('chat',function(data)
    {
        io.sockets.emit('chat',data);

    });
    socket.on('typing',function(data)
    {
       socket.broadcast.emit('typing',data);
    });

});