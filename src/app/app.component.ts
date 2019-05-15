import { Component } from "@angular/core";
import * as app from "tns-core-modules/application";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {
    constructor() {
        if (app.android) {
            com.tencent.mm.opensdk.openapi.WXAPIFactory.createWXAPI(app.android.context, "wxd930ea5d5a258f4f", false);
        }
        app.off("wxApiResponse");
    }
}
