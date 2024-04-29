const date = new Date();
const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
const minutes =
  date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

const greeting = document.getElementById("greeting");
const time = document.getElementById("time");
const container = document.querySelector(".container");
const loadingOverlay = document.getElementById("loadingOverlay");

greeting.innerHTML =
  hours > 12 && hours < 24 ? "Good Afternoon" : "Good Morning";

time.innerHTML = `${hours}:${minutes}`;

const successCallback = (position) => {
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}0%2C${position.coords.longitude}&key=b5ab4a8ad3f04644b25b2b59c8d78126`
  )
    .then((res) => res.json())
    .then((response) => {
      buildPage(response.results[0]);
    })
    .catch((data, status) => {
      console.log("Request failed");
    });
};

const errorCallback = (error) => {
  console.log(error);
};

const buildPage = (content) => {
  console.log("Content ", content);
  const city = document.getElementById("city");
  const country = document.getElementById("country");
  const timeZone = document.getElementById("timeZone");

  city.innerHTML = content.components.city
    ? content.components.city
    : content.components.town;

  country.innerHTML = content.components.country;

  timeZone.innerHTML = content.annotations.timezone.short_name;

  if (hours > 18) {
    if (window.matchMedia("(max-width: 601px)")) {
      container.style.backgroundImage =
        "linear-gradient(180deg,rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.13) 100%), url('../images/mobile/bg-image-nighttime.jpg')";
    } else if (window.matchMedia("(max-width: 769px)")) {
      container.style.backgroundImage =
        "linear-gradient(180deg,rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.13) 100%),url('../images/tablet/bg-image-nighttime.jpg')";
    } else {
      container.style.backgroundImage =
        "linear-gradient(180deg,rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.13) 100%),url('../images/desktop/bg-image-nighttime.jpg')";
    }
  }

  loadingOverlay.classList.add("hide");
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

(function () {
  document.getElementById("showMore").addEventListener("click", function () {
    const pageWrapper = document.getElementById("pageWrapper");
    const text = this.children[0].innerText;
    const images = this.children[1].children;
    console.log(images);

    if (text === "More") {
      images[0].classList.add("less");
      pageWrapper.classList.add("move-up");
    } else {
      images[0].classList.remove("less");
      pageWrapper.classList.remove("move-up");
    }

    setTimeout(() => {
      this.children[0].innerText = text === "More" ? "Less" : "More";
    }, 510);
  });
})();
