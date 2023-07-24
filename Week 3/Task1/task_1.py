"""
1. 將景點資料用一行一景點的形式，輸出到 attraction.csv 的檔案。特別注意，輸出的資 料中，只取第一張圖檔的網址。
2. 將景點資料以鄰近的捷運站分群，一行一捷運站的形式，輸出到 mrt.csv 的檔案。
"""
import urllib.request
import json
import csv

JSON_URL = (
    "https://padax.github.io/taipei-day-trip-resources/"
    "taipei-attractions-assignment.json"
    )

# *發送GET請求取得網站上的JSON資訊
with urllib.request.urlopen(JSON_URL) as response:
    data = json.loads(response.read())   # *解析JSON資料
    taipei_info = data["result"]["results"]

# * attraction.csv 資料輸出
with open("attraction.csv", encoding="utf-8", mode="w") as file:
    writer = csv.writer(file)
    for info in taipei_info:
        stitle = info["stitle"]
        address = info["address"]
        district = address.split(" ")[2][0:3]  # *行政區
        longitude = info["longitude"]
        latitude = info["latitude"]
        url_file = info["file"]
        first_pic_url = "https://" + url_file.split("https://")[1]
        writer.writerow([stitle, district, longitude, latitude, first_pic_url])


# ================================================================
MRT_station = []
MRT_dict = {}

for info in taipei_info:
    if info["MRT"] is None:
        MRT_station.append("None")  # *周邊沒有MRT資訊者創建"None"在MRT_station之中
        if "None" not in MRT_dict:
            MRT_dict["None"] = []
        MRT_dict["None"].append(info["stitle"])  # *附近沒有捷運站的景點，存入None(key)
    else:
        MRT_station.append(info["MRT"])
        if info["MRT"] not in MRT_dict:
            MRT_dict[info["MRT"]] = []
        MRT_dict[info["MRT"]].append(info["stitle"])


#  *mrt.csv 資料輸出
with open("mrt.csv", encoding="utf-8", mode="w") as file:
    writer = csv.writer(file)
    for key, value in MRT_dict.items():
        writer.writerow([key] + value)
