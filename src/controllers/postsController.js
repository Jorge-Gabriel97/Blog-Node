const postModel = require('../models/postModel')

const postsController = {
    //Get /
    index: (req, res) => {
        const posts = postModel.getAllPosts();
    res.render('index', { posts });
    },
    //Get /posts/:id
    show: (req, res) => {
        const id = req.params.id;
        const post = postModel.getPostById(id);
        if (!post) return res.status(404).send('Post não encontrado');
        res.render('post', { post });
    },
}

module.exports = postsController