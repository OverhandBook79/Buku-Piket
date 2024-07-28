const schedule = {
    'Senin': ['Andy', 'Dika', 'Lucia', 'Sazkya', 'Intan', 'Deswita', 'Velma', 'Fatiya'],
    'Selasa': ['Rasya', 'Vicky', 'Haura', 'Ajet', 'Novi', 'Keylla', 'Syifa', 'Caca'],
    'Rabu': ['Ridho', 'Keisya', 'Rain', 'Asti', 'Haiyun', 'Mariyam', 'Vivi', 'Asillah'],
    'Kamis': ['Ahmad', 'Samuel', 'Naysila', 'Virda', 'Kimberly', 'Joan', 'Cinta', 'Siti'],
    'Jumat': ['Fiqih', 'Rama', 'Meutia', 'Alya', 'Pathrecia', 'Atikah', 'Niken', 'Ningsih']
};

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateTable() {
    const tableBody = document.querySelector('#scheduleTable tbody');

    const row = document.createElement('tr');
    Object.keys(schedule).forEach(day => {
        const cell = document.createElement('td');
        schedule[day].forEach(person => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `1-${day}-${person}`;
            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = capitalize(person);
            cell.appendChild(checkbox);
            cell.appendChild(label);
            cell.appendChild(document.createElement('br'));

            // Load saved state
            const savedState = localStorage.getItem(checkbox.id);
            if (savedState === 'true') {
                checkbox.checked = true;
            }

            // Save state on change
            checkbox.addEventListener('change', () => {
                localStorage.setItem(checkbox.id, checkbox.checked);
            });
        });
        row.appendChild(cell);
    });
    tableBody.appendChild(row);
}

function exportWeek(week) {
    const workbook = XLSX.utils.book_new();
    const sheetData = [['Person', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']];

    const allPersons = new Set();
    Object.keys(schedule).forEach(day => {
        schedule[day].forEach(person => allPersons.add(person));
    });

    allPersons.forEach(person => {
        const row = [capitalize(person)];
        Object.keys(schedule).forEach(day => {
            const checkbox = document.getElementById(`${week}-${day}-${person}`);
            row.push(checkbox ? (checkbox.checked ? 'Yes' : 'No') : '');
        });
        sheetData.push(row);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, );
    XLSX.writeFile(workbook, `REKAPAN-PIKET-MINGGU-INI.xlsx`);
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
}

function toggleView() {
    document.body.classList.toggle('mobile-mode');
    document.body.classList.toggle('desktop-mode');
}

document.addEventListener('DOMContentLoaded', generateTable);
document.getElementById('toggleTheme').addEventListener('click', toggleTheme);
document.getElementById('toggleView').addEventListener('click', toggleView);