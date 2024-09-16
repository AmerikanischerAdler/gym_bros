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
      dropdownContent.style.display = 'block';
    });

    socialAdd.addEventListener('mouseout', function() {
      dropdownContent.style.display = 'none';
    });
  }

  var socialProfiles = document.querySelectorAll('.social-profile');
  
  socialProfiles.forEach(function(profile) {
    profile.addEventListener('click', function() {
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

      const socialAddDiv = document.getElementById("social-add");
      const parentDiv = socialAddDiv.parentNode;
      parentDiv.insertBefore(newDiv, socialAddDiv);

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
    });
  });
});

