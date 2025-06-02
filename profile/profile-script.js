document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const dataForm = document.getElementById('dataForm');
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const userList = document.getElementById('userList');
    const statusMessage = document.getElementById('statusMessage');

    // User data array
    let users = [];
    let currentEditId = null;

    // Sample data
    const exampleUsers = [
        { id: 1, name: "Müller", vorname: "Hans", email: "hans@example.com", telefon: "0123456789" },
        { id: 2, name: "Schmidt", vorname: "Anna", email: "anna@example.com", telefon: "9876543210" }
    ];

    // Initialize with sample data
    users = [...exampleUsers];
    renderUserList();

    // Form submission handler
    dataForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(dataForm);
        const userData = {
            id: currentEditId || Date.now(), // Use existing ID or create new
            name: formData.get('name'),
            vorname: formData.get('vorname'),
            email: formData.get('email'),
            telefon: formData.get('telefon')
        };

        if (currentEditId) {
            // Update existing user
            const index = users.findIndex(user => user.id === currentEditId);
            if (index !== -1) {
                users[index] = userData;
                statusMessage.textContent = `Daten von ${userData.vorname} ${userData.name} wurden aktualisiert.`;
                statusMessage.style.color = "green";
            }
        } else {
            // Add new user
            users.push(userData);
            statusMessage.textContent = `Neuer Benutzer ${userData.vorname} ${userData.name} wurde hinzugefügt.`;
            statusMessage.style.color = "green";
        }

        renderUserList();
        dataForm.reset();
        currentEditId = null;
        saveBtn.textContent = 'Daten speichern';
    });

    // Edit button handler
    editBtn.addEventListener('click', function () {
        const vornameInput = document.getElementById('vorname').value.trim();

        if (!vornameInput) {
            statusMessage.textContent = "Bitte geben Sie einen Vornamen ein";
            statusMessage.style.color = "red";
            return;
        }

        const user = users.find(u => u.vorname.toLowerCase() === vornameInput.toLowerCase());

        if (user) {
            currentEditId = user.id;
            document.getElementById('name').value = user.name;
            document.getElementById('vorname').value = user.vorname;
            document.getElementById('email').value = user.email;
            document.getElementById('telefon').value = user.telefon;
            saveBtn.textContent = 'Änderungen speichern';
            statusMessage.textContent = `Bearbeite Daten von ${user.vorname} ${user.name}`;
            statusMessage.style.color = "blue";
        } else {
            statusMessage.textContent = 'Benutzer nicht gefunden!';
            statusMessage.style.color = "red";
        }
    });

    // Render user list
    function renderUserList() {
        userList.innerHTML = '';

        if (users.length === 0) {
            userList.innerHTML = '<p class="no-users">Keine Benutzer vorhanden.</p>';
            return;
        }

        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.dataset.id = user.id;

            const userLink = document.createElement('a');
            userLink.className = 'user-link';
            userLink.textContent = `${user.vorname} ${user.name}`;
            userLink.addEventListener('click', () => toggleUserDetails(user.id));

            const userDetails = document.createElement('div');
            userDetails.className = 'user-details hidden';
            userDetails.id = `details-${user.id}`;
            userDetails.innerHTML = `
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Telefon:</strong> ${user.telefon}</p>
                <div class="user-actions">
                    <button class="edit-user-btn" onclick="startEditUser(${user.id})">Bearbeiten</button>
                    <button class="delete-user-btn" onclick="deleteUser(${user.id})">Löschen</button>
                </div>
            `;

            userItem.appendChild(userLink);
            userItem.appendChild(userDetails);
            userList.appendChild(userItem);
        });
    }

    // Toggle user details
    function toggleUserDetails(userId) {
        const detailsElement = document.getElementById(`details-${userId}`);
        detailsElement.classList.toggle('hidden');
    }

    // Start editing user (called from the edit button in user details)
    window.startEditUser = function (userId) {
        const user = users.find(u => u.id === userId);

        if (user) {
            currentEditId = user.id;
            document.getElementById('name').value = user.name;
            document.getElementById('vorname').value = user.vorname;
            document.getElementById('email').value = user.email;
            document.getElementById('telefon').value = user.telefon;
            saveBtn.textContent = 'Änderungen speichern';
            statusMessage.textContent = `Bearbeite Daten von ${user.vorname} ${user.name}`;
            statusMessage.style.color = "blue";

            // Scroll to form
            document.querySelector('.div1').scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Delete user
    window.deleteUser = function (userId) {
        if (confirm('Möchten Sie diesen Benutzer wirklich löschen?')) {
            users = users.filter(user => user.id !== userId);
            renderUserList();
            statusMessage.textContent = 'Benutzer wurde gelöscht.';
            statusMessage.style.color = "green";

            // If we were editing this user, reset the form
            if (currentEditId === userId) {
                dataForm.reset();
                currentEditId = null;
                saveBtn.textContent = 'Daten speichern';
            }
        }
    };
});