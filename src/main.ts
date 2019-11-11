import 'hammerjs';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {googleAnalyticsHeadScripts} from './assets/scripts/google-analytics';

if (environment.production) {
  enableProdMode();
}

googleAnalyticsHeadScripts();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
