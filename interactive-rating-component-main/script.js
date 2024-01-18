const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const rating = formData.get('rating');
    if (rating) {
        form.reset();
        showRating(rating);
    }
});

function showRating(rating) {
    const thankYouBox = document.querySelector('.thank-you');
    const selectedRating = document.querySelector('#selected-rating');
    selectedRating.textContent = rating;
    thankYouBox.classList.remove('invisible');
    form.classList.add('invisible');

    // setTimeout(() => {
    //     thankYouBox.classList.add('invisible');
    //     form.classList.remove('invisible');
    // }, 5000);
}