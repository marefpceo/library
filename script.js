const mainSection = document.querySelector("section");
const bookModal = document.querySelector(".book-modal");
const addBtn = document.getElementById("add-button");
const closeModal = document.getElementById("close-modal");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel");
const myLibrary = [];

let recordStart = -1;
let card = "";

// Loops through myLibrary[] and creates a new 'div' for each book entry.
function displayList() {
  const div = document.createElement("div");
  myLibrary.forEach((book) => {
    div.className = "card";
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
    div.innerHTML = card;
  });
  mainSection.insertBefore(div, bookModal);
}

// Displays the preloaded record
window.onload = displayList();

// Book Class
class Book {
  constructor (title, author, numOfPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
  }

  get readStatus() {
    return this.haveRead;
  }
  
  static recordNum() {
    recordStart += 1;
    return recordStart;
  }

  toggleReadStatus(readStatus) {
    this.haveRead = readStatus === 'Yes' ? ('No') : ('Yes');
    return this.haveRead;
  }
}

// Adds new books from user input
function addBook(addTitle, addAuthor, addPages, addRead) {
  // const bookInput = Object.create(Book.prototype);
  const bookInput = new Book();
  bookInput.title = addTitle;
  bookInput.author = addAuthor;
  bookInput.numOfPages = addPages;
  bookInput.haveRead = addRead;
  bookInput.recordNum = Book.recordNum();
  myLibrary.push(bookInput);
  displayList();
}

// Add event listener to section element with bubbling. Uses condition statement to filter
// elements so that click event hander only responds when the toggle button and delete button
// are clicked
mainSection.addEventListener("click", (event) => {
  let recordId = "";
  let num = "";

  if (
    !event.target.matches(".book-card") &&
    !event.target.matches(".read-toggle-btn")
  )
    return;
  if (event.target.matches(".read-toggle-btn")) {
    const bookCard = event.target.closest("div.card");
    const cardHead = bookCard.querySelector(".card-header");
    const headInput = cardHead.querySelector(".book-card").id;
    const cardBody = bookCard.querySelector(".card-body");
    
    recordId = headInput.slice(5);
    const index = myLibrary.map(e => e.recordNum).indexOf(Number(recordId));
    // Adjust nth-child if more categories are added or if element is moved
    const readDisplay = cardBody.querySelector("h3:nth-child(3) > pre");
    const currentRecord = myLibrary[index];
    const readStatus = currentRecord.haveRead;

    currentRecord.toggleReadStatus(readStatus);
    readDisplay.innerHTML = `<pre>Read?:     ${currentRecord.haveRead}</pre>`;
  } else {
    const cardId = event.target.id;
    const child = document.getElementById(cardId);
    const parent = child.closest("div.card");
    recordId = cardId.slice(5);
    num = myLibrary.map(e => e.recordNum).indexOf(Number(recordId));
    myLibrary.splice(num, 1);
    parent.remove();
  }
});

function clearFields() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("haveNotRead").checked = true;
}

// Displays the add book modal
addBtn.addEventListener("click", () => {
  bookModal.style.display = "grid";
});

// Closes the add book modal
closeModal.addEventListener("click", () => {
  bookModal.style.display = "none";
  clearFields();
});

// Cancels the current entry, clears all fields and closes the add book modal
cancelBtn.addEventListener("click", () => {
  bookModal.style.display = "none";
  clearFields();
});

// Submits data input by the user to add a new book
submitBtn.addEventListener("click", () => {
  const addTitle = document.getElementById("title").value;
  const addAuthor = document.getElementById("author").value;
  const numOfPages = document.getElementById("pages").value;
  const haveRead = document.getElementById("haveRead").checked ? "Yes" : "No";

  addBook(addTitle, addAuthor, numOfPages, haveRead);
  bookModal.style.display = "none";
  clearFields();
  console.log(myLibrary);
});
