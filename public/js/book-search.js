const bookSearchListEl = document.querySelector('#book-listings')


const onSearch = async (event) => {
    event.preventDefault();
    const count = 5;
    const userQuery = document.querySelector('#search-form').value.trim();
    var bookSearch = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${userQuery}`)
    bookSearchListEl.innerHTML =''

     for(var i = 0; i < count; i++){
        var book = bookSearch.data.items[i]
        let bookTitle = book.volumeInfo.title
        let bookDesc= book.searchInfo.textSnippet
        let bookThumb= book.volumeInfo.imageLinks.thumbnail
        var bookDiv = document.createElement('div') 
        bookDiv.classList.add('card', 'mb-3')
        bookSearchListEl.appendChild(bookDiv)
        bookDiv.innerHTML = '<div class="row g-0">' + '<div class="col-6">' + '<img src="' + bookThumb +  'alt='+ bookTitle +'">' +
         '</div>' + '<div class="col-6">' + '<div class= "card-body text-center"' + 
         '<h6></h6>' + '<h4 class="card-title">' + bookTitle + '</h4>'
         + '<p class="card-text">' + bookDesc + '</p>' + '</div>' + '</div>' + '</div>'
        buttonAdd = document.createElement('form')
        buttonAdd.classList.add('add-form' + i, 'd-flex');
        buttonAdd.innerHTML = '<button class="btn btn-outline-dark" type="submit">+ add this book</button>';
        bookSearchListEl.appendChild(buttonAdd)
        let addButton = document.querySelector('.add-form' + i).addEventListener('submit', postFormHandle);

    }


}



//need a function that takes in a book and posts that book to the database 
const postFormHandle = async (event) => {
    // event.preventDefault();
    console.log("I" + event +" have been clicked!")
//  const response = await fetch('/api/books', {
//     method: 'POST',
//      body: JSON.stringify({ name, email, password }),
//      headers: { 'Content-Type': 'application/json' },
//    });

   if (response.ok) {
    document.location.replace('/');
    console.log("I" + event +" have been clicked!")

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

