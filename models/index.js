const User = require('./user');
const Book = require('./Book');
const Review = require('./Review')

Book.hasMany(Review, {
  foreignKey: 'book_id',
});

Review.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Book.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

User.hasMany(Review, {
    foreignKey: 'user_id'
});

module.exports = { 
    User, 
    Book,
    Review
 };
