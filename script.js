const mainSection = document.querySelector('section');
const bookModal = document.querySelector('.book-modal');
const addBtn = document.getElementById('add-button');
const closeModal = document.getElementById('close-modal');
const submitBtn = document.getElementById('submit');
const cancelBtn = document.getElementById('cancel');

let card = ``;
const myLibrary = [];


// Book Object constructor
function Book(title, author, numOfPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
    this.recordNum = myLibrary.length + 1;
    // this.bookInfo = function () {
    //     return `${title} by ${author}, ${numOfPages} pages, ${haveRead}`;
    // } 
}

// Adds new books from user input
function addBook(addTitle, addAuthor, addPages, addRead){
    const bookInput = new Book(addTitle, addAuthor, addPages, addRead);
    myLibrary.push(bookInput);
    return myLibrary;
}
   

// Loops through myLibrary[] and creates a new 'div' for each book entry.
function displayList() {    
    myLibrary.forEach(book => {
        const div = document.createElement('div');
        div.className = 'card';
        for (let key in book) {
            card = `
            <div class='card-header'>
                <h2>${book.title}</h2>
                <input type='image' src='images/close-circle.svg' alt='Close icon'>
            </div>
            <div class='card-body'>
                <h3>Author:${book.author}</h3>
                <h3>Pages:${book.numOfPages}</h3>
                <h3>Read?:${book.haveRead}</h3>
            </div>`;
        }
        div.innerHTML = card;
        mainSection.appendChild(div);
    });  
}


addBtn.addEventListener('click', ()=> {
    bookModal.style.display = 'grid';
});

closeModal.addEventListener('click', ()=> {
    bookModal.style.display = 'none';
});

cancelBtn.addEventListener('click', ()=> {
    bookModal.style.display = 'none';
});


console.log(addBook('The Book', 'Lamar', 500, true));
console.log(addBook('2The Book', 'Lamar', 500, true));
console.log(addBook('3The Book', 'Lamar', 500, true));
console.log(addBook('4The Book', 'Lamar', 500, true));
console.log(displayList());

