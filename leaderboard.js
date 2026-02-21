const leaderboardList = document.getElementById("leaderboardList");

async function loadLeaderboard() {

  if (!leaderboardList) return;

  const { data, error } = await supabaseClient
    .from("users")
    .select("id, name, points, avatar_url")
    .order("points", { ascending: false });

  if (error) {
    console.log("Leaderboard Error:", error.message);
    return;
  }

  leaderboardList.innerHTML = "";

  // لو مفيش مستخدمين
  if (!data || data.length === 0) {
    leaderboardList.innerHTML = `
      <div class="leaderboard-item">
        <div>لا يوجد مستخدمين بعد 😅</div>
      </div>
    `;
    return;
  }

  data.forEach((user, index) => {

    const card = document.createElement("div");
    card.className = "leaderboard-item";

    const crown = index === 0 ? " 👑" : "";

    const safeName = user.name || "مستخدم";
    const safeAvatar = user.avatar_url || "";

    card.innerHTML = `
      <div class="leader-left">
        <div class="leader-rank">#${index + 1}</div>

        <div class="leader-avatar"
          style="background-image:url('${safeAvatar}')">
        </div>

        <div class="leader-name">
          ${safeName}${crown}
        </div>
      </div>

      <div class="leader-points">
        ⭐ ${user.points || 0}
      </div>
    `;

    leaderboardList.appendChild(card);

  });

}

document.addEventListener("DOMContentLoaded", loadLeaderboard);