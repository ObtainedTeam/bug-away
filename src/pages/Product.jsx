import { useParams } from 'react-router-dom';
import { products } from '../data';
import ProductClothing from './ProductClothing';
import ProductSimple from './ProductSimple';

// Dispatcher. Kledingproducten (met kleuren en maten) gaan naar de bestaande
// ProductClothing-pagina, losse accessoires (simple: true, geen varianten) naar
// de simpelere ProductSimple-pagina. useParams is hier de enige hook, dus bij
// het wisselen tussen producttypes speelt er geen rules-of-hooks-probleem.
export default function Product({ onCartOpen }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  if (product && product.simple) return <ProductSimple onCartOpen={onCartOpen} />;
  return <ProductClothing onCartOpen={onCartOpen} />;
}
