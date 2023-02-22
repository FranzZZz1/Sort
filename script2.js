let users = {
  admin: {
    lgVal: "admin",
    pwVal: "admin1234",
  },
  user1: {
    lgVal: "user",
    pwVal: "user1234",
  },
  user2: {
    lgVal: "user111",
    pwVal: "user12345",
  },
};

let popupOpen = document.querySelector(".popup__link");
let popupIn = document.querySelector("#popupIn");
let popupUp = document.querySelector("#popupUp");
let closeBtnIn = document.querySelector(".popupIn__close");
let closeBtnUp = document.querySelector(".popupUp__close");
let signinButton = document.querySelector(".signin__button");
let signupButton = document.querySelector(".signup__button");
let signinLink = document.querySelector(".signin__link");
let signupLink = document.querySelector(".signup__link");
let logOutBtn = document.querySelector(".header__logOut");

popupOpen.addEventListener("click", () => {
  popupIn.style.display = "block";
  document.body.style.overflow = "hidden";
});

closeBtnIn.addEventListener("click", () => {
  popupIn.style.display = "none";
  document.body.style.overflow = "auto";
});

closeBtnUp.addEventListener("click", () => {
  popupUp.style.display = "none";
  document.body.style.overflow = "auto";
});

signupLink.addEventListener("click", () => {
  popupIn.style.display = "none";
  popupUp.style.display = "block";
  document.body.style.overflow = "hidden";
});

signinLink.addEventListener("click", () => {
  popupIn.style.display = "block";
  popupUp.style.display = "none";
  document.body.style.overflow = "hidden";
});

document.querySelector(".header__logOut-item").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

signinButton.addEventListener("click", () => {
  let lgVal = document.querySelector(".signin__email").value;
  let pwVal = document.querySelector(".signin__password").value;
  let lg = document.querySelector(".signin__email");
  let pw = document.querySelector(".signin__password");
  let errorMessage = document.querySelector(".error__message");

  for (const key in users) {
    if (users[key]["lgVal"] == lgVal && users[key]["pwVal"] == pwVal) {
      localStorage.setItem("role", key);
    }
  }

  let role = localStorage.getItem("role");

  if (localStorage.role == null) {
    errorMessage.style.display = "block";
    errorMessage.innerHTML = "Неверный логин или пароль";
    lg.style.borderColor = "red";
    pw.style.borderColor = "red";

    document.querySelectorAll(".auth__input").forEach((e) =>
      e.addEventListener("mousedown", () => {
        lg.style.borderColor = "#e6e6e6";
        pw.style.borderColor = "#e6e6e6";
        errorMessage.innerHTML = "";
      })
    );
  } else {
    if (role == "admin") {
      popupIn.style.display = "none";
      popupOpen.style.display = "none";
      logOutBtn.style.display = "block";
      document.querySelector(".header__admin").style.display = "block";
    } else {
      popupIn.style.display = "none";
      popupOpen.style.display = "none";
      logOutBtn.style.display = "block";
      document.querySelector(".header__profile").style.display = "block";
    }
  }
});

signupButton.addEventListener("click", () => {
  let lgVal = document.querySelector(".signup__email").value;
  let pwVal = document.querySelector(".signup__password").value;
  let pwValRep = document.querySelector(".signup__repeat-password").value;
  let lg = document.querySelector(".signup__email");
  let pw = document.querySelector(".signup__password");
  let pwRep = document.querySelector(".signup__repeat-password");
  let errorUpMessage = document.querySelector(".errorUp__message");

  for (const key in users) {
    if (users[key]["lgVal"] == lgVal) {
      errorUpMessage.style.display = "block";
      errorUpMessage.style.color = "red";
      errorUpMessage.innerHTML = "Такое имя пользователя уже существует";

      lg.style.borderColor = "red";
      pw.style.borderColor = "red";
      pwRep.style.borderColor = "red";

      break;
    } else if (pwValRep.trim().length === 0 || pwVal.trim().length === 0) {
      errorUpMessage.style.display = "block";
      errorUpMessage.style.color = "red";
      errorUpMessage.innerHTML = "Заполните все поля";

      lg.style.borderColor = "red";
      pw.style.borderColor = "red";
      pwRep.style.borderColor = "red";
    } else if (pwValRep != pwVal) {
      errorUpMessage.style.display = "block";
      errorUpMessage.style.color = "red";
      errorUpMessage.innerHTML = "Пароли не совпадают";

      lg.style.borderColor = "red";
      pw.style.borderColor = "red";
      pwRep.style.borderColor = "red";
    } else {
      errorUpMessage.style.display = "block";
      errorUpMessage.style.color = "green";
      errorUpMessage.innerHTML = "Успешная регистрация";

      lg.style.borderColor = "";
      pw.style.borderColor = "";
      pwRep.style.borderColor = "";

      users[lgVal] = { lgVal, pwVal };
    }
    document.querySelectorAll(".auth__input").forEach((e) =>
      e.addEventListener("mousedown", () => {
        lg.style.borderColor = "";
        pw.style.borderColor = "";
        pwRep.style.borderColor = "";
        errorUpMessage.innerHTML = "";
      })
    );
  }
});

let priceBtn = document.querySelector(".price-btn");
priceBtn.addEventListener("click", () => {
  let changeText = document.querySelector(".change");
  priceBtn.classList.add("active");
  priceBtn.classList.toggle("change-text");
  if (priceBtn.classList.contains("change-text")) {
    changeText.innerText = "сначала недорогие";
    dataSort("data-price");
  } else {
    changeText.innerText = "сначала дорогие";
    dataSortDesc("data-price");
  }
  if (
    scoreBtn.classList.contains("active") ||
    popularBtn.classList.contains("active")
  ) {
    popularBtn.classList.remove("active");
    scoreBtn.classList.remove("active");
  }
});

let popularBtn = document.querySelector(".most-popular");
document.querySelector("#most-popular").onclick = () => {
  dataSort("data-popular");
  if (
    scoreBtn.classList.contains("active") ||
    priceBtn.classList.contains("active")
  ) {
    priceBtn.classList.remove("active");
    scoreBtn.classList.remove("active");
  }
  popularBtn.classList.add("active");
};

let scoreBtn = document.querySelector(".higher-score");
document.querySelector("#higher-score").onclick = () => {
  dataSort("data-score");
  if (
    popularBtn.classList.contains("active") ||
    priceBtn.classList.contains("active")
  ) {
    popularBtn.classList.remove("active");
    priceBtn.classList.remove("active");
  }
  scoreBtn.classList.add("active");
};

function dataSort(sortType) {
  let sortList = document.querySelector(".sort__list");
  for (let i = 0; i < sortList.children.length; i++) {
    for (let j = i; j < sortList.children.length; j++) {
      if (
        +sortList.children[i].getAttribute(sortType) <
        +sortList.children[j].getAttribute(sortType)
      ) {
        replacedNode = sortList.replaceChild(
          sortList.children[j],
          sortList.children[i]
        );
        insertAfter(replacedNode, sortList.children[i]);
      }
    }
  }
}

function dataSortDesc(sortType) {
  let sortList = document.querySelector(".sort__list");
  for (let i = 0; i < sortList.children.length; i++) {
    for (let j = i; j < sortList.children.length; j++) {
      if (
        +sortList.children[i].getAttribute(sortType) >
        +sortList.children[j].getAttribute(sortType)
      ) {
        replacedNode = sortList.replaceChild(
          sortList.children[j],
          sortList.children[i]
        );
        insertAfter(replacedNode, sortList.children[i]);
      }
    }
  }
}

function insertAfter(elem, refElem) {
  return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}
