import { Minus, Plus } from 'lucide-react';
import styles from './QuantitySelector.module.css';

export function QuantitySelector({ value, onChange, min = 1, max = 99, size = 'md' }) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className={`${styles.selector} ${styles[size]}`}>
      <button
        type="button"
        className={styles.button}
        onClick={decrease}
        disabled={value <= min}
        aria-label="Уменьшить количество"
      >
        <Minus size={size === 'sm' ? 14 : 18} />
      </button>
      <span className={styles.value}>{value}</span>
      <button
        type="button"
        className={styles.button}
        onClick={increase}
        disabled={value >= max}
        aria-label="Увеличить количество"
      >
        <Plus size={size === 'sm' ? 14 : 18} />
      </button>
    </div>
  );
}
