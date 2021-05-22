const bookSearchListEl = document.querySelector('#book-listings')
var searchedBookList =[];
var clicked_id;


const onSearch = async (event) => {
    event.preventDefault();
    const count = 5;
    const userQuery = document.querySelector('#search-form').value.trim();
    var bookSearch = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${userQuery}`)
    bookSearchListEl.innerHTML =''
    var bookList =[];
    

     for(var i = 0; i < count; i++){
        var book = bookSearch.data.items[i]
        console.log(book)
        let bookTitle = book.volumeInfo.title
        let bookDesc = book.volumeInfo.description
        let bookThumb= book.volumeInfo.imageLinks.thumbnail
        var bookDiv = document.createElement('div') 
        bookDiv.classList.add('container-fluid', 'mb-3')
        bookSearchListEl.appendChild(bookDiv)
        bookDiv.innerHTML = '<div class="book-search d-flex flex-row">' + '<div class="col-3 me-2">' + '<img src="' + bookThumb +  'alt='+ bookTitle +'">' +
         '</div>' + '<div class="col-9">' + '<div class= "card-body text-center"' + '<h4 class="card-title">' + '<span class="fw-bold">' + bookTitle + '</span>' + '</h4>'
         + '<p class="card-text">' + bookDesc + '</p>' + '</div>' + '</div>' + '</div>'
        buttonAdd = document.createElement('form')
        buttonAdd.classList.add('add-form'+i, 'd-flex');
        buttonAdd.innerHTML = '<button class="btn btn-outline-dark" id ="' + i + ' " type="submit">+ add this book</button>';
        bookDiv.appendChild(buttonAdd)
        let addBook = document
        .querySelector('.add-form'+i)
        .addEventListener('submit', postFormHandle);
        bookList.push(book);
    
    }
    console.log(searchedBookList)
    searchedBookList = bookList
    console.log(searchedBookList)

    return searchedBookList
}

//need a function that takes in a book and posts that book to the database 
const postFormHandle = async (event) => {
    event.preventDefault();

    buttonId = parseInt(event.submitter.id);
    title = searchedBookList[buttonId].volumeInfo.title;
    author = searchedBookList[buttonId].volumeInfo.authors[0];
    description= searchedBookList[buttonId].volumeInfo.description;
    thumbnail = searchedBookList[buttonId].volumeInfo.imageLinks.thumbnail;

    console.log(title)
    console.log(description)
    console.log(author)
    console.log(thumbnail)

  const response = await fetch('/api/books', {
     method: 'POST',
      body: JSON.stringify({ title, author, description, thumbnail}),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('attempting post...')
    if (response.ok) {
     document.location.replace('/dashboard');
console.log('success!')

   } else {
           document.location.replace('/');
     alert('Failed to log in.');
     console.log('oh no failure');
   }
 };

//write a click event to grab the selected book and save on the database


document
.querySelector('.search-button')
.addEventListener('submit', onSearch);

