document.addEventListener('DOMContentLoaded', () => {
    const signUpDiv = document.getElementById('sign-up-div');
    const tableDiv = document.getElementById('table-div');
    const signUpForm = document.getElementById('sign-up-form');
    const detailsTable = document.getElementById('details-table').querySelector('tbody');
    const addAnotherButton = document.getElementById('add-another');
    const finalSubmitButton = document.getElementById('final-submit');

    let signUpData = [];

    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(signUpForm);
        const fileInput = document.getElementById('image-file');
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const imageData = e.target.result;
            const newEntry = {
                salutation_displayed: formData.get('salutation_displayed'),
                candidate_name: formData.get('candidate_name'),
                gender_displayed: formData.get('gender_displayed'),
                type_displayed: formData.get('type_displayed'),
                candidate_date_of_birth: formData.get('candidate_date_of_birth'),
                candidate_email: formData.get('candidate_email'),
                parent_name: formData.get('parent_name'),
                contact_no: formData.get('contact_no'),
                id_prooftype: formData.get('id_prooftype'),
                prooftype_number: formData.get('prooftype_number'),
                alt_contact_name: formData.get('alt_contact_name'),
                alt_contact_number: formData.get('alt_contact_number'),
                bloodgroup_displayed: formData.get('bloodgroup_displayed'),
                ailment_displayed: formData.get('ailment_displayed'),
                correspondance_address: formData.get('correspondance_address'),
                image: imageData
            };

            signUpData.push(newEntry);
            updateTable();
            signUpForm.reset();
            signUpDiv.style.display = 'none';
            tableDiv.style.display = 'block';
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });

    addAnotherButton.addEventListener('click', () => {
        signUpDiv.style.display = 'block';
        tableDiv.style.display = 'none';
    });

    finalSubmitButton.addEventListener('click', () => {
        const jsonData = JSON.stringify(signUpData);
        console.log('JSON Data submitted to backend:', jsonData);

        // Send the JSON data to the backend using fetch or any other method
        // fetch('/submit', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: jsonData
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error('Error:', error));
    });

    function updateTable() {
        detailsTable.innerHTML = '';
        signUpData.forEach((entry, index) => {
            const row = document.createElement('tr');
            const imageCell = document.createElement('td');
            const imageElement = document.createElement('img');
            imageElement.src = entry.image;
            imageElement.style.width = '100px'; // Adjust width as needed
            imageCell.appendChild(imageElement);
            row.appendChild(imageCell);
            row.innerHTML += `
                <td>${entry.candidate_name}</td>
                <td>${entry.contact_no}</td>
                <td><button class="remove-button" data-index="${index}">Remove</button></td>
            `;
            detailsTable.appendChild(row);
        });

        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                signUpData.splice(index, 1);
                updateTable();
            });
        });
    }
});
