import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Package, ArrowRight, ShoppingCart, ShoppingBasket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products, WEIGHTS } from '../data/products';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { Button } from '../components/ui/Button';
import styles from './CartPage.module.css';

const FREE_SHIPPING_THRESHOLD = 2000;
const SHIPPING_COST = 250;

export function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = totalPrice + shipping;
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);

  const cartItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const weight = WEIGHTS.find((w) => w.value === item.weightValue);
    return { ...item, product, weight };
  });

  if (items.length === 0) {
    return (
      <div className={`container ${styles.empty}`}>
        <div className={styles.emptyIcon}><ShoppingBasket size={56} strokeWidth={1.5} /></div>
        <h1 className="section-title">Корзина пуста</h1>
        <p className={styles.emptyText}>Добавьте вкусный мёд из нашего каталога</p>
        <Link to="/catalog">
          <Button size="lg">Перейти в каталог</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className="page-title">Корзина</h1>
        <p className={styles.subtitle}>{items.length} позиций на сумму {totalPrice.toLocaleString('ru-RU')} ₽</p>

        <div className={styles.layout}>
          <div className={styles.items}>
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={`${item.productId}-${item.weightValue}`}
                  className={styles.item}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link
                    to={`/product/${item.product.id}`}
                    className={styles.itemImage}
                    style={{ backgroundColor: `${item.product.color}20` }}
                  >
                    <img src={item.product.image} alt={item.product.name} />
                  </Link>

                  <div className={styles.itemInfo}>
                    <Link to={`/product/${item.product.id}`}>
                      <h3 className={styles.itemName}>{item.product.name}</h3>
                    </Link>
                    <p className={styles.itemWeight}>{item.weight.label}</p>
                    <p className={styles.itemPricePerUnit}>
                      {Math.round(item.priceAtAdd).toLocaleString('ru-RU')} ₽ за шт.
                    </p>
                  </div>

                  <QuantitySelector
                    value={item.quantity}
                    onChange={(value) => updateQuantity(item.productId, item.weightValue, value)}
                    size="sm"
                  />

                  <div className={styles.itemTotal}>
                    {(item.priceAtAdd * item.quantity).toLocaleString('ru-RU')} ₽
                  </div>

                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.productId, item.weightValue)}
                    aria-label="Удалить из корзины"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {remainingForFree > 0 && (
              <div className={styles.freeShipping}>
                <Package size={20} />
                <span>
                  До бесплатной доставки осталось{' '}
                  <strong>{remainingForFree.toLocaleString('ru-RU')} ₽</strong>
                </span>
              </div>
            )}
          </div>

          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Итого</h2>

            <div className={styles.summaryRow}>
              <span>Товары ({items.reduce((sum, i) => sum + i.quantity, 0)} шт.)</span>
              <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Доставка</span>
              <span className={shipping === 0 ? styles.free : ''}>
                {shipping === 0 ? 'Бесплатно' : `${shipping.toLocaleString('ru-RU')} ₽`}
              </span>
            </div>

            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>К оплате</span>
              <span>{total.toLocaleString('ru-RU')} ₽</span>
            </div>

            <Button size="lg" fullWidth onClick={() => navigate('/checkout')}>
              Оформить заказ <ArrowRight size={18} />
            </Button>

            <Link to="/catalog" className={styles.continueShopping}>
              <ShoppingCart size={16} /> Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
