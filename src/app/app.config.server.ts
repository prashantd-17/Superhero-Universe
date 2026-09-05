import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { CharacterDataSource } from './core/data-access/character/character-data-source';
import { ServerCharacterDataSource } from './core/data-access/character/server-character-data-source';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: CharacterDataSource, useClass: ServerCharacterDataSource },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
