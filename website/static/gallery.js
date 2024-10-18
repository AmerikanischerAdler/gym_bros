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

document.addEventListener("DOMContentLoaded", function() {
    const badges = document.querySelectorAll(".badges");
    badges.forEach(badge => {
        const badgeStyle = window.getComputedStyle(badge); 
        if (badgeStyle.width === "0px") {
            badge.remove();
        }
    });
});

