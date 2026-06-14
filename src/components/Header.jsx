import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import styles from './Header.module.css';

const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/about', label: 'О нас' },
  { to: '/contacts', label: 'Контакты' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalCount } = useCart();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🍯</span>
            <span className={styles.logoText}>Пасека</span>
          </Link>

          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <form className={styles.search} onSubmit={handleSearch}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Найти мёд..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className={styles.actions}>
            <Link to="/favorites" className={styles.iconButton} aria-label="Избранное">
              <Heart size={22} />
              {favorites.length > 0 && (
                <span className={styles.badge}>{favorites.length}</span>
              )}
            </Link>
            <Link to="/cart" className={styles.iconButton} aria-label="Корзина">
              <ShoppingCart size={22} />
              {totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
            </Link>
            <Link to="/profile" className={styles.iconButton} aria-label="Профиль">
              <User size={22} />
            </Link>
            <button
              className={`${styles.iconButton} ${styles.menuButton}`}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Открыть меню"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={() => setIsMobileMenuOpen(false)}>
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobileHeader}>
              <Link to="/" className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}>
                <span className={styles.logoIcon}>🍯</span>
                <span className={styles.logoText}>Пасека</span>
              </Link>
              <button
                className={styles.iconButton}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Закрыть меню"
              >
                <X size={24} />
              </button>
            </div>

            <form className={styles.mobileSearch} onSubmit={handleSearch}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Найти мёд..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <nav className={styles.mobileNav}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    isActive ? `${styles.mobileLink} ${styles.active}` : styles.mobileLink
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className={styles.mobileActions}>
              <Link to="/favorites" className={styles.mobileAction} onClick={() => setIsMobileMenuOpen(false)}>
                <Heart size={20} />
                Избранное {favorites.length > 0 && `(${favorites.length})`}
              </Link>
              <Link to="/cart" className={styles.mobileAction} onClick={() => setIsMobileMenuOpen(false)}>
                <ShoppingCart size={20} />
                Корзина {totalCount > 0 && `(${totalCount})`}
              </Link>
              <Link to="/profile" className={styles.mobileAction} onClick={() => setIsMobileMenuOpen(false)}>
                <User size={20} />
                Профиль
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
