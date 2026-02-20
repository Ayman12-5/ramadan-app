const leaderboardList = document.getElementById("leaderboardList");

async function loadLeaderboard() {

  if (!leaderboardList) return;

  const { data, error } = await supabaseClient
    .from("users")
    .select("name, points, avatar_url")
    .order("points", { ascending: false });

  if (error) {
    console.log(error.message);
    return;
  }

  leaderboardList.innerHTML = "";

  data.forEach((user, index) => {

    const card = document.createElement("div");
    card.className = "leaderboard-item";

    const crown = index === 0 ? " 👑" : "";

    card.innerHTML = `
      <div class="leader-left">
        <div class="leader-rank">#${index + 1}</div>

        <div class="leader-avatar"
          style="background-image:url('${user.avatar_url || ""}')">
        </div>

        <div class="leader-name">
          ${user.name}${crown}
        </div>
      </div>

      <div class="leader-points">
        ⭐ ${user.points}
      </div>
    `;

    leaderboardList.appendChild(card);

  });

}

document.addEventListener("DOMContentLoaded", loadLeaderboard);