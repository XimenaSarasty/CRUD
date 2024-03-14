import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [product, setProducts] = useState([]);

    useEffect(() => {
        const fecthProducts = async () => {
            try {
                const response = await axios.get('/products');
                console.log(response.data);
                setProducts(response.data);
            } catch (error) {
                console.log('Error in Server', error);
            }
        };

        fecthProducts();

    }, []);
  

  return (
    <div>
      <h2>LIST PRODUCTS</h2>
        <Link to='/products/new'>CREATE NEW PRODUCT</Link>
        <ul>
            {product.map(product => (
                <li key={product.Id}>
                    <strong>{ product.name } - { product.price } - { product.description } \/\/ </strong>
                    <Link to={`/products/${product.Id}/edit`}>EDIT</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ProductList
