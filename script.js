document.getElementById("dataForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const pib = document.getElementById("pib");
  const variant = document.getElementById("variant");
  const group = document.getElementById("group");
  const faculty = document.getElementById("faculty");
  const birth = document.getElementById("birth");
  const output = document.getElementById("output");

  const pibRegex = /^[А-ЯІЇЄҐ][а-яіїєґ']+\s[А-Я]\.\s?[А-Я]\.$/;
  const variantRegex = /^\d{1,2}$/;
  const groupRegex = /^[А-ЯІЇЄҐ]{2}-\d{2}$/;
  const facultyRegex = /^[А-ЯІЇЄҐ]{4}$/;
  const birthRegex = /^\d{2}\.\d{2}\.\d{4}$/;

  const fields = [pib, variant, group, faculty, birth];
  const regexes = [pibRegex, variantRegex, groupRegex, facultyRegex, birthRegex];
  let allValid = true;

  fields.forEach((field, i) => {
    if (!regexes[i].test(field.value.trim())) {
      field.classList.add("error");   
      allValid = false;
    } else {
      field.classList.remove("error");
    }
  });

  if (allValid) {
    output.innerHTML = `
      <p><b>ПІБ:</b> ${pib.value}</p>
      <p><b>Варіант:</b> ${variant.value}</p>
      <p><b>Група:</b> ${group.value}</p>
      <p><b>Факультет:</b> ${faculty.value}</p>
      <p><b>Дата народження:</b> ${birth.value}</p>
    `;
    alert("Дані введено коректно!");

    createTable(parseInt(variant.value, 10));
  } else {
    output.innerHTML = `<p style="color:red;">Будь ласка, перевірте правильність введення даних!</p>`;
  }
});

function createTable(variantNumber) {
  const container = document.getElementById("tableContainer");
  container.innerHTML = ""; 

  const table = document.createElement("table");
  let num = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 6; j++) {
      const cell = document.createElement("td");
      cell.textContent = num;
      row.appendChild(cell);

      const cellNumber = num;
      const colIndex = j;
      const rowIndex = i;

      cell.addEventListener("mouseenter", () => {
        if (cellNumber === variantNumber) {
          cell.style.backgroundColor = getRandomColor();
        }
      });

      cell.addEventListener("click", (evt) => {
        if (cellNumber === variantNumber) {
          const chosenColor = document.getElementById("colorPicker").value;
          cell.style.backgroundColor = chosenColor;
        }
      });

      cell.addEventListener("dblclick", () => {
        const rows = table.rows;
        for (let r = rowIndex; r < rows.length; r += 2) {
          if (rows[r].cells[colIndex]) {
            rows[r].cells[colIndex].style.backgroundColor = getRandomColor();
          }
        }
      });

      num++;
    }
    table.appendChild(row);
  }

  container.appendChild(table);
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}
