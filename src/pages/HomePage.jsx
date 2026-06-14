import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Leaf, Truck, Award } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { BenefitCard } from '../components/BenefitCard';
import { ReviewCard } from '../components/ReviewCard';
import { Button } from '../components/ui/Button';
import { products, benefits, reviews, galleryImages, aboutImages, videoUrl } from '../data/products';
import styles from './HomePage.module.css';

export function HomePage() {
  const popularProducts = products.filter((p) => p.badge === 'bestseller' || p.badge === 'hit').slice(0, 4);

  return (
    <div>
      <Hero />

      {/* Popular Products */}
      <section className={`section ${styles.popular}`}>
        <div className="container">
          <div className="section-head">
            <span className="section-tag">Популярное</span>
            <h2 className="section-title">Любимые сорта наших покупателей</h2>
            <p className="section-subtitle">
              Самые популярные позиции, которые заказывают снова и снова
            </p>
          </div>
          <ProductGrid products={popularProducts} />
          <div className={styles.catalogLink}>
            <Link to="/catalog">
              <Button variant="outline">
                Смотреть весь каталог <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={`section ${styles.benefits}`}>
        <div className="container">
          <div className="section-head">
            <span className="section-tag">Почему мы</span>
            <h2 className="section-title">Натуральность, которой можно доверять</h2>
            <p className="section-subtitle">
              Мы заботимся о каждой баночке мёда, чтобы вы получали только лучшее
            </p>
          </div>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <BenefitCard key={benefit.id} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className={`section ${styles.about}`}>
        <div className="container">
          <div className={styles.aboutInner}>
            <motion.div
              className={styles.aboutVisual}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.aboutImageWrapper}>
                <img
                  src={aboutImages.beekeeper}
                  alt="Пчеловод с рамкой свежих сот"
                  className={styles.aboutImage}
                  loading="lazy"
                />
              </div>
              <div className={styles.aboutExperience}>
                <span className={styles.aboutExperienceNum}>15+</span>
                <span className={styles.aboutExperienceText}>лет опыта</span>
              </div>
            </motion.div>
            <motion.div
              className={styles.aboutContent}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="section-tag">О пасеке</span>
              <h2 className="section-title">Семейная пасека в третьем поколении</h2>
              <p className={styles.aboutText}>
                Наша пасека находится вдали от дорог и промышленных предприятий — в экологически
                чистом районе Рязанской области. Пчёлы собирают нектар с диких лугов и лесных угодий.
              </p>
              <p className={styles.aboutText}>
                Мы никогда не нагреваем мёд выше 40°C и не добавляем посторонних веществ. Каждая
                партия проходит лабораторный контроль качества.
              </p>
              <ul className={styles.aboutList}>
                <li><Shield size={18} /> Документы качества на каждую партию</li>
                <li><Leaf size={18} /> Сбор без химических обработок</li>
                <li><Truck size={18} /> Доставка в день заказа по городу</li>
                <li><Award size={18} /> Гарантия возврата, если не понравится</li>
              </ul>
              <Link to="/about">
                <Button>Узнать больше о пасеке</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className={`section ${styles.videoSection}`}>
        <div className="container">
          <div className="section-head">
            <span className="section-tag">Видео с пасеки</span>
            <h2 className="section-title">С пасеки до баночки</h2>
            <p className="section-subtitle">
              Посмотрите, как пчёлы создают натуральный мёд и как мы заботимся о каждой стадии производства
            </p>
          </div>
          <motion.div
            className={styles.videoWrapper}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.videoContainer}>
              <video
                src={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                poster="/honey-shop/images/gallery/process-1.jpg"
                title="Пчёлы на сотах"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          <div className="section-head">
            <span className="section-tag">Галерея</span>
            <h2 className="section-title">Как рождается настоящий мёд</h2>
            <p className="section-subtitle">
              Кадры с нашей пасеки: ульи, сбор урожая, откачка и разлив по баночкам
            </p>
          </div>
          <div className={styles.galleryGrid}>
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                className={styles.galleryItem}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={image.src} alt={image.alt} loading="eager" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className={`section ${styles.reviews}`}>
        <div className="container">
          <div className="section-head">
            <span className="section-tag">Отзывы</span>
            <h2 className="section-title">Что говорят наши покупатели</h2>
            <p className="section-subtitle">
              Более 500 довольных семей уже попробовали наш мёд
            </p>
          </div>
          <div className={styles.reviewsGrid}>
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Попробуйте настоящий натуральный мёд</h2>
            <p className={styles.ctaText}>
              Оформите заказ сегодня и получите скидку 10% на первую покупку
            </p>
            <Link to="/catalog">
              <Button size="lg">Перейти в каталог</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
