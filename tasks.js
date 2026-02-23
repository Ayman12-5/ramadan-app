/* ================= المهام اليومية ================= */
const today = new Date().toISOString().split("T")[0];

async function isTaskDone(taskName) {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return false;

  const { data } = await supabaseClient
    .from("daily_actions")
    .select("*")
    .eq("user_id", user.id)
    .eq("action_type", "task")
    .eq("action_name", taskName)
    .eq("action_date", today)
    .single();

  return !!data;
}
const dailyTasks = [
  { text: "صلاة الفجر في وقتها", points: 10 },
  { text: "قراءة القرآن", points: 10 },
  { text: "صلاة الضحى ", points: 5 },
  { text: "صدقة ولو بسيطة", points: 10 },
  { text: "الدعاء قبل الإفطار", points: 5 }
];

const tasksContainer = document.getElementById("tasksContainer");
const tasksDone = document.getElementById("tasksDone");
const tasksTotal = document.getElementById("tasksTotal");
const tasksPercent = document.getElementById("tasksPercent");
const tasksProgressFill = document.getElementById("tasksProgressFill");

async function updateTasksProgress() {

  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;

  const { data } = await supabaseClient
    .from("daily_actions")
    .select("*")
    .eq("user_id", user.id)
    .eq("action_type", "task")
    .eq("action_date", today);

  let done = data ? data.length : 0;
  let total = dailyTasks.length;
  let percent = Math.round((done / total) * 100);

  if (tasksDone) tasksDone.innerText = done;
  if (tasksTotal) tasksTotal.innerText = total;
  if (tasksPercent) tasksPercent.innerText = percent;
  if (tasksProgressFill) tasksProgressFill.style.width = percent + "%";
}

if (tasksContainer) {

  tasksContainer.innerHTML = "";

  dailyTasks.forEach((task, index) => {

    let box = document.createElement("div");
    box.className = "azkar-box";

    let header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.marginBottom = "10px";

    let title = document.createElement("div");
    title.innerText = task.text;
    title.style.fontSize = "18px";

    let badge = document.createElement("div");
    badge.innerText = `⭐ ${task.points}`;
    badge.style.background = "#E8B04A";
    badge.style.color = "#061826";
    badge.style.padding = "6px 10px";
    badge.style.borderRadius = "10px";
    badge.style.fontWeight = "bold";
    badge.style.whiteSpace = "nowrap";

    header.appendChild(title);
    header.appendChild(badge);

    let btn = document.createElement("div");
    btn.className = "counter";

   isTaskDone(task.text).then(done => {
  if (done) {
    btn.innerText = "تم يا معلم ✅";
    btn.classList.add("done");
  } else {
    btn.innerText = "عملتها";
  }
});

 btn.addEventListener("click", async () => {

  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;

  // نشوف هل المهمة متسجلة قبل كده
  const { data } = await supabaseClient
    .from("daily_actions")
    .select("*")
    .eq("user_id", user.id)
    .eq("action_type", "task")
    .eq("action_name", task.text)
    .eq("action_date", today)
    .single();

  if (data) {
    return; // لو متسجلة خلاص منديش نقاط
  }

  // نسجلها
  await supabaseClient
    .from("daily_actions")
    .insert({
      user_id: user.id,
      action_type: "task",
      action_name: task.text,
      action_date: today
    });

  btn.innerText = "تم ✅";
  btn.classList.add("done", "shake");

  await addPoints(task.points);

  updateTasksProgress();
});
    box.appendChild(header);
    box.appendChild(btn);

    tasksContainer.appendChild(box);

  });

  updateTasksProgress();
}