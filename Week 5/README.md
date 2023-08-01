# Week5 mySQL 任務操作說明
## Task1:

安裝完成後了解當前MySQL版本
```
mysql --version; 
```
![截圖 2023-08-02 上午4 00 25](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/3759f108-738a-4b2b-9f0f-5ce67912528b)

## Task2:

1. 建立資料庫website
```
CREATE DATABASE website;
```
![截圖 2023-08-02 上午12 16 36](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/dc2b1f3e-5d51-4821-bcc4-62556b2ceaa4)

> 顯示所有已建立的資料庫
```
SHOW DATABASES;
```

2. 建立表單member
```
CREATE TABLE member (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    follower_count INT UNSIGNED NOT NULL DEFAULT 0,
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
![截圖 2023-08-02 上午1 18 10](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/dc4d2901-e3f3-4c34-8679-cee09bdcf3a5)

> 顯示member表單所有欄位資訊：
```
DESCRIBE member;
```
![截圖 2023-08-02 上午1 18 34](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/fc85c379-4988-4c92-bfa3-c7c9afc22d34)

## Task3:


1. 輸入資料：
```
INSERT INTO member (name, username, password) VALUES ('My first data', 'test', 'test');
INSERT INTO member (name, username, password, follower_count) VALUES ('Andy', 'andy123', 'andy456',100);
INSERT INTO member (name, username, password, follower_count) VALUES ('Ann', 'ann123', 'ann456',80);
INSERT INTO member (name, username, password) VALUES ('John', 'john123', 'john456');
INSERT INTO member (name, username, password, follower_count) VALUES ('Olivia', 'olivia123','olivia456',455);
INSERT INTO member (name, username, password, follower_count) VALUES ('Fender', 'fender123', 'fender456',999);
```
![截圖 2023-08-02 上午1 50 43](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/6abe8476-26b2-41cd-a34a-840b4c4ec81f)

2. 使用 SELECT 指令取得所有在 member 資料表中的會員資料:
```
SELECT * FROM  MEMBER;
```
![截圖 2023-08-02 上午1 51 07](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/75812512-0c98-4aed-9702-30f73de1b24f)

3. 使用 SELECT 指令取得所有在 member 資料表中的會員資料，並按照 time 欄位，由近到遠排序:
```
SELECT * FROM  MEMBER ORDER BY time DESC;
```
![截圖 2023-08-02 上午1 54 02](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/6179fe8b-e0be-49d4-b2b3-855c54862ecd)

4. 使用 SELECT 指令取得 member 資料表中第 2 到第 4 筆共三筆資料，並按照 time 欄位，由近到遠排序。
```
SELECT * FROM member ORDER BY time DESC LIMIT 3 OFFSET 1;
```
![截圖 2023-08-02 上午2 01 00](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/4abc1536-92f4-4b7e-a75c-80871d0aa563)

5. 使用 SELECT 指令取得欄位 username 是 test 的會員資料:
```
SELECT * FROM member WHERE username = 'test';
```
![截圖 2023-08-02 上午2 02 01](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/9d7de16c-1dea-4700-a946-b279a2e4997c)

6. 使用 SELECT 指令取得欄位 username 是 test、且欄位 password 也是 test 的資料:
```
SELECT * FROM member WHERE username = 'test' AND password = 'test';
```
![截圖 2023-08-02 上午2 05 50](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/cecb1e7d-c8d1-431c-b6db-3ea0e4dcdbc5)

7. 使用 UPDATE 指令更新欄位 username 是 test 的會員資料，將資料中的 name 欄位改成 test2:
```
UPDATE member SET name = 'test2' WHERE username = 'test';
SELECT * FROM member WHERE username = 'test'
```
![截圖 2023-08-02 上午2 08 02](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/4e125276-8a3d-45bf-a88c-1afa78536aed)

## Task4:
1. 取得 member 資料表中，總共有幾筆資料:
```
SELECT COUNT(*) FROM member;
```
![截圖 2023-08-02 上午2 11 45](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/169f20a0-0171-4ae0-9a23-c151b7786c15)

2. 取得 member 資料表中，所有會員 follower_count 欄位的總和:
```
SELECT SUM(follower_count) FROM member;
```
![截圖 2023-08-02 上午2 13 05](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/2dab741c-7b97-4127-b103-65c634319379)

3. 取得 member 資料表中，所有會員 follower_count 欄位的平均數。
```
SELECT AVG(follower_count) FROM member;
```
![截圖 2023-08-02 上午2 14 01](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/57749d53-6aaf-4d8f-a2bb-5b86b3c2b4e0)

## Task5:

1. 創建表單message
```
CREATE TABLE message (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id BIGINT NOT NULL,
    content VARCHAR(255) NOT NULL,
    like_count INT UNSIGNED NOT NULL DEFAULT 0,
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member (id)
);

```
> 顯示資料庫website內容：
```
SHOW TABLES;
```
> 顯示message表單所有欄位資訊：
```
DESCRIBE message;
```
![截圖 2023-08-02 上午2 50 07](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/6a4b4834-049c-4a4a-9843-8b8cfd7c7bf0)

> 輸入留言
```
INSERT INTO message (member_id, content, like_count) VALUES (2, '大家好，我是Andy', 10);
INSERT INTO message (member_id, content) VALUES (1, 'TEST!!TEST!!，我是測試機器人');
INSERT INTO message (member_id, content, like_count) VALUES (6, 'Fender是世界最知名的電吉他品牌', 8);
INSERT INTO message (member_id, content, like_count) VALUES (5, '維多莉雅是個好名字，我很喜歡', 25);
INSERT INTO message (member_id, content, like_count) VALUES (4, '聽說有個好聽的樂團叫做白頻率', 99);
INSERT INTO message (member_id, content, like_count) VALUES (3, '有人也喜歡吉他嗎>~<', 36);
```
![截圖 2023-08-02 上午3 01 04](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/11a74d4a-5b41-4df7-896c-f9b2d05604a7)

2. 使用 SELECT 搭配 JOIN 語法，取得所有留言，結果須包含留言者的姓名:
```
SELECT message.content, member.name AS member_name
FROM message
JOIN member ON message.member_id = member.id;
```
![截圖 2023-08-02 上午3 11 11](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/5077b3ae-7d7f-486c-8569-f7e72f4db39c)

3. 使用 SELECT 搭配 JOIN 語法，取得 member 資料表中欄位 username 是 test 的所有留言，資料中須包含留言者的姓名：
```
SELECT message.content, member.name AS member_name
FROM message
JOIN member ON message.member_id = member.id
WHERE member.username = 'test';
```
![截圖 2023-08-02 上午3 16 27](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/c97aea1a-ea6b-4270-ab24-beb8aa90f477)

4. 使用 SELECT、SQL Aggregate Functions 搭配 JOIN 語法，取得 member 資料表中欄位 username 是 test 的所有留言平均按讚數：
>新增兩則test留言：
```
INSERT INTO message (member_id, content, like_count) VALUES (1, '公告!!請注意謝謝~~<3!!', 100);
INSERT INTO message (member_id, content, like_count) VALUES (1, '搖滾名人堂形容Jimi Hendrix是「搖滾樂史上最偉大的樂手」。', 666);
```
![截圖 2023-08-02 上午3 36 30](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/e5934a21-dd99-4a4b-9dbf-d4cf995c634e)

>計算平均按讚數：
```
SELECT AVG(message.like_count) AS avg_likes
FROM message
JOIN member ON message.member_id = member.id
WHERE member.username = 'test';
```

***
## Export
> 透過 mysqldump 命令，將資料庫中的資料匯出到檔案 data.sql:
```
mysqldump -u root -p website > data.sql
```
![截圖 2023-08-02 上午3 47 57](https://github.com/Yo0GuitarIT/WeHelpBootcamp/assets/118150842/b54546ef-45eb-4f4a-a915-975aae4400c3)


