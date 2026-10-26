import { appState, setAppState } from './state.js';

export const API_CONFIG = {
  viaCepBaseUrl: 'https://viacep.com.br/ws',
  whatsappNumber: '5515996057844',
  whatsappMessage: 'Olá, quero solicitar uma análise documental.',
};

export const initApiConfig = () => {
  setAppState('apiConfig', API_CONFIG);
};

export const fetchViaCep = async (cep) => {
  const cleanedCep = String(cep).replace(/\D/g, '');

  if (cleanedCep.length !== 8) {
    throw new Error('CEP inválido. Informe 8 dígitos.');
  }

  const response = await fetch(`${API_CONFIG.viaCepBaseUrl}/${cleanedCep}/json/`);

  if (!response.ok) {
    throw new Error('Não foi possível consultar o CEP no momento.');
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error('CEP não encontrado. Verifique o valor informado.');
  }

  return data;
};

export const buildWhatsAppLink = () => {
  const encodedMessage = encodeURIComponent(API_CONFIG.whatsappMessage);
  return `https://wa.me/${API_CONFIG.whatsappNumber}?text=${encodedMessage}`;
};

export const getApiConfig = () => appState.apiConfig || API_CONFIG;
