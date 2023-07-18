const menu = document.getElementById("menu");
const menuOverlay = document.getElementById("menuOverlay");
const navbar = document.getElementById("navbar");
const crossButton = document.getElementById("cross");
const jsonUrl =
  "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json";
let menuOpen = false;

//* 產生元素
function generateItems() {
  const titleContainer = document.querySelector(".titleContainer");
  const data = [
    { id: "titleItem1", title: "title1" },
    { id: "titleItem2", title: "title2" },
    { id: "titleItem3", title: "title3" },
    { id: "titleItem4", title: "title4" },
    { id: "titleItem5", title: "title5" },
    { id: "titleItem6", title: "title6" },
    { id: "titleItem7", title: "title7" },
    { id: "titleItem8", title: "title8" },
    { id: "titleItem9", title: "title9" },
    { id: "titleItem10", title: "title10" },
    { id: "titleItem11", title: "title11" },
    { id: "titleItem12", title: "title12" },
  ];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const titleItem = document.createElement("div");
    titleItem.className = "titleItem";
    titleItem.id = item.id;

    const starBox = document.createElement("div");
    starBox.className = "starBox";

    const starImg = document.createElement("img");
    starImg.className = "star";
    starImg.src = "star.png";

    starBox.appendChild(starImg);

    const imgContainer2 = document.createElement("div");
    imgContainer2.className = "imgContainer2";

    const textBox = document.createElement("div");
    textBox.className = "textBox";

    const title = document.createElement("p");
    title.className = "p2";
    title.id = "title" + (i + 1);
    title.textContent = item.title;

    textBox.appendChild(title);
    imgContainer2.appendChild(textBox);

    titleItem.appendChild(starBox);
    titleItem.appendChild(imgContainer2);

    titleContainer.appendChild(titleItem);
  }
}

function showPromotion(jsonInfo) {
  for (let i = 0; i < 3; i++) {
    let stitle = jsonInfo.results[i].stitle;
    let pictureUrl = jsonInfo.results[i].file;
    pictureUrl = "http://" + pictureUrl.split("https://")[1];

    let promotion = `promotion${i + 1}`;
    let promotionImg = `promotionImg${i + 1}`;
    const paragraph = document.getElementById(promotion);
    const ImginPromotin = document.getElementById(promotionImg);

    paragraph.textContent = stitle;
    ImginPromotin.src = pictureUrl;
  }
}

function showItem(jsonInfo) {
  for (let i = 0; i < 12; i++) {
    let stitle = jsonInfo.results[i + 3].stitle;
    let pictureUrl = jsonInfo.results[i + 3].file;
    pictureUrl = "http://" + pictureUrl.split("https://")[1];

    let title = `title${i + 1}`;
    let titleImg = `titleItem${i + 1}`;
    const itemParagraph = document.getElementById(title);
    const titleBackground = document.getElementById(titleImg);
    itemParagraph.textContent = stitle;
    titleBackground.style.backgroundImage = `url(${pictureUrl})`;
  }
}

//* 接收json資料
async function fetchData() {
  try {
    const response = await fetch(jsonUrl);
    const data = await response.json();
    //* 輸出文字和圖片到頁面
    showPromotion(data.result);
    showItem(data.result);
  } catch (error) {
    console.error(error);
  }
}

//* button 功能
function toggleMenu() {
  if (menuOpen == true) {
    menuOverlay.classList.add("overlaySlideRight");
    menuOverlay.classList.remove("overlaySlideLeft");
    menuOpen = false;
  } else {
    menuOverlay.classList.add("overlaySlideLeft");
    menuOverlay.classList.remove("overlaySlideRight");
    menuOpen = true;
  }
}

generateItems();
fetchData();
menu.addEventListener("click", toggleMenu);
crossButton.addEventListener("click", toggleMenu);
