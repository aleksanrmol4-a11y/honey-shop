import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { heroImage } from '../data/products';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={`${styles.hero} honeycomb-bg`}>
      <div className="container">
        <div className={styles.inner}>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="section-tag">Натуральный мёд прямо с пасеки</span>
            <h1 className={styles.title}>
              Живой мёд без&nbsp;примесей и&nbsp;химии
            </h1>
            <p className={styles.description}>
              Собираем мёд на собственной пасеке в экологически чистом районе.
              Никакого подогрева, никаких добавок — только то, что приготовили пчёлы.
            </p>
            <div className={styles.actions}>
              <Link to="/catalog">
                <Button size="lg">Выбрать мёд</Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">Узнать о пасеке</Button>
              </Link>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>15+</span>
                <span className={styles.statLabel}>лет на пасеке</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>6</span>
                <span className={styles.statLabel}>сортов мёда</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>500+</span>
                <span className={styles.statLabel}>довольных семей</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.visual}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          >
            <div className={styles.imageWrapper}>
              <img
                src={heroImage}
                alt="Свежие соты с капающим мёдом"
                className={styles.image}
                loading="eager"
              />
              <div className={styles.imageGlow} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
