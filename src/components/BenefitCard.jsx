import { Hexagon, Leaf, ClipboardCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './BenefitCard.module.css';

const iconMap = {
  hexagon: Hexagon,
  leaf: Leaf,
  clipboard: ClipboardCheck,
  truck: Truck,
};

export function BenefitCard({ benefit, index }) {
  const Icon = iconMap[benefit.icon] || Bee;

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <span className={styles.icon}>
        <Icon size={36} strokeWidth={1.5} />
      </span>
      <h3 className={styles.title}>{benefit.title}</h3>
      <p className={styles.text}>{benefit.text}</p>
    </motion.div>
  );
}
