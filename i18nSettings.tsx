import * as React from 'react';
import {IntlProvider} from 'react-intl';
import {ReactNode} from 'react';

// localize json data
import ja from './lang/ja.json';
import en from './lang/en.json';

const SUPPORTED_LOCALE = ['ja', 'en'];
const DEFAULT_LOCALE = 'en';

const geti18nLocale = (): string => {
  const languageCode = navigator.language.split(/[-_]/)[0];
  if (SUPPORTED_LOCALE.indexOf(languageCode) !== -1) {
    return languageCode;
  }
  return DEFAULT_LOCALE;
};

const getMessages = (locale: string): {[key: string]: string} => {
  switch (locale) {
    case 'en':
      return en;
    case 'ja':
      return {
        ...getMessages('en'),
        ...ja,
      };
    default:
      throw new Error('unknown locale');
  }
};

export const geti18nlocaleZone = geti18nLocale();
export const IntlProviderWrapper = ({children}: {children: ReactNode}) => {
  return (
    <IntlProvider locale={geti18nlocaleZone} messages={getMessages(geti18nlocaleZone)}>
      {children}
    </IntlProvider>
  );
};
