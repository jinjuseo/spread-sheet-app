const makeTable = (row, col) => {
  const tableElement = document.createElement("table");
  tableElement.appendChild(makeThead(col + 1));
  tableElement.appendChild(makeTbody(row, col + 1));

  tableElement.classList.add("table");
  tableElement.id = "tableData";
  const bodyElement = document.querySelector("main");
  bodyElement.appendChild(tableElement);
};

const makeThead = (col) => {
  let text = "A";
  const thElement = document.createElement("thead");
  const trElement = document.createElement("tr");
  for (let i = 0; i < col; i++) {
    const tdElement = document.createElement("td");
    tdElement.id = `0,${i}`;
    trElement.appendChild(tdElement);
    if (i === 0) continue;
    tdElement.innerText = text;
    text = String.fromCharCode(text.charCodeAt(0) + 1);
  }
  thElement.appendChild(trElement);
  return thElement;
};

const makeTbody = (row, col) => {
  const tbElement = document.createElement("tbody");
  for (let i = 0; i < row; i++) {
    const trElement = document.createElement("tr");
    for (let j = 0; j < col; j++) {
      const tdElement = document.createElement("td");
      tdElement.id = `${i + 1},${j}`;
      trElement.appendChild(tdElement);
      if (j !== 0) continue;
      tdElement.innerText = i + 1;
    }
    tbElement.appendChild(trElement);
  }
  return tbElement;
};
const getPosition = (id) => {
  const [row, col] = id.split(",");
  return { row, col };
};

const addActive = (id) => {
  console.log(id);
  const { row, col } = getPosition(id);
  const colTh = document.getElementById(`${row},0`);
  const rowTh = document.getElementById(`0,${col}`);
  rowTh.classList.add("active");
  colTh.classList.add("active");
};
const removeActive = (id) => {
  const { row, col } = getPosition(id);
  const colTh = document.getElementById(`${row},0`);
  const rowTh = document.getElementById(`0,${col}`);
  rowTh.classList.remove("active");
  colTh.classList.remove("active");
};

const printCell = (cell) => {
  const cellAddress = document.getElementById("address");
  cellAddress.innerText = `${getAddress(cell.id)}`;
};

const getAddress = (id) => {
  const [row, col] = id.split(",");
  const colChar = document.getElementById(`0,${col}`).innerText;
  const rowChar = document.getElementById(`${row},0`).innerText;
  return `${colChar}${rowChar}`;
};

export { makeTable, addActive, removeActive, getPosition, printCell };
