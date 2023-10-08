function concatenateString(text, maxLength) {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength).toUpperCase()}...`;
    }
    return text;
}

function createTableCells(rowAmount, cellsAmount) {
    const table = document.getElementById("table");

    // Generate rows with their respective cells
    Array.from({ length: rowAmount }).forEach(() => {
        const row = document.createElement("tr");
        Array.from({ length: cellsAmount }).forEach(() => {
            const cell = document.createElement("td");
            cell.innerText = 'new cell';
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
}

createTableCells(3, 5);

class Book {
    constructor(title, authors, numberOfPages, isRead = false, isFavorite = false) {
        this.title = title;
        this.authors = authors;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
        this.isFavorite = isFavorite;
    }

    markAsRead() {
        this.isRead = true;
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
    }
}

class Bookshelf {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        this.updateBookCount();
    }

    removeBook(book) {
        this.books = this.books.filter(b => b.title !== book.title);
        this.updateBookCount();
    }

    getUnreadBooks() {
        return this.books.filter(b => !b.isRead);
    }

    getFavBooks() {
        return this.books.filter(b => b.isFavorite);
    }

    // Updates the displayed number of books in the bookshelf
    updateBookCount() {
        const number = document.getElementById("num-books");
        number.textContent = this.books.length;
    }
}

function renderBooks() {
    const bookshelfDiv = document.getElementById("container");
    bookshelfDiv.innerHTML = "";

    bookshelf.books.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.className = "book-card";

        const displayedTitle = concatenateString(book.title, 20);

        const textDiv = document.createElement("div");
        textDiv.className = "text";
        textDiv.innerHTML = `
            <h3>${displayedTitle}</h3>
            <p><b>Authors:</b> ${book.authors}</p>
            <p><b>Pages:</b> ${book.numberOfPages}</p>
            <p><b>Read:</b> ${book.isRead ? 'Yes' : 'No'}</p>
            <p><b>Favorite:</b> ${book.isFavorite ? 'Yes' : 'No'}</p>
        `;

        bookDiv.append(textDiv);
        bookDiv.appendChild(createButtonsForBook(book));

        bookshelfDiv.appendChild(bookDiv);
    });
}

function createButtonsForBook(book) {
    const butDiv = document.createElement("div");
    butDiv.className = "buttons";

    const favButton = createButton("toggle favorite", "b-fav", () => {
        book.toggleFavorite();
        renderBooks();
    });

    const readButton = createButton("toggle read", "b-read", () => {
        book.markAsRead();
        renderBooks();
    });

    const removeButton = createButton("remove from bookshelf", "b-remove", () => {
        bookshelf.removeBook(book);
        renderBooks();
    });

    butDiv.append(favButton, readButton, removeButton);
    return butDiv;
}

function createButton(text, className, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.addEventListener("click", onClick);
    return button;
}

function showAlert(message) {
    alert(message);
}

document.getElementById('unread').addEventListener('click', () => {
    showAlert(`You have ${bookshelf.getUnreadBooks().length} unread book(s)`);
});

document.getElementById('favorite').addEventListener('click', () => {
    showAlert(`You have ${bookshelf.getFavBooks().length} favorite book(s)`);
});

const bookshelf = new Bookshelf();

bookshelf.addBook(new Book('The Lean Startup', 'Eric Ries', 336, true, true));
bookshelf.addBook(new Book('Good to Great', 'Jim Collins', 320));
bookshelf.addBook(new Book('The Innovator\'s Prescription', 'Clayton M. Christensen, Jerome H. Grossman, Jason Hwang', 496, true));
bookshelf.addBook(new Book('The Health Gap', 'Michael Marmot', 400));

// Initial render
renderBooks();

// Handle form submission
document.getElementById('myform').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capture form data
    const title = document.getElementById('title').value.trim();
    const authors = document.getElementById('authors').value.trim();
    const pages = document.getElementById('pages').value.trim();

    if (!title || !authors || !pages) {
        alert('All fields are required!');
        return;  // Exit the function early if any field is empty
    }

    const newBook = new Book(title, authors, pages);

    bookshelf.addBook(newBook);

    renderBooks();

    document.getElementById('title').value = '';
    document.getElementById('authors').value = '';
    document.getElementById('pages').value = '';
});