// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";

import * as app from "tns-core-modules/application";

if (app.ios) {
    const setupAppDeligate = require('./app/getappdelegate').setupAppDeligate;
    setupAppDeligate();
}

platformNativeScriptDynamic().bootstrapModule(AppModule);
