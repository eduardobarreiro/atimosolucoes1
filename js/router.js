export const initRouter = () => {
  const body = document.body;
  const page = body.dataset.page || 'home';

  if (!page || page === 'home') {
    return;
  }

  const navLinks = document.querySelectorAll('a[href]');
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('./')) {
      return;
    }

    const isCurrentPage = href.includes(page + '.html') || href === './index.html' && page === 'home';
    if (isCurrentPage) {
      link.setAttribute('aria-current', 'page');
    }
  });
};
