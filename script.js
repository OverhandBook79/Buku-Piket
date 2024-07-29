const schedule = {
    'Monday': ['Andy', 'Dika', 'Lucia', 'Sazkya', 'Intan', 'Deswita', 'Velma', 'Fatiya'],
    'Tuesday': ['Rasya', 'Vicky', 'Haura', 'Ajet', 'Novi', 'Keylla', 'Syifa', 'Caca'],
    'Wednesday': ['Ridho', 'Keisya', 'Rain', 'Asti', 'Haiyun', 'Mariyam', 'Vivi', 'Asillah'],
    'Thursday': ['Ahmad', 'Samuel', 'Naysila', 'Virda', 'Kimberly', 'Joan', 'Cinta', 'Siti'],
    'Friday': ['Fiqih', 'Rama', 'Meutia', 'Alya', 'Cia', 'Atikah', 'Niken', 'Ningsih']
};

function generateTable() {
    const tableBody = document.querySelector('#scheduleTable tbody');
    for (let week = 1; week <= 44; week++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${week}</td>`;
        Object.keys(schedule).forEach(day => {
            const cell = document.createElement('td');
            schedule[day].forEach(person => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `${week}-${day}-${person}`;
                checkbox.checked = localStorage.getItem(checkbox.id) === 'true';
                checkbox.addEventListener('change', () => {
                    localStorage.setItem(checkbox.id, checkbox.checked);
                });
                const label = document.createElement('label');
                label.htmlFor = checkbox.id;
                label.textContent = person;
                cell.appendChild(checkbox);
                cell.appendChild(label);
                cell.appendChild(document.createElement('br'));
            });
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    }
}

function exportTasks() {
    const startWeek = parseInt(document.getElementById('startWeek').value);
    const endWeek = parseInt(document.getElementById('endWeek').value);
    const data = [];

    for (let week = startWeek; week <= endWeek; week++) {
        Object.keys(schedule).forEach(day => {
            schedule[day].forEach(person => {
                const checkbox = document.getElementById(`${week}-${day}-${person}`);
                data.push({
                    Week: `Week ${week}`,
                    Day: day,
                    Person: person,
                    Checked: checkbox.checked ? 'Yes' : 'No'
                });
            });
        });
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
    XLSX.writeFile(workbook, 'tasks.xlsx');
}

document.addEventListener('DOMContentLoaded', generateTable);