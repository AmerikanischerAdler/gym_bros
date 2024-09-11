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

