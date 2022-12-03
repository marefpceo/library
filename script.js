const mainSection = document.querySelector('section');
const bookModal = document.querySelector('.book-modal');
const addBtn = document.getElementById('add-button');
const closeModal = document.getElementById('close-modal');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel');
// const readToggleBtn = document.getElementsByClassName('.read-toggle-btn');

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
    this.recordNum = myLibrary.length + 1;
}

Book.prototype.toggleReadStatus = function() {
    if(this.haveRead === 'Yes') {
        return this.haveRead = 'No';
    }else {
        return this.haveRead = 'Yes';
    }
}

// Adds new books from user input
function addBook(addTitle, addAuthor, addPages, addRead){
    const bookInput = Object.create(Book.prototype);
    bookInput.title = addTitle;
    bookInput.author = addAuthor;
    bookInput.numOfPages = addPages;
    bookInput.haveRead = addRead;
    myLibrary.push(bookInput);
    displayList();
}


// Add event listener to section element 
mainSection.addEventListener('click', function(event) {
    

    if(!event.target.matches('.book-card') && !event.target.matches('.read-toggle-btn')) return;
    const cardId = event.target.id;
    const child = document.getElementById(cardId);

    if(event.target.matches('.read-toggle-btn')) {
        
        console.log;
    } else{
        const parent = child.closest('div.card');    
        deleteCard(cardId);
        parent.remove();
    }
});
   
// Deletes the selected book object from the arrary
function deleteCard(record) {
    let recordId = record;
    let num = recordId.slice(5);
    myLibrary.splice((num-1), 1);
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
                <input type='image' src='images/close-circle.svg' class='book-card' id='card-${book.recordNum}' alt='Close icon'>
            </div>
            <div class='card-body'>
                <h3><pre>Author:    ${book.author}</pre></h3>
                <h3><pre>Pages:     ${book.numOfPages}</pre></h3>
                <h3><pre>Read?:     ${book.haveRead}</pre></h3>
            </div>
            <input type='hidden' id='indexNumber' name='indexNumber' value=${book.recordNum}>
            <button class='read-toggle-btn'>Read Status</button>`;
        }
        div.innerHTML = card;
    });  
    mainSection.insertBefore(div, bookModal);
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

// readToggleBtn.addEventListener('click', ()=> {
    
// });