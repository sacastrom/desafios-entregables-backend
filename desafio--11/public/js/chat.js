const socket = io();

let user;

let chatBox = document.getElementById("chatbox");

Swal.fire({
  title: "Submit your Github username",
  input: "text",
  inputAttributes: {
    autocapitalize: "off",
  },
  showCancelButton: true,
  confirmButtonText: "Look up",
  showLoaderOnConfirm: true,
  preConfirm: (login) => {
    return fetch(`//api.github.com/users/${login}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((error) => {
        Swal.showValidationMessage(`Request failed: ${error}`);
      });
  },
  allowOutsideClick: () => !Swal.isLoading(),
}).then((result) => {
    console.log(result.value.login)
    user = result.value.login;
    socket.emit("new-user", { user: user, id: socket.id });
  if (result.isConfirmed) {
    Swal.fire({
      title: `${result.value.login}'s avatar`,
      imageUrl: result.value.avatar_url,
    });
  }
});

chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", {
        user: user,
        message: chatBox.value,
      });
      chatBox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let message = "";

  data.forEach((elem) => {
    message += `
       
          <div class="chat-message">
          <div class="message-bubble">
    
            <div class="message-sender">${elem.user}</div>
            <p class="message-message">${elem.message}</p>
            </div>
    
          </div>
        `;
  });

  log.innerHTML = message;
});

socket.on("new-user-connected", (data) => {
    if (data.id !== socket.id)
      Swal.fire({
        text: `${data.user} se ha conectado al chat`,
        toast: true,
        position: "top-end",
      });
  });
