console.log("======Task1=====");
//* 透過談話文字內容判斷人物是年齡大於１７歲
//* 關鍵詞："legal age","vote"
//* 如果敘述內有年齡狀況，應做數字大小判讀

function findAndPrint(messages) {
  for (const [person, message] of Object.entries(messages)) {
    ageText = message.match(/\d+/g);

    if (ageText != []) {
      if (parseInt(ageText) > 17) {
        console.log(person);
      }
    }

    if (message.includes("legal age") || message.includes("vote")) {
      console.log(person);
    }
  }
}

findAndPrint({
  Bob: "My name is Bob. I'm 18 years old.",
  Mary: "Hello, glad to meet you.",
  Copper: "I'm a college student. Nice to meet you.",
  Leslie: "I am of legal age in Taiwan.",
  Vivian: "I will vote for Donald Trump next week",
  Jenny: "Good morning.",
});

console.log("======Task2=====");
//* 計算Bonus總和
//* 獎金規則如下：(薪水*0.05+職位加給)＊表現狀況
//* 職位加給：Engineer=>500 , CEO=>1000, Sales=>750
//* 表現狀況：一般=>1 水準之上=>1.5 水準之下=>0.7
//* 以總獎金接近不超過10000元為主，用比例去分配各自獎金

function calculateSalaryWithBonus(employeesData) {
  let salaryBonus = [];
  bonusConvert = 0.05;
  for (let i = 0; i < employeesData.length; i++) {
    if (typeof employeesData[i].salary === "number") {
      salaryBonus.push(employeesData[i].salary);
    } else {
      if (/USD/.test(employeesData[i].salary)) {
        let salaryRemoveUSD = employeesData[i].salary.replace(/[^0-9.]/g, "");
        let salaryConvertNumber = parseInt(salaryRemoveUSD) * 30;
        salaryBonus.push(salaryConvertNumber);
      } else {
        let salaryRemoveComma = employeesData[i].salary.replace(/,/g, "");
        salaryConvertNumber = parseInt(salaryRemoveComma);
        salaryBonus.push(salaryConvertNumber);
      }
    }
  }
  salaryBonus = salaryBonus.map((money) => money * bonusConvert);
  return salaryBonus;
}

function calculatePerformanceWithBonus(employeesData) {
  performanceBonus = [];
  for (let i = 0; i < employeesData.length; i++) {
    if (/above/.test(employeesData[i].performance)) {
      performanceBonus.push(1.5);
    } else if (/below/.test(employeesData[i].performance)) {
      performanceBonus.push(0.7);
    } else {
      performanceBonus.push(1); //? average performance
    }
  }
  return performanceBonus;
}

function calculateRoleWithBonus(employeesData) {
  roleBonus = [];
  for (let i = 0; i < employeesData.length; i++) {
    if (employeesData[i].role == "Engineer") {
      roleBonus.push(500);
    } else if (employeesData[i].role == "CEO") {
      roleBonus.push(1000);
    } else {
      roleBonus.push(750); //? Sales
    }
  }
  return roleBonus;
}

function calculateSumOfBonus(data) {
  let sumOfBonus = 0;
  let totalBonus = 0;
  let bonus = [];
  let salary = calculateSalaryWithBonus(data.employees);
  let performance = calculatePerformanceWithBonus(data.employees);
  let role = calculateRoleWithBonus(data.employees);

  for (let i = 0; i < data.employees.length; i++) {
    bonus.push((salary[i] + role[i]) * performance[i]);
    sumOfBonus += bonus[i];
  }

  for (let i = 0; i < data.employees.length; i++) {
    bonus[i] = Math.floor((bonus[i] / sumOfBonus) * 10000); // ? 計算每人實質獎金
    console.log(data.employees[i]["name"], ":", bonus[i]);
  }

  for (let i = 0; i < data.employees.length; i++) {
    totalBonus += bonus[i];
  }
  console.log(totalBonus);
}

calculateSumOfBonus({
  employees: [
    {
      name: "John",
      salary: "1000USD",
      performance: "above average",
      role: "Engineer",
    },
    {
      name: "Bob",
      salary: 60000,
      performance: "average",
      role: "CEO",
    },
    {
      name: "Jenny",
      salary: "50,000",
      performance: "below average",
      role: "Sales",
    },
  ],
});
//============================================================================
console.log("=====Task3=====");
//* 將輸入的名字以陣列形式存以利後面資料處理 EX:["abc","def","ijk"]
//* 建立物件容器objectContainer存放object，每個object存放名字與中間字
//* 兩字名或三字名的中間字，以string角度來看都是在 name[1]的位置
//* 計算的中間字出現次數，並在objectContainer建立一個新object["number"]儲存中間字出現計數
//* 找出出現次數為１的資料，印出全命;若字典2內出現次數皆大於１，印出沒有

function valueCount(objectContainer, target) {
  let counter = 0;
  for (let i = 0; i < objectContainer.length; i++) {
    if (objectContainer[i]["middle_name"] == target) {
      counter++;
    }
  }
  return counter;
}

function findName(objectContainer) {
  let notFond = true; //? 利用Boolean確認是否印出“沒有“
  for (let i = 0; i < objectContainer.length; i++) {
    if (objectContainer[i]["number"] == 1) {
      console.log(objectContainer[i]["name"]);
      notFond = false;
    }
  }
  if (notFond == true) {
    console.log("沒有");
  }
}

function func(...data) {
  let nameArray = [];
  let objectContainer = [{}];

  nameArray.push(...data);
  for (let i = 1; i < nameArray.length; i++) {
    objectContainer.push({});
  }

  for (let i = 0; i < nameArray.length; i++) {
    objectContainer[i]["name"] = nameArray[i];
    objectContainer[i]["middle_name"] = nameArray[i][1];
  }

  for (let i = 0; i < nameArray.length; i++) {
    num = valueCount(objectContainer, objectContainer[i]["middle_name"]);
    objectContainer[i]["number"] = num;
  }

  findName(objectContainer);
}

func("彭大牆", "王明雅", "吳明");
func("郭靜雅", "王立強", "林靜宜", "郭立恆", "林花花");
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花");
//============================================================================
console.log("=====Task4=====");
//* There is a number sequence: 0, 4, 3, 7, 6, 10, 9, 13, 12, 16, 15, ...
//* 確認輸入值資訊 (Input<0 => Not Found, Input=0 => 0)
//* 探討輸入值為奇數或偶數，給予對應計算方式

function getNumber(num) {
  if (num === 0) {
    num = 0;
  } else if (num < 0) {
    num = "Not Fofound";
  } else {
    if (num % 2 === 1) {
      num = 4 + 3 * ((num - 1) / 2);
    } else {
      num = 3 * (num / 2);
    }
  }
  console.log(num);
}
getNumber(1);
getNumber(5);
getNumber(10);
//============================================================================
console.log("=====Task5=====");
//* 首先車廂相數量和狀態內容會是相同數量的陣列
//* 檢查相同陣列位置的狀態 1=>ok 0=>Not OK
//* 於新的陣列ok_status當中，可使用的車位輸入正確數量，不可使用的車位輸入0
//* 比對人數與okStatus當中的數量
//* 找出最接近且大於或等於人數的ok_status的元素，若無則最終輸出-1
//* 將該元素放入seats[]當中，找出車廂排序位置

function findOkStatus(seats, status) {
  let okStatus = [];
  for (let i = 0; i < seats.length; i++) {
    if (status[i] === 1) {
      okStatus.push(seats[i]);
    } else {
      okStatus.push(0); //?不可使用的車廂元素存為0
    }
  }
  return okStatus;
}

function findClosestNumber(okStatus, target) {
  // ? 找出合適的車廂的內容物
  let closestNumber = Number.POSITIVE_INFINITY; // ? 初始值設定無限大
  for (let i = 0; i < okStatus.length; i++) {
    if (okStatus[i] >= target && okStatus[i] < closestNumber) {
      closestNumber = okStatus[i];
    }
  }
  return closestNumber;
}

function findIndexOfCar(seats, status, number) {
  okStatus = findOkStatus(seats, status);
  ideaCar = findClosestNumber(okStatus, number);

  // ? 車位無法滿足時
  if (ideaCar === Number.POSITIVE_INFINITY) {
    console.log(-1);
  } else {
    for (let i = 0; i < okStatus.length; i++) {
      if (okStatus[i] === ideaCar) {
        console.log(i);
      }
    }
  }
}
findIndexOfCar([3, 1, 5, 4, 2], [0, 1, 0, 1, 1], 2);
findIndexOfCar([1, 0, 5, 1, 3], [0, 1, 0, 1, 1], 4);
findIndexOfCar([4, 6, 5, 8], [0, 1, 1, 1], 4);
