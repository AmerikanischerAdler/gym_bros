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

document.addEventListener("DOMContentLoaded", function() {
  var socialAdd = document.getElementById('social-add');
  var dropdownContent = socialAdd.querySelector('.dropdown-content');

  if (socialAdd && dropdownContent) {
    socialAdd.addEventListener('mouseover', function() {
      dropdownContent.style.display = 'flex';
      dropdownContent.style.flexDirection = 'column';
    });

    socialAdd.addEventListener('mouseout', function() {
      dropdownContent.style.display = 'none';
    });
  }

  var socialProfiles = document.querySelectorAll('.social-profile');
  
  socialProfiles.forEach(function(profile) {
    profile.addEventListener('click', function() {
      var socialInput = document.querySelector(".social-input");

      if (socialInput.parentNode) {
        socialInput.parentNode.removeChild(socialInput);
      }

      profile.insertAdjacentElement('afterend', socialInput);
      socialInput.style.display = "inline-flex";
      
      var submitLink = document.getElementById('submit-link');
      submitLink.addEventListener('click', function(event) {
        event.preventDefault();

        var socialLink = document.getElementById('soclink').value.trim();

        if (socialLink && !/^https?:\/\//i.test(socialLink)) {
          socialLink = "https://" + socialLink;
        }

        if (socialLink !== "") {
          console.log("Social link submitted: " + socialLink);

          fetch('/add-social-link', {
            method: 'POST',
            body: JSON.stringify({ link: socialLink }),
            headers: {
                'Content-Type': 'application/json'
            }
          }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                
                var newDiv = document.createElement('div');
                newDiv.classList.add('add-btn', 'socials'); 
                newDiv.style.padding = "0 10px";
  
                var newText = document.createElement('p');
                var profileText = profile.querySelector('p').textContent;
                newText.textContent = profileText;
                newText.style.width = '70px';
                newText.style.marginLeft = '-13px';
                newDiv.appendChild(newText);
  
                var newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                newSvg.setAttribute("viewBox", profile.querySelector('svg').getAttribute('viewBox'));
                newSvg.innerHTML = profile.querySelector('svg').innerHTML;
                newSvg.style.width = '25px';
                newDiv.appendChild(newSvg);
  
                var newAnchor = document.createElement('a');
                newAnchor.href = socialLink; 
                newAnchor.target = '_blank';  
                newAnchor.appendChild(newDiv);
  
                const socialAddDiv = document.getElementById("social-add");
                const parentDiv = socialAddDiv.parentNode;
                parentDiv.insertBefore(newAnchor, socialAddDiv);
  
                var anchorTags = dropdownContent.querySelectorAll('a');
                anchorTags.forEach(function(anchor) {
                  var anchorText = anchor.querySelector('p').textContent;
                  if (anchorText === profileText) {
                    dropdownContent.removeChild(anchor);
                  }
                });
  
                if (dropdownContent.children.length === 0) {
                  socialAdd.remove();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
          console.log("Please enter a social link before submitting.");
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var followButton = document.querySelector('.add-btn');

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

