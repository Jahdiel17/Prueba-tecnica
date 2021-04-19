const express = require('express');
const router =  express.Router();
const productoController = require('../controllers/productoController');

module.exports = function() {

    // Agrega nuevos productos via POST
    router.post('/productos',
        productoController.nuevoProducto
    );

    // Obtiene todos los registros de productos en la BD
    router.get('/productos',
        productoController.obtenerProducto
    );

    // Obtiene un producto en especifico por su ID
    router.get('/productos/:id',
        productoController.obtenerProductos
    );

    // Actualiza un producto 
    router.put('/productos/:id',
        productoController.actualizarProducto
    );

    // Elimina un producto por su id
    router.delete('/productos/:id',
        productoController.eliminarProducto
    );

    return router;
}