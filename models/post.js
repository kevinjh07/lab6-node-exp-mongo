const mongoose = require("mongoose");

// definição do esquema
const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  conteudo: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  status: {
    type: String, // criado, publicado
    required: true,
  },
  dataDeCriacao: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dataDeModificacao: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// configurando o esquema no banco
module.exports = mongoose.model("Post", postSchema);
