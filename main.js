const bookBTN = document.querySelector('#booksbtn');
const ownerBTN = document.querySelector('#ownerbtn');
const displayDiv = document.querySelector('#display');

ownerBTN.addEventListener('click', getOwners);
bookBTN.addEventListener('click', getBooks);

function getOwners() {
    $.get('http://localhost:8000/api/owners', (data) => {
        console.log(data);
        displayOwners(data);
    });
};
function getBooks() {
    $.get('http://localhost:8000/api/books', (data) => {
        console.log(data);
        displayBooks(data);
    });
};
//======================================================

function displayBooks(array) {
    displayDiv.innerHTML = ''
    array.forEach(obj => {
        //console.log(obj);
        const div = document.createElement('div')
        div.style.height = 'maxContent';
        div.style.width = 'maxContent';
        div.style.display = 'block';
        div.style.border = '3px solid darkslategrey';
        div.style.fontSize = '14px';
        displayDiv.appendChild(div);

        const id = document.createElement('h1')
        id.textContent = `ID: ${obj.id}`
        div.appendChild(id)

        const bookName = document.createElement('h1')
        bookName.textContent = `Book: ${obj.name}`
        div.appendChild(bookName)

        const genre = document.createElement('h1')
        genre.textContent = `Genre: ${obj.genre}`
        div.appendChild(genre)

        const year = document.createElement('h1')
        year.textContent = `Published: ${obj.year_published}`
        div.appendChild(year)

        const ownerID = document.createElement('h1')
        ownerID.textContent = `Owner ID: ${obj.owner_id}`
        div.appendChild(ownerID)
    });
}

function displayOwners(array) {
    displayDiv.innerHTML = ''
    array.forEach(obj => {
        //console.log(obj);
        const div = document.createElement('div')
        div.style.height = 'maxContent';
        div.style.width = 'maxContent';
        div.style.display = 'block';
        div.style.border = '3px solid darkslategrey';
        div.style.fontSize = '14px';
        displayDiv.appendChild(div);

        const id = document.createElement('h1')
        id.textContent = `ID Number: ${obj.id}`
        div.appendChild(id)

        const fName = document.createElement('h1')
        fName.textContent = `First Name: ${obj.f_name}`
        div.appendChild(fName)

        const lName = document.createElement('h1')
        lName.textContent = `Last Name: ${obj.l_name}`
        div.appendChild(lName)

        const age = document.createElement('h1')
        age.textContent = `Age: ${obj.age}`
        div.appendChild(age)

        const email = document.createElement('h1')
        email.textContent = `email: ${obj.email}`
        div.appendChild(email)
    });
}