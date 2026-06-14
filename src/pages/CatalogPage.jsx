import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filters } from '../components/Filters';
import { ProductGrid } from '../components/ProductGrid';
import { products } from '../data/products';
import styles from './CatalogPage.module.css';

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popular');
  const [priceRange, setPriceRange] = useState([
    0,
    parseInt(searchParams.get('maxPrice') || '1000', 10),
  ]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (activeCategory !== 'all') params.set('category', activeCategory);
    if (sortBy !== 'popular') params.set('sort', sortBy);
    if (priceRange[1] < 1000) params.set('maxPrice', priceRange[1].toString());
    setSearchParams(params, { replace: true });
  }, [search, activeCategory, sortBy, priceRange, setSearchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query)
      );
    }

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    result = result.filter((p) => p.pricePerKg <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.pricePerKg - b.pricePerKg);
        break;
      case 'price-desc':
        result.sort((a, b) => b.pricePerKg - a.pricePerKg);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'new':
        result.sort((a, b) => (a.badge === 'new' ? -1 : b.badge === 'new' ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [search, activeCategory, sortBy, priceRange]);

  const handleReset = () => {
    setSearch('');
    setActiveCategory('all');
    setSortBy('popular');
    setPriceRange([0, 1000]);
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-tag">Каталог</span>
          <h1 className="page-title">Наш мёд</h1>
          <p className={styles.subtitle}>
            Каждый сорт собран в определённый сезон с конкретного разнотравья
          </p>
        </div>

        <Filters
          search={search}
          onSearchChange={setSearch}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          resultCount={filteredProducts.length}
          onReset={handleReset}
        />

        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
