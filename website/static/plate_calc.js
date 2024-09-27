const bar = document.getElementById("theBar");
const parentDiv = document.getElementById("aniPlate");

function clearPlates() {
    const leftPlates = document.querySelectorAll('.left-plate');
    const rightPlates = document.querySelectorAll('.right-plate');
  
    leftPlates.forEach(plate => plate.remove()); 
    rightPlates.forEach(plate => plate.remove()); 
}

function updateWeight(amount) {
    const weightInput = document.getElementById("weight");
    const weightText = document.getElementById('weight-output');  
    const barWeightInput = document.getElementById('barWeight');  

    var barWeight = parseInt(barWeightInput.value) || 45;  
    var currentWeight = parseInt(weightInput.value) || 0;

    if (currentWeight === 0) {
        currentWeight += barWeight;
    }

    currentWeight += amount;

    barWeightInput.value = barWeight;
    weightInput.value = currentWeight;
    weightText.textContent = `Entered weight: ${currentWeight}`;  
}

function add45(fromBtn = true) {
    var newDivLeft = document.createElement('div');
    newDivLeft.classList.add("plate-45", "left-plate"); 

    var newDivRight = document.createElement('div');
    newDivRight.classList.add("plate-45", "right-plate"); 

    const h45 = document.getElementById("h2-45");
    var count = parseInt(h45.textContent) || 0;  

    h45.textContent = count + 1;  

    parentDiv.insertBefore(newDivLeft, bar); 
    bar.insertAdjacentElement('afterend', newDivRight); 

    if (fromBtn === true) {
        updateWeight(90);
    }
}

function rem45(fromBtn = true) {
    const h45 = document.getElementById("h2-45");
    var count = parseInt(h45.textContent) || 0;  

    if (count !== 0) {
        const leftPlates = document.querySelectorAll('.plate-45.left-plate');
        const rightPlates = document.querySelectorAll('.plate-45.right-plate');
  
        leftPlates[0].remove()
        rightPlates[rightPlates.length - 1].remove();

        h45.textContent = count - 1;  

        if (fromBtn === true) {
            updateWeight(-90);
        }
    }
}

function add35(fromBtn = true) {
    var newDivLeft = document.createElement('div');
    newDivLeft.classList.add("plate-35", "left-plate"); 

    var newDivRight = document.createElement('div');
    newDivRight.classList.add("plate-35", "right-plate"); 

    const h35 = document.getElementById("h2-35");
    var count = parseInt(h35.textContent) || 0;  

    h35.textContent = count + 1;  

    var leftPlates = parentDiv.querySelectorAll('.plate-45.left-plate');
    var rightPlates = parentDiv.querySelectorAll('.plate-45.right-plate');

    if (leftPlates.length > 0 && rightPlates.length > 0) {

        parentDiv.insertBefore(newDivLeft, leftPlates[0]);  
        rightPlates[rightPlates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else {

        parentDiv.insertBefore(newDivLeft, bar);  
        bar.insertAdjacentElement('afterend', newDivRight);  
    }

    if (fromBtn === true) {
        updateWeight(70);
    }
}

function rem35(fromBtn = true) {
    const h35 = document.getElementById("h2-35");
    var count = parseInt(h35.textContent) || 0;  

    if (count !== 0) {
        const leftPlates = document.querySelectorAll('.plate-35.left-plate');
        const rightPlates = document.querySelectorAll('.plate-35.right-plate');
  
        leftPlates[0].remove()
        rightPlates[rightPlates.length - 1].remove();

        h35.textContent = count - 1;  

        if (fromBtn === true) {
            updateWeight(-70);
        }
    }
}

function add25(fromBtn = true) {
    var newDivLeft = document.createElement('div');
    newDivLeft.classList.add("plate-25", "left-plate"); 

    var newDivRight = document.createElement('div');
    newDivRight.classList.add("plate-25", "right-plate"); 

    const h25 = document.getElementById("h2-25");
    var count = parseInt(h25.textContent) || 0;  

    h25.textContent = count + 1;  

    var left35Plates = parentDiv.querySelectorAll('.plate-35.left-plate');
    var right35Plates = parentDiv.querySelectorAll('.plate-35.right-plate');

    var left45Plates = parentDiv.querySelectorAll('.plate-45.left-plate');
    var right45Plates = parentDiv.querySelectorAll('.plate-45.right-plate');

    if (left35Plates.length > 0 && right35Plates.length > 0) {

        parentDiv.insertBefore(newDivLeft, left35Plates[0]);  
        right35Plates[right35Plates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else if (left45Plates.length > 0 && right45Plates.length > 0) {

        parentDiv.insertBefore(newDivLeft, left45Plates[0]);  
        right45Plates[right45Plates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else {

        parentDiv.insertBefore(newDivLeft, bar);  
        bar.insertAdjacentElement('afterend', newDivRight);  
    }

    if (fromBtn === true) {
        updateWeight(50);
    }
}

function rem25(fromBtn = true) {
    const h25 = document.getElementById("h2-25");
    var count = parseInt(h25.textContent) || 0;  

    if (count !== 0) {
        const leftPlates = document.querySelectorAll('.plate-25.left-plate');
        const rightPlates = document.querySelectorAll('.plate-25.right-plate');
  
        leftPlates[0].remove()
        rightPlates[rightPlates.length - 1].remove();

        h25.textContent = count - 1;  

        if (fromBtn === true) {
            updateWeight(-50);
        }
    }
}

function add10(fromBtn = true) {
    var newDivLeft = document.createElement('div');
    newDivLeft.classList.add("plate-10", "left-plate"); 

    var newDivRight = document.createElement('div');
    newDivRight.classList.add("plate-10", "right-plate"); 

    const h10 = document.getElementById("h2-10");
    var count = parseInt(h10.textContent) || 0;  

    h10.textContent = count + 1;  

    var left25Plates = parentDiv.querySelectorAll('.plate-25.left-plate');
    var right25Plates = parentDiv.querySelectorAll('.plate-25.right-plate');

    var left35Plates = parentDiv.querySelectorAll('.plate-35.left-plate');
    var right35Plates = parentDiv.querySelectorAll('.plate-35.right-plate');

    var left45Plates = parentDiv.querySelectorAll('.plate-45.left-plate');
    var right45Plates = parentDiv.querySelectorAll('.plate-45.right-plate');

    if (left25Plates.length > 0 && right25Plates.length > 0) {

        parentDiv.insertBefore(newDivLeft, left25Plates[0]);  
        right25Plates[right25Plates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else if (left35Plates.length > 0 && right35Plates.length > 0) {

        parentDiv.insertBefore(newDivLeft, left35Plates[0]);  
        right35Plates[right35Plates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else if (left45Plates.length > 0 && right45Plates.length > 0) {

        parentDiv.insertBefore(newDivLeft, left45Plates[0]);  
        right45Plates[right45Plates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else {

        parentDiv.insertBefore(newDivLeft, bar);  
        bar.insertAdjacentElement('afterend', newDivRight);  
    }

    if (fromBtn === true) {
        updateWeight(20);
    }
}

function rem10(fromBtn = true) {
    const h10 = document.getElementById("h2-10");
    var count = parseInt(h10.textContent) || 0;  

    if (count !== 0) {
        const leftPlates = document.querySelectorAll('.plate-10.left-plate');
        const rightPlates = document.querySelectorAll('.plate-10.right-plate');
  
        leftPlates[0].remove()
        rightPlates[rightPlates.length - 1].remove();

        h10.textContent = count - 1;  

        if (fromBtn === true) {
            updateWeight(-20);
        }
    }
}

function add5(fromBtn = true) {
    var newDivLeft = document.createElement('div');
    newDivLeft.classList.add("plate-5", "left-plate"); 

    var newDivRight = document.createElement('div');
    newDivRight.classList.add("plate-5", "right-plate"); 

    const h5 = document.getElementById("h2-5");
    var count = parseInt(h5.textContent) || 0;  

    h5.textContent = count + 1;  

    var left10Plates = parentDiv.querySelectorAll('.plate-10.left-plate');
    var right10Plates = parentDiv.querySelectorAll('.plate-10.right-plate');

    var left25Plates = parentDiv.querySelectorAll('.plate-25.left-plate');
    var right25Plates = parentDiv.querySelectorAll('.plate-25.right-plate');

    var left35Plates = parentDiv.querySelectorAll('.plate-35.left-plate');
    var right35Plates = parentDiv.querySelectorAll('.plate-35.right-plate');

    var left45Plates = parentDiv.querySelectorAll('.plate-45.left-plate');
    var right45Plates = parentDiv.querySelectorAll('.plate-45.right-plate');

    if (left10Plates.length > 0 && right10Plates.length > 0) {

        parentDiv.insertBefore(newDivLeft, left10Plates[0]);  
        right10Plates[right10Plates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else if (left25Plates.length > 0 && right25Plates.length > 0) {

        parentDiv.insertBefore(newDivLeft, left25Plates[0]);  
        right25Plates[right25Plates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else if (left35Plates.length > 0 && right35Plates.length > 0) {

        parentDiv.insertBefore(newDivLeft, left35Plates[0]);  
        right35Plates[right35Plates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else if (left45Plates.length > 0 && right45Plates.length > 0) {

        parentDiv.insertBefore(newDivLeft, left45Plates[0]);  
        right45Plates[right45Plates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else {

        parentDiv.insertBefore(newDivLeft, bar);  
        bar.insertAdjacentElement('afterend', newDivRight);  
    }

    if (fromBtn === true) {
        updateWeight(10);
    }
}

function rem5(fromBtn = true) {
    const h5 = document.getElementById("h2-5");
    var count = parseInt(h5.textContent) || 0;  

    if (count !== 0) {
        const leftPlates = document.querySelectorAll('.plate-5.left-plate');
        const rightPlates = document.querySelectorAll('.plate-5.right-plate');
  
        leftPlates[0].remove()
        rightPlates[rightPlates.length - 1].remove();

        h5.textContent = count - 1;  

        if (fromBtn === true) {
            updateWeight(-10);
        }
    }
}

function add2_5(fromBtn = true) {
    var newDivLeft = document.createElement('div');
    newDivLeft.classList.add("plate-2-5", "left-plate"); 

    var newDivRight = document.createElement('div');
    newDivRight.classList.add("plate-2-5", "right-plate"); 

    const h2_5 = document.getElementById("h2-2-5");
    var count = parseInt(h2_5.textContent) || 0;  

    h2_5.textContent = count + 1;  

    var left5Plates = parentDiv.querySelectorAll('.plate-5.left-plate');
    var right5Plates = parentDiv.querySelectorAll('.plate-5.right-plate');

    var left10Plates = parentDiv.querySelectorAll('.plate-10.left-plate');
    var right10Plates = parentDiv.querySelectorAll('.plate-10.right-plate');

    var left25Plates = parentDiv.querySelectorAll('.plate-25.left-plate');
    var right25Plates = parentDiv.querySelectorAll('.plate-25.right-plate');

    var left35Plates = parentDiv.querySelectorAll('.plate-35.left-plate');
    var right35Plates = parentDiv.querySelectorAll('.plate-35.right-plate');

    var left45Plates = parentDiv.querySelectorAll('.plate-45.left-plate');
    var right45Plates = parentDiv.querySelectorAll('.plate-45.right-plate');

    if (left5Plates.length > 0 && right5Plates.length > 0) {

        parentDiv.insertBefore(newDivLeft, left5Plates[0]);  
        right5Plates[right5Plates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else if (left10Plates.length > 0 && right10Plates.length > 0) {

        parentDiv.insertBefore(newDivLeft, left10Plates[0]);  
        right10Plates[right10Plates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else if (left25Plates.length > 0 && right25Plates.length > 0) {

        parentDiv.insertBefore(newDivLeft, left25Plates[0]);  
        right25Plates[right25Plates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else if (left35Plates.length > 0 && right35Plates.length > 0) {

        parentDiv.insertBefore(newDivLeft, left35Plates[0]);  
        right35Plates[right35Plates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else if (left45Plates.length > 0 && right45Plates.length > 0) {

        parentDiv.insertBefore(newDivLeft, left45Plates[0]);  
        right45Plates[right45Plates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else {

        parentDiv.insertBefore(newDivLeft, bar);  
        bar.insertAdjacentElement('afterend', newDivRight);  
    }

    if (fromBtn === true) {
        updateWeight(5);
    }
}

function rem2_5(fromBtn = true) {
    const h2_5 = document.getElementById("h2-2-5");
    var count = parseInt(h2_5.textContent) || 0;  

    if (count !== 0) {
        const leftPlates = document.querySelectorAll('.plate-2-5.left-plate');
        const rightPlates = document.querySelectorAll('.plate-2-5.right-plate');
  
        leftPlates[0].remove()
        rightPlates[rightPlates.length - 1].remove();

        h2_5.textContent = count - 1;  

        if (fromBtn === true) {
            updateWeight(-5);
        }
    }
}

function textReturn(event) {
  event.preventDefault();  
  clearPlates();
  
  const weightInput = document.getElementById('weight').value;
  const barWeightInput = document.getElementById('barWeight').value;  
  
  const weightDiv = document.getElementById('form-contain');

  const weight = Number(weightInput);  
  const barWeight = Number(barWeightInput);  

  const existingDiv = document.getElementById('weight-output');
  if (existingDiv) {
    existingDiv.remove();  
  }

  const h45 = document.getElementById("h2-45");
  const h35 = document.getElementById("h2-35");
  const h25 = document.getElementById("h2-25");
  const h10 = document.getElementById("h2-10");
  const h5 = document.getElementById("h2-5");
  const h2_5 = document.getElementById("h2-2-5");

  h45.textContent = 0;
  h35.textContent = 0;
  h25.textContent = 0;
  h10.textContent = 0;
  h5.textContent = 0;
  h2_5.textContent = 0;

  if (isNaN(weight) || isNaN(barWeight)) {
    const weightText = document.createElement('div');  
    weightText.id = 'weight-output';  
    weightText.textContent = 'Please Enter Valid Numbers for Both Weight and Bar Weight';
    weightText.style.marginTop = '20px';
    weightDiv.appendChild(weightText);  

    return;
  }

  if (Number.isInteger(weight) && weight % 5 === 0 && weight >= barWeight) {
    const weightText = document.createElement('div');  
    weightText.id = 'weight-output';  
    weightText.textContent = `Entered weight: ${weight}`;  
    weightText.style.marginTop = '20px';
    weightDiv.appendChild(weightText);  

    var largest = 45;
    var large = 35;
    var medium = 25;
    var small = 10;
    var smaller = 5;
    var smallest = 2.5;

    var noBarWeight = weight - barWeight;
    var sideWeight = noBarWeight / 2;

    var largestNum = Math.floor(sideWeight / largest);
    var sideWeight = sideWeight - largestNum * largest;

    var largeNum = Math.floor(sideWeight / large);
    var sideWeight = sideWeight - largeNum * large;

    var mediumNum = Math.floor(sideWeight / medium);
    var sideWeight = sideWeight - mediumNum * medium;

    var smallNum = Math.floor(sideWeight / small);
    var sideWeight = sideWeight - smallNum * small;

    var smallerNum = Math.floor(sideWeight / smaller);
    var sideWeight = sideWeight - smallerNum * smaller;

    var smallestNum = Math.floor(sideWeight / smallest);
    var sideWeight = sideWeight - smallestNum * smallest;

    for (let i = 0; i < largestNum; i++) {
      add45(false);
    }

    for (let i = 0; i < largeNum; i++) {
      add35(false);
    }

    for (let i = 0; i < mediumNum; i++) {
      add25(false);
    }

    for (let i = 0; i < smallNum; i++) {
      add10(false);
    }

    for (let i = 0; i < smallerNum; i++) {
      add5(false);
    }

    for (let i = 0; i < smallestNum; i++) {
      add2_5(false);
    }

  } else if (weight % 5 !== 0) {
    const weightText = document.createElement('div');  
    weightText.id = 'weight-output';  
    weightText.textContent = 'Weight Must Be a Multiple of 5 (so that plates can be evenly distributed)';
    weightText.style.marginTop = '20px';
    weightDiv.appendChild(weightText);  

  } else if (weight < barWeight) {
    const weightText = document.createElement('div');  
    weightText.id = 'weight-output';  
    weightText.textContent = 'Weight Must be at Least as Heavy as the Bar';
    weightText.style.marginTop = '20px';
    weightDiv.appendChild(weightText);  

  } else {
    const weightText = document.createElement('div');  
    weightText.id = 'weight-output';  
    weightText.textContent = 'Weight Must Be an Integer';
    weightText.style.marginTop = '20px';
    weightDiv.appendChild(weightText);  
  }

  return false;  
}

