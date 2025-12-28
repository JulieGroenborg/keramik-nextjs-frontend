'use client';

import { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import styles from '../css/components/ShopClient.module.css';

// Hjælpe-komponent til at vise dropdowns).
// Flyttet udenfor ShopClient for at løse "Components created during render" fejlen

function FilterControls({ activeFilters, handleFilterChange, categories, getOptions, styles }) {
  return (
    <>
      {/* Dropdown til Kategorier */}
      <select
        className={styles.filterBox}
        value={activeFilters.category}
        onChange={(e) => handleFilterChange('category', e.target.value)}
      >
        <option value="all">Kategori</option>
        {categories?.map((c) => (
          <option key={c.id} value={c.route.path}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Dropdowns til resten (Materiale, Finishing, Farve, Størrelse) */}
      {/* getOptions bruges til at finde alle de unikke værdier automatisk */}
      <select
        className={styles.filterBox}
        value={activeFilters.material}
        onChange={(e) => handleFilterChange('material', e.target.value)}
      >
        <option value="all">Materiale</option>
        {getOptions('material')
          .filter((v) => v !== 'all')
          .map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
      </select>

      <select
        className={styles.filterBox}
        value={activeFilters.finishing}
        onChange={(e) => handleFilterChange('finishing', e.target.value)}
      >
        <option value="all">Finishing</option>
        {getOptions('finishing')
          .filter((v) => v !== 'all')
          .map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
      </select>

      <select
        className={styles.filterBox}
        value={activeFilters.color}
        onChange={(e) => handleFilterChange('color', e.target.value)}
      >
        <option value="all">Farver</option>
        {getOptions('color')
          .filter((v) => v !== 'all')
          .map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
      </select>

      <select
        className={styles.filterBox}
        value={activeFilters.size}
        onChange={(e) => handleFilterChange('size', e.target.value)}
      >
        <option value="all">Størrelse</option>
        {getOptions('size')
          .filter((v) => v !== 'all')
          .map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
      </select>
    </>
  );
}

// Det primære komponent
// står for visning af produkter med sortering og filtrering
export default function ShopClient({ products, categories }) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    material: 'all',
    finishing: 'all',
    color: 'all',
    size: 'all',
  });

  // Next giver en advarsel, da vi i linje 10 siger at der skal renders 4, men kort efter siger at den skal rende 8 på desktop.
  // For at komme uden om advarslen, så wrapper vi det i et setTimeout.
  // Det flytter opdateringen til "næste tick" i browseren.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.innerWidth >= 768) {
        setVisibleCount(8);
      }
    }, 0);
    return () => clearTimeout(timer); // oprydning af timer ved unmount
  }, []);

  // Funktion der finder alle unikke værdier så som alle farver baseret på, hvad der ligger i CMS. Det er det der vises i dropdown'en
  const getOptions = (alias) => {
    const values = products.map((p) => p.properties[alias]).filter(Boolean);
    return ['all', ...new Set(values)];
  };

  // Hver gang noget ændres fx en bruger åbner en menu, vil react køre alt koden i komponenten igen
  // useMemo husker resultatet af en funktion indtil en af de ting der er defineret i arrayet nedenfor ændres
  const filteredProducts = useMemo(() => {
    // selve filtreringen
    const result = products.filter((p) => {
      const props = p.properties;
      const path = p.route.path;
      const matchesCategory =
        activeFilters.category === 'all' || path.startsWith(activeFilters.category);

      return (
        matchesCategory &&
        (activeFilters.material === 'all' || props.material === activeFilters.material) &&
        (activeFilters.finishing === 'all' || props.finishing === activeFilters.finishing) &&
        (activeFilters.color === 'all' || props.color === activeFilters.color) &&
        (activeFilters.size === 'all' || props.size === activeFilters.size)
      );
    });

    // sorteringen
    if (sortBy === 'priceLow') result.sort((a, b) => a.properties.price - b.properties.price);
    if (sortBy === 'priceHigh') result.sort((a, b) => b.properties.price - a.properties.price);

    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    }
    if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createDate) - new Date(b.createDate));
    }

    return result;
  }, [activeFilters, sortBy, products]);

  // opdaterer staten når et filter ændres
  const handleFilterChange = (key, val) => {
    setActiveFilters((prev) => ({ ...prev, [key]: val }));
    setVisibleCount(window.innerWidth >= 768 ? 8 : 4);
  };

  const handleShowMore = () => {
    const increment = window.innerWidth >= 768 ? 8 : 4;
    setVisibleCount((prev) => prev + increment);
  };

  // De produkter der rent faktisk skal vises på skærmen lige nu
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div>
      <div className="container">
        {/* Sortering og Filter-knapper */}
        <div className={styles.filterBar}>
          <select
            className={styles.sortBox}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default" disabled>
              Sortér efter
            </option>
            <option value="newest">Nyeste først</option>
            <option value="oldest">Ældste først</option>
            <option value="priceLow">Pris: Lav til Høj</option>
            <option value="priceHigh">Pris: Høj til Lav</option>
          </select>

          {/* Mobil filter-knap (viser burger-menu) */}
          <button className={styles.mobileFilterBtn} onClick={() => setIsMenuOpen(true)}>
            Filtrer
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
          </button>

          {/* Desktop filter-menu */}
          <div className={styles.desktopFilters}>
            <FilterControls
              activeFilters={activeFilters}
              handleFilterChange={handleFilterChange}
              categories={categories}
              getOptions={getOptions}
              styles={styles}
            />
          </div>
        </div>

        {/* Mobil Filter Menu (Overlay) */}
        {isMenuOpen && (
          <div className={styles.mobileOverlay}>
            <div className={styles.mobileMenuContent}>
              <div className={styles.menuHeader}>
                <h3>Filtrer</h3>
                <button onClick={() => setIsMenuOpen(false)}>Luk</button>
              </div>
              <div className={styles.menuBody}>
                <FilterControls
                  activeFilters={activeFilters}
                  handleFilterChange={handleFilterChange}
                  categories={categories}
                  getOptions={getOptions}
                  styles={styles}
                />
              </div>
              <button className={styles.applyBtn} onClick={() => setIsMenuOpen(false)}>
                {/* viser antal resultater i parentes */}
                Vis resultater ({filteredProducts.length})
              </button>
            </div>
          </div>
        )}

        <div className={styles.grid}>
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* Vis flere knap */}
        {hasMore && (
          <div className={styles.buttonContainer}>
            <button onClick={handleShowMore} className={styles.loadMoreButton}>
              Vis flere
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
