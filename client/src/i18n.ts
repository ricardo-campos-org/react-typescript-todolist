import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          landing_title: 'Welcome to TaskNote',
          landing_subtitle: 'Your best friend to keep up with notes and tasks!'
        }
      },
      es: {
        translation: {
          landing_title: 'Bienvenido a TaskNote',
          landing_subtitle: 'Your best friend to keep up with notes and tasks!'
        }
      },
      pt_br: {
        translation: {
          landing_title: 'Bem vindo ao TaskNote',
          landing_subtitle: 'Seu melhor amigo para manter notas e tarefas!'
        }
      }
    },
  });

export default i18n;
