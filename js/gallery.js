/**
 * gallery.js — Estiellart
 * Maneja los filtros de la galería principal (por categoría)
 * y los filtros de la página de comisiones (por tipo de producto).
 */
document.addEventListener('DOMContentLoaded', () => {
  // ── FILTROS DE GALERÍA (data-filter / data-category) ──────────────────────
  const galleryFilterBtns = document.querySelectorAll('.gallery__filters .filter-btn');
  const galleryItems = document.querySelectorAll('#gallery-grid .gallery__item');

  if (galleryFilterBtns.length > 0 && galleryItems.length > 0) {
    galleryFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter || 'all';

        // Actualizar estado activo del botón
        galleryFilterBtns.forEach((b) => b.classList.remove('filter-btn--active'));
        btn.classList.add('filter-btn--active');

        // Filtrar ítems con animación
        galleryItems.forEach((item) => {
          const category = item.dataset.category || '';
          const show = filter === 'all' || category === filter;

          if (show) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ── FILTROS DE TIENDA / PRINTS (comportamiento original) ──────────────────
  const shopFilterBtns = document.querySelectorAll('.prints__filters .filter-btn');
  const shopItems = document.querySelectorAll('.shop-item');

  if (shopFilterBtns.length > 0 && shopItems.length > 0) {
    shopFilterBtns.forEach((button) => {
      button.addEventListener('click', () => {
        const selectedFilter = button.dataset.filter || 'all';

        shopFilterBtns.forEach((b) => b.classList.remove('filter-btn--active'));
        button.classList.add('filter-btn--active');

        shopItems.forEach((item) => {
          const itemType = item.dataset.type || '';
          const shouldShow = selectedFilter === 'all' || itemType === selectedFilter;
          item.classList.toggle('shop-item--hidden', !shouldShow);
          item.style.display = shouldShow ? '' : 'none';
        });
      });
    });
  }
});
