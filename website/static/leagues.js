// Progress Bars
function move(bar) {
  var prog = parseInt(bar.dataset.prog);
  var goal = parseInt(bar.dataset.goal);
  
  var width = 1;
  var end = Math.floor((prog / goal) * 100);

  var ev = setInterval(frame, 10);
  function frame() {
    if (width >= end) {
      clearInterval(ev);
    } else {
      width++;
      bar.style.width = width + "%";
    }
  }
}

function initializeProgressBars() {
  const users = Array.from(document.querySelectorAll(".user"));

  users.forEach(user => {
    const prog = parseInt(user.dataset.prog);
    const goal = parseInt(user.dataset.goal);
    const progressPercent = goal > 0 ? Math.floor((prog / goal) * 100) : 0;
    user.dataset.progressPercent = progressPercent;
  });

  users.sort((a, b) => b.dataset.progressPercent - a.dataset.progressPercent);

  const topThree = users.slice(0, 3);
  const others = users.slice(3);

  const topThreeContainer = document.getElementById("all-top3");
  const otherUsersContainer = document.getElementById("all-list");

  topThree.forEach(user => topThreeContainer.appendChild(user));
  others.forEach(user => otherUsersContainer.appendChild(user));

  users.forEach((user, index) => {
    const rankSpan = user.querySelector(`#rank-${user.dataset.username}`);
    if (rankSpan) rankSpan.textContent = index + 1;
  });

  users.forEach(user => {
    const bar = user.querySelector(".prog-bar");
    if (bar) move(bar);
  });
}

window.onload = () => {
  initializeProgressBars();
};


