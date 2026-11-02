const postModel = require('../models/postModel')

const adminController = {
    //GET /admin
    index: (req, res) => {
        const posts = postModel.getAllPosts()
        res.render('admin', { posts });
    },

    //GET /admin/create
    create: (req, res) => {
        res.render('new', { action: '/admin/create' });
    },

    //POST /admin/create
    save: (req, res) => {
        const { title, content } = req.body;
        postModel.createPost(title, content);
        res.redirect('/admin');
    },

    //GET /admin/edit/:id
    edit: (req, res) => {
        const id = req.params.id;
        const post = postModel.getPostById(id);
        if (!post) return res.status(404).send('Post não encontrado');
        res.render('edit', { post });
    },

    //POST /admin/edit/:id
    update: (req, res) => {
        const id = req.params.id;
        const post = postModel.getPostById(id);
        if (!post) return res.status(404).send('Post não encontrado');
        const { title, content } = req.body;
        postModel.updatePost(id, { title, content });
        res.redirect('/admin');
    },

    //POST /admin/delete/:id
    delete: (req, res) => {
        const id = req.params.id;
        const post = postModel.getPostById(id);
        if (!post) return res.status(404).send('Post não encontrado');
        postModel.deletePost(id);
        res.redirect('/admin');
    },
}

module.exports = adminController;
