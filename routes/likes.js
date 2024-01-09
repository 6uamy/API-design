const express = require('express');
const router = express.Router();
const {addLikes, cancelLikes} = require('../controllers/LikesController');
router.use(express.json());

router
    .route('/:book_id')
    .post(addLikes)
    .delete(cancelLikes);

module.exports = router;
