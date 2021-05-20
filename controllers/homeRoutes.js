const router = require('express').Router();
const { Book, User, Review } = require('../models');
const withAuth = require('../utils/auth');

// display all books associated with user but only include the thumbnail, title & author from the books npm package
router.get('/', async (req, res) => {
    try{
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

        res.render('homepage', {
           books,
           logged_in: req.session.logged_in
        });
    } catch(err) {
        console.error(err)
        res.status(500).send('Blew up')
    }
});


router.get('/dashboard', async(req, res) => {
    res.render('dashboard')
})

router.get('/dashboard/book/:id', async(req, res) => {
    res.render('bookinfo')
})
//The book page will include thumbnail, title, author, description, publish date from the books npm package
//The book page will also include reviews
router.get('/booksearch', async (req, res) => {
    try {
        const bookData = await Book.findByPk(req.params.id, {
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

        res.render('booksearch');
    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/bookinfo', withAuth, async (req, res) => {
    try {
        const bookData = await Book.findAll({
            include: [
                 {
                    model: Review,
                    attributes: [
                        'comment',
                        'user_id'
                    ]
                }, {
                    model: User,
                    attributes: ['name'],
                }
            ],
        });

        const books = bookData.map((book) => book.get({ plain: true }));
        res.render('bookinfo', {
            books,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return
    }
    res.render('signup');
});

module.exports = router;