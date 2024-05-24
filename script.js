document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableBody');
    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');
    const sortAZ = document.getElementById('sortAZ');
    const sortZA = document.getElementById('sortZA');
    const sortMarks = document.getElementById('sortMarks');
    const sortPassing = document.getElementById('sortPassing');
    const sortClass = document.getElementById('sortClass');
    const sortGender = document.getElementById('sortGender');

    const renderTable = (data) => {
        tableBody.innerHTML = '';
        data.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td><img src="${student.img_src}" alt="${student.first_name} ${student.last_name}"></td>
                <td>${student.first_name} ${student.last_name}</td>
                <td>${student.email}</td>
                <td>${student.marks}</td>
                <td>${student.passing ? 'Passing' : 'Failed'}</td>
                <td>${student.class}</td>
                <td>${student.gender}</td>
            `;
            tableBody.appendChild(row);
        });
    };

    const filterData = (query) => {
        return students.filter(student => 
            student.first_name.toLowerCase().includes(query.toLowerCase()) ||
            student.last_name.toLowerCase().includes(query.toLowerCase()) ||
            student.email.toLowerCase().includes(query.toLowerCase())
        );
    };

    const sortData = (data, key, ascending = true) => {
        return data.sort((a, b) => {
            if (a[key] < b[key]) return ascending ? -1 : 1;
            if (a[key] > b[key]) return ascending ? 1 : -1;
            return 0;
        });
    };

    const sortByName = (data, ascending = true) => {
        return data.sort((a, b) => {
            const nameA = `${a.first_name} ${a.last_name}`;
            const nameB = `${b.first_name} ${b.last_name}`;
            if (nameA < nameB) return ascending ? -1 : 1;
            if (nameA > nameB) return ascending ? 1 : -1;
            return 0;
        });
    };

    const handleSearch = () => {
        const query = searchBar.value;
        const filteredData = filterData(query);
        renderTable(filteredData);
    };

    searchButton.addEventListener('click', handleSearch);

    // Example sorting event listeners
    sortAZ.addEventListener('click', () => {
        const sortedData = sortByName(students, true);
        renderTable(sortedData);
    });

    sortZA.addEventListener('click', () => {
        const sortedData = sortByName(students, false);
        renderTable(sortedData);
    });

    sortMarks.addEventListener('click', () => {
        const sortedData = sortData(students, 'marks', true);
        renderTable(sortedData);
    });

    sortPassing.addEventListener('click', () => {
        const sortedData = sortData(students, 'passing', true);
        renderTable(sortedData);
    });

    sortClass.addEventListener('click', () => {
        const sortedData = sortData(students, 'class', true);
        renderTable(sortedData);
    });

    sortGender.addEventListener('click', () => {
        const sortedData = sortData(students, 'gender', true);
        renderTable(sortedData);
    });

    // Initial rendering of the table
    renderTable(students);
});