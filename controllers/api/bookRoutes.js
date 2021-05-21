const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');

// this matches /api/books
router.post('/', withAuth, async (req, res) => {
  console.log("creating...")
  try {
    const newBook = await Book.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
    res.status(200).json(newBook);
    console.log('created')
  } catch (err) {
    console.log('failed')
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const bookData = await Book.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!bookData) {
      res.status(404).json({ message: 'No books 📚 found with this id!'});
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;