let addMessage = (message, messageContainer, insertedMessageID) => {
  let newMessageDiv = document.createElement("p");
  newMessageDiv.classList.add("message");
  newMessageDiv.textContent = currentName + ": " + message + " ";

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");
  deleteButton.textContent = "X";
  deleteButton.setAttribute("data-message-content", insertedMessageID);

  newMessageDiv.appendChild(deleteButton);
  messageContainer.appendChild(newMessageDiv);
};

let deleteMessage = (messageID, messageDiv) => {
  sendPostRequest(
    "/deleteMessage",
    "message_ID=" + encodeURIComponent(messageID),
    {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  ).then((response) => {
    if (response && response.ok) {
      messageDiv.remove();
      console.log("Message deleted:", messageID);
    } else {
      console.error("Failed to delete message");
    }
  });
};

async function sendPostRequest(url, data, headers) {
  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

let validate = (message) => {
  if (/[\>\<]/.test(message)) {
    return {
      isValid: false,
      errorMessage: "Incorrect Format",
    };
  }

  if (message.trim() === "") {
    return {
      isValid: false,
      errorMessage: "It must not be empty.",
    };
  }

  return {
    isValid: true,
    errorMessage: "",
  };
};

let displayErrorMessage = (errorMessage, errorContainer) => {
  errorContainer.innerHTML = errorMessage;
  errorContainer.style.display = "block";
};

let hideErrorMessage = (errorContainer) => {
  errorContainer.style.display = "none";
};


document.getElementById("message").addEventListener("input", function () {
  const errorContainer = document.getElementById("errorContainer");
  hideErrorMessage(errorContainer);
});

document.getElementById("submitButton").addEventListener("click", async () => {
  const message = document.getElementById("message").value;
  const messageContainer = document.getElementById("messageContainer");
  const errorContainer = document.getElementById("errorContainer");
  document.getElementById("message").value = "";

  const validationResult = validate(message);
  if (validationResult.isValid) {
    const postData = "message_content=" + encodeURIComponent(message);
    const response = await sendPostRequest("/createMessage", postData, {
      "Content-Type": "application/x-www-form-urlencoded",
    });

    if (response) {
      addMessage(message, messageContainer, response);
      console.log("Inserted Message ID:", response);
    } else {
      console.error("Failed to create message");
    }
  } else {
    displayErrorMessage(validationResult.errorMessage, errorContainer);
  }
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteButton")) {
    const messageID = event.target.getAttribute("data-message-content");
    const messageDiv = event.target.parentElement;
    deleteMessage(messageID, messageDiv);
  }
});

document.getElementById("queryButton").addEventListener("click", function () {
  const memberAccount = document.getElementById("memberAccount").value;
  const resultDiv = document.getElementById("resultDiv");

  const validationResult = validate(memberAccount);
  if (!validationResult.isValid) {
    resultDiv.innerHTML = `<p>${validationResult.errorMessage}</p>`;
    resultDiv.style.display = "block";
    return;
  }

  resultDiv.style.display = "none";
  const apiUrl = `/api/member?username=${encodeURIComponent(memberAccount)}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.data) {
        const memberData = data.data;
        const nameElement = document.createElement("p");
        const usernameElement = document.createElement("p");
        nameElement.textContent = `Name: ${memberData.name}`;
        usernameElement.textContent = `Username: ${memberData.username}`;
        resultDiv.innerHTML = "";

        resultDiv.appendChild(nameElement);
        resultDiv.appendChild(usernameElement);

        resultDiv.style.display = "block";
      } else {
        resultDiv.innerHTML = "<p>Member not found.</p>";
        resultDiv.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML =
        "<p>An error occurred while fetching member data.</p>";
      resultDiv.style.display = "block";
    });

  document.getElementById("memberAccount").addEventListener("input", () => {
    resultDiv.style.display = "none";
  });
});

const changeResult = document.getElementById("changeResultDiv");
const changeNameButton = document.getElementById("changeNameButton");
const welcomeMessage = document.getElementById("welcomeMessage");
welcomeMessage.textContent = `${currentName}`;
changeResult.style.display = "none";

changeNameButton.addEventListener("click", async () => {
  const newName = document.getElementById("changeName").value;

  const validationResult = validate(newName);
  if (!validationResult.isValid) {
    changeResult.innerHTML = `<p>${validationResult.errorMessage}</p>`;
    changeResult.style.display = "block";
    return;
  }

  const apiUrl = "http://127.0.0.1:3000/api/member";
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    if (data.ok) {
      document.getElementById("changeName").value = "";
      changeResult.innerHTML = "<p>Name updated successfully.</p>";
      changeResult.style.display = "block";
      currentName = newName;
      welcomeMessage.textContent = `${newName}`;
    } else {
      console.log("Name update failed.");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  document.getElementById("changeName").addEventListener("input", () => {
    changeResult.style.display = "none";
  });
});
