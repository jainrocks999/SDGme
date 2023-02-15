import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        'Forgotten password?': 'Forgotten password?',
      },
    },
    es: {
      translations: {
        'Forgotten password?': 'Cambiar contraseña',
      },
    },
  },
  fallbackLng: 'en',
  debug: true,

  ns: ['translations'],
  defaultNS: 'translations',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;