const users=[];

//join user to chat
function userJoin(id, username, room) {
    const user = {
        id,
        username,
        room
    };
    users.push(user);
    return user;
}

//get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
    
}

//user leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

//Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

function filteredRoomUsers(room,id) {
    const newusers = users.filter(user => user.room === room);
    
    const index = newusers.findIndex(user => user.id === id);
    
    if (index !== -1) {
        // console.log(newusers.splice(index, 1)[0]);
        return newusers.splice(index, 1)[0];
    }
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    filteredRoomUsers
};