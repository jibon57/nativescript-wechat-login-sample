import { Component } from "@angular/core";
import * as app from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {
    constructor() {
        if (app.android) {
            let appID = appSettings.getString("WECHAT_APP_ID");
            com.tencent.mm.opensdk.openapi.WXAPIFactory.createWXAPI(app.android.context, appID, false);
        }
        app.off("wxApiResponse");
    }
}
