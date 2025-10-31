const express = require('express');

const blogController = require('../controllers/blog.controller')


const router = express.Router();

router.get('/', blogController.index);

router.get('/posts',blogController.displayPosts);

router.get('/new-post', blogController.createForm)

router.post('/posts', blogController.createPost)

router.get('/posts/:id', blogController.viewPost)

router.get('/posts/:id/edit', blogController.editPostForm )

router.post('/posts/:id/edit', blogController.editPost)


router.post('/posts/:id/delete',blogController.deletePost )

module.exports = router;