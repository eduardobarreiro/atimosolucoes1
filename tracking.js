import { findRequestByCode } from './storage.js';

export const initTracking = () => {
  const form = document.getElementById('tracking-form');
  const status = document.getElementById('tracking-status');
  const result = document.getElementById('tracking-result');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const code = document.getElementById('tracking-code')?.value?.trim();

    if (!code || code.length < 5) {
      status.textContent = 'Informe um código de solicitação válido.';
      status.className = 'form-status error';
      if (result) result.hidden = true;
      return;
    }

    const request = findRequestByCode(code);

    if (!request) {
      status.textContent = 'Nenhuma solicitação foi encontrada para esse código.';
      status.className = 'form-status error';
      if (result) result.hidden = true;
      return;
    }

    status.innerHTML = `Solicitação <strong>${request.code}</strong> localizada com sucesso.`;
    status.className = 'form-status success';

    if (result) {
      result.hidden = false;
      result.innerHTML = `
        <div class="tracking-card">
          <p class="tracking-label">Código</p>
          <strong>${request.code}</strong>

          <div class="tracking-grid">
            <div>
              <p class="tracking-label">Cliente</p>
              <span>${request.nome}</span>
            </div>
            <div>
              <p class="tracking-label">Status</p>
              <span class="status-badge status-${request.status.toLowerCase().replace(/\s+/g, '-')}">${request.status}</span>
            </div>
            <div>
              <p class="tracking-label">Placa</p>
              <span>${request.placa}</span>
            </div>
            <div>
              <p class="tracking-label">Telefone</p>
              <span>${request.telefone}</span>
            </div>
          </div>

          <p class="tracking-label">Mensagem</p>
          <p class="tracking-message">${request.mensagem}</p>
        </div>
      `;
    }
  });
};
