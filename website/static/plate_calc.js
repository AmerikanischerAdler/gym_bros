const bar = document.getElementById("theBar");
const parentDiv = document.getElementById("aniPlate");

function add45() {
    var newDivLeft = document.createElement('div');
    newDivLeft.classList.add("plate-45", "left-plate"); 

    var newDivRight = document.createElement('div');
    newDivRight.classList.add("plate-45", "right-plate"); 

    parentDiv.insertBefore(newDivLeft, bar); 
    bar.insertAdjacentElement('afterend', newDivRight); 
}

function add35() {
    var newDivLeft = document.createElement('div');
    newDivLeft.classList.add("plate-35", "left-plate"); 

    var newDivRight = document.createElement('div');
    newDivRight.classList.add("plate-35", "right-plate"); 

    var leftPlates = parentDiv.querySelectorAll('.plate-45.left-plate');
    var rightPlates = parentDiv.querySelectorAll('.plate-45.right-plate');

    if (leftPlates.length > 0 && rightPlates.length > 0) {

        parentDiv.insertBefore(newDivLeft, leftPlates[0]);  
        rightPlates[rightPlates.length - 1].insertAdjacentElement('afterend', newDivRight);  

    } else {

        parentDiv.insertBefore(newDivLeft, bar);  
        bar.insertAdjacentElement('afterend', newDivRight);  
    }
}

function add25() {
    var newDivLeft = document.createElement('div');
    newDivLeft.classList.add("plate-25", "left-plate"); 

    var newDivRight = document.createElement('div');
    newDivRight.classList.add("plate-25", "right-plate"); 

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
}

function add10() {
    var newDivLeft = document.createElement('div');
    newDivLeft.classList.add("plate-10", "left-plate"); 

    var newDivRight = document.createElement('div');
    newDivRight.classList.add("plate-10", "right-plate"); 

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
}

function add5() {
    var newDivLeft = document.createElement('div');
    newDivLeft.classList.add("plate-5", "left-plate"); 

    var newDivRight = document.createElement('div');
    newDivRight.classList.add("plate-5", "right-plate"); 

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
}

function add2_5() {
    var newDivLeft = document.createElement('div');
    newDivLeft.classList.add("plate-2-5"); 

    var newDivRight = document.createElement('div');
    newDivRight.classList.add("plate-2-5"); 

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
}

