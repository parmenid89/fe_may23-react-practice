import { Product } from '../Product/product';

export const ProductList = ({ products }) => (
  products.map(product => (
    <Product product={product} />
  ))
);
