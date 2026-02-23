/* ================= نظام الصلاة الاحترافي ================= */
let currentPrayerName = localStorage.getItem("lastPrayerName");
document.addEventListener("DOMContentLoaded", function () {

  const prayerGrid = document.getElementById("prayerGrid");
  const prayerDate = document.getElementById("prayerDate");

  if (!prayerGrid) return;

  const today = new Date();
  prayerDate.innerText = today.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  if (!navigator.geolocation) {
    prayerGrid.innerHTML = "المتصفح لا يدعم تحديد الموقع";
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=5`)
      .then(res => res.json())
      .then(data => {

        const timings = data.data.timings;

        const prayers = [
          { name: "الفجر", time: timings.Fajr },
          { name: "الظهر", time: timings.Dhuhr },
          { name: "العصر", time: timings.Asr },
          { name: "المغرب", time: timings.Maghrib },
          { name: "العشاء", time: timings.Isha }
        ];

        prayerGrid.innerHTML = "";

        let prayerTimes = [];

        prayers.forEach(prayer => {

          let [h, m] = prayer.time.split(":");
          let prayerDateObj = new Date();
          prayerDateObj.setHours(parseInt(h));
          prayerDateObj.setMinutes(parseInt(m));
          prayerDateObj.setSeconds(0);

          prayerTimes.push({
            name: prayer.name,
            date: prayerDateObj
          });

          const card = document.createElement("div");
          card.className = "prayer-card";
          card.innerHTML = `
            <h4>${prayer.name}</h4>
            <div>${formatTo12(prayer.time)}</div>
            <div class="countdown" id="count-${prayer.name}"></div>
          `;

          prayerGrid.appendChild(card);
        });

        function updateCountdown() {

          const now = new Date();
          let nextPrayer = prayerTimes.find(p => p.date > now);
          // نحدد الصلاة الحالية (آخر صلاة دخل وقتها)
let currentPrayer = null;

for (let i = prayerTimes.length - 1; i >= 0; i--) {
  if (now >= prayerTimes[i].date) {
    currentPrayer = prayerTimes[i].name;
    break;
  }
}

// لو اليوم بدأ ولسه فجر مجاش
if (!currentPrayer) {
  currentPrayer = prayerTimes[prayerTimes.length - 1].name;
}

if (currentPrayerName !== currentPrayer) {

  currentPrayerName = currentPrayer;
  localStorage.setItem("lastPrayerName", currentPrayer);

  resetPrayerAzkar();
}

          if (!nextPrayer) {
            nextPrayer = prayerTimes[0];
            nextPrayer.date.setDate(nextPrayer.date.getDate() + 1);
          }

          let diff = nextPrayer.date - now;

          let hours = Math.floor(diff / (1000 * 60 * 60));
          let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((diff % (1000 * 60)) / 1000);

          document.querySelectorAll(".prayer-card").forEach(card => {
            card.classList.remove("next-prayer");
          });

          const nextCard = Array.from(document.querySelectorAll(".prayer-card"))
            .find(card => card.querySelector("h4").innerText === nextPrayer.name);

          if (nextCard) {
            nextCard.classList.add("next-prayer");
          }

          document.querySelectorAll(".countdown").forEach(el => el.innerText = "");

          const countdownEl = document.getElementById("count-" + nextPrayer.name);
          if (countdownEl) {
            countdownEl.innerText = `⏳ باقي ${hours}س ${minutes}د ${seconds}ث`;
          }
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);

      });

  });

  function formatTo12(time24) {
    let [hour, minute] = time24.split(":");
    hour = parseInt(hour);
    let ampm = hour >= 12 ? "م" : "ص";
    hour = hour % 12;
    hour = hour ? hour : 12;
    return `${hour}:${minute} ${ampm}`;
  }

});

function resetPrayerAzkar() {

  Object.keys(localStorage).forEach(key => {
    if (key.startsWith("prayer_")) {
      localStorage.removeItem(key);
    }
  });

  if (typeof updatePrayerProgress === "function") {
    updatePrayerProgress();
  }

  console.log("تم إعادة أذكار الصلاة مع دخول صلاة جديدة");
}