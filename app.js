import { initRouter } from './router.js';
import { initForm } from './form.js';
import { initTracking } from './tracking.js';
import { initAdmin } from './admin.js';
import { initApiConfig } from './api.js';

const initApp = () => {
  initRouter();
  initApiConfig();

  const page = document.body.dataset.page;

  if (page === 'solicitacao') {
    initForm();
  }

  if (page === 'tracking') {
    initTracking();
  }

  if (page === 'admin') {
    initAdmin();
  }
};

initApp();
