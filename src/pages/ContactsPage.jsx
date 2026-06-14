import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import styles from './ContactsPage.module.css';

export function ContactsPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-tag">Контакты</span>
          <h1 className="page-title">Свяжитесь с нами</h1>
          <p className={styles.subtitle}>
            Мы всегда рады ответить на ваши вопросы и помочь с выбором мёда
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.card}>
              <Phone size={24} />
              <h3>Телефон</h3>
              <a href="tel:+79000000000">+7 (900) 000-00-00</a>
              <p>Звоните ежедневно с 9:00 до 20:00</p>
            </div>
            <div className={styles.card}>
              <Mail size={24} />
              <h3>Email</h3>
              <a href="mailto:hello@paseka.ru">hello@paseka.ru</a>
              <p>Отвечаем в течение рабочего дня</p>
            </div>
            <div className={styles.card}>
              <MapPin size={24} />
              <h3>Адрес пасеки</h3>
              <span>Рязанская область, с. Пчелиное, ул. Луговая, 7</span>
              <p>Запись на экскурсию по договорённости</p>
            </div>
            <div className={styles.card}>
              <Clock size={24} />
              <h3>Режим работы</h3>
              <span>Ежедневно 9:00–20:00</span>
              <p>Доставка в день заказа по городу</p>
            </div>
          </div>

          <div className={styles.formBlock}>
            <h2 className={styles.formTitle}>Напишите нам</h2>
            <p className={styles.formSubtitle}>
              Оставьте сообщение, и мы свяжемся с вами в ближайшее время
            </p>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.field}>
                <label>Ваше имя</label>
                <input type="text" placeholder="Иван" />
              </div>
              <div className={styles.field}>
                <label>Телефон или email</label>
                <input type="text" placeholder="+7 (900) 000-00-00" />
              </div>
              <div className={styles.field}>
                <label>Сообщение</label>
                <textarea rows="4" placeholder="Какой мёд вас интересует?" />
              </div>
              <button type="submit" className={styles.submitButton}>
                <MessageCircle size={18} />
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
