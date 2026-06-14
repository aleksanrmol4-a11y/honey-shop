import { Star } from 'lucide-react';
import styles from './StarRating.module.css';

export function StarRating({ rating, size = 16, showValue = true, reviewsCount }) {
  return (
    <div className={styles.rating}>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={star <= Math.round(rating) ? styles.filled : styles.empty}
          />
        ))}
      </div>
      {showValue && (
        <span className={styles.value}>
          {rating.toFixed(1)}
          {reviewsCount !== undefined && (
            <span className={styles.count}> ({reviewsCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
