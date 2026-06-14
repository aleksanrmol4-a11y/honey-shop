import { motion } from 'framer-motion';
import { Award, Heart, Leaf, Shield, Users } from 'lucide-react';
import { benefits } from '../data/products';
import { BenefitCard } from '../components/BenefitCard';
import styles from './AboutPage.module.css';

export function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="container">
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">О пасеке</span>
            <h1 className="page-title">Семейная пасека в третьем поколении</h1>
            <p className={styles.heroText}>
              Мы не просто продаём мёд — мы делимся плодами многолетнего труда нашей семьи,
              любовью к пчелам и заботой о природе.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.story}>
            <div className={styles.storyVisual}>
              <div className={styles.storyImage}>🐝</div>
            </div>
            <div className={styles.storyContent}>
              <h2 className="section-title">Наша история</h2>
              <p>
                Пасека основана в 2010 году дедом Александром, который передавал свои знания
                сыну, а теперь и внуку. Сегодня мы продолжаем семейную традицию, соблюдая
                все правила натурального пчеловодства.
              </p>
              <p>
                Наши ульи стоят в живописном уголке Рязанской области, вдали от крупных трасс
                и промышленных предприятий. Пчёлы собирают нектар с диких лугов, лесных
                полян и полей подсолнечника.
              </p>
              <p>
                Мы никогда не нагреваем мёд выше 40°C, не добавляем сахар и не ускоряем
                созревание. Каждая банка — это живой продукт с сохранёнными полезными
                свойствами.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <div className="section-head">
            <span className="section-tag">Наши ценности</span>
            <h2 className="section-title">Почему нам доверяют</h2>
          </div>
          <div className={styles.valuesGrid}>
            {benefits.map((benefit, index) => (
              <BenefitCard key={benefit.id} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.facts}>
            <div className={styles.fact}>
              <Award size={32} />
              <span className={styles.factNumber}>15+</span>
              <span className={styles.factLabel}>лет опыта</span>
            </div>
            <div className={styles.fact}>
              <Users size={32} />
              <span className={styles.factNumber}>500+</span>
              <span className={styles.factLabel}>довольных клиентов</span>
            </div>
            <div className={styles.fact}>
              <Heart size={32} />
              <span className={styles.factNumber}>6</span>
              <span className={styles.factLabel}>сортов мёда</span>
            </div>
            <div className={styles.fact}>
              <Leaf size={32} />
              <span className={styles.factNumber}>100%</span>
              <span className={styles.factLabel}>натурально</span>
            </div>
            <div className={styles.fact}>
              <Shield size={32} />
              <span className={styles.factNumber}>0</span>
              <span className={styles.factLabel}>добавок</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
