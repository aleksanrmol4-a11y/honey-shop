import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Check } from 'lucide-react';

import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Badge } from './ui/Badge';
import { StarRating } from './ui/StarRating';
import { WEIGHTS, getBadgeLabel } from '../data/products';
import styles from './ProductCard.module.css';

export function ProductCard({ product, index = 0 }) {
  const [selectedWeight, setSelectedWeight] = useState(WEIGHTS[1]);
  const [added, setAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(product.id);
  const currentPrice = Math.round(product.pricePerKg * selectedWeight.coefficient);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className={styles.card} style={{ animationDelay: `${index * 0.05}s` }}>
      {product.badge && (
        <div className={styles.badge}>
          <Badge variant={product.badge}>{getBadgeLabel(product.badge)}</Badge>
        </div>
      )}

      <button
        className={`${styles.favoriteButton} ${favorite ? styles.favoriteActive : ''}`}
        onClick={() => toggleFavorite(product.id)}
        aria-label={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        <Heart size={20} fill={favorite ? 'currentColor' : 'none'} />
      </button>

      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <div className={styles.imageBox}>
          {!imageLoaded && <div className={styles.imageSkeleton} />}
          <img
            src={product.image}
            alt={product.name}
            className={`${styles.image} ${imageLoaded ? styles.imageVisible : ''}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{product.categoryLabel}</span>
          <StarRating rating={product.rating} size={14} reviewsCount={product.reviewsCount} />
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.weights}>
          {WEIGHTS.map((weight) => (
            <button
              key={weight.value}
              className={`${styles.weight} ${selectedWeight.value === weight.value ? styles.weightActive : ''}`}
              onClick={() => setSelectedWeight(weight)}
            >
              {weight.label}
            </button>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.priceValue}>{currentPrice.toLocaleString('ru-RU')}</span>
            <span className={styles.priceCurrency}> ₽</span>
          </div>
          <button
            className={`${styles.addButton} ${added ? styles.added : ''}`}
            onClick={handleAddToCart}
            aria-label="Добавить в корзину"
          >
            {added ? <Check size={18} /> : <ShoppingCart size={18} />}
            <span>{added ? 'Добавлено' : 'В корзину'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
