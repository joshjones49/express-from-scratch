const bookBTN = document.querySelector('#booksbtn');
const ownerBTN = document.querySelector('#ownerbtn');
const displayDiv = document.querySelector('#display');
const ownerSearch = document.querySelector('#ownerBar');
const bookSearch = document.querySelector('#bookBar');



//GRAB ALL===============================
ownerBTN.addEventListener('click', getOwners);
bookBTN.addEventListener('click', getBooks);
//FUNCTIONS FOR GRAB ALL=========================
function getOwners() {
    $.get('http://localhost:8000/api/owners', (data) => {
        // console.log(data);
        displayOwners(data);
    });
};
function getBooks() {
    $.get('http://localhost:8000/api/books', (data) => {
        // console.log(data);
        displayBooks(data);
    });
};

function displayBooks(array) {
    bookBTN.textContent = 'Refresh'
    bookBTN.addEventListener('click', () => {
        location.reload()
    })

    displayDiv.innerHTML = ''
    array.forEach(obj => {
        //console.log(obj);
        const div = document.createElement('div')
        div.style.height = 'maxContent';
        div.style.width = 'maxContent';
        div.style.display = 'block';
        div.style.border = '3px solid darkslategrey';
        div.style.fontSize = '14px';
        div.style.cursor = 'pointer';
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
};
function displayOwners(array) {
    ownerBTN.textContent = 'Refresh'
    ownerBTN.addEventListener('click', () => {
        location.reload()
    });

    displayDiv.innerHTML = ''
    array.forEach(obj => {
        //console.log(obj);
        const div = document.createElement('div')
        div.style.height = 'maxContent';
        div.style.width = 'maxContent';
        div.style.display = 'block';
        div.style.border = '2px solid black';
        div.style.fontSize = '14px';
        div.style.cursor = 'pointer';
        displayDiv.appendChild(div);

        const id = document.createElement('h1')
        id.textContent = `ID: ${obj.id}`
        div.appendChild(id)

        const fName = document.createElement('h1')
        fName.textContent = `First: ${obj.f_name}`
        div.appendChild(fName)

        const lName = document.createElement('h1')
        lName.textContent = `Last: ${obj.l_name}`
        div.appendChild(lName)

        const age = document.createElement('h1')
        age.textContent = `Age: ${obj.age}`
        div.appendChild(age)

        const email = document.createElement('h1')
        email.textContent = `email: ${obj.email}`
        div.appendChild(email)

        div.addEventListener('click', () => {
            const ownerDiv = document.createElement('div');
            ownerDiv.style.display = 'block';
            ownerDiv.style.height = '600px';
            ownerDiv.style.width = '900px';
            ownerDiv.style.border = '15px solid black';
            ownerDiv.style.position = 'fixed';
            ownerDiv.style.top = '50%'
            ownerDiv.style.left = '50%'
            ownerDiv.style.transform = 'translate(-50%, -50%)';
            ownerDiv.style.backgroundColor = 'white';
            ownerDiv.contentEditable = true;
            ownerDiv.style.zIndex = '9999';
            ownerDiv.style.lineHeight = '1.5'
            ownerDiv.textContent = div.textContent;
            // createDiv(ownerDiv)
            document.body.appendChild(ownerDiv)

            ownerDiv.addEventListener('dblclick', () => {
                ownerDiv.innerHTML = ''
                ownerDiv.style.display = 'none';
            })
        })
    });
};
//GRAB ONE=======================================
ownerSearch.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        grabOwner()
    }
});

bookSearch.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        grabBook()
    }
});
//FUNCTIONS FOR GRAB ONE============================
function grabOwner(ownerID) {
    ownerID = ownerSearch.value;
    $.get(`http://localhost:8000/api/owners/${ownerID}`, (data) => {
        // console.log(data);
        displayDiv.innerHTML = '';

        const ID = document.createElement('h1')
        ID.textContent = `ID: ${data[0].id}`
        displayDiv.appendChild(ID);

        const fName = document.createElement('h1')
        fName.textContent = `First: ${data[0].f_name}`
        displayDiv.appendChild(fName);

        const lName = document.createElement('h1')
        lName.textContent = `Last: ${data[0].l_name}`
        displayDiv.appendChild(lName);

        const age = document.createElement('h1')
        age.textContent = `Age: ${data[0].age}`
        displayDiv.appendChild(age);

        const email = document.createElement('h1')
        email.textContent = `email: ${data[0].email}`
        displayDiv.appendChild(email);
    })
}

function grabBook(bookID) {
    bookID = bookSearch.value;
    $.get(`http://localhost:8000/api/books/${bookID}`, (data) => {
        // console.log(data);
        displayDiv.innerHTML = '';

        const ID = document.createElement('h1')
        ID.textContent = `ID: ${data[0].id}`
        displayDiv.appendChild(ID);

        const name = document.createElement('h1')
        name.textContent = `Name: ${data[0].name}`
        displayDiv.appendChild(name);

        const genre = document.createElement('h1')
        genre.textContent = `Genre: ${data[0].genre}`
        displayDiv.appendChild(genre);

        const year = document.createElement('h1')
        year.textContent = `Year: ${data[0].year_published}`
        displayDiv.appendChild(year);
    })
}