//routes/productRoutes.js
import express from 'express';

const router = express.Router();
//import the data from product.js
import * as productController from '../controllers/productController.js'

//Ruta para obtener todos los productos
router.get('/products', productController.getAllProducts);

//Ruta para obtener un producto
router.get('/product/:id', productController.getProductById);

//Ruta para crear un nuevo producto
router.post('/products', productController.createNewProduct);

//Ruta para actualizar un producto producto existente
router.put('/products/:id', productController.updateProduct);

//Ruta para eliminar un producto existente
router.delete('/products/:id', productController.deleteProduct);

export default router;