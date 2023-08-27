
# 主題四 使用主鍵、索引優化資料庫查詢效率

**1. 主鍵 (Primary Key) 和索引 (Index) 的觀念**
- 主鍵是資料表中的一個唯一識別鍵，用於識別每一筆資料的唯一性。
- 索引是一種資料結構，可以加速查詢操作，它允許資料庫系統快速定位到符合特定條件的資料。

**2. 在 member 資料表中加入適當的索引**
![](https://hackmd.io/_uploads/BJ8W4MKpn.png)

在 member 資料表中，可以為 username 和 password 欄位建立索引，以加快以下 SQL 語句的查詢效率：
```sql
SELECT * FROM member WHERE username='test' and password='test';
```

```sql
-- 在 member 資料表的 username 和 password 欄位建立索引
ALTER TABLE member ADD INDEX idx_username_password (username, password);
```

**3. 驗證查詢效率是否改善**
1. 你可以使用資料庫管理工具，如 MySQL Workbench 或 phpMyAdmin，執行 EXPLAIN 查詢，觀察索引是否被使用，以及查詢的執行計劃。此外，你可以測試查詢的執行時間，比較加入索引前後的效率變化。

2. command line
在 MySQL 的 command line 中，你可以使用 `EXPLAIN` 命令來觀察查詢的執行計劃，以確認是否使用了索引，從而驗證查詢效率是否改善了。以下是一個步驟示例：

    - 輸入以下命令，將查詢語句的 `EXPLAIN` 計劃輸出：
   ```sql
   EXPLAIN SELECT * FROM member WHERE username='test' and password='test';
   EXPLAIN SELECT * FROM member WHERE username='test';
   ```


    - 在這個示例中，`key` 列顯示了 `idx_username_password`，這表示查詢使用了我們為 `username` 和 `password` 欄位建立的索引。
    
    - 範例輸出可能如下所示：
```
+----+-------------+--------+------------+------+-------------------------+--------------+---------+-------+------+----------+-------------+
| id | select_type | table  | partitions | type | possible_keys           | key          | key_len | ref   | rows | filtered | Extra       |
+----+-------------+--------+------------+------+-------------------------+--------------+---------+-------+------+----------+-------------+
|  1 | SIMPLE      | member | NULL       | ref  | idx_username_password   | idx_username_password   | 266     | const |    1 |    100.00 | Using where |
+----+-------------+--------+------------+------+-------------------------+--------------+---------+-------+------+----------+-------------+
```

 - 在這個示例中，`key` 列顯示了 `idx_username_password`，這表示查詢使用了我們為 `username` 和 `password` 欄位建立的索引。透過這種方式，可以確認是否成功優化了查詢效率。

**4. 為什麼索引能改善查詢效率**
索引可以將資料庫中的資料以特定方式組織，使得查詢時能夠快速地找到符合條件的資料，而不需全表掃描。這有助於大幅減少查詢所需的時間，提高查詢效率。

**5. 使用索引是否能加快 LIKE 模糊查詢的運作效率**
使用索引能夠加快 LIKE 模糊查詢的效率，但需注意幾點：
- 索引在模糊查詢時需要更多的計算，因此在某些情況下可能會略微降低效率。
- 前綴索引（Prefix Index）可以用於優化模糊查詢。例如，如果你有一個名為 "name" 的欄位，可以建立一個 "name_prefix" 的索引，使得模糊查詢僅對索引前綴進行比對，減少計算量。

綜合來說，使用主鍵和索引能夠大幅提升資料庫查詢效率，但在建立索引時需要注意選擇適當的欄位以及索引類型，避免過度索引造成不必要的性能負擔。
