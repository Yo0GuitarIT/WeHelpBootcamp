document.getElementById("submitButton").addEventListener("click", function () {
  let message = document.getElementById("message").value;

  // 使用JavaScript變數來獲取使用者帳號名稱
  let name = currentUsername;

  // 動態生成顯示訊息的元素
  let messageContainer = document.getElementById("messageContainer");
  let newMessageDiv = document.createElement("p");
  newMessageDiv.classList.add("message");
  newMessageDiv.textContent = name + ":" + message;

  // 將新元素加入訊息區域
  messageContainer.appendChild(newMessageDiv);

  // 清空輸入框
  document.getElementById("message").value = "";

  // 使用AJAX將留言儲存到資料庫
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/createMessage", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("message_content=" + encodeURIComponent(message));

  console.log(name + ": " + encodeURIComponent(message));
});

//!------------------------------------------------------------------------------

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteButton")) {
        let messageContent = event.target.getAttribute("data-message-content");
        console.log(messageContent);
  
      // 從畫面上移除該留言元素
      event.target.parentElement.remove();
  
      // 發送 AJAX 請求給後端，告訴它要刪除的留言的 ID
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/deleteMessage", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status !== 200) {
            console.error("刪除留言失敗");
          }
        }
      };
      xhr.send("message_content=" + encodeURIComponent(messageContent));
    }
  });
  