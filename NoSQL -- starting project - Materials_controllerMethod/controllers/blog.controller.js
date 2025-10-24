const express = require('express');
const mongodb = require('mongodb')

const db = require('../data/database')

const ObjectId = mongodb.ObjectId


function index (req, res) {
  res.redirect('/posts');
}

 async function displayPosts(req, res) {
  const posts = await db.getDb()
  .collection('posts')
  .find() //{},{projection:{ title:1,summary:1, 'author.name':1}}
  .project({title:1,summary:1,'author.name':1}) 
  .toArray()

  console.log(posts[0])

  res.render('posts-list',{posts:posts});
}

async function createForm(req,res){
  const authors = await db.getDb().collection('authors').find().toArray()
  //console.log(authors)
  res.render('create-post',{authors: authors})
}

async function createPost(req,res){
  const authorId =  new ObjectId(req.body.author)
  //console.log(authorId)
  const author = await db
  .getDb()
  .collection('authors')
  .findOne({_id: authorId})
 

  const newPost = {
    title: req.body.title,
    summary:req.body.summary,
    body:req.body.content,
    date: new Date(),
    author:{
      authorId: authorId,
      name: author.name,
      email: author.email
    }
  }

  const result = await db.getDb().collection('posts').insertOne(newPost) // you can store the results back in a variable
  //console.log(result)
  res.redirect('/posts')
}

async function viewPost(req,res){
  const postId = req.params.id

  const post = await db.getDb().collection('posts').findOne({_id: new ObjectId(postId)},{projection:{summary:0}})
  
  if(!post){
    return res.status(404).render('404')
  }

  post.humanReadableDate = post.date.toLocaleDateString('en-US',{
    week: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  post.date = post.date.toISOString()
  
  console.log(post)
  res.render('post-detail',{post: post})
}

async function editPostForm(req,res){
  const postId = req.params.id

  const post = await db.getDb()
  .collection('posts')
  .findOne(
    {_id: new ObjectId(postId)},
    {
      projection:{title:1, summary:1,body:1}
    }
  )
  if(!post){
    return res.status(404).render('404')
  }
  res.render('update-post', {post: post})
}

async function editPost(req,res){
  const postId = req.params.id

  await db.getDb()
  .collection('posts')
  .updateOne(
    {_id: new ObjectId(postId)},
    {
      $set:{
        title: req.body.title,
        summary: req.body.summary,
        body: req.body.content,
        //date: new Date()
      }
    }
  )

  res.redirect('/posts')
}

async function deletePost(req,res){
  const postId = req.params.id

  await db.getDb()
  .collection('posts')
  .deleteOne(
    {_id:new ObjectId(postId)}
  )

  res.redirect('/posts')
}

module.exports = {
  index: index,
  displayPosts : displayPosts,
  createForm:createForm,
  createPost: createPost,
  viewPost:viewPost,
  editPostForm:editPostForm,
  editPost:editPost,
  deletePost:deletePost
}