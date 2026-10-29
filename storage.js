export const STORAGE_KEYS = {
  requests: 'atimo_solicitacoes',
  adminSession: 'atimo_admin_session',
};

export const REQUEST_STATUSES = ['Recebida', 'Em análise', 'Concluída'];

const readStorage = (key, fallback = []) => {
  try {
    const value = localStorage.getItem(key);
    if (!value) {
      return fallback;
    }

    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch (error) {
    console.error(`Erro ao ler ${key} do localStorage:`, error);
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Erro ao salvar ${key} no localStorage:`, error);
  }
};

export const getAllRequests = () => {
  const requests = readStorage(STORAGE_KEYS.requests, []);
  return Array.isArray(requests) ? requests : [];
};

export const generateRequestCode = () => {
  const requests = getAllRequests();
  const highestNumber = requests.reduce((max, item) => {
    const numericPart = Number(String(item?.code || '').replace(/\D/g, ''));
    return Number.isFinite(numericPart) && numericPart > max ? numericPart : max;
  }, 0);

  const nextNumber = highestNumber + 1;
  return `ATIMO-${String(nextNumber).padStart(5, '0')}`;
};

export const saveRequest = (payload) => {
  const requests = getAllRequests();
  const now = new Date().toISOString();

  const request = {
    ...payload,
    code: payload.code || generateRequestCode(),
    status: payload.status || 'Recebida',
    createdAt: payload.createdAt || now,
    updatedAt: now,
  };

  const updatedRequests = [request, ...requests];
  writeStorage(STORAGE_KEYS.requests, updatedRequests);

  return request;
};

export const findRequestByCode = (code) => {
  const normalizedCode = String(code || '').trim().toUpperCase();
  return getAllRequests().find((request) => String(request.code || '').toUpperCase() === normalizedCode);
};

export const updateRequestStatus = (code, status) => {
  const normalizedCode = String(code || '').trim();
  const nextStatus = REQUEST_STATUSES.includes(status) ? status : 'Recebida';

  const requests = getAllRequests().map((request) => {
    if (String(request.code || '').toUpperCase() !== normalizedCode.toUpperCase()) {
      return request;
    }

    return {
      ...request,
      status: nextStatus,
      updatedAt: new Date().toISOString(),
    };
  });

  localStorage.setItem(STORAGE_KEYS.requests, JSON.stringify(requests));
  return requests;
};

export const getRequestSummary = () => {
  const requests = getAllRequests();

  return {
    total: requests.length,
    pendentes: requests.filter((request) => ['Recebida', 'Em análise'].includes(request.status)).length,
    concluido: requests.filter((request) => request.status === 'Concluída').length,
  };
};

export const isAdminLoggedIn = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.adminSession) === 'logged-in';
  } catch (error) {
    return false;
  }
};

export const setAdminLoggedIn = (value) => {
  try {
    if (value) {
      localStorage.setItem(STORAGE_KEYS.adminSession, 'logged-in');
      return;
    }

    localStorage.removeItem(STORAGE_KEYS.adminSession);
  } catch (error) {
    console.error('Erro ao alterar sessão do admin:', error);
  }
};
