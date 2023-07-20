const menu = document.getElementById("menu");
const menuOverlay = document.getElementById("menuOverlay");
const navbar = document.getElementById("navbar");
const crossButton = document.getElementById("cross");
const loadBtn = document.getElementById("loadBtn");
const jsonUrl =
  "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json";
let menuOpen = false;
let clickCount = 0;
let loopCount = 12;

//* 產生元素
function generateItems(listOfItems) {
  const titleContainer = document.querySelector(".titleContainer");

  let data = [];
  for (let i = 0; i < loopCount; i++) {
    let dataContent = { id: `titleItem${i + listOfItems}`, title: `Loading` };
    data.push(dataContent);
  }

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
    title.id = "title" + (i + listOfItems);
    title.textContent = item.title;

    textBox.appendChild(title);
    imgContainer2.appendChild(textBox);

    titleItem.appendChild(starBox);
    titleItem.appendChild(imgContainer2);

    titleContainer.appendChild(titleItem);
  }
}

//* Promotion 資訊輸出
async function getDataForPromotion() {
  try {
    const result = await fetchData();
    for (let i = 0; i < 3; i++) {
      let stitle = result.results[i].stitle;
      let pictureUrl = result.results[i].file;
      pictureUrl = "http://" + pictureUrl.split("https://")[1];

      let promotion = `promotion${i + 1}`;
      let promotionImg = `promotionImg${i + 1}`;
      const paragraph = document.getElementById(promotion);
      const Photo = document.getElementById(promotionImg);

      paragraph.textContent = stitle;
      Photo.src = pictureUrl;
    }
  } catch (error) {
    console.error(error);
  }
}

//* Item 資訊輸出
async function getDataForItems(totalItems) {
  try {
    const result = await fetchData();
    for (let i = totalItems - loopCount; i < totalItems; i++) {
      let stitle = result.results[i + 3].stitle;
      let pictureUrl = result.results[i + 3].file;
      pictureUrl = "http://" + pictureUrl.split("https://")[1];

      let title = `title${i + 1}`;
      let itemParagraph = document.getElementById(title);
      itemParagraph.textContent = stitle;

      let titleImg = `titleItem${i + 1}`;
      let titleBackground = document.getElementById(titleImg);
      titleBackground.style.backgroundImage = `url(${pictureUrl})`;
    }
  } catch (error) {
    console.error(error);
  }
}

//* 接收json資料
async function fetchData() {
  try {
    const response = await fetch(jsonUrl);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error(error);
  }
}

//* 菜單功能
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

function loadMore() {
  clickCount++;
  if (clickCount <4) {
    generateItems(clickCount*12+1);
    getDataForItems((clickCount+1)*12);
  } else if (clickCount == 4) {
    loopCount = 7;
    generateItems(49);
    getDataForItems(55);
    loadBtn.style.display = "none";
  }
}

//* 初始載入狀況
generateItems(1);
getDataForPromotion();
getDataForItems(12);

menu.addEventListener("click", toggleMenu);
crossButton.addEventListener("click", toggleMenu);
loadBtn.addEventListener("click", loadMore);