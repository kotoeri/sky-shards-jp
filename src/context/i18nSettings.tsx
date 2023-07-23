import * as React from 'react';
// import React from "react";

import ja from '../../lang/ja.json';
import en from '../../lang/en.json';
import {IntlProvider} from 'react-intl';
import {ReactNode} from 'react';

const SUPPORTED_LOCALE = ['ja', 'en'];
const DEFAULT_LOCALE = 'en';

const getLocale = (): string => {
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

export const IntlProviderWrapper = ({children}: {children: ReactNode}) => {
  const locale = getLocale();
  return (
    <IntlProvider locale={locale} messages={getMessages(locale)}>
      {children}
    </IntlProvider>
  );
};
