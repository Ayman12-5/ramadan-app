let currentQuestionIndex = 0;
let quizScore = 0;
let timeLeft = 30;
let timerInterval;

const quizContainer = document.getElementById("quizContainer") || document.getElementById("quiz-container");

const easyQuestions = [
    { question: "كم عدد أركان الإسلام؟", options: ["3", "4", "5", "6"], correct: 2 },
    { question: "كم عدد سور القرآن الكريم؟", options: ["110", "112", "114", "120"], correct: 2 },
    { question: "في أي شهر يصوم المسلمون؟", options: ["شعبان", "رمضان", "رجب", "محرم"], correct: 1 },
    { question: "من هو خاتم الأنبياء؟", options: ["موسى", "عيسى", "محمد ﷺ", "نوح"], correct: 2 },
    { question: "أين وُلد النبي ﷺ؟", options: ["المدينة", "مكة", "الطائف", "الشام"], correct: 1 },
    { question: "كم عدد الصلوات المفروضة يوميًا؟", options: ["3", "4", "5", "6"], correct: 2 },
    { question: "ما هي أطول سورة في القرآن؟", options: ["البقرة", "آل عمران", "النساء", "المائدة"], correct: 0 },
    { question: "ما هي أقصر سورة في القرآن؟", options: ["الإخلاص", "الكوثر", "العصر", "الناس"], correct: 1 },
    { question: "كم عدد أجزاء القرآن؟", options: ["20", "30", "40", "60"], correct: 1 },
    { question: "ما اسم أول خليفة راشد؟", options: ["عمر", "علي", "أبو بكر", "عثمان"], correct: 2 },
    { question: "ما هي قبلة المسلمين؟", options: ["المسجد الأقصى", "الكعبة", "المسجد النبوي", "قبة الصخرة"], correct: 1 },
    { question: "كم عدد أيام شهر رمضان؟", options: ["29 أو 30", "28", "31", "27"], correct: 0 },
    { question: "من هو النبي الذي ابتلعه الحوت؟", options: ["يوسف", "يونس", "موسى", "إبراهيم"], correct: 1 },
    { question: "في أي ليلة نزل القرآن؟", options: ["ليلة النصف", "ليلة القدر", "ليلة الإسراء", "ليلة الجمعة"], correct: 1 },
    { question: "كم عدد أركان الإيمان؟", options: ["4", "5", "6", "7"], correct: 2 },
    { question: "من هو النبي الذي كلمه الله مباشرة؟", options: ["عيسى", "إبراهيم", "موسى", "نوح"], correct: 2 },
    { question: "ما اسم والد النبي ﷺ؟", options: ["عبدالله", "أبو طالب", "عمر", "حمزة"], correct: 0 },
    { question: "كم مرة نصلي في اليوم؟", options: ["4", "5", "6", "7"], correct: 1 },
    { question: "ما اسم أم المؤمنين زوجة النبي ﷺ؟", options: ["عائشة", "مريم", "آسية", "خديجة"], correct: 0 },
    { question: "في أي مدينة هاجر النبي ﷺ؟", options: ["الطائف", "مكة", "المدينة", "بدر"], correct: 2 },
    { question: "ما اسم الكتاب المقدس للمسلمين؟", options: ["التوراة", "الإنجيل", "الزبور", "القرآن"], correct: 3 },
    { question: "من هو النبي الذي بُنيت السفينة في عهده؟", options: ["نوح", "إبراهيم", "موسى", "عيسى"], correct: 0 },
    { question: "كم عدد التكبيرات في صلاة العيد (الركعة الأولى)؟", options: ["7", "5", "3", "9"], correct: 0 },
    { question: "ما هي السورة التي تُسمى قلب القرآن؟", options: ["يس", "الرحمن", "الواقعة", "الملك"], correct: 0 },
    { question: "من هو أول مؤذن في الإسلام؟", options: ["بلال", "عمر", "علي", "خالد"], correct: 0 },
    { question: "كم عدد ركعات صلاة الفجر؟", options: ["2", "3", "4", "5"], correct: 0 },
    { question: "ما اسم غزوة حدثت في رمضان؟", options: ["أحد", "الخندق", "بدر", "حنين"], correct: 2 },
    { question: "ما اسم أطهر مكان على وجه الأرض؟", options: ["المسجد الأقصى", "المسجد النبوي", "الكعبة", "المدينة"], correct: 2 },
    { question: "من هو الصحابي الملقب بالفاروق؟", options: ["أبو بكر", "علي", "عثمان", "عمر"], correct: 3 },
    { question: "ما هي أول آية نزلت من القرآن؟", options: ["الحمد لله", "اقرأ باسم ربك", "قل هو الله أحد", "يا أيها الناس"], correct: 1 }
];

const mediumQuestions = [
    { question: "كم استمرت دعوة النبي ﷺ في مكة قبل الهجرة؟", options: ["10", "11", "12", "13"], correct: 3 },
    { question: "ما اسم السورة التي لا تبدأ بالبسملة؟", options: ["التوبة", "الأنفال", "يونس", "هود"], correct: 0 },
    { question: "كم عدد الأنبياء المذكورين في القرآن؟", options: ["20", "23", "25", "30"], correct: 2 },
    { question: "ما اسم أم النبي ﷺ؟", options: ["آمنة", "خديجة", "عائشة", "فاطمة"], correct: 0 },
    { question: "من جمع القرآن في مصحف واحد؟", options: ["علي", "عثمان", "عمر", "أبو بكر"], correct: 1 },
    { question: "في أي غزوة استشهد حمزة؟", options: ["بدر", "أحد", "الخندق", "حنين"], correct: 1 },
    { question: "كم عدد أبواب الجنة؟", options: ["6", "7", "8", "9"], correct: 2 },
    { question: "من نام في فراش النبي ليلة الهجرة؟", options: ["عمر", "علي", "عثمان", "بلال"], correct: 1 },
    { question: "ما اسم الغار في الهجرة؟", options: ["حراء", "ثور", "أحد", "النور"], correct: 1 },
    { question: "من هو خليل الله؟", options: ["موسى", "عيسى", "إبراهيم", "محمد"], correct: 2 },
    { question: "ما اسم أول مسجد بُني؟", options: ["الحرام", "النبوي", "قباء", "الأقصى"], correct: 2 },
    { question: "من هو سيف الله المسلول؟", options: ["علي", "خالد", "عمر", "حمزة"], correct: 1 },
    { question: "من أُعطي الزبور؟", options: ["سليمان", "داوود", "موسى", "نوح"], correct: 1 },
    { question: "ما اسم والد إبراهيم؟", options: ["آزر", "لوط", "سام", "هارون"], correct: 0 },
    { question: "كم تكبيرة في صلاة الجنازة؟", options: ["3", "4", "5", "6"], correct: 1 },
    { question: "من هي زوجة فرعون المؤمنة؟", options: ["مريم", "آسية", "خديجة", "عائشة"], correct: 1 },
    { question: "من صبر على المرض سنوات طويلة؟", options: ["أيوب", "يوسف", "إسماعيل", "يونس"], correct: 0 },
    { question: "في أي سورة قصة أصحاب الكهف؟", options: ["الإسراء", "الكهف", "يس", "الأنبياء"], correct: 1 },
    { question: "كم عدد أيام التشريق؟", options: ["2", "3", "4", "5"], correct: 1 },
    { question: "من هو أمين الأمة؟", options: ["أبو عبيدة", "عثمان", "علي", "سعد"], correct: 0 },
    { question: "ما اسم السورة عروس القرآن؟", options: ["يس", "الرحمن", "الواقعة", "الملك"], correct: 1 },
    { question: "من كان حدادًا من الأنبياء؟", options: ["داوود", "نوح", "إدريس", "سليمان"], correct: 0 },
    { question: "من هو النبي الذي رفعه الله؟", options: ["موسى", "عيسى", "نوح", "داوود"], correct: 1 },
    { question: "كم سنة خلافة عمر؟", options: ["5", "8", "10", "12"], correct: 2 },
    { question: "كم عدد سجود التلاوة تقريبًا؟", options: ["10", "12", "15", "17"], correct: 2 },
    { question: "في أي شهر كانت بدر؟", options: ["شعبان", "رمضان", "رجب", "ذو الحجة"], correct: 1 },
    { question: "كم مرة ذكر اسم مريم؟", options: ["24", "30", "34", "40"], correct: 2 },
    { question: "من هو ترجمان القرآن؟", options: ["ابن عباس", "ابن مسعود", "زيد", "أبو هريرة"], correct: 0 },
    { question: "من هو حواري الرسول؟", options: ["علي", "الزبير", "سعد", "طلحة"], correct: 1 },
    { question: "كم عدد الأنصار في بيعة العقبة الثانية؟", options: ["50", "60", "73", "100"], correct: 2 }
];

const hardQuestions = [
    { question: "من أشار بحفر الخندق؟", options: ["أبو بكر", "سلمان", "عمر", "خالد"], correct: 1 },
    { question: "كم سنة نام أصحاب الكهف؟", options: ["300", "309", "310", "307"], correct: 1 },
    { question: "من أول من جهر بالقرآن؟", options: ["علي", "ابن مسعود", "عمر", "أبو بكر"], correct: 1 },
    { question: "ما غزوة العسرة؟", options: ["بدر", "أحد", "تبوك", "حنين"], correct: 2 },
    { question: "كم مرة ذكر اسم محمد ﷺ؟", options: ["3", "4", "5", "6"], correct: 1 },
    { question: "من أول شهيدة في الإسلام؟", options: ["سمية", "بلال", "حمزة", "عمار"], correct: 0 },
    { question: "ما السورة الفاضحة؟", options: ["النساء", "التوبة", "المنافقون", "الحشر"], correct: 1 },
    { question: "كم عدد آيات البقرة؟", options: ["276", "286", "296", "306"], correct: 1 },
    { question: "في أي سنة فُتحت مكة؟", options: ["6هـ", "7هـ", "8هـ", "9هـ"], correct: 2 },
    { question: "من هو ذو النورين؟", options: ["عمر", "عثمان", "علي", "أبو بكر"], correct: 1 },
    { question: "من سُخرت له الريح؟", options: ["سليمان", "داوود", "إبراهيم", "موسى"], correct: 0 },
    { question: "من ألقي في النار؟", options: ["إبراهيم", "موسى", "يونس", "نوح"], correct: 0 },
    { question: "ما أول سرية؟", options: ["سرية حمزة", "سرية عبيدة", "سرية سعد", "سرية علي"], correct: 0 },
    { question: "من هو الصحابي الذي اهتز لموته العرش؟", options: ["سعد", "حمزة", "أبو عبيدة", "علي"], correct: 0 },
    { question: "ما السورة التي تعدل ثلث القرآن؟", options: ["الفلق", "الإخلاص", "الكوثر", "الناس"], correct: 1 },
    { question: "من النبي الذي أُعطي ملكًا لا ينبغي لأحد؟", options: ["داوود", "سليمان", "يوسف", "إبراهيم"], correct: 1 },
    { question: "كم عدد السجدات في سورة الحج؟", options: ["1", "2", "3", "4"], correct: 1 },
    { question: "من النبي الذي فُتن بامرأة العزيز؟", options: ["يوسف", "داوود", "سليمان", "إسماعيل"], correct: 0 },
    { question: "ما اسم جبل الوحي؟", options: ["ثور", "أحد", "حراء", "النور"], correct: 2 },
    { question: "من الصحابي الذي لقب بأمين السر؟", options: ["حذيفة", "سعد", "معاذ", "بلال"], correct: 0 },
    { question: "كم عدد الذين شهدوا بدرًا تقريبًا؟", options: ["200", "313", "400", "500"], correct: 1 },
    { question: "من أول من أسلم من الصبيان؟", options: ["الحسن", "علي", "زيد", "ابن عباس"], correct: 1 },
    { question: "ما اسم الغزوة التي قاتل فيها المسلمون الروم أول مرة؟", options: ["مؤتة", "تبوك", "حنين", "بدر"], correct: 0 },
    { question: "من هو النبي الذي كان يصوم يومًا ويفطر يومًا؟", options: ["داوود", "موسى", "إبراهيم", "نوح"], correct: 0 },
    { question: "ما اسم زوجة النبي الملقبة بأم المساكين؟", options: ["حفصة", "زينب بنت خزيمة", "أم سلمة", "سودة"], correct: 1 },
    { question: "كم سنة خلافة عثمان؟", options: ["10", "12", "14", "16"], correct: 1 },
    { question: "ما اسم الغار الذي اختبأ فيه النبي؟", options: ["حراء", "ثور", "أحد", "النور"], correct: 1 },
    { question: "كم مرة وردت كلمة رمضان في القرآن؟", options: ["1", "2", "3", "4"], correct: 0 },
    { question: "من النبي الذي دعا ربه أن يشرح صدره؟", options: ["موسى", "يوسف", "نوح", "إبراهيم"], correct: 0 },
    { question: "ما اسم السورة التي بدأت بحروف مقطعة (الم)؟", options: ["البقرة", "الكوثر", "الإخلاص", "الفلق"], correct: 0 }
];

// دالة تحديد يوم المسابقة (إصلاح الـ await)
async function getQuizDay() {
    const ramadanStart = new Date("2026-02-18");
    const today = new Date();
    const diff = today - ramadanStart;
    const day = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return day > 0 ? day : 1;
}

// الدالة الرئيسية لبدء المسابقة
async function startQuiz() {
    if (!quizContainer) {
        console.error("خطأ: لم يتم العثور على quizContainer في الـ HTML");
        return;
    }

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
        alert("يرجى تسجيل الدخول أولاً");
        return;
    }

    const day = await getQuizDay();

    // التأكد هل حل اليوم قبل كدة؟
    const { data: progress } = await supabaseClient
        .from("quiz_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("day", day)
        .maybeSingle();

    if (progress && progress.done) {
        quizContainer.innerHTML = `<div class='azkar-box'>لقد أجبت على أسئلة اليوم بنجاح! عد غداً لأسئلة جديدة 🌙</div>`;
        return;
    }

    // خلط الأسئلة واختيار 3 فقط
    const shuffled = [...easyQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 3);

    currentQuestionIndex = 0;
    quizScore = 0;
    showQuestion(selectedQuestions);
}

function showQuestion(questions) {
    if (currentQuestionIndex >= questions.length) {
        finishQuiz();
        return;
    }

    const q = questions[currentQuestionIndex];
    clearInterval(timerInterval);
    startTimer(questions);

    quizContainer.innerHTML = `
    <div class="azkar-box">
      <div style="display:flex; justify-content:space-between; margin-bottom:15px;">
        <span>السؤال ${currentQuestionIndex + 1} من 3</span>
        <span id="questionTimer" style="color:#E8B04A; font-weight:bold;">${timeLeft}</span>
      </div>
      <p style="font-size:1.2rem; margin-bottom:20px;">${q.question}</p>
      <div id="optionsGrid" style="display:grid; gap:10px;"></div>
    </div>
  `;

    const optionsGrid = document.getElementById("optionsGrid");
    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.className = "khatma-btn"; // استخدم نفس ستايل أزرار الختمة
        btn.style.width = "100%";
        btn.innerText = opt;
        btn.onclick = () => {
            if (index === q.correct) {
                quizScore++;
                btn.style.background = "#28a745";
            } else {
                btn.style.background = "#dc3545";
            }

            // منع الضغط المتكرر
            const buttons = optionsGrid.querySelectorAll('button');
            buttons.forEach(b => b.disabled = true);

            setTimeout(() => {
                currentQuestionIndex++;
                showQuestion(questions);
            }, 1000);
        };
        optionsGrid.appendChild(btn);
    });
}

function startTimer(questions) {
    timeLeft = 30;
    timerInterval = setInterval(() => {
        timeLeft--;
        const timerSpan = document.getElementById("questionTimer");
        if (timerSpan) timerSpan.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            currentQuestionIndex++;
            showQuestion(questions);
        }
    }, 1000);
}

async function finishQuiz() {
    clearInterval(timerInterval);
    const day = await getQuizDay();
    const { data: { user } } = await supabaseClient.auth.getUser();

    if (!user) return;

    // حفظ التقدم في قاعدة البيانات
    await supabaseClient.from("quiz_progress").upsert({
        user_id: user.id,
        day: day,
        done: true
    });

    // إضافة النقاط للمستخدم (مثلاً 10 نقاط لكل إجابة صحيحة)
    if (quizScore > 0) {
        const pointsToAdd = quizScore * 10;
        // تأكد أن لديك دالة addPoints في main.js
        if (typeof addPoints === 'function') {
            await addPoints(pointsToAdd);
        }
    }

    quizContainer.innerHTML = `
    <div class="azkar-box">
      <h2>انتهت الأسئلة! 🎉</h2>
      <p>نتيجتك: ${quizScore} من 3</p>
      <p>تم إضافة ${quizScore * 10} نقطة لرصيدك</p>
      <button class="khatma-btn" onclick="location.reload()">العودة للرئيسية</button>
    </div>
  `;
}