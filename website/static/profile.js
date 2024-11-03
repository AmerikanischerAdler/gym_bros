function submitAllForms() {
  const forms = document.querySelectorAll('form');

  const finalForm = document.createElement('form');
  finalForm.method = 'POST';
  finalForm.action = '/update-profile'; 

  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const clonedInput = input.cloneNode(true);
      finalForm.appendChild(clonedInput);
    });
  });

  document.body.appendChild(finalForm);
  finalForm.submit();
}

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

window.onload = function() {
  var bars = document.querySelectorAll(".prog-bar");
  
  bars.forEach(function(bar) {
    move(bar);
  });
};

// Following
document.addEventListener("DOMContentLoaded", function() {
  const followButtons = document.querySelectorAll('.follow-friend .followBtn');

  followButtons.forEach(followButton => {
    followButton.addEventListener('click', function(event) {
      event.preventDefault();
      var followedUserId = followButton.getAttribute('data-userId');

      if (followedUserId) {
        fetch(`/follow/${followedUserId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({}) 
        })
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            console.log(data.message); 

            var followersCountElement = document.querySelector(`#followers-count-${followedUserId}`);
            if (followersCountElement && data.followers_count !== undefined) {
              followersCountElement.textContent = data.followers_count;
            }

            var friendsCountElement = document.querySelector(`#friends-count-${followedUserId}`);
            if (friendsCountElement && data.friends_count !== undefined) {
              friendsCountElement.textContent = data.friends_count;
            }

            var followText = document.querySelector(`#followText-${followedUserId}`);
            var friendText = document.querySelector(`#friendText-${followedUserId}`);

            followText.textContent = data.isFollowing ? 'Unfollow' : 'Follow';

            // for friend request
            //friendText.textContent = data.friendStatus

          } else if (data.error) {
            console.error(data.error);  
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      } else {
        console.error("No user ID found.");
      }
    });
  });
});

var editingDiv = document.getElementById("editing");
var editBtn = document.getElementById("editor");

var isOn = editingDiv.textContent.trim() === "true";

editBtn.addEventListener("click", function() {
    fetch('/toggle_editing', { method: 'POST' })
        .then(response => response.text())
        .then(html => {
            document.getElementById("ajax-target-repl").innerHTML = html;
        })
        .catch(error => console.error('Error:', error));

    if (isOn) {
        editBtn.style.backgroundColor = "#BA9593";
    } else {
        editBtn.style.backgroundColor = "#646F58";
    }
    
    isOn = !isOn;
    editingDiv.textContent = isOn;
});

