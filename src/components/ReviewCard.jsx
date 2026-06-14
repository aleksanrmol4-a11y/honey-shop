import { motion } from 'framer-motion';
import { StarRating } from './ui/StarRating';
import styles from './ReviewCard.module.css';

export function ReviewCard({ review, index }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className={styles.header}>
        <span className={styles.avatar}>{review.avatar || review.author.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}</span>
        <div>
          <h4 className={styles.author}>{review.author}</h4>
          <StarRating rating={review.rating} size={14} showValue={false} />
        </div>
      </div>
      <p className={styles.text}>{review.text}</p>
    </motion.div>
  );
}
