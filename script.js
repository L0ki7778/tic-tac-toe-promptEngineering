let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

function init() {
    const container = document.getElementById('container');
    renderGameBoard(container, fields);
}

function renderGameBoard(container, fields) {
    let html = '';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const fieldValue = fields[index];
            const cellId = index + 1;

            if (fieldValue === 'cross') {
                html += `<div class="cell" data-row="${i}" data-col="${j}" id="${cellId}">${createAnimatedCrossInnerHTML()}</div>`;
            } else if (fieldValue === 'circle') {
                html += `<div class="cell" data-row="${i}" data-col="${j}" id="${cellId}">${createAnimatedCircleInnerHTML()}</div>`;
            } else {
                html += `<div class="cell" data-row="${i}" data-col="${j}" id="${cellId}">${getFieldValueSymbol(fieldValue)}</div>`;
            }
        }
    }
    container.innerHTML = html;


    // Ersetze das 'O' mit dem animierten Kreis
    const circles = container.querySelectorAll('.cell[data-row][data-col][id] [data-value="circle"]');
    circles.forEach(circle => {
        circle.innerHTML = createAnimatedCircleInnerHTML();
    });

    // Füge die Event-Listener hinzu
    const cells = container.getElementsByClassName('cell');
    Array.from(cells).forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}

function createAnimatedCircleInnerHTML() {
    const circleRadius = 40;
    const circleCircumference = 2 * Math.PI * circleRadius;

    return `
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="${circleRadius}" stroke="#01AFEB" stroke-width="10"
                stroke-dasharray="${circleCircumference} ${circleCircumference}" stroke-dashoffset="${circleCircumference}"
                stroke-linecap="round" fill="none" transform="rotate(-90, 50, 50)">
                <animate attributeName="stroke-dashoffset" dur="1s" from="${circleCircumference}" to="0" fill="freeze"
                    calcMode="spline" keySplines="0.25 0.1 0.25 1" keyTimes="0;1" />
            </circle>
        </svg>
    `;
}


function createAnimatedCrossInnerHTML() {
    return `
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="20" x2="20" y2="20" stroke="#FDC109" stroke-width="20" stroke-linecap="round">
                <animate attributeName="x2" dur="0.5s" values="20;80" fill="freeze" />
                <animate attributeName="y2" dur="0.5s" values="20;80" fill="freeze" />
            </line>
            <line x1="80" y1="20" x2="80" y2="20" stroke="#FDC109" stroke-width="20" stroke-linecap="round">
                <animate attributeName="x2" dur="0.5s" values="80;20" fill="freeze" />
                <animate attributeName="y2" dur="0.5s" values="20;80" fill="freeze" />
            </line>
        </svg>
    `;
}




function getFieldValueSymbol(value) {
    return value === 'cross' ? 'X' : (value === 'circle' ? '<div data-value="circle"></div>' : '');
}

function handleCellClick() {
    const row = parseInt(this.dataset.row);
    const col = parseInt(this.dataset.col);
    const index = row * 3 + col;

    // Überprüfe, ob mehr "circle" oder "cross" im Feldarray vorhanden sind
    const countCircle = fields.filter(value => value === 'circle').length;
    const countCross = fields.filter(value => value === 'cross').length;

    // Entscheide, ob ein "circle" oder "cross" hinzugefügt werden soll
    const newValue = countCircle >= countCross ? 'cross' : 'circle';

    // Aktualisiere das Feldarray und rendere das Spielfeld neu
    fields[index] = newValue;
    renderGameBoard(container, fields);}