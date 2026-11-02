const postModel = require('../models/postModel')

// Retorna a mensagem de erro ou null quando o corpo é válido
function validatePost({ title, content } = {}) {
    if (typeof title !== 'string' || title.trim() === '') return 'O título é obrigatório';
    if (typeof content !== 'string' || content.trim() === '') return 'O conteúdo é obrigatório';
    return null;
}

const postsController = {
    //GET /api/posts
    index: (req, res) => {
        const posts = [...postModel.getAllPosts()].sort((a, b) => b.createdAt - a.createdAt);
        res.json(posts);
    },

    //GET /api/posts/:id
    show: (req, res) => {
        const post = postModel.getPostById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post não encontrado' });
        res.json(post);
    },

    //POST /api/posts
    create: (req, res) => {
        const error = validatePost(req.body);
        if (error) return res.status(400).json({ error });
        const { title, content } = req.body;
        const post = postModel.createPost(title.trim(), content.trim());
        res.status(201).json(post);
    },

    //PUT /api/posts/:id
    update: (req, res) => {
        const id = req.params.id;
        if (!postModel.getPostById(id)) return res.status(404).json({ error: 'Post não encontrado' });
        const error = validatePost(req.body);
        if (error) return res.status(400).json({ error });
        const { title, content } = req.body;
        postModel.updatePost(id, { title: title.trim(), content: content.trim() });
        res.json(postModel.getPostById(id));
    },

    //DELETE /api/posts/:id
    delete: (req, res) => {
        const id = req.params.id;
        if (!postModel.getPostById(id)) return res.status(404).json({ error: 'Post não encontrado' });
        postModel.deletePost(id);
        res.status(204).end();
    },
}

module.exports = postsController
