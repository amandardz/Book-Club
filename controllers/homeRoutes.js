const router = require('express').Router();
const { Book, User, Review } = require('../models');
const withAuth = require('../utils/auth');

// display all books associated with user but only include the thumbnail, title & author from the books npm package
router.get('/', (req, res) => {

    res.render('homepage');
});

//The book page will include thumbnail, title, author, description, publish date from the books npm package
//The book page will also include reviews
router.get('/bookpage', async (req, res) => {

    res.render('bookpage');
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return
    }
    res.render('signup');
});

module.exports = router;