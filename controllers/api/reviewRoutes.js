const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');

//this matches to the /api/reviews route
router.post('/', withAuth, async (req, res) => {
    try {
        const newReview = await Review.create({
            ...req.body,
            user_id: req.session.user_id,
            book_id: req.body.book_id
        });
        console.log('hi I worked!')
        res.status(200).json(newReview)
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
        console.log(newComment)
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    console.log('here')
    try {
        const reviewData = await Review.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!reviewData) {
            res.status(404).json({ message: 'No review found with that id' });
            return;
        }
        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;