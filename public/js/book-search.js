const userQuery = document.querySelector('#search-form').value.trim();

console.log(userQuery);

const onSearch = async (event) => {
    event.preventDefault();
    console.log('hi')
    console.log(userQuery);
   var testBook = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${userQuery}`)
// books.search(userquery, function(error, results) {
//     if ( ! error ) {
//         console.log(results);
//     } else {
//         console.log(error);
//     }
// });
console.log(testBook.data.items[0].volumeInfo.title)
}
document
.querySelector('.search-button')
.addEventListener('submit', onSearch);

//need a function that takes in a book and posts that book to the database 
// const response = await fetch('/api/books', {
//     method: 'POST',
//     body: JSON.stringify({ name, email, password }),
//     headers: { 'Content-Type': 'application/json' },
//   });

//write a click event to grab the selected book and save on the database