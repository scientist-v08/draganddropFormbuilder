import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormJsonCreator } from './services/formjsoncreator.service';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),FormJsonCreator]
};
