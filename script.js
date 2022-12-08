const mainSection = document.querySelector('section');
const bookModal = document.querySelector('.book-modal');
const addBtn = document.getElementById('add-button');
const closeModal = document.getElementById('close-modal');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel');
const readToggleBtn = document.getElementsByClassName('.read-toggle-btn');
const cardIndex = document.getElementById('indexNumber');

let recordStart = 0;
let card = ``;
// let myLibrary = [{
//     title: 'The Hobbit',
//     author: 'J.R.R. Tolkien',
//     numOfPages: 295,
//     haveRead: 'Yes',
//     recordNum: 'card-1',
// }];

let myLibrary = [];

// Displays the preloaded record
window.onload = displayList();

// Book Object constructor
function Book(title, author, numOfPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
}

// Creates a record number for each book created
Book.prototype.recordNum = function() {
    return recordStart++;
};

Book.prototype.toggleReadStatus = function(readStatus) {
    if(readStatus === 'Yes') {
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
    bookInput.recordNum = bookInput.recordNum();
    myLibrary.push(bookInput);
    displayList();
}

// Add event listener to section element with bubbling. Uses condition statement to filter
// elements so that click event hander only responds when the toggle button and delete button 
// are clicked
mainSection.addEventListener('click', function(event) {  
    let recordId = '';
    let num = '';

    if(!event.target.matches('.book-card') && !event.target.matches('.read-toggle-btn')) return;
    if(event.target.matches('.read-toggle-btn')) {
        const bookCard = event.target.closest('div.card');
        const cardHead = bookCard.querySelector('.card-header');
        const headInput = cardHead.querySelector('.book-card').id;
        recordId = headInput.slice(5);
        let currentRecord = myLibrary[recordId];
        let readStatus = currentRecord.haveRead;
        currentRecord.toggleReadStatus(readStatus);
        console.log(myLibrary[recordId]);
        console.log(headInput);
        console.log(readStatus);
    } else{
        const cardId = event.target.id;
        const child = document.getElementById(cardId);
        const parent = child.closest('div.card');  
        recordId = cardId.slice(5);
        num = myLibrary.map(object => object.recordNum === recordId);
        myLibrary.splice(num, 1);
        parent.remove();
    }
});
   

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
            <div class='card-footer'>
                <button class='read-toggle-btn'>Read Status</button>
            </div>`;
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