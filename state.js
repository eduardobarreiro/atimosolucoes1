export const appState = {
  cep: null,
  formData: null,
  currentRequest: null,
};

export const setAppState = (key, value) => {
  appState[key] = value;
};

export const getAppState = (key) => appState[key];
