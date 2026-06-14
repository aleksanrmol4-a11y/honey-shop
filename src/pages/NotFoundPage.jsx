import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { Button } from '../components/ui/Button';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <span className={styles.icon}><SearchX size={56} strokeWidth={1.5} /></span>
          <h1 className="section-title">Страница не найдена</h1>
          <p className={styles.text}>
            Кажется, эта страница улетела вместе с пчёлами. Но у нас ещё много вкусного мёда!
          </p>
          <Link to="/">
            <Button size="lg">Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
