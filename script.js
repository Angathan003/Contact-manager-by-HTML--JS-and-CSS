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
    const matchedContacts = existingContacts.filter((contact, index) => {
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
        for (const [index, contact] of matchedContacts.entries()) {
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

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.dataset.index = index;
            ul.appendChild(deleteBtn);

            const changeBtn = document.createElement('button');
            changeBtn.textContent = 'Change';
            changeBtn.className = 'change-btn';
            changeBtn.dataset.index = index;
            ul.appendChild(changeBtn);

            const br = document.createElement('br');
            ul.appendChild(br);
        }
        searchResults.appendChild(ul);
    } else {
        searchResults.textContent = 'No matching contacts found.';
    }
}

// Function to delete a contact from Local Storage
function deleteContact(index) {
    let existingContacts = localStorage.getItem('contacts');
    existingContacts = existingContacts ? JSON.parse(existingContacts) : [];
    if (index >= 0 && index < existingContacts.length) {
        existingContacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(existingContacts));
    }
}

// Function to change a contact in Local Storage
function changeContact(index, newContactData) {
    let existingContacts = localStorage.getItem('contacts');
    existingContacts = existingContacts ? JSON.parse(existingContacts) : [];
    if (index >= 0 && index < existingContacts.length) {
        const oldContactData = existingContacts[index];

        // Ask for previous information to confirm changes
        const isInformationCorrect = confirm(
            `Confirm changes for contact:\n\nPrevious Name: ${oldContactData.name}\nPrevious Phone: ${oldContactData.phone}\nPrevious Email: ${oldContactData.email}\nPrevious Category: ${oldContactData.category}\n\nProceed with changes?`
        );

        if (isInformationCorrect) {
            existingContacts[index] = newContactData;
            localStorage.setItem('contacts', JSON.stringify(existingContacts));

            // Inform the user that the contact has been changed
            console.log('Contact changed successfully.');
        } else {
            // Wrong attempt
            console.log('%cWrong attempt!', 'color: red');
        }
    }
}

// Function to prompt user for previous contact information
function promptPreviousInformation(contact) {
    const name = prompt('Enter previous name:', contact.name);
    const phone = prompt('Enter previous phone:', contact.phone);
    const email = prompt('Enter previous email:', contact.email);
    const category = prompt('Enter previous category:', contact.category);
    return { name, phone, email, category };
}

function addContact(name, phone, email, category) {
    // Validate email format
    if (!email || !email.includes('@')) {
        console.log('Error: Please enter a valid email address.');
        return;
    }
      // Check if the email contains "gmail" without "@"
      if (email.toLowerCase().includes('gmail') && !email.includes('@')) {
        // Highlight the email input box in red
        document.getElementById('email').style.borderColor = 'red';
        console.log('Error: Gmail address must contain "@" symbol.');
        return;
    }
    
    const contactData = {
        name: name.toUpperCase(),
        phone: phone,
        email: email.toLowerCase(),
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


// Event listeners remain the same for adding contacts and searching
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

// Event delegation for delete and change buttons
document.getElementById('searchResults').addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('delete-btn')) {
        const index = parseInt(target.dataset.index);
        deleteContact(index);
        // Re-run the search with the same search term to update the results
        const search_term = document.getElementById('search_term').value;
        searchContacts(search_term);
    } else if (target.classList.contains('change-btn')) {
        const index = parseInt(target.dataset.index);

        // Get new information from the user
        const name = prompt('Enter new name:');
        const phone = prompt('Enter new phone:');
        const email = prompt('Enter new email:');
        const category = prompt('Enter new category:');

        const newContactData = { name, phone, email, category };
        changeContact(index, newContactData);
        // Re-run the search with the same search term to update the results
        const search_term = document.getElementById('search_term').value;
        searchContacts(search_term);
    }
});

// Function to save contacts to a file
function saveContactsToFile() {
    const existingContacts = localStorage.getItem('contacts');
    if (existingContacts) {
        const contactsArray = JSON.parse(existingContacts);
        const contactsString = JSON.stringify(contactsArray, null, 2);
        const blob = new Blob([contactsString], { type: 'application/json' });

        // Create a download link for the file
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contacts.json';
        a.click();

        // Cleanup
        URL.revokeObjectURL(url);
    } else {
        console.log('No contacts to save.');
    }
}

// Event listener to trigger saving contacts to a file
document.getElementById('saveToFileBtn').addEventListener('click', function () {
    saveContactsToFile();
});
