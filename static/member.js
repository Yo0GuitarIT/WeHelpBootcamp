function addMessage(message, messageContainer, insertedMessageID) {
  let newMessageDiv = document.createElement("p");
  newMessageDiv.classList.add("message");
  newMessageDiv.textContent = currentName + ": " + message + " ";

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");
  deleteButton.textContent = "X";
  deleteButton.setAttribute("data-message-content", insertedMessageID);

  newMessageDiv.appendChild(deleteButton);
  messageContainer.appendChild(newMessageDiv);
}

function deleteMessage(messageID, messageDiv) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/deleteMessage", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        messageDiv.remove();
        console.log("Message deleted:", messageID);
      } else {
        console.error("Failed to delete message");
      }
    }
  };
  xhr.send("message_ID=" + encodeURIComponent(messageID));
}

document.getElementById("submitButton").addEventListener("click", function () {
  let message = document.getElementById("message").value;
  let messageContainer = document.getElementById("messageContainer");
  document.getElementById("message").value = "";
  
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/createMessage", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  let postData = "message_content=" + encodeURIComponent(message);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let insertedMessageID = xhr.responseText;
        addMessage(message, messageContainer, insertedMessageID);
        console.log("Inserted Message ID:", insertedMessageID);
      } else {
        console.error("Failed to create message");
      }
    }
  };
  xhr.send(postData);
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteButton")) {
    let messageID = event.target.getAttribute("data-message-content");
    let messageDiv = event.target.parentElement;
    deleteMessage(messageID, messageDiv);
  }
});
