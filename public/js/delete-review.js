const deleteReviewHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/reviews/${event.target.dataset.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        alert("Your comment has been deleted!")
        location.reload();
    } else {
        alert('Incorrect user, you cannot delete this comment');
    }

};

const deleteButtons = document
    .querySelectorAll('.delCommentBtn')
deleteButtons.forEach((deletebutton) => {
    deletebutton.addEventListener('click', deleteReviewHandler)

}
);
