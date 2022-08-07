const socket = io();

const chatForm = document.getElementById('send-container');
const chatContainer = document.querySelector('.container');
const Roomname = document.getElementById('roomname');
const userlist = document.getElementById('users');
// get username and roomname
const { username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix:true
});
if (username.length === 0 || room.length === 0) {
    alert("username and roomname is required");
    window.location = '/';
}
console.log(username, room);

//join chatroom
socket.emit('joinRoom', { username, room });

//get room and users
socket.on('roomUsers', ({ room, users,currentuser }) => {
    outputRoomName(room);
    outputUsers(users,currentuser);
    // console.log(users);
})

socket.on('message', message => {
    console.log(message);
    outputMessage(message, 'right');
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
});

socket.on('send', (message,position) => {
    outputMessage(message, position);
    chatContainer.scrollTop = chatContainer.scrollHeight;
})


//message submit

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //storing message
    const msg = e.target.elements.messageInp.value;
    e.target.elements.messageInp.value = "";
    e.target.elements.messageInp.focus();
    socket.emit('chatMessage', msg, 'right');
    
})

function outputMessage(message, position) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.classList.add(position);
    // div.innerText =  `${message.username}:${message.text}`;
    div.innerHTML =  `<div class="username">${message.username}</div>${message.text} <span class="time">${message.time}</span>`;
    chatContainer.append(div);
}

//Add room name to Dom
function outputRoomName(room) {
    Roomname.innerHTML = ` <span class="subroom"> Roomname:</span>  ${room}`;
    
}

function outputUsers(users,currentuser) {
    // console.log(currentuser);
    // const newusers = [];

    // for (var i = 0; i < users.length; i++){
    //     if (users[i].username != currentuser.username) {
    //         // const div = document.createElement('div');
    //         // div.classList.add('otheruser');
    //         // div.innerHTML = `${users[i].username}<div class="status">Active now <span class="circle"></span></div>`;
    //         // userlist.append(div);
    //         // console.log(div);
    //         newusers.push(users[i]);
    //     }
    // }
    // console.log(newusers);
    userlist.innerHTML = `
    ${users.map(user=>`<div class="otheruser">${user.username}<div class="status">Active now <span class="circle"></span></div></div>`).join('')}
    `;
    
}