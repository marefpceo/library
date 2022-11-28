const bookModal = document.querySelector('.book-modal');
const addBtn = document.getElementById('add-button');
const closeModal = document.getElementById('close-modal');
const submitBtn = document.getElementById('submit');
const cancelBtn = document.getElementById('cancel');


let myLibrary = [];


// Book Object constructor
function Book(title, author, numOfPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
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
   

// Displays each book
function displayList() {
    myLibrary.forEach(book => {
        for (let key in book) {
            console.log(`${key}: ${book[key]}`);
        }
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