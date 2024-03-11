//controller/productController.js
//para no tener que importar uno a uno, se importa todo
import * as productModel from '../models/productModel.js';

//Obtener todos los productos
//getAll
export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getProducts();
        console.log(products)
        res.status(201).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

//Obtener un producto por su Id
//getById
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.getProductById(productId);
        if(product){
            res.status(201).json(product)
        }else{
            res.status(404).json({ message: 'Producto no existe' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

//Agregar un nuevo producto
//create
export const createNewProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        if(!name || !price || !description){
            res.status(400).json({ message: 'Faltan datos' })
        }
        const productId = await productModel.createProduct({ name, price, description });
        res.status(201).json({ id: name, price, description });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Actualizar un nuevo producto existente
//update
export  const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, description } = req.body;
        // await productModel.updateProduct(productId, req.body);
        await productModel.updateProduct(productId, { name, price, description });
        res.status(200).json({ message : 'Producto actualizado correctamente' });        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

//Eliminar un producto existente
//delete
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await productModel.deleteProduct(productId);
        res.status(200).json({ message : 'Producto eliminado correctamente' });      
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};