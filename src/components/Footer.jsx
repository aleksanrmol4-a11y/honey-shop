import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { LogoIcon } from './LogoIcon';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <LogoIcon className={styles.logoIcon} />
              <span className={styles.logoText}>Пасека</span>
            </Link>
            <p className={styles.description}>
              Натуральный мёд с собственной пасеки. Собираем с любовью и доставляем
              свежим прямо к вашему столу.
            </p>
          </div>

          <div className={styles.columns}>
            <div className={styles.column}>
              <h4 className={styles.title}>Каталог</h4>
              <ul className={styles.links}>
                <li><Link to="/catalog?category=flower">Цветочный мёд</Link></li>
                <li><Link to="/catalog?category=herbal">Разнотравье</Link></li>
                <li><Link to="/catalog?category=buckwheat">Гречишный мёд</Link></li>
                <li><Link to="/catalog?category=linden">Липовый мёд</Link></li>
              </ul>
            </div>

            <div className={styles.column}>
              <h4 className={styles.title}>Информация</h4>
              <ul className={styles.links}>
                <li><Link to="/about">О пасеке</Link></li>
                <li><Link to="/delivery">Доставка и оплата</Link></li>
                <li><Link to="/contacts">Контакты</Link></li>
                <li><Link to="/profile">Личный кабинет</Link></li>
              </ul>
            </div>

            <div className={styles.column}>
              <h4 className={styles.title}>Контакты</h4>
              <ul className={styles.contacts}>
                <li>
                  <Phone size={16} />
                  <a href="tel:+79000000000">+7 (900) 000-00-00</a>
                </li>
                <li>
                  <Mail size={16} />
                  <a href="mailto:hello@paseka.ru">hello@paseka.ru</a>
                </li>
                <li>
                  <MapPin size={16} />
                  <span>Рязанская область, с. Пчелиное</span>
                </li>
                <li>
                  <Clock size={16} />
                  <span>Ежедневно 9:00–20:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 Пасека. Натуральный мёд с доставкой.</p>
          <div className={styles.legal}>
            <Link to="/privacy">Политика конфиденциальности</Link>
            <Link to="/terms">Публичная оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
