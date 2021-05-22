const reviewFormHandle = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#review-content').value.trim();
    const book_id = document.querySelector('#custId').value.trim();
    console.log(book_id)
    if (comment) {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({ comment, book_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log("I've been clicked!")
        location.reload();
      } else {
        alert('Failed to post comment.');
        console.log(comment_text);
      }
    }
  };
  
  document
  .querySelector('.new-review-form')
  .addEventListener('click', reviewFormHandle);