const menu = document.querySelector("span.menu");
const el = document.querySelector(".side");
const penghalang = document.querySelector(".penghalang");
const close = document.querySelector(".close");

menu.addEventListener("click", function () {
  el.style.left = 0;
  penghalang.style.display = "inline";
});

close.addEventListener("click", function () {
  el.style.left = "-2000px";
  penghalang.style.display = "none";
});
