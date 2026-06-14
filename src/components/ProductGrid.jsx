import { SearchX } from 'lucide-react';
import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.css';

export function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}><SearchX size={48} strokeWidth={1.5} /></span>
        <h3>Ничего не найдено</h3>
        <p>Попробуйте изменить параметры поиска или фильтры</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
