// Fetch the JSON data
fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
  .then(response => response.json())
  .then(data => {
    const itemsPerPage = 10; // Number of items per page
    let currentPage = 1;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Create the container div and append it to the body
    const container = document.createElement('div');
    container.classList.add('container', 'mt-5');
    document.body.appendChild(container);

    // Create and append the title h1
    const title = document.createElement('h1');
    title.textContent = 'PAGINATION';
    title.style = 'text-align: center;';
    title.style.paddingBottom="10px";
    title.style.marginTop="0px";
    container.appendChild(title);

    // Create and append the table element (with Bootstrap classes)
    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('table-responsive');
    container.appendChild(tableWrapper);

    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-bordered', 'table-hover');
    tableWrapper.appendChild(table);

    // Create and append the table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['ID', 'Name', 'Email']; // Modify based on your data
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create and append the table body (where data will be populated)
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    // Create and append the pagination container div
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination-container', 'mt-3');
    container.appendChild(paginationContainer);

    // Function to render data items on the page
    function renderItems(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const itemsToDisplay = data.slice(start, end);

        // Clear the previous table body rows
        tbody.innerHTML = '';

        // Render the items for the current page
        itemsToDisplay.forEach(item => {
            const row = document.createElement('tr');
            const tdId = document.createElement('td');
            tdId.textContent = item.id; // Adjust based on your JSON structure
            row.appendChild(tdId);

            const tdName = document.createElement('td');
            tdName.textContent = item.name; // Adjust based on your JSON structure
            row.appendChild(tdName);

            const tdEmail = document.createElement('td');
            tdEmail.textContent = item.email; // Adjust based on your JSON structure
            row.appendChild(tdEmail);

            tbody.appendChild(row);
        });
    }

    // Function to render pagination controls (with Previous and Next)
    function renderPagination(page) {
        paginationContainer.innerHTML = ''; // Clear previous pagination

        const paginationList = document.createElement('ul');
        paginationList.classList.add('pagination', 'justify-content-center');
        paginationContainer.appendChild(paginationList);

        // Previous button
        const prevItem = document.createElement('li');
        prevItem.classList.add('page-item');
        if (page === 1) {
            prevItem.classList.add('disabled');
        }
        const prevLink = document.createElement('a');
        prevLink.classList.add('page-link');
        prevLink.textContent = 'Previous';
        prevLink.addEventListener('click', () => {
            if (page > 1) {
                currentPage--;
                renderItems(currentPage);
                renderPagination(currentPage);
            }
        });
        prevItem.appendChild(prevLink);
        paginationList.appendChild(prevItem);

        // Page number buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            if (i === page) {
                pageItem.classList.add('active');
            }

            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.textContent = i;

            // Add event listener for page click
            pageLink.addEventListener('click', () => {
                currentPage = i;
                renderItems(currentPage);
                renderPagination(currentPage);
            });

            pageItem.appendChild(pageLink);
            paginationList.appendChild(pageItem);
        }

        // Next button
        const nextItem = document.createElement('li');
        nextItem.classList.add('page-item');
        if (page === totalPages) {
            nextItem.classList.add('disabled');
        }
        const nextLink = document.createElement('a');
        nextLink.classList.add('page-link');
        nextLink.textContent = 'Next';
        nextLink.addEventListener('click', () => {
            if (page < totalPages) {
                currentPage++;
                renderItems(currentPage);
                renderPagination(currentPage);
            }
        });
        nextItem.appendChild(nextLink);
        paginationList.appendChild(nextItem);
    }

    // Initialize first page
    renderItems(currentPage);
    renderPagination(currentPage);
  })
  .catch(error => console.error('Error loading data:', error));
