import urllib.request
import json
import csv

json_url = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"

# *發送GET請求取得網站上的JSON資訊
response = urllib.request.urlopen(json_url)

# *解析JSON資料
data = json.loads(response.read())
taipei_info = data["result"]["results"]

# * attraction.csv 資料輸出
with open("attraction.csv", mode="w") as file:
    for row in range(len(taipei_info)):
        stitle = taipei_info[row]["stitle"]
        address = taipei_info[row]["address"]
        district = address.split(" ")[2][0:3]  # *行政區
        longitude = taipei_info[row]["longitude"]
        latitude = taipei_info[row]["latitude"]
        url_file = taipei_info[row]["file"]
        first_pic_url = "https://" + url_file.split("https://")[1]
        writer = csv.writer(file)
        writer.writerow([stitle, district, longitude, latitude, first_pic_url])


# ================================================================
# *建立陣列存放捷運站資訊，比對每個景點所在的捷運站位置
# *透過MRT_dict字典存入每一站的站名與周邊景點

MRT_station = []
for i in range(len(taipei_info)):
    if taipei_info[i]["MRT"] == None:
        MRT_station.append("None")  # *周邊沒有MRT資訊者創建"None"在MRT_station之中
    else:
        MRT_station.append(taipei_info[i]["MRT"])
MRT_station = sorted(list(set(MRT_station)))

MRT_dict = {}
for station in MRT_station:
    attractions = []
    for i in range(len(taipei_info)):
        if taipei_info[i]["MRT"] == None:  # *附近沒有捷運站的景點，存入None(key)
            MRT_dict["None"] = [taipei_info[i]["stitle"]]
        elif taipei_info[i]["MRT"] == station:
            attractions.append(taipei_info[i]["stitle"])
            MRT_dict[station] = attractions
        else:
            pass  # *未符合者跳過

# * mrt.csv 資料輸出
with open("mrt.csv", mode="w") as file:
    writer = csv.writer(file)
    for key, value in MRT_dict.items():
        writer.writerow([key] + value)
