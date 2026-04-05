document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting === true) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add('reveal--visible');
    });
  }

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (anchorLinks.length === 0) {
    return;
  }

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const hrefValue = link.getAttribute('href');

      if (hrefValue === null || hrefValue === '#') {
        return;
      }

      const targetElement = document.querySelector(hrefValue);

      if (targetElement === null) {
        return;
      }

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });

      if (history.pushState) {
        history.pushState(null, '', hrefValue);
      }

      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
    });
  });
});
