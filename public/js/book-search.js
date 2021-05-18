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