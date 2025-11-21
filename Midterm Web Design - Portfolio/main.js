const menu = document.getElementById("navbar");
const openBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");

openBtn.onclick = () => {
  menu.classList.add("open");
  openBtn.setAttribute("aria-expanded", "true");
};

closeBtn.onclick = () => {
  menu.classList.remove("open");
  openBtn.setAttribute("aria-expanded", "false");
};