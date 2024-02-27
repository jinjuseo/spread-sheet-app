import { exportExcel } from "./excelModules.js";
import {
  makeTable,
  addActive,
  removeActive,
  printCell,
  //   getPosition,
} from "./makeTable.js";

const setOnClickEvent = () => {
  const cells = document.querySelectorAll("tbody td:not(:nth-child(1))");
  cells.forEach((cellElement) => {
    cellElement.addEventListener("click", (e) => {
      addActive(e.target.id);
      const inputElement = createInputElement(cellElement);
      cellElement.innerText = "";
      cellElement.append(inputElement);
      inputElement.focus();
      printCell(cellElement);
    });
  });
};

const setData = () => {
  setOnClickEvent();
  if (localStorage.getItem("excel-data") !== null) {
    const excel_data = localStorage.getItem("excel-data");
    const table_data = JSON.parse(excel_data);
    data = table_data;
    setCells();
    console.log(data);
  }
};

const setCells = () => {
  data.forEach((cell) => {
    const tdElement = document.getElementById(cell.id);
    tdElement.innerText = cell.value;
  });
};

const createInputElement = (cellElement) => {
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.value = cellElement.innerText;
  inputElement.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  inputElement.addEventListener("focusout", (e) => {
    removeActive(e.target.parentElement.id);

    const cell = {
      id: e.target.parentElement.id,
      value: e.target.value,
    };
    data = data.filter((d) => d.id != cell.id);
    cellElement.innerText = `${cell.value}`;
    if (cell.value !== "") data.push(cell);
    localStorage.setItem("excel-data", JSON.stringify(data));
    console.log(data);
  });
  return inputElement;
};

let data = [];

makeTable(9, 9);

document.onload = setData();
document.getElementById("export-btn").addEventListener("click", (e) => {
  exportExcel();
});
