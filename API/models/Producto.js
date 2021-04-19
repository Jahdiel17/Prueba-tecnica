const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
    },
    descripcion: {
        type: String,
        trim: true,
    },
    precio: {
        type: String,
        trim: true,
    },
    cantidad: {
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model('Producto', productosSchema);