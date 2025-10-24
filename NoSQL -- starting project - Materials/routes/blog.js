const express = require('express');

const mongodb = require('mongodb');
const db = require('../data/database');

const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/posts');
});

//Get data for authors:
router.get("/new-post", async function(req, res) {
  const authors = await db.getDB()
    .collection("authors")
    .find()
    .toArray();

   console.log(authors)

  res.render("create-post", {authors: authors})
});

//Post data for authors:
router.post("/posts", async function(req, res) {
  const authorId = new ObjectId(req.body.author) //install mongoDB package for id:const ObjectId = mongodb.ObjectId;
  const author = await db
    .getDB()
    .collection("authors")
    .findOne({ _id: authorId })

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      authorId: authorId,
      name: author.name,
      email: author.email
    }
  }
  await db.getDB().collection("posts").insertOne(newPost); //alternatively, store result back into a variable
  res.redirect("/posts");
});


  //Get data for posts:
  router.get('/posts', async function(req, res) {
    const posts = await db.getDB()
      .collection("posts")
      .find({},{projection:{title: 1, summary: 1, "author.name": 1}}) //FIND SYNTAX: {},{1=retrieve, 0: don't retrieve}; projection key word to retrieve specific data
      .toArray();

    console.log(posts)
  res.render('posts-list', {posts: posts});
});


//get post for each post_id:
router.get('/posts/:id', async function(req, res) {
  const postId = req.params.id;
  const post = await db.getDB()
    .collection("posts")
    .findOne({ _id: new ObjectId(postId) }, { projection: { summary: 0 } })
  
    if(!post){
      return res.status(404).render('404');
    }

    post.humanReadableDate = post.date.toLocaleDateString('en-US', {
      week: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    post.date = post.date.toISOString();

  console.log(post)
  res.render('post-detail', {post: post});
});

//edit: retrieve and save:

router.get('/posts/:id/edit', async function(req, res) {
  const postId = req.params.id;
  const post = await db.getDB()
    .collection("posts")
    .findOne(
      { _id: new ObjectId(postId) }, 
      { 
        projection: { title:1, summary: 1, body: 1 }
      }
    )
  
    if(!post){
      return res.status(404).render('404');
    }

   res.render("update-post", {post: post});
})

router.post('/posts/:id/edit', async function(req, res) {
  const postId = req.params.id;
  const updatedPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content
  }
  await db.getDB().collection("posts").updateOne(
    { _id: new ObjectId(postId) },
    { $set: {
        title: req.body.title,
        summary: req.body.summary,
        body: req.body.content,
        //date:new Date()
    } 
  }
);

  res.redirect('/posts');

})

//delete post:

router.post('/posts/:id/delete', async function(req, res) {
  const postId = req.params.id;
  await db.getDB().collection("posts").deleteOne({ _id: new ObjectId(postId) });
  res.redirect('/posts');
})




module.exports = router;