var express = require("express");
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.use(express.static("public"));

var server = require("http").Server(app);
var io = require("socket.io")(server);
var api_url = 'http://chinhlatoi.com/api';
server.listen(process.env.PORT || 3000);

var users = [];
var ChatRoom = {
    general:{
        online:[],
        members:[],
        messages:[],
        writeSomeThings:[]
    }
};

function getUser(access_token){
    let user = null;
    users.map((data)=>{
        if(data.access_token == access_token){
            user = data;
        }
    });
    return user;
}
function getUserBy(name,value){
    let user = null;
    users.map((data)=>{
        if(data[name] == value){
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
    
    let isVerify = () => {
        if(!socket.access_token) return false;
        if(!getUser(socket.access_token)) return false;
        return true;

    }

    let getClientAccessToken = () => {
        socket.emit('get-client-access-token');
    }



    let roomEmit = (event, data, to) => {
        if(socket.myRoom){
            if(!to || to == 1){
                socket.broadcast.to(socket.myRoom).emit(event, data);
            }else{
                io.to(socket.myRoom).emit(event, data);
            }
        }
    }
    let checkRoom = () => {
        if(!socket.myRoom) return false;
        return (typeof(ChatRoom[socket.myRoom]) != 'undefined');
    }
    
    function stopWriting() {
        if(!socket.access_token || socket.access_token===undefined){
            //socket.emit('need-verify-before-send');
            return null;
        }if(!checkRoom()) return false;

        let user = getUser(socket.access_token);
        if(ChatRoom[socket.myRoom].writeSomeThings.length && user){
            ChatRoom[socket.myRoom].writeSomeThings.map((u, i)=>{
                if(u.email == user.email){
                    ChatRoom[socket.myRoom].writeSomeThings.splice(i, 1);
                }
            });
        }
        roomEmit("someone-are-writing", ChatRoom[socket.myRoom].writeSomeThings);
    }
    let getRoomMember = () => {
        let users = [];
        if(ChatRoom[socket.myRoom].members.length){
            ChatRoom[socket.myRoom].members.map((email) => {
                let mem = getUserBy('email',email);
                if(mem){
                    users.push(mem);
                }
            });
        }
        return users;
    }
    
    const leaveRoom = () => {
        if(socket.myRoom){
            let room = socket.myRoom;
            let user = getUser(socket.access_token);
            stopWriting();

            
            if(typeof(ChatRoom[room]) != 'undefined'){
                if(user){
                    ChatRoom[room].online.map((email, index)=>{
                        if(email == user.email){
                            ChatRoom[socket.myRoom].online.splice(index, 1);
                        }
                    });
    
                    if(room == 'general'){
                        ChatRoom[room].members.map((email, index)=>{
                            if(email == user.email){
                                ChatRoom[room].members.splice(index, 1);
                            }
                        });
    
                    }
                    roomEmit("update-user-list", getRoomMember(),2);
                }
            }
            roomEmit('show-popup', user.name+" vừa offline");
            socket.leave(room);
            
            socket.myRoom = null;
        }
    }
    const joinRoom = (room) => {
        leaveRoom();
        if(!isVerify()) return getClientAccessToken();
        let user = getUser(socket.access_token);
        let assign = () => {
            socket.join(room);
            if(ChatRoom[room].online.indexOf(user.email) == -1){
                ChatRoom[room].online.push(user.email);
            }
            if(room === 'general'){
                ChatRoom[room].members.push(user.email);
            }
            socket.myRoom = room;
            roomEmit("update-user-list", getRoomMember(), 2);
            roomEmit('show-popup', user.name+" vừa online");
            socket.emit('join-room-success');
            socket.emit('update-message-list', ChatRoom[socket.myRoom].messages);
        };

        if(typeof ChatRoom[room] != 'undefined'){
            assign();
        }else{
            let url = api_url+'/room/'+room;
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
                        console.log(xml.responseText);
                    }
                    
                    if(typeof info == 'object' && info.data){
                        let {data} = info;
                        ChatRoom[data.room] = {
                            name:data.name,
                            online:[],
                            members:data.members,
                            ref: data.ref,
                            messages:[],
                            writeSomeThings:[]
                        };
                        assign();
                        
                    }else{
                        // login fail
                        socket.emit('join-room-fail',info);

                    }

                }
            }
        };
    }

    let addUser = (user) => {
        let index = getUserIndex(user.access_token);
        if(index != -1){
            
            if(typeof user.socket_ids != 'undefined'){
                user.socket_ids.push(socket.id);
            }else{
                user['socket_ids'] = [socket.id];
            }
            
            users[index] = user;
        }else{
            user['socket_ids'] = [socket.id];
            let u = {};
            for (const key in user) {
                if (user.hasOwnProperty(key)) {
                    const element = user[key];
                    u[key] = element;
                }
            }

            users.push(u);
        }
        
        socket.access_token = user.access_token;
    }

    let removeUser = () => {
        users.map((u, index)=>{
            if(u.access_token == socket.access_token){
                if(u.socket_ids.length>1){
                    users[index].socket_ids.map((sid, i)=>{
                        if(sid == socket.id){
                            users[index].socket_ids.splice(i, 1);
                        }
                    });
                }
                else{
                    users.splice(index, 1);
                }
            }
        });
        
    }

    // ngat ket noi
    socket.on('disconnect', function() {
        if (typeof socket.access_token != 'undefined') {
            leaveRoom();
            removeUser()
            // socket.broadcast.emit("update-user-list", getUserList());
            
            // if(usr && socket.hasjoin) socket.broadcast.emit('show-popup', usr.name+" vừa offline");
            
        }
    });

    // xac minh tai khoan
    socket.on('verify-account', (req)=>{
        let data = req.data;
        let url = api_url+'/info/'+data.access_token;
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
                    addUser(user);
                    socket.emit(success, user);
                }else{
                    // login fail
                    socket.emit(fail,data.access_token);

                }

            }
        }
    });


    socket.on('submit-login', (data)=>{
        let url = api_url+'/info/'+data.access_token;
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
                    addUser(user);
                    socket.emit("login-success", user);
                    socket.broadcast.emit("update-user-list", getUserList());
                    
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
            leaveRoom();
            removeUser();
            //socket.broadcast.emit("update-user-list", getUserList());
            socket.emit(success, usr);
            //if(usr) socket.broadcast.emit('show-popup', usr.name+" vừa offline");
        }else{
            socket.emit(fail);
        }
        stopWriting();
    });


    socket.on('join-room', (room)=>{
        joinRoom(room);
    });

    socket.on('leave-room', ()=> {
        leaveRoom();
    });

    socket.on('leave-group', id => {
        let {myRoom} = socket;
        let name = getUser(socket.access_token).name;
        leaveRoom();
        setTimeout(()=>{

            socket.broadcast.to(myRoom).emit('show-popup', name+" vừa rời nhóm");
            socket.broadcast.to(myRoom).emit('anothor-leave-group', id);
        }, 5000);
    });

    socket.on('new-member-added', (member) => {
        roomEmit('show-popup', member.name+" vừa được thêm vào nhóm "+member.group);
        let u = getUserBy('email', member.email);
        let admin = getUser(socket.access_token);
        if(u && u.socket_ids){
            u.socket_ids.map(sid => {
                if(admin){
                    io.to(sid).emit('show-popup', admin.name+" vừa thêm bạn vào nhóm "+member.group);
                }else{
                    io.to(sid).emit('show-popup', "Bạn vừa được thêm vào nhóm "+member.group);
                }
                io.to(sid).emit('refresh-group');
            });
        }
    });
    
    socket.on('remove-member-success', (member) => {
        roomEmit('show-popup', member.name+" vừa đá khỏi nhóm "+member.group);
        let u = getUserBy('email', member.email);
        let admin = getUser(socket.access_token);
        if(u && u.socket_ids){
            u.socket_ids.map(sid => {
                if(admin){
                    io.to(sid).emit('show-popup', admin.name+" vừa đá bạn khỏi nhóm "+member.group);
                }else{
                    io.to(sid).emit('show-popup', "Bạn vừa bị đá khỏi nhóm nhóm "+member.group);
                }
                io.to(sid).emit('out-group', member.group_id);

            });
        }
    });

    socket.on('delete-group-success', (group) => {
        let admin = getUser(socket.access_token);
        roomEmit('show-popup', admin.name+" vừa cóa nhóm "+group.name);
        if(group.members){
            group.members.map(email => {
                let u = getUserBy('email',email);
                if(email !== admin.email && u && u.socket_ids){
                    u.socket_ids.map(sid => {
                        io.to(sid).emit('show-popup', admin.name+" vừa xóa nhóm nhóm "+group.name);
                        io.to(sid).emit('out-group', group.id);
                    });
                }
            });
        }
        
    });
    

    socket.on('send-message', (data)=>{
        if(!socket.access_token || socket.access_token===undefined){
            socket.emit('need-verify-before-send');
            return null;
        }
        if(!checkRoom()){
            return false;
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
            let {messages} = ChatRoom[socket.myRoom];
            if(messages.length){
                let lasyIndex = messages.length-1;
                let lastMsg = messages[lasyIndex];
                
                if(lastMsg.email === user.email){
                    lastMsg.messages.push(message);
                    messages[lasyIndex] = lastMsg;
                }else{
                    messages.push(msg);
                }
            }else{
                messages.push(msg);
            }
            ChatRoom[socket.myRoom].messages = messages;

            socket.emit('send-message-success');
            roomEmit('send-new-message', msg, 2);
            if(socket.myRoom!=='general'){
                if(typeof ChatRoom[socket.myRoom] != 'undefined'){
                    let room = ChatRoom[socket.myRoom];
                    if(room.members.length){
                        room.members.map((email, ind) => {
                            if(email!=user.email && room.online.indexOf(email) == -1){

                                let member = getUserBy('email', email);
                                if(member && member.socket_ids.length){
                                    let msg = user.name + " vừa gửi tin nhắn "+(room.ref=='friend'?"cho bạn":"dên nhóm "+room.name);
                                    member.socket_ids.map((s,i)=>{
                                        io.to(s).emit('show-popup', msg);
                                    })
                                }
                            }
                        });
                    }
                }
            }
        }else{
            socket.emit('send-message-empty');
        }
    });

    socket.on('delete-all-message', ()=>{
        if(!checkRoom()) return;
        ChatRoom[socket.myRoom].messages = [];
        roomEmit('update-message-list', ChatRoom[socket.myRoom].messages, 2);
    })
 
    socket.on('get-message-list', () => {
        if(!checkRoom()){
            return false;
        }
        roomEmit('update-message-list', ChatRoom[socket.myRoom].messages);
    });


    socket.on('change-theme', (theme) => {
        socket.emit('change-theme', theme);
    });

    socket.on('writing', function() {
        if(!socket.access_token || socket.access_token===undefined){
            return null;
        }

        if(!checkRoom()) return false;
        let user = getUser(socket.access_token);
        let isWritting = false;
        if(ChatRoom[socket.myRoom].writeSomeThings.length){
            ChatRoom[socket.myRoom].writeSomeThings.map((u)=>{
                if(u.email == user.email){
                    isWritting = true;
                }
            });    
        }
        if(!isWritting){
            ChatRoom[socket.myRoom].writeSomeThings.push({
                name:user.name,
                email:user.email
            });
        }
        roomEmit("someone-are-writing", ChatRoom[socket.myRoom].writeSomeThings);
    });
    socket.on('stop-writing', stopWriting);


    socket.on('get-user-list', ()=>{
        if(!checkRoom()){
            return false;
        }
        
        socket.emit("update-user-list", getRoomMember());
    });

    socket.on('update-friend-list', () => {
        let url = api_url+'/friends/'+socket.access_token;
        var xml = new XMLHttpRequest();
        xml.open('GET', url);
        xml.send();
        xml.onreadystatechange = () => {
            if(xml.readyState == 4){
                let friends;
                try{
                    friends = JSON.parse(xml.responseText);
                }catch(e){
                    friends = {};
                }
                
                if(typeof friends == 'object' && friends.data){
                    socket.emit('update-friend-list', friends.data);
                }else{
                    
                }

            }
        }
    });
});