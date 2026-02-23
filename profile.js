// profile.js
document.addEventListener("DOMContentLoaded", initProfile);

async function initProfile() {
  const avatarEl = document.getElementById("profileAvatar");
  const nameEl = document.getElementById("profileName");
  const nameInput = document.getElementById("nameInput");
  const avatarInput = document.getElementById("avatarInput");
  const saveBtn = document.getElementById("saveProfileBtn");
  const msg = document.getElementById("profileMsg");

  // جلب اليوزر من Supabase Auth
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    // مش متسجّل
    nameEl.innerText = "--";
    return;
  }

  // نجيب بيانات من جدول users (لو مخزنة هناك) — الأول نحاول نقرأ من users table
  const { data: dbUser, error: selectErr } = await supabaseClient
    .from("users")
    .select("name, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  // إذا موجود في الداتا بيز نعرضه، وإلا نستخدم بيانات الـ auth (Google)
  const currentName = dbUser?.name || user.user_metadata?.full_name || "بدون اسم";
  const currentAvatar = dbUser?.avatar_url || user.user_metadata?.avatar_url || "";

  nameEl.innerText = currentName;
  nameInput.value = currentName;

  if (currentAvatar) {
    avatarEl.style.backgroundImage = `url(${currentAvatar})`;
  }

  // معاينة صورة لو اختار
  avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    avatarEl.style.backgroundImage = `url(${url})`;
  });

  // حفظ التغييرات
  saveBtn.addEventListener("click", async () => {
    msg.style.color = "#fff";
    msg.innerText = "جاري الحفظ...";

    const newName = nameInput.value.trim() || currentName;
    const file = avatarInput.files[0];

    let newAvatarUrl = currentAvatar;

    // 1) لو في ملف صورة، نرفعه في storage
    if (file) {
      try {
        // اسم ملف فريد
        const fileExt = file.name.split('.').pop();
        const filePath = `avatars/${user.id}/${Date.now()}.${fileExt}`;

        // رفع الملف
        const { error: uploadError } = await supabaseClient.storage
          .from("avatars")
          .upload(filePath, file, { cacheControl: "3600", upsert: true });

        if (uploadError) throw uploadError;

        // الحصول على public url (لو البَكت عام)
        const { data: publicData } = supabaseClient.storage
          .from("avatars")
          .getPublicUrl(filePath);

        newAvatarUrl = publicData.publicUrl;
      } catch (err) {
        console.error("Upload error:", err);
        msg.style.color = "#f88";
        msg.innerText = "حصل خطأ أثناء رفع الصورة.";
        return;
      }
    }

    // 2) نعمل upsert أو update في جدول users
    try {
      // نستخدم upsert عشان لو مش موجود ينشئ
      const { error: upsertErr } = await supabaseClient
        .from("users")
        .upsert({
          id: user.id,
          name: newName,
          avatar_url: newAvatarUrl
        }, { onConflict: "id" });

      if (upsertErr) throw upsertErr;

      // 3) نعرض النتيجة في الواجهة ونحدّث النقاط / ترتيب المستخدم لو لازم
      document.querySelector(".profile div div").innerText = newName; // في navbar
      const navAvatar = document.querySelector(".avatar");
      if (navAvatar) {
        navAvatar.style.backgroundImage = `url(${newAvatarUrl})`;
        navAvatar.style.backgroundSize = "cover";
        navAvatar.style.backgroundPosition = "center";
      }

      nameEl.innerText = newName;
      msg.style.color = "#8f8";
      msg.innerText = "تم الحفظ بنجاح ✅";

      // اختياري: حدث الـ leaderboard لو مفتوح (loadLeaderboard يقرأ من users table)
      if (typeof loadLeaderboard === "function") {
        loadLeaderboard();
      }

    } catch (err) {
      console.error("DB update error:", err);
      msg.style.color = "#f88";
      msg.innerText = "حصل خطأ أثناء تحديث البيانات.";
    }
  });
}