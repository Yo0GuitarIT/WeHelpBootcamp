from bs4 import BeautifulSoup as bs
import urllib.request

def get_page_html(url):
    headers = { "User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0"}
    req = urllib.request.Request(url, headers=headers) #發request 取得原始碼
    try:
        with urllib.request.urlopen(req) as response:
            html_content = response.read()
    except urllib.error.URLError as e:
        print(f"Failed to make the request: {e}")
    soup = bs(html_content,"lxml") #利用 beautifullSoup做 HTML解析
    print("Html Get")
    return soup

def get_title_pushtimes(soup):
    data = soup.select("div.r-ent")
    result = []
    for element in data:
        push_times = "0"
        title = element.select("div.title")[0].text.strip()
        if "公告" in title or "刪除" in title:
            continue
        try:
            push_times = element.select("span.hl")[0].text
        except IndexError:
            pass
        result.append({
            "title": title,
            "push_times": push_times
        })
    print("get_title_pushtimes Done!")
    return result

def get_date(soup):
    data = soup.select("div.r-ent")
    result = []
    for element in data:
        title = element.select("div.title")[0].text.strip()
        if "公告" in title or "刪除" in title:
            continue #去除無關的內容
        link = element.select("div.title a")[0]["href"]
        article_link = "https://www.ptt.cc"+link
        article_data = get_page_html(article_link)
        date = article_data.select("div.article-metaline span.article-meta-value")[-1].text
        result.append({"date":date})
    print("get_data Done!")
    return result

def merge_data(title_pushtimes,date):
    merged_title_pushtimes_title = []
    for dict_title_pushtimes, dict_date in zip(title_pushtimes, date):
        merged_dict = {**dict_title_pushtimes, **dict_date}  # 使用**運算子來合併兩個字典
        merged_title_pushtimes_title.append(merged_dict)
    print("Merged Done!")
    return merged_title_pushtimes_title

def process_step(url): #整合取得資料步驟
    soup = get_page_html(url)
    title_pushtimes = get_title_pushtimes(soup)
    date = get_date(soup)
    result = merge_data(title_pushtimes,date)
    print("process_step Done!")
    return result

#############main###############################################
### 解析首頁資料
first_page_url = "https://www.ptt.cc/bbs/movie/index.html"  
first_data = process_step(first_page_url)[::-1] #資料新的放前面
print("1 Done!")
print("-"*100)

###取得分頁index內容
soup = get_page_html(first_page_url)
previous_page = soup.select("div #action-bar-container div.btn-group-paging a")[1]["href"]
page_num = int(previous_page.replace("/bbs/movie/index", "").replace(".html",""))

other_data = []
for i in range(2):
    other_page_url = f"https://www.ptt.cc/bbs/movie/index{page_num-i}.html"
    data = process_step(other_page_url)[::-1] #資料新的放前面
    other_data +=data
    print("-"*100)
    print(f"{i+2} Done!")

### 資料合併
all_data = first_data + other_data

# 開啟一個新的 txt 檔案來儲存輸出
with open("movie.txt", "w") as file:
    for item in all_data:
        title = item['title']
        push_times = item['push_times']
        date = item['date']
        file.write(f"{title},{push_times},{date}")
        file.write("\n")
        
print("輸出完成！請查看 movie.txt 檔案。")