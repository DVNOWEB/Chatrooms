// Description: This file contains the functions to handle the users

const users = [];

const userJoin = ( id, username, room ) => {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user

const getCurrentUser = (id) => {
  return users.find(user => user.id === id);
}

// User leaves chat
const userLeave = (id) => {
  const index = users.findIndex(user => user.id === id);

  if(index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
const getRoomUsers = (room) => {
  return users.filter(user => user.room === room);
}

// export module 

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
}