
# 主題六 了解並預防 Cross-Site Scripting (XSS) 攻擊

## 什麼是 Cross-Site Scripting (XSS) 攻擊？

Cross-Site Scripting（XSS）是一種常見的網站安全漏洞，攻擊者利用此漏洞在受害者的瀏覽器中執行惡意腳本。XSS 攻擊通常發生在網站的輸入處，當網站未正確處理用戶輸入數據時，攻擊者可以注入包含惡意腳本的數據，使其在其他用戶訪問該網站時被執行。

## XSS 攻擊主要分為三個類型：

1. **Stored XSS（持久型 XSS）**：攻擊者將惡意腳本存儲在網站的伺服器上，當其他用戶訪問包含惡意腳本的頁面時，腳本將被載入並在用戶的瀏覽器中執行。

2. **Reflected XSS（反射型 XSS）**：攻擊者將包含惡意腳本的 URL 分發給目標用戶，當用戶點擊該 URL 時，瀏覽器會將 URL 中的腳本解釋並執行。

3. **DOM-based XSS**：攻擊者通過修改網頁的 Document Object Model（DOM）結構，在用戶端執行惡意腳本。

### Stored XSS（持久型 XSS）

**攻擊方式：** 攻擊者利用網站未正確處理用戶輸入數據的漏洞，將惡意腳本存儲在網站伺服器上。

**範例情境：** 假設有一個部落格網站，用戶可以發布評論。攻擊者在一則評論中插入以下惡意腳本：

```html
<script>alert('This is a stored XSS attack!');</script>
```

當其他用戶訪問包含該評論的頁面時，惡意腳本將在瀏覽器中執行，彈出警示框。


### Reflected XSS（反射型 XSS）

**攻擊方式：** 攻擊者通過將惡意腳本插入 URL 或表單輸入中，使用戶訪問包含該腳本的頁面時觸發。

**範例情境：** 假設有一個搜索功能，用戶可以在搜索框中輸入關鍵字。攻擊者將以下惡意 URL 分發給目標用戶：

```
http://example.com/search?query=<script>alert('This is a reflected XSS attack!');</script>
```

用戶點擊該 URL 時，惡意腳本將在瀏覽器中執行，彈出警示框。


### DOM-based XSS

**攻擊方式：** 攻擊者修改網頁的 DOM 結構，使惡意腳本在用戶端執行。

**範例情境：** 假設有一個網站歡迎用戶，用戶的名字會被插入到歡迎消息中。攻擊者將以下 URL 分發給目標用戶：

```
http://example.com/welcome?name=<script>alert('This is

 a DOM-based XSS attack!');</script>
```

當用戶訪問該 URL 時，網頁會使用 URL 中的名字來生成歡迎消息，但如果網站未正確處理，惡意腳本將在瀏覽器中執行，彈出警示框。


## 防範攻擊
### 防範 Stored XSS 攻擊：

1. **輸入驗證和轉義：** 在接收和處理用戶輸入之前，對輸入數據進行驗證和轉義，以防止腳本被解釋並執行。

   **範例：**
   ```javascript
   const userInput = "<script>alert('This is a stored XSS attack!');</script>";
   const escapedUserInput = escapeHtml(userInput); // 使用適當的轉義函數
   // 將轉義後的用戶輸入存儲到伺服器
   ```

2. **適當的輸出轉義：** 在將用戶輸入的數據顯示在網站上時，對輸出數據進行適當的轉義，以確保腳本不被解釋為可執行的腳本。

   **範例：**
   ```javascript
   const userComment = getUserStoredCommentFromServer(); // 從伺服器獲取用戶評論
   const sanitizedComment = escapeHtml(userComment); // 使用適當的轉義函數
   displayCommentOnPage(sanitizedComment);
   ```

3. **內容安全策略（CSP）：** 設定 Content Security Policy，限制允許執行的腳本來源，減少攻擊者能夠注入的可能性。

   **範例：**
   ```html
   <meta http-equiv="Content-Security-Policy" content="script-src 'self'">
   ```

### 防範 Reflected XSS 攻擊：

1. **輸入驗證和轉義：** 在處理 URL 參數和表單輸入時，對輸入數據進行驗證和轉義，以防止腳本被解釋並執行。

   **範例：**
   ```javascript
   const userInput = getUrlParameter('query'); // 從 URL 獲取用戶輸入
   const sanitizedInput = escapeHtml(userInput); // 使用適當的轉義函數
   // 將轉義後的用戶輸入用於生成頁面元素
   ```

2. **正確的 URL 處理：** 在處理 URL 參數時，使用正確的方法進行編碼，以避免腳本被解釋和執行。

   **範例：**
   ```javascript
   const userInput = "<script>alert('This is a reflected XSS attack!');</script>";
   const encodedInput = encodeURIComponent(userInput);
   const url = `http://example.com/search?query=${encodedInput}`;
   ```

3. **使用 CSP：** Content Security Policy（CSP）可以限制允許執行的腳本來源，減少攻擊者能夠注入的可能性。

   **範例：**
   ```html
   <meta http-equiv="Content-Security-Policy" content="script-src 'self'">
   ```

### 防範 DOM-based XSS 攻擊：

1. **輸入驗證和轉義：** 在處理用於修改 DOM 的數據時，對輸入數據進行驗證和轉義，以防止腳本被解釋並執行。

   **範例：**
   ```javascript
   const userInput = "<script>alert('This is a DOM-based XSS attack!');</script>";
   const sanitizedInput = escapeHtml(userInput); // 使用適當的轉義函數
   // 使用轉義後的用戶輸入進行 DOM 操作
   ```

2. **正確的 DOM 操作：** 在修改 DOM 前，檢查並驗證數據，以避免惡意腳本被注入。

   **範例：**
   ```javascript
   const userInput = getUserInputFromElement(); // 從 DOM 元素獲取用戶輸入
   if (isValidInput(userInput)) {
     // 執行合法的 DOM 操作
   }
   ```

3. **安全的客戶端操作：** 避免在客戶端直接執行可執行的腳本，使用安全的方法來操作 DOM。

   **範例：**
   ```javascript
   const userInput = getUserInputFromElement(); // 從 DOM 元素獲取用戶輸入
   const sanitizedInput = sanitizeInput(userInput); // 使用適當的方法來過濾和處理輸入
   // 使用過濾後的用戶輸入進行 DOM 操作
   ```
