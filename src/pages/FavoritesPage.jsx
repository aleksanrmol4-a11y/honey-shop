import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import styles from './FavoritesPage.module.css';

export function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-tag">Избранное</span>
          <h1 className="page-title">Сохранённые товары</h1>
          <p className={styles.subtitle}>
            {favoriteProducts.length > 0
              ? `${favoriteProducts.length} товаров в избранном`
              : 'Сохраняйте понравившиеся сорта мёда'}
          </p>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className={styles.empty}>
            <Heart size={64} className={styles.emptyIcon} />
            <h2 className="section-title">В избранном пока пусто</h2>
            <p className={styles.emptyText}>
              Нажмите на сердечко на карточке товара, чтобы сохранить его сюда
            </p>
            <Link to="/catalog">
              <Button size="lg">Перейти в каталог</Button>
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {favoriteProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
