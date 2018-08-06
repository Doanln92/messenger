var express = require("express");
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.use(express.static("public"));

var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(process.env.PORT || 3000);



var messages = [];
var users = [];
var writeSomeThings = [];

function getUser(access_token){
    let user = null;
    users.map((data)=>{
        if(data.access_token == access_token){
            user = data;
        }
    });
    return user;
}
function checkUser(access_token){
    let stt = false;
    users.map((data)=>{
        if(data.access_token == access_token){
            stt = true;
        }
    });
    return stt;
}

function getUserIndex(access_token){
    let stt = -1;
    users.map((data, i)=>{
        if(data.access_token == access_token){
            stt = i;
        }
    });
    return stt;
}

function getUserList(){
    let ul = [];
    if(users.length){
        users.map((u, x) => {
            ul.push({
                name:u.name,
                email:u.email,
                avatar:u.avatar
            });
        });
    }
    return ul;
}

io.on("connection", function(socket) {
    console.log("Co nguoi ket noi với id là  " + socket.id);
    function stopWriting() {
        if(!socket.access_token || socket.access_token===undefined){
            //socket.emit('need-verify-before-send');
            return null;
        }

        let user = getUser(socket.access_token);
        if(writeSomeThings.length && user){
            writeSomeThings.map((u, i)=>{
                if(u.email == user.email){
                    writeSomeThings.splice(i, 1);
                }
            });
        }
        socket.broadcast.emit("someone-are-writing", writeSomeThings);
    }
    // ngat ket noi
    socket.on('disconnect', function() {
        console.log(socket.id+" đã ngắt kết nối");
        if (typeof socket.access_token != 'undefined') {
            let usr = null;
            users.map((u, index)=>{
                if(u.access_token == socket.access_token){
                    usr = u;
                    users.splice(index, 1);
                    usr.access_token=null;
                    
                }
            });
            socket.broadcast.emit("update-user-list", getUserList());
            stopWriting();
            if(usr && socket.hasjoin) socket.broadcast.emit('show-popup', usr.name+" vừa offline");
            
        }
    });

    // xac minh tai khoan
    socket.on('verify-account', (req)=>{
        let data = req.data;
        let url = 'http://localhost:8000/api/info/'+data.access_token;
        var xml = new XMLHttpRequest();
        xml.open('GET', url);
        xml.send();
        xml.onreadystatechange = () => {
            if(xml.readyState == 4){
                let info;
                try{
                    info = JSON.parse(xml.responseText);
                }catch(e){
                    info = {};
                }
                
                let success = req.success || 'verify-success';
                let fail = req.fail || 'verify-fail';
                
                if(typeof info == 'object' && info.data){
                    let user = info.data;
                    let index = getUserIndex(user.access_token);
                    if(index != -1){
                        users[index] = user;
                    }else{
                        users.push(user);
                    }
                    
                    socket.access_token = user.access_token;
                    socket.emit(success, user);
                }else{
                    // login fail
                    socket.emit(fail,data.access_token);

                }

            }
        }
    });


    socket.on('submit-login', (data)=>{
        let url = 'http://localhost:8000/api/info/'+data.access_token;
        var xml = new XMLHttpRequest();
        xml.open('GET', url);
        xml.send();
        xml.onreadystatechange = () => {
            if(xml.readyState == 4){
                let info;
                try{
                    info = JSON.parse(xml.responseText);
                }catch(e){
                    info = {};
                }
                
                if(typeof info == 'object' && info.data){
                    let user = info.data;
                    let index = getUserIndex(user.access_token);
                    
                    if(index != -1){
                        socket.emit('auth-error', user);
                    }else{
                        users.push(user);
                        socket.access_token = user.access_token;
                        socket.emit("login-success", user);
                        socket.broadcast.emit("update-user-list", getUserList());
                    }
                    
                }else{
                    // login fail
                    socket.emit('login-fail',info);

                }

            }
        }
    });


    socket.on("logout", function(req) {
        let success = req.success || 'logout-success';
        let fail = req.fail || 'logout-fail';
                
        if (typeof socket.access_token != 'undefined') {
            let usr = null;
            users.map((u, index)=>{
                if(u.access_token == socket.access_token){
                    usr = u;
                    users.splice(index, 1);
                    usr.access_token=null;
                    
                }
            });
            socket.broadcast.emit("update-user-list", getUserList());
            socket.emit(success, usr);
            if(usr) socket.broadcast.emit('show-popup', usr.name+" vừa offline");
        }else{
            socket.emit(fail);
        }
        stopWriting();
    });
    socket.on('joined', ()=>{
        if(socket.hasjoin) return;
        let user = getUser(socket.access_token);
        socket.broadcast.emit("update-user-list", getUserList());
        socket.broadcast.emit('show-popup', user.name+" vừa online");
        socket.hasjoin = true;
    });
    socket.on('send-message', (data)=>{
        if(!socket.access_token || socket.access_token===undefined){
            socket.emit('need-verify-before-send');
            return null;
        }
        if(data.message){
            let user = getUser(socket.access_token);
            let {message} = data;
            let msg = {
                name:user.name,
                email:user.email,
                avatar:user.avatar,
                messages:[message]
            };
            if(messages.length){
                let lastMsg = messages[messages.length-1];
                
                if(lastMsg.email === user.email){
                    lastMsg.messages.push(message);
                    messages[messages.length-1] = lastMsg;
                }else{
                    messages.push(msg);
                }

                    
                
            }else{
                messages.push(msg);
            }

            console.log(user.name+": "+data.message );
            socket.emit('send-message-success');
            io.sockets.emit('send-new-message', msg);
        }else{
            socket.emit('send-message-empty');
        }
    });

    socket.on('get-message-list', () => {
        socket.emit('update-message-list', messages);
    });


    socket.on('change-theme', (theme) => {
        socket.emit('change-theme', theme);
    });



    
    socket.on('writing', function() {
        if(!socket.access_token || socket.access_token===undefined){
            return null;
        }

        let user = getUser(socket.access_token);
        let isWritting = false;
        if(writeSomeThings.length){
            writeSomeThings.map((u)=>{
                if(u.email == user.email){
                    isWritting = true;
                }
            });    
        }
        if(!isWritting){
            writeSomeThings.push({
                name:user.name,
                email:user.email
            });
        }
        socket.broadcast.emit("someone-are-writing", writeSomeThings);
    });
    socket.on('stop-writing', stopWriting);


    socket.on('get-user-list', ()=>{
        socket.emit("update-user-list", getUserList());
    });
});

