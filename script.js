const mainSection = document.querySelector('section');
const bookModal = document.querySelector('.book-modal');
const addBtn = document.getElementById('add-button');
const closeModal = document.getElementById('close-modal');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel');

let card = ``;
let myLibrary = [{
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    numOfPages: 295,
    haveRead: 'Yes',
    recordNum: 'card-1',
}];

window.onload = displayList();

// Book Object constructor
function Book(title, author, numOfPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
    this.recordNum = 'card-' + (myLibrary.length + 1);
}

// Adds new books from user input
function addBook(addTitle, addAuthor, addPages, addRead){
    const bookInput = new Book(addTitle, addAuthor, addPages, addRead);
    console.log(bookInput);
    myLibrary.push(bookInput);
    displayList();
}

// Add event listener to section element 
mainSection.addEventListener('click', function(event) {
    if(!event.target.matches('.book-card')) return;
    const cardId = event.target.id;
    const child = document.getElementById(cardId);
    const parent = child.closest('div.card');
    deleteCard(cardId);
    parent.remove();
    console.log(cardId);
});
   
// Deletes the selected book object from the arrary
function deleteCard(record) {
    let recordId = record;
    let num = recordId.slice(5);
    myLibrary.splice((num-1), 1);
    console.log(myLibrary);
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
                <input type='image' src='images/close-circle.svg' class='book-card' id='${book.recordNum}' alt='Close icon'>
            </div>
            <div class='card-body'>
                <h3><pre>Author:    ${book.author}</pre></h3>
                <h3><pre>Pages:     ${book.numOfPages}</pre></h3>
                <h3><pre>Read?:     ${book.haveRead}</pre></h3>
            </div>`;
        }
        div.innerHTML = card;
    });  
    mainSection.insertBefore(div, bookModal);
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
    let haveRead = document.getElementById('haveRead').checked ? 'Yes' : 'No';

    addBook(addTitle, addAuthor, numOfPages, haveRead);
    bookModal.style.display = 'none';
    clearFields();
});