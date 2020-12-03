const express = require("express");

const router = express.Router();

const Post = require("../models/post");

// GET all
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();

    return res.send(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET by ID
router.get("/:id", getPost, async (req, res) => {
  res.json(res.post);
});

// GET by ID
router.get("/userid/:userId", async (req, res) => {
  const post = await Post.findOne({ 'userId': req.params.userId });

  if (post == null) {
    return res.status(404).send();
  }

  return res.json(post);
});

// POST create
router.post("/", async (req, res) => {
  const post = new Post({
    userId: req.body.userId,
    conteudo: req.body.conteudo,
    name: req.body.name,
    foto: req.body.foto,
    status: req.body.status,
    dataDeCriacao: req.body.dataDeCriacao,
    dataDeModificacao: req.body.dataDeModificacao,
  });

  try {
    const created = await post.save();

    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update
router.put("/:id", getPost, async (req, res) => {
  res.post.conteudo = req.body.conteudo;
  res.post.name = req.body.name;
  res.post.foto = req.body.foto;
  res.post.status = req.body.status;
  res.post.dataDeModificacao = Date.now();

  try {
    await res.post.save();
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE remove
router.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.remove();

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware
async function getPost(req, res, next) {
  try {
    post = await Post.findById(req.params.id);

    if (post == null) {
      return res.status(404).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.post = post;

  next();
}

// export
module.exports = router;
