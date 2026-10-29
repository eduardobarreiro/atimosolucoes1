import { setAppState } from './state.js';
import { saveRequest } from './storage.js';
import { clearFieldError, setFieldError, validateForm } from './validation.js';

const setStatus = (message, type = '') => {
  const status = document.getElementById('form-status');
  if (!status) return;

  status.textContent = message;
  status.className = 'form-status';
  if (type) {
    status.classList.add(type);
  }
};

export const initForm = () => {
  const form = document.getElementById('solicitacao-form');
  const phoneInput = document.getElementById('telefone');

  if (!form) {
    return;
  }

  phoneInput?.addEventListener('input', () => {
    const value = phoneInput.value;
    clearFieldError('telefone');

    if (!value) {
      setStatus('');
      return;
    }

    if (/[a-zA-Z]/.test(value)) {
      setFieldError('telefone', 'Telefone inválido. Use apenas números com DDD e um número válido.');
      setStatus('Telefone inválido. Use apenas números com DDD e um número válido.', 'error');
      return;
    }

    const digits = value.replace(/\D/g, '');
    if (digits.length > 0 && digits.length < 10) {
      setFieldError('telefone', 'Telefone inválido. Use apenas números com DDD e um número válido.');
      setStatus('Telefone inválido. Use apenas números com DDD e um número válido.', 'error');
      return;
    }

    setStatus('');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    setStatus('');

    const formData = Object.fromEntries(new FormData(form).entries());
    const payload = {
      nome: String(formData.nome || '').trim(),
      email: String(formData.email || '').trim(),
      telefone: String(formData.telefone || '').trim(),
      placa: String(formData.placa || '').trim(),
      mensagem: String(formData.mensagem || '').trim(),
    };

    const errors = validateForm(payload);
    if (errors.length > 0) {
      setFieldError('telefone', 'Telefone inválido. Use apenas números com DDD e um número válido.');
      setStatus(errors[0], 'error');
      return;
    }

    setAppState('formData', payload);

    try {
      const savedRequest = saveRequest({
        ...payload,
        status: 'Recebida',
      });

      setStatus(`Solicitação enviada com sucesso. Seu código é ${savedRequest.code}.`, 'success');
      form.reset();
    } catch (error) {
      setStatus(error.message || 'Não foi possível concluir a solicitação.', 'error');
    }
  });
};
