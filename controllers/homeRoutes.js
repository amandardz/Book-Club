const router = require('express').Router();
const { Book, User, Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

        res.render('homepage', {
            logged_in: req.session.logged_in
        });
});

//This route will pull info from the books database; display the book info & the number of reviews
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const bookData = await Book.findAll({
            include: [
                {
                    model: Review,
                    attributes: [
                        'comment',
                        'user_id'
                    ]
                }, 
            ],
        });

        const books = bookData.map((book) => book.get({ plain: true }));
        res.render('dashboard', {
            books,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//This will display the thumbnail, title, author, description, publish date, and the full reviews 
router.get('/dashboard/book/:id', withAuth, async (req, res) => {
    try {
        const bookData = await Book.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['id', 'title', 'author', 'description',  'user_id', 'thumbnail'],
            include: [
                {
                    model: Review,
                    include: [{
                        model: User,
                        attributes: ['name']
                    }]
                }
            ],
        });

        const books = bookData.get({ plain: true });
        const reviews = books.reviews
        
        res.render('bookinfo', {
            books,
            reviews,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/booksearch', withAuth, async (req, res) => {

    res.render('booksearch', {
        logged_in: req.session.logged_in
    });

});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return
    }
    res.render('login');
});

router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return
    }
    res.render('homepage');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return
    }
    res.render('signup');
});

module.exports = router;