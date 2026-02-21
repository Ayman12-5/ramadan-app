/* ================= أذكار الصباح ================= */

const azkar = [
  {
    text: `أَصبَحْنا على فِطرةِ الإسلامِ، وعلى كَلِمةِ الإخلاصِ، وعلى دِينِ نَبيِّنا محمَّدٍ صلَّى اللهُ عليه وسلَّمَ، وعلى مِلَّةِ أبِينا إبراهيمَ، حَنيفًا مُسلِمًا، وما كان مِنَ المُشرِكينَ.`,
    count: 1
  },
  {
    text: `بسمِ اللهِ الذي لا يَضرُ مع اسمِه شيءٌ في الأرضِ ولا في السماءِ وهو السميعُ العليمِ.`,
    count: 3
  },
  {
    text: `سبحانَ اللَّهِ وبحمدِه لا قوَّةَ إلَّا باللَّهِ، ما شاءَ اللَّهُ كانَ وما لم يشأ لم يَكن، أعلمُ أنَّ اللَّهَ على كلِّ شيءٍ قديرٌ وأنَّ اللَّهَ قد أحاطَ بِكلِّ شيءٍ علمًا.`,
    count: 1
  },
  {
    text: `سبحانَ اللَّهِ وبحمدِهِ.`,
    count: 100
  },
  {
    text: `اللَّهمَّ بِكَ أصبَحنا، وبِكَ أمسَينا، وبِكَ نحيا وبِكَ نموتُ وإليكَ المصيرُ.`,
    count: 1
  },
  {
    text: `رَضيتُ باللَّهِ ربًّا، وبالإسلامِ دينًا، وبِمُحمَّدٍ رسولًا.`,
    count: 3
  },
  {
    text: `حَسبيَ اللهُ لا إلهَ إلَّا هو، عليه تَوكَّلْتُ، وهو ربُّ العَرشِ العَظيمِ.`,
    count: 7
  },
  {
    text: `اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد.`,
    count: 10
  }
];

const container = document.getElementById("azkarContainer");
const doneCountEl = document.getElementById("doneCount");
const totalCountEl = document.getElementById("totalCount");
const percentEl = document.getElementById("percent");
const progressFill = document.getElementById("progressFill");

function updateProgress() {
  let done = 0;

  azkar.forEach((_, i) => {
    if (localStorage.getItem("zekr_" + i) == 0) {
      done++;
    }
  });

  let total = azkar.length;
  let percent = Math.round((done / total) * 100);

  if (doneCountEl) doneCountEl.innerText = done;
  if (totalCountEl) totalCountEl.innerText = total;
  if (percentEl) percentEl.innerText = percent;
  if (progressFill) progressFill.style.width = percent + "%";
}

if (container) {
  azkar.forEach((zekr, index) => {

    let saved = localStorage.getItem("zekr_" + index);
    let currentCount = saved ? parseInt(saved) : zekr.count;

    let box = document.createElement("div");
    box.className = "azkar-box";

    let text = document.createElement("div");
    text.innerText = zekr.text;

    let counter = document.createElement("div");
    counter.className = "counter";

    if (currentCount <= 0) {
      counter.innerText = "تم يا معلم ✅";
      counter.classList.add("done");
    } else {
      counter.innerText = currentCount;
    }

    counter.addEventListener("click", async () => {
      if (currentCount > 1) {
        currentCount--;
        counter.innerText = currentCount;
        localStorage.setItem("zekr_" + index, currentCount);
      } else if (currentCount === 1) {
  currentCount = 0;
  counter.innerText = "تم يا معلم ✅";
  counter.classList.add("done", "shake");
  localStorage.setItem("zekr_" + index, 0);

  await addPoints(5); // ✅ تحديث Supabase

  updateProgress();
}
    });

    let pBadge = document.createElement("div");
    pBadge.style.marginTop = "12px";
    pBadge.style.display = "inline-block";
    pBadge.style.padding = "6px 10px";
    pBadge.style.borderRadius = "12px";
    pBadge.style.background = "rgba(232,176,74,0.12)";
    pBadge.style.color = "#E8B04A";
    pBadge.style.fontWeight = "bold";
    pBadge.style.fontSize = "14px";
    pBadge.innerText = `⭐ 5`;

    box.appendChild(text);
    box.appendChild(counter);
    box.appendChild(pBadge);
    container.appendChild(box);
  });

  updateProgress();
}
/* ================= أذكار المساء ================= */

const eveningAzkar = [
  {
    text: `قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ`,
    count: 3
  },
  {
    text: `قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِن شَرِّ مَا خَلَقَ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ`,
    count: 3
  },
  {
    text: `قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَٰهِ النَّاسِ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ`,
    count: 3
  },
  {
    text: `اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ`,
    count: 1
  },
  {
    text: `آمَنَ الرَّسولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ وَقَالُوا سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ`,
    count: 1
  },
  {
    text: `حم تَنزِيلُ الْكِتَابِ مِنَ اللَّهِ الْعَزِيزِ الْعَلِيمِ غَافِرِ الذَّنبِ وَقَابِلِ التَّوْبِ شَدِيدِ الْعِقَابِ ذِي الطَّوْلِ لَا إِلَٰهَ إِلَّا هُوَ إِلَيْهِ الْمَصِيرُ`,
    count: 1
  }
];

const eveningContainer = document.getElementById("eveningContainer");
const eveningDone = document.getElementById("eveningDone");
const eveningTotal = document.getElementById("eveningTotal");
const eveningPercent = document.getElementById("eveningPercent");
const eveningProgressFill = document.getElementById("eveningProgressFill");

function updateEveningProgress() {
  let done = 0;

  eveningAzkar.forEach((_, i) => {
    if (localStorage.getItem("evening_" + i) == 0) {
      done++;
    }
  });

  let total = eveningAzkar.length;
  let percent = Math.round((done / total) * 100);

  if (eveningDone) eveningDone.innerText = done;
  if (eveningTotal) eveningTotal.innerText = total;
  if (eveningPercent) eveningPercent.innerText = percent;
  if (eveningProgressFill) eveningProgressFill.style.width = percent + "%";
}

if (eveningContainer) {
  eveningAzkar.forEach((zekr, index) => {

    let saved = localStorage.getItem("evening_" + index);
    let currentCount = saved ? parseInt(saved) : zekr.count;

    let box = document.createElement("div");
    box.className = "azkar-box";

    let text = document.createElement("div");
    text.innerText = zekr.text;

    let counter = document.createElement("div");
    counter.className = "counter";

    if (currentCount <= 0) {
      counter.innerText = "تم يا معلم ✅";
      counter.classList.add("done");
    } else {
      counter.innerText = currentCount;
    }

    counter.addEventListener("click", async () => {
      if (currentCount > 1) {
        currentCount--;
        counter.innerText = currentCount;
        localStorage.setItem("evening_" + index, currentCount);
      } else if (currentCount === 1) {
        currentCount = 0;
        counter.innerText = "تم يا معلم ✅";
        counter.classList.add("done", "shake");
        localStorage.setItem("evening_" + index, 0);
        await addPoints(5);
        updateEveningProgress();
        
      }
    });

    let pBadge = document.createElement("div");
    pBadge.style.marginTop = "12px";
    pBadge.style.display = "inline-block";
    pBadge.style.padding = "6px 10px";
    pBadge.style.borderRadius = "12px";
    pBadge.style.background = "rgba(232,176,74,0.12)";
    pBadge.style.color = "#E8B04A";
    pBadge.style.fontWeight = "bold";
    pBadge.style.fontSize = "14px";
    pBadge.innerText = `⭐ 5`;

    box.appendChild(text);
    box.appendChild(counter);
    box.appendChild(pBadge);
    eveningContainer.appendChild(box);
  });

  updateEveningProgress();
}
/* ================= أذكار بعد الصلاة ================= */

const prayerAzkar = [
  {
    text: `أستغفر الله، أستغفر الله، اللهم أنت السلام ومنك السلام، تباركت يا ذا الجلال والإكرام.`,
    count: 1
  },
  {
    text: `لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، اللهم لا مانع لما أعطيت ولا معطي لما منعت ولا ينفع ذا الجد منك الجد.`,
    count: 1
  },
  {
    text: `لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، ولا حول ولا قوة إلا بالله، لا إله إلا الله، ولا نعبد إلا إياه، له النعمة وله الفضل وله الثناء الحسن، لا إله إلا الله مخلصين له الدين ولو كره الكافرون.`,
    count: 1
  },
 {
  text: `آية الكرسي: اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ`,
  count: 1
},
  { text: `سبحان الله`, count: 33 },
  { text: `الحمد لله`, count: 33 },
  { text: `الله أكبر`, count: 33 },
  {
    text: `لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.`,
    count: 1
  },
 {
  text: `قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ`,
  count: 1
},
  {
  text: `قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِن شَرِّ مَا خَلَقَ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ`,
  count: 1
},
 {
  text: `قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَٰهِ النَّاسِ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ`,
  count: 1
},
  { text: `اللهم أعني على ذكرك وشكرك وحسن عبادتك.`, count: 1 }
];
function getCurrentPrayer() {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 12) return "fajr";
  if (hours >= 12 && hours < 15) return "dhuhr";
  if (hours >= 15 && hours < 18) return "asr";
  if (hours >= 18 && hours < 20) return "maghrib";
  return "isha";
}

const currentPrayer = getCurrentPrayer();
const lastPrayer = localStorage.getItem("last_prayer");

if (lastPrayer !== currentPrayer) {
  prayerAzkar.forEach((_, i) => {
    localStorage.removeItem("prayer_" + i);
  });

  localStorage.setItem("last_prayer", currentPrayer);
}
const prayerContainer = document.getElementById("prayerContainer");
const prayerDone = document.getElementById("prayerDone");
const prayerTotal = document.getElementById("prayerTotal");
const prayerPercent = document.getElementById("prayerPercent");
const prayerProgressFill = document.getElementById("prayerProgressFill");

async function updatePrayerProgress() {
  let done = 0;

  prayerAzkar.forEach((_, i) => {
    if (localStorage.getItem("prayer_" + i) == 0) {
      done++;
    }
  });

  let total = prayerAzkar.length;
  let percent = Math.round((done / total) * 100);

  if (prayerDone) prayerDone.innerText = done;
  if (prayerTotal) prayerTotal.innerText = total;
  if (prayerPercent) prayerPercent.innerText = percent;
  if (prayerProgressFill) prayerProgressFill.style.width = percent + "%";

  // ✅ لما يخلص كل الأذكار
  if (percent === 100) {

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return;

    const today = new Date().toISOString().split("T")[0];

    const { error } = await supabaseClient
      .from("daily_actions")
      .insert({
        user_id: user.id,
        action_type: "prayer",
        action_name: currentPrayer,
        action_date: today
      });

    // لو اتسجل لأول مرة بس
    if (!error) {
      await addPoints(5);
    }
  }
}

if (prayerContainer) {
  prayerAzkar.forEach((zekr, index) => {

    let saved = localStorage.getItem("prayer_" + index);
    let currentCount = saved ? parseInt(saved) : zekr.count;

    let box = document.createElement("div");
    box.className = "azkar-box";

    let text = document.createElement("div");
    text.innerText = zekr.text;

    let counter = document.createElement("div");
    counter.className = "counter";

    if (currentCount <= 0) {
      counter.innerText = "تم يا معلم ✅";
      counter.classList.add("done");
    } else {
      counter.innerText = currentCount;
    }

    counter.addEventListener("click", async () => {
      if (currentCount > 1) {
        currentCount--;
        counter.innerText = currentCount;
        localStorage.setItem("prayer_" + index, currentCount);
      } else if (currentCount === 1) {
        currentCount = 0;
        counter.innerText = "تم يا معلم ✅";
        counter.classList.add("done", "shake");
        localStorage.setItem("prayer_" + index, 0);
        await addPoints(5);
        updatePrayerProgress();
      }
    });

    let pBadge = document.createElement("div");
    pBadge.style.marginTop = "12px";
    pBadge.style.display = "inline-block";
    pBadge.style.padding = "6px 10px";
    pBadge.style.borderRadius = "12px";
    pBadge.style.background = "rgba(232,176,74,0.12)";
    pBadge.style.color = "#E8B04A";
    pBadge.style.fontWeight = "bold";
    pBadge.style.fontSize = "14px";
    pBadge.innerText = `⭐ 5`;

    box.appendChild(text);
    box.appendChild(counter);
    box.appendChild(pBadge);
    prayerContainer.appendChild(box);
  });

  updatePrayerProgress();
}