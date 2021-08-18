var people = document.getElementById('people');
const _message_Container = document.getElementById('msgInput');
const chat = document.getElementById('CHAT')
const _message_ = document.getElementById('msg');
_message_.focus();
const { Name } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})
const socket = io();
socket.emit('USERNAME', {Name})
socket.on('botmessage', msg => {
    newbotMessage(msg);
    chat.scrollTop = chat.scrollHeight;
})
socket.on('totalUsers', users => {
    people.innerHTML = `<i class="fas fa-users"></i>&nbsp;Total ${users} participants`
})
socket.on('message', msg => {
    newMessage(msg);
    chat.scrollTop = chat.scrollHeight;
    _message_.focus();
})
_message_Container.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    if (msg != '') socket.emit("chatMessage", msg);
    e.target.elements.msg.value = '';
})
function newbotMessage(msg) {
    const div = document.createElement("div");
    div.classList.add('botMessage')
    div.innerHTML = `${msg.text}`;
    chat.appendChild(div);
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function newMessage(msg){
    const div = document.createElement("div");
    div.classList.add('message')
    let logo = msg.user.charAt(0)+msg.user.charAt(1)
    div.innerHTML = `
        <div class="sender"><span class="sender-logo" id="_logo_" style="background: ${getRandomColor()}">${logo}</span> ${msg.user}</div>
        <pre>${msg.text}</pre>
    `;
    chat.appendChild(div);
}