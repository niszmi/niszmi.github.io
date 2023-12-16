function csvToVerticalTable(csvString) {
    const rows = csvString.split("\n");
    let headers = [];
    let values = [];

    for (let row of rows) {
        const cells = row.split(",");
        if (cells.length === 2) {
            headers.push(cells[0].trim());
            values.push(cells[1].trim());
        }
    }

    let html = "<h2>Table 1</h2><table>";
    for (let i = 0; i < headers.length; i++) {
        html += `<tr><td>${headers[i]}</td><td>${values[i]}</td></tr>`;
    }
    html += "</table>";
    return html;
}

function performCalculations(data) {
    const A5 = parseInt(data[4].Value, 10);
    const A20 = parseInt(data[19].Value, 10);
    const A15 = parseInt(data[14].Value, 10);
    const A7 = parseInt(data[6].Value, 10);
    const A13 = parseInt(data[12].Value, 10);
    const A12 = parseInt(data[11].Value, 10);

    const Alpha = A5 + A20;
    const Beta = Math.floor(A15 / A7); // Integer division
    const Charlie = A13 * A12;

    return [Alpha, Beta, Charlie];
}

function displayCalculatedTable(calculations) {
    let html = "<h2>Table 2</h2><table><tr><th>Alpha</th><th>Beta</th><th>Charlie</th></tr>";
    html += `<tr><td>${calculations[0]}</td><td>${calculations[1]}</td><td>${calculations[2]}</td></tr>`;
    html += "</table>";
    return html;
}

fetch('Table_Input.csv')
    .then(response => response.text())
    .then(text => {
        const verticalTableHtml = csvToVerticalTable(text);
        document.getElementById('table-container').innerHTML = verticalTableHtml;

        const rows = text.split("\n").slice(1); // Skip header row
        const data = rows.map(row => {
            const [index, value] = row.split(",");
            return { Index: index, Value: parseInt(value, 10) };
        });

        const calculations = performCalculations(data);
        const calculatedTableHtml = displayCalculatedTable(calculations);
        document.getElementById('table-container').innerHTML += calculatedTableHtml;
    });
