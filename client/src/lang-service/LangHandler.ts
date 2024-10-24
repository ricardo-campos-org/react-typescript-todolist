import i18n from '../i18n';
import { getDefaultLang, setDefaultLang } from '../storage-service/storage';

/**
 * Handles a given language.
 *
 * @param {string} lang the language to be handled.
 */
function handleLanguage(lang: string) {
  i18n.changeLanguage(lang);
  setDefaultLang(lang);
}

const handleDefaultLang = () => {
  const lang = getDefaultLang();
  if (lang !== 'en') {
    handleLanguage(lang);
  }
};

export { handleDefaultLang };
