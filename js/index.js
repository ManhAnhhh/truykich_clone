// show icon nav-bar for mobile devices
const listMenu =  document.querySelector(".icon-list-menu");
const subNavMobile = document.querySelector(".sub-nav-mobile");

const navigationLogin = document.querySelector(".log-in"); 
listMenu.addEventListener("click", function () {
  console.log("a");
  subNavMobile.classList.toggle("d-flex");
});

navigationLogin.onclick = function () {
  window.location.href = "login.html";
}

// show user log-in
const showUserName = () => {
  let userLogin = JSON.parse(localStorage.getItem("userLogin"));
  if (userLogin != null) {
    const userNames = document.querySelectorAll(".userName");
    document.querySelector(".log-in").style.display = "none";
    const firstUserName = userLogin.userName[0].toUpperCase();
    userNames.forEach((e) => {
      e.innerHTML = `<span>${firstUserName}</span> &nbsp;Xin chào ${userLogin.userName}`;
      e.style.color = "#fff";
      e.style.fontSize = "16px";
    });
  } else {
    document.querySelector(".log-in").style.display = "block";
    document.querySelector(".log-out").style.display = "none";
    const userNames = document.querySelectorAll(".userName");
    userNames.forEach((e) => {
      e.style.display = "block";
    });
  }
};
showUserName();

document.querySelector(".log-out").onclick = () => {
  localStorage.removeItem("userLogin");
  window.location.reload();
}