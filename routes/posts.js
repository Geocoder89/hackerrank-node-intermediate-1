const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

router.post('/',postsController.createPost)
router.get('/',postsController.getAllPosts)
router.get('/:id',postsController.getPostById)
router.delete('/:id',postsController.deletePost)
router.patch('/:id',postsController.patchPost)
router.put('/:id',postsController.putPost)

module.exports = router;
