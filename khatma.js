/* ================= نظام الختمة الذكي ================= */

const TOTAL_PAGES = 604;

// حساب أيام رمضان المتبقية
function getRemainingRamadanDays() {

  const today = new Date();

  // عدّل التاريخ ده حسب بداية رمضان
  const ramadanStart = new Date("2026-02-18");
  const ramadanEnd = new Date("2026-03-19");

  if (today < ramadanStart) return 30;

  if (today > ramadanEnd) return 0;

  const diff = ramadanEnd - today;

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function loadKhatma() {

  let pages = parseInt(localStorage.getItem("khatmaPages")) || 0;
  if (pages > TOTAL_PAGES) pages = TOTAL_PAGES;

  const pagesRead = document.getElementById("pagesRead");
  const khatmaPercent = document.getElementById("khatmaPercent");
  const khatmaFill = document.getElementById("khatmaFill");
  const khatmaStats = document.getElementById("khatmaStats");

  if (!pagesRead) return;

  pagesRead.innerText = pages;

  let percent = Math.round((pages / TOTAL_PAGES) * 100);

  khatmaPercent.innerText = percent;
  khatmaFill.style.width = percent + "%";

  const remainingPages = TOTAL_PAGES - pages;
  const remainingDays = getRemainingRamadanDays();

  let dailyPlan = 0;

  if (remainingDays > 0) {
    dailyPlan = Math.ceil(remainingPages / remainingDays);
  }

  khatmaStats.innerHTML = `
    📌 المتبقي: <span>${remainingPages}</span> صفحة <br>
    📅 باقي أيام رمضان: <span>${remainingDays}</span> يوم <br>
    📖 لازم تقرأ يومياً: <span>${dailyPlan}</span> صفحة
  `;
}

function updateKhatma() {

  let input = parseInt(document.getElementById("pagesInput").value);

  if (isNaN(input) || input < 0) {
    alert("اكتب رقم صحيح");
    return;
  }

  if (input > TOTAL_PAGES) {
    input = TOTAL_PAGES;
  }

  localStorage.setItem("khatmaPages", input);

  loadKhatma();
}

document.addEventListener("DOMContentLoaded", loadKhatma);


/* ================= جدول الختمة حسب عدد المرات ================= */

function generateKhatma() {

  const khatmaInput = document.getElementById("khatmaCount");
  const tableContainer = document.getElementById("tableContainer");

  let khatma = parseInt(khatmaInput.value);

  if (isNaN(khatma) || khatma <= 0) {
    alert("اكتب رقم صحيح");
    return;
  }

  const totalPages = 604;
  const today = new Date();

  const ramadanStart = new Date("2026-02-18");
  const ramadanEnd = new Date("2026-03-19");

  let remainingDays;

  if (today < ramadanStart) {
    remainingDays = 30;
  } else if (today > ramadanEnd) {
    alert("رمضان انتهى 😅");
    return;
  } else {
    remainingDays = Math.ceil(
      (ramadanEnd - today) / (1000 * 60 * 60 * 24)
    );
  }

  const totalRequired = totalPages * khatma;

  const pagesPerDay = Math.ceil(totalRequired / remainingDays);
  const pagesPerPrayer = Math.ceil(pagesPerDay / 5);

  tableContainer.innerHTML = `
    <table>
      <tr>
        <th>عدد الختمات</th>
        <th>الأيام المتبقية</th>
        <th>الفجر</th>
        <th>الظهر</th>
        <th>العصر</th>
        <th>المغرب</th>
        <th>العشاء</th>
      </tr>

      <tr>
        <td>${khatma} مرة</td>
        <td>${remainingDays} يوم</td>
        <td>${pagesPerPrayer} صفحات</td>
        <td>${pagesPerPrayer} صفحات</td>
        <td>${pagesPerPrayer} صفحات</td>
        <td>${pagesPerPrayer} صفحات</td>
        <td>${pagesPerPrayer} صفحات</td>
      </tr>
    </table>
  `;
}