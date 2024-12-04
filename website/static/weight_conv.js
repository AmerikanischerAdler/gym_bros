const result = document.getElementById("onerm");
const weight = document.getElementById("weight");
const measure = document.getElementById("measure");
var text = document.getElementById("weight-type");

const convert = () => {
    let weightVal = parseFloat(weight.value) || 0;

    if (measure.value === "lbs") {
        text.textContent = "Kilograms (kg)";
        weightVal *= 0.45359237;

        result.value = weightVal ? weightVal.toFixed(2) : ""; 
    } else {
        text.textContent = "Pounds (lbs)";
        weightVal = weightVal / 0.45359237;

        result.value = weightVal ? weightVal.toFixed(2) : ""; 
    }
};

weight.addEventListener("input", convert);
measure.addEventListener("change", convert);

