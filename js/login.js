// handle form
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

const signupUserName = document.getElementById("signup-userName");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");

const login = document.getElementById("btnLogin");
const signup = document.getElementById("btnSignup");

const iconEyes = document.querySelectorAll(".icon-eyes");

iconEyes[0].onclick = () => {
  loginPassword.type = loginPassword.type == "password" ? "text" : "password";

  if (loginPassword.type == "password") {
    iconEyes[0].innerHTML = `<i class="fas fa-eye-slash"></i>`;
  } else {
    iconEyes[0].innerHTML = `<i class="fas fa-eye"></i>`;
  }
};

iconEyes[1].onclick = () => {
  signupPassword.type = signupPassword.type == "password" ? "text" : "password";

  if (signupPassword.type == "password") {
    iconEyes[1].innerHTML = `<i class="fas fa-eye-slash"></i>`;
  } else {
    iconEyes[1].innerHTML = `<i class="fas fa-eye"></i>`;
  }
};

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/;

let users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

const isCheck = () => {
  if (document.getElementById("signup-userName").value == "") {
    alert("Bạn chưa nhập tên!");
    document.getElementById("signup-userName").focus();
    return false;
  }
  if (signupEmail.value == "") {
    alert("Bạn chưa nhập email!");
    signupEmail.focus();
    return false;
  }
  if (!regex.test(signupEmail.value)) {
    alert("Email không đúng định dạng");
    signupEmail.focus();
    return false;
  }
  if (signupPassword.value == "") {
    alert("Bạn chưa nhập mật khẩu!");
    signupPassword.focus();
    return false;
  }
  return true;
};

// sign-up
signup.onclick = function (e) {
  e.preventDefault();
  if (isCheck()) {
    let user = {
      userName: signupUserName.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };
    const checkUser = users.some((value) => value.email === signupEmail.value);
    if (checkUser) {
      alert("Email này đã được đăng ký");
      emailSignup.select();
      return;
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    signupUserName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
    alert("Đăng ký thành công");
    window.location.reload();
  }
};

// log-in
const isCheckLogin = () => {
  if (loginEmail.value == "") {
    alert("Bạn chưa nhập email!");
    loginEmail.focus();
    return false;
  }
  if (!regex.test(loginEmail.value)) {
    alert("Email không đúng định dạng");
    loginEmail.select();
    return false;
  }
  if (loginPassword.value == "") {
    alert("Bạn chưa nhập mật khẩu!");
    loginPassword.focus();
    return false;
  }
  return true;
};
login.onclick = (e) => {
  e.preventDefault();
  if (isCheckLogin()) {
    // check email nhập vào có chứa trong users không
    const isCheckUser = users.some((item) => item.email === loginEmail.value);
    const user = users.find((item) => item.email === loginEmail.value);
    // lấy ra user đăng nhập vào để show ra userName ở các file HTML khác
    localStorage.setItem("userLogin", JSON.stringify(user));
    if (!isCheckUser || loginPassword.value != user.password) {
      document.getElementById("text-error").style.display = "block";
      loginEmail.value = "";
      loginPassword.value = "";
      return;
    }
    if (loginPassword.value == user.password) {
      alert("Đăng nhập thàng công");
      location.href = "index.html";
    }
  }
};
