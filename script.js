const mainSection = document.querySelector('section');
const bookModal = document.querySelector('.book-modal');
const addBtn = document.getElementById('add-button');
const closeModal = document.getElementById('close-modal');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel');
const cardDelete = document.querySelector('card-delete');

let card = ``;
let myLibrary = [];


// Book Object constructor
function Book(title, author, numOfPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
    this.recordNum = myLibrary.length + 1;
}

// Adds new books from user input
function addBook(addTitle, addAuthor, addPages, addRead){
    const bookInput = new Book(addTitle, addAuthor, addPages, addRead);
    myLibrary.push(bookInput);
    return myLibrary;
}
   


function deleteCard(record) {
    let recordId = record;
    const num = recordId.splice(0, 5);
    myLibrary.splice(num, 1);
    return myLibrary;
}

// Loops through myLibrary[] and creates a new 'div' for each book entry.
function displayList() {    
    const div = document.createElement('div');
    myLibrary.forEach(book => {
        
        div.className = 'card';
        for (let key in book) {
            card = `
            <div class='card-header'>
                <h2>${book.title}</h2>
                <input type='image' src='images/close-circle.svg' name='card-delete' id='card-${book.recordNum}' alt='Close icon'>
            </div>
            <div class='card-body'>
                <h3>Author:${book.author}</h3>
                <h3>Pages:${book.numOfPages}</h3>
                <h3>Read?:${book.haveRead}</h3>
            </div>`;
        }
        div.innerHTML = card;
        
    });  
    mainSection.appendChild(div);
    console.log(myLibrary);
}

function clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
}


addBtn.addEventListener('click', ()=> {
    bookModal.style.display = 'grid';
});

closeModal.addEventListener('click', ()=> {
    bookModal.style.display = 'none';
    clearFields();
});

cancelBtn.addEventListener('click', ()=> {
    bookModal.style.display = 'none';
    clearFields();
});

submitBtn.addEventListener('click', ()=> {
    let addTitle = document.getElementById('title').value;
    let addAuthor = document.getElementById('author').value;
    let numOfPages = document.getElementById('pages').value;
    let haveRead = document.getElementsByName('read').value;

    addBook(addTitle, addAuthor, numOfPages, haveRead);
    displayList();
    bookModal.style.display = 'none';
    clearFields();
});



// console.log(addBook('The Book', 'Lamar', 500, true));
// console.log(addBook('2The Book', 'Lamar', 500, true));
// console.log(addBook('3The Book', 'Lamar', 500, true));
// console.log(addBook('4The Book', 'Lamar', 500, true));
console.log(displayList());

