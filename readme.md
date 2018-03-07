# Môi trường

- `dev` hay `development` là môi trường phát triển phần mềm.

- `production` là môi trường chạy chính thức của phần mềm.

# Để chạy server trong môi trường dev. Tại thư mục project, run:

`npm run dev`

## package.json là file gì?
`package.json` là file định nghĩa chỉ ra thông tin của project bao gồm tên, liscense, version... và danh sách các thư viện yêu cầu cho project. Chia ra là 2 danh sách
`devDependencies` và `dependencies`

- `devDependencies` liệt kê danh sách các thư viện hỗ trợ trong lúc triển khai dự án không cần thiết phải có khi dự án được chạy chính thức trên môi trường `production`. Ví dụ `nodemon` là 1 package giúp ta reload server khi có thay đổi về code. Nhưng khi chạy `production` ta không cần tính năng `hot-reload` này.
- `dependencies` là những thư viện yêu cầu phải có khi chạy trên môi trường `production`. (Ví dụ `express`)

## Tạo 1 server đơn giản với `express`.

```js
// import Thư viện sử dụng để tạo server.
const express = require("express");

// Tạo server
const server = new express();

// Cài đặt cổng cho server
const port = 9000;

/* Cài đặt thư mục public cho phép truy cập document từ thư mục này.
 * Ví dụ <link rel="stylesheet" href="/style.css" type="text/css">
 * Trang web sẽ gửi request lên server theo path "/style.css" từ thư mục `public`
 */
server.use(express.static("public"))

/* Đây gọi là 1 api: Application programming interface.
 * Các ứng dụng mạng muốn kết nối hay nói chuyện với nhau thì cần kết nối qua lại bằng các api.
 * Front end muốn dữ liệu sẽ request tới backend sau đó backend nhận thấy tín hiệu và gửi trả về data phù hợp.
 * Ở đây ứng dụng front-end (client) gọi đến back-end qua 1 api có định danh là "/api/posts"
 */
server.get("/api/posts", (req, res) => {
    const posts = [
        { title: "Mot so luu y" },
        { title: "Hello" },
        { title: "goodbyw" },
        { title: "nihao" }
    ];

    // data dạng json được trả về cho client.
    res.json({ success: true, posts });
})

server.get("/", (req, res) => {
    // Serve html file
    res.sendFile(__dirname + "/public/thanggit.html")
})

/*
 * Tạo 1 cổng để lắng nghe request đến.
 */
server.listen(port, (req, res) => {
    console.log("Server dang chay o cong 9000");
});
```

## Client kết nối tới server:

Ở đây để có thể gọi được yêu cầu đến server và cập nhật thay đổi trang ta cần thực hiện 1 kỹ thuật gọi là `ajax`
Thư viện `axios` là một trong các thư viện giúp ta thực hiện kỹ thuật này:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.js"></script>
```

Sau khi import thư viện ta có thể gửi request đến server nhận data và cập nhật lại html:

```js
// Gửi request đến server theo api: "/api/posts"
axios.get("http://localhost:9000/api/posts")
    .then(res => {
        if (res.data.success === true) {
            // sau khi nhận được kết quả trả về từ server liền lưu lại giá trị và tạo ra markup để chuẩn bị cập nhật html.
            let posts = res.data.posts
            let markup = posts.map(post => {
                return `<li key="${post.title}"><span><a class="link-sp">${post.title}</a></span></li>`
            })

            // cập nhật lại html
            document.getElementById("post").innerHTML = markup.join(" ");
        }
    })
    .catch(error => {
        // Hàm xử lý khi request bị lỗi
        console.log(error)
    })
```