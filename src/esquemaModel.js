const mongoose = require('mongoose')

// Definir el esquema y el modelo de Mongoose
const esquemaModel = new mongoose.Schema({
 id: Number,
 nombre: String,
 importe: Number,
 categoria: String
})
const Componente = mongoose.model('Componente', esquemaModel)

module.exports = Componente
