import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Check, ArrowLeft, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { getProductById, WEIGHTS, getRelatedProducts } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { StarRating } from '../components/ui/StarRating';
import { Button } from '../components/ui/Button';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import styles from './ProductPage.module.css';

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [selectedWeight, setSelectedWeight] = useState(WEIGHTS[1]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container section">
        <h1>Товар не найден</h1>
        <Link to="/catalog">Вернуться в каталог</Link>
      </div>
    );
  }

  const favorite = isFavorite(product.id);
  const currentPrice = Math.round(product.pricePerKg * selectedWeight.coefficient);
  const totalPrice = currentPrice * quantity;
  const relatedProducts = getRelatedProducts(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, quantity);
    navigate('/checkout');
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumbs}>
          <Link to="/">Главная</Link>
          <span>/</span>
          <Link to="/catalog">Каталог</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className={styles.product}>
          <motion.div
            className={styles.gallery}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.image} style={{ backgroundColor: `${product.color}25` }}>
              <span>{product.image}</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className={styles.category}>{product.categoryLabel}</span>
            <h1 className={styles.name}>{product.name}</h1>
            <div className={styles.rating}>
              <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
            </div>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.properties}>
              <div className={styles.property}>
                <span className={styles.propertyLabel}>Вкус</span>
                <span className={styles.propertyValue}>{product.taste}</span>
              </div>
              <div className={styles.property}>
                <span className={styles.propertyLabel}>Аромат</span>
                <span className={styles.propertyValue}>{product.aroma}</span>
              </div>
              <div className={styles.property}>
                <span className={styles.propertyLabel}>Цвет</span>
                <span className={styles.propertyValue}>{product.colorDesc}</span>
              </div>
            </div>

            <div className={styles.weights}>
              <span className={styles.weightsLabel}>Выберите вес:</span>
              <div className={styles.weightsList}>
                {WEIGHTS.map((weight) => (
                  <button
                    key={weight.value}
                    className={`${styles.weight} ${selectedWeight.value === weight.value ? styles.weightActive : ''}`}
                    onClick={() => setSelectedWeight(weight)}
                  >
                    {weight.label}
                    <span className={styles.weightPrice}>
                      {Math.round(product.pricePerKg * weight.coefficient).toLocaleString('ru-RU')} ₽
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.quantity}>
              <span className={styles.quantityLabel}>Количество:</span>
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>

            <div className={styles.priceBlock}>
              <div className={styles.price}>
                <span className={styles.priceValue}>{totalPrice.toLocaleString('ru-RU')}</span>
                <span className={styles.priceCurrency}> ₽</span>
              </div>
              <span className={styles.priceHint}>
                {selectedWeight.label} × {quantity} шт.
              </span>
            </div>

            <div className={styles.actions}>
              <Button
                size="lg"
                onClick={handleAddToCart}
                className={added ? styles.addedButton : ''}
              >
                {added ? <Check size={20} /> : <ShoppingCart size={20} />}
                {added ? 'Добавлено' : 'В корзину'}
              </Button>
              <Button variant="dark" size="lg" onClick={handleBuyNow}>
                Купить сейчас
              </Button>
              <button
                className={`${styles.favoriteButton} ${favorite ? styles.favoriteActive : ''}`}
                onClick={() => toggleFavorite(product.id)}
                aria-label={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
              >
                <Heart size={24} fill={favorite ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className={styles.benefits}>
              {product.benefits.map((benefit, index) => (
                <div key={index} className={styles.benefit}>
                  <Shield size={16} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className={styles.deliveryInfo}>
              <div className={styles.deliveryItem}>
                <Truck size={18} />
                <span>Доставка по городу в день заказа</span>
              </div>
              <div className={styles.deliveryItem}>
                <RotateCcw size={18} />
                <span>Возврат в течение 14 дней</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className={styles.reviewsSection}>
          <h2 className="section-title">Отзывы покупателей</h2>
          <div className={styles.reviewsList}>
            {product.reviews.map((review) => (
              <div key={review.id} className={styles.review}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewAvatar}>{review.avatar || '👤'}</span>
                  <div>
                    <h4>{review.author}</h4>
                    <div className={styles.reviewStars}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < review.rating ? styles.starFilled : styles.starEmpty}
                        />
                      ))}
                    </div>
                  </div>
                  <span className={styles.reviewDate}>{review.date}</span>
                </div>
                <p className={styles.reviewText}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className={styles.related}>
            <h2 className="section-title">Похожие товары</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        )}

        <Link to="/catalog" className={styles.backLink}>
          <ArrowLeft size={18} /> Вернуться в каталог
        </Link>
      </div>
    </div>
  );
}
