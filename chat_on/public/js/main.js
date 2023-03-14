const chatForm = document.querySelector('#chat_form')
const chatMessages = document.querySelector('.chat_messages')
const roomName = document.querySelector('#room_name')
const userList = document.querySelector('#users')


// Get username and room from URL using qs
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

const socket = io()

// join chatroom
socket.emit('joinRoom', { username, room })

// room and users info
socket.on('roomUsers', ({ room, users}) => {
  outputRoomName(room)
  outputUsers(users)
})

// message from server
socket.on('message', (message) => {
  console.log(message)
  outputMessage(message)

  // scroll down to the latest message
  chatMessages.scrollTop = chatMessages.scrollHeight
})

// submit message
chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // get message text
  const msg = e.target.elements.msg.value

  // emit message to server
  socket.emit('chatMessage', msg)


  // clear input
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

// output message to DOM
function outputMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message')

  // Escape HTML characters in the message
  const text = document.createTextNode(message.text)
  const p = document.createElement('p')
  p.classList.add('text')
  p.appendChild(text)

  div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
  `
  // Append the escaped message as text content, not as raw HTML
  div.querySelector('.meta').appendChild(p)

  document.querySelector('.chat_messages').appendChild(div)
}


// add room name to DOM
const outputRoomName = (room) => {
  roomName.innerText = room
}

// add users to DOM
const outputUsers = (users) => {
  userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `
}