const onermBox = document.getElementById("onerm");
const maxBox = document.getElementById("max");
const repsBox = document.getElementById("count");
const measure = document.getElementById("measure");

const calcOnerm = () => {
    let max = parseFloat(maxBox.value) || 0;
    let reps = parseInt(repsBox.value) || 0;

    // convert to kg 
    if (measure.value === "lbs") {
        max *= 0.45359237;

        const onerm = (max * (1 + (0.025 * reps))) / 0.45359237;
        onermBox.value = onerm ? onerm.toFixed(2) : ""; 
    } else {
        const onerm = max * (1 + (0.025 * reps));
        onermBox.value = onerm ? onerm.toFixed(2) : ""; 
    }

};

maxBox.addEventListener("input", calcOnerm);
repsBox.addEventListener("input", calcOnerm);
measure.addEventListener("change", calcOnerm);

