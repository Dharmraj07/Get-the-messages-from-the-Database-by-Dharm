const socket = io("http://localhost:8000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const API_URL="http://localhost:8000";
const token=localStorage.getItem('token');

//const name = prompt('What is your name?')
const name = localStorage.getItem("username");
console.log(name);
appendMessage("You joined");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
  console.log(`incoming message ,${data}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit",async (e) => {
  e.preventDefault();
  const message = messageInput.value;
  console.log(message);
  const response = await axios.post(
    `${API_URL}/chat`,{message},
    {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    },
);
  console.log(response.data);
  appendMessage(`${name}: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});


function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

function allChatAppend(data){
  data.forEach(element => {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<b>${element.username}  :</b>${element.message}`
    messageContainer.append(messageElement);
  });
}
  async function allChat(){
try {
  const response = await axios.get(
    `${API_URL}/chat`,
    {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    },
);
const {data}=response;
 console.log(data);
 allChatAppend(data);
} catch (error) {
  console.error(error);
}
  }

allChat();

