if (!sessionStorage.getItem("token") || !sessionStorage.getItem("token").length > 5) {
  window.location.href = "login.html";
}
