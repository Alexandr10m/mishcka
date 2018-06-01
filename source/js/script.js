var navMain = document.querySelector(".page-header");
var navToggle = document.querySelector(".page-header__toggle");
var overlay = document.querySelector(".overlay");
var modal = document.querySelector(".modal");
var shop = document.querySelectorAll(".article-item__price-icon--basket");
var sellday = document.querySelector(".main-stats__button");

navMain.classList.remove("page-header--nojs");

navToggle.addEventListener("click", function () {
  if (navMain.classList.contains("page-header--closed")) {
    navMain.classList.remove("page-header--closed");
    navMain.classList.add("page-header--opened");
    } else {
    navMain.classList.add("page-header--closed");
    navMain.classList.remove("page-header--opened");
    }
  });

if (sellday) {
  sellday.addEventListener("click", function (e) {
  e.preventDefault ();
  modal.classList.add("modal--js"),
  overlay.classList.add("overlay--js");
  });
}

if (shop) {
  for (var i=0; i <= (shop.length-1); i++) {
    shop[i].addEventListener ("click", function (evt) {
    evt.preventDefault ();
    modal.classList.add("modal--js"),
    overlay.classList.add("overlay--js");
    });
  }
}

overlay.addEventListener("click", function () {
  modal.classList.remove("modal--js"),
  overlay.classList.remove("overlay--js");
});
