import {Aurelia} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

declare global {
  interface Window {
    app2Url: string;
  }
}

window.app2Url = 'http://localhost:8080';

export async function configure(aurelia: Aurelia): Promise<void> {
  await Promise.resolve();

  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

//   aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

//   if (environment.testing) {
//     aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
//   }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
