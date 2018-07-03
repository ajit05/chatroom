var socket = io.connect('http://localhost:3000');

//Query Dom

var message=document.getElementById('message');

var handle=document.getElementById('handle');
var btn=document.getElementById('send');

var output=document.getElementById('output');

var typinginfo=document.getElementById('typingInfo');


//  EMIT EVENTS


btn.addEventListener('click',function(e)

{
e.preventDefault();
    socket.emit('chat',
        {
            message:message.value,
            handle:handle.value
        });

    message.value='';
    message.focus();

});

message.addEventListener('keypress',function (e) {


    socket.emit('typing',handle.value);

});


// Listen for events
socket.on('chat', function(data){
    typinginfo.innerHTML="";

    if(data.message == " ")
    {
        alert(" send some message");
    }

    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing',function(data) {

        typinginfo.innerHTML = '<p><strong>' + data + ': is typing the message... </strong> </p>';

});