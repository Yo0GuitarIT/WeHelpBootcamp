import re
print("Task 1:")
# * 透過談話文字內容判斷人物是年齡大於１７歲
# * 關鍵詞："legal age","vote"
# * 如果敘述內有年齡狀況，應做數字大小判讀


def find_and_print(messages):
    for person, message in messages.items():
        age_text = re.findall(r"\d+", message)
        if age_text != []:
            if int(age_text[0]) > 17:
                print(person)
        elif "legal age" in message or "vote" in message:
            print(person)


find_and_print({
    "Bob": "My name is Bob. I'm 18 years old.",
    "Mary": "Hello, glad to meet you.",
    "Copper": "I'm a college student. Nice to meet you.",
    "Leslie": "I am of legal age in Taiwan.",
    "Vivian": "I will vote for Donald Trump next week",
    "Jenny": "Good morning."
})

print("================================================")
print("Task 2:")
# * 計算Bonus總和
# * 獎金規則如下：(薪水*0.05+職位加給)＊表現狀況
# * 職位加給：Engineer=>500 , CEO=>1000, Sales=>750
# * 表現狀況：一般=>1 水準之上=>1.5 水準之下=>0.7
# * 以總獎金接近不超過10000元為主，用比例去分配各自獎金


def calculate_salary_with_bonus(salary_data):
    salary_bonus = []
    bonus_convert = 0.05
    for i in range(len(salary_data)):
        if type(salary_data[i]["salary"]) == int:
            salary_bonus.append(salary_data[i]["salary"]*bonus_convert)
        else:
            if re.search("USD", salary_data[i]["salary"]):
                get_number = re.sub("[^0-9]", "", salary_data[i]["salary"])
                salary_bonus.append(int(get_number)*30*bonus_convert)
            else:
                get_number = re.sub("[^0-9]", "", salary_data[i]["salary"])
                salary_bonus.append(int(get_number)*bonus_convert)
    return salary_bonus


def calculate_performance_with_bonus(performance_data):
    performance_bonus = []
    for i in range(len(performance_data)):
        if re.search("above", performance_data[i]["performance"]):
            performance_bonus.append(1.5)
        elif re.search("below", performance_data[i]["performance"]):
            performance_bonus.append(0.7)
        else:
            performance_bonus.append(1)  # * average performance
    return performance_bonus


def calculate_role_with_bonus(role_data):
    role_bonus = []
    for i in range(len(role_data)):
        if role_data[i]["role"] == "Engineer":
            role_bonus.append(500)
        elif role_data[i]["role"] == "CEO":
            role_bonus.append(1000)
        else:
            role_bonus.append(750)  # *Sales
    return role_bonus


def calculate_sum_of_bonus(data):
    bonus_sum = 0
    total_bonus = 0
    bonus = []
    salary = calculate_salary_with_bonus(data["employees"])
    performance = calculate_performance_with_bonus(data["employees"])
    role = calculate_role_with_bonus(data["employees"])

    for i in range(len(data["employees"])):
        bonus.append((salary[i]+role[i])*performance[i])
        bonus_sum += bonus[i]

    for i in range(len(data["employees"])):
        bonus[i] = int(bonus[i]/bonus_sum*10000)  # ? 計算每人實質獎金
        print(data["employees"][i]["name"], bonus[i])

    for i in range(len(data["employees"])):
        total_bonus += bonus[i]

    print("Total bonus:", total_bonus)


calculate_sum_of_bonus({
    "employees": [{
        "name": "John",
        "salary": "1000USD",
        "performance": "above average",
        "role": "Engineer"
    }, {
        "name": "Bob",
        "salary": 60000,
        "performance": "average",
        "role": "CEO"
    }, {
        "name": "Jenny",
        "salary": "50,000",
        "performance": "below average",
        "role": "Sales"
    }]
})


print("================================================")
print("Task 3:")
# * 將輸入的名字以陣列形式存以利後面資料處理 EX:["abc","def","ijk"]
# * 以{"全名":"中間字"}方式用字典dict_for_name儲存準備做重複字計算
# * 兩字名或三字名的中間字，以string角度來看都是在 name[1]的位置
# * 計算的中間字出現次數，並建立一個新的字典answer以{中間字:[出現次數,全名]}儲存起來
# * 找出出現次數為１的資料，印出全命;若answer內出現次數皆大於１，印出沒有


def data_covert_to_list(data):
    name_list = []
    for value in data:
        name_list.append(value)
    return name_list


def name_list_to_dict(name_list):
    dictionary = {}
    for key in range(len(name_list)):
        dictionary[name_list[key]] = name_list[key][1]
    return dictionary


def value_count(dict, target):
    count = 0
    for values in dict.values():
        if values == target:
            count += 1
    return count


def find_name(answer):
    not_found = True
    for i in answer:
        if answer[i][0] == 1:
            print(answer[i][1])
            not_found = False
    if not_found:
        print("沒有")


def func(*data):
    name_list = data_covert_to_list(data)
    dict_for_name = name_list_to_dict(name_list)
    answer = {}

    for i in range(len(name_list)):
        repeat_num = value_count(dict_for_name, name_list[i][1])
        answer[name_list[i][1]] = [repeat_num, name_list[i]]

    find_name(answer)


func("彭大牆", "王明雅", "吳明")
func("郭靜雅", "王立強", "林靜宜", "郭立恆", "林花花")
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花")


print("================================================")
print("Task 4:")
# * There is a number sequence: 0, 4, 3, 7, 6, 10, 9, 13, 12, 16, 15, ...
# * 確認輸入值資訊 (Input<0 => Not Found, Input=0 => 0)
# * 探討輸入值為奇數或偶數，給予對應計算方式


def get_number(num):
    result = 0
    if num < 0:
        result = "Not Found"
    else:
        if num % 2 == 1:  # ? odd number
            result = int(4+3*((num-1)/2))
        else:  # ? even number
            result = int(3*(num/2))
    print(result)


get_number(1)
get_number(5)
get_number(10)

print("================================================")
print("Task 5:")
# * 首先車廂相數量和狀態內容是相同數量的陣列
# * 檢查相同陣列位置的狀態 1=>ok 0=>Not OK
# * 於新的陣列ok_status當中，可使用的車位輸入正確數量，不可使用的車位輸入0
# * 比對人數與ok_status當中的數量
# * 找出最接近且大於或等於人數的ok_status的元素，若無則最終輸出-1
# * 將該元素放入seats[]當中，找出車廂排序位置


def find_ok_status(seats, status):
    ok_status = []
    for i in range(len(seats)):  
        if status[i] == 1:
            ok_status.append(seats[i])
        else:
            ok_status.append(0)  # ? 不可使用的車廂元素存為0
    return ok_status


def find_closest_number(ok_status, target):  # ? 找出合適的車廂的內容物
    closest_number = float("inf")  # ? 初始值設定無限大
    for car_content in ok_status:
        if car_content >= target and car_content < closest_number:
            closest_number = car_content
    return closest_number


def find_index_of_car(seats, status, number):
    ok_status = find_ok_status(seats, status)
    idea_car = find_closest_number(ok_status, number)

    if idea_car == float("inf"):  # ? 車位無法滿足時
        print(-1)
    else:
        for value in range(len(ok_status)):
            if ok_status[value] == idea_car:
                print(value)


find_index_of_car([3, 1, 5, 4, 2], [0, 1, 0, 1, 1], 2)
find_index_of_car([1, 0, 5, 1, 3], [0, 1, 0, 1, 1], 4)
find_index_of_car([4, 6, 5, 8], [0, 1, 1, 1], 4)
