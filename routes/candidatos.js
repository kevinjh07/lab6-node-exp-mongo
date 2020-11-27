const express = require("express");

const router = express.Router();

const Candidato = require("../models/candidato");

// GET all
router.get("/", async (req, res) => {
  try {
    const candidatos = await Candidato.find();

    if (!candidatos || candidatos.length === 0) {
        return res.status(204).send();
    }

    return res.send(candidatos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET by ID
router.get("/:id", getCandidato, async (req, res) => {
  res.json(res.candidato);
});

// POST create
router.post("/", async (req, res) => {
  const candidato = new Candidato({
    nome: req.body.nome,
    partido: req.body.partido,
    numero: req.body.numero,
    votos: req.body.votos,
    status: req.body.status,
    criadoEm: req.body.criadoEm,
    atualizadoEm: req.body.atualizadoEm
  });

  try {
    const created = await candidato.save();

    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update
router.patch("/:id", getCandidato, async (req, res) => {
  if (req.body.nome != null) {
    res.candidato.nome = req.body.nome;
  }

  if (req.body.partido != null) {
    res.candidato.partido = req.body.partido;
  }

  try {
    const updated = await res.candidato.save();

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE remove
router.delete("/:id", getCandidato, async (req, res) => {
  try {
    await res.candidato.remove();

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware
async function getCandidato(req, res, next) {
  try {
    candidato = await Candidato.findById(req.params.id);

    if (candidato == null) {
      return res.status(404).send();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.candidato = candidato;

  next();
}

// export
module.exports = router;
