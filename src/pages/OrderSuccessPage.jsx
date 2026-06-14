import { Link } from 'react-router-dom';
import { CheckCircle, Package, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import styles from './OrderSuccessPage.module.css';

export function OrderSuccessPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.icon}>
            <CheckCircle size={64} />
          </div>
          <h1 className="section-title">Заказ успешно оформлен!</h1>
          <p className={styles.text}>
            Спасибо за покупку! Мы свяжемся с вами в ближайшее время для подтверждения заказа.
          </p>

          <div className={styles.info}>
            <div className={styles.infoItem}>
              <Package size={20} />
              <span>Заказ сохранён в вашем личном кабинете</span>
            </div>
            <div className={styles.infoItem}>
              <Clock size={20} />
              <span>Доставка в течение 1–3 рабочих дней</span>
            </div>
          </div>

          <div className={styles.actions}>
            <Link to="/profile">
              <Button size="lg">Перейти в профиль <ArrowRight size={18} /></Button>
            </Link>
            <Link to="/catalog">
              <Button variant="outline" size="lg">Продолжить покупки</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
