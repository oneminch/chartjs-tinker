import { Chart } from "chart.js";

let ctx,
  cnvs,
  list,
  values = [],
  colors = [],
  labels = [];

const createChart = document.querySelector(".createChart");
const createNewInput = document.querySelector(".createNewInput");
const inputs = document.querySelector(".inputs");

// Fill initial input fields with random values
let j = 1;
const inputList = document.querySelectorAll("label");
inputList.forEach(el => {
  el.children[0].value = `Label ${j}`;
  el.children[1].value = Math.floor(Math.random() * 250);
  j++;
});

// Generate RGB color components
const genRGB = () => {
  let rgb = [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)
  ];
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
};

// Create new input fields
createNewInput.addEventListener("click", () => {
  let lbl = document.createElement("label");
  for (let i = 0; i < 2; i++) {
    var input = document.createElement("input");
    input.required = true;
    if (i === 1) {
      input.min = 0;
      input.type = "number";
      input.placeholder = "Value";
      input.value = Math.floor(Math.random() * 250);
    } else {
      input.placeholder = "Label";
      input.type = "text";
      input.value = `Label ${j}`;
      j++;
    }
    lbl.appendChild(input);
  }
  inputs.appendChild(lbl);
});

// Create the chart from inputs
createChart.addEventListener("click", () => {
  if (document.querySelector("#chart") !== null) {
    document
      .querySelector("#chart")
      .parentElement.removeChild(document.querySelector("#chart"));
  }
  cnvs = document.createElement("canvas");
  cnvs.setAttribute("id", "chart");
  document.body.insertBefore(cnvs, document.body.lastChild);
  ctx = document.querySelector("#chart").getContext("2d");

  values = [];
  colors = [];
  labels = [];
  list = document.querySelectorAll("label");
  list.forEach(el => {
    labels.push(el.children[0].value);
    values.push(el.children[1].value);
    colors.push(genRGB());
  });

  let data = {
    datasets: [
      {
        data: [...values],
        backgroundColor: [...colors]
      }
    ],

    labels: [...labels]
  };

  new Chart(ctx, {
    type: "doughnut",
    data: data
  });
});
