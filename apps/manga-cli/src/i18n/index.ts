import get from 'lodash.get';
import template from 'lodash.template';

import en from './translations/en.json';
import es from './translations/es.json';

const availableLanguages = {
  en,
  es,
};

enum AvailableLanguages {
  EN = 'en',
  ES = 'es',
}

interface I18nConstructor {
  lang?: AvailableLanguages;
}

export class I18N {
  private selectedLanguage: AvailableLanguages;
  static readonly AVAILABLE_LANGUAGES = AvailableLanguages

  constructor(props: I18nConstructor) {
    this.selectedLanguage = props.lang || AvailableLanguages.EN;
  }

  changeLanguage(lang: AvailableLanguages) {
    this.selectedLanguage = lang;
  }

  getLanguage(): AvailableLanguages {
    return this.selectedLanguage;
  }

  translate(key: string, values?: object): any {
    let translation = get(availableLanguages[this.selectedLanguage], key);

    if (!translation) {
      throw new Error(`Translation not found for key: ${key}`);
    }

    if (values && typeof translation !== 'string') {
      throw new Error(`Translation is not a string for key: ${key}`);
    }

    if (values) {
      const compiled = template(translation);
      translation = compiled(values);
    }

    return translation;
  }
}


export const i18n = new I18N({ lang: AvailableLanguages.EN });
