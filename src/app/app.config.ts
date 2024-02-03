import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormJsonCreator } from './services/formjsoncreator.service';
import { FormcontrolNameGenerator } from './services/formcontrolnamegenerator.service';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),FormJsonCreator,FormcontrolNameGenerator]
};
