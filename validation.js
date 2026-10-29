export const normalizePhone = (value) => String(value || '').replace(/\D/g, '');

export const isValidPhone = (value) => {
  const phone = String(value || '').trim();

  if (!phone) return false;
  if (/[a-zA-Z]/.test(phone)) return false;

  const digits = normalizePhone(phone);
  return /^\d{10,11}$/.test(digits);
};

export const normalizePlate = (value) => String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

export const setFieldError = (field, message) => {
  const input = typeof field === 'string' ? document.getElementById(field) : field;
  if (!input) return;

  input.setAttribute('aria-invalid', 'true');
  input.setCustomValidity(message || '');
};

export const clearFieldError = (field) => {
  const input = typeof field === 'string' ? document.getElementById(field) : field;
  if (!input) return;

  input.setAttribute('aria-invalid', 'false');
  input.setCustomValidity('');
};

export const validateForm = (formData) => {
  const errors = [];

  if (!formData.nome || formData.nome.trim().length < 3) {
    errors.push('Informe um nome válido.');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailPattern.test(formData.email.trim())) {
    errors.push('Informe um e-mail válido.');
  }

  if (!formData.telefone || !isValidPhone(formData.telefone)) {
    errors.push('Telefone inválido. Use apenas números com DDD e um número válido.');
  }

  if (!formData.placa || normalizePlate(formData.placa).length < 6) {
    errors.push('Informe a placa corretamente.');
  }

  if (!formData.mensagem || formData.mensagem.trim().length < 15) {
    errors.push('Descreva com mais detalhes a solicitação.');
  }

  return errors;
};
