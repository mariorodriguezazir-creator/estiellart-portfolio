document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelector('.nav__links');
  const toggleButton = document.querySelector('.nav__toggle');
  const linkItems = document.querySelectorAll('.nav__link');

  if (nav === null || navLinks === null || toggleButton === null || linkItems.length === 0) {
    return;
  }

  const closeMenu = () => {
    navLinks.classList.remove('nav__links--open');
    toggleButton.classList.remove('nav__toggle--open');
    toggleButton.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    navLinks.classList.add('nav__links--open');
    toggleButton.classList.add('nav__toggle--open');
    toggleButton.setAttribute('aria-expanded', 'true');
  };

  const toggleMenu = () => {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      closeMenu();
      return;
    }

    openMenu();
  };

  const getCurrentPage = () => {
    const currentPath = window.location.pathname;
    const page = currentPath.split('/').pop();

    if (page === '' || page === '/') {
      return 'index.html';
    }

    return page;
  };

  const normalizeHref = (hrefValue) => {
    if (!hrefValue) {
      return '';
    }

    return hrefValue.split('/').pop() || hrefValue;
  };

  const pageAliases = {
    'index.html': 'gallery',
    'tienda.html': 'store',
    'contacto.html': 'contact',
  };

  const currentPage = getCurrentPage();
  const currentAlias = pageAliases[currentPage] || '';

  linkItems.forEach((link) => {
    link.classList.remove('nav__link--active');
    link.removeAttribute('aria-current');

    const linkHref = normalizeHref(link.getAttribute('href'));
    const linkDataPage = link.dataset.page || '';
    const isMatch = linkHref === currentPage || linkDataPage === currentAlias;

    if (isMatch) {
      link.classList.add('nav__link--active');
      link.setAttribute('aria-current', 'page');
    }
  });

  toggleButton.addEventListener('click', toggleMenu);

  linkItems.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (!nav.contains(target)) {
      closeMenu();
    }
  });
});
