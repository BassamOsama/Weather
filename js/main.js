"use strict";
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
document.getElementById("search").addEventListener("keyup", (a) => {
  search(a.target.value);
});
async function search(a) {
  let t = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`
  );
  if (t.ok && 400 != t.status) {
    let a = await t.json();
    displayCurrent(a.location, a.current),
      displayAnother(a.forecast.forecastday);
  }
}
function displayCurrent(a, t) {
  if (null != t) {
    let e = new Date(t.last_updated.replace(" ", "T"));
    let n = ` <div class="today forecast col-lg-4 col-md-12">
                <div class="forecast-header" id="today">
                  <div class="day">${days[e.getDay()]}</div>
                  <div class="date">${e.getDate() + months[e.getMonth()]}</div>
                </div>
                <div class="forecast-content" id="current">
                  <div class="location">${a.name}</div>
                  <div class="degree">
                    <div class="num">${t.temp_c}<sup>o</sup>C</div>
                    <div class="forecast-icon">
                      <img
                        src="https:${t.condition.icon}"
                        alt=""
                        width="90px"
                      />
                    </div>
                  </div>
                  <div class="custom">${t.condition.text}</div>
                  <span><i class="fa-solid fa-umbrella me-2"></i>20%</span>
                  <span><i class="fa-solid fa-wind me-2"></i>18km/h</span>
                  <span><i class="fa-solid fa-compass me-2"></i>East</span>
                </div>
              </div>`;
    document.getElementById("forecast").innerHTML = n;
  }
}
function displayAnother(a) {
  let t = "";
  for (let e = 1; e < a.length; e++)
    t += `<div class="forecast col-lg-4 col-md-12">
  <div class="forecast-header">
    <div class="day">${
      days[new Date(a[e].date.replace(" ", "T")).getDay()]
    }</div>
  </div>
  <div class="forecast-content">
    <div class="forecast-icon">
      <img src="https:${a[e].day.condition.icon}" alt="" width="48px">
    </div>
    <div class="degree">${a[e].day.maxtemp_c}<sup>o</sup>C</div>
     <div class="sm">${a[e].day.mintemp_c}<sup>o</sup></div>
     <div class="custom">${a[e].day.condition.text}</div>
    </div>
  </div>`;
  document.getElementById("forecast").innerHTML += t;
}
search("Cairo");
