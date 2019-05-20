// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";

import * as app from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";

appSettings.setString("WECHAT_APP_ID", "wxd930ea5d5a258f4f"); // We will set wechat APP ID as global here so that we can use that from anywhere :) 

if (app.ios) {
    const setupAppDeligate = require('./app/getappdelegate.ios').setupAppDeligate;
    setupAppDeligate();
}
platformNativeScriptDynamic().bootstrapModule(AppModule);
