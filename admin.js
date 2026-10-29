import {
  getAllRequests,
  getRequestSummary,
  isAdminLoggedIn,
  REQUEST_STATUSES,
  setAdminLoggedIn,
  updateRequestStatus,
} from './storage.js';

const DEMO_ADMIN_EMAIL = 'admin@atimo.com';
const DEMO_ADMIN_PASSWORD = 'atimo123';

const renderDashboard = () => {
  const list = document.getElementById('admin-request-list');
  const totalElement = document.getElementById('stat-total');
  const pendingElement = document.getElementById('stat-pending');
  const concludedElement = document.getElementById('stat-concluded');

  if (!list) return;

  const requests = [...getAllRequests()].sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
  const summary = getRequestSummary();

  totalElement.textContent = String(summary.total);
  pendingElement.textContent = String(summary.pendentes);
  concludedElement.textContent = String(summary.concluido);

  if (requests.length === 0) {
    list.innerHTML = '<tr><td colspan="7">Nenhuma solicitação recebida ainda.</td></tr>';
    return;
  }

  list.innerHTML = requests
    .map(
      (request) => `
        <tr>
          <td>${request.code}</td>
          <td>${request.nome}</td>
          <td>${request.email}</td>
          <td>${request.telefone}</td>
          <td>${request.placa}</td>
          <td>
            <select class="admin-status-select" data-code="${request.code}" aria-label="Status da solicitação ${request.code}">
              ${REQUEST_STATUSES.map(
                (status) => `<option value="${status}" ${status === request.status ? 'selected' : ''}>${status}</option>`,
              ).join('')}
            </select>
          </td>
          <td>${new Date(request.updatedAt || request.createdAt).toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short',
          })}</td>
        </tr>
      `,
    )
    .join('');

  list.querySelectorAll('.admin-status-select').forEach((select) => {
    select.addEventListener('change', (event) => {
      const code = event.target.dataset.code;
      const nextStatus = event.target.value;
      updateRequestStatus(code, nextStatus);
      renderDashboard();
    });
  });
};

export const initAdmin = () => {
  const form = document.getElementById('admin-login-form');
  const status = document.getElementById('admin-status');
  const loginCard = form?.closest('.login-card');
  const dashboardCard = document.querySelector('.admin-dashboard');
  const logoutButton = document.getElementById('admin-logout');

  const showDashboard = () => {
    if (loginCard) {
      loginCard.style.display = 'none';
    }

    if (dashboardCard) {
      dashboardCard.style.display = 'block';
    }

    renderDashboard();
  };

  const showLogin = () => {
    if (loginCard) {
      loginCard.style.display = 'block';
    }

    if (dashboardCard) {
      dashboardCard.style.display = 'none';
    }

    if (status) {
      status.textContent = 'Faça login para visualizar as solicitações.';
      status.className = 'form-status';
    }
  };

  if (isAdminLoggedIn()) {
    showDashboard();
  } else {
    showLogin();
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      setAdminLoggedIn(false);
      showLogin();
      if (form) {
        form.reset();
      }
    });
  }

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('admin-email')?.value?.trim();
    const password = document.getElementById('admin-password')?.value || '';

    if (!email || !password) {
      status.textContent = 'Informe e-mail e senha para acessar o painel.';
      status.className = 'form-status error';
      return;
    }

    if (email !== DEMO_ADMIN_EMAIL || password !== DEMO_ADMIN_PASSWORD) {
      status.textContent = 'Credenciais inválidas. Use o acesso local de demonstração.';
      status.className = 'form-status error';
      return;
    }

    setAdminLoggedIn(true);
    status.textContent = 'Login realizado com sucesso em modo localStorage.';
    status.className = 'form-status success';
    showDashboard();
  });
};
