const socket = io();
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".messgarea");
//name
let username;
do {
  username = prompt("please enter the name");
} while (!username);
textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendmessage(e.target.value);
  }
});
//sending the message from client to server
function sendmessage(msgdata) {
  let msg = {
    user: username,
    message: msgdata.trim(),
  };
  //append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrolltobottom();
  //send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  let markup = `
          <h3>${msg.user}</h3>
          <p> ${msg.message}</p>
  `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

//receiving the message

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrolltobottom();
});

function scrolltobottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
