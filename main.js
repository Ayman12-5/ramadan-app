/* ================== Global System ================== */

function goTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

/* توليد نجوم الخلفية */
document.addEventListener("DOMContentLoaded", function () {
  const starsContainer = document.getElementById("stars");
  if (!starsContainer) return;

  for (let i = 0; i < 120; i++) {
    let star = document.createElement("span");
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDuration = (5 + Math.random() * 10) + "s";
    starsContainer.appendChild(star);
  }
});

/* ================== Auth System ================== */

async function loginWithGoogle() {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin
    }
  });

  if (error) {
    console.error("Login Error:", error.message);
  }
}

/* ================== On Load ================== */

document.addEventListener("DOMContentLoaded", async () => {

  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) return;

  goTo("dashboard");

  const name = user.user_metadata.full_name;
  const avatar = user.user_metadata.avatar_url;
  const userId = user.id;

  /* ====== عرض البيانات في الواجهة ====== */

  const nameEl = document.querySelector(".profile div div");
  const avatarEl = document.querySelector(".avatar");
  const pointsEl = document.getElementById("userPoints");

  if (nameEl) nameEl.innerText = name;

  if (avatarEl) {
    avatarEl.style.backgroundImage = `url(${avatar})`;
    avatarEl.style.backgroundSize = "cover";
    avatarEl.style.backgroundPosition = "center";
  }

  /* ====== نتأكد إنه موجود في جدول users ====== */

  const { data: existingUser } = await supabaseClient
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (!existingUser) {
    // أول مرة يسجل دخول
    await supabaseClient.from("users").insert({
      id: userId,
      name: name,
      avatar_url: avatar,
      points: 0
    });
  }

  /* ====== نجيب النقاط من الداتا بيز ====== */

  const { data: userData } = await supabaseClient
    .from("users")
    .select("points")
    .eq("id", userId)
    .single();

  if (userData && pointsEl) {
    pointsEl.innerText = userData.points;
  }
loadUserRank();
});
async function addPoints(amount) {

  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;

  const { data } = await supabaseClient
    .from("users")
    .select("points")
    .eq("id", user.id)
    .single();

  if (!data) return;

  const newPoints = data.points + amount;

  await supabaseClient
    .from("users")
    .update({ points: newPoints })
    .eq("id", user.id);

  const pointsEl = document.getElementById("userPoints");
  if (pointsEl) pointsEl.innerText = newPoints;
  await loadUserRank();
}

async function loadUserRank() {

  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;

  // نجيب كل المستخدمين مرتبين
  const { data, error } = await supabaseClient
    .from("users")
    .select("id, points")
    .order("points", { ascending: false });

  if (error) {
    console.log(error.message);
    return;
  }

  // نحدد ترتيب المستخدم الحالي
  const rank = data.findIndex(u => u.id === user.id) + 1;

  const rankEl = document.getElementById("userRank");
  const pointsEl = document.getElementById("userPointsCard");

  if (rankEl) rankEl.innerText = `#${rank}`;
  
  if (pointsEl) {
    const currentUser = data.find(u => u.id === user.id);
    pointsEl.innerText = currentUser ? currentUser.points : 0;
  }
}

async function updateProfile() {

  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;

  const newName = document.getElementById("newNameInput").value.trim();

  if (!newName) {
    alert("اكتب اسم صالح");
    return;
  }

  // تحديث جدول users
  const { error } = await supabaseClient
    .from("users")
    .update({ name: newName })
    .eq("id", user.id);

  if (error) {
    console.log(error.message);
    alert("حصل خطأ");
    return;
  }

  // تحديث auth metadata
  await supabaseClient.auth.updateUser({
    data: { full_name: newName }
  });

  // تحديث الاسم في النافبار فوراً
  document.getElementById("navUserName").innerText = newName;

  alert("تم تحديث الاسم بنجاح 🎉");
}

async function logoutUser() {

  await supabaseClient.auth.signOut();

  // رجوع لصفحة اللوجين
  goTo("login");

  // ممكن كمان تعمل reload احتياطي
  location.reload();
}