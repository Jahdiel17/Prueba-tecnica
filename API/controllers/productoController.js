const Producto = require('../models/Producto');

// Crea un nuevo producto
exports.nuevoProducto = async (req, res, next) => {

    // crear objeto de productos con datos del req.body
    const producto = new Producto(req.body);

    try {
        await producto.save();
        res.json({ mensaje : 'El producto se agrego correctamente' });
    } catch (error) {
        console.log(error);
        next();
    }
}

// Obtiene los productos
exports.obtenerProducto = async (req, res, next) => {
    try {
        const productos = await Producto.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Obtiene los productos por su id
exports.obtenerProductos = async (req, res, next) => {
    try {
        const producto = await Producto.findById(req.params.id);
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Actualiza un producto
exports.actualizarProducto = async (req, res, next) => {
    try {
        const producto = await Producto.findOneAndUpdate({_id : req.params.id}, req.body, {
            new: true
        });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Elimina un producto
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Producto.findOneAndDelete({_id: req.params.id});
        res.json({mensaje: 'El paciente fue eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}