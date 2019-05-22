import * as appSettings from "tns-core-modules/application-settings";

declare var android;

// YOUR_APP_ID.AppRegister 
@JavaProxy("net.sourceforge.simcpux.AppRegister")
class AppRegister extends android.content.BroadcastReceiver {
    public onReceive(context, intent) {
        console.log("onReceive");

        let appID = appSettings.getString("WECHAT_APP_ID")
        let api = com.tencent.mm.opensdk.openapi.WXAPIFactory.createWXAPI(context, null);
        api.registerApp(appID);
    }
}
