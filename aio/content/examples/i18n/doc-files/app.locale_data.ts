// #docregion import-locale
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// 두번째 인자 `fr-FR`은 생략해도 됩니다.
registerLocaleData(localeFr, 'fr-FR');
// #enddocregion import-locale
