import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Truck, CreditCard, User, MapPin, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { products, WEIGHTS } from '../data/products';
import { Button } from '../components/ui/Button';
import styles from './CheckoutPage.module.css';

const SHIPPING_COST = 250;
const FREE_SHIPPING_THRESHOLD = 2000;

const steps = [
  { id: 'contacts', label: 'Контакты', icon: User },
  { id: 'delivery', label: 'Доставка', icon: MapPin },
  { id: 'payment', label: 'Оплата', icon: CreditCard },
];

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, updateUser, addOrder } = useUser();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    email: user.email || '',
    city: '',
    address: '',
    comment: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = totalPrice + shipping;

  const cartItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const weight = WEIGHTS.find((w) => w.value === item.weightValue);
    return { ...item, product, weight };
  });

  if (items.length === 0) {
    return (
      <div className={`container ${styles.empty}`}>
        <div className={styles.emptyIcon}>🍯</div>
        <h1 className="section-title">Корзина пуста</h1>
        <p className={styles.emptyText}>Добавьте товары, чтобы оформить заказ</p>
        <Button size="lg" onClick={() => navigate('/catalog')}>Перейти в каталог</Button>
      </div>
    );
  }

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 0) {
      if (!formData.name.trim()) newErrors.name = 'Введите имя';
      if (!formData.phone.trim()) newErrors.phone = 'Введите телефон';
      else if (!/^\+?[\d\s()-]{10,}$/.test(formData.phone)) newErrors.phone = 'Некорректный телефон';
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Некорректный email';
      }
    }

    if (currentStep === 1) {
      if (!formData.city.trim()) newErrors.city = 'Введите город';
      if (!formData.address.trim()) newErrors.address = 'Введите адрес';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    updateUser({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
    });

    addOrder({
      items: cartItems,
      total,
      shipping,
      subtotal: totalPrice,
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      },
      delivery: {
        method: formData.deliveryMethod,
        city: formData.city,
        address: formData.address,
        comment: formData.comment,
      },
      paymentMethod: formData.paymentMethod,
    });

    clearCart();
    setIsSubmitting(false);
    navigate('/order-success');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className={styles.formGroup}>
            <div className={styles.field}>
              <label htmlFor="name">Ваше имя *</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Иван Иванов"
                className={errors.name ? styles.inputError : ''}
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="phone">Телефон *</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+7 (900) 000-00-00"
                className={errors.phone ? styles.inputError : ''}
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="ivan@example.com"
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
          </div>
        );
      case 1:
        return (
          <div className={styles.formGroup}>
            <div className={styles.deliveryMethods}>
              {[
                { id: 'courier', label: 'Курьер', price: 250 },
                { id: 'pickup', label: 'Самовывоз', price: 0 },
                { id: 'post', label: 'Почта', price: 350 },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`${styles.deliveryMethod} ${formData.deliveryMethod === method.id ? styles.deliveryMethodActive : ''}`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value={method.id}
                    checked={formData.deliveryMethod === method.id}
                    onChange={(e) => updateField('deliveryMethod', e.target.value)}
                  />
                  <div>
                    <span className={styles.deliveryMethodLabel}>{method.label}</span>
                    <span className={styles.deliveryMethodPrice}>
                      {method.price === 0 ? 'Бесплатно' : `${method.price} ₽`}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            <div className={styles.field}>
              <label htmlFor="city">Город *</label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                placeholder="Москва"
                className={errors.city ? styles.inputError : ''}
              />
              {errors.city && <span className={styles.error}>{errors.city}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="address">Адрес *</label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                placeholder="Улица, дом, квартира"
                className={errors.address ? styles.inputError : ''}
              />
              {errors.address && <span className={styles.error}>{errors.address}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="comment">Комментарий к заказу</label>
              <textarea
                id="comment"
                rows="3"
                value={formData.comment}
                onChange={(e) => updateField('comment', e.target.value)}
                placeholder="Время доставки, подъезд, домофон..."
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.formGroup}>
            <div className={styles.paymentMethods}>
              {[
                { id: 'card', label: 'Банковская карта' },
                { id: 'cash', label: 'Наличными при получении' },
                { id: 'sbp', label: 'Система быстрых платежей' },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`${styles.paymentMethod} ${formData.paymentMethod === method.id ? styles.paymentMethodActive : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={formData.paymentMethod === method.id}
                    onChange={(e) => updateField('paymentMethod', e.target.value)}
                  />
                  <span>{method.label}</span>
                </label>
              ))}
            </div>

            <div className={styles.orderSummary}>
              <h3>Ваш заказ</h3>
              {cartItems.map((item) => (
                <div key={`${item.productId}-${item.weightValue}`} className={styles.summaryItem}>
                  <span>
                    {item.product.name}, {item.weight.label} × {item.quantity}
                  </span>
                  <span>{(item.priceAtAdd * item.quantity).toLocaleString('ru-RU')} ₽</span>
                </div>
              ))}
              <div className={styles.summaryDivider} />
              <div className={styles.summaryRow}>
                <span>Товары</span>
                <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Доставка</span>
                <span>{shipping === 0 ? 'Бесплатно' : `${shipping} ₽`}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>Итого</span>
                <span>{total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className="page-title">Оформление заказа</h1>

        <div className={styles.steps}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`${styles.step} ${index <= currentStep ? styles.stepActive : ''} ${index < currentStep ? styles.stepCompleted : ''}`}
              >
                <div className={styles.stepIcon}>
                  {index < currentStep ? <Check size={18} /> : <Icon size={18} />}
                </div>
                <span className={styles.stepLabel}>{step.label}</span>
                {index < steps.length - 1 && <ChevronRight size={16} className={styles.stepArrow} />}
              </div>
            );
          })}
        </div>

        <div className={styles.layout}>
          <div className={styles.form}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className={styles.stepTitle}>{steps[currentStep].label}</h2>
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            <div className={styles.formActions}>
              {currentStep > 0 && (
                <Button variant="outline" onClick={handleBack}>
                  Назад
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext}>Далее</Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Оформляем...' : 'Подтвердить заказ'}
                </Button>
              )}
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.sidebarBlock}>
              <h3 className={styles.sidebarTitle}>В корзине</h3>
              <div className={styles.sidebarItems}>
                {cartItems.map((item) => (
                  <div key={`${item.productId}-${item.weightValue}`} className={styles.sidebarItem}>
                    <span className={styles.sidebarItemEmoji}>{item.product.image}</span>
                    <div className={styles.sidebarItemInfo}>
                      <span className={styles.sidebarItemName}>{item.product.name}</span>
                      <span className={styles.sidebarItemMeta}>
                        {item.weight.label} × {item.quantity}
                      </span>
                    </div>
                    <span className={styles.sidebarItemPrice}>
                      {(item.priceAtAdd * item.quantity).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                ))}
              </div>
              <div className={styles.sidebarDivider} />
              <div className={styles.sidebarRow}>
                <span>Товары</span>
                <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className={styles.sidebarRow}>
                <span>Доставка</span>
                <span>{shipping === 0 ? 'Бесплатно' : `${shipping} ₽`}</span>
              </div>
              <div className={`${styles.sidebarRow} ${styles.sidebarTotal}`}>
                <span>Итого</span>
                <span>{total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
