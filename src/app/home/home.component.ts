import { Component, OnInit, NgZone } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import * as app from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.scss"]
})
export class HomeComponent implements OnInit {

    constructor(public page: Page, public routeExt: RouterExtensions, private ngZone: NgZone) {

    }

    ngOnInit(): void {
        let t = this;
        app.on('wxApiResponse', wxResponseHandle, this);

        function wxResponseHandle(res) {

            app.off("wxApiResponse", wxResponseHandle, this);
            console.log("wxApiResponse");

            let response = res.object;
            console.dir(response);

            switch (response.errCode) {
                case 0:
                    console.log("user permits login");
                    console.log(response.code) // here you have the value of code which can be use to obtain wechat openid.

                    // must need to run under ngZone if you have plan to navigate another page.
                    t.ngZone.run(() => {
                        // t.routeExt.navigateByUrl("/profile");
                    });
                    break;

                case -2:
                    console.log("user canceled");
                    break;

                case -4:
                    console.log("user refused to authorize");
                    break;

                default:
                    console.log("unknow error");
                    break;
            }
        }
    }

    /**
     * wechatLogin
     */
    public wechatLogin() {
        if (app.android) {

            let appID = appSettings.getString("WECHAT_APP_ID");

            let wechatApi = com.tencent.mm.opensdk.openapi.WXAPIFactory.createWXAPI(app.android.context, appID, false);

            let req = new com.tencent.mm.opensdk.modelmsg.SendAuth.Req();
            req.scope = "snsapi_userinfo";
            //req.state = "wechat_sdk_demo_test";
            let tt = wechatApi.sendReq(req);
            console.log(tt);

        } else {
            let req = SendAuthReq.alloc();
            req.scope = "snsapi_userinfo";

            WXApi.sendReq(req);
        }
    }
}
