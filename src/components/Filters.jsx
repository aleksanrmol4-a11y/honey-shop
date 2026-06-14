import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import styles from './Filters.module.css';

const sortOptions = [
  { value: 'popular', label: 'По популярности' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
  { value: 'rating', label: 'По рейтингу' },
  { value: 'new', label: 'Новинки' },
];

export function Filters({
  search,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  resultCount,
  onReset,
}) {
  const hasFilters = search || activeCategory !== 'all' || sortBy !== 'popular' || priceRange[1] < 1000;

  return (
    <div className={styles.filters}>
      <div className={styles.top}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
          {search && (
            <button
              className={styles.clearSearch}
              onClick={() => onSearchChange('')}
              aria-label="Очистить поиск"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className={styles.sort}>
          <SlidersHorizontal size={16} />
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.categories}>
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            className={`${styles.category} ${activeCategory === category.id ? styles.categoryActive : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className={styles.bottom}>
        <div className={styles.priceFilter}>
          <span className={styles.priceLabel}>Цена до:</span>
          <input
            type="range"
            min="300"
            max="1000"
            step="50"
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value, 10)])}
            className={styles.priceRange}
          />
          <span className={styles.priceValue}>{priceRange[1]} ₽/кг</span>
        </div>

        <div className={styles.results}>
          <span>Найдено: <strong>{resultCount}</strong></span>
          {hasFilters && (
            <button className={styles.resetButton} onClick={onReset}>
              Сбросить фильтры
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
