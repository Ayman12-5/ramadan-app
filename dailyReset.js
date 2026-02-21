// dailyReset.js
// دوال لمسح / إعادة الحالة اليومية (مهام، أذكار، أسئلة) وتحديد إعادة تلقائية عند منتصف الليل

(function () {
  // تغيير اللائحة دي حسب المفاتيح اللي بتستخدمها فعلاً في مشروعك
  const DAILY_PREFIXES = [
    "lastPrayerName",
    "task_",       // المهام (tasks.js) — keys like task_0, task_1
    "zekr_",       // أذكار الصباح
    "evening_",    // أذكار المساء
    "prayer_",     // أذكار بعد الصلاة
    "quiz_",       // أي مفاتيح للـ quiz زي quiz_...
    "quizDay",
    "quizStarted",
    "quizTimer",
    "completedQuestions",
    "userQuizAnswers" // لو استخدمت prefix مختلف عدله هنا
  ];

  function isDailyKey(key) {
    return DAILY_PREFIXES.some(pref => key.startsWith(pref));
  }

  // يمسح فقط المفاتيح اليومية المحددة أعلاه
  function clearDailyKeys() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && isDailyKey(k)) keysToRemove.push(k);
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
    console.log("dailyReset: cleared keys:", keysToRemove);
  }

  // دالة رئيسية للاستدعاء عند إعادة اليوم
  function resetDailyData() {
    clearDailyKeys();

    // حدث تحديث الواجهات لو موجودة
    if (typeof updateTasksProgress === "function") {
      try { updateTasksProgress(); } catch (e) { console.warn(e); }
    }
    if (typeof updateProgress === "function") {
      try { updateProgress(); } catch (e) { console.warn(e); }
    }
    if (typeof updateEveningProgress === "function") {
      try { updateEveningProgress(); } catch (e) { console.warn(e); }
    }
    if (typeof updatePrayerProgress === "function") {
      try { updatePrayerProgress(); } catch (e) { /* optional */ }
    }

    // لو عندك دالة لإعادة تهيئة الـ quiz UI بعد المسح، ننديه
    if (typeof resetQuizUIForNewDay === "function") {
      try { resetQuizUIForNewDay(); } catch (e) { console.warn(e); }
    } else {
      // fallback: لو في startQuiz() نعرض شاشة البداية
      const startScreen = document.getElementById("quizStartScreen");
      const quizContainer = document.getElementById("quizContainer");
      const timerBox = document.getElementById("timerBox");
      if (startScreen) startScreen.style.display = "block";
      if (quizContainer) { quizContainer.innerHTML = ""; quizContainer.style.filter = "blur(8px)"; quizContainer.style.pointerEvents = "none"; }
      if (timerBox) timerBox.style.display = "none";
    }

    // سجل آخر إعادة
    localStorage.setItem("dailyResetDate", todayString());
    console.log("dailyReset: completed at", new Date().toLocaleString());
  }

  function todayString() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  // يتأكد عند التحميل لو محتاج إعادة
  function initDailyResetOnLoad() {
    const last = localStorage.getItem("dailyResetDate");
    if (last !== todayString()) {
      // لو آخر إعادة مش نفس تاريخ اليوم — نعمل reset
      resetDailyData();
    } else {
      console.log("dailyReset: already reset today:", last);
    }

    scheduleNextMidnightReset();
  }

  // يحسب المدة للمنتصف الليلي الجاي ويضبط setTimeout
  function scheduleNextMidnightReset() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 5, 0); // نعملها بعد 5 ثواني من منتصف الليل لتفادي مشاكل التوقيت
    const ms = tomorrow - now;
    if (ms > 0 && ms < 1000 * 60 * 60 * 24 + 1000) {
      setTimeout(() => {
        resetDailyData();
        scheduleNextMidnightReset(); // جدولة لليوم اللي بعده
      }, ms);
      console.log("dailyReset: next reset scheduled in ms:", ms);
    } else {
      // fallback: لو الحساب طلع خاطئ، جدولة بعد 24 ساعة
      setTimeout(() => {
        resetDailyData();
        scheduleNextMidnightReset();
      }, 1000 * 60 * 60 * 24);
    }
  }

  // تابع للتطبيق: يفضّل تصدير init لو حب تنديه من main.js
  window.initDailyReset = initDailyResetOnLoad;
  window.resetDailyData = resetDailyData;
  window.clearDailyKeys = clearDailyKeys;
})();