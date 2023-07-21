// Function to add a contact to Local Storage
function saveContactToLocalStorage(contactData) {
    // Retrieve existing contacts from Local Storage (if any)
    let existingContacts = localStorage.getItem('contacts');
    existingContacts = existingContacts ? JSON.parse(existingContacts) : [];

    // Add the new contact to the existing contacts array
    existingContacts.push(contactData);

    // Save the updated contacts array back to Local Storage
    localStorage.setItem('contacts', JSON.stringify(existingContacts));
}

// Function to retrieve contacts from Local Storage and search for matches
function searchContacts(search_term) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Clear previous search results

    // Retrieve contacts from Local Storage
    let existingContacts = localStorage.getItem('contacts');
    existingContacts = existingContacts ? JSON.parse(existingContacts) : [];

    // Filter the contacts array based on the search term
    const matchedContacts = existingContacts.filter(contact => {
        // For simplicity, we'll perform a case-insensitive search on name, phone, and email fields
        const searchValue = search_term.toLowerCase();
        return (
            contact.name.toLowerCase().includes(searchValue) ||
            contact.phone.toLowerCase().includes(searchValue) ||
            contact.email.toLowerCase().includes(searchValue)
        );
    });

    // Display search results
    if (matchedContacts.length > 0) {
        const ul = document.createElement('ul');
        for (const contact of matchedContacts) {
            const liName = document.createElement('li');
            liName.textContent = 'Name: ' + contact.name;
            ul.appendChild(liName);

            const liPhone = document.createElement('li');
            liPhone.textContent = 'Phone: ' + contact.phone;
            ul.appendChild(liPhone);

            const liEmail = document.createElement('li');
            liEmail.textContent = 'Email: ' + contact.email;
            ul.appendChild(liEmail);

            const liCategory = document.createElement('li');
            liCategory.textContent = 'Category: ' + contact.category;
            ul.appendChild(liCategory);

            const br = document.createElement('br');
            ul.appendChild(br);
        }
        searchResults.appendChild(ul);
    } else {
        searchResults.textContent = 'No matching contacts found.';
    }
}

// Modify the addContact function to save contact to Local Storage
function addContact(name, phone, email, category) {
    const contactData = {
        name: name,
        phone: phone,
        email: email,
        category: category
    };

    // Save the contact to Local Storage
    saveContactToLocalStorage(contactData);

    // After adding the contact, you can optionally update the UI or clear the form
    // For example, clear the form fields after adding a contact
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('category').value = '';

    // Inform the user that the contact has been added
    console.log('Contact added successfully.');
}

// Event listeners remain the same
document.getElementById('addContactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const category = document.getElementById('category').value;

    addContact(name, phone, email, category);
});

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const search_term = document.getElementById('search_term').value;
    searchContacts(search_term);
});
