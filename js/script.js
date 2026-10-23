
/* ==================================
   BAI 1: MANG SAN PHAM
================================== */

const products = [
    {
        id: 1,
        name: "Laptop học tập",
        price: 12500000,
        icon: "💻"
    },
    {
        id: 2,
        name: "Chuột không dây",
        price: 350000,
        icon: "🖱️"
    },
    {
        id: 3,
        name: "Bàn phím cơ",
        price: 890000,
        icon: "⌨️"
    },
    {
        id: 4,
        name: "Tai nghe Bluetooth",
        price: 650000,
        icon: "🎧"
    },
    {
        id: 5,
        name: "Màn hình máy tính",
        price: 3200000,
        icon: "🖥️"
    }
];


/* ==================================
   BAI 2: LAY CAC PHAN TU HTML
================================== */

const productList =
    document.getElementById("productList");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const clearButton =
    document.getElementById("clearButton");

const searchMessage =
    document.getElementById("searchMessage");


/* ==================================
   BAI 3: HIEN THI SAN PHAM
================================== */

function displayProducts(list) {

    // Xoa danh sach cu
    productList.replaceChildren();

    // Duyet qua tung san pham
    list.forEach(function(product) {

        // Tao the san pham
        const card = document.createElement("div");
        card.className = "product";

        // Tao bieu tuong
        const icon = document.createElement("div");
        icon.className = "product-icon";
        icon.textContent = product.icon;

        // Tao ten san pham
        const name = document.createElement("h3");
        name.textContent = product.name;

        // Tao gia san pham
        const price = document.createElement("p");
        price.className = "price";
        price.textContent =
            new Intl.NumberFormat("vi-VN")
                .format(product.price) + " VNĐ";

        // Them cac phan tu vao the
        card.append(icon, name, price);

        // Them the vao danh sach
        productList.appendChild(card);
    });
}


/* ==================================
   BAI 4: TIM KIEM SAN PHAM
================================== */

function searchProducts() {

    // Lay tu khoa, bo khoang trang
    // va chuyen ve chu thuong
    const keyword = searchInput.value
        .trim()
        .toLocaleLowerCase("vi");

    // Loc san pham theo ten
    const result = products.filter(function(product) {

        return product.name
            .toLocaleLowerCase("vi")
            .includes(keyword);

    });

    // Hien thi ket qua
    displayProducts(result);

    // Hien thi thong bao
    if (result.length === 0) {

        searchMessage.textContent =
            "Không tìm thấy sản phẩm phù hợp.";

        searchMessage.className = "message error";

    } else {

        searchMessage.textContent =
            "Tìm thấy " + result.length + " sản phẩm.";

        searchMessage.className = "message success";
    }
}


/* ==================================
   BAI 5: GAN SU KIEN
================================== */

// Bam nut tim kiem
searchButton.addEventListener("click", searchProducts);

// Tim kiem khi go phim
searchInput.addEventListener("input", searchProducts);

// Bam Enter de tim kiem
searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchProducts();
    }

});

// Bam nut xoa
clearButton.addEventListener("click", function() {

    searchInput.value = "";

    searchMessage.textContent = "";
    searchMessage.className = "message";

    displayProducts(products);

    searchInput.focus();

});


/* ==================================
   BAI 6: HIEN THI BAN DAU
================================== */

displayProducts(products);

/* ===== BÀI TẬP 02: FORM ĐĂNG KÝ ===== */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const termsInput = document.getElementById("terms");
    const formMessage = document.getElementById("formMessage");

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const fullname = fullnameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Xóa thông báo cũ
        formMessage.textContent = "";
        formMessage.className = "";

        // Kiểm tra họ tên
        if (fullname === "") {
            showMessage("Vui lòng nhập họ và tên.", false);
            fullnameInput.focus();
            return;
        }

        // Kiểm tra email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            showMessage("Email không hợp lệ.", false);
            emailInput.focus();
            return;
        }

        // Kiểm tra mật khẩu: ít nhất 8 ký tự,
        // có chữ hoa, chữ thường và chữ số
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(password)) {
            showMessage(
                "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và chữ số.",
                false
            );
            passwordInput.focus();
            return;
        }

        // Kiểm tra đồng ý điều khoản
        if (!termsInput.checked) {
            showMessage(
                "Bạn cần đồng ý với điều khoản sử dụng.",
                false
            );
            return;
        }

        // Chỉ lưu thông tin cần thiết, KHÔNG lưu mật khẩu
        const userData = {
            fullname: fullname,
            email: email,
            registeredAt: new Date().toISOString()
        };

        try {
            const savedUsers = JSON.parse(
                localStorage.getItem("registeredUsers") || "[]"
            );

            savedUsers.push(userData);

            localStorage.setItem(
                "registeredUsers",
                JSON.stringify(savedUsers)
            );

            showMessage(
                "Đăng ký thành công! Xin chào " + fullname + ".",
                true
            );

            registerForm.reset();

        } catch (error) {
            showMessage(
                "Không thể lưu dữ liệu. Hãy kiểm tra trình duyệt.",
                false
            );
        }
    });

    function showMessage(message, success) {
        formMessage.textContent = message;
        formMessage.className = success ? "success" : "error";
    }

    // Xóa thông báo khi làm mới form
    registerForm.addEventListener("reset", function() {
        formMessage.textContent = "";
        formMessage.className = "";
    });
}

/* ===== BÀI TẬP 03: ĐỒNG HỒ ĐẾM NGƯỢC ===== */

const timerDisplay = document.getElementById("timerDisplay");

if (timerDisplay) {
    const startButton = document.getElementById("startTimer");
    const pauseButton = document.getElementById("pauseTimer");
    const resetButton = document.getElementById("resetTimer");
    const timerMessage = document.getElementById("timerMessage");

    const INITIAL_TIME = 10 * 60;
    let remainingSeconds = INITIAL_TIME;
    let timerInterval = null;
    let endTime = null;

    // Chuyển số giây thành định dạng MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;

        return String(minutes).padStart(2, "0") + ":" +
               String(secondsLeft).padStart(2, "0");
    }

    // Cập nhật giao diện đồng hồ
    function updateTimerDisplay() {
        timerDisplay.textContent = formatTime(remainingSeconds);

        if (remainingSeconds < 60 && remainingSeconds > 0) {
            timerDisplay.classList.add("warning");
        } else {
            timerDisplay.classList.remove("warning");
        }
    }

    // Dừng bộ đếm và cập nhật nút
    function stopTimer() {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        endTime = null;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }

    // Xử lý khi hết thời gian
    function finishTimer() {
        remainingSeconds = 0;
        updateTimerDisplay();
        stopTimer();

        timerMessage.textContent = "Đã hết thời gian!";
        alert("Hết 10 phút! Đồng hồ đã kết thúc.");
    }

    // Cập nhật thời gian dựa trên mốc thời gian thực
    function tick() {
        if (endTime === null) {
            return;
        }

        remainingSeconds = Math.max(
            0,
            Math.ceil((endTime - Date.now()) / 1000)
        );

        updateTimerDisplay();

        if (remainingSeconds === 0) {
            finishTimer();
        }
    }

    // Bắt đầu hoặc tiếp tục đồng hồ
    startButton.addEventListener("click", function() {
        if (timerInterval !== null || remainingSeconds <= 0) {
            return;
        }

        endTime = Date.now() + remainingSeconds * 1000;

        timerMessage.textContent = "Đồng hồ đang chạy.";
        startButton.disabled = true;
        pauseButton.disabled = false;

        tick();
        timerInterval = setInterval(tick, 250);
    });

    // Tạm dừng đồng hồ
    pauseButton.addEventListener("click", function() {
        if (timerInterval === null) {
            return;
        }

        tick();

        if (timerInterval !== null) {
            stopTimer();
            timerMessage.textContent = "Đồng hồ đã tạm dừng.";
        }
    });

    // Đặt lại đồng hồ về 10 phút
    resetButton.addEventListener("click", function() {
        stopTimer();

        remainingSeconds = INITIAL_TIME;
        updateTimerDisplay();

        timerMessage.textContent = "Đồng hồ đã được đặt lại.";
    });

    // Hiển thị thời gian ban đầu
    updateTimerDisplay();
}
