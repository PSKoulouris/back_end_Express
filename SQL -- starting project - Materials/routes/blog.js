const express = require('express');

const db = require('../database_connection/connection');

const router = express.Router();
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

//redirect the user on / to /posts directly: 
router.get("/", function(req, res) {
    res.redirect("/posts");
});

/*router.get("/posts", async function(req, res) {
    res.render("posts-list");
});*/

////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

//retrieve the data and send information to posts_list.ejs:
router.get("/posts", async function(req, res) {

    const q = `SELECT posts.*, authors.name AS author_name
               FROM posts
               INNER JOIN authors
               ON authors.author_id = posts.author_id`;

    const [posts] = await db.query(q) 
    console.log(posts); 
    res.render("posts-list",{ posts: posts});
});

////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

//routes to create new posts with async from database:
router.get("/new-post", async function(req, res) {

    const q = `SELECT author_id, name
               FROM authors`;

    const [authors] = await db.query(q) //return an array of objects [ { name: 'Vanessa' }, { name: 'Philippe' }, { name: 'Stephane' } ]
    console.log(authors);
    res.render("create-post", { authors: authors }); //define authors with the value authors

});

//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

//routes to create Views for each review by id:
router.get("/posts/:id", async function(req, res) {

    const q = `SELECT posts.*, authors.name AS author_name, authors.email AS author_email
               FROM posts
               INNER JOIN authors
               ON authors.author_id = posts.author_id
               WHERE posts.post_id = ?`;

    const [posts] = await db.query(q, [req.params.id,]) //return an array of objects
    
    if(!posts || posts.length === 0) {
        return res.status(404).render("404");
    }

    const postData = {
        ...posts[0],
        date: posts[0].date.toISOString(),
        humanReadableDate: posts[0].date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    }

    res.render("post-detail", {post: postData});
    
});


////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

//Insert new posts into database blog:
router.post("/new-post", async function(req, res) {
    
    const q = `INSERT INTO posts (title, summary, body, author_id)
               VALUES (?)`;

    const data = [
        req.body.title, 
        req.body.summary, 
        req.body.content, 
        req.body.author
    ];

    await db.query(q,[data,])
         
    res.redirect("/posts");
    
});

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

//Edit the Review (retrive data in valuers and upate them):

router.get("/posts/:id/edit", async function(req, res) {

    const q = `SELECT * FROM posts
               WHERE post_id = ?`;
    
    const [posts] = await db.query(q, [req.params.id]) //return an array of objects
    
    if(!posts || posts.length === 0) {
        return res.status(404).render("404");
    }

    res.render("update-post", {post: posts[0]});
});



router.post("/posts/:id/edit", async function(req, res) {

    const q = `UPDATE posts
               SET title = ?, summary = ?, body = ?
               WHERE post_id = ?`;


    await db.query(q, [req.body.title, 
            req.body.summary, 
            req.body.content, 
            req.params.id
        ]) //return an array of objects

    res.redirect("/posts");
    
});

//Delete restaurant review:
router.post("/posts/:id/delete", async function(req, res) {

    const q = `DELETE FROM posts
               WHERE post_id = ?`;

    await db.query(q, [req.params.id]) //return an array of objects
    
    res.redirect("/posts");
});

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;