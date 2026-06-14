import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, LogOut, Edit2, Check } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useFavorites } from '../context/FavoritesContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import styles from './ProfilePage.module.css';

const tabs = [
  { id: 'orders', label: 'Заказы', icon: Package },
  { id: 'favorites', label: 'Избранное', icon: Heart },
  { id: 'settings', label: 'Настройки', icon: User },
];

export function ProfilePage() {
  const { user, orders, updateUser } = useUser();
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
  });

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const handleSaveSettings = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'processing': return 'В обработке';
      case 'shipped': return 'Отправлен';
      case 'delivered': return 'Доставлен';
      case 'cancelled': return 'Отменён';
      default: return status;
    }
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {user.name ? <span>{user.name[0].toUpperCase()}</span> : <User size={28} />}
            </div>
            <div>
              <h1 className={styles.name}>{user.name || 'Гость'}</h1>
              <p className={styles.phone}>{user.phone || 'Телефон не указан'}</p>
            </div>
          </div>
        </div>

        <div className={styles.tabs}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className={styles.content}>
          {activeTab === 'orders' && (
            <div>
              <h2 className={styles.sectionTitle}>История заказов</h2>
              {orders.length === 0 ? (
                <div className={styles.empty}>
                  <Package size={48} className={styles.emptyIcon} />
                  <h3>У вас пока нет заказов</h3>
                  <p>Закажите вкусный мёд из нашего каталога</p>
                  <Link to="/catalog">
                    <Button>Перейти в каталог</Button>
                  </Link>
                </div>
              ) : (
                <div className={styles.orders}>
                  {orders.map((order) => (
                    <div key={order.id} className={styles.order}>
                      <div className={styles.orderHeader}>
                        <div>
                          <span className={styles.orderId}>{order.id}</span>
                          <span className={styles.orderDate}>
                            {new Date(order.date).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        <span className={`${styles.orderStatus} ${styles[order.status]}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <div className={styles.orderItems}>
                        {order.items.map((item) => (
                          <div key={`${item.productId}-${item.weightValue}`} className={styles.orderItem}>
                            <span className={styles.orderItemEmoji}>{item.product.image}</span>
                            <span className={styles.orderItemName}>{item.product.name}</span>
                            <span className={styles.orderItemMeta}>
                              {item.weight.label} × {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className={styles.orderFooter}>
                        <span>Доставка: {order.delivery.method === 'pickup' ? 'Самовывоз' : order.delivery.city}</span>
                        <span className={styles.orderTotal}>{order.total.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div>
              <h2 className={styles.sectionTitle}>Избранное</h2>
              {favoriteProducts.length === 0 ? (
                <div className={styles.empty}>
                  <Heart size={48} className={styles.emptyIcon} />
                  <h3>В избранном пусто</h3>
                  <p>Сохраняйте понравившиеся товары, чтобы не потерять их</p>
                  <Link to="/catalog">
                    <Button>Перейти в каталог</Button>
                  </Link>
                </div>
              ) : (
                <div className={styles.favoritesGrid}>
                  {favoriteProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <div className={styles.settingsHeader}>
                <h2 className={styles.sectionTitle}>Личные данные</h2>
                <button
                  className={styles.editButton}
                  onClick={() => (isEditing ? handleSaveSettings() : setIsEditing(true))}
                >
                  {isEditing ? <><Check size={16} /> Сохранить</> : <><Edit2 size={16} /> Редактировать</>}
                </button>
              </div>
              <div className={styles.settingsForm}>
                <div className={styles.field}>
                  <label>Имя</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className={styles.field}>
                  <label>Телефон</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className={styles.field}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
