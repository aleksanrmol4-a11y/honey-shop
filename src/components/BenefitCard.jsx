
import styles from './BenefitCard.module.css';

export function BenefitCard({ benefit, index }) {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>{benefit.icon}</span>
      <h3 className={styles.title}>{benefit.title}</h3>
      <p className={styles.text}>{benefit.text}</p>
    </div>
  );
}
